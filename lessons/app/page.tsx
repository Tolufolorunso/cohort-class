'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Header } from '../components/navigation/Header';
import { StudentNotesView } from '../components/notes/StudentNotesView';
import { AssignmentView } from '../components/assignments/AssignmentView';
import { StudentLogin } from '../components/auth/StudentLogin';
import { UnifiedSlideDeck } from '../components/presentation/UnifiedSlideDeck';
import { useClassroomAttention } from '../hooks/useClassroomAttention';

import { module1Notes, module1Assignment } from '../data/module1';
import { module2Notes, module2Assignment } from '../data/module2';
import { module3Notes, module3Assignment } from '../data/module3';
import {
  ActiveView,
  ZoomLevel,
  StudentSession,
  SyncMode,
} from '../types/platform';
import {
  getZoomLevel,
  setZoomLevel,
  getUnlockedModules,
  getCurrentActiveModule,
} from '../lib/platformStorage';
import {
  getStudentSession,
  clearStudentSession,
  saveStudentSession,
} from '../lib/roster';

export default function StudentPortal() {
  const [studentSession, setStudentSessionState] = useState<StudentSession | null>(null);
  const [hasCheckedSession, setHasCheckedSession] = useState(false);

  const [currentModuleId, setCurrentModuleId] = useState<string>(() => getCurrentActiveModule());
  const [activeView, setActiveView] = useState<ActiveView>('stage');
  const [zoomLevel, setZoomState] = useState<ZoomLevel>('normal');
  const [unlockedModuleIds, setUnlockedModuleIds] = useState<string[]>(['module-1']);
  const [syncMode] = useState<SyncMode>('follow-teacher');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Classroom attention tracking
  useClassroomAttention();

  useEffect(() => {
    const timer = setTimeout(() => {
      const active = getStudentSession();
      setStudentSessionState(active);
      setZoomState(getZoomLevel());
      setUnlockedModuleIds(getUnlockedModules());
      setHasCheckedSession(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!studentSession) return;
    const interval = setInterval(() => {
      const valid = getStudentSession();
      if (!valid) {
        setStudentSessionState(null);
      }
    }, 30 * 1000);
    return () => clearInterval(interval);
  }, [studentSession]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (zoomLevel === 'xlarge') {
      root.style.fontSize = '24px';
    } else if (zoomLevel === 'large') {
      root.style.fontSize = '21px';
    } else {
      root.style.fontSize = '18px';
    }
  }, [zoomLevel]);

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const handleLoginSuccess = useCallback((session: StudentSession) => {
    setStudentSessionState(session);
    saveStudentSession(session);
  }, []);

  const handleLogout = useCallback(() => {
    clearStudentSession();
    setStudentSessionState(null);
  }, []);

  const handleZoomChange = (level: ZoomLevel) => {
    setZoomState(level);
    setZoomLevel(level);
  };

  if (!hasCheckedSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-emerald-400 font-mono text-sm">
        Loading classroom session...
      </div>
    );
  }

  if (!studentSession) {
    return <StudentLogin onLoginSuccess={handleLoginSuccess} />;
  }

  const activeNotes =
    currentModuleId === 'module-3'
      ? module3Notes
      : currentModuleId === 'module-2'
      ? module2Notes
      : module1Notes;

  const activeAssignment =
    currentModuleId === 'module-3'
      ? module3Assignment
      : currentModuleId === 'module-2'
      ? module2Assignment
      : module1Assignment;

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-emerald-500 selection:text-zinc-950">
      <Header
        currentModuleId={currentModuleId}
        onSelectModule={setCurrentModuleId}
        activeView={activeView}
        onSelectView={setActiveView}
        zoomLevel={zoomLevel}
        onChangeZoom={handleZoomChange}
        unlockedModuleIds={unlockedModuleIds}
        session={studentSession}
        syncMode={syncMode}
        onLogout={handleLogout}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
      />

      {/* Main View Router */}
      <div className="flex-1 flex flex-col relative">
        {/* Today's Slide Deck Banner */}
        <div className="w-full bg-gradient-to-r from-cyan-950 via-zinc-900 to-emerald-950 border-b border-cyan-500/30 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-cyan-300">
            <span className="text-base">⚡</span>
            <span>
              <strong>Today&apos;s Class Deck:</strong> Clean 16:9 PowerPoint slides for today&apos;s active module!
            </span>
          </div>
          <Link
            href="/today"
            className="px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-black text-xs transition-all shadow-sm active:scale-95"
          >
            Launch Fullscreen Today Deck →
          </Link>
        </div>

        {activeView === 'stage' && (
          <UnifiedSlideDeck initialModuleId={currentModuleId} />
        )}

        {activeView === 'notes' && (
          <StudentNotesView notes={activeNotes} />
        )}

        {activeView === 'assignment' && (
          <AssignmentView assignment={activeAssignment} />
        )}
      </div>
    </div>
  );
}
