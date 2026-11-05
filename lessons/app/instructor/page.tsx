'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  TeacherSession,
  LiveSessionState,
  SyncMode,
  StudentSubmission,
  ZoomLevel,
} from '../../types/platform';
import {
  getTeacherSession,
  saveTeacherSession,
  clearTeacherSession,
  validateTeacherPin,
  isSuperAdmin,
} from '../../lib/auth';
import {
  AUTHORIZED_PATRONS,
} from '../../lib/roster';
import {
  getSubmissions,
  getUnlockedModules,
  saveModuleLockState,
  clearAllSubmissions,
  getZoomLevel,
  setZoomLevel,
} from '../../lib/platformStorage';
import { module1Info } from '../../data/module1';

import {
  Shield,
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  Download,
  Lock,
  Unlock,
  FileText,
} from '../../components/icons/Icons';

import { StageDefinition } from '../../components/stages/StageDefinition';
import { StageIPOS } from '../../components/stages/StageIPOS';
import { StageTimeline } from '../../components/stages/StageTimeline';
import { StageDeviceSorting } from '../../components/stages/StageDeviceSorting';
import { StageApplications } from '../../components/stages/StageApplications';
import { StageQuiz } from '../../components/stages/StageQuiz';

const ALL_MODULES = [
  { id: 'module-1', number: 1, title: 'Module 1: Introduction to Computers' },
  { id: 'module-2', number: 2, title: 'Module 2: Hardware & Components' },
  { id: 'module-3', number: 3, title: 'Module 3: Operating Systems & Files' },
  { id: 'module-4', number: 4, title: 'Module 4: Typing & Word Processing' },
  { id: 'module-5', number: 5, title: 'Module 5: Internet & Online Safety' },
];

