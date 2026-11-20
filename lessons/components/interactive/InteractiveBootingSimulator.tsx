'use client';

import React, { useState } from 'react';

export function InteractiveBootingSimulator() {
  const [bootMode, setBootMode] = useState<'cold' | 'warm'>('cold');
  const [bootProgress, setBootProgress] = useState<number>(0);
  const [isBooting, setIsBooting] = useState<boolean>(false);
  const [bootLog, setBootLog] = useState<string>('System Idle. Click a button below to simulate startup.');

  const triggerBootSimulation = (mode: 'cold' | 'warm') => {
    if (isBooting) return;
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
      }, (index + 1) * 600);
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full my-auto">
      {/* 2 Simulator Triggers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={() => triggerBootSimulation('cold')}
          disabled={isBooting}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3.5 shadow-sm ${
            bootMode === 'cold' && isBooting
              ? 'bg-cyan-950/70 border-cyan-500 text-white ring-2 ring-cyan-500/50'
              : 'bg-zinc-950/70 border-zinc-800 hover:border-cyan-500/50 text-zinc-300'
          }`}
        >
          <span className="text-3xl p-2 rounded-xl bg-zinc-900 border border-zinc-800">
            🧊
          </span>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black uppercase text-cyan-400">Cold Boot</span>
              <span className="text-[10px] text-zinc-500 font-mono">(Physical Power)</span>
            </div>
            <span className="text-xs text-zinc-400 font-normal block mt-0.5">
              Waking from 0V dead power. Runs full BIOS POST diagnostic.
            </span>
          </div>
        </button>

        <button
          onClick={() => triggerBootSimulation('warm')}
          disabled={isBooting}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3.5 shadow-sm ${
            bootMode === 'warm' && isBooting
              ? 'bg-amber-950/70 border-amber-500 text-white ring-2 ring-amber-500/50'
              : 'bg-zinc-950/70 border-zinc-800 hover:border-amber-500/50 text-zinc-300'
          }`}
        >
          <span className="text-3xl p-2 rounded-xl bg-zinc-900 border border-zinc-800">
            🔥
          </span>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black uppercase text-amber-400">Warm Boot</span>
              <span className="text-[10px] text-zinc-500 font-mono">(Ctrl + Alt + Del)</span>
            </div>
            <span className="text-xs text-zinc-400 font-normal block mt-0.5">
              Restarting a running system. Skips memory check for speed.
            </span>
          </div>
        </button>
      </div>

      {/* Virtual Computer Screen Terminal */}
      <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 font-mono shadow-inner flex flex-col justify-between min-h-[160px]">
        <div>
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-900 text-[11px] text-zinc-500">
            <span>BIOS / EFI VIRTUAL CONSOLE • DZ-ROM v2.4</span>
            <span className={isBooting ? 'text-amber-400 animate-pulse' : 'text-emerald-400'}>
              {isBooting ? 'BOOTING...' : bootProgress === 100 ? 'ONLINE' : 'STANDBY'}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-emerald-400 leading-relaxed font-semibold">
            {bootLog}
          </p>
        </div>

        {/* Startup Progress Bar */}
        <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden mt-4">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              bootMode === 'cold' ? 'bg-cyan-500' : 'bg-amber-500'
            }`}
            style={{ width: `${bootProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
