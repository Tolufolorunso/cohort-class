'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { TeacherNotes } from '../../types/curriculum';

interface TeacherGuideDrawerProps {
  teacherNotes?: TeacherNotes;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function TeacherGuideDrawer({
  teacherNotes,
  isOpen: propIsOpen,
  onToggle: propOnToggle,
}: TeacherGuideDrawerProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = propIsOpen !== undefined ? propIsOpen : internalOpen;

  const handleToggle = useCallback(() => {
    if (propOnToggle) {
      propOnToggle();
    } else {
      setInternalOpen((prev) => !prev);
    }
  }, [propOnToggle]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key.toLowerCase() === 't') {
        e.preventDefault();
        handleToggle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleToggle]);

  if (!teacherNotes) return null;

  return (
    <div className="w-full mt-4 select-none">
      {/* Toggle Button */}
      <div className="flex justify-end mb-2">
        <button
          type="button"
          onClick={handleToggle}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
            isOpen
              ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-md'
              : 'bg-zinc-900/90 text-zinc-300 hover:text-white border-zinc-700/80 hover:border-zinc-600'
          }`}
          title="Toggle Instructor Talking Points & Notes (Press 'T')"
        >
          <span>🧑‍🏫</span>
          <span>Teacher Guide</span>
          <span className="text-[10px] opacity-75">({isOpen ? 'OPEN' : 'PRESS T'})</span>
        </button>
      </div>

      {/* Expanded Drawer Content */}
      {isOpen && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/40 border border-amber-500/50 text-xs text-amber-200 animate-fadeIn shadow-2xl">
          <div className="flex items-center justify-between gap-2 font-black uppercase tracking-wider text-amber-400 mb-3 border-b border-amber-500/30 pb-2">
            <span className="flex items-center gap-1.5">
              <span>🧑‍🏫</span>
              <span>Instructor Classroom Talking Points:</span>
            </span>
            <span className="text-[10px] text-amber-300/80 font-mono normal-case">
              (Press &apos;T&apos; to hide)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-zinc-200">
            {/* Ask the Class */}
            <div className="bg-zinc-950/85 p-3 rounded-xl border border-amber-800/40 flex flex-col justify-between">
              <div>
                <span className="font-extrabold text-amber-400 block mb-1 text-xs">
                  ❓ Ask the Class:
                </span>
                <p className="leading-relaxed">{teacherNotes.promptQuestion}</p>
              </div>
            </div>

            {/* Key Explanation */}
            <div className="bg-zinc-950/85 p-3 rounded-xl border border-emerald-800/40 flex flex-col justify-between">
              <div>
                <span className="font-extrabold text-emerald-400 block mb-1 text-xs">
                  💡 How to Explain It:
                </span>
                <p className="leading-relaxed">{teacherNotes.talkingPoint}</p>
              </div>
            </div>

            {/* Watch Out For */}
            <div className="bg-zinc-950/85 p-3 rounded-xl border border-rose-800/40 flex flex-col justify-between">
              <div>
                <span className="font-extrabold text-rose-400 block mb-1 text-xs">
                  ⚠️ Watch Out For:
                </span>
                <p className="leading-relaxed">{teacherNotes.watchOutFor}</p>
              </div>
            </div>
          </div>

          {/* Optional Exam Reference & Analogy */}
          {(teacherNotes.formalExamTerm || teacherNotes.analogyStory) && (
            <div className="mt-3 pt-2.5 border-t border-amber-500/20 grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-zinc-300">
              {teacherNotes.formalExamTerm && (
                <div className="flex items-start gap-1.5">
                  <span className="text-amber-400 shrink-0">🎓</span>
                  <span>
                    <strong className="text-amber-300">Exam Note:</strong> {teacherNotes.formalExamTerm}
                  </span>
                </div>
              )}
              {teacherNotes.analogyStory && (
                <div className="flex items-start gap-1.5">
                  <span className="text-emerald-400 shrink-0">🍠</span>
                  <span>
                    <strong className="text-emerald-300">Story Analogy:</strong> {teacherNotes.analogyStory}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
