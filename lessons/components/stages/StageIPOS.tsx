'use client';

import React, { useState, useEffect } from 'react';
import { iposAnalogies, iposHardwareSteps } from '../../data/module1';
import { IPOSPhase } from '../../types/curriculum';
import {
  KeyboardIcon,
  Cpu,
  Monitor,
  HardDrive,
  Play,
  RefreshCw,
  ArrowRight,
  CheckCircle,
} from '../icons/Icons';

const PHASES: IPOSPhase[] = ['input', 'processing', 'output', 'storage'];

const PHASE_ICONS: Record<IPOSPhase, React.ComponentType<{ size?: number; className?: string }>> = {
  input: KeyboardIcon,
  processing: Cpu,
  output: Monitor,
  storage: HardDrive,
};

const PHASE_COLORS: Record<IPOSPhase, { ring: string; bg: string; text: string; border: string }> = {
  input: {
    ring: 'ring-amber-500',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/40',
  },
  processing: {
    ring: 'ring-sky-500',
    bg: 'bg-sky-500/10',
    text: 'text-sky-400',
    border: 'border-sky-500/40',
  },
  output: {
    ring: 'ring-emerald-500',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/40',
  },
  storage: {
    ring: 'ring-purple-500',
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-500/40',
  },
};

export function StageIPOS() {
  const [selectedAnalogyId, setSelectedAnalogyId] = useState('cake');
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeAnalogy =
    iposAnalogies.find((a) => a.id === selectedAnalogyId) || iposAnalogies[0];
  const activePhase = PHASES[activePhaseIndex];
  const activeHardware = iposHardwareSteps[activePhase];
  const activeAnalogyStep = activeAnalogy.steps[activePhase];

  // Auto-play stepper
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setActivePhaseIndex((prev) => (prev + 1) % PHASES.length);
      }, 2500);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Analogy Selection Bar */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Teaching Analogy Switcher
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
            Choose an everyday scenario to illustrate the IPOS cycle:
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {iposAnalogies.map((analogy) => {
            const isSelected = analogy.id === selectedAnalogyId;
            return (
              <button
                key={analogy.id}
                onClick={() => {
                  setSelectedAnalogyId(analogy.id);
                  setIsPlaying(false);
                }}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow-md ring-2 ring-emerald-500/30'
                    : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                }`}
              >
                {analogy.title}
              </button>
            );
          })}
        </div>
      </section>

      {/* Visual 4-Step Interactive Pipeline */}
      <section className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {PHASES.map((phase, idx) => {
            const isSelected = idx === activePhaseIndex;
            const Icon = PHASE_ICONS[phase];
            const colors = PHASE_COLORS[phase];
            const stepInfo = iposHardwareSteps[phase];

            return (
              <button
                key={phase}
                onClick={() => {
                  setActivePhaseIndex(idx);
                  setIsPlaying(false);
                }}
                className={`p-4 sm:p-5 rounded-2xl text-left transition-all border cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? `${colors.bg} ${colors.border} ring-2 ${colors.ring} shadow-xl scale-[1.02]`
                    : 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-zinc-400">
                    Step {idx + 1}
                  </span>
                  <Icon
                    size={26}
                    className={isSelected ? colors.text : 'text-zinc-500'}
                  />
                </div>

                <div className="mt-4">
                  <h3 className={`text-xl sm:text-2xl font-black ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                    {stepInfo.name}
                  </h3>
                  <p className="text-xs font-medium text-zinc-400 mt-1 line-clamp-2">
                    {activeAnalogy.steps[phase].label}
                  </p>
                </div>

                {isSelected && (
                  <div className={`mt-3 flex items-center gap-1.5 text-xs font-bold ${colors.text}`}>
                    <CheckCircle size={14} /> Active Phase
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Stepper Controls Bar */}
        <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 px-4 py-3 rounded-xl">
          <div className="text-xs sm:text-sm font-semibold text-zinc-300 flex items-center gap-2">
            <span>Cycle Stepper:</span>
            <span className="text-emerald-400 font-bold uppercase">
              Step {activePhaseIndex + 1} of 4 — {activeHardware.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActivePhaseIndex((prev) => (prev > 0 ? prev - 1 : PHASES.length - 1));
                setIsPlaying(false);
              }}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-200 transition-colors cursor-pointer"
            >
              Previous Phase
            </button>
            <button
              onClick={() => {
                setActivePhaseIndex((prev) => (prev + 1) % PHASES.length);
                setIsPlaying(false);
              }}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-200 transition-colors cursor-pointer"
            >
              Next Phase
            </button>
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-amber-500 text-zinc-950 font-black'
                  : 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400 font-bold'
              }`}
            >
              {isPlaying ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} />}
              <span>{isPlaying ? 'Pause Auto' : 'Auto-Play Flow'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Side-by-Side Deep Dive: Computer Reality vs. Real-World Analogy */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Computer System Reality */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Cpu size={14} /> In Computer Hardware
            </div>
            <h4 className="text-2xl font-black text-white">
              {activeHardware.name} Phase
            </h4>
            <p className="text-base text-zinc-300 mt-2 leading-relaxed">
              {activeHardware.functionDesc}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800/80">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Typical Hardware Used:
            </span>
            <div className="text-base font-bold text-sky-300 mt-1">
              {activeHardware.hardware}
            </div>
          </div>
        </div>

        {/* Selected Analogy Mapping */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/90 border-2 border-emerald-500/30 rounded-2xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
              <ArrowRight size={14} /> Analogy: {activeAnalogy.title}
            </div>
            <h4 className="text-2xl font-black text-emerald-300">
              {activeAnalogyStep.label}
            </h4>
            <p className="text-base text-zinc-200 mt-2 leading-relaxed">
              {activeAnalogyStep.description}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Analogy Key Role:
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              {activeAnalogyStep.badge}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

