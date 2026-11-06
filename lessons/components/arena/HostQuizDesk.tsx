'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { neutralQuestions } from '../../data/neutralQuestions';
import { kahootQuestions as module1Questions } from '../../data/module1';
import { module2KahootQuestions } from '../../data/module2';
import { KahootQuestion, QuizScope } from '../../types/curriculum';
import { LiveQuizState } from '../../types/platform';
import { QuestionCreatorModal } from './QuestionCreatorModal';
import { ParticipantPerformanceTable } from './ParticipantPerformanceTable';
import {
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from '../icons/Icons';

const CUSTOM_QUESTIONS_STORAGE_KEY = 'dzuels_custom_quiz_questions';

export function HostQuizDesk() {
  const [quizState, setQuizState] = useState<LiveQuizState | null>(null);
  const [selectedPackKey, setSelectedPackKey] = useState<QuizScope | 'mixed'>('neutral');
  const [customQuestions, setCustomQuestions] = useState<KahootQuestion[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [internalQuestionIndex, setInternalQuestionIndex] = useState(0);

  // Load custom questions from localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const raw = localStorage.getItem(CUSTOM_QUESTIONS_STORAGE_KEY);
        if (raw) {
          setCustomQuestions(JSON.parse(raw));
        }
      } catch {
        // Quiet fail if SSR or storage restricted
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Poll live quiz state
  const pollQuizState = useCallback(async () => {
    try {
      const res = await fetch('/api/live-session');
      if (res.ok) {
        const data = await res.json();
        if (data.quizState) {
          setQuizState(data.quizState);
        }
      }
    } catch {
      // Quiet fail
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      pollQuizState();
    }, 0);
    const interval = setInterval(pollQuizState, 1500);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [pollQuizState]);

  // Save new custom question
  const handleSaveCustomQuestion = (newQuestion: KahootQuestion) => {
    const updated = [newQuestion, ...customQuestions];
    setCustomQuestions(updated);
    try {
      localStorage.setItem(CUSTOM_QUESTIONS_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  // Resolve current active question pack
  const currentPackQuestions: KahootQuestion[] = useMemo(() => {
    switch (selectedPackKey) {
      case 'neutral':
        return neutralQuestions;
      case 'module-1':
        return module1Questions;
      case 'module-2':
        return module2KahootQuestions;
      case 'custom':
        return customQuestions;
      case 'mixed':
        return [
          ...neutralQuestions,
          ...module1Questions,
          ...module2KahootQuestions,
          ...customQuestions,
        ];
      default:
        return neutralQuestions;
    }
  }, [selectedPackKey, customQuestions]);

  const activeQuestionIndex = Math.min(
    internalQuestionIndex,
    Math.max(0, currentPackQuestions.length - 1)
  );
  const currentQuestion = currentPackQuestions[activeQuestionIndex] || currentPackQuestions[0];

  const packTitle = useMemo(() => {
    switch (selectedPackKey) {
      case 'neutral':
        return 'Everyday Computer Literacy & Shortcuts (10 Qs)';
      case 'module-1':
        return 'Module 1: Introduction to Computers (10 Qs)';
      case 'module-2':
        return 'Module 2: Hardware & Teardown (15 Qs)';
      case 'custom':
        return `Custom In-Room Questions (${customQuestions.length} Qs)`;
      case 'mixed':
        return `Mixed Mega Pack (${currentPackQuestions.length} Qs)`;
    }
  }, [selectedPackKey, customQuestions.length, currentPackQuestions.length]);

  // API Broadcast Helpers
  const broadcastAction = async (payload: Record<string, unknown>) => {
    try {
      await fetch('/api/live-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      pollQuizState();
    } catch {
      // Quiet fail
    }
  };

  // Launch / Start Quiz
  const handleStartQuiz = () => {
    if (!currentQuestion) return;
    broadcastAction({
      action: 'start-quiz',
      scope: selectedPackKey === 'mixed' ? 'neutral' : selectedPackKey,
      quizTitle: packTitle,
      activeQuestionIndex,
      activeQuestion: currentQuestion,
    });
  };

  // Change Question
  const handleSelectQuestionIndex = (newIdx: number) => {
    if (newIdx < 0 || newIdx >= currentPackQuestions.length) return;
    setInternalQuestionIndex(newIdx);
    const targetQ = currentPackQuestions[newIdx];
    broadcastAction({
      action: 'change-question',
      activeQuestionIndex: newIdx,
      activeQuestion: targetQ,
    });
  };

  // Reveal Answer
  const handleRevealAnswer = () => {
    broadcastAction({
      action: 'reveal-quiz-answer',
    });
  };

  // Reset Scores
  const handleResetScores = () => {
    if (confirm('Are you sure you want to reset all participant scores and start fresh?')) {
      broadcastAction({
        action: 'reset-quiz-scores',
      });
    }
  };

  const isRevealed = Boolean(quizState?.isRevealed);
  const quizActive = Boolean(quizState?.quizActive);
  const liveTally = quizState?.tally || [0, 0, 0, 0];
  const totalVotes = liveTally.reduce((a, b) => a + b, 0);

  return (
    <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6">
      {/* Top Desk Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-2xl p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
              🎮
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-white">
                  Gamified Quiz Arena & Projector Desk
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Host Desk
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Switch question packs, launch live shape questions, reveal answers, and view the live projector leaderboard.
              </p>
            </div>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all shadow-sm"
          >
            <span>✏️</span>
            <span>+ Add Custom Question</span>
          </button>

          <button
            onClick={handleResetScores}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-red-300 hover:border-red-800/80 transition-colors"
            title="Reset participant scores"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Scores</span>
          </button>
        </div>
      </div>

      {/* Question Pack Switcher */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
          Select Question Pack:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {/* Neutral Pack */}
          <button
            onClick={() => {
              setSelectedPackKey('neutral');
              setInternalQuestionIndex(0);
            }}
            className={`p-3 rounded-2xl border text-left transition-all ${
              selectedPackKey === 'neutral'
                ? 'bg-amber-400 text-zinc-950 border-amber-300 shadow-md font-bold'
                : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
            }`}
          >
            <div className="text-base">⚡ Neutral</div>
            <div className="text-[11px] mt-0.5 opacity-80">Everyday Tech & Shortcuts</div>
            <div className="text-[10px] font-mono mt-1 font-extrabold">10 Questions</div>
          </button>

          {/* Module 1 Pack */}
          <button
            onClick={() => {
              setSelectedPackKey('module-1');
              setInternalQuestionIndex(0);
            }}
            className={`p-3 rounded-2xl border text-left transition-all ${
              selectedPackKey === 'module-1'
                ? 'bg-amber-400 text-zinc-950 border-amber-300 shadow-md font-bold'
                : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
            }`}
          >
            <div className="text-base">🖥️ Module 1</div>
            <div className="text-[11px] mt-0.5 opacity-80">Intro to Computers</div>
            <div className="text-[10px] font-mono mt-1 font-extrabold">10 Questions</div>
          </button>

          {/* Module 2 Pack */}
          <button
            onClick={() => {
              setSelectedPackKey('module-2');
              setInternalQuestionIndex(0);
            }}
            className={`p-3 rounded-2xl border text-left transition-all ${
              selectedPackKey === 'module-2'
                ? 'bg-amber-400 text-zinc-950 border-amber-300 shadow-md font-bold'
                : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
            }`}
          >
            <div className="text-base">💻 Module 2</div>
            <div className="text-[11px] mt-0.5 opacity-80">Hardware & Disassembly</div>
            <div className="text-[10px] font-mono mt-1 font-extrabold">15 Questions</div>
          </button>

          {/* Custom Pack */}
          <button
            onClick={() => {
              setSelectedPackKey('custom');
              setInternalQuestionIndex(0);
            }}
            className={`p-3 rounded-2xl border text-left transition-all ${
              selectedPackKey === 'custom'
                ? 'bg-amber-400 text-zinc-950 border-amber-300 shadow-md font-bold'
                : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
            }`}
          >
            <div className="text-base">✏️ Custom</div>
            <div className="text-[11px] mt-0.5 opacity-80">In-Room Created</div>
            <div className="text-[10px] font-mono mt-1 font-extrabold">
              {customQuestions.length} Questions
            </div>
          </button>

          {/* Mixed Pack */}
          <button
            onClick={() => {
              setSelectedPackKey('mixed');
              setInternalQuestionIndex(0);
            }}
            className={`p-3 rounded-2xl border text-left transition-all ${
              selectedPackKey === 'mixed'
                ? 'bg-amber-400 text-zinc-950 border-amber-300 shadow-md font-bold'
                : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
            }`}
          >
            <div className="text-base">🎲 Mixed Mega</div>
            <div className="text-[11px] mt-0.5 opacity-80">All Combined</div>
            <div className="text-[10px] font-mono mt-1 font-extrabold">
              {neutralQuestions.length + module1Questions.length + module2KahootQuestions.length + customQuestions.length} Questions
            </div>
          </button>
        </div>
      </div>

      {/* Active Question Control Desk */}
      {currentPackQuestions.length === 0 ? (
        <div className="p-8 text-center bg-zinc-950 rounded-2xl border border-zinc-800 text-zinc-500">
          No questions found in this pack. Click <strong>+ Add Custom Question</strong> above to add one!
        </div>
      ) : (
        <div className="p-5 sm:p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-amber-400">
                Question {activeQuestionIndex + 1} of {currentPackQuestions.length}
              </span>
              <span className="text-zinc-600">·</span>
              <span className="text-xs text-zinc-400 font-medium">
                {currentQuestion.topic}
              </span>
            </div>

            {/* Launch / Prev / Next / Reveal Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSelectQuestionIndex(activeQuestionIndex - 1)}
                disabled={activeQuestionIndex === 0}
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                title="Previous Question"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleStartQuiz}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  quizActive
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg'
                    : 'bg-amber-400 hover:bg-amber-300 text-zinc-950 shadow-lg shadow-amber-400/20'
                }`}
              >
                {quizActive ? '⚡ Broadcast Question' : '▶️ Launch Quiz Arena'}
              </button>

              <button
                onClick={handleRevealAnswer}
                disabled={!quizActive}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                  isRevealed
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                    : 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:border-zinc-500'
                } disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                {isRevealed ? '👁️ Answer Revealed' : 'Reveal Answer 👁️'}
              </button>

              <button
                onClick={() => handleSelectQuestionIndex(activeQuestionIndex + 1)}
                disabled={activeQuestionIndex >= currentPackQuestions.length - 1}
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                title="Next Question"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Question Prompt */}
          <div>
            <h4 className="text-base sm:text-lg font-black text-white leading-snug">
              {currentQuestion.question}
            </h4>
          </div>

          {/* 4 Options Grid with Live Vote Tally */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentQuestion.options.map((optText, optIdx) => {
              const isCorrect = optIdx === currentQuestion.correctIndex;
              const votes = liveTally[optIdx] || 0;
              const percent = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;

              const bgShapeClass =
                optIdx === 0
                  ? 'border-red-600/50 bg-[#E21B3C]/10 text-red-200'
                  : optIdx === 1
                  ? 'border-blue-600/50 bg-[#1368CE]/10 text-blue-200'
                  : optIdx === 2
                  ? 'border-amber-600/50 bg-[#D89E00]/10 text-amber-200'
                  : 'border-emerald-600/50 bg-[#26890C]/10 text-emerald-200';

              const shapeBadge =
                optIdx === 0
                  ? 'bg-[#E21B3C] text-white'
                  : optIdx === 1
                  ? 'bg-[#1368CE] text-white'
                  : optIdx === 2
                  ? 'bg-[#D89E00] text-white'
                  : 'bg-[#26890C] text-white';

              return (
                <div
                  key={optIdx}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${bgShapeClass} ${
                    isCorrect && isRevealed ? 'ring-2 ring-white shadow-lg' : ''
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${shapeBadge}`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-zinc-100 truncate">
                      {optText}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isCorrect && (
                      <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        Correct
                      </span>
                    )}
                    <span className="text-xs font-mono font-black text-white px-2 py-0.5 rounded-lg bg-black/40 border border-white/10">
                      {votes} ({percent}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Explanation Banner */}
          <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
            <span className="text-amber-400 font-bold block mb-0.5">Teacher Explanation:</span>
            {currentQuestion.explanation}
          </div>
        </div>
      )}

      {/* Live Participant Performance Table (Projector Only) */}
      <ParticipantPerformanceTable
        participants={quizState?.participants || {}}
        quizTitle={packTitle}
        isRevealed={isRevealed}
      />

      {/* Question Creator Modal */}
      <QuestionCreatorModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSaveQuestion={handleSaveCustomQuestion}
      />
    </section>
  );
}
