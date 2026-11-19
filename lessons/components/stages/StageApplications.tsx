'use client';

import React, { useState } from 'react';
import { module1Info } from '../../data/module1';
import { TeacherGuideDrawer } from '../presentation/TeacherGuideDrawer';

const SECTORS = [
  {
    name: '1. Schools & Education',
    icon: '🏫',
    bullets: [
      'JAMB, WAEC & BECE computer-based exams (CBT)',
      'Digital library textbooks and online research',
      'Classroom presentations, results, and grade tracking',
    ],
    color: 'border-sky-500/40 bg-sky-950/20 text-sky-300',
  },
  {
    name: '2. Hospitals & Healthcare',
    icon: '🏥',
    bullets: [
      'Digital patient records and blood group tracking',
      'Ultrasound, X-ray, and MRI medical scanning',
      'Pharmacy medication inventory and dosage calculation',
    ],
    color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300',
  },
  {
    name: '3. Banks & Market POS',
    icon: '🏦',
    bullets: [
      'Automated Teller Machines (ATMs) dispensing cash 24/7',
      'Mobile bank transfers and market POS agent terminals',
      'Protecting customer savings with digital PIN security',
    ],
    color: 'border-amber-500/40 bg-amber-950/20 text-amber-300',
  },
  {
    name: '4. Modern Agriculture & Weather',
    icon: '🌾',
    bullets: [
      'Accurate rainfall and weather predictions for planting',
      'Drone monitoring of crop health and soil quality',
      'Farm sales records and mechanized equipment control',
    ],
    color: 'border-purple-500/40 bg-purple-950/20 text-purple-300',
  },
];

const LAB_SAFETY_RULES = [
  {
    icon: '🚫',
    title: 'No Food or Drinks',
    desc: 'Never bring water sachets, soft drinks, or snacks near laptops. Liquid spills fry motherboards instantly!',
  },
  {
    icon: '🧼',
    title: 'Clean & Dry Hands',
    desc: 'Wipe hands completely dry before touching computer keyboards and touchpads.',
  },
  {
    icon: '⌨️',
    title: 'Gentle Keystrokes',
    desc: 'Touch keys and mouse buttons gently. Pounding or banging switches breaks the laptop.',
  },
  {
    icon: '🔌',
    title: 'Proper Shutdown',
    desc: 'Always click Start ➔ Shut Down. Never pull power cables directly while programs are running.',
  },
  {
    icon: '⚡',
    title: 'NEPA & Electrical Caution',
    desc: 'If you smell burning, see sparks, or notice exposed wires, alert your instructor immediately!',
  },
];

export function StageApplications() {
  const [activeTab, setActiveTab] = useState<'sectors' | 'safety'>('sectors');
  const stageMeta = module1Info.stages.find((s) => s.id === 'applications');
  const teacherNotes = stageMeta?.teacherNotes;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 animate-fadeIn select-none">
      {/* 16:9 Presentation Slide Card */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md flex flex-col justify-between min-h-[500px]">
        {/* Slide Header */}
        <div className="border-b border-zinc-800/80 pb-4 mb-5">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-xs uppercase font-black tracking-wider px-2.5 py-1 rounded-full border bg-emerald-950/80 text-emerald-400 border-emerald-800/60">
              LESSON 4 • APPLICATIONS & SAFETY
            </span>
            <div className="flex items-center gap-2">
              <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-800">
                <button
                  type="button"
                  onClick={() => setActiveTab('sectors')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'sectors'
                      ? 'bg-emerald-500 text-zinc-950 shadow-md font-black'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  🌍 4 Core Sectors
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('safety')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'safety'
                      ? 'bg-emerald-500 text-zinc-950 shadow-md font-black'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  🛡️ 5 Lab Safety Rules
                </button>
              </div>
              <span className="text-xs font-mono font-bold text-zinc-500">
                STAGE 05 / 06
              </span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Where Computers Work & How to Protect Them
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-1 font-medium">
            From JAMB exam halls and bank ATMs to preserving school lab equipment.
          </p>
        </div>

        {/* View 1: 4 Core Sectors */}
        {activeTab === 'sectors' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-auto">
            {SECTORS.map((sector, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border bg-zinc-950/70 flex flex-col justify-between gap-3 shadow-md ${sector.color}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 rounded-xl bg-zinc-900 border border-zinc-800 shrink-0">
                    {sector.icon}
                  </span>
                  <h3 className="text-base font-black text-white">
                    {sector.name}
                  </h3>
                </div>
                <ul className="space-y-1.5 text-xs text-zinc-300">
                  {sector.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className="text-emerald-400">✔</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* View 2: 5 Lab Safety Rules */}
        {activeTab === 'safety' && (
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 my-auto">
            {LAB_SAFETY_RULES.map((rule, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex flex-col justify-between gap-2 shadow-md hover:border-amber-500/50 transition-all"
              >
                <div>
                  <span className="text-3xl block mb-2">{rule.icon}</span>
                  <h4 className="text-xs sm:text-sm font-black text-white">
                    {rule.title}
                  </h4>
                </div>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Real-World Analogy Banner */}
        <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
          <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">
            <span>💡</span>
            <span>Real-World Truth: Computers do not replace human beings—they give humans superpowers!</span>
          </span>
          <span className="text-zinc-500 text-[11px]">
            Always Ctrl + S before leaving the lab
          </span>
        </div>
      </div>

      {/* In-Slide Live Teacher Guide Drawer (Press 'T' or click button) */}
      <TeacherGuideDrawer teacherNotes={teacherNotes} />
    </div>
  );
}
