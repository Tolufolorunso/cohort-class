'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '../components/navigation/Header';
import { StageShell } from '../components/presentation/StageShell';
import { StudentNotesView } from '../components/notes/StudentNotesView';
import { AssignmentView } from '../components/assignments/AssignmentView';
import { StudentLogin } from '../components/auth/StudentLogin';
import { useClassroomAttention } from '../hooks/useClassroomAttention';

import { StageDefinition } from '../components/stages/StageDefinition';
import { StageIPOS } from '../components/stages/StageIPOS';
import { StageTimeline } from '../components/stages/StageTimeline';
import { StageDeviceSorting } from '../components/stages/StageDeviceSorting';
import { StageApplications } from '../components/stages/StageApplications';
import { StageQuiz } from '../components/stages/StageQuiz';

import { StageHardwareAnatomy } from '../components/stages/StageHardwareAnatomy';
import { StageInputOutputLab } from '../components/stages/StageInputOutputLab';
import { StageSystemUnitDisassembly } from '../components/stages/StageSystemUnitDisassembly';
import { StageStorageBytes } from '../components/stages/StageStorageBytes';

import { module1Info, module1Notes, module1Assignment, kahootQuestions as module1KahootQuestions } from '../data/module1';
import { module2Info, module2Notes, module2Assignment, module2KahootQuestions } from '../data/module2';
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
  const [studentStageIndex, setStudentStageIndex] = useState<number>(0);
  const [hasUserNavigated, setHasUserNavigated] = useState<boolean>(false);
  const [liveKahootQuestionId, setLiveKahootQuestionId] = useState<number | null>(null);
  const [liveIsKahootRevealed, setLiveIsKahootRevealed] = useState<boolean>(false);
  const [liveKahootTally, setLiveKahootTally] = useState<[number, number, number, number]>([0, 0, 0, 0]);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Classroom attention tracking (inattention, tab switching, window blur)
  const attention = useClassroomAttention();

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

  // Check 3-hour session expiry every 30 seconds
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

  // Synchronize visual zoom scaling across document (Normal: 18px, Large: 21px, X-Large: 24px)
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

  // Real-time live slide mirroring & heartbeat polling with attention metrics
  useEffect(() => {
    if (!studentSession) return;

    const pollSession = async () => {
      try {
        const params = new URLSearchParams();
        params.set('mode', studentSession.mode || 'solo');
        params.set('patron', studentSession.patronNumber);
        params.set('name', studentSession.studentName);
        if (studentSession.mode === 'partner' && studentSession.partnerB) {
          params.set('patronA', studentSession.partnerA.patronNumber);
          params.set('nameA', studentSession.partnerA.studentName);
          params.set('patronB', studentSession.partnerB.patronNumber);
          params.set('nameB', studentSession.partnerB.studentName);
        }
        // Attach attention status
        params.set('isFocused', String(attention.isFocused));
        if (!attention.isFocused && attention.leftScreenAt) {
          params.set('leftScreenAt', String(attention.leftScreenAt));
        }

        const url = `/api/live-session?${params.toString()}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setSyncMode(data.syncMode || 'follow-teacher');

          // If instructor is in Follow-Teacher mode, mirror stage if student has not navigated independently
          if (typeof data.activeStageIndex === 'number') {
            setLiveStageIndex(data.activeStageIndex);
            if (!hasUserNavigated && data.syncMode === 'follow-teacher') {
              setStudentStageIndex(data.activeStageIndex);
            }
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
  }, [studentSession, currentModuleId, attention.isFocused, attention.leftScreenAt, hasUserNavigated]);

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

  const handleStageChange = useCallback((newIndex: number) => {
    setStudentStageIndex(newIndex);
    setHasUserNavigated(true);
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

  const activeModuleInfo = currentModuleId === 'module-2' ? module2Info : module1Info;
  const activeNotes = currentModuleId === 'module-2' ? module2Notes : module1Notes;
  const activeAssignment = currentModuleId === 'module-2' ? module2Assignment : module1Assignment;
  const activeKahootQuestions = currentModuleId === 'module-2' ? module2KahootQuestions : module1KahootQuestions;

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
      <div className="flex-1 flex flex-col relative">
        {activeView === 'stage' && (
          <>
            {/* Real-time notification if teacher is on a different slide */}
            {hasUserNavigated &&
              syncMode === 'follow-teacher' &&
              liveStageIndex !== studentStageIndex && (
                <div className="sticky top-14 z-30 w-full bg-emerald-950/90 border-b border-emerald-500/30 px-4 py-2 flex items-center justify-between text-xs backdrop-blur-md shadow-md">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>
                      <strong>Independent Reading:</strong> You are on Stage {studentStageIndex + 1}. Teacher is presenting Stage {liveStageIndex + 1}.
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setStudentStageIndex(liveStageIndex);
                      setHasUserNavigated(false);
                    }}
                    className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    Jump to Teacher (Stage {liveStageIndex + 1}) →
                  </button>
                </div>
              )}

            <StageShell
              moduleInfo={activeModuleInfo}
              currentStageIndex={studentStageIndex}
              onStageChange={handleStageChange}
            >
            {(_currentStageIndex, currentStageId) => {
              switch (currentStageId) {
                // Module 1 Stages
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
                      questions={activeKahootQuestions}
                      syncedQuestionId={liveKahootQuestionId}
                      syncedIsRevealed={liveIsKahootRevealed}
                      liveTally={liveKahootTally}
                      patronNumber={studentSession?.patronNumber}
                      onStudentVote={handleStudentVote}
                    />
                  );

                // Module 2 Stages
                case 'hardware-anatomy':
                  return <StageHardwareAnatomy />;
                case 'input-output-lab':
                  return <StageInputOutputLab />;
                case 'system-unit-disassembly':
                  return <StageSystemUnitDisassembly />;
                case 'storage-and-bytes':
                  return <StageStorageBytes />;
                case 'module2-quiz':
                  return (
                    <StageQuiz
                      userRole="student"
                      questions={module2KahootQuestions}
                      syncedQuestionId={liveKahootQuestionId}
                      syncedIsRevealed={liveIsKahootRevealed}
                      liveTally={liveKahootTally}
                      patronNumber={studentSession?.patronNumber}
                      onStudentVote={handleStudentVote}
                    />
                  );

                default:
                  return currentModuleId === 'module-2' ? <StageHardwareAnatomy /> : <StageDefinition />;
              }
            }}
          </StageShell>
          </>
        )}

        {activeView === 'notes' && (
          <main className="flex-1">
            <StudentNotesView notes={activeNotes} />
          </main>
        )}

        {activeView === 'assignment' && (
          <main className="flex-1">
            <AssignmentView assignment={activeAssignment} />
          </main>
        )}
      </div>
    </div>
  );
}
