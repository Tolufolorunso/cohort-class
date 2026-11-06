'use client';

import React, { useState } from 'react';
import {
  disassemblySteps,
  module2ImageCards,
  DisassemblyStep,
} from '../../data/module2';
import { EducationalImage } from '../presentation/EducationalImage';
import { BookOpen, Sparkles, CheckCircle, Shield, RefreshCw } from '../icons/Icons';

export function StageSystemUnitDisassembly() {
  const [explanationMode, setExplanationMode] = useState<
    'simple' | 'bookish' | 'nigerian'
  >('simple');

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  const activeStep: DisassemblyStep = disassemblySteps[currentStepIndex];
  const isStepCompleted = Boolean(completedSteps[activeStep.stepNumber]);

  const handlePerformStepAction = () => {
    setCompletedSteps((prev) => ({
      ...prev,
      [activeStep.stepNumber]: true,
    }));
  };

  const handleResetSimulation = () => {
    setCurrentStepIndex(0);
    setCompletedSteps({});
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

  const motherboardImage =
    module2ImageCards.find((c) => c.id === 'motherboard-mainboard') ||
    module2ImageCards[6];

  const cpuImage =
    module2ImageCards.find((c) => c.id === 'cpu-microprocessor-chip') ||
    module2ImageCards[7];

  const ramImage =
    module2ImageCards.find((c) => c.id === 'ram-memory-stick') ||
    module2ImageCards[8];

  const psuImage =
    module2ImageCards.find((c) => c.id === 'power-supply-unit-psu') ||
    module2ImageCards[9];

  // Pick component image based on step
  const getStepImage = () => {
    switch (activeStep.stepNumber) {
      case 3:
        return motherboardImage;
      case 4:
        return cpuImage;
      case 5:
        return ramImage;
      case 7:
        return psuImage;
      default:
        return motherboardImage;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Dual-Layer Language Mode Selector Bar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-2 flex flex-wrap items-center justify-between gap-2 shadow-lg">
        <div className="flex items-center gap-2 px-3 text-xs font-bold text-zinc-400">
          <BookOpen size={16} className="text-emerald-400" />
          <span>How would you like this explained?</span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => setExplanationMode('simple')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              explanationMode === 'simple'
                ? 'bg-emerald-500 text-zinc-950 shadow-md ring-1 ring-emerald-400'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <span>💡 In Simple English</span>
            <span className="text-[10px] opacity-80">(Recommended)</span>
          </button>
          <button
            type="button"
            onClick={() => setExplanationMode('bookish')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              explanationMode === 'bookish'
                ? 'bg-emerald-500 text-zinc-950 shadow-md ring-1 ring-emerald-400'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <span>🎓 Formal Bookish Definition</span>
            <span className="text-[10px] opacity-80">(WAEC / NECO)</span>
          </button>
          <button
            type="button"
            onClick={() => setExplanationMode('nigerian')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              explanationMode === 'nigerian'
                ? 'bg-emerald-500 text-zinc-950 shadow-md ring-1 ring-emerald-400'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <span>🍠 Nigerian Everyday Analogies</span>
          </button>
        </div>
      </div>

      {/* Hero Overview: Inside the System Unit */}
      <section className="bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles size={14} />
            <span>Lesson 3 · Internal Anatomy &amp; Teardown Lab</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            What Is Inside the System Unit?
          </h2>

          {explanationMode === 'simple' && (
            <div className="space-y-3">
              <p className="text-base sm:text-lg text-emerald-300 font-semibold leading-relaxed">
                The system unit is like a house! Inside the house, you have different family members doing different chores:
              </p>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                The <strong>Motherboard</strong> is the floor and foundation; the <strong>CPU</strong> is the clever head of house doing calculations; <strong>RAM</strong> is the active dining table; the <strong>Storage Drive</strong> is the permanent pantry cupboard; and the <strong>Power Supply</strong> is the generator feeding electric power to everyone!
              </p>
            </div>
          )}

          {explanationMode === 'bookish' && (
            <div className="space-y-3">
              <p className="text-base sm:text-lg text-amber-300 font-serif italic leading-relaxed border-l-4 border-amber-500 pl-4">
                &ldquo;The system unit encompasses the chassis enclosure housing core operational modular assemblies: the motherboard planar board, central microprocessor unit, dynamic volatile random access memory, switched-mode power conversion supply, and auxiliary magnetic/solid-state non-volatile storage.&rdquo;
              </p>
              <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-300 font-mono">
                WAEC Distinction: The System Unit is the physical chassis housing. The CPU is the silicon integrated circuit microprocessor chip inside the zero-insertion-force (ZIF) socket.
              </div>
            </div>
          )}

          {explanationMode === 'nigerian' && (
            <div className="space-y-3">
              <p className="text-base sm:text-lg text-orange-300 font-semibold leading-relaxed">
                Think of an engine inside a Toyota car or a commercial cassava grinding machine!
              </p>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                When you look at a car from outside, you see the metal bonnet. But when the mechanic opens the bonnet, you see the engine block (CPU), the fan belt (Cooling), the car battery and alternator (Power Supply), and the fuel tank (Storage)!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Interactive 7-Step PC Disassembly Simulator */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
              <span>Virtual Laboratory Simulation</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              7-Step Hands-On PC Disassembly Lab
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">
              Follow safe electrical laboratory procedure to virtually disassemble a desktop workstation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-zinc-800 text-emerald-400 border border-zinc-700">
              Step {currentStepIndex + 1} of {disassemblySteps.length}
            </span>
            <button
              type="button"
              onClick={handleResetSimulation}
              title="Reset Disassembly"
              className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        {/* Step Progress Pills Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {disassemblySteps.map((step, idx) => {
            const isCurrent = idx === currentStepIndex;
            const isDone = Boolean(completedSteps[step.stepNumber]);
            return (
              <button
                key={step.stepNumber}
                type="button"
                onClick={() => setCurrentStepIndex(idx)}
                className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-emerald-950/80 border-emerald-500 shadow-md ring-2 ring-emerald-500/30'
                    : isDone
                    ? 'bg-zinc-950 border-emerald-800/60 text-emerald-400'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-base">{step.icon}</span>
                  {isDone ? (
                    <span className="text-[10px] text-emerald-400 font-bold">✓</span>
                  ) : (
                    <span className="text-[10px] text-zinc-600 font-mono">#{idx + 1}</span>
                  )}
                </div>
                <span
                  className={`text-[11px] font-bold truncate block ${
                    isCurrent ? 'text-white' : isDone ? 'text-zinc-200' : 'text-zinc-400'
                  }`}
                >
                  {step.title.split(':')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Disassembly Stage Workbay */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 sm:p-7 shadow-inner space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>{activeStep.icon}</span>
                <span>Step {activeStep.stepNumber}: Action Required</span>
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-white">
                {activeStep.title}
              </h4>
            </div>

            {/* Action Trigger Button */}
            <div>
              <button
                type="button"
                onClick={handlePerformStepAction}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 shadow-lg ${
                  isStepCompleted
                    ? 'bg-zinc-800 text-emerald-400 border border-emerald-500/40 cursor-default'
                    : 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400 ring-2 ring-emerald-400/50'
                }`}
              >
                {isStepCompleted ? (
                  <>
                    <CheckCircle size={16} />
                    <span>Step Inspected &amp; Completed!</span>
                  </>
                ) : (
                  <>
                    <span>⚡ Perform Action: {activeStep.title.split(' ')[0]}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action Prompt & Safety Caution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <span>🛠️</span> Student Action:
              </span>
              <p className="text-sm text-zinc-200 font-medium leading-relaxed">
                {activeStep.actionPrompt}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-red-950/20 border border-red-800/40 space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                <Shield size={14} />
                <span>Critical Safety Precaution:</span>
              </span>
              <p className="text-xs sm:text-sm text-red-200 leading-relaxed">
                {activeStep.safetyCaution}
              </p>
            </div>
          </div>

          {/* Revealed Component Spotlight */}
          <div className="p-5 rounded-2xl bg-zinc-900/90 border border-emerald-500/30 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Component Revealed: {activeStep.componentRevealed}
              </span>
              <span className="text-xs font-mono text-zinc-400">
                Inside the System Unit
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              <div className="md:col-span-5">
                <EducationalImage
                  src={getStepImage().url}
                  alt={activeStep.componentRevealed}
                  title={activeStep.componentRevealed}
                  fallbackType={getStepImage().fallbackType}
                  badge="Internal Hardware"
                  aspect="aspect-4/3"
                />
              </div>

              <div className="md:col-span-7 space-y-3">
                <h5 className="text-lg font-bold text-white">
                  Function &amp; Role in the PC:
                </h5>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {activeStep.componentRole}
                </p>

                {/* African Student Classroom Advice */}
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-emerald-600/30 text-xs sm:text-sm text-emerald-300 font-mono flex items-start gap-2.5">
                  <span className="text-base shrink-0">💡</span>
                  <div>
                    <span className="font-bold text-white block mb-0.5">Laboratory Peer Tip:</span>
                    <span>{activeStep.africanStudentTip}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                currentStepIndex === 0
                  ? 'opacity-40 text-zinc-600 cursor-not-allowed'
                  : 'bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700'
              }`}
            >
              &larr; Previous Step
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={currentStepIndex === disassemblySteps.length - 1}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                currentStepIndex === disassemblySteps.length - 1
                  ? 'opacity-40 text-zinc-600 cursor-not-allowed'
                  : 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400 shadow'
              }`}
            >
              Next Step &rarr;
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
