'use client';

import React, { useState } from 'react';
import { humanBodyAnalogies, module2Info } from '../../data/module2';
import { TeacherGuideDrawer } from '../presentation/TeacherGuideDrawer';

export function StageHardwareAnatomy() {
  const stageMeta = module2Info.stages.find((s) => s.id === 'hardware-anatomy');
  const teacherNotes = stageMeta?.teacherNotes;

  const [selectedBodyPartId, setSelectedBodyPartId] = useState<string>(
    humanBodyAnalogies[0].id
  );

  const activeBodyAnalogy =
    humanBodyAnalogies.find((b) => b.id === selectedBodyPartId) ||
    humanBodyAnalogies[0];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 animate-fadeIn select-none">
      {/* 16:9 Presentation Slide Card */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md flex flex-col justify-between min-h-[520px]">
        {/* Slide Header */}
        <div className="border-b border-zinc-800/80 pb-4 mb-5">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-xs uppercase font-black tracking-wider px-2.5 py-1 rounded-full border bg-emerald-950/80 text-emerald-400 border-emerald-800/60">
              LESSON 1 • HARDWARE ANATOMY
            </span>
            <span className="text-xs font-mono font-bold text-zinc-500">
              STAGE 01 / 05
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            What is Computer Hardware?
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-1 font-medium">
            Any physical part of the computer that you can see, touch, and pick up.
          </p>
        </div>

        {/* Slide Body: 2 Big Clean Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {/* Card 1: Hardware vs Software */}
          <div className="p-5 sm:p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🖥️</span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Hardware vs. Software
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                <strong>Hardware:</strong> Tangible machinery (monitor, keyboard, mouse, system unit).
              </p>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mt-1">
                <strong>Software:</strong> Intangible instructions &amp; apps inside that tell hardware what to do (Windows, WhatsApp, Chrome).
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-xs font-mono">
              💡 <strong>Golden Rule:</strong> Hardware without software is useless metal; Software without hardware has nowhere to run!
            </div>
          </div>

          {/* Card 2: Crucial Pitfall - System Unit vs CPU */}
          <div className="p-5 sm:p-6 rounded-2xl bg-zinc-950/70 border border-amber-500/30 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">⚠️</span>
                <h3 className="text-base sm:text-lg font-bold text-amber-300">
                  Common Mistake: System Unit ≠ CPU
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                The big rectangular metal box sitting on your desk is the <strong>System Unit</strong> (or Case/Chassis).
              </p>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mt-1">
                The <strong>CPU</strong> (Central Processing Unit) is only the small square silicon microchip hidden inside on the motherboard!
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-800/40 text-amber-300 text-xs font-mono">
              🎯 <strong>Exam Formula:</strong> Box = System Unit | Chip = CPU Brain
            </div>
          </div>
        </div>

        {/* Interactive Human Body Analogy Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>🧬</span>
              <span>The Human Body Hardware Twins (Click to Compare):</span>
            </span>
            <span className="text-[11px] font-mono text-emerald-400">
              {activeBodyAnalogy.bodyPart} = {activeBodyAnalogy.computerPart}
            </span>
          </div>

          {/* Quick Body Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {humanBodyAnalogies.slice(0, 4).map((analogy) => {
              const isSelected = analogy.id === selectedBodyPartId;
              return (
                <button
                  key={analogy.id}
                  type="button"
                  onClick={() => setSelectedBodyPartId(analogy.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer border ${
                    isSelected
                      ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow-md font-extrabold'
                      : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span>{analogy.icon}</span>
                    <span>{analogy.bodyPart}</span>
                  </span>
                  <span className="text-[10px] opacity-75 font-mono">
                    {analogy.computerPart}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Analogy Description */}
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs sm:text-sm text-zinc-300 flex items-center gap-3">
            <span className="text-2xl shrink-0">{activeBodyAnalogy.icon}</span>
            <p className="leading-snug">
              <strong>{activeBodyAnalogy.computerPart}:</strong> {activeBodyAnalogy.roleDescription}
            </p>
          </div>
        </div>

        {/* Nigerian Everyday Analogy Callout */}
        <div className="mt-4 bg-gradient-to-r from-emerald-950/60 to-zinc-950 border border-emerald-500/40 rounded-2xl p-4 flex items-center gap-3">
          <span className="text-2xl shrink-0">🇳🇬</span>
          <p className="text-xs sm:text-sm text-emerald-200 font-semibold leading-snug">
            <strong>Relatable Nigerian Analogy:</strong> Hardware is the heavy wooden mortar and pestle you can hold in your hands. Software is the cooking recipe for pounded yam inside your head. You cannot pound yam with only knowledge, and the pestle cannot pound yam without someone directing it!
          </p>
        </div>
      </div>

      {/* In-Slide Live Teacher Guide Drawer (Press 'T' or click button) */}
      <TeacherGuideDrawer teacherNotes={teacherNotes} />
    </div>
  );
}
