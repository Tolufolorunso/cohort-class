'use client';

import React from 'react';
import { StageMeta } from '../../types/curriculum';

interface ProgressBarProps {
  stages: StageMeta[];
  currentStageIndex: number;
  onSelectStage: (index: number) => void;
  moduleTitle: string;
  phaseName: string;
}

export function ProgressBar({
  stages,
  currentStageIndex,
  onSelectStage,
  moduleTitle,
  phaseName,
}: ProgressBarProps) {
  return (
    <div className="w-full bg-zinc-900/90 border-b border-zinc-800 text-white select-none px-4 py-2.5 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Branding & Phase/Module Information */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center bg-emerald-500 text-zinc-950 font-black text-xs px-2.5 py-1 rounded shadow-sm tracking-wider uppercase">
            Dzuels Lab
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
              {phaseName}
            </div>
            <div className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
              <span>{moduleTitle}</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                Stage {currentStageIndex + 1} of {stages.length}
              </span>
            </div>
          </div>
        </div>

        {/* Step Tracks */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 md:pb-0">
          {stages.map((stage, idx) => {
            const isActive = idx === currentStageIndex;
            const isCompleted = idx < currentStageIndex;

            return (
              <button
                key={stage.id}
                onClick={() => onSelectStage(idx)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${isActive
                    ? 'bg-emerald-500 text-zinc-950 ring-2 ring-emerald-400 ring-offset-2 ring-offset-zinc-900 shadow-md font-bold'
                    : isCompleted
                      ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                      : 'bg-zinc-800/60 text-zinc-400 hover:bg-zinc-800'
                  }`}
                title={stage.title}
                aria-label={`Go to ${stage.title}`}
              >
                <span
                  className={`flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold ${isActive
                      ? 'bg-zinc-950 text-emerald-400'
                      : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-zinc-700 text-zinc-300'
                    }`}
                >
                  {idx + 1}
                </span>
                <span className="hidden sm:inline">
                  {stage.title.split('. ')[1] || stage.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

