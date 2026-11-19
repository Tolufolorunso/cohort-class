'use client';

import React, { useState } from 'react';
import { module2Info } from '../../data/module2';
import { TeacherGuideDrawer } from '../presentation/TeacherGuideDrawer';

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
    explanation: 'Produces a physical paper hard copy OUT from digital files.',
  },
  {
    id: 'scanner',
    name: 'Scanner',
    icon: '📑',
    correctCategory: 'input',
    explanation: 'Captures physical paper certificates and pushes digital images INTO the PC.',
  },
  {
    id: 'touchscreen',
    name: 'Touchscreen',
    icon: '📱',
    correctCategory: 'both',
    explanation: 'BOTH: Displays images OUT while sensing finger presses IN.',
  },
  {
    id: 'microphone',
    name: 'Microphone',
    icon: '🎙️',
    correctCategory: 'input',
    explanation: 'Captures voice sound waves and sends audio data INTO the computer.',
  },
];

export function StageInputOutputLab() {
  const stageMeta = module2Info.stages.find((s) => s.id === 'input-output-lab');
  const teacherNotes = stageMeta?.teacherNotes;

  const [userChoices, setUserChoices] = useState<Record<string, DeviceCategory>>({});

  const handleSelect = (deviceId: string, category: DeviceCategory) => {
    setUserChoices((prev) => ({
      ...prev,
      [deviceId]: category,
    }));
  };

  const handleReset = () => {
    setUserChoices({});
  };

  const totalAnswered = Object.keys(userChoices).length;
  const correctCount = LAB_DEVICES.filter(
    (d) => userChoices[d.id] === d.correctCategory
  ).length;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 animate-fadeIn select-none">
      {/* 16:9 Presentation Slide Card */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md flex flex-col justify-between min-h-[520px]">
        {/* Slide Header */}
        <div className="border-b border-zinc-800/80 pb-4 mb-5">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-xs uppercase font-black tracking-wider px-2.5 py-1 rounded-full border bg-emerald-950/80 text-emerald-400 border-emerald-800/60">
              LESSON 2 • PERIPHERAL CLASSIFICATION
            </span>
            <span className="text-xs font-mono font-bold text-zinc-500">
              STAGE 02 / 05
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Input vs. Output Devices
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-1 font-medium">
            How data enters the computer system and how processed information leaves.
          </p>
        </div>

        {/* 2 Big Clean Concept Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {/* Input Card */}
          <div className="p-5 rounded-2xl bg-zinc-950/70 border border-emerald-500/40 flex flex-col justify-between gap-2">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">📥</span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                  Data Enters
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-emerald-300">
                Input Devices (Feed In)
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mt-1">
                Hardware that sends data, letters, sounds, or commands from humans <strong>INTO</strong> the computer.
              </p>
            </div>
            <div className="text-xs text-zinc-400 pt-2 border-t border-zinc-800 font-mono">
              Examples: Keyboard, Mouse, Scanner, Microphone, Webcam.
            </div>
          </div>

          {/* Output Card */}
          <div className="p-5 rounded-2xl bg-zinc-950/70 border border-blue-500/40 flex flex-col justify-between gap-2">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">📤</span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800/50">
                  Results Leave
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-blue-300">
                Output Devices (Send Out)
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mt-1">
                Hardware that presents processed results, screens, or sound <strong>OUT</strong> to humans.
              </p>
            </div>
            <div className="text-xs text-zinc-400 pt-2 border-t border-zinc-800 font-mono">
              Examples: Monitor (Soft Copy), Printer (Hard Copy), Speakers, Projector.
            </div>
          </div>
        </div>

        {/* Interactive Sorting Lab */}
        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>🧪</span>
              <span>Interactive Peripheral Sorting Lab (Click a category for each):</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-emerald-400">
                {correctCount} / {LAB_DEVICES.length} Correct
              </span>
              {totalAnswered > 0 && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[11px] text-zinc-400 hover:text-white underline cursor-pointer"
                >
                  Reset Lab
                </button>
              )}
            </div>
          </div>

          {/* 6 Device Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {LAB_DEVICES.map((device) => {
              const userChoice = userChoices[device.id];
              const isAnswered = Boolean(userChoice);
              const isCorrect = userChoice === device.correctCategory;

              return (
                <div
                  key={device.id}
                  className={`p-3 rounded-xl border flex flex-col justify-between gap-2.5 transition-all ${
                    isAnswered
                      ? isCorrect
                        ? 'bg-emerald-950/40 border-emerald-500/50'
                        : 'bg-red-950/30 border-red-500/50'
                      : 'bg-zinc-900 border-zinc-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{device.icon}</span>
                      <span className="text-xs font-bold text-white">
                        {device.name}
                      </span>
                    </div>
                    {isAnswered && (
                      <span
                        className={`text-xs font-black ${
                          isCorrect ? 'text-emerald-400' : 'text-red-400'
                        }`}
                      >
                        {isCorrect ? '✓ Correct' : '✗ Try again'}
                      </span>
                    )}
                  </div>

                  {/* Category Pill Buttons */}
                  <div className="grid grid-cols-3 gap-1">
                    <button
                      type="button"
                      onClick={() => handleSelect(device.id, 'input')}
                      className={`py-1 text-[10px] font-bold rounded cursor-pointer transition-all ${
                        userChoice === 'input'
                          ? 'bg-emerald-500 text-zinc-950 font-black shadow-sm'
                          : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                      }`}
                    >
                      Input
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelect(device.id, 'output')}
                      className={`py-1 text-[10px] font-bold rounded cursor-pointer transition-all ${
                        userChoice === 'output'
                          ? 'bg-blue-500 text-zinc-950 font-black shadow-sm'
                          : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                      }`}
                    >
                      Output
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelect(device.id, 'both')}
                      className={`py-1 text-[10px] font-bold rounded cursor-pointer transition-all ${
                        userChoice === 'both'
                          ? 'bg-amber-500 text-zinc-950 font-black shadow-sm'
                          : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                      }`}
                    >
                      Both
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cable Port Mini-Guide */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2 text-xs">
          <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800 text-zinc-300 flex items-center gap-2">
            <span className="text-lg">🔌</span>
            <div>
              <strong>USB Port:</strong> Flash drives, mouse, keyboards.
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800 text-zinc-300 flex items-center gap-2">
            <span className="text-lg">📺</span>
            <div>
              <strong>HDMI Port:</strong> High-def video to monitor/projector.
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800 text-zinc-300 flex items-center gap-2">
            <span className="text-lg">🎧</span>
            <div>
              <strong>Audio Jack (3.5mm):</strong> Speakers and headphones.
            </div>
          </div>
        </div>

        {/* Nigerian Everyday Analogy Callout */}
        <div className="mt-2 bg-gradient-to-r from-emerald-950/60 to-zinc-950 border border-emerald-500/40 rounded-2xl p-4 flex items-center gap-3">
          <span className="text-2xl shrink-0">🇳🇬</span>
          <p className="text-xs sm:text-sm text-emerald-200 font-semibold leading-snug">
            <strong>Relatable Nigerian Analogy:</strong> Ordering food at a restaurant or buka: Your mouth giving the order to the attendant is Input. The attendant placing a hot plate of jollof rice on your table is Output!
          </p>
        </div>
      </div>

      {/* In-Slide Live Teacher Guide Drawer (Press 'T' or click button) */}
      <TeacherGuideDrawer teacherNotes={teacherNotes} />
    </div>
  );
}
