'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { neutralQuestions } from '../../data/neutralQuestions';
import { kahootQuestions as module1Questions } from '../../data/module1';
import { module2KahootQuestions } from '../../data/module2';
import { module3KahootQuestions } from '../../data/module3';
import { KahootQuestion, QuizScope } from '../../types/curriculum';
import { LiveQuizState } from '../../types/platform';
import { QuestionCreatorModal } from './QuestionCreatorModal';
import { ParticipantPerformanceTable } from './ParticipantPerformanceTable';
import {
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
} from '../icons/Icons';

const CUSTOM_QUESTIONS_STORAGE_KEY = 'dzuels_custom_quiz_questions';
const TIME_LIMIT_OPTIONS = [10, 15, 20, 30, 45, 60];

export function HostQuizDesk() {
  const [quizState, setQuizState] = useState<LiveQuizState | null>(null);
  const [selectedPackKey, setSelectedPackKey] = useState<QuizScope | 'mixed'>('neutral');
  const [selectedTimeLimit, setSelectedTimeLimit] = useState<number>(30);
  const [customQuestions, setCustomQuestions] = useState<KahootQuestion[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [internalQuestionIndex, setInternalQuestionIndex] = useState(0);
  const [connectedStudentsCount, setConnectedStudentsCount] = useState<number>(0);
  const [hostSecondsRemaining, setHostSecondsRemaining] = useState<number>(30);

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
        if (data.connectedCount !== undefined) {
          setConnectedStudentsCount(data.connectedCount);
        }
        if (data.quizState) {
          setQuizState((prev) => {
            if (
              prev &&
              prev.quizActive === data.quizState.quizActive &&
              prev.activeQuestion?.id === data.quizState.activeQuestion?.id &&
              prev.questionStartTime === data.quizState.questionStartTime &&
              prev.isRevealed === data.quizState.isRevealed &&
              prev.isTimerRunning === data.quizState.isTimerRunning &&
              prev.timeLimitSeconds === data.quizState.timeLimitSeconds &&
              prev.timeRemainingSeconds === data.quizState.timeRemainingSeconds &&
              prev.showLeaderboard === data.quizState.showLeaderboard &&
              prev.tally?.join(',') === data.quizState.tally?.join(',') &&
              JSON.stringify(prev.participants) === JSON.stringify(data.quizState.participants)
            ) {
              return prev;
            }
            return data.quizState;
          });
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
      case 'module-3':
        return module3KahootQuestions;
      case 'custom':
        return customQuestions;
      case 'mixed':
        return [
          ...neutralQuestions,
          ...module1Questions,
          ...module2KahootQuestions,
          ...module3KahootQuestions,
          ...customQuestions,
        ];
      default:
        return neutralQuestions;
    }
  }, [selectedPackKey, customQuestions]);

  // Derive active index: prefer server active question index if active quiz is live, otherwise internal selection
  const serverActiveIndex =
    quizState?.quizActive && quizState.activeQuestion
      ? currentPackQuestions.findIndex((q) => q.id === quizState.activeQuestion?.id)
      : -1;

  const activeQuestionIndex = Math.min(
    serverActiveIndex !== -1 ? serverActiveIndex : internalQuestionIndex,
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
      case 'module-3':
        return 'Module 3: Usage, Booting & Rapid-Typing (10 Qs)';
      case 'custom':
        return `Custom In-Room Questions (${customQuestions.length} Qs)`;
      case 'mixed':
        return `Mixed Mega Pack (${currentPackQuestions.length} Qs)`;
    }
  }, [selectedPackKey, customQuestions.length, currentPackQuestions.length]);

  // Derived state
  const isRevealed = Boolean(quizState?.isRevealed);
  const quizActive = Boolean(quizState?.quizActive);
  const isTimerRunning = Boolean(quizState?.isTimerRunning);
  const showLeaderboard = Boolean(quizState?.showLeaderboard);
  const liveTally = quizState?.tally || [0, 0, 0, 0];
  const totalVotes = liveTally.reduce((a, b) => a + b, 0);

  const effectiveTimeLimit = quizState?.timeLimitSeconds || selectedTimeLimit;
  const questionStartTime = quizState?.questionStartTime;
  const effectiveHostSecondsRemaining = isRevealed ? 0 : hostSecondsRemaining;

  // Local live timer synchronization
  useEffect(() => {
    if (!quizActive || isRevealed || !questionStartTime) {
      return;
    }

    const updateTimer = () => {
      const now = Date.now();
      let remaining = 0;
      if (isTimerRunning) {
        const elapsed = Math.max(0, Math.floor((now - questionStartTime) / 1000));
        remaining = Math.max(0, effectiveTimeLimit - elapsed);
      } else if (quizState?.timeRemainingSeconds !== undefined) {
        remaining = quizState.timeRemainingSeconds;
      } else {
        remaining = effectiveTimeLimit;
      }
      setHostSecondsRemaining(remaining);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 500);
    return () => clearInterval(interval);
  }, [
    quizActive,
    isRevealed,
    questionStartTime,
    isTimerRunning,
    effectiveTimeLimit,
    quizState?.timeRemainingSeconds,
  ]);

  // API Broadcast Helper
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
      timeLimitSeconds: selectedTimeLimit,
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
      timeLimitSeconds: selectedTimeLimit,
    });
  };

  // Timer controls
  const handlePauseTimer = () => {
    broadcastAction({ action: 'pause-timer' });
  };

  const handleResumeTimer = () => {
    broadcastAction({ action: 'resume-timer' });
  };

  const handleExtendTime = () => {
    broadcastAction({ action: 'extend-time', seconds: 10 });
  };

  const handleSetTimeLimit = (newLimit: number) => {
    setSelectedTimeLimit(newLimit);
    if (quizActive) {
      broadcastAction({ action: 'set-time-limit', timeLimitSeconds: newLimit });
    }
  };

  const handleRevealAnswer = () => {
    broadcastAction({ action: 'reveal-quiz-answer' });
  };

  const handlePauseQuiz = () => {
    broadcastAction({ action: 'pause-quiz' });
  };

  const handleToggleLeaderboard = () => {
    broadcastAction({ action: 'toggle-leaderboard' });
  };

  const handleResetScores = () => {
    if (confirm('Are you sure you want to reset all participant scores and start fresh?')) {
      broadcastAction({ action: 'reset-quiz-scores' });
    }
  };

  const responseRate =
    connectedStudentsCount > 0
      ? Math.min(100, Math.round((totalVotes / connectedStudentsCount) * 100))
      : 0;

  const timerGaugeColor =
    effectiveHostSecondsRemaining <= 5
      ? 'text-rose-400 border-rose-500 bg-rose-500/10'
      : effectiveHostSecondsRemaining <= 10
      ? 'text-amber-400 border-amber-500 bg-amber-500/10'
      : 'text-emerald-400 border-emerald-500 bg-emerald-500/10';

  return (
    <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Top Desk Header Bar */}
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
                Set question time limit, launch live shape questions, pause/extend timer, and control the projector stage.
              </p>
            </div>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all shadow-sm"
          >
            <span>✏️</span>
            <span>+ Add Custom Question</span>
          </button>

          <button
            onClick={handleToggleLeaderboard}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all border ${
              showLeaderboard
                ? 'bg-amber-400 text-zinc-950 border-amber-300 shadow-lg'
                : 'bg-zinc-950 border-zinc-800 text-amber-300 hover:border-amber-500/50'
            }`}
          >
            <span>🏆</span>
            <span>{showLeaderboard ? 'Back to Question' : 'Show Leaderboard'}</span>
          </button>

          <button
            onClick={handleResetScores}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-red-300 hover:border-red-800/80 transition-colors"
            title="Reset participant scores"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Scores</span>
          </button>
        </div>
      </div>

      {/* Question Pack Switcher & Time Limit Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800/80">
        {/* Pack Selector (2 cols) */}
        <div className="lg:col-span-2 space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
            Select Question Pack:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { key: 'neutral', icon: '⚡', title: 'Neutral', sub: 'Everyday Tech', count: neutralQuestions.length },
              { key: 'module-1', icon: '🖥️', title: 'Module 1', sub: 'Intro Computers', count: module1Questions.length },
              { key: 'module-2', icon: '💻', title: 'Module 2', sub: 'Hardware Lab', count: module2KahootQuestions.length },
              { key: 'module-3', icon: '⌨️', title: 'Module 3', sub: 'Usage & Typing', count: module3KahootQuestions.length },
              { key: 'custom', icon: '✏️', title: 'Custom', sub: 'In-Room Pack', count: customQuestions.length },
              {
                key: 'mixed',
                icon: '🎲',
                title: 'Mixed Mega',
                sub: 'All Packs',
                count:
                  neutralQuestions.length +
                  module1Questions.length +
                  module2KahootQuestions.length +
                  module3KahootQuestions.length +
                  customQuestions.length,
              },
            ].map((p) => {
              const isSelected = selectedPackKey === p.key;
              return (
                <button
                  key={p.key}
                  onClick={() => {
                    setSelectedPackKey(p.key as QuizScope | 'mixed');
                    setInternalQuestionIndex(0);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-amber-400 text-zinc-950 border-amber-300 shadow-md font-bold'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <div className="text-sm font-black flex items-center gap-1.5">
                    <span>{p.icon}</span>
                    <span>{p.title}</span>
                  </div>
                  <div className="text-[10px] mt-0.5 opacity-80">{p.sub}</div>
                  <div className="text-[9px] font-mono mt-0.5 font-bold">{p.count} Qs</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Limit Selector (1 col) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
              Question Time Limit:
            </label>
            <span className="text-[11px] font-mono font-bold text-amber-400">
              {selectedTimeLimit} seconds
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {TIME_LIMIT_OPTIONS.map((limit) => {
              const isCurrent = selectedTimeLimit === limit;
              return (
                <button
                  key={limit}
                  onClick={() => handleSetTimeLimit(limit)}
                  className={`py-2 px-1 rounded-xl text-xs font-black border transition-all text-center ${
                    isCurrent
                      ? 'bg-amber-400 text-zinc-950 border-amber-300 shadow-md'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  {limit}s
                </button>
              );
            })}
          </div>
          <p className="text-[10px] text-zinc-500 leading-tight pt-1">
            ⏱️ Faster answers earn higher speed bonus points (up to +500 pts).
          </p>
        </div>
      </div>

      {/* Projector Leaderboard Mode View */}
      {showLeaderboard ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏆</span>
              <div>
                <h4 className="text-base font-extrabold text-white">Projector Classroom Leaderboard</h4>
                <p className="text-xs text-zinc-400">Showing top ranking patrons and performance scores</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleLeaderboard}
                className="px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold border border-zinc-700"
              >
                ◀ Back to Question Stage
              </button>
              <button
                onClick={() => handleSelectQuestionIndex(activeQuestionIndex + 1)}
                disabled={activeQuestionIndex >= currentPackQuestions.length - 1}
                className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-black shadow-md disabled:opacity-40"
              >
                Next Question ▶
              </button>
            </div>
          </div>

          <ParticipantPerformanceTable
            participants={quizState?.participants || {}}
            quizTitle={packTitle}
            isRevealed={isRevealed}
          />
        </div>
      ) : (
        /* Active Question & Projector Presentation Stage */
        <div className="p-5 sm:p-7 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6">
          {/* Question Metadata & Top Navigation Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
            <div className="flex items-center gap-2">
              <span className="font-black text-sm text-amber-400">
                Question {activeQuestionIndex + 1} of {currentPackQuestions.length}
              </span>
              <span className="text-zinc-600">·</span>
              <span className="text-xs text-zinc-300 font-semibold px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800">
                {currentQuestion.topic}
              </span>
            </div>

            {/* Pagination Chevrons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSelectQuestionIndex(activeQuestionIndex - 1)}
                disabled={activeQuestionIndex === 0}
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                title="Previous Question"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold text-zinc-400">
                {activeQuestionIndex + 1} / {currentPackQuestions.length}
              </span>
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

          {/* Large Projector Question Prompt */}
          <div className="py-2 text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-snug max-w-4xl mx-auto drop-shadow-sm">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Timing, Live Submissions & Controller Dock */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
            {/* Live Timer Gauge */}
            <div className="flex items-center gap-3">
              <div
                className={`px-4 py-2 rounded-2xl border flex items-center gap-2.5 font-mono font-black text-xl sm:text-2xl shadow-inner ${timerGaugeColor}`}
              >
                <Clock className="w-5 h-5" />
                <span>
                  {!quizActive
                    ? `${selectedTimeLimit}s`
                    : isRevealed
                    ? 'Revealed'
                    : !isTimerRunning
                    ? '⏸️ Paused'
                    : `${effectiveHostSecondsRemaining}s`}
                </span>
              </div>

              {/* Live Answered Count */}
              <div>
                <div className="text-xs font-bold text-zinc-400">
                  Student Answers Received:
                </div>
                <div className="text-sm font-black text-white flex items-center gap-2">
                  <span>
                    {totalVotes} of {Math.max(totalVotes, connectedStudentsCount)} answered ({responseRate}%)
                  </span>
                  {totalVotes > 0 && totalVotes >= connectedStudentsCount && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      All in! ⚡
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Instructor Quick Remote Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {!quizActive ? (
                <button
                  onClick={handleStartQuiz}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-xs shadow-lg shadow-amber-400/20 transition-all flex items-center gap-1.5"
                >
                  <span>▶️</span>
                  <span>Launch Question</span>
                </button>
              ) : (
                <>
                  {/* Pause / Resume Timer Button */}
                  {!isRevealed && (
                    <button
                      onClick={isTimerRunning ? handlePauseTimer : handleResumeTimer}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                        isTimerRunning
                          ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500'
                      }`}
                      title={isTimerRunning ? 'Pause countdown timer' : 'Resume countdown timer'}
                    >
                      <span>{isTimerRunning ? '⏸️' : '▶️'}</span>
                      <span>{isTimerRunning ? 'Pause' : 'Resume'}</span>
                    </button>
                  )}

                  {/* +10s Add Time Button */}
                  {!isRevealed && (
                    <button
                      onClick={handleExtendTime}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-all flex items-center gap-1"
                      title="Add 10 extra seconds to timer"
                    >
                      <span>⏱️</span>
                      <span>+10s</span>
                    </button>
                  )}

                  {/* Reveal / Lock Button */}
                  <button
                    onClick={handleRevealAnswer}
                    disabled={isRevealed}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                      isRevealed
                        ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                        : 'bg-zinc-950 border-zinc-700 text-zinc-200 hover:border-zinc-500'
                    } disabled:opacity-40 disabled:cursor-not-allowed`}
                  >
                    <span>👁️</span>
                    <span>{isRevealed ? 'Revealed' : 'Lock & Reveal'}</span>
                  </button>

                  {/* Next Question Shortcut */}
                  <button
                    onClick={() => handleSelectQuestionIndex(activeQuestionIndex + 1)}
                    disabled={activeQuestionIndex >= currentPackQuestions.length - 1}
                    className="px-4 py-2 rounded-xl text-xs font-black bg-amber-400 hover:bg-amber-300 text-zinc-950 shadow-md transition-all flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Lobby Return Button */}
                  <button
                    onClick={handlePauseQuiz}
                    className="px-3 py-2 rounded-xl text-xs font-bold bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
                    title="Return students to lobby"
                  >
                    ⏸️ Lobby
                  </button>
                </>
              )}
            </div>
          </div>

          {/* 4 Large Shape Option Cards & Live Bar Distribution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentQuestion.options.map((optText, optIdx) => {
              const isCorrect = optIdx === currentQuestion.correctIndex;
              const votes = liveTally[optIdx] || 0;
              const percent = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;

              const bgShapeClass =
                optIdx === 0
                  ? 'border-red-600/50 bg-[#E21B3C]/15 text-red-100'
                  : optIdx === 1
                  ? 'border-blue-600/50 bg-[#1368CE]/15 text-blue-100'
                  : optIdx === 2
                  ? 'border-amber-600/50 bg-[#D89E00]/15 text-amber-100'
                  : 'border-emerald-600/50 bg-[#26890C]/15 text-emerald-100';

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
                  className={`p-4 sm:p-5 rounded-2xl border flex flex-col justify-between gap-3 relative overflow-hidden transition-all duration-200 ${bgShapeClass} ${
                    isCorrect && isRevealed ? 'ring-4 ring-white shadow-2xl scale-[1.01]' : ''
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 relative z-10">
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-md ${shapeBadge}`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="text-base sm:text-lg font-black text-white leading-tight">
                        {optText}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isCorrect && isRevealed && (
                        <span className="text-xs uppercase font-black px-2 py-0.5 rounded-full bg-emerald-500 text-zinc-950 flex items-center gap-1 shadow-md">
                          <CheckCircle className="w-3.5 h-3.5" /> Correct
                        </span>
                      )}
                      <span className="text-xs sm:text-sm font-mono font-black text-white px-2.5 py-1 rounded-xl bg-black/50 border border-white/20">
                        {votes} ({percent}%)
                      </span>
                    </div>
                  </div>

                  {/* Horizontal Vote Distribution Bar on Reveal */}
                  {isRevealed && (
                    <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden relative z-10">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isCorrect ? 'bg-white' : 'bg-white/40'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Teacher Explanation Banner (on Reveal) */}
          {isRevealed && (
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-200 shadow-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400">
                  💡 Teacher Explanation & Classroom Takeaway:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleLeaderboard}
                    className="px-3 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-black shadow-md"
                  >
                    🏆 Show Leaderboard
                  </button>
                  <button
                    onClick={() => handleSelectQuestionIndex(activeQuestionIndex + 1)}
                    disabled={activeQuestionIndex >= currentPackQuestions.length - 1}
                    className="px-3 py-1 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold disabled:opacity-30"
                  >
                    Next Question ▶
                  </button>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Question Creator Modal */}
      <QuestionCreatorModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSaveQuestion={handleSaveCustomQuestion}
      />
    </section>
  );
}