export default function InstructorControlRoom() {
  const [teacherSession, setTeacherSession] = useState<TeacherSession | null>(null);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  // Live session state
  const [currentModuleId, setCurrentModuleId] = useState('module-1');
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [syncMode, setSyncModeState] = useState<SyncMode>('follow-teacher');
  const [activeStudents, setActiveStudents] = useState<Record<string, { studentName: string; lastSeen: number }>>({});
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [unlockedModuleIds, setUnlockedModuleIds] = useState<string[]>(['module-1']);
  const [zoomLevel, setZoomState] = useState<ZoomLevel>('normal');
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<StudentSubmission | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Check existing session on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setTeacherSession(getTeacherSession());
      setUnlockedModuleIds(getUnlockedModules());
      setZoomState(getZoomLevel());
      setSubmissions(getSubmissions());
      setCurrentTime(Date.now());
      setHasCheckedAuth(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Poll live session state and student presence every 2s
  useEffect(() => {
    if (!teacherSession) return;

    const poll = async () => {
      try {
        const res = await fetch('/api/live-session');
        if (res.ok) {
          const data: LiveSessionState = await res.json();
          setActiveStudents(data.activeStudents || {});
          setCurrentTime(Date.now());
        }
      } catch {
        // Fallback silently if offline
      }
    };

    poll();
    const interval = setInterval(poll, 2000);
    return () => clearInterval(interval);
  }, [teacherSession]);

  // Synchronize visual zoom
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (zoomLevel === 'xlarge') {
      root.style.fontSize = '20.5px';
    } else if (zoomLevel === 'large') {
      root.style.fontSize = '18.5px';
    } else {
      root.style.fontSize = '16px';
    }
  }, [zoomLevel]);

  // Broadcast state changes to /api/live-session
  const broadcastUpdate = useCallback(
    async (updates: Partial<LiveSessionState>) => {
      try {
        await fetch('/api/live-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        });
      } catch {
        // Local lab fallback
      }
    },
    []
  );

  const handleStageChange = (newIndex: number) => {
    const total = module1Info.stages.length;
    if (newIndex >= 0 && newIndex < total) {
      setCurrentStageIndex(newIndex);
      broadcastUpdate({ activeStageIndex: newIndex });
    }
  };

  const handleSyncModeToggle = (mode: SyncMode) => {
    setSyncModeState(mode);
    broadcastUpdate({ syncMode: mode });
  };

  const handleToggleModuleLock = (moduleId: string) => {
    let next: string[];
    if (unlockedModuleIds.includes(moduleId)) {
      if (moduleId === 'module-1' && unlockedModuleIds.length === 1) return;
      next = unlockedModuleIds.filter((id) => id !== moduleId);
    } else {
      next = [...unlockedModuleIds, moduleId];
    }
    const updated = saveModuleLockState({ unlockedModuleIds: next });
    setUnlockedModuleIds(updated.unlockedModuleIds);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError('');

    const validation = validateTeacherPin(pinInput);
    if (!validation.success || !validation.session) {
      setPinError(validation.error || 'Invalid PIN');
      return;
    }

    saveTeacherSession(validation.session);
    setTeacherSession(validation.session);
    setPinInput('');
  };

  const handleLogout = () => {
    clearTeacherSession();
    setTeacherSession(null);
  };

  const handleZoomChange = (level: ZoomLevel) => {
    setZoomState(level);
    setZoomLevel(level);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(submissions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `dzuels-submissions-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleClearSubmissions = () => {
    if (window.confirm('Are you sure you want to clear all student submissions from this computer?')) {
      clearAllSubmissions();
      setSubmissions([]);
      setSelectedSubmission(null);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => { });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => { });
      }
      setIsFullscreen(false);
    }
  };

  if (!hasCheckedAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-amber-400 font-mono text-sm">
        Loading instructor console...
      </div>
    );
  }

  // Teacher PIN Login Screen
  if (!teacherSession) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-950 text-zinc-100 selection:bg-amber-500 selection:text-zinc-950">
        <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400 mb-2 shadow-inner">
              <Shield size={36} />
            </div>
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-950/80 text-amber-400 border border-amber-800/60">
              Instructor Control Room
            </span>
            <h1 className="text-2xl font-black text-white">Teacher Security Gate</h1>
            <p className="text-xs text-zinc-400">
              Enter your Instructor PIN to access classroom controls & live slide broadcasting.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                Instructor PIN
              </label>
              <input
                type="password"
                required
                autoFocus
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError('');
                }}
                placeholder="Enter PIN "
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white font-mono text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {pinError && (
              <p className="text-xs text-rose-400 font-medium bg-rose-950/40 p-2.5 rounded-lg border border-rose-800/50">
                ⚠️ {pinError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-sm tracking-wide transition-all shadow-lg hover:shadow-amber-500/20"
            >
              Unlock Control Room →
            </button>
          </form>

          <div className="text-center pt-2 border-t border-zinc-800/80">
            <Link href="/" className="text-xs text-zinc-500 hover:text-emerald-400 transition-colors">
              ← Return to Student Portal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const activeConnectedCount = Object.keys(activeStudents).length;
  const currentStage = module1Info.stages[currentStageIndex];
  const isSuper = isSuperAdmin(teacherSession.role);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-amber-500 selection:text-zinc-950">
      {/* Top Instructor Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-md px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Identity & Status */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black text-sm">
                <Shield size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm sm:text-base text-white">
                    Instructor Control Room
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${isSuper
                        ? 'bg-amber-500 text-zinc-950 font-black'
                        : 'bg-zinc-800 text-amber-400 border border-amber-600/40'
                      }`}
                  >
                    {isSuper ? '👑 Super Admin' : '👨‍🏫 Teacher'}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 font-medium">
                  Signed in as <strong>{teacherSession.displayName}</strong>
                </p>
              </div>
            </div>

            {/* Live Student Attendance Badge */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold"
              title="Students actively connected to the live session"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-mono">{activeConnectedCount} / 22 Active</span>
            </div>
          </div>

          {/* Controls: Zoom, Sync Mode, Exit */}
          <div className="flex items-center gap-2.5">
            {/* Sync Mode Switcher */}
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1 shadow-inner">
              <button
                onClick={() => handleSyncModeToggle('follow-teacher')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${syncMode === 'follow-teacher'
                    ? 'bg-emerald-500 text-zinc-950 shadow-md'
                    : 'text-zinc-400 hover:text-white'
                  }`}
                title="Lock student screens to follow your slides in real-time"
              >
                <span className="w-2 h-2 rounded-full bg-zinc-950 animate-ping hidden sm:inline-block" />
                <span>Follow Teacher</span>
              </button>
              <button
                onClick={() => handleSyncModeToggle('self-paced')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${syncMode === 'self-paced'
                    ? 'bg-amber-500 text-zinc-950 shadow-md'
                    : 'text-zinc-400 hover:text-white'
                  }`}
                title="Allow students to browse notes and homework at their own pace"
              >
                <span>Self-Paced</span>
              </button>
            </div>

            {/* Visual Zoom Scale Controls */}
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
              <button
                onClick={() => handleZoomChange('normal')}
                className={`px-2 py-1 rounded text-xs font-bold ${zoomLevel === 'normal' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
                  }`}
              >
                A-
              </button>
              <button
                onClick={() => handleZoomChange('large')}
                className={`px-2 py-1 rounded text-xs font-bold ${zoomLevel === 'large' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
                  }`}
              >
                A
              </button>
              <button
                onClick={() => handleZoomChange('xlarge')}
                className={`px-2 py-1 rounded text-xs font-bold ${zoomLevel === 'xlarge' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
                  }`}
              >
                A+
              </button>
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
              title="Toggle Projector Fullscreen"
            >
              {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-rose-400 hover:border-rose-700 text-xs font-bold transition-colors"
            >
              Exit
            </button>
          </div>
        </div>
      </header>

      {/* Main Command Surface */}
      <main className="max-w-7xl mx-auto w-full px-4 py-6 sm:px-6 sm:py-8 space-y-8 flex-1">
        {/* Slide Controller Deck */}
        <section className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border-2 border-amber-500/40 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block mb-1">
                Live Slide Controller • {syncMode === 'follow-teacher' ? 'Broadcasting Active' : 'Self-Paced Active'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Stage {currentStageIndex + 1} of {module1Info.stages.length}: {currentStage.title}
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">{currentStage.subtitle}</p>
            </div>

            {/* Slide Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleStageChange(currentStageIndex - 1)}
                disabled={currentStageIndex === 0}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 text-white transition-all shadow-md"
              >
                <ChevronLeft size={16} />
                <span>Prev Slide</span>
              </button>

              <button
                onClick={() => handleStageChange(currentStageIndex + 1)}
                disabled={currentStageIndex === module1Info.stages.length - 1}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-black bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-zinc-950 transition-all shadow-lg"
              >
                <span>Next Slide</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Stage Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {module1Info.stages.map((stg, idx) => {
              const isActive = idx === currentStageIndex;
              return (
                <button
                  key={stg.id}
                  onClick={() => handleStageChange(idx)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${isActive
                      ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-md font-black'
                      : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white hover:bg-zinc-800'
                    }`}
                >
                  <span>{idx + 1}. {stg.title}</span>
                </button>
              );
            })}
          </div>

          {/* Embedded Presentation Stage Preview */}
          <div className="pt-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">
              Projector / Live Student View:
            </span>
            <div className="p-4 sm:p-6 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-inner">
              {currentStage.id === 'what-is-a-computer' && <StageDefinition />}
              {currentStage.id === 'ipos-cycle' && <StageIPOS />}
              {currentStage.id === 'history-timeline' && <StageTimeline />}
              {currentStage.id === 'device-sorting' && <StageDeviceSorting />}
              {currentStage.id === 'applications' && <StageApplications />}
              {currentStage.id === 'review-quiz' && <StageQuiz userRole="teacher" />}
            </div>
          </div>
        </section>

        {/* Live Attendance Roster Grid (22 Students) */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>👥</span> Class Attendance &amp; Laptop Connection Roster (22 Students)
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Real-time connection status of student laptops in the laboratory.
              </p>
            </div>
            <div className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {activeConnectedCount} of 22 Connected
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 pt-1">
            {AUTHORIZED_PATRONS.map((patron) => {
              const live = activeStudents[patron];
              const isConnected = Boolean(live && currentTime - live.lastSeen <= 45000);

              return (
                <div
                  key={patron}
                  className={`p-2.5 rounded-xl border transition-all flex flex-col justify-between ${isConnected
                      ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300 shadow-sm'
                      : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-500'
                    }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-mono text-xs font-bold tracking-wider">
                      {patron}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-700'
                        }`}
                    />
                  </div>
                  <span className="text-[10px] font-medium truncate block">
                    {isConnected ? live.studentName : 'Offline'}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Curriculum Module Lock Manager */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>📚</span> Curriculum Module Locking Controls
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Lock upcoming modules to prevent students from rushing ahead on their laptops.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {ALL_MODULES.map((m) => {
              const isUnlocked = unlockedModuleIds.includes(m.id);
              return (
                <div
                  key={m.id}
                  className={`p-4 rounded-xl border flex items-center justify-between ${isUnlocked
                      ? 'bg-zinc-950 border-emerald-500/40 text-white'
                      : 'bg-zinc-950/40 border-zinc-800 text-zinc-500'
                    }`}
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold text-zinc-500 block">
                      Module {m.number} {currentModuleId === m.id ? '• Active' : ''}
                    </span>
                    <span className="text-xs font-bold block">{m.title}</span>
                    {isUnlocked && currentModuleId !== m.id && (
                      <button
                        onClick={() => {
                          setCurrentModuleId(m.id);
                          broadcastUpdate({ activeModuleId: m.id });
                        }}
                        className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors mt-0.5 block"
                      >
                        Set as Active
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => handleToggleModuleLock(m.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${isUnlocked
                        ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                        : 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400'
                      }`}
                  >
                    {isUnlocked ? (
                      <>
                        <Lock size={12} />
                        <span>Lock</span>
                      </>
                    ) : (
                      <>
                        <Unlock size={12} />
                        <span>Unlock</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Student Submissions Gradebook */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText size={18} className="text-emerald-400" />
                <span>Student Homework Submissions ({submissions.length})</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Submissions made by students using their assigned Patron Number.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {submissions.length > 0 && (
                <>
                  <button
                    onClick={handleExportJSON}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700"
                  >
                    <Download size={13} />
                    <span>Export JSON</span>
                  </button>

                  {isSuper && (
                    <button
                      onClick={handleClearSubmissions}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/40 border border-rose-800/60"
                    >
                      Clear All
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {submissions.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-zinc-950/50 border border-dashed border-zinc-800 text-zinc-500 text-xs">
              No homework submissions recorded yet. Submissions will appear as students submit assignments.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-zinc-800">
              <table className="w-full text-left text-xs text-zinc-300">
                <thead className="bg-zinc-950 text-zinc-400 font-bold uppercase tracking-wider border-b border-zinc-800">
                  <tr>
                    <th className="p-3">Patron Number</th>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Module</th>
                    <th className="p-3">Submitted At</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80 bg-zinc-900/50">
                  {submissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-zinc-800/40">
                      <td className="p-3 font-mono font-bold text-emerald-400">{sub.patronNumber}</td>
                      <td className="p-3 font-bold text-white">{sub.studentName}</td>
                      <td className="p-3 text-zinc-400">{sub.moduleTitle}</td>
                      <td className="p-3 text-zinc-400">{new Date(sub.submittedAt).toLocaleTimeString()}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setSelectedSubmission(sub)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 hover:bg-emerald-500 hover:text-zinc-950"
                        >
                          View Answers
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* Submission Inspector Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl text-zinc-100 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div>
                <h3 className="text-base font-bold text-white">{selectedSubmission.studentName}</h3>
                <p className="text-xs text-zinc-400 font-mono">
                  Patron: <span className="text-emerald-400">{selectedSubmission.patronNumber}</span> • {selectedSubmission.moduleTitle}
                </p>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-zinc-400 hover:text-white font-bold text-lg px-2"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {Object.entries(selectedSubmission.answers).map(([qId, ans]) => (
                <div key={qId} className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase">Question {qId}:</span>
                  <p className="text-xs text-zinc-200 whitespace-pre-wrap">{ans || '(No response)'}</p>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-zinc-800 flex justify-end">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
