'use client';

import React, { useState } from 'react';
import { module1Info } from '../../data/module1';
import { TeacherGuideDrawer } from '../presentation/TeacherGuideDrawer';

const FIVE_GENERATIONS = [
  {
    gen: '1st Gen (1940–1956)',
    component: 'Vacuum Tubes',
    icon: '💡',
    feature: 'Room-Sized Giants',
    desc: 'Used thousands of hot glass vacuum tubes. Consumed massive electricity and broke down constantly (e.g. ENIAC).',
    color: 'border-amber-500/50 bg-amber-500/10 text-amber-300',
  },
  {
    gen: '2nd Gen (1956–1963)',
    component: 'Transistors',
    icon: '⚡',
    feature: '100x Smaller & Faster',
    desc: 'Replaced vacuum tubes with tiny solid metal transistors. Far less heat, much cheaper, and more reliable.',
    color: 'border-sky-500/50 bg-sky-500/10 text-sky-300',
  },
  {
    gen: '3rd Gen (1964–1971)',
    component: 'Integrated Circuits (ICs)',
    icon: '🔲',
    feature: 'Silicon Chip Revolution',
    desc: 'Combined hundreds of transistors on a single silicon chip. Keyboards and monitors replaced punch cards.',
    color: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300',
  },
  {
    gen: '4th Gen (1971–Present)',
    component: 'Microprocessors',
    icon: '💻',
    feature: 'Personal Computer Era',
    desc: 'The entire CPU was put onto one tiny microchip (VLSI). Allowed PCs, laptops, and smartphones to exist in every home.',
    color: 'border-purple-500/50 bg-purple-500/10 text-purple-300',
  },
  {
    gen: '5th Gen (Present & Future)',
    component: 'Artificial Intelligence',
    icon: '🤖',
    feature: 'Smart Systems & Voice',
    desc: 'AI, voice recognition, robotics, facial recognition, and self-driving cars that learn from data.',
    color: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300',
  },
];

const PIONEERS = [
  {
    name: 'The Abacus (~3000 BC)',
    role: 'Ancient World Calculator',
    icon: '🧮',
    takeaway: 'Scholars slid wooden beads on wires to count without relying on fingers. Still used in markets today!',
  },
  {
    name: 'Charles Babbage (1830s)',
    role: 'Father of the Computer',
    icon: '👨‍🏫',
    takeaway: 'Designed the mechanical Analytical Engine with a "Mill" (CPU) and a "Store" (Memory)—the blueprint of all modern computers.',
  },
  {
    name: 'Ada Lovelace (1843)',
    role: 'World’s First Computer Programmer',
    icon: '👩‍💻',
    takeaway: 'Wrote the very first algorithm intended to run on Babbage’s machine and realized computers could create music and graphics.',
  },
];

export function StageTimeline() {
  const [activeTab, setActiveTab] = useState<'generations' | 'pioneers'>('generations');
  const stageMeta = module1Info.stages.find((s) => s.id === 'history-timeline');
  const teacherNotes = stageMeta?.teacherNotes;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 animate-fadeIn select-none">
      {/* 16:9 Presentation Slide Card */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md flex flex-col justify-between min-h-[500px]">
        {/* Slide Header */}
        <div className="border-b border-zinc-800/80 pb-4 mb-5">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-xs uppercase font-black tracking-wider px-2.5 py-1 rounded-full border bg-purple-950/80 text-purple-400 border-purple-800/60">
              LESSON 2 • HISTORY & EVOLUTION
            </span>
            <div className="flex items-center gap-2">
              <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-800">
                <button
                  type="button"
                  onClick={() => setActiveTab('generations')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'generations'
                      ? 'bg-purple-500 text-zinc-950 shadow-md font-black'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  ⚡ The 5 Generations
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('pioneers')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'pioneers'
                      ? 'bg-purple-500 text-zinc-950 shadow-md font-black'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  🏆 Key Pioneers
                </button>
              </div>
              <span className="text-xs font-mono font-bold text-zinc-500">
                STAGE 03 / 06
              </span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            How Computers Shrank from Rooms to Pockets
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-1 font-medium">
            From hot glass vacuum tubes in the 1940s to microscopic silicon chips and AI today.
          </p>
        </div>

        {/* View 1: 5 Generations */}
        {activeTab === 'generations' && (
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 my-auto">
            {FIVE_GENERATIONS.map((gen, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border flex flex-col justify-between gap-2.5 bg-zinc-950/70 transition-all hover:scale-105 shadow-md ${gen.color}`}
              >
                <div>
                  <div className="text-3xl mb-1">{gen.icon}</div>
                  <span className="text-[10px] font-black uppercase tracking-wider block opacity-80">
                    {gen.gen}
                  </span>
                  <h4 className="text-xs sm:text-sm font-black text-white mt-0.5">
                    {gen.component}
                  </h4>
                  <span className="text-[11px] font-bold text-emerald-400 block mt-1">
                    {gen.feature}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-300 leading-snug">
                  {gen.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* View 2: Key Pioneers */}
        {activeTab === 'pioneers' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto">
            {PIONEERS.map((p, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex flex-col justify-between gap-3 shadow-md"
              >
                <div>
                  <span className="text-4xl block mb-2">{p.icon}</span>
                  <h3 className="text-base font-black text-white">{p.name}</h3>
                  <span className="text-xs font-bold text-purple-400 block mt-0.5">
                    {p.role}
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed pt-2 border-t border-zinc-800/80">
                  {p.takeaway}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Memory Formula Banner */}
        <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">Exam Formula:</span>
            <span className="text-zinc-200 font-mono">
              1st: Tubes ➔ 2nd: Transistors ➔ 3rd: ICs ➔ 4th: Microprocessor ➔ 5th: AI
            </span>
          </div>
          <span className="text-zinc-500 text-[11px]">
            Charles Babbage = Father of Computing • Ada Lovelace = First Programmer
          </span>
        </div>
      </div>

      {/* In-Slide Live Teacher Guide Drawer (Press 'T' or click button) */}
      <TeacherGuideDrawer teacherNotes={teacherNotes} />
    </div>
  );
}
