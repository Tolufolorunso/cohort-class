'use client';

import React, { useState, useEffect } from 'react';
import { iposAnalogies } from '../../data/module1';
import { IPOSPhase } from '../../types/curriculum';

const PHASES: IPOSPhase[] = ['input', 'processing', 'output', 'storage'];

const PHASE_DETAILS: Record<
  IPOSPhase,
  {
    name: string;
    action: string;
    icon: string;
    simpleDesc: string;
    hardware: string;
    color: string;
    badgeBg: string;
  }
> = {
  input: {
    name: '1. INPUT',
    action: 'You Feed It',
    icon: '⌨️',
    simpleDesc: 'Giving raw data and commands to the computer using your hands, voice, or card.',
    hardware: 'Keyboard, Mouse, Touchpad, Scanner, Microphone, ATM Keypad',
    color: 'border-amber-500 text-amber-400 bg-amber-500/10',
    badgeBg: 'bg-amber-950/80 text-amber-400 border-amber-800/60',
  },
  processing: {
    name: '2. PROCESS',
    action: 'It Works & Calculates',
    icon: '⚙️',
    simpleDesc: 'The microchip CPU brain calculates, checks passwords, and follows rules in milliseconds.',
    hardware: 'CPU (Processor), Motherboard, RAM Memory',
    color: 'border-sky-500 text-sky-400 bg-sky-500/10',
    badgeBg: 'bg-sky-950/80 text-sky-400 border-sky-800/60',
  },
  output: {
    name: '3. OUTPUT',
    action: 'It Shows & Delivers',
    icon: '🖥️',
    simpleDesc: 'The machine delivers finished, meaningful results for you to see, hear, or hold.',
    hardware: 'Monitor screen, Speakers, Printers, ATM Cash Dispenser',
    color: 'border-emerald-500 text-emerald-400 bg-emerald-500/10',
    badgeBg: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60',
  },
  storage: {
    name: '4. STORAGE',
    action: 'It Preserves for Later',
    icon: '💾',
    simpleDesc: 'Saves your work permanently so power outages never erase your notes.',
    hardware: 'Hard Drive (HDD), Solid State Drive (SSD), Flash Drive, Cloud Server',
    color: 'border-purple-500 text-purple-400 bg-purple-500/10',
    badgeBg: 'bg-purple-950/80 text-purple-400 border-purple-800/60',
  },
};

export function InteractiveIPOSLab() {
  const [activePhase, setActivePhase] = useState<IPOSPhase>('input');
  const [selectedAnalogyId, setSelectedAnalogyId] = useState<string>('cooking');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const currentAnalogy =
    iposAnalogies.find((a) => a.id === selectedAnalogyId) || iposAnalogies[0];
  const activeDetail = PHASE_DETAILS[activePhase];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActivePhase((prev) => {
        const idx = PHASES.indexOf(prev);
        if (idx === PHASES.length - 1) {
          setIsPlaying(false);
          return PHASES[0];
        }
        return PHASES[idx + 1];
      });
    }, 2200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex flex-col gap-5 w-full my-auto">
      {/* 4 Interactive Phase Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PHASES.map((phase) => {
          const detail = PHASE_DETAILS[phase];
          const isActive = activePhase === phase;
          return (
            <button
              key={phase}
              onClick={() => {
                setActivePhase(phase);
                setIsPlaying(false);
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                isActive
                  ? `${detail.color} ring-2 ring-emerald-500/50 shadow-lg scale-[1.02]`
                  : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700 text-zinc-400'
              }`}
            >
              <span className="text-2xl sm:text-3xl p-1.5 rounded-xl bg-zinc-900 border border-zinc-800">
                {detail.icon}
              </span>
              <div>
                <span className="text-xs font-black block text-white tracking-wide">
                  {detail.name}
                </span>
                <span className="text-[11px] font-medium text-zinc-400">
                  {detail.action}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Phase Showcase Card */}
      <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
        <div className="flex items-start gap-4">
          <span className="text-4xl p-3 rounded-2xl bg-zinc-900 border border-zinc-700 text-white shrink-0">
            {activeDetail.icon}
          </span>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${activeDetail.badgeBg}`}>
                {activeDetail.name}
              </span>
              <span className="text-xs font-bold text-zinc-300">
                {activeDetail.action}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-200 font-medium max-w-xl leading-relaxed">
              {activeDetail.simpleDesc}
            </p>
            <div className="mt-2 text-[11px] text-zinc-400">
              <strong className="text-white">Example Hardware: </strong>
              <span>{activeDetail.hardware}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsPlaying((prev) => !prev)}
          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
            isPlaying
              ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-md'
              : 'bg-zinc-800 text-zinc-200 hover:text-white border-zinc-700'
          }`}
        >
          {isPlaying ? '⏸️ Pause Flow' : '▶️ Play Flow Animation'}
        </button>
      </div>

      {/* Everyday Scenario Selector */}
      <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">🇳🇬</span>
          <span className="text-xs font-bold text-emerald-300">
            Real-Life Scenario:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {iposAnalogies.map((analogy) => (
              <button
                key={analogy.id}
                onClick={() => setSelectedAnalogyId(analogy.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedAnalogyId === analogy.id
                    ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {analogy.title}
              </button>
            ))}
          </div>
        </div>
        <p className="text-xs text-emerald-200 font-medium italic text-center sm:text-right">
          👉 In this scenario, {activeDetail.name} is: <strong className="text-white">{currentAnalogy.steps[activePhase].label}</strong> ({currentAnalogy.steps[activePhase].description})
        </p>
      </div>
    </div>
  );
}
