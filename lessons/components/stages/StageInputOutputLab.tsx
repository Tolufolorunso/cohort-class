'use client';

import React, { useState } from 'react';
import {
  peripheralPorts,
  PortConnectorItem,
} from '../../data/module2';
import { ImageFallbackType } from '../../types/curriculum';
import { BookOpen, Sparkles, CheckCircle, RefreshCw } from '../icons/Icons';

type DeviceCategory = 'input' | 'output' | 'both';

interface SortableDevice {
  id: string;
  name: string;
  category: DeviceCategory;
  clue: string;
  explanation: string;
  icon: string;
  fallbackType: ImageFallbackType;
}

const SORTABLE_DEVICES: SortableDevice[] = [
  {
    id: 'sort-keyboard',
    name: 'Keyboard',
    category: 'input',
    clue: 'Used to type text and send letter commands into the computer',
    explanation: 'Input device: You send words and data into the computer system.',
    icon: '⌨️',
    fallbackType: 'keyboard',
  },
  {
    id: 'sort-monitor',
    name: 'Monitor',
    category: 'output',
    clue: 'Displays visual pictures, words, and apps on a bright screen',
    explanation: 'Output device: Presents processed visual results to human eyes.',
    icon: '🖥️',
    fallbackType: 'monitor',
  },
  {
    id: 'sort-printer',
    name: 'Printer',
    category: 'output',
    clue: 'Produces a physical paper hard copy of documents and exams',
    explanation: 'Output device: Takes digital files and prints permanent physical copies on paper.',
    icon: '🖨️',
    fallbackType: 'printer',
  },
  {
    id: 'sort-scanner',
    name: 'Flatbed Scanner',
    category: 'input',
    clue: 'Captures a paper certificate or photo and turns it into a computer file',
    explanation: 'Input device: Converts physical paper documents into digital image files.',
    icon: '📑',
    fallbackType: 'scanner',
  },
  {
    id: 'sort-touchscreen',
    name: 'Smartphone / Tablet Touchscreen',
    category: 'both',
    clue: 'Shows you videos while sensing where your fingers press',
    explanation: 'Both: It displays images (Output) while simultaneously detecting finger touches (Input).',
    icon: '📱',
    fallbackType: 'touchscreen',
  },
  {
    id: 'sort-microphone',
    name: 'Laboratory Microphone',
    category: 'input',
    clue: 'Captures your voice during online speaking and pronunciation tests',
    explanation: 'Input device: Converts acoustic sound vibrations into electronic audio data.',
    icon: '🎙️',
    fallbackType: 'school',
  },
  {
    id: 'sort-speakers',
    name: 'Desktop Speakers',
    category: 'output',
    clue: 'Plays sound waves so students in the classroom can hear lessons',
    explanation: 'Output device: Converts electronic sound signals into audible sound waves.',
    icon: '🔊',
    fallbackType: 'speakers',
  },
  {
    id: 'sort-projector',
    name: 'Classroom Projector',
    category: 'output',
    clue: 'Beams large computer slides onto the whiteboard for the whole class',
    explanation: 'Output device: Projects visual display onto a wall or screen for audience viewing.',
    icon: '📽️',
    fallbackType: 'projector',
  },
];

