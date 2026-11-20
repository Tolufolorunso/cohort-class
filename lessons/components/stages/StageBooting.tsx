'use client';

import React, { useState } from 'react';
import { module3Info } from '../../data/module3';
import { TeacherGuideDrawer } from '../presentation/TeacherGuideDrawer';

export function StageBooting() {
  const stageMeta = module3Info.stages.find((s) => s.id === 'booting-procedures');
  const teacherNotes = stageMeta?.teacherNotes;

  const [bootMode, setBootMode] = useState<'cold' | 'warm'>('cold');
  const [bootProgress, setBootProgress] = useState<number>(0);
  const [isBooting, setIsBooting] = useState<boolean>(false);
  const [bootLog, setBootLog] = useState<string>('System Idle. Press Power to simulate startup.');

  const triggerBootSimulation = (mode: 'cold' | 'warm') => {
    setBootMode(mode);
    setIsBooting(true);
    setBootProgress(0);
    setBootLog(
      mode === 'cold'
        ? '⚡ Cold Boot: AC Power received ➔ PSU power-good signal ➔ Starting BIOS POST...'
        : '🔄 Warm Boot: Soft CPU reset signal ➔ Bypassing POST ➔ Reloading OS kernel...'
    );

    const steps =
      mode === 'cold'
        ? [
            { pct: 25, log: '🔍 POST Diagnostic: CPU registers OK, 8GB DDR4 RAM verified.' },
            { pct: 50, log: '💾 Storage Bus: NVMe SSD detected ➔ Reading EFI Bootloader.' },
            { pct: 75, log: '🚀 OS Loading: Windows kernel & graphics drivers initializing.' },
            { pct: 100, log: '✅ Desktop Ready: User workspace loaded successfully!' },
          ]
        : [
            { pct: 35, log: '🔄 Cache Flushed: Open buffers cleared from RAM.' },
            { pct: 70, log: '🚀 OS Fast Reload: Kernel services restarting smoothly.' },
            { pct: 100, log: '✅ Desktop Ready: Fast restart complete with zero power interruption!' },
          ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setBootProgress(step.pct);
        setBootLog(step.log);
        if (index === steps.length - 1) {
          setIsBooting(false);
        }
      }, (index + 1) * 700);
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 animate-fadeIn select-none">
      {/* 16:9 Presentation Slide Card */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md flex flex-col justify-between min-h-[520px]">
        {/* Slide Header */}
        <div className="border-b border-zinc-800/80 pb-4 mb-5">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-xs uppercase font-black tracking-wider px-2.5 py-1 rounded-full border bg-cyan-950/80 text-cyan-400 border-cyan-800/60">
              LESSON 1 • POWER & BOOTING
            </span>
            <span className="text-xs font-mono font-bold text-zinc-500">
              STAGE 01 / 06
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Booting Your Computer: Cold vs. Warm Boot
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-1 font-medium">
            How a computer wakes up from zero power, checks its hardware (POST), and loads your desktop.
          </p>
        </div>

        {/* 2 Big Core Concept Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {/* Card 1: Cold Boot */}
          <div
            onClick={() => triggerBootSimulation('cold')}
            className={`p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
              bootMode === 'cold'
                ? 'bg-cyan-950/40 border-cyan-500/50 shadow-md ring-1 ring-cyan-500/30'
                : 'bg-zinc-950/70 border-zinc-800/80 hover:border-zinc-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Cold Booting
                  </h3>
                </div>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                  From Zero Power
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Starting the computer when it was <strong>completely switched off</strong> by pressing the physical hardware power button.
              </p>
              <ul className="mt-2 space-y-1 text-xs text-zinc-400">
                <li>• Power rails energize the motherboard.</li>
                <li>• Firmware runs full <strong>POST (Power-On Self-Test)</strong>.</li>
                <li>• Loads Operating System into volatile RAM from scratch.</li>
              </ul>
            </div>
            <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 text-xs font-mono">
              🛵 <strong>Analogy:</strong> Waking up in the morning and kick-starting your motorcycle from cold sleep!
            </div>
          </div>

          {/* Card 2: Warm Boot (Restart) */}
          <div
            onClick={() => triggerBootSimulation('warm')}
            className={`p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
              bootMode === 'warm'
                ? 'bg-emerald-950/40 border-emerald-500/50 shadow-md ring-1 ring-emerald-500/30'
                : 'bg-zinc-950/70 border-zinc-800/80 hover:border-zinc-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🔄</span>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Warm Booting (Restart)
                  </h3>
                </div>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                  Power Stays ON
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Reloading the operating system while the computer is <strong>already running</strong>, without cutting electricity.
              </p>
              <ul className="mt-2 space-y-1 text-xs text-zinc-400">
                <li>• Triggered via <strong>Start Menu ➔ Restart</strong> or <strong>Ctrl + Alt + Del</strong>.</li>
                <li>• Bypasses the initial hardware POST diagnostic.</li>
                <li>• Resets memory registers smoothly to fix app freezes.</li>
              </ul>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-xs font-mono">
              🚦 <strong>Analogy:</strong> Idling at a traffic light and releasing the clutch—already warm and running!
            </div>
          </div>
        </div>

        {/* Interactive Live Booting Simulator Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-white">
                Interactive Boot Simulation:
              </span>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/60">
                {bootMode === 'cold' ? '⚡ Cold Boot' : '🔄 Warm Boot'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => triggerBootSimulation('cold')}
                disabled={isBooting}
                className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-zinc-950 text-xs font-black transition-all cursor-pointer shadow-sm active:scale-95"
              >
                Simulate Cold Boot
              </button>
              <button
                type="button"
                onClick={() => triggerBootSimulation('warm')}
                disabled={isBooting}
                className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-zinc-950 text-xs font-black transition-all cursor-pointer shadow-sm active:scale-95"
              >
                Simulate Warm Boot
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-zinc-900 rounded-full h-3 overflow-hidden border border-zinc-800">
            <div
              className={`h-full transition-all duration-500 ${
                bootMode === 'cold' ? 'bg-cyan-400' : 'bg-emerald-400'
              }`}
              style={{ width: `${bootProgress}%` }}
            />
          </div>

          {/* Terminal Console Output */}
          <div className="font-mono text-xs text-zinc-300 bg-black/60 p-2.5 rounded-xl border border-zinc-800/80 flex items-center justify-between">
            <span className="truncate">{bootLog}</span>
            <span className="font-bold text-cyan-400 ml-2">{bootProgress}%</span>
          </div>
        </div>
      </div>

      {/* Teacher Guide Drawer */}
      <TeacherGuideDrawer teacherNotes={teacherNotes} />
    </div>
  );
}
