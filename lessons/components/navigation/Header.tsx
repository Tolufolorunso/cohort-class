'use client';

import React, { useState } from 'react';
import { ActiveView, UserRole, ZoomLevel } from '../../types/platform';
import {
  BookOpen,
  FileText,
  Lock,
  Unlock,
  Shield,
  GraduationCap,
  Maximize,
  Minimize,
} from '../icons/Icons';
import { verifyTeacherPin } from '../../lib/platformStorage';

interface HeaderProps {
  currentModuleId: string;
  onSelectModule: (moduleId: string) => void;
  activeView: ActiveView;
  onSelectView: (view: ActiveView) => void;
  zoomLevel: ZoomLevel;
  onChangeZoom: (level: ZoomLevel) => void;
  userRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  unlockedModuleIds: string[];
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

const AVAILABLE_MODULES = [
  { id: 'module-1', number: 1, title: 'Intro to Computers', shortName: 'M1: Intro' },
  { id: 'module-2', number: 2, title: 'Hardware & Components', shortName: 'M2: Hardware' },
  { id: 'module-3', number: 3, title: 'Operating Systems & Files', shortName: 'M3: OS & Files' },
  { id: 'module-4', number: 4, title: 'Typing & Word Processing', shortName: 'M4: Typing' },
  { id: 'module-5', number: 5, title: 'Internet & Online Safety', shortName: 'M5: Internet' },
];

export function Header({
  currentModuleId,
  onSelectModule,
  activeView,
  onSelectView,
  zoomLevel,
  onChangeZoom,
  userRole,
  onChangeRole,
  unlockedModuleIds,
  isFullscreen = false,
  onToggleFullscreen,
}: HeaderProps) {
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [showLockedAlert, setShowLockedAlert] = useState<string | null>(null);

  const handleRoleToggle = () => {
    if (userRole === 'teacher') {
      onChangeRole('student');
      if (activeView === 'dashboard') {
        onSelectView('stage');
      }
    } else {
      setPinInput('');
      setPinError('');
      setShowPinModal(true);
    }
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyTeacherPin(pinInput)) {
      onChangeRole('teacher');
      setShowPinModal(false);
      setPinInput('');
      setPinError('');
    } else {
      setPinError('Incorrect PIN. Default teacher PIN is 1234.');
    }
  };

