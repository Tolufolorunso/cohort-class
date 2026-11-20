'use client';

import React from 'react';
import { OnePageTeacherGuide } from '../../data/teacherBriefings';

interface OnePageTeacherBriefingModalProps {
  guide: OnePageTeacherGuide;
  isOpen: boolean;
  onClose: () => void;
}

export function OnePageTeacherBriefingModal({
  guide,
  isOpen,
  onClose,
}: OnePageTeacherBriefingModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl text-zinc-200 overflow-hidden print:max-h-none print:border-none print:shadow-none print:rounded-none print:bg-white print:text-black">
        {/* Modal Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between gap-4 bg-zinc-950/80 print:bg-white print:border-b-2 print:border-black">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/40 print:border-black print:text-black">
                1-Page Pre-Class Brief
              </span>
              <span className="text-xs text-zinc-400 font-mono print:text-zinc-600">
                MODULE {guide.moduleNumber}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white print:text-black tracking-tight">
              {guide.title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 print:text-zinc-600 mt-0.5">
              {guide.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 print:hidden shrink-0">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
              title="Print 1-page lesson sheet for class"
            >
              <span>🖨️</span>
              <span className="hidden sm:inline">Print 1-Page Guide</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center font-bold text-sm transition-all cursor-pointer"
              title="Close Guide"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable Content Body (Single Page Fit) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 print:p-0 print:overflow-visible">
          {/* Goal Summary Banner */}
          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 print:bg-zinc-100 print:border-zinc-300">
            <div className="flex items-center gap-2 text-amber-400 print:text-black font-black text-xs uppercase tracking-wider mb-1">
              <span>🎯 Today&apos;s 40-Minute Class Goal:</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-100 print:text-zinc-800 font-medium leading-relaxed">
              {guide.goalSummary}
            </p>
          </div>

          {/* 40-Minute Class Schedule Table */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-emerald-400 print:text-black mb-2 flex items-center gap-1.5">
              <span>⏱️</span> 40-Minute Class Pacing Schedule
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {guide.classSchedule.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800 print:bg-zinc-50 print:border-zinc-300"
                >
                  <div className="text-[11px] font-mono font-bold text-emerald-400 print:text-emerald-700">
                    {item.time}
                  </div>
                  <div className="text-xs font-bold text-white print:text-black mt-0.5 mb-1">
                    {item.activity}
                  </div>
                  <p className="text-[11px] text-zinc-400 print:text-zinc-600 leading-snug">
                    {item.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 3 Core Ideas Explained in Simple English */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400 print:text-black mb-2 flex items-center gap-1.5">
              <span>💡</span> 3 Core Ideas to Explain in Simple English
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {guide.goldenExplanations.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800 print:bg-zinc-50 print:border-zinc-300 flex flex-col justify-between"
                >
                  <div className="text-xs font-bold text-cyan-300 print:text-cyan-900 mb-1.5">
                    {exp.concept}
                  </div>
                  <p className="text-xs text-zinc-300 print:text-zinc-700 leading-relaxed">
                    {exp.simpleExplanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Real Nigerian Everyday Analogy */}
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 print:bg-zinc-100 print:border-zinc-300">
            <div className="flex items-center gap-2 text-emerald-400 print:text-emerald-800 font-black text-xs uppercase tracking-wider mb-1.5">
              <span>🇳🇬</span> Everyday Analogy to Tell the Class: {guide.nigerianAnalogy.title}
            </div>
            <p className="text-xs sm:text-sm text-emerald-100 print:text-zinc-800 leading-relaxed font-normal">
              {guide.nigerianAnalogy.story}
            </p>
          </div>

          {/* Two-Column: Common Mistakes + Verbal Check Questions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Common Mistakes & Fixes */}
            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 print:bg-zinc-50 print:border-zinc-300">
              <h4 className="text-xs font-black uppercase tracking-wider text-red-400 print:text-red-700 mb-2.5 flex items-center gap-1.5">
                <span>⚠️</span> 3 Common Student Mistakes & Fixes
              </h4>
              <ul className="space-y-2.5">
                {guide.commonMistakes.map((m, idx) => (
                  <li key={idx} className="text-xs">
                    <span className="font-bold text-zinc-200 print:text-black block">
                      ❌ {m.mistake}
                    </span>
                    <span className="text-[11px] text-zinc-400 print:text-zinc-600">
                      👉 Fix: {m.teacherFix}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Verbal Questions */}
            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 print:bg-zinc-50 print:border-zinc-300">
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 print:text-amber-800 mb-2.5 flex items-center gap-1.5">
                <span>❓</span> 3 Quick Questions to Ask the Class
              </h4>
              <ul className="space-y-2.5">
                {guide.verbalCheckQuestions.map((q, idx) => (
                  <li key={idx} className="text-xs">
                    <span className="font-bold text-zinc-200 print:text-black block">
                      ❓ {q.question}
                    </span>
                    <span className="text-[11px] text-emerald-400 print:text-emerald-800 font-medium">
                      ✅ Answer: {q.answer}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500 bg-zinc-950/80 print:hidden">
          <span>Dzuel&apos;s Computer Class • Instructor Quick Guide</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold transition-all cursor-pointer"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
}
