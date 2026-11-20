'use client';

import React from 'react';
import { module3Info } from '../../data/module3';
import { TeacherGuideDrawer } from '../presentation/TeacherGuideDrawer';
import { InteractiveMouseTrainer } from '../today/InteractiveMouseTrainer';

export function StageMouseTrainer() {
  const stageMeta = module3Info.stages.find((s) => s.id === 'mouse-touchpad-lab');
  const teacherNotes = stageMeta?.teacherNotes;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 animate-fadeIn select-none">
      {/* 16:9 Presentation Slide Card */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md flex flex-col justify-between min-h-[520px]">
        {/* Slide Header */}
        <div className="border-b border-zinc-800/80 pb-4 mb-5">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-xs uppercase font-black tracking-wider px-2.5 py-1 rounded-full border bg-blue-950/80 text-blue-400 border-blue-800/60">
              LESSON 2 • POINTER MASTERY
            </span>
            <span className="text-xs font-mono font-bold text-zinc-500">
              STAGE 03 / 06
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Mouse &amp; Touchpad Navigation Lab
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-1 font-medium">
            Master the 4 golden pointer actions: Left-Click, Double-Click, Right-Click, and Drag-and-Drop.
          </p>
        </div>

        {/* 4 Pointer Rules Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800 flex flex-col gap-1">
            <span className="text-xl">👆</span>
            <h4 className="text-xs font-bold text-white">1. Left-Click</h4>
            <p className="text-[11px] text-zinc-400">Single tap to select or point at an item.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800 flex flex-col gap-1">
            <span className="text-xl">✌️</span>
            <h4 className="text-xs font-bold text-white">2. Double-Click</h4>
            <p className="text-[11px] text-zinc-400">Two quick taps to knock and open an app or folder.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800 flex flex-col gap-1">
            <span className="text-xl">🖱️</span>
            <h4 className="text-xs font-bold text-white">3. Right-Click</h4>
            <p className="text-[11px] text-zinc-400">Opens the secret options context menu.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800 flex flex-col gap-1">
            <span className="text-xl">✊</span>
            <h4 className="text-xs font-bold text-white">4. Drag &amp; Drop</h4>
            <p className="text-[11px] text-zinc-400">Click, hold, slide across the screen, and release.</p>
          </div>
        </div>

        {/* Interactive Pointer Trainer Embed */}
        <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-inner">
          <InteractiveMouseTrainer />
        </div>
      </div>

      {/* Teacher Guide Drawer */}
      <TeacherGuideDrawer teacherNotes={teacherNotes} />
    </div>
  );
}
