'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '../components/navigation/Header';
import { StageShell } from '../components/presentation/StageShell';
import { StudentNotesView } from '../components/notes/StudentNotesView';
import { AssignmentView } from '../components/assignments/AssignmentView';
import { StudentLogin } from '../components/auth/StudentLogin';

import { StageDefinition } from '../components/stages/StageDefinition';
import { StageIPOS } from '../components/stages/StageIPOS';
import { StageTimeline } from '../components/stages/StageTimeline';
import { StageDeviceSorting } from '../components/stages/StageDeviceSorting';
import { StageApplications } from '../components/stages/StageApplications';
import { StageQuiz } from '../components/stages/StageQuiz';

import { module1Notes, module1Assignment } from '../data/module1';
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
} from '../lib/platformStorage';
import {
  getStudentSession,
  clearStudentSession,
  saveStudentSession,
} from '../lib/roster';

export default function StudentPortal() {
  const [studentSession, setStudentSessionState] = useState<StudentSession | null>(null);
  const [hasCheckedSession, setHasCheckedSession] = useState(false);

  const [currentModuleId, setCurrentModuleId] = useState<string>('module-1');
  const [activeView, setActiveView] = useState<ActiveView>('stage');
  const [zoomLevel, setZoomState] = useState<ZoomLevel>('normal');
  const [unlockedModuleIds, setUnlockedModuleIds] = useState<string[]>(['module-1']);
  const [syncMode, setSyncMode] = useState<SyncMode>('follow-teacher');
  const [liveStageIndex, setLiveStageIndex] = useState<number>(0);
  const [liveKahootQuestionId, setLiveKahootQuestionId] = useState<number | null>(null);
  const [liveIsKahootRevealed, setLiveIsKahootRevealed] = useState<boolean>(false);
  const [liveKahootTally, setLiveKahootTally] = useState<[number, number, number, number]>([0, 0, 0, 0]);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Initialize student session on mount
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

  // Check 1-hour session expiry every 30 seconds
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

  // Synchronize visual zoom scaling across document
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

  // Real-time live slide mirroring & heartbeat polling
  useEffect(() => {
    if (!studentSession) return;

    const pollSession = async () => {
      try {
        const url = `/api/live-session?patron=${encodeURIComponent(
          studentSession.patronNumber
        )}&name=${encodeURIComponent(studentSession.studentName)}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setSyncMode(data.syncMode || 'follow-teacher');

          // If instructor is in Follow-Teacher mode, mirror stage
          if (data.syncMode === 'follow-teacher' && typeof data.activeStageIndex === 'number') {
            setLiveStageIndex(data.activeStageIndex);
          }
          if (data.activeModuleId && data.activeModuleId !== currentModuleId) {
            setCurrentModuleId(data.activeModuleId);
          }

          // Mirror active Kahoot question & reveal state
          if (data.activeKahootQuestionId !== undefined) {
            setLiveKahootQuestionId(data.activeKahootQuestionId);
          }
          if (data.isKahootRevealed !== undefined) {
            setLiveIsKahootRevealed(data.isKahootRevealed);
          }
          if (data.kahootTally) {
            setLiveKahootTally(data.kahootTally);
          }
        }
      } catch {
        // Fallback silently if offline in local computer lab
      }
    };

    pollSession();
    const interval = setInterval(pollSession, 1500); // Poll every 1.5s
    return () => clearInterval(interval);
  }, [studentSession, currentModuleId]);

  const handleStudentVote = async (_questionId: number, optionIndex: number) => {
    if (!studentSession) return;
    try {
      await fetch('/api/live-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patronNumber: studentSession.patronNumber,
          kahootOptionIndex: optionIndex,
        }),
      });
    } catch {
      // Offline laboratory fallback
    }
  };

  // Fullscreen state listener
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
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

  // Prevent flicker before initial session check
  if (!hasCheckedSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-emerald-400 font-mono text-sm">
        Loading classroom session...
      </div>
    );
  }

  // If student is not logged in or session expired, show student login gate
  if (!studentSession) {
    return <StudentLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-emerald-500 selection:text-zinc-950">
      {/* Student Portal Navigation Header */}
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
      <div className="flex-1 flex flex-col">
        {activeView === 'stage' && (
          <StageShell currentStageIndex={syncMode === 'follow-teacher' ? liveStageIndex : undefined}>
            {(_currentStageIndex, currentStageId) => {
              switch (currentStageId) {
                case 'what-is-a-computer':
                  return <StageDefinition />;
                case 'ipos-cycle':
                  return <StageIPOS />;
                case 'history-timeline':
                  return <StageTimeline />;
                case 'device-sorting':
                  return <StageDeviceSorting />;
                case 'applications':
                  return <StageApplications />;
                case 'review-quiz':
                  return (
                    <StageQuiz
                      userRole="student"
                      syncedQuestionId={liveKahootQuestionId}
                      syncedIsRevealed={liveIsKahootRevealed}
                      liveTally={liveKahootTally}
                      patronNumber={studentSession?.patronNumber}
                      onStudentVote={handleStudentVote}
                    />
                  );
                default:
                  return <StageDefinition />;
              }
            }}
          </StageShell>
        )}

        {activeView === 'notes' && (
          <main className="flex-1">
            <StudentNotesView notes={module1Notes} />
          </main>
        )}

        {activeView === 'assignment' && (
          <main className="flex-1">
            <AssignmentView assignment={module1Assignment} />
          </main>
        )}
      </div>
    </div>
  );
}
