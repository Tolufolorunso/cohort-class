'use client';

import React, { useState } from 'react';
import { disassemblySteps, module2Info } from '../../data/module2';
import { TeacherGuideDrawer } from '../presentation/TeacherGuideDrawer';

export function StageSystemUnitDisassembly() {
  const stageMeta = module2Info.stages.find((s) => s.id === 'system-unit-disassembly');
  const teacherNotes = stageMeta?.teacherNotes;

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
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 animate-fadeIn select-none">
      {/* 16:9 Presentation Slide Card */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md flex flex-col justify-between min-h-[520px]">
        {/* Slide Header */}
        <div className="border-b border-zinc-800/80 pb-4 mb-4">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-xs uppercase font-black tracking-wider px-2.5 py-1 rounded-full border bg-emerald-950/80 text-emerald-400 border-emerald-800/60">
              LESSON 3 • SYSTEM UNIT TEARDOWN
            </span>
            <span className="text-xs font-mono font-bold text-zinc-500">
              STAGE 03 / 05
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Inside the System Unit (7-Step Disassembly)
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-1 font-medium">
            Interactive teardown simulator: Explore the internal organs of a desktop workstation.
          </p>
        </div>

        {/* 7-Step Navigation Strip */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Disassembly Sequence: Step {activeStep.stepNumber} of {disassemblySteps.length}
            </span>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {completedCount} / {disassemblySteps.length} Steps Performed
            </span>
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {disassemblySteps.map((step, idx) => {
              const isCurrent = idx === currentStepIndex;
              const isStepDone = Boolean(completedSteps[step.stepNumber]);

              return (
                <button
                  key={step.stepNumber}
                  type="button"
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`py-2 px-1 rounded-xl text-center text-xs font-bold transition-all cursor-pointer border flex flex-col items-center justify-center gap-0.5 ${
                    isCurrent
                      ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-md font-black ring-2 ring-amber-500/30'
                      : isStepDone
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
                      : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <span className="text-sm">{step.icon}</span>
                  <span className="text-[10px] hidden sm:inline truncate max-w-full">
                    Step {step.stepNumber}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Spotlight Card */}
        <div className="p-5 sm:p-7 rounded-2xl bg-zinc-950/80 border border-zinc-800 my-auto grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Left Details */}
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{activeStep.icon}</span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Step {activeStep.stepNumber}: {activeStep.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              <strong>Action:</strong> {activeStep.actionPrompt}
            </p>

            <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/40 text-amber-200 text-xs leading-relaxed flex items-start gap-2">
              <span className="text-base shrink-0">⚠️</span>
              <div>
                <strong>Safety Caution:</strong> {activeStep.safetyCaution}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono">
              💡 <strong>Component Revealed:</strong> {activeStep.componentRevealed} &mdash; {activeStep.componentRole}
            </div>
          </div>

          {/* Right Action Box */}
          <div className="md:col-span-4 flex flex-col justify-between gap-3 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center">
            <div className="space-y-1">
              <span className="text-xs text-zinc-400 font-bold block uppercase tracking-wider">
                Simulation Action
              </span>
              <span className="text-xs text-zinc-500">
                Perform this step to inspect inside
              </span>
            </div>

            <button
              type="button"
              onClick={handleCompleteCurrent}
              className={`w-full py-3 px-4 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-md ${
                isCompleted
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black'
              }`}
            >
              {isCompleted ? '✓ Step Performed!' : '⚡ Simulate This Action'}
            </button>

            <div className="flex items-center justify-between gap-2 pt-2 border-t border-zinc-800 text-xs">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStepIndex === 0}
                className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-700 cursor-pointer"
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentStepIndex === disassemblySteps.length - 1}
                className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-700 cursor-pointer"
              >
                Next →
              </button>
            </div>
          </div>
        </div>

        {/* 4 Internal Organs Quick Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3 text-xs">
          <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800 text-zinc-300">
            <span className="font-bold text-emerald-400 block">🖧 Motherboard</span>
            Main green highway connecting all parts together.
          </div>
          <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800 text-zinc-300">
            <span className="font-bold text-blue-400 block">🧠 CPU Chip</span>
            The brain that performs all calculations.
          </div>
          <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800 text-zinc-300">
            <span className="font-bold text-amber-400 block">⚡ RAM Memory</span>
            Fast temporary desk space (wiped when light goes).
          </div>
          <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800 text-zinc-300">
            <span className="font-bold text-purple-400 block">🔋 Power Supply</span>
            Converts 220V wall AC into safe low-voltage DC.
          </div>
        </div>

        {/* Nigerian Everyday Analogy Callout */}
        <div className="mt-3 bg-gradient-to-r from-emerald-950/60 to-zinc-950 border border-emerald-500/40 rounded-2xl p-3.5 flex items-center gap-3">
          <span className="text-2xl shrink-0">🇳🇬</span>
          <p className="text-xs sm:text-sm text-emerald-200 font-semibold leading-snug">
            <strong>Relatable Nigerian Analogy:</strong> The Motherboard is like a busy marketplace in town. Paved walkways (circuit tracks) connect every shop. The CPU is the chief accountant, and the PSU is the humming diesel generator supplying steady power to every stall!
          </p>
        </div>
      </div>

      {/* In-Slide Live Teacher Guide Drawer (Press 'T' or click button) */}
      <TeacherGuideDrawer teacherNotes={teacherNotes} />
    </div>
  );
}
