'use client';

import React, { useState } from 'react';

type Step = 'click' | 'double-click' | 'right-click' | 'drag' | 'window-controls' | 'done';

export function InteractiveMouseTrainer() {
  const [currentStep, setCurrentStep] = useState<Step>('click');
  const [clickCount, setClickCount] = useState(0);
  const [doubleClicked, setDoubleClicked] = useState(false);
  const [rightClicked, setRightClicked] = useState(false);
  const [dragged, setDragged] = useState(false);
  const [windowState, setWindowState] = useState<'normal' | 'minimized' | 'maximized'>('normal');
  const [windowClosed, setWindowClosed] = useState(false);
  const [feedback, setFeedback] = useState<string>('Click the big green button to begin!');

  const handleSingleClick = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);
    if (nextCount >= 3) {
      setFeedback('🎉 Great single-clicking! Now let\'s try Double-Clicking.');
      setTimeout(() => setCurrentStep('double-click'), 1000);
    } else {
      setFeedback(`Good click! Do it ${3 - nextCount} more time(s).`);
    }
  };

  const handleDoubleClick = () => {
    setDoubleClicked(true);
    setFeedback('🎉 Excellent! Double-click opened the folder. Now let\'s try Right-Click.');
    setTimeout(() => setCurrentStep('right-click'), 1200);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setRightClicked(true);
    setFeedback('🎉 Awesome! Right-click opens the secret options menu. Now let\'s practice Drag & Drop.');
    setTimeout(() => setCurrentStep('drag'), 1400);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragged(true);
    setFeedback('🎉 Superb! You dragged the file into the folder. Now let\'s try Window Controls.');
    setTimeout(() => setCurrentStep('window-controls'), 1200);
  };

  const resetAll = () => {
    setCurrentStep('click');
    setClickCount(0);
    setDoubleClicked(false);
    setRightClicked(false);
    setDragged(false);
    setWindowState('normal');
    setWindowClosed(false);
    setFeedback('Click the big green button to begin!');
  };

  return (
    <div className="w-full bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col gap-4">
      {/* Header & Steps Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
            Interactive Gym
          </span>
          <h4 className="text-base sm:text-lg font-bold text-white mt-1">
            Mouse & Touchpad Hands-On Lab
          </h4>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <button
            onClick={() => setCurrentStep('click')}
            className={`px-2.5 py-1 rounded transition-all ${
              currentStep === 'click' ? 'bg-emerald-500 text-zinc-950 font-bold' : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            1. Left Click
          </button>
          <button
            onClick={() => setCurrentStep('double-click')}
            className={`px-2.5 py-1 rounded transition-all ${
              currentStep === 'double-click' ? 'bg-emerald-500 text-zinc-950 font-bold' : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            2. Double Click
          </button>
          <button
            onClick={() => setCurrentStep('right-click')}
            className={`px-2.5 py-1 rounded transition-all ${
              currentStep === 'right-click' ? 'bg-emerald-500 text-zinc-950 font-bold' : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            3. Right Click
          </button>
          <button
            onClick={() => setCurrentStep('drag')}
            className={`px-2.5 py-1 rounded transition-all ${
              currentStep === 'drag' ? 'bg-emerald-500 text-zinc-950 font-bold' : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            4. Drag & Drop
          </button>
          <button
            onClick={() => setCurrentStep('window-controls')}
            className={`px-2.5 py-1 rounded transition-all ${
              currentStep === 'window-controls' ? 'bg-emerald-500 text-zinc-950 font-bold' : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            5. Windows
          </button>
        </div>
      </div>

      {/* Live Feedback Banner */}
      <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl px-4 py-2.5 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold animate-pulse">👉</span>
          <span className="text-zinc-200 font-medium">{feedback}</span>
        </div>
        <button
          onClick={resetAll}
          className="text-xs text-zinc-400 hover:text-amber-400 underline cursor-pointer"
        >
          Reset Lab ↺
        </button>
      </div>

      {/* Interactive Canvas Area */}
      <div className="min-h-[260px] bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-6 flex flex-col items-center justify-center relative select-none">
        {/* Step 1: Left Click */}
        {currentStep === 'click' && (
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-zinc-300 max-w-md">
              Tap with your index finger on the left side of the mouse or tap once on your laptop touchpad.
            </p>
            <button
              onClick={handleSingleClick}
              className="px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-black text-lg shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer flex items-center gap-3"
            >
              <span>👆 CLICK ME NOW!</span>
              <span className="px-2 py-0.5 rounded-full bg-zinc-950/20 text-xs">
                {clickCount}/3
              </span>
            </button>
            <p className="text-xs text-zinc-500">
              {clickCount === 0 && 'Ready... click 3 times!'}
              {clickCount > 0 && clickCount < 3 && `Clicked ${clickCount} time(s)!`}
              {clickCount >= 3 && 'Completed! Moving to next...'}
            </p>
          </div>
        )}

        {/* Step 2: Double Click */}
        {currentStep === 'double-click' && (
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-zinc-300 max-w-md">
              Tap <strong>twice quickly</strong> (tap-tap!) without moving the mouse. Imagine knocking twice on a door: <em>Knock-Knock!</em>
            </p>
            <div
              onDoubleClick={handleDoubleClick}
              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center gap-2 ${
                doubleClicked
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 shadow-lg'
                  : 'bg-zinc-900 border-dashed border-amber-500/60 text-amber-300 hover:scale-105 active:scale-95'
              }`}
            >
              <span className="text-5xl">{doubleClicked ? '📂' : '📁'}</span>
              <span className="font-bold text-sm">
                {doubleClicked ? 'Folder Opened! 🎉' : 'Double-Click Me! (Tap-Tap)'}
              </span>
              <span className="text-xs text-zinc-400">
                {doubleClicked ? 'Open Success!' : 'Tap quickly twice'}
              </span>
            </div>
          </div>
        )}

        {/* Step 3: Right Click */}
        {currentStep === 'right-click' && (
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-zinc-300 max-w-md">
              Click with your <strong>middle finger</strong> on the right side of the mouse (or tap with <strong>two fingers together</strong> on your laptop touchpad).
            </p>
            <div
              onContextMenu={handleContextMenu}
              className={`p-6 rounded-2xl border-2 cursor-context-menu transition-all flex flex-col items-center gap-2 ${
                rightClicked
                  ? 'bg-blue-950/60 border-blue-500 text-blue-300 shadow-lg'
                  : 'bg-zinc-900 border-dashed border-blue-500/60 text-blue-300 hover:scale-105'
              }`}
            >
              <span className="text-5xl">🖱️</span>
              <span className="font-bold text-sm">
                {rightClicked ? 'Secret Menu Opened! ✨' : 'Right-Click Here!'}
              </span>
              <span className="text-xs text-zinc-400">
                (Click the right mouse button)
              </span>
            </div>
            {rightClicked && (
              <div className="mt-2 bg-zinc-900 border border-zinc-700 rounded-lg p-2 shadow-xl text-left text-xs text-zinc-300 animate-fadeIn">
                <div className="px-3 py-1 font-bold text-emerald-400 border-b border-zinc-800">
                  Secret Options Menu:
                </div>
                <div className="px-3 py-1 hover:bg-zinc-800 rounded">📂 Open</div>
                <div className="px-3 py-1 hover:bg-zinc-800 rounded">✏️ Rename</div>
                <div className="px-3 py-1 hover:bg-zinc-800 rounded text-red-400">🗑️ Delete</div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Drag and Drop */}
        {currentStep === 'drag' && (
          <div className="flex flex-col items-center gap-6 text-center w-full max-w-lg">
            <p className="text-sm text-zinc-300">
              Hold the left button down on the file icon, slide your mouse, and let go inside the folder!
            </p>
            <div className="flex items-center justify-around w-full gap-4">
              {/* Draggable File */}
              {!dragged ? (
                <div
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', 'homework.txt');
                  }}
                  className="p-4 bg-zinc-900 border-2 border-emerald-500 rounded-xl cursor-grab active:cursor-grabbing flex flex-col items-center gap-1 hover:scale-105 transition-all shadow-md"
                >
                  <span className="text-4xl">📄</span>
                  <span className="text-xs font-bold text-emerald-300">homework.txt</span>
                  <span className="text-[10px] text-zinc-400">Drag Me ➔</span>
                </div>
              ) : (
                <div className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-xl opacity-40 flex flex-col items-center">
                  <span className="text-4xl">📄</span>
                  <span className="text-xs text-zinc-500">Moved!</span>
                </div>
              )}

              <span className="text-2xl text-zinc-600">➔</span>

              {/* Drop Target Folder */}
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`p-6 border-2 border-dashed rounded-2xl flex flex-col items-center gap-1 transition-all ${
                  dragged
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                    : 'bg-zinc-900/80 border-amber-500/60 text-amber-300'
                }`}
              >
                <span className="text-5xl">{dragged ? '📂' : '📁'}</span>
                <span className="font-bold text-xs">
                  {dragged ? 'File Received! 🎉' : 'DROP HERE'}
                </span>
                <span className="text-[10px] text-zinc-400">
                  {dragged ? 'Stored in folder' : 'My School Work Folder'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Window Controls */}
        {currentStep === 'window-controls' && (
          <div className="w-full max-w-md flex flex-col items-center gap-4">
            <p className="text-sm text-zinc-300 text-center">
              Try the 3 buttons at the top right: <strong>Minimize (−)</strong>, <strong>Maximize (□)</strong>, and <strong>Close (✕)</strong>.
            </p>

            {!windowClosed ? (
              <div
                className={`w-full bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl transition-all duration-200 overflow-hidden ${
                  windowState === 'minimized' ? 'h-10 opacity-60' : windowState === 'maximized' ? 'scale-105' : ''
                }`}
              >
                {/* Title Bar */}
                <div className="bg-zinc-800 px-3 py-2 flex items-center justify-between border-b border-zinc-700">
                  <div className="flex items-center gap-2 text-xs font-bold text-zinc-200">
                    <span>📝</span>
                    <span>Classroom Notepad</span>
                  </div>
                  {/* The 3 Magic Buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setWindowState('minimized');
                        setFeedback('Window minimized! Look down at the taskbar below to restore it.');
                      }}
                      title="Minimize (−) hides to taskbar"
                      className="w-5 h-5 rounded bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center text-xs font-bold text-zinc-300"
                    >
                      −
                    </button>
                    <button
                      onClick={() => {
                        setWindowState(windowState === 'maximized' ? 'normal' : 'maximized');
                        setFeedback(windowState === 'maximized' ? 'Window restored to normal size!' : 'Window maximized to full screen!');
                      }}
                      title="Maximize (□) expands window"
                      className="w-5 h-5 rounded bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center text-xs font-bold text-zinc-300"
                    >
                      {windowState === 'maximized' ? '❐' : '□'}
                    </button>
                    <button
                      onClick={() => {
                        setWindowClosed(true);
                        setFeedback('Window closed! Press Reopen on the taskbar to bring it back.');
                      }}
                      title="Close (✕) shuts the app"
                      className="w-5 h-5 rounded bg-red-600 hover:bg-red-500 flex items-center justify-center text-xs font-bold text-white"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Window Body */}
                {windowState !== 'minimized' && (
                  <div className="p-4 text-xs text-zinc-400 space-y-2">
                    <p className="text-zinc-200 font-semibold">
                      Welcome to your first app window!
                    </p>
                    <p>
                      Notice the 3 buttons in the top right.
                      Remember: Minimize hides, Maximize enlarges, and Close shuts it down.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl text-center text-xs text-zinc-400">
                Window is closed! Click &quot;Reopen Window&quot; on the Taskbar shelf below.
              </div>
            )}

            {/* Taskbar Shelf */}
            <div className="w-full bg-zinc-950 border-t-2 border-zinc-800 p-2 rounded-lg flex items-center gap-3">
              <span className="text-[10px] uppercase font-bold text-zinc-500">Taskbar:</span>
              <button
                onClick={() => {
                  setWindowClosed(false);
                  setWindowState('normal');
                  setFeedback('Window is back open!');
                }}
                className={`px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5 transition-all ${
                  !windowClosed
                    ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700'
                }`}
              >
                <span>📝 Notepad</span>
                <span className="text-[10px] text-zinc-400">
                  {windowClosed ? '(Closed - Click to Open)' : windowState === 'minimized' ? '(Minimized)' : '(Active)'}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
