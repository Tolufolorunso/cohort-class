'use client';

import React, { useState } from 'react';

export function InteractiveWindowPlayground() {
  const [windowState, setWindowState] = useState<'normal' | 'minimized' | 'maximized'>('normal');
  const [windowClosed, setWindowClosed] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>(
    'Try clicking Minimize (➖), Maximize (🗖), and Close (❌) on the window below!'
  );

  const handleMinimize = () => {
    setWindowState('minimized');
    setStatusMessage('➖ Minimized: Window is sleeping on the Taskbar shelf. Work is still alive in RAM!');
  };

  const handleMaximize = () => {
    setWindowState((prev) => (prev === 'maximized' ? 'normal' : 'maximized'));
    setStatusMessage(
      windowState === 'maximized'
        ? '🗗 Restored: Window returned to its normal medium floating size.'
        : '🗖 Maximized: Window expanded to take up the full desktop workspace!'
    );
  };

  const handleClose = () => {
    setWindowClosed(true);
    setStatusMessage('❌ Closed: Application shut down completely. Always save before closing!');
  };

  const handleRestore = () => {
    setWindowClosed(false);
    setWindowState('normal');
    setStatusMessage('✨ Re-opened: Window is active again on your desktop.');
  };

  return (
    <div className="flex flex-col gap-4 w-full my-auto">
      {/* Virtual Desktop Canvas */}
      <div className="relative w-full h-[260px] bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-between shadow-inner">
        {/* Workspace Area */}
        <div className="flex-1 p-4 flex items-center justify-center relative">
          {!windowClosed && windowState !== 'minimized' ? (
            <div
              className={`bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl transition-all duration-300 flex flex-col overflow-hidden ${
                windowState === 'maximized'
                  ? 'absolute inset-2 z-10'
                  : 'w-[90%] sm:w-[380px] h-[170px]'
              }`}
            >
              {/* Window Title Bar */}
              <div className="bg-zinc-800 px-3 py-1.5 flex items-center justify-between border-b border-zinc-700 select-none">
                <div className="flex items-center gap-2">
                  <span className="text-xs">📝</span>
                  <span className="text-xs font-bold text-white">Notepad - Essay.txt</span>
                </div>

                {/* 3 Window Buttons */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleMinimize}
                    className="w-5 h-5 rounded hover:bg-zinc-700 flex items-center justify-center text-zinc-300 text-xs font-bold cursor-pointer transition-all"
                    title="Minimize to Taskbar"
                  >
                    ➖
                  </button>
                  <button
                    onClick={handleMaximize}
                    className="w-5 h-5 rounded hover:bg-zinc-700 flex items-center justify-center text-zinc-300 text-xs font-bold cursor-pointer transition-all"
                    title="Maximize / Restore"
                  >
                    {windowState === 'maximized' ? '🗗' : '🗖'}
                  </button>
                  <button
                    onClick={handleClose}
                    className="w-5 h-5 rounded hover:bg-red-600 flex items-center justify-center text-zinc-300 hover:text-white text-xs font-bold cursor-pointer transition-all"
                    title="Close Window"
                  >
                    ❌
                  </button>
                </div>
              </div>

              {/* Window Body */}
              <div className="flex-1 p-3 bg-zinc-900/90 text-xs text-zinc-300 flex flex-col justify-between">
                <div>
                  <p className="font-mono text-emerald-400">Computer Class Practical Notes</p>
                  <p className="text-zinc-400 mt-1">1. F and J have secret bumps.</p>
                  <p className="text-zinc-400">2. Ctrl + S saves your work.</p>
                </div>
                <div className="text-[10px] text-zinc-500 font-mono flex justify-between border-t border-zinc-800 pt-1">
                  <span>Lines: 2 • Words: 12</span>
                  <span>Encoding: UTF-8</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-4">
              <span className="text-3xl block mb-1">
                {windowClosed ? '❌' : '➖'}
              </span>
              <p className="text-xs text-zinc-400 font-medium">
                {windowClosed
                  ? 'App closed. Click the Notepad icon on the Taskbar below to re-open!'
                  : 'Window minimized. Click the icon on the Taskbar to wake it up!'}
              </p>
            </div>
          )}
        </div>

        {/* Virtual Desktop Taskbar Shelf */}
        <div className="h-10 bg-zinc-900 border-t border-zinc-800 px-3 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <button className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black">
              🪟 Start
            </button>

            {/* Notepad Taskbar Button */}
            <button
              onClick={() => {
                if (windowClosed) handleRestore();
                else if (windowState === 'minimized') setWindowState('normal');
                else handleMinimize();
              }}
              className={`px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                !windowClosed && windowState !== 'minimized'
                  ? 'bg-zinc-800 text-white border-b-2 border-emerald-500'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              <span>📝</span>
              <span>Notepad</span>
              {!windowClosed && windowState === 'minimized' && (
                <span className="text-[9px] text-amber-400 font-mono">(Asleep)</span>
              )}
            </button>
          </div>

          <div className="text-[11px] text-zinc-500 font-mono">
            10:45 AM • English ICT Lab
          </div>
        </div>
      </div>

      {/* Live Status Feedback Banner */}
      <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 flex items-center gap-2">
        <span className="text-base">💡</span>
        <span>{statusMessage}</span>
      </div>
    </div>
  );
}
