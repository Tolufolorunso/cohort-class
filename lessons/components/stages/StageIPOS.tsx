'use client';

import React, { useState, useEffect } from 'react';
import { module1Info, iposAnalogies } from '../../data/module1';
import { IPOSPhase } from '../../types/curriculum';
import { TeacherGuideDrawer } from '../presentation/TeacherGuideDrawer';

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
    simpleDesc: 'Giving raw data and commands to the computer using your hands or voice.',
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
    simpleDesc: 'Saves your work permanently so NEPA power cuts do not erase your notes.',
    hardware: 'Hard Drive (HDD), Solid State Drive (SSD), Flash Drive, Cloud Server',
    color: 'border-purple-500 text-purple-400 bg-purple-500/10',
    badgeBg: 'bg-purple-950/80 text-purple-400 border-purple-800/60',
  },
};

export function StageIPOS() {
  const [activePhase, setActivePhase] = useState<IPOSPhase>('input');
  const [selectedAnalogyId, setSelectedAnalogyId] = useState<string>('cooking');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const stageMeta = module1Info.stages.find((s) => s.id === 'ipos-cycle');
  const teacherNotes = stageMeta?.teacherNotes;

  const currentAnalogy =
    iposAnalogies.find((a) => a.id === selectedAnalogyId) || iposAnalogies[0];
  const activeDetail = PHASE_DETAILS[activePhase];

  // Auto-play through IPOS cycle
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
    }, 2000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 animate-fadeIn select-none">
      {/* 16:9 Presentation Slide Card */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md flex flex-col justify-between min-h-[500px]">
        {/* Slide Header */}
        <div className="border-b border-zinc-800/80 pb-4 mb-5">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-xs uppercase font-black tracking-wider px-2.5 py-1 rounded-full border bg-sky-950/80 text-sky-400 border-sky-800/60">
              LESSON 1 • THE SACRED CYCLE
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying((prev) => !prev)}
                className={`px-3 py-1 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer border ${
                  isPlaying
                    ? 'bg-amber-500 text-zinc-950 border-amber-400 animate-pulse'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700'
                }`}
              >
                <span>{isPlaying ? '⏸ Pause' : '▶ Auto-Play Cycle'}</span>
              </button>
              <span className="text-xs font-mono font-bold text-zinc-500">
                STAGE 02 / 06
              </span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            The IPOS Cycle: Input ➔ Process ➔ Output ➔ Storage
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-1 font-medium">
            Every computer on earth follows these 4 sacred steps in exact sequence.
          </p>
        </div>

        {/* 4 Interactive Phase Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {PHASES.map((phase) => {
            const detail = PHASE_DETAILS[phase];
            const isSelected = activePhase === phase;

            return (
              <button
                key={phase}
                type="button"
                onClick={() => {
                  setActivePhase(phase);
                  setIsPlaying(false);
                }}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-left flex flex-col justify-between gap-2 ${
                  isSelected
                    ? `${detail.color} shadow-lg scale-105 ring-2 ring-white/20`
                    : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 text-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{detail.icon}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-white">
                    {detail.name}
                  </h4>
                  <p className="text-[11px] font-semibold opacity-80 mt-0.5">
                    {detail.action}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Deep Dive Card */}
        <div className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-5 sm:p-6 mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-inner">
          <div className="flex items-start gap-4">
            <span className="text-4xl p-3 rounded-2xl bg-zinc-900 border border-zinc-800 shrink-0">
              {activeDetail.icon}
            </span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${activeDetail.badgeBg}`}>
                  {activeDetail.name}
                </span>
                <span className="text-xs text-zinc-400 font-semibold">
                  • {activeDetail.action}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                {activeDetail.simpleDesc}
              </h3>
              <p className="text-xs text-zinc-400">
                <strong>Hardware Example:</strong> {activeDetail.hardware}
              </p>
            </div>
          </div>
        </div>

        {/* Analogy Storyline Switcher (Cooking, ATM, Cassava) */}
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400 flex items-center gap-1.5">
              <span>🇳🇬</span>
              <span>Everyday Nigerian Analogy:</span>
            </span>
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setSelectedAnalogyId('cooking')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  selectedAnalogyId === 'cooking'
                    ? 'bg-amber-500 text-zinc-950 font-bold'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                🍲 Cooking Yam
              </button>
              <button
                type="button"
                onClick={() => setSelectedAnalogyId('atm')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  selectedAnalogyId === 'atm'
                    ? 'bg-amber-500 text-zinc-950 font-bold'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                🏧 Using ATM
              </button>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            <p>
              In <strong>{currentAnalogy.title}</strong>: {currentAnalogy.steps[activePhase].description}
            </p>
          </div>
        </div>
      </div>

      {/* In-Slide Live Teacher Guide Drawer (Press 'T' or click button) */}
      <TeacherGuideDrawer teacherNotes={teacherNotes} />
    </div>
  );
}
