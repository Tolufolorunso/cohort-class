'use client';

import React from 'react';
import { module3MasterBriefing } from '../../data/module3';

interface Module3MasterBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Module3MasterBriefingModal({
  isOpen,
  onClose,
}: Module3MasterBriefingModalProps) {
  if (!isOpen) return null;

  const data = module3MasterBriefing;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-700 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] flex flex-col my-auto text-zinc-100">
        {/* Modal Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              ⌨️
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-black tracking-wider text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/60">
                  Instructor Lesson Brief
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  {data.duration}
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-white mt-0.5">
                {data.moduleTitle}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Print or Save as PDF"
            >
              <span>🖨️</span>
              <span>Print Lesson Plan</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable Document Content */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2 text-xs sm:text-sm text-zinc-300">
          {/* Target & Objectives */}
          <div className="p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span><strong>Audience:</strong> {data.targetAudience}</span>
              <span className="text-emerald-400 font-bold">Standard 40-Min Period</span>
            </div>
            <p className="text-zinc-200 leading-relaxed">
              <strong>Core Objective:</strong> {data.lessonObjective}
            </p>
          </div>

          {/* Complete In-Depth Pre-Class Lecture Dossier */}
          {data.lectureDossier && data.lectureDossier.length > 0 && (
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 mb-2.5 flex items-center gap-1.5">
                <span>📚</span>
                <span>Complete Pre-Class Subject Matter Dossier (Study before class):</span>
              </h3>
              <div className="space-y-4">
                {data.lectureDossier.map((sec, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-300 space-y-3"
                  >
                    <div className="border-b border-zinc-800/80 pb-2">
                      <h4 className="text-sm font-extrabold text-white">
                        {sec.title}
                      </h4>
                      <p className="text-xs text-cyan-300/90 mt-0.5 italic">
                        {sec.summary}
                      </p>
                    </div>
                    <div className="space-y-2 text-xs leading-relaxed text-zinc-300">
                      {sec.paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>
                    {sec.teacherScript && (
                      <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-600/40 text-xs">
                        <strong className="text-cyan-400 block mb-1">🎙️ Suggested Teacher Lecture Script:</strong>
                        <p className="text-cyan-200 italic">&quot;{sec.teacherScript}&quot;</p>
                      </div>
                    )}
                    <div className="pt-2 border-t border-zinc-800 text-[11px]">
                      <strong className="text-emerald-400 block mb-1">Key Takeaways for Students:</strong>
                      <ul className="list-disc list-inside space-y-0.5 text-zinc-400">
                        {sec.keyTakeaways.map((k, kIdx) => (
                          <li key={kIdx}>{k}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 40-Minute Lesson Timeline Pacing */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 mb-2.5 flex items-center gap-1.5">
              <span>⏱️</span>
              <span>Classroom Lab Pacing Schedule (40 Minutes):</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              {data.pacingSchedule.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between gap-1"
                >
                  <div>
                    <span className="text-[10px] font-black text-amber-400 font-mono">
                      {step.time}
                    </span>
                    <h4 className="text-xs font-bold text-white mt-0.5">
                      {step.stage}
                    </h4>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-snug mt-1">
                    {step.action}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Formal Examination Definitions (WAEC / NECO / BECE) */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-sky-400 mb-2.5 flex items-center gap-1.5">
              <span>🎓</span>
              <span>Official Examination Definitions (WAEC / NECO / BECE Syllabus):</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.formalDefinitions.map((def, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800 flex flex-col justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-white">{def.term}</span>
                      <span className="text-[10px] text-sky-400 font-mono">{def.examContext}</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">{def.definition}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Story Analogies for the Teacher to Speak */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 mb-2.5 flex items-center gap-1.5">
              <span>🍠</span>
              <span>Ready-to-Tell Nigerian Analogies (Tell these to the students):</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.analogies.map((analogy, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-zinc-950/90 border border-emerald-500/30 flex flex-col justify-between gap-2"
                >
                  <div>
                    <h4 className="text-xs font-bold text-emerald-300 mb-1">
                      {analogy.title}
                    </h4>
                    <p className="text-xs text-zinc-300 leading-relaxed italic">
                      &quot;{analogy.story}&quot;
                    </p>
                  </div>
                  <div className="pt-2 border-t border-zinc-800 text-[11px] text-zinc-400">
                    <strong className="text-emerald-400">Class Takeaway:</strong> {analogy.takeaway}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verbal Rapid Check Questions */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-purple-400 mb-2.5 flex items-center gap-1.5">
              <span>❓</span>
              <span>Quick Verbal Check (5 Questions to ask during class):</span>
            </h3>
            <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-4 space-y-2.5">
              {data.verbalCheckQuestions.map((q, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs border-b border-zinc-800/60 pb-2 last:border-b-0 last:pb-0">
                  <span className="text-zinc-200 font-semibold">
                    {idx + 1}. {q.question}
                  </span>
                  <span className="text-emerald-400 font-mono text-[11px] shrink-0">
                    👉 {q.answer}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Lab Safety Reminders */}
          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30">
            <h4 className="text-xs font-bold text-amber-300 mb-2">
              🛡️ 5 Laboratory Ground Rules to Enforce:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-xs text-zinc-300">
              {data.labSafetyRules.map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-zinc-800 pt-4 mt-4 flex items-center justify-between">
          <span className="text-xs text-zinc-500">
            Dzuels Foundation • Secondary School ICT Curriculum
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-black text-xs cursor-pointer shadow-md"
          >
            Ready to Teach
          </button>
        </div>
      </div>
    </div>
  );
}
