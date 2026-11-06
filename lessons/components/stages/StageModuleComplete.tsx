'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, FileText, ChevronRight } from '../icons/Icons';

interface StageModuleCompleteProps {
  moduleId: string;
  moduleTitle?: string;
}

export function StageModuleComplete({ moduleId, moduleTitle }: StageModuleCompleteProps) {
  const isM2 = moduleId === 'module-2';
  const displayTitle =
    moduleTitle ||
    (isM2 ? 'Module 2: Computer Hardware & Teardown' : 'Module 1: Introduction to Computers');

  const takeaways = isM2
    ? [
        'Hardware vs Software distinction',
        'Input, Output & Storage Peripheral Classifications',
        'System Unit 7-Step Disassembly (Motherboard, CPU, RAM, PSU)',
        'Storage Drive Comparisons (HDD vs SSD) & The Byte Ladder',
        'Computer Laboratory Care & Safe Shutdown Procedures',
      ]
    : [
        'Electronic device definition & characteristics',
        'The 4-stage IPOS Cycle (Input, Processing, Output, Storage)',
        'Pioneers of Computing: Abacus, Charles Babbage & Ada Lovelace',
        'Classification of Digital Devices (Desktop, Laptop, Tablet, Smartphone, Supercomputer)',
        'Real-world computing in Nigerian Banks, Hospitals, Schools & Agriculture',
      ];

  return (
    <div className="flex flex-col items-center justify-center py-6 px-4 max-w-4xl mx-auto text-center select-none animate-fade-in">
      {/* Trophy Badge */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-5xl shadow-2xl shadow-amber-500/30 ring-8 ring-amber-500/10 animate-bounce">
          🏆
        </div>
        <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-emerald-500 text-zinc-950 text-[11px] font-black shadow-md">
          DONE
        </div>
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
        <span>🎉</span>
        <span>Module Complete Milestone</span>
      </div>

      <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
        You&apos;ve Finished {displayTitle}!
      </h2>
      <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-2">
        Outstanding work! You have completed all presentation lesson slides for this module.
        Now step into the live classroom battle or review your notes and assignments.
      </p>

      {/* Primary Call to Action: Enter Quiz Arena */}
      <div className="mt-8 w-full max-w-xl">
        <Link
          href="/arena"
          className="group relative flex items-center justify-between p-5 rounded-3xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-zinc-950 shadow-2xl shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.99] transition-all"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-zinc-950/15 flex items-center justify-center text-3xl shrink-0 group-hover:rotate-12 transition-transform">
              🎮
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-zinc-950/75 block">
                Classroom Challenge
              </span>
              <h3 className="text-lg sm:text-xl font-black text-zinc-950 leading-tight">
                Enter Live Quiz Arena →
              </h3>
              <p className="text-xs text-zinc-900/80 mt-0.5 font-medium">
                Answer live shape questions, build streaks & compete on the projector screen!
              </p>
            </div>
          </div>
          <div className="p-2 rounded-xl bg-zinc-950/10 shrink-0 hidden sm:block">
            <ChevronRight className="w-6 h-6 text-zinc-950" />
          </div>
        </Link>
      </div>

      {/* Key Takeaways Card */}
      <div className="mt-8 w-full max-w-xl bg-zinc-900/80 border border-zinc-800 rounded-3xl p-5 sm:p-6 text-left shadow-xl">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
          <span>🧠</span>
          <span>What You Mastered In This Module:</span>
        </h4>
        <ul className="space-y-2">
          {takeaways.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200">
              <span className="text-emerald-400 font-bold shrink-0">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Secondary Study Actions */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
        <Link
          href={`/notes/${moduleId}`}
          className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850 text-left transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">Copy Teacher Notes</span>
            <span className="text-[11px] text-zinc-400">Write summary into your exercise book</span>
          </div>
        </Link>

        <Link
          href={`/assignments/${moduleId}`}
          className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850 text-left transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">Homework Assignment</span>
            <span className="text-[11px] text-zinc-400">Answer practical questions for grading</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
