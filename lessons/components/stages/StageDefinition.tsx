'use client';

import React from 'react';
import { module1Info } from '../../data/module1';
import { TeacherGuideDrawer } from '../presentation/TeacherGuideDrawer';

export function StageDefinition() {
  const stageMeta = module1Info.stages.find((s) => s.id === 'what-is-a-computer');
  const teacherNotes = stageMeta?.teacherNotes;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 animate-fadeIn select-none">
      {/* 16:9 Presentation Slide Card */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md flex flex-col justify-between min-h-[500px]">
        {/* Slide Header */}
        <div className="border-b border-zinc-800/80 pb-4 mb-6">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-xs uppercase font-black tracking-wider px-2.5 py-1 rounded-full border bg-emerald-950/80 text-emerald-400 border-emerald-800/60">
              LESSON 1 • CORE DEFINITION
            </span>
            <span className="text-xs font-mono font-bold text-zinc-500">
              STAGE 01 / 06
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            What is a Computer?
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-1 font-medium">
            An electronic machine that accepts raw data, processes it, and produces useful information.
          </p>
        </div>

        {/* Slide Body: 2 Big Clean Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-auto">
          {/* Card 1: What It Actually Does */}
          <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">💻</span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  The 3 Core Actions of a Computer
                </h3>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-zinc-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-black text-base shrink-0">1.</span>
                  <div>
                    <strong className="text-white">Receives Data:</strong> You give it numbers, words, clicks, or voice notes through input devices.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-sky-400 font-black text-base shrink-0">2.</span>
                  <div>
                    <strong className="text-white">Processes It:</strong> The internal CPU follows instructions at lightning speed to calculate and organize.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-purple-400 font-black text-base shrink-0">3.</span>
                  <div>
                    <strong className="text-white">Shows Information:</strong> Displays meaningful answers on screen or stores them for next week.
                  </div>
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-zinc-800/80 flex items-center gap-2 text-xs text-zinc-400">
              <span className="text-amber-400 font-bold">Memory Formula:</span>
              <span className="font-mono text-zinc-200">RECEIVES ➔ WORKS ➔ SHOWS ➔ STORES</span>
            </div>
          </div>

          {/* Card 2: Data vs Information */}
          <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">⚖️</span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Raw Data vs. Processed Information
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-amber-400">📄 Raw Data (Uncooked)</span>
                    <span className="text-[10px] text-zinc-500 font-mono">Unprocessed facts</span>
                  </div>
                  <p className="text-zinc-300 leading-snug">
                    Raw numbers or words alone like: <code className="text-amber-300 font-bold">&quot;25, 10, +&quot;</code> or fresh unpeeled cassava tubers.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-emerald-400">📊 Information (Ready to Eat)</span>
                    <span className="text-[10px] text-zinc-500 font-mono">Meaningful output</span>
                  </div>
                  <p className="text-zinc-300 leading-snug">
                    Data after processing like: <code className="text-emerald-300 font-bold">&quot;Total Score = 35&quot;</code> or smooth white garri flour.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
              <span className="text-red-400 font-bold">GIGO Rule:</span>
              <span>Garbage In, Garbage Out (accuracy depends on you!)</span>
            </div>
          </div>
        </div>

        {/* 5 Superpowers Pill Strip */}
        <div className="mt-5 pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs uppercase font-bold text-zinc-400">The 5 Superpowers:</span>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-200">
              ⚡ <strong>Speed:</strong> Billions/sec
            </span>
            <span className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-200">
              🎯 <strong>Accuracy:</strong> 100% Exact
            </span>
            <span className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-200">
              🧠 <strong>Storage:</strong> Millions of books
            </span>
            <span className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-200">
              🔋 <strong>Diligence:</strong> Never tires
            </span>
            <span className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-200">
              🔀 <strong>Multitasking:</strong> Does many jobs
            </span>
          </div>
        </div>

        {/* Nigerian Everyday Analogy Callout */}
        <div className="mt-4 bg-gradient-to-r from-emerald-950/60 to-zinc-950 border border-emerald-500/40 rounded-2xl p-4 flex items-center gap-3">
          <span className="text-2xl shrink-0">🇳🇬</span>
          <p className="text-xs sm:text-sm text-emerald-200 font-semibold leading-snug">
            <strong>Relatable Nigerian Analogy:</strong> A computer is like a market cassava grinding machine. Raw unpeeled cassava tubers go in (Data), the blades crush it (Processing), and out pours fine white garri flour (Information) packed in bags for next month (Storage)!
          </p>
        </div>
      </div>

      {/* In-Slide Live Teacher Guide Drawer (Press 'T' or click button) */}
      <TeacherGuideDrawer teacherNotes={teacherNotes} />
    </div>
  );
}
