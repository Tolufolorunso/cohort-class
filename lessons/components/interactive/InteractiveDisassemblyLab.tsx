'use client';

import React, { useState } from 'react';
import { disassemblySteps } from '../../data/module2';

export function InteractiveDisassemblyLab() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  const activeStep = disassemblySteps[currentStepIndex] || disassemblySteps[0];
  const isCompleted = Boolean(completedSteps[activeStep.stepNumber]);

  const handleCompleteCurrent = () => {
    setCompletedSteps((prev) => ({
      ...prev,
      [activeStep.stepNumber]: true,
    }));
  };

  const handleNext = () => {
    if (currentStepIndex < disassemblySteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const completedCount = Object.keys(completedSteps).length;

  return (
    <div className="flex flex-col gap-4 w-full my-auto">
      {/* 7-Step Navigation Strip */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {disassemblySteps.map((step, idx) => {
          const isDone = completedSteps[step.stepNumber];
          const isCurrent = idx === currentStepIndex;

          return (
            <button
              key={step.stepNumber}
              onClick={() => setCurrentStepIndex(idx)}
              className={`p-2 rounded-xl text-center transition-all cursor-pointer border ${
                isCurrent
                  ? 'bg-emerald-500 text-zinc-950 border-emerald-400 font-black shadow-md scale-105'
                  : isDone
                  ? 'bg-zinc-800 text-emerald-400 border-emerald-700/60 font-bold'
                  : 'bg-zinc-950/70 text-zinc-400 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="text-[10px] font-mono uppercase">Step {step.stepNumber}</div>
              <div className="text-base sm:text-xl mt-0.5">{step.icon}</div>
            </button>
          );
        })}
      </div>

      {/* Main Action Showcase Card */}
      <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-5 shadow-md">
        <div className="flex items-start gap-4">
          <span className="text-5xl p-3 rounded-2xl bg-zinc-900 border border-zinc-700 text-white shrink-0">
            {activeStep.icon}
          </span>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                Step {activeStep.stepNumber} of 7: {activeStep.componentRevealed}
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                {activeStep.actionPrompt}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">
              {activeStep.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed max-w-xl">
              {activeStep.componentRole}
            </p>
            <div className="mt-2 text-[11px] text-amber-300 flex items-center gap-1.5 font-medium">
              <span>⚠️ Safety Notice:</span>
              <span>{activeStep.safetyCaution}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col items-center gap-2 shrink-0 w-full sm:w-auto">
          <button
            onClick={handleCompleteCurrent}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-black text-xs transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2 ${
              isCompleted
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950'
            }`}
          >
            <span>{isCompleted ? '✅ Action Performed' : '🔧 Click to Perform Step'}</span>
          </button>
          <span className="text-[10px] text-zinc-500 font-mono">
            Progress: {completedCount} / 7 Steps Complete
          </span>
        </div>
      </div>

      {/* Navigation footer */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentStepIndex === 0}
          className="px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:pointer-events-none text-zinc-300 text-xs font-bold transition-all cursor-pointer"
        >
          ← Prev Step
        </button>
        <span className="text-xs text-zinc-400 font-medium">
          Step {currentStepIndex + 1}: {activeStep.componentRevealed}
        </span>
        <button
          onClick={handleNext}
          disabled={currentStepIndex === disassemblySteps.length - 1}
          className="px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:pointer-events-none text-zinc-300 text-xs font-bold transition-all cursor-pointer"
        >
          Next Step →
        </button>
      </div>
    </div>
  );
}
