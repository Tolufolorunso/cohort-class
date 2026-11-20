'use client';

import React from 'react';
import { module3Info } from '../../data/module3';
import { TeacherGuideDrawer } from '../presentation/TeacherGuideDrawer';
import { InteractiveRapidTyping } from '../today/InteractiveRapidTyping';

export function StageTouchTyping() {
  const stageMeta = module3Info.stages.find((s) => s.id === 'touch-typing-lab');
  const teacherNotes = stageMeta?.teacherNotes;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 animate-fadeIn select-none">
      {/* 16:9 Presentation Slide Card */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md flex flex-col justify-between min-h-[520px]">
        {/* Slide Header */}
        <div className="border-b border-zinc-800/80 pb-4 mb-5">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-xs uppercase font-black tracking-wider px-2.5 py-1 rounded-full border bg-emerald-950/80 text-emerald-400 border-emerald-800/60">
              LESSON 4 • TOUCH-TYPING ENGINE
            </span>
            <span className="text-xs font-mono font-bold text-zinc-500">
              STAGE 05 / 06
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Rapid-Typing 20-Level Speedrun Arena
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-1 font-medium">
            Find the secret bumps on F and J, anchor your fingers on the Home Row, and type without looking down.
          </p>
        </div>

        {/* 2 Home Row Anchor Guidance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {/* F & J Tactile Bumps */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/70 border border-emerald-500/30 flex flex-col justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-2xl">👀</span>
                <h3 className="text-sm sm:text-base font-bold text-emerald-300">
                  The Secret Bumps on F and J
                </h3>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Close your eyes and slide your index fingers across the middle row. Feel those tiny raised ridges?
              </p>
              <ul className="mt-1 space-y-0.5 text-xs text-zinc-400">
                <li>• <strong>Left Index Finger:</strong> Rests on the <span className="font-mono text-emerald-400 font-black">F</span> bump.</li>
                <li>• <strong>Right Index Finger:</strong> Rests on the <span className="font-mono text-emerald-400 font-black">J</span> bump.</li>
              </ul>
            </div>
            <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-xs font-mono">
              🚗 <strong>Analogy:</strong> Cat-eyes on the road guiding your car at night!
            </div>
          </div>

          {/* Home Row 8 Fingers */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/70 border border-cyan-500/30 flex flex-col justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-2xl">⌨️</span>
                <h3 className="text-sm sm:text-base font-bold text-cyan-300">
                  The 8 Home Row Anchor Keys
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-zinc-900 p-2 rounded-xl border border-zinc-800">
                  <span className="text-[10px] text-zinc-400 block font-bold">LEFT HAND:</span>
                  <span className="font-mono font-black text-amber-400 text-sm">A • S • D • F</span>
                </div>
                <div className="bg-zinc-900 p-2 rounded-xl border border-zinc-800">
                  <span className="text-[10px] text-zinc-400 block font-bold">RIGHT HAND:</span>
                  <span className="font-mono font-black text-cyan-400 text-sm">J • K • L • ;</span>
                </div>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1">
                Both thumbs rest gently on the long Spacebar.
              </p>
            </div>
            <div className="p-2 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 text-xs font-mono">
              🎹 <strong>Touch-Typing:</strong> Type with muscle memory like playing a piano!
            </div>
          </div>
        </div>

        {/* 20-Level RapidTyping Engine Embed */}
        <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-inner">
          <InteractiveRapidTyping />
        </div>
      </div>

      {/* Teacher Guide Drawer */}
      <TeacherGuideDrawer teacherNotes={teacherNotes} />
    </div>
  );
}
