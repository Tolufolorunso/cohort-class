'use client';

import React, { useState } from 'react';

type DeviceCategory = 'input' | 'output' | 'both';

interface SortDevice {
  id: string;
  name: string;
  icon: string;
  correctCategory: DeviceCategory;
  explanation: string;
}

const LAB_DEVICES: SortDevice[] = [
  {
    id: 'keyboard',
    name: 'Keyboard',
    icon: '⌨️',
    correctCategory: 'input',
    explanation: 'Sends typed letters, numbers, and commands INTO the computer.',
  },
  {
    id: 'monitor',
    name: 'Monitor',
    icon: '🖥️',
    correctCategory: 'output',
    explanation: 'Displays processed visual pictures and words OUT to human eyes.',
  },
  {
    id: 'printer',
    name: 'Printer',
    icon: '🖨️',
    correctCategory: 'output',
    explanation: 'Produces physical paper hard copies OUT from digital files.',
  },
  {
    id: 'scanner',
    name: 'Scanner',
    icon: '📑',
    correctCategory: 'input',
    explanation: 'Captures physical paper and pushes digital photos INTO the PC.',
  },
  {
    id: 'touchscreen',
    name: 'Touchscreen',
    icon: '📱',
    correctCategory: 'both',
    explanation: 'BOTH: Shows visuals OUT while accepting finger taps IN.',
  },
  {
    id: 'microphone',
    name: 'Microphone',
    icon: '🎙️',
    correctCategory: 'input',
    explanation: 'Captures voice sound waves and sends audio data INTO the computer.',
  },
];

export function InteractivePeripheralSorter() {
  const [deviceIndex, setDeviceIndex] = useState(0);
  const [userChoice, setUserChoice] = useState<DeviceCategory | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentDevice = LAB_DEVICES[deviceIndex];
  const isCorrect = userChoice === currentDevice.correctCategory;

  const handleChoose = (category: DeviceCategory) => {
    setUserChoice(category);
    if (category === currentDevice.correctCategory) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    setUserChoice(null);
    if (deviceIndex + 1 < LAB_DEVICES.length) {
      setDeviceIndex((i) => i + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setDeviceIndex(0);
    setUserChoice(null);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    return (
      <div className="p-8 text-center bg-zinc-950/80 border border-emerald-500/40 rounded-2xl flex flex-col items-center justify-center gap-3 my-auto shadow-xl">
        <span className="text-5xl">🏆</span>
        <h3 className="text-xl font-black text-white">Peripheral Classification Mastered!</h3>
        <p className="text-sm text-zinc-300 font-medium max-w-md">
          You correctly sorted <strong className="text-emerald-400">{score} of {LAB_DEVICES.length}</strong> computer peripherals!
        </p>
        <button
          onClick={handleReset}
          className="mt-2 px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs transition-all shadow-md active:scale-95 cursor-pointer"
        >
          🔄 Try Lab Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full my-auto">
      {/* Current Device Card */}
      <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-4">
          <span className="text-4xl p-2.5 rounded-2xl bg-zinc-900 border border-zinc-700">
            {currentDevice.icon}
          </span>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[11px] font-mono text-zinc-500">
                Device {deviceIndex + 1} of {LAB_DEVICES.length}
              </span>
              <span className="text-xs font-bold text-emerald-400">
                Score: {score}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">
              {currentDevice.name}
            </h3>
            <p className="text-xs text-zinc-400">
              Is this device sending data IN, delivering data OUT, or BOTH?
            </p>
          </div>
        </div>

        {userChoice !== null && (
          <button
            onClick={handleNext}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs transition-all shrink-0 cursor-pointer shadow-md"
          >
            Next Device →
          </button>
        )}
      </div>

      {/* 3 Large Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Input Button */}
        <button
          onClick={() => !userChoice && handleChoose('input')}
          disabled={userChoice !== null}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
            userChoice === 'input'
              ? isCorrect
                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/50'
                : 'bg-red-950/60 border-red-500 text-red-300 ring-2 ring-red-500/50'
              : 'bg-zinc-950/60 border-zinc-800 hover:border-sky-500 text-zinc-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">📥</span>
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Sends IN</span>
          </div>
          <div>
            <span className="text-sm font-black block text-white">INPUT DEVICE</span>
            <span className="text-[11px] text-zinc-400">Pushes data into the computer</span>
          </div>
        </button>

        {/* Output Button */}
        <button
          onClick={() => !userChoice && handleChoose('output')}
          disabled={userChoice !== null}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
            userChoice === 'output'
              ? isCorrect
                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/50'
                : 'bg-red-950/60 border-red-500 text-red-300 ring-2 ring-red-500/50'
              : 'bg-zinc-950/60 border-zinc-800 hover:border-emerald-500 text-zinc-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">📤</span>
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Delivers OUT</span>
          </div>
          <div>
            <span className="text-sm font-black block text-white">OUTPUT DEVICE</span>
            <span className="text-[11px] text-zinc-400">Shows or prints results out</span>
          </div>
        </button>

        {/* Both Button */}
        <button
          onClick={() => !userChoice && handleChoose('both')}
          disabled={userChoice !== null}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
            userChoice === 'both'
              ? isCorrect
                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/50'
                : 'bg-red-950/60 border-red-500 text-red-300 ring-2 ring-red-500/50'
              : 'bg-zinc-950/60 border-zinc-800 hover:border-purple-500 text-zinc-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">🔄</span>
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Dual-Purpose</span>
          </div>
          <div>
            <span className="text-sm font-black block text-white">BOTH (DUAL)</span>
            <span className="text-[11px] text-zinc-400">Inputs and Outputs simultaneously</span>
          </div>
        </button>
      </div>

      {/* Explanation Banner */}
      {userChoice !== null && (
        <div
          className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
            isCorrect
              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
              : 'bg-red-950/60 border-red-500/40 text-red-300'
          }`}
        >
          <span>{isCorrect ? '✅ Spot on!' : '❌ Incorrect.'}</span>
          <span>{currentDevice.explanation}</span>
        </div>
      )}
    </div>
  );
}
