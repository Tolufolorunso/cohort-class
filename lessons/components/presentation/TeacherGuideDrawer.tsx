'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { TeacherNotes } from '../../types/curriculum';
import { validateTeacherPin, saveTeacherSession } from '../../lib/auth';
import { useIsInstructor } from '../../hooks/useIsInstructor';

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
  const isInstructor = useIsInstructor();
  const [internalOpen, setInternalOpen] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [showFullLectureNote, setShowFullLectureNote] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const isOpen = propIsOpen !== undefined ? propIsOpen : internalOpen;

  const handleToggle = useCallback(() => {
    if (!isInstructor) {
      setShowPinModal(true);
      return;
    }
    if (propOnToggle) {
      propOnToggle();
    } else {
      setInternalOpen((prev) => !prev);
    }
  }, [isInstructor, propOnToggle]);

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

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError('');

    const validation = validateTeacherPin(pinInput);
    if (!validation.success || !validation.session) {
      setPinError(validation.error || 'Invalid PIN');
      return;
    }

    saveTeacherSession(validation.session);
    setShowPinModal(false);
    setPinInput('');
    setInternalOpen(true);
  };

  if (!teacherNotes) return null;

  return (
    <div className="w-full mt-4 select-none">
      {/* Teacher Guide Toggle Button - ONLY visible to authenticated instructors */}
      {isInstructor && (
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
            <span className="text-[10px] opacity-75">
              ({isOpen ? 'OPEN' : 'PRESS T'})
            </span>
          </button>
        </div>
      )}

      {/* Expanded Drawer Content - ONLY rendered for instructors */}
      {isInstructor && isOpen && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/40 border border-amber-500/50 text-xs text-amber-200 animate-fadeIn shadow-2xl">
          <div className="flex items-center justify-between gap-2 font-black uppercase tracking-wider text-amber-400 mb-3 border-b border-amber-500/30 pb-2">
            <span className="flex items-center gap-1.5">
              <span>🧑‍🏫</span>
              <span>Instructor Classroom Talking Points (Teacher Only):</span>
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
                    <strong className="text-amber-300">Exam Note:</strong>{' '}
                    {teacherNotes.formalExamTerm}
                  </span>
                </div>
              )}
              {teacherNotes.analogyStory && (
                <div className="flex items-start gap-1.5">
                  <span className="text-emerald-400 shrink-0">🍠</span>
                  <span>
                    <strong className="text-emerald-300">Story Analogy:</strong>{' '}
                    {teacherNotes.analogyStory}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Expandable In-Depth Study Dossier Reference */}
          {teacherNotes.fullLectureReference && (
            <div className="mt-3 pt-2.5 border-t border-amber-500/20">
              <button
                type="button"
                onClick={() => setShowFullLectureNote((prev) => !prev)}
                className="text-xs font-bold text-amber-300 hover:text-white flex items-center gap-1.5 bg-zinc-950/80 px-3 py-1.5 rounded-xl border border-amber-500/30 transition-all cursor-pointer"
              >
                <span>{showFullLectureNote ? '📖 Hide Full Lecture Notes' : '📖 Read Full Complete Lecture Notes for this Topic'}</span>
                <span className="text-[10px] font-mono text-amber-400 font-normal">
                  ({showFullLectureNote ? 'Collapse' : 'Expand full reading text'})
                </span>
              </button>

              {showFullLectureNote && (
                <div className="mt-2.5 p-4 rounded-xl bg-zinc-950/95 border border-amber-500/40 text-xs text-zinc-200 leading-relaxed space-y-2 animate-fadeIn">
                  <span className="text-[10px] font-mono uppercase font-black text-amber-400 tracking-wider block mb-1">
                    Pre-Class Master Dossier & Technical Theory:
                  </span>
                  <p className="whitespace-pre-line text-zinc-300">
                    {teacherNotes.fullLectureReference}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Discreet Instructor PIN Unlock Modal (only pops up if T is pressed without an active teacher session) */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-zinc-100 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔐</span>
                <h3 className="text-sm font-extrabold text-white">
                  Instructor Verification
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowPinModal(false);
                  setPinError('');
                  setPinInput('');
                }}
                className="w-7 h-7 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Teacher Guide notes and classroom prompt cards are restricted to instructors. Enter your PIN to view.
            </p>

            <form onSubmit={handlePinSubmit} className="space-y-3">
              <div>
                <input
                  type="password"
                  autoFocus
                  required
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError('');
                  }}
                  placeholder="Enter Instructor PIN"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white font-mono text-center text-sm tracking-widest focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {pinError && (
                <p className="text-xs text-rose-400 font-medium bg-rose-950/40 p-2 rounded-lg border border-rose-800/50 text-center">
                  ⚠️ {pinError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs transition-all shadow-md cursor-pointer"
              >
                Unlock Teacher Notes →
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