  const handleModuleClick = (moduleId: string) => {
    const isUnlocked = unlockedModuleIds.includes(moduleId);
    if (isUnlocked) {
      onSelectModule(moduleId);
    } else {
      const target = AVAILABLE_MODULES.find((m) => m.id === moduleId);
      setShowLockedAlert(
        target
          ? `"${target.title}" is currently locked. Only the instructor can unlock upcoming modules.`
          : 'This module is currently locked by the instructor.'
      );
      setTimeout(() => setShowLockedAlert(null), 3500);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-md px-3 py-2.5 sm:px-6 sm:py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Branding & Module Switcher */}
        <div className="flex items-center flex-wrap justify-between md:justify-start w-full md:w-auto gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-black text-sm tracking-tighter shadow-sm">
              DZ
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                  Dzuels Computer Class
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                  Lab Platform
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-medium hidden sm:block">
                Interactive Classroom Curriculum & Student Lab
              </p>
            </div>
          </div>

          {/* Module Selector Pill Bar */}
          <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800 overflow-x-auto max-w-full">
            {AVAILABLE_MODULES.map((m) => {
              const isSelected = m.id === currentModuleId;
              const isUnlocked = unlockedModuleIds.includes(m.id);
              return (
                <button
                  key={m.id}
                  onClick={() => handleModuleClick(m.id)}
                  title={isUnlocked ? m.title : `${m.title} (Locked by Instructor)`}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                      : isUnlocked
                      ? 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                      : 'text-zinc-500 hover:text-zinc-400 hover:bg-zinc-900/50'
                  }`}
                >
                  {isUnlocked ? (
                    <Unlock size={12} className={isSelected ? 'text-zinc-950' : 'text-emerald-400'} />
                  ) : (
                    <Lock size={12} className="text-zinc-500" />
                  )}
                  <span>{m.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center: View Navigation (Stage vs Notes vs Assignment vs Dashboard) */}
        <div className="flex items-center gap-1 bg-zinc-900/90 p-1 rounded-xl border border-zinc-800/80 shadow-inner">
          <button
            onClick={() => onSelectView('stage')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeView === 'stage'
                ? 'bg-emerald-500 text-zinc-950 shadow-md'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <span className="text-sm">🖥️</span>
            <span>Lesson Stage</span>
          </button>

          <button
            onClick={() => onSelectView('notes')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeView === 'notes'
                ? 'bg-emerald-500 text-zinc-950 shadow-md'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <BookOpen size={14} className={activeView === 'notes' ? 'text-zinc-950' : 'text-emerald-400'} />
            <span>Copy Notes</span>
          </button>

          <button
            onClick={() => onSelectView('assignment')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeView === 'assignment'
                ? 'bg-emerald-500 text-zinc-950 shadow-md'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <FileText size={14} className={activeView === 'assignment' ? 'text-zinc-950' : 'text-emerald-400'} />
            <span>Homework</span>
          </button>

          <button
            onClick={() => {
              if (userRole === 'teacher') {
                onSelectView('dashboard');
              } else {
                setPinInput('');
                setPinError('');
                setShowPinModal(true);
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeView === 'dashboard'
                ? 'bg-amber-500 text-zinc-950 shadow-md'
                : userRole === 'teacher'
                ? 'text-amber-400 hover:text-amber-300 hover:bg-zinc-800/60'
                : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/60'
            }`}
            title="Instructor dashboard & student submission review"
          >
            <Shield size={14} className={activeView === 'dashboard' ? 'text-zinc-950' : 'text-amber-400'} />
            <span>Teacher Panel</span>
          </button>
        </div>

        {/* Right: Zoom Scale, Role Switcher & Fullscreen */}
        <div className="flex items-center gap-2">
          {/* Visual Zoom Scale Controls */}
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5" title="Projector Visibility Zoom">
            <span className="text-[10px] uppercase font-bold text-zinc-500 px-1.5 hidden sm:inline">Zoom</span>
            <button
              onClick={() => onChangeZoom('normal')}
              className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                zoomLevel === 'normal'
                  ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
              title="Normal Text Size (100%)"
            >
              A-
            </button>
            <button
              onClick={() => onChangeZoom('large')}
              className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                zoomLevel === 'large'
                  ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
              title="Large Text Size (115% - Recommended for Projector)"
            >
              A
            </button>
            <button
              onClick={() => onChangeZoom('xlarge')}
              className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                zoomLevel === 'xlarge'
                  ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
              title="Extra Large (130% - Distant Projector)"
            >
              A+
            </button>
          </div>

          {/* Role Switcher Pill */}
          <button
            onClick={handleRoleToggle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold border transition-all ${
              userRole === 'teacher'
                ? 'bg-amber-950/40 text-amber-300 border-amber-600/70 hover:bg-amber-900/50 shadow-sm'
                : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:bg-zinc-800 hover:text-white'
            }`}
            title={userRole === 'teacher' ? 'Click to switch to Student view' : 'Click to unlock Teacher mode (requires PIN)'}
          >
            {userRole === 'teacher' ? (
              <>
                <Shield size={14} className="text-amber-400" />
                <span>👨‍🏫 Teacher</span>
              </>
            ) : (
              <>
                <GraduationCap size={14} className="text-emerald-400" />
                <span>🎓 Student</span>
              </>
            )}
          </button>

          {/* Fullscreen Toggle */}
          {onToggleFullscreen && (
            <button
              onClick={onToggleFullscreen}
              className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              title={isFullscreen ? 'Exit Fullscreen (F)' : 'Enter Projector Fullscreen (F)'}
              aria-label="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
            </button>
          )}
        </div>
      </div>

      {/* Locked Alert Banner */}
      {showLockedAlert && (
        <div className="max-w-7xl mx-auto mt-2 p-2.5 rounded-lg bg-amber-950/80 border border-amber-600/50 text-amber-200 text-xs flex items-center justify-between animate-in fade-in slide-in-from-top-1">
          <div className="flex items-center gap-2">
            <Lock size={14} className="text-amber-400 shrink-0" />
            <span>{showLockedAlert}</span>
          </div>
          <button
            onClick={() => setShowLockedAlert(null)}
            className="text-amber-400 hover:text-amber-200 font-bold ml-3"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Teacher PIN Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl text-zinc-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Shield size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Enter Instructor PIN</h3>
                <p className="text-xs text-zinc-400">Unlock teacher controls & dashboard</p>
              </div>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  4-Digit Security PIN
                </label>
                <input
                  type="password"
                  maxLength={6}
                  autoFocus
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError('');
                  }}
                  placeholder="e.g. 1234"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-center text-xl font-mono tracking-widest text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                {pinError && (
                  <p className="text-xs text-rose-400 mt-1 font-medium">{pinError}</p>
                )}
                <p className="text-[11px] text-zinc-500 mt-1">
                  Default classroom PIN: <span className="font-mono text-zinc-400">1234</span>
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPinModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 text-zinc-950 hover:bg-amber-400 transition-colors shadow-md"
                >
                  Unlock Instructor Mode
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}

