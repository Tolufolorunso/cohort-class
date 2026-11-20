'use client';

import React from 'react';
import { module3Info } from '../../data/module3';
import { TeacherGuideDrawer } from '../presentation/TeacherGuideDrawer';
import { InteractiveFolderLab } from '../today/InteractiveFolderLab';

export function StageFolderLab() {
  const stageMeta = module3Info.stages.find((s) => s.id === 'folder-file-lab');
  const teacherNotes = stageMeta?.teacherNotes;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 animate-fadeIn select-none">
      {/* 16:9 Presentation Slide Card */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md flex flex-col justify-between min-h-[520px]">
        {/* Slide Header */}
        <div className="border-b border-zinc-800/80 pb-4 mb-5">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-xs uppercase font-black tracking-wider px-2.5 py-1 rounded-full border bg-purple-950/80 text-purple-400 border-purple-800/60">
              LESSON 3 • FOLDERS &amp; FILES
            </span>
            <span className="text-xs font-mono font-bold text-zinc-500">
              STAGE 04 / 06
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Computer Usage: Folders &amp; Files Lab
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-1 font-medium">
            Understand digital filing: Files hold individual work; Folders organize your school files into neat cabinets.
          </p>
        </div>

        {/* 2 Big Concepts: File vs Folder & Hierarchy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {/* File vs Folder */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800 flex flex-col justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-2xl">📁</span>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  File vs. Folder
                </h3>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                <strong>File:</strong> A single document, photo, or music track (e.g. <code>Notes.docx</code>, <code>Photo.jpg</code>).
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                <strong>Folder:</strong> A digital yellow container that groups related files and subfolders together.
              </p>
            </div>
            <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-800/40 text-purple-300 text-xs font-mono">
              🗄️ <strong>Analogy:</strong> Manila envelopes in a metal school filing cabinet!
            </div>
          </div>

          {/* Directory Hierarchy Tree */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800 flex flex-col justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-2xl">🌳</span>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Directory Tree Structure
                </h3>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                Root Drive (C:\) ➔ Parent Folder ➔ Subfolder ➔ File
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                Example: <code>C:\School_Work\Computer_Studies\Term1_Notes.txt</code>
              </p>
            </div>
            <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-xs font-mono">
              💡 <strong>Best Practice:</strong> Always name your folders clearly by Subject and Term!
            </div>
          </div>
        </div>

        {/* Interactive Folder & File Management Lab Embed */}
        <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-inner">
          <InteractiveFolderLab />
        </div>
      </div>

      {/* Teacher Guide Drawer */}
      <TeacherGuideDrawer teacherNotes={teacherNotes} />
    </div>
  );
}
