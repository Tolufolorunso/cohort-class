'use client';

import React, { useState } from 'react';
import { KahootQuestion, QuizScope } from '../../types/curriculum';

interface QuestionCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveQuestion: (question: KahootQuestion) => void;
}

export function QuestionCreatorModal({
  isOpen,
  onClose,
  onSaveQuestion,
}: QuestionCreatorModalProps) {
  const [topic, setTopic] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctIndex, setCorrectIndex] = useState<number>(0);
  const [explanation, setExplanation] = useState('');
  const [scope, setScope] = useState<QuizScope>('custom');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) {
      setErrorMsg('Please enter the question prompt.');
      return;
    }
    if (!optionA.trim() || !optionB.trim() || !optionC.trim() || !optionD.trim()) {
      setErrorMsg('All 4 answer options (A, B, C, D) are required.');
      return;
    }
    if (!explanation.trim()) {
      setErrorMsg('Please provide a helpful explanation for when the answer is revealed.');
      return;
    }

    const newQuestion: KahootQuestion = {
      id: Date.now(),
      topic: topic.trim() || 'Custom In-Room Challenge',
      question: questionText.trim(),
      options: [optionA.trim(), optionB.trim(), optionC.trim(), optionD.trim()],
      correctIndex,
      explanation: explanation.trim(),
      timeLimitSeconds: 30,
      scope,
    };

    onSaveQuestion(newQuestion);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <span className="text-2xl p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
              ✏️
            </span>
            <div>
              <h3 className="text-lg font-black text-white">Create Custom Quiz Question</h3>
              <p className="text-xs text-zinc-400">
                Add an in-room question for any module or neutral topic on the fly.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-2 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs font-semibold">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                Category Scope
              </label>
              <select
                value={scope}
                onChange={(e) => setScope(e.target.value as QuizScope)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-amber-500"
              >
                <option value="custom">Custom In-Room Pack</option>
                <option value="neutral">Neutral Everyday Tech & Shortcuts</option>
                <option value="module-1">Module 1: Intro to Computers</option>
                <option value="module-2">Module 2: Hardware & Teardown</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                Topic / Tag
              </label>
              <input
                type="text"
                placeholder="e.g. Keyboard Shortcuts or Lab Safety"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
              Question Prompt *
            </label>
            <textarea
              rows={2}
              placeholder="Type your question here clearly in simple English..."
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase text-zinc-400">
              4 Shape Options & Correct Answer *
            </label>

            {/* Option A */}
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="correctIndex"
                checked={correctIndex === 0}
                onChange={() => setCorrectIndex(0)}
                className="w-4 h-4 accent-amber-400 cursor-pointer"
                title="Mark Option A as correct"
              />
              <div className="w-8 h-8 rounded-lg bg-[#E21B3C] flex items-center justify-center text-white text-xs font-black shrink-0">
                🔺 A
              </div>
              <input
                type="text"
                placeholder="Red Triangle option text..."
                value={optionA}
                onChange={(e) => setOptionA(e.target.value)}
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-red-500"
              />
            </div>

            {/* Option B */}
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="correctIndex"
                checked={correctIndex === 1}
                onChange={() => setCorrectIndex(1)}
                className="w-4 h-4 accent-amber-400 cursor-pointer"
                title="Mark Option B as correct"
              />
              <div className="w-8 h-8 rounded-lg bg-[#1368CE] flex items-center justify-center text-white text-xs font-black shrink-0">
                🔷 B
              </div>
              <input
                type="text"
                placeholder="Blue Diamond option text..."
                value={optionB}
                onChange={(e) => setOptionB(e.target.value)}
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Option C */}
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="correctIndex"
                checked={correctIndex === 2}
                onChange={() => setCorrectIndex(2)}
                className="w-4 h-4 accent-amber-400 cursor-pointer"
                title="Mark Option C as correct"
              />
              <div className="w-8 h-8 rounded-lg bg-[#D89E00] flex items-center justify-center text-white text-xs font-black shrink-0">
                🟡 C
              </div>
              <input
                type="text"
                placeholder="Yellow Circle option text..."
                value={optionC}
                onChange={(e) => setOptionC(e.target.value)}
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Option D */}
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="correctIndex"
                checked={correctIndex === 3}
                onChange={() => setCorrectIndex(3)}
                className="w-4 h-4 accent-amber-400 cursor-pointer"
                title="Mark Option D as correct"
              />
              <div className="w-8 h-8 rounded-lg bg-[#26890C] flex items-center justify-center text-white text-xs font-black shrink-0">
                🟩 D
              </div>
              <input
                type="text"
                placeholder="Green Square option text..."
                value={optionD}
                onChange={(e) => setOptionD(e.target.value)}
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <p className="text-[11px] text-zinc-500">
              * Select the radio button next to the correct answer shape.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
              Explanation (shown on reveal) *
            </label>
            <textarea
              rows={2}
              placeholder="Explain why this answer is correct in simple words with relatable Nigerian lab context..."
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-extrabold bg-amber-400 hover:bg-amber-300 text-zinc-950 shadow-lg shadow-amber-400/20 transition-all"
            >
              Save Question to Bank
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

