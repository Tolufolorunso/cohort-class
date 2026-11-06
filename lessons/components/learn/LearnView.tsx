'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '../navigation/Header';
import { StageShell } from '../presentation/StageShell';
import { StudentLogin } from '../auth/StudentLogin';
import { useClassroomAttention } from '../../hooks/useClassroomAttention';

import { StageDefinition } from '../stages/StageDefinition';
import { StageIPOS } from '../stages/StageIPOS';
import { StageTimeline } from '../stages/StageTimeline';
import { StageDeviceSorting } from '../stages/StageDeviceSorting';
import { StageApplications } from '../stages/StageApplications';

import { StageHardwareAnatomy } from '../stages/StageHardwareAnatomy';
import { StageInputOutputLab } from '../stages/StageInputOutputLab';
import { StageSystemUnitDisassembly } from '../stages/StageSystemUnitDisassembly';
import { StageStorageBytes } from '../stages/StageStorageBytes';
import { StageModuleComplete } from '../stages/StageModuleComplete';

import { module1Info } from '../../data/module1';
import { module2Info } from '../../data/module2';
import { ZoomLevel, StudentSession, SyncMode } from '../../types/platform';
import { getZoomLevel, setZoomLevel, getUnlockedModules } from '../../lib/platformStorage';
import { getStudentSession, clearStudentSession, saveStudentSession } from '../../lib/roster';

interface LearnViewProps {
  moduleId: string;
}

export function LearnView({ moduleId }: LearnViewProps) {
  const router = useRouter();

  const [studentSession, setStudentSessionState] = useState<StudentSession | null>(null);
  const [hasCheckedSession, setHasCheckedSession] = useState(false);

  const [zoomLevel, setZoomState] = useState<ZoomLevel>('normal');
  const [unlockedModuleIds, setUnlockedModuleIds] = useState<string[]>(['module-1']);
  const [syncMode, setSyncMode] = useState<SyncMode>('follow-teacher');
  const [liveStageIndex, setLiveStageIndex] = useState<number>(0);
  const [studentStageIndex, setStudentStageIndex] = useState<number>(0);
  const [hasUserNavigated, setHasUserNavigated] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const attention = useClassroomAttention();

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

  // Real-time live slide mirroring & heartbeat polling
  useEffect(() => {
    if (!studentSession) return;

    const pollSession = async () => {
      try {
        const queryParams = new URLSearchParams();
        queryParams.set('mode', studentSession.mode || 'solo');
        queryParams.set('patron', studentSession.patronNumber);
        queryParams.set('name', studentSession.studentName);
        if (studentSession.mode === 'partner' && studentSession.partnerB) {
          queryParams.set('patronA', studentSession.partnerA.patronNumber);
          queryParams.set('nameA', studentSession.partnerA.studentName);
          queryParams.set('patronB', studentSession.partnerB.patronNumber);
          queryParams.set('nameB', studentSession.partnerB.studentName);
        }
        queryParams.set('isFocused', String(attention.isFocused));
        if (!attention.isFocused && attention.leftScreenAt) {
          queryParams.set('leftScreenAt', String(attention.leftScreenAt));
        }

        const url = `/api/live-session?${queryParams.toString()}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setSyncMode(data.syncMode || 'follow-teacher');

          if (typeof data.activeStageIndex === 'number') {
            setLiveStageIndex(data.activeStageIndex);
            // If student has not manually navigated yet, follow teacher's slide
            if (!hasUserNavigated && data.syncMode === 'follow-teacher') {
              setStudentStageIndex(data.activeStageIndex);
            }
          }
          if (data.activeModuleId && data.activeModuleId !== moduleId) {
            router.push(`/learn/${data.activeModuleId}`);
          }
        }
      } catch {
        // Lab offline fallback
      }
    };

    pollSession();
    const interval = setInterval(pollSession, 1500);
    return () => clearInterval(interval);
  }, [studentSession, moduleId, attention.isFocused, attention.leftScreenAt, router, hasUserNavigated]);

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
    router.push('/');
  }, [router]);

  const handleStageChange = useCallback((newIndex: number) => {
    setStudentStageIndex(newIndex);
    setHasUserNavigated(true);
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

  const activeModuleInfo = moduleId === 'module-2' ? module2Info : module1Info;

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-emerald-500 selection:text-zinc-950">
      <Header
        currentModuleId={moduleId}
        onSelectModule={(newModId) => router.push(`/learn/${newModId}`)}
        activeView="stage"
        zoomLevel={zoomLevel}
        onChangeZoom={handleZoomChange}
        unlockedModuleIds={unlockedModuleIds}
        session={studentSession}
        syncMode={syncMode}
        onLogout={handleLogout}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
      />

      <div className="flex-1 flex flex-col relative">
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
              case 'module1-complete':
              case 'review-quiz':
                return <StageModuleComplete moduleId={moduleId} />;

              case 'hardware-anatomy':
                return <StageHardwareAnatomy />;
              case 'input-output-lab':
                return <StageInputOutputLab />;
              case 'system-unit-disassembly':
                return <StageSystemUnitDisassembly />;
              case 'storage-and-bytes':
                return <StageStorageBytes />;
              case 'module2-complete':
              case 'module2-quiz':
                return <StageModuleComplete moduleId={moduleId} />;

              default:
                return moduleId === 'module-2' ? <StageHardwareAnatomy /> : <StageDefinition />;
            }
          }}
        </StageShell>
      </div>
    </div>
  );
}