export function StageInputOutputLab() {
  const [explanationMode, setExplanationMode] = useState<
    'simple' | 'bookish' | 'nigerian'
  >('simple');

  // Interactive Sorting State
  const [userSortAssignments, setUserSortAssignments] = useState<
    Record<string, DeviceCategory>
  >({});
  const [showSortFeedback, setShowSortFeedback] = useState(false);

  // Selected Cable Port
  const [selectedPortId, setSelectedPortId] = useState<string>(
    peripheralPorts[0].id
  );
  const activePort: PortConnectorItem =
    peripheralPorts.find((p) => p.id === selectedPortId) || peripheralPorts[0];

  const handleAssignCategory = (deviceId: string, category: DeviceCategory) => {
    setUserSortAssignments((prev) => ({
      ...prev,
      [deviceId]: category,
    }));
  };

  const handleResetSort = () => {
    setUserSortAssignments({});
    setShowSortFeedback(false);
  };

  const correctCount = SORTABLE_DEVICES.filter(
    (d) => userSortAssignments[d.id] === d.category
  ).length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Dual-Layer Language Mode Selector Bar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-2 flex flex-wrap items-center justify-between gap-2 shadow-lg">
        <div className="flex items-center gap-2 px-3 text-xs font-bold text-zinc-400">
          <BookOpen size={16} className="text-emerald-400" />
          <span>How would you like this explained?</span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => setExplanationMode('simple')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              explanationMode === 'simple'
                ? 'bg-emerald-500 text-zinc-950 shadow-md ring-1 ring-emerald-400'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <span>💡 In Simple English</span>
            <span className="text-[10px] opacity-80">(Recommended)</span>
          </button>
          <button
            type="button"
            onClick={() => setExplanationMode('bookish')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              explanationMode === 'bookish'
                ? 'bg-emerald-500 text-zinc-950 shadow-md ring-1 ring-emerald-400'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <span>🎓 Formal Bookish Definition</span>
            <span className="text-[10px] opacity-80">(WAEC / NECO)</span>
          </button>
          <button
            type="button"
            onClick={() => setExplanationMode('nigerian')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              explanationMode === 'nigerian'
                ? 'bg-emerald-500 text-zinc-950 shadow-md ring-1 ring-emerald-400'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <span>🍠 Nigerian Everyday Analogies</span>
          </button>
        </div>
      </div>

      {/* Hero Core Concept: Input vs Output */}
      <section className="bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Sparkles size={14} />
            <span>Lesson 2 · Communication with the Machine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Input vs. Output Devices
          </h2>

          {explanationMode === 'simple' && (
            <div className="space-y-3">
              <p className="text-base sm:text-lg text-emerald-300 font-semibold leading-relaxed">
                Think of an arrow pointing <strong>INTO</strong> the computer versus an arrow pointing <strong>OUT</strong> to you!
              </p>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                <strong>Input Devices:</strong> Tools you use to tell the computer what to do (keyboard, mouse, microphone, scanner). Data flows from you into the machine.
              </p>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                <strong>Output Devices:</strong> Tools the computer uses to show you what it has done (monitor, printer, speakers, projector). Information flows from the machine out to you.
              </p>
            </div>
          )}

          {explanationMode === 'bookish' && (
            <div className="space-y-3">
              <p className="text-base sm:text-lg text-amber-300 font-serif italic leading-relaxed border-l-4 border-amber-500 pl-4">
                &ldquo;Input devices are electromechanical hardware units through which human-readable data, instructions, and control signals are transformed into binary form and transferred into the central processing unit. Output devices decode processed machine data and present it in human-intelligible sensory formats.&rdquo;
              </p>
              <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-300 font-mono">
                WAEC Note: Distinguish between <strong>Soft Copy</strong> (transient visual/audio output on monitors/speakers) and <strong>Hard Copy</strong> (permanent tangible output on paper via printers/plotters).
              </div>
            </div>
          )}

          {explanationMode === 'nigerian' && (
            <div className="space-y-3">
              <p className="text-base sm:text-lg text-orange-300 font-semibold leading-relaxed">
                Think of an ATM machine at First Bank or Zenith Bank!
              </p>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                <strong>Input:</strong> You insert your debit card and type your 4-digit PIN on the number keypad. That is input going into the machine.
              </p>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                <strong>Output:</strong> The ATM counts crisp Naira notes and dispenses them through the cash tray, and prints your paper transaction receipt! That is output coming out to you.
              </p>
            </div>
          )}
        </div>

        {/* Side-by-side Comparative Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Input Card */}
          <div className="bg-zinc-950 border border-blue-500/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-inner">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-blue-500/20 text-blue-400 text-xl">📥</span>
                <h3 className="text-lg sm:text-xl font-bold text-white">Input Devices (Data IN)</h3>
              </div>
              <span className="text-xs font-bold text-blue-400 bg-blue-950/80 border border-blue-800 px-2.5 py-0.5 rounded-full">
                Human &rarr; PC
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Accepts data and commands from the user and converts them into electrical digital signals the computer can process.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
              <li className="flex items-center gap-2">
                <span className="text-blue-400 font-bold">•</span>
                <strong>Keyboard:</strong> Enters letters, numbers, and navigation shortcuts.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400 font-bold">•</span>
                <strong>Mouse / Trackpad:</strong> Moves pointer, clicks buttons, drags items.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400 font-bold">•</span>
                <strong>Scanner:</strong> Digitizes paper documents, photos, and WAEC certificates.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400 font-bold">•</span>
                <strong>Microphone:</strong> Captures spoken voice for dictation and online classes.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400 font-bold">•</span>
                <strong>Webcam:</strong> Captures video frames of the classroom.
              </li>
            </ul>
          </div>

          {/* Output Card */}
          <div className="bg-zinc-950 border border-emerald-500/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-inner">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 text-xl">📤</span>
                <h3 className="text-lg sm:text-xl font-bold text-white">Output Devices (Info OUT)</h3>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2.5 py-0.5 rounded-full">
                PC &rarr; Human
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Takes processed digital information from the CPU and displays or produces it in forms humans can see, hear, or read.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <strong>Monitor:</strong> Visual screen displaying text, graphics, and video (Soft Copy).
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <strong>Printer:</strong> Inks words and diagrams onto sheets of paper (Hard Copy).
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <strong>Speakers / Headphones:</strong> Emits audible sound and spoken voice.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <strong>Projector:</strong> Enlarges display on a large classroom wall or screen.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <strong>Touchscreen (Dual):</strong> Performs both visual display and touch entry!
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Peripheral Sorting Activity */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
              <span>Hands-On Classification Lab</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Device Classification Challenge
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">
              Classify each hardware device below as <strong>Input</strong>, <strong>Output</strong>, or <strong>Both</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSortFeedback(!showSortFeedback)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 text-zinc-950 hover:bg-emerald-400 transition-colors shadow"
            >
              {showSortFeedback ? 'Hide Answers' : 'Check Answers'}
            </button>
            <button
              type="button"
              onClick={handleResetSort}
              title="Reset Sorting"
              className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        {/* Sorting Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SORTABLE_DEVICES.map((device) => {
            const currentSelection = userSortAssignments[device.id];
            const isCorrect = currentSelection === device.category;
            return (
              <div
                key={device.id}
                className={`p-4 rounded-2xl border transition-all ${
                  showSortFeedback
                    ? isCorrect
                      ? 'bg-emerald-950/40 border-emerald-500/60'
                      : 'bg-red-950/30 border-red-500/60'
                    : 'bg-zinc-950 border-zinc-800'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{device.icon}</span>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white">{device.name}</h4>
                      <p className="text-xs text-zinc-400 leading-snug">{device.clue}</p>
                    </div>
                  </div>
                  {showSortFeedback && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        isCorrect
                          ? 'bg-emerald-500 text-zinc-950'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </span>
                  )}
                </div>

                {/* 3 Option Buttons */}
                <div className="flex items-center gap-1.5 pt-2">
                  <button
                    type="button"
                    onClick={() => handleAssignCategory(device.id, 'input')}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold border transition-all text-center ${
                      currentSelection === 'input'
                        ? 'bg-blue-600 text-white border-blue-400 shadow'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800 hover:text-zinc-200'
                    }`}
                  >
                    Input
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAssignCategory(device.id, 'output')}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold border transition-all text-center ${
                      currentSelection === 'output'
                        ? 'bg-emerald-600 text-white border-emerald-400 shadow'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800 hover:text-zinc-200'
                    }`}
                  >
                    Output
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAssignCategory(device.id, 'both')}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold border transition-all text-center ${
                      currentSelection === 'both'
                        ? 'bg-purple-600 text-white border-purple-400 shadow'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800 hover:text-zinc-200'
                    }`}
                  >
                    Both (I/O)
                  </button>
                </div>

                {/* Explanation Reveal */}
                {showSortFeedback && (
                  <p className="mt-2.5 pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-300 font-mono">
                    {device.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Score Summary Banner */}
        {showSortFeedback && (
          <div className="p-4 rounded-2xl bg-zinc-950 border border-emerald-500/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-emerald-400" />
              <span className="text-sm font-bold text-white">
                Classroom Score: {correctCount} of {SORTABLE_DEVICES.length} Correctly Classified!
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {Math.round((correctCount / SORTABLE_DEVICES.length) * 100)}% Mastery
            </span>
          </div>
        )}
      </section>

      {/* Peripheral Cable Ports & Connectors Anatomy */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Computer Cable Ports &amp; Connectors
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm mt-0.5">
              Learn what plugs where on the rear and front of the laboratory desktop computer.
            </p>
          </div>
          <span className="text-xs font-bold text-blue-400 bg-blue-950/60 border border-blue-800/80 px-3 py-1 rounded-full">
            Laboratory Cabling
          </span>
        </div>

        {/* Port Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {peripheralPorts.map((port) => {
            const isSelected = port.id === selectedPortId;
            return (
              <button
                key={port.id}
                type="button"
                onClick={() => setSelectedPortId(port.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-400 shadow-md ring-2 ring-blue-400/30'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {port.name}
              </button>
            );
          })}
        </div>

        {/* Selected Port Inspector Detail */}
        <div className="p-5 sm:p-7 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
            <div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${activePort.colorCode}`}>
                {activePort.name}
              </span>
              <h4 className="text-lg sm:text-xl font-extrabold text-white mt-1">
                {activePort.fullName}
              </h4>
            </div>
            <span className="text-xs text-zinc-400 font-mono">
              Laboratory Standard
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Physical Shape</span>
              <p className="text-zinc-200 font-medium">{activePort.shapeDescription}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">What Plugs Here</span>
              <p className="text-zinc-200 font-medium">{activePort.commonUses}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Key Feature</span>
              <p className="text-emerald-400 font-medium">{activePort.speedOrFeature}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
