'use client';

import React, { useState } from 'react';
import { module3Info } from '../../data/module3';
import { TeacherGuideDrawer } from '../presentation/TeacherGuideDrawer';

export function StageDesktopControls() {
  const stageMeta = module3Info.stages.find((s) => s.id === 'desktop-navigation');
  const teacherNotes = stageMeta?.teacherNotes;

  const [windowState, setWindowState] = useState<'normal' | 'minimized' | 'maximized'>('normal');
  const [windowClosed, setWindowClosed] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>(
    'Try clicking the Minimize (➖), Maximize (🗖), and Close (❌) buttons on the sample window below!'
  );

  const handleMinimize = () => {
    setWindowState('minimized');
    setStatusMessage('➖ Minimized: Window is hidden to the taskbar. Your work is still alive in RAM!');
  };

  const handleMaximize = () => {
    setWindowState((prev) => (prev === 'maximized' ? 'normal' : 'maximized'));
    setStatusMessage(
      windowState === 'maximized'
        ? '🗗 Restored: Window returned to its normal medium floating box.'
        : '🗖 Maximized: Window expanded to take up the full screen workspace!'
    );
  };

  const handleClose = () => {
    setWindowClosed(true);
    setStatusMessage('❌ Closed: Application shut down completely and released its memory.');
  };

  const handleRestore = () => {
    setWindowClosed(false);
    setWindowState('normal');
    setStatusMessage('✨ Re-opened: Application launched fresh on the desktop workspace.');
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 animate-fadeIn select-none">
      {/* 16:9 Presentation Slide Card */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md flex flex-col justify-between min-h-[520px]">
        {/* Slide Header */}
        <div className="border-b border-zinc-800/80 pb-4 mb-5">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-xs uppercase font-black tracking-wider px-2.5 py-1 rounded-full border bg-amber-950/80 text-amber-400 border-amber-800/60">
              LESSON 2 • DESKTOP & WINDOW CONTROLS
            </span>
            <span className="text-xs font-mono font-bold text-zinc-500">
              STAGE 02 / 06
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            The Desktop &amp; Window Control Trio
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-1 font-medium">
            Take command of your digital desk: Minimize to taskbar, Maximize to full screen, and Close to quit.
          </p>
        </div>

        {/* 3 Window Control Trio Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-5">
          {/* Minimize */}
          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center font-bold text-white text-xs">
                  ➖
                </span>
                <h3 className="text-sm font-bold text-white">Minimize</h3>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Temporarily hides the window to the bottom Taskbar without closing it.
              </p>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60 mt-2 block">
              Work stays alive in RAM
            </span>
          </div>

          {/* Maximize */}
          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center font-bold text-white text-xs">
                  🗖
                </span>
                <h3 className="text-sm font-bold text-white">Maximize / Restore</h3>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Expands the window to fill the entire monitor, or restores it to a floating box.
              </p>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60 mt-2 block">
              Full screen focus mode
            </span>
          </div>

          {/* Close */}
          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-7 h-7 rounded-lg bg-red-950 text-red-400 flex items-center justify-center font-bold text-xs border border-red-800/60">
                  ❌
                </span>
                <h3 className="text-sm font-bold text-white">Close</h3>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Shuts down the application completely and releases its memory back to the computer.
              </p>
            </div>
            <span className="text-[10px] font-mono text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-800/60 mt-2 block">
              Save before clicking!
            </span>
          </div>
        </div>

        {/* Interactive Virtual Window Playground */}
        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
              Interactive Window Controls Playground:
            </span>
            <span className="text-xs text-zinc-400 font-mono">
              Status: <strong className="text-white">{windowClosed ? 'CLOSED' : windowState.toUpperCase()}</strong>
            </span>
          </div>

          {/* Simulated Window Box */}
          {!windowClosed ? (
            <div
              className={`rounded-2xl border transition-all duration-300 overflow-hidden shadow-2xl bg-zinc-900 ${
                windowState === 'minimized'
                  ? 'h-10 opacity-60 border-zinc-800 scale-95'
                  : windowState === 'maximized'
                  ? 'min-h-[160px] border-amber-500/60 ring-2 ring-amber-500/30'
                  : 'min-h-[140px] border-zinc-700'
              }`}
            >
              {/* Window Header Title Bar */}
              <div className="bg-zinc-800/90 px-3 py-2 border-b border-zinc-700/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs">📝</span>
                  <span className="text-xs font-bold text-white font-mono">
                    My_First_Class_Essay.txt — WordPad
                  </span>
                </div>
                {/* Real Clickable Trio Buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleMinimize}
                    className="w-6 h-6 rounded bg-zinc-700 hover:bg-zinc-600 text-zinc-300 hover:text-white flex items-center justify-center text-xs font-bold transition-all cursor-pointer"
                    title="Minimize"
                  >
                    ➖
                  </button>
                  <button
                    type="button"
                    onClick={handleMaximize}
                    className="w-6 h-6 rounded bg-zinc-700 hover:bg-zinc-600 text-zinc-300 hover:text-white flex items-center justify-center text-xs font-bold transition-all cursor-pointer"
                    title="Maximize / Restore"
                  >
                    🗖
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-6 h-6 rounded bg-red-900/80 hover:bg-red-600 text-red-200 hover:text-white flex items-center justify-center text-xs font-bold transition-all cursor-pointer"
                    title="Close"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Window Body */}
              {windowState !== 'minimized' && (
                <div className="p-4 text-xs text-zinc-300 space-y-2">
                  <p className="text-zinc-200 font-semibold">
                    &quot;Hello! I am a student at Dzuels Computer Class in Ekiti State. Today I learned how to control application windows like a professional software engineer!&quot;
                  </p>
                  <p className="text-[11px] text-zinc-500">
                    Press the ➖, 🗖, or ❌ buttons above to observe how the window responds.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-dashed border-zinc-700 text-center flex flex-col items-center justify-center gap-2">
              <span className="text-2xl">🚪</span>
              <p className="text-xs text-zinc-300">
                You clicked the <strong>Close (❌)</strong> button! The application window was completely closed.
              </p>
              <button
                type="button"
                onClick={handleRestore}
                className="mt-1 px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Re-open Application Window
              </button>
            </div>
          )}

          {/* Feedback Pill */}
          <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-amber-300 font-medium flex items-center justify-between">
            <span>📢 {statusMessage}</span>
            {windowState === 'minimized' && (
              <button
                type="button"
                onClick={() => setWindowState('normal')}
                className="px-2 py-0.5 rounded bg-amber-500 text-zinc-950 text-[10px] font-black cursor-pointer"
              >
                Restore from Taskbar ➔
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Teacher Guide Drawer */}
      <TeacherGuideDrawer teacherNotes={teacherNotes} />
    </div>
  );
}
