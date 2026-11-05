'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ProgressBar } from './ProgressBar';
import { PresenterControls } from './PresenterControls';
import { module1Info } from '../../data/module1';

interface StageShellProps {
  initialStageIndex?: number;
  currentStageIndex?: number;
  onStageChange?: (index: number) => void;
  children: (currentStageIndex: number, currentStageId: string) => React.ReactNode;
}

export function StageShell({
  initialStageIndex = 0,
  currentStageIndex: propStageIndex,
  onStageChange,
  children,
}: StageShellProps) {
  const [internalStageIndex, setInternalStageIndex] = useState(initialStageIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const totalStages = module1Info.stages.length;
  const currentStageIndex = propStageIndex !== undefined ? propStageIndex : internalStageIndex;

  const handleNext = useCallback(() => {
    const next = currentStageIndex < totalStages - 1 ? currentStageIndex + 1 : currentStageIndex;
    setInternalStageIndex(next);
    onStageChange?.(next);
  }, [currentStageIndex, totalStages, onStageChange]);

  const handlePrev = useCallback(() => {
    const prev = currentStageIndex > 0 ? currentStageIndex - 1 : currentStageIndex;
    setInternalStageIndex(prev);
    onStageChange?.(prev);
  }, [currentStageIndex, onStageChange]);

  const handleSelectStage = useCallback((index: number) => {
    if (index >= 0 && index < totalStages) {
      setInternalStageIndex(index);
      onStageChange?.(index);
    }
  }, [totalStages, onStageChange]);

  const handleToggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {
        // Fallback or ignore if denied
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => { });
      }
    }
  }, []);

  // Sync fullscreen state
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  // Global presentation keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        handleToggleFullscreen();
      } else if (/^[1-6]$/.test(e.key)) {
        const stageNum = parseInt(e.key, 10);
        handleSelectStage(stageNum - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, handleToggleFullscreen, handleSelectStage]);

  const currentStage = module1Info.stages[currentStageIndex];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-emerald-500 selection:text-zinc-950">
      {/* Top Progress & Module Bar */}
      <ProgressBar
        stages={module1Info.stages}
        currentStageIndex={currentStageIndex}
        onSelectStage={handleSelectStage}
        moduleTitle={module1Info.title}
        phaseName={module1Info.phaseName}
      />

      {/* Main Presentation Surface */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 flex flex-col">
        {/* Stage Header Banner for Projector */}
        <div className="mb-6 sm:mb-8 border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
            <span>Stage {currentStageIndex + 1} of {totalStages}</span>
            <span>•</span>
            <span>{currentStage.type.toUpperCase()}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            {currentStage.title}
          </h1>
          <p className="text-base sm:text-xl text-zinc-400 mt-2 font-medium">
            {currentStage.subtitle}
          </p>
        </div>

        {/* Dynamic Stage Content */}
        <div className="flex-1">
          {children(currentStageIndex, currentStage.id)}
        </div>
      </main>

      {/* Bottom Presenter Controls Bar */}
      <PresenterControls
        currentStageIndex={currentStageIndex}
        totalStages={totalStages}
        onPrev={handlePrev}
        onNext={handleNext}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
      />
    </div>
  );
}

