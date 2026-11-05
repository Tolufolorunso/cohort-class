'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../components/navigation/Header';
import { StageShell } from '../components/presentation/StageShell';
import { StudentNotesView } from '../components/notes/StudentNotesView';
import { AssignmentView } from '../components/assignments/AssignmentView';
import { InstructorDashboard } from '../components/teacher/InstructorDashboard';

import { StageDefinition } from '../components/stages/StageDefinition';
import { StageIPOS } from '../components/stages/StageIPOS';
import { StageTimeline } from '../components/stages/StageTimeline';
import { StageDeviceSorting } from '../components/stages/StageDeviceSorting';
import { StageApplications } from '../components/stages/StageApplications';
import { StageQuiz } from '../components/stages/StageQuiz';

import { module1Notes, module1Assignment } from '../data/module1';
import {
  ActiveView,
  UserRole,
  ZoomLevel,
  ModuleLockState,
} from '../types/platform';
import {
  getUserRole,
  setUserRole,
  getZoomLevel,
  setZoomLevel,
  getUnlockedModules,
} from '../lib/platformStorage';

export default function Home() {
  const [currentModuleId, setCurrentModuleId] = useState<string>('module-1');
  const [activeView, setActiveView] = useState<ActiveView>('stage');
  const [zoomLevel, setZoomState] = useState<ZoomLevel>('normal');
  const [userRole, setRoleState] = useState<UserRole>('student');
  const [unlockedModuleIds, setUnlockedModuleIds] = useState<string[]>(['module-1']);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Initialize saved platform settings on client mount (safe with React 19 / Next 16 lint rule)
  useEffect(() => {
    const timer = setTimeout(() => {
      setRoleState(getUserRole());
      const savedZoom = getZoomLevel();
      setZoomState(savedZoom);
      setUnlockedModuleIds(getUnlockedModules());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Synchronize visual zoom scaling across the document for projector readability
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    if (zoomLevel === 'xlarge') {
      root.style.fontSize = '20.5px'; // 130% scaling for distant or low-light projectors
    } else if (zoomLevel === 'large') {
      root.style.fontSize = '18.5px'; // 115% scaling for standard classroom projectors
    } else {
      root.style.fontSize = '16px'; // 100% normal scale
    }
  }, [zoomLevel]);

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

  const handleZoomChange = (level: ZoomLevel) => {
    setZoomState(level);
    setZoomLevel(level);
  };

  const handleRoleChange = (role: UserRole) => {
    setRoleState(role);
    setUserRole(role);
  };

  const handleUpdateLockState = (state: ModuleLockState) => {
    setUnlockedModuleIds(state.unlockedModuleIds);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-emerald-500 selection:text-zinc-950">
      {/* Enhanced Classroom Navigation Header */}
      <Header
        currentModuleId={currentModuleId}
        onSelectModule={setCurrentModuleId}
        activeView={activeView}
        onSelectView={setActiveView}
        zoomLevel={zoomLevel}
        onChangeZoom={handleZoomChange}
        userRole={userRole}
        onChangeRole={handleRoleChange}
        unlockedModuleIds={unlockedModuleIds}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
      />

      {/* Main View Router */}
      <div className="flex-1 flex flex-col">
        {activeView === 'stage' && (
          <StageShell>
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
                  return <StageQuiz userRole={userRole} />;
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

        {activeView === 'dashboard' && (
          <main className="flex-1">
            <InstructorDashboard
              currentModuleId={currentModuleId}
              onSelectModule={setCurrentModuleId}
              unlockedModuleIds={unlockedModuleIds}
              onUpdateLockState={handleUpdateLockState}
              onClose={() => setActiveView('stage')}
            />
          </main>
        )}
      </div>
    </div>
  );
}
