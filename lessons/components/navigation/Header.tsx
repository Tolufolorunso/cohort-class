'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ActiveView, ZoomLevel, StudentSession, SyncMode } from '../../types/platform';
import {
  BookOpen,
  FileText,
  Lock,
  Unlock,
  Maximize,
  Minimize,
  GraduationCap,
} from '../icons/Icons';
import { getRemainingSessionMinutes } from '../../lib/roster';

interface HeaderProps {
  currentModuleId: string;
  onSelectModule: (moduleId: string) => void;
  activeView: ActiveView;
  onSelectView?: (view: ActiveView) => void;
  zoomLevel: ZoomLevel;
  onChangeZoom: (level: ZoomLevel) => void;
  unlockedModuleIds: string[];
  session: StudentSession;
  syncMode?: SyncMode;
  onLogout: () => void;
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
  unlockedModuleIds,
  session,
  syncMode = 'follow-teacher',
  onLogout,
  isFullscreen = false,
  onToggleFullscreen,
}: HeaderProps) {
  const router = useRouter();
  const remainingMinutes = getRemainingSessionMinutes(session);

  const handleModuleClick = (moduleId: string) => {
    const isUnlocked = unlockedModuleIds.includes(moduleId);
    if (isUnlocked) {
      onSelectModule(moduleId);
      const targetPath =
        activeView === 'stage'
          ? `/learn/${moduleId}`
          : activeView === 'notes'
          ? `/notes/${moduleId}`
          : activeView === 'assignment'
          ? `/assignments/${moduleId}`
          : `/learn/${moduleId}`;
      if (typeof window !== 'undefined' && window.location.pathname !== targetPath) {
        router.push(targetPath);
      }
    }
  };

  const handleViewClick = (view: ActiveView) => {
    if (onSelectView) {
      onSelectView(view);
    }
    const targetPath =
      view === 'arena'
        ? '/arena'
        : view === 'stage'
        ? `/learn/${currentModuleId}`
        : view === 'notes'
        ? `/notes/${currentModuleId}`
        : `/assignments/${currentModuleId}`;
    if (typeof window !== 'undefined' && window.location.pathname !== targetPath) {
      router.push(targetPath);
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
                  Student Lab
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-medium hidden sm:block">
                Interactive Learning Portal
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
                  disabled={!isUnlocked}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                      : isUnlocked
                      ? 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                      : 'text-zinc-600 opacity-60 cursor-not-allowed'
                  }`}
                >
                  {isUnlocked ? (
                    <Unlock size={12} className={isSelected ? 'text-zinc-950' : 'text-emerald-400'} />
                  ) : (
                    <Lock size={12} className="text-zinc-600" />
                  )}
                  <span>{m.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center: View Navigation & Sync Pill */}
        <div className="flex items-center gap-2">
          {/* Live Sync Status Indicator */}
          <div
            className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${
              syncMode === 'follow-teacher'
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-700/50'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800'
            }`}
            title={
              syncMode === 'follow-teacher'
                ? 'Your screen is following Instructor slides in real time'
                : 'Self-paced reading mode'
            }
          >
            <span
              className={`w-2 h-2 rounded-full ${
                syncMode === 'follow-teacher' ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-500'
              }`}
            />
            <span>{syncMode === 'follow-teacher' ? 'Live Follow' : 'Self-Paced'}</span>
          </div>

          <div className="flex items-center gap-1 bg-zinc-900/90 p-1 rounded-xl border border-zinc-800/80 shadow-inner">
            <button
              onClick={() => handleViewClick('stage')}
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
              onClick={() => handleViewClick('notes')}
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
              onClick={() => handleViewClick('assignment')}
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
              onClick={() => handleViewClick('arena')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeView === 'arena'
                  ? 'bg-amber-400 text-zinc-950 shadow-md ring-2 ring-amber-300 font-extrabold'
                  : 'text-amber-400 hover:text-amber-300 hover:bg-amber-500/10'
              }`}
              title="Enter Live Quiz Arena"
            >
              <span className="text-sm">🎮</span>
              <span>Quiz Arena</span>
            </button>
          </div>
        </div>

        {/* Right: Zoom Scale, Student Identity & Logout */}
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
              title="Normal Text Size (18px)"
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
              title="Large Text Size (21px)"
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
              title="Projector Distance (24px)"
            >
              A+
            </button>
          </div>

          {/* Student Identity Pill with 3h Session Countdown */}
          <div
            className="flex items-center gap-2 px-3 py-1 rounded-xl bg-zinc-900 border border-zinc-700/80 text-xs shadow-sm"
            title={`3-Hour Lab Session • ${remainingMinutes}m remaining`}
          >
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px]">
              {session.mode === 'partner' ? '👥' : <GraduationCap size={14} />}
            </div>
            <div className="text-left hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white block leading-tight max-w-[200px] truncate">
                  {session.mode === 'partner' && session.partnerB
                    ? `${session.partnerA.studentName.split(' ')[0]} & ${session.partnerB.studentName.split(' ')[0]}`
                    : session.studentName}
                </span>
                {session.mode === 'partner' && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800">
                    Partners
                  </span>
                )}
              </div>
              <span className="text-[10px] text-zinc-400 font-mono block leading-tight">
                {session.mode === 'partner' && session.partnerB
                  ? `${session.partnerA.patronNumber} • ${session.partnerB.patronNumber} • ${remainingMinutes}m`
                  : `${session.patronNumber} • ${remainingMinutes}m`}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-rose-950/40 hover:text-rose-300 hover:border-rose-800 text-zinc-400 text-xs font-bold transition-colors"
            title="Log out of student laptop session"
          >
            Exit
          </button>

          {/* Fullscreen Toggle */}
          {onToggleFullscreen && (
            <button
              onClick={onToggleFullscreen}
              className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              title={isFullscreen ? 'Exit Fullscreen (F)' : 'Enter Fullscreen (F)'}
              aria-label="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
