'use client';

import React, { useState } from 'react';
import { ModuleNotes } from '../../types/platform';
import { BookOpen, CheckCircle } from '../icons/Icons';

interface StudentNotesViewProps {
  notes: ModuleNotes;
}

export function StudentNotesView({ notes }: StudentNotesViewProps) {
  // Allow students to tick sections as copied into their physical notebooks
  const [copiedSections, setCopiedSections] = useState<Record<string, boolean>>({});

  const toggleCopied = (sectionId: string) => {
    setCopiedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const completedCount = Object.values(copiedSections).filter(Boolean).length;
  const totalCount = notes.sections.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 sm:px-6 sm:py-8 space-y-6">
      {/* Banner Card */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-zinc-900 to-zinc-900 border border-emerald-600/40 rounded-2xl p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <BookOpen size={16} />
              <span>{notes.phaseName}</span>
              <span>•</span>
              <span>Student Notebook Transcriptions</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {notes.moduleTitle}
            </h1>
            <p className="text-zinc-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              {notes.summary}
            </p>
          </div>

          {/* Notebook Copying Progress Badge */}
          <div className="shrink-0 bg-zinc-950/80 border border-zinc-800 rounded-xl p-3.5 sm:p-4 text-center min-w-[140px]">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
              Notebook Progress
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              {completedCount} / {totalCount}
            </div>
            <div className="text-[11px] text-zinc-400 font-medium">Sections Copied</div>
            <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Notebook Guidance Notice */}
        <div className="mt-4 pt-4 border-t border-zinc-800/80 flex items-center gap-2 text-xs text-emerald-300 font-medium">
          <span className="text-base">✍️</span>
          <span>
            <strong>Classroom Tip:</strong> Write down each section heading in your physical exercise book using blue or black pen, and underline key definitions.
          </span>
        </div>
      </div>

      {/* Note Sections */}
      <div className="space-y-6">
        {notes.sections.map((section, idx) => {
          const isCopied = Boolean(copiedSections[section.id]);
          return (
            <article
              key={section.id}
              className={`rounded-2xl border transition-all duration-200 p-5 sm:p-7 bg-zinc-900/90 shadow-lg ${
                isCopied
                  ? 'border-emerald-500/50 bg-emerald-950/10'
                  : 'border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-black text-xs flex items-center justify-center border border-emerald-500/30">
                    {idx + 1}
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {section.title}
                  </h2>
                </div>

                {/* Mark as Copied Toggle Button */}
                <button
                  onClick={() => toggleCopied(section.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isCopied
                      ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                      : 'bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700'
                  }`}
                  title="Check off once you have transcribed this section into your notebook"
                >
                  <CheckCircle size={15} />
                  <span>{isCopied ? 'Copied into Book' : 'Mark as Copied'}</span>
                </button>
              </div>

              {/* Main Definition / Summary Box */}
              <div className="my-4 p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                <p className="text-zinc-200 text-sm sm:text-base leading-relaxed font-normal">
                  {section.summary}
                </p>
              </div>

              {/* Key Takeaway Highlight */}
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-700/50 text-emerald-200 text-xs sm:text-sm font-semibold flex items-start gap-2.5 mb-4">
                <span className="text-base shrink-0">💡</span>
                <div>
                  <span className="font-extrabold text-emerald-400 uppercase text-[11px] block tracking-wider mb-0.5">
                    Core Rule to Remember:
                  </span>
                  {section.keyTakeaway}
                </div>
              </div>

              {/* Bullet Points to Copy */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
                  Detailed Notes to Copy into Notebook:
                </h3>
                <ul className="space-y-2">
                  {section.points.map((pt, pIdx) => (
                    <li
                      key={pIdx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300 bg-zinc-950/30 p-2.5 rounded-lg border border-zinc-800/50 hover:border-zinc-700/80 transition-colors"
                    >
                      <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                      <span className="leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

