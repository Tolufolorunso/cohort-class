'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, Maximize, Minimize } from '../icons/Icons';

interface PresenterControlsProps {
  currentStageIndex: number;
  totalStages: number;
  onPrev: () => void;
  onNext: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export function PresenterControls({
  currentStageIndex,
  totalStages,
  onPrev,
  onNext,
  isFullscreen,
  onToggleFullscreen,
}: PresenterControlsProps) {
  const isFirst = currentStageIndex === 0;
  const isLast = currentStageIndex === totalStages - 1;

  return (
    <footer className="w-full bg-zinc-900 border-t border-zinc-800 text-white select-none sticky bottom-0 z-40 px-4 py-3 sm:px-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Keyboard shortcut guide for the teacher */}
        <div className="hidden md:flex items-center gap-2 text-xs text-zinc-400 font-mono">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700">←</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700">→</kbd>
            <span className="ml-1">Navigate</span>
          </span>
          <span className="text-zinc-600">•</span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700">Space</kbd>
            <span className="ml-1">Next</span>
          </span>
          <span className="text-zinc-600">•</span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700">F</kbd>
            <span className="ml-1">Fullscreen</span>
          </span>
          <span className="text-zinc-600">•</span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700">1-6</kbd>
            <span className="ml-1">Stage Jump</span>
          </span>
        </div>

        {/* Primary Stage Navigation Buttons */}
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3">
          <button
            onClick={onPrev}
            disabled={isFirst}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${isFirst
                ? 'bg-zinc-800/50 text-zinc-600 cursor-not-allowed border border-zinc-800'
                : 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 active:scale-95 border border-zinc-700 shadow-sm'
              }`}
            aria-label="Previous presentation stage"
          >
            <ChevronLeft size={18} />
            <span>Previous</span>
          </button>

          <span className="sm:hidden text-xs font-semibold text-zinc-400">
            {currentStageIndex + 1} / {totalStages}
          </span>

          <button
            onClick={onNext}
            disabled={isLast}
            className={`flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${isLast
                ? 'bg-zinc-800/50 text-zinc-600 cursor-not-allowed border border-zinc-800'
                : 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400 active:scale-95 shadow-md shadow-emerald-500/20'
              }`}
            aria-label="Next presentation stage"
          >
            <span>{isLast ? 'Completed' : 'Next Stage'}</span>
            <ChevronRight size={18} />
          </button>

          {/* Fullscreen Toggle Button */}
          <button
            onClick={onToggleFullscreen}
            className="flex items-center justify-center p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all cursor-pointer border border-zinc-700"
            title={isFullscreen ? 'Exit Fullscreen (F)' : 'Enter Fullscreen (F)'}
            aria-label="Toggle Fullscreen Mode"
          >
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
        </div>
      </div>
    </footer>
  );
}

