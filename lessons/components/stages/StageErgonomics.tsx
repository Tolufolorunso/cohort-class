'use client';

import React from 'react';
import { module3Info } from '../../data/module3';
import { TeacherGuideDrawer } from '../presentation/TeacherGuideDrawer';

export function StageErgonomics() {
  const stageMeta = module3Info.stages.find((s) => s.id === 'lab-safety-ergonomics');
  const teacherNotes = stageMeta?.teacherNotes;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 animate-fadeIn select-none">
      {/* 16:9 Presentation Slide Card */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md flex flex-col justify-between min-h-[520px]">
        {/* Slide Header */}
        <div className="border-b border-zinc-800/80 pb-4 mb-5">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-xs uppercase font-black tracking-wider px-2.5 py-1 rounded-full border bg-amber-950/80 text-amber-400 border-amber-800/60">
              LESSON 4 • ERGONOMICS &amp; LAB ETIQUETTE
            </span>
            <span className="text-xs font-mono font-bold text-zinc-500">
              STAGE 06 / 06
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Ergonomics &amp; Laboratory Health
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-1 font-medium">
            Sit straight, protect your eyes with the 20-20-20 rule, and press Ctrl+S to prevent sudden power loss.
          </p>
        </div>

        {/* 3 Clean Ergonomics & Etiquette Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          {/* Posture */}
          <div className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800 flex flex-col justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🧘‍♂️</span>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  1. Champion Sitting Posture
                </h3>
              </div>
              <ul className="space-y-1.5 text-xs text-zinc-300 leading-relaxed">
                <li>• Back straight and supported by chair.</li>
                <li>• Feet flat on the floor (never dangling).</li>
                <li>• Wrists floating straight, elbows at 90°.</li>
                <li>• Eyes level with the top third of the screen.</li>
              </ul>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60 mt-2 block">
              Prevents neck &amp; back pain
            </span>
          </div>

          {/* 20-20-20 Rule */}
          <div className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800 flex flex-col justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">👁️</span>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  2. The 20-20-20 Eye Rule
                </h3>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Staring at bright laptop screens for hours causes eye strain and headaches.
              </p>
              <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 text-xs font-mono mt-2">
                Every <strong>20 minutes</strong>, look at an object <strong>20 feet away</strong> for <strong>20 seconds</strong>!
              </div>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60 mt-2 block">
              Relaxes your eye muscles
            </span>
          </div>

          {/* Ctrl+S & Power Safety */}
          <div className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800 flex flex-col justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🛡️</span>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  3. The Ctrl + S Lifesaver
                </h3>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                In Nigeria, sudden NEPA outages can strike anytime. RAM loses everything on power cut!
              </p>
              <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-800/40 text-amber-300 text-xs font-mono mt-2">
                Press <strong className="text-white">Ctrl + S</strong> every 2 minutes while writing to save into permanent SSD storage.
              </div>
            </div>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60 mt-2 block">
              Zero lost school work!
            </span>
          </div>
        </div>

        {/* 5 Laboratory Etiquette Ground Rules */}
        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col gap-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
            Dzuels Computer Lab Etiquette Rules:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs text-zinc-300">
            <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
              🚫 <strong>Zero Food &amp; Water:</strong> Keep all drinks off computer desks.
            </div>
            <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
              🧼 <strong>Clean Hands:</strong> Ensure hands are clean and dry before typing.
            </div>
            <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
              🖱️ <strong>Gentle Touch:</strong> Never pound keys or slam the mouse.
            </div>
            <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
              🔌 <strong>Cable Safety:</strong> Never pull cables by the thin wire; grip the plug.
            </div>
            <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
              🪑 <strong>Clean Lab Exit:</strong> Save work, shut down OS, and tuck your chair in.
            </div>
            <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-emerald-400 font-bold">
              🤝 <strong>Equal Partners:</strong> Take turns and respect your lab partner.
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Guide Drawer */}
      <TeacherGuideDrawer teacherNotes={teacherNotes} />
    </div>
  );
}
