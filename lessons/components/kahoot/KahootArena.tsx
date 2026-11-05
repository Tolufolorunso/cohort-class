'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { kahootQuestions } from '../../data/module1';
import { KahootShape } from '../../types/curriculum';
import { UserRole } from '../../types/platform';
import {
  Sparkles,
  Award,
  CheckCircle,
  Eye,
  EyeOff,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Lock,
  Flame,
  Clock,
} from '../icons/Icons';

export interface KahootArenaProps {
  userRole?: UserRole;
  syncedQuestionId?: number | null;
  syncedIsRevealed?: boolean;
  onBroadcastState?: (updates: { activeKahootQuestionId?: number | null; isKahootRevealed?: boolean }) => void;
  onStudentVote?: (questionId: number, optionIndex: number) => void;
  liveTally?: [number, number, number, number];
  patronNumber?: string;
}

const SHAPE_CONFIGS: {
  shape: KahootShape;
  label: string;
  name: string;
  colorHex: string;
  bgClass: string;
  hoverClass: string;
  activeRing: string;
  svgIcon: React.ReactNode;
}[] = [
  {
    shape: 'triangle',
    label: 'A',
    name: 'Red Triangle',
    colorHex: '#E21B3C',
    bgClass: 'bg-[#E21B3C]',
    hoverClass: 'hover:bg-[#C21532]',
    activeRing: 'ring-4 ring-red-400',
    svgIcon: (
      <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-10 sm:h-10 fill-white drop-shadow-sm">
        <polygon points="50,15 90,85 10,85" />
      </svg>
    ),
  },
  {
    shape: 'diamond',
    label: 'B',
    name: 'Blue Diamond',
    colorHex: '#1368CE',
    bgClass: 'bg-[#1368CE]',
    hoverClass: 'hover:bg-[#0E54A8]',
    activeRing: 'ring-4 ring-blue-400',
    svgIcon: (
      <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-10 sm:h-10 fill-white drop-shadow-sm">
        <polygon points="50,10 90,50 50,90 10,50" />
      </svg>
    ),
  },
  {
    shape: 'circle',
    label: 'C',
    name: 'Yellow Circle',
    colorHex: '#D89E00',
    bgClass: 'bg-[#D89E00]',
    hoverClass: 'hover:bg-[#B38300]',
    activeRing: 'ring-4 ring-amber-300',
    svgIcon: (
      <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-10 sm:h-10 fill-white drop-shadow-sm">
        <circle cx="50" cy="50" r="38" />
      </svg>
    ),
  },
  {
    shape: 'square',
    label: 'D',
    name: 'Green Square',
    colorHex: '#26890C',
    bgClass: 'bg-[#26890C]',
    hoverClass: 'hover:bg-[#1F6E0A]',
    activeRing: 'ring-4 ring-emerald-400',
    svgIcon: (
      <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-10 sm:h-10 fill-white drop-shadow-sm">
        <rect x="18" y="18" width="64" height="64" rx="8" />
      </svg>
    ),
  },
];

export function KahootArena({
  userRole = 'student',
  syncedQuestionId,
  syncedIsRevealed,
  onBroadcastState,
  onStudentVote,
  liveTally = [0, 0, 0, 0],
  patronNumber,
}: KahootArenaProps) {
  // Active question index (0 to 9)
  const [internalQuestionIndex, setInternalQuestionIndex] = useState(0);

  // Derive active question based on sync or local selection
  const currentQuestionIndex = useMemo(() => {
    if (syncedQuestionId !== undefined && syncedQuestionId !== null) {
      const idx = kahootQuestions.findIndex((q) => q.id === syncedQuestionId);
      return idx >= 0 ? idx : 0;
    }
    return internalQuestionIndex;
  }, [syncedQuestionId, internalQuestionIndex]);

  const currentQuestion = kahootQuestions[currentQuestionIndex];

  // Answer selections per question: questionId -> optionIndex (0, 1, 2, 3)
  const [studentAnswers, setStudentAnswers] = useState<Record<number, number>>({});
  const [studentScore, setStudentScore] = useState<number>(0);
  const [streakCount, setStreakCount] = useState<number>(0);

  // Local reveal state for teacher or standalone student mode
  const [localRevealed, setLocalRevealed] = useState<Record<number, boolean>>({});

  // Timer countdown: 30s
  const [secondsRemaining, setSecondsRemaining] = useState<number>(30);
  const [timerActive, setTimerActive] = useState<boolean>(true);

  // Check if answer is revealed
  const isRevealed =
    syncedIsRevealed !== undefined
      ? syncedIsRevealed
      : Boolean(localRevealed[currentQuestion.id]);

  const selectedOptionIndex = studentAnswers[currentQuestion.id];
  const isAnswered = selectedOptionIndex !== undefined;
  const isCorrect = isAnswered && selectedOptionIndex === currentQuestion.correctIndex;

  // Reset timer on question change
  useEffect(() => {
    const timer = setTimeout(() => {
      setSecondsRemaining(30);
      setTimerActive(true);
    }, 0);
    return () => clearTimeout(timer);
  }, [currentQuestionIndex]);

  // Countdown timer tick
  useEffect(() => {
    if (!timerActive || isRevealed || secondsRemaining <= 0) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          setTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, isRevealed, secondsRemaining]);

  // Handle student shape selection
  const handleSelectShape = (optionIndex: number) => {
    if (isAnswered || isRevealed) return; // Answer locked once submitted

    setStudentAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));

    // Calculate score points (1,000 base + speed bonus up to 500)
    if (optionIndex === currentQuestion.correctIndex) {
      const speedBonus = secondsRemaining * 16;
      setStudentScore((prev) => prev + 1000 + speedBonus);
      setStreakCount((prev) => prev + 1);
    } else {
      setStreakCount(0);
    }

    // Report student vote to callback
    onStudentVote?.(currentQuestion.id, optionIndex);
  };

  // Teacher controls
  const handleTeacherReveal = () => {
    const nextState = !isRevealed;
    setLocalRevealed((prev) => ({
      ...prev,
      [currentQuestion.id]: nextState,
    }));
    setTimerActive(false);

    onBroadcastState?.({
      activeKahootQuestionId: currentQuestion.id,
      isKahootRevealed: nextState,
    });
  };

  const handleTeacherChangeQuestion = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < kahootQuestions.length) {
      setInternalQuestionIndex(newIndex);
      setSecondsRemaining(30);
      setTimerActive(true);

      const targetQ = kahootQuestions[newIndex];
      onBroadcastState?.({
        activeKahootQuestionId: targetQ.id,
        isKahootRevealed: false,
      });
    }
  };

  const handleResetTimer = () => {
    setSecondsRemaining(30);
    setTimerActive(true);
  };

  // Total tally calculation
  const totalVotes = liveTally.reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Top Banner: Arena Header & Stats */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-500/20 text-rose-400 border border-rose-500/30">
                <Sparkles size={14} /> Kahoot Battle Arena
              </span>
              <span className="text-xs font-bold text-zinc-400 px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700">
                {currentQuestion.topic}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Question {currentQuestionIndex + 1} of {kahootQuestions.length}
            </h2>
          </div>

          {/* Gamified HUD: Timer, Score, Streak */}
          <div className="flex items-center flex-wrap gap-3">
            {/* Countdown Badge */}
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl border font-mono font-black text-lg transition-all ${
                secondsRemaining <= 5 && !isRevealed
                  ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse'
                  : secondsRemaining <= 15
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-zinc-800/80 border-zinc-700 text-emerald-400'
              }`}
            >
              <Clock size={20} />
              <span>{secondsRemaining}s</span>
            </div>

            {/* Student Score / Streak HUD */}
            {userRole === 'student' && (
              <div className="flex items-center gap-3 bg-zinc-950 px-4 py-2 rounded-2xl border border-zinc-800">
                {patronNumber && (
                  <span className="text-[11px] font-mono text-zinc-400 border-r border-zinc-800 pr-2">
                    {patronNumber}
                  </span>
                )}
                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-sm">
                  <Award size={18} />
                  <span>{studentScore.toLocaleString()} pts</span>
                </div>
                {streakCount > 1 && (
                  <div className="flex items-center gap-1 text-orange-400 font-black text-xs px-2 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/40">
                    <Flame size={14} />
                    <span>{streakCount} STREAK!</span>
                  </div>
                )}
              </div>
            )}

            {/* Teacher Controls Toolbar */}
            {userRole === 'teacher' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetTimer}
                  className="px-3 py-2 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors flex items-center gap-1.5"
                  title="Reset 30-second timer"
                >
                  <RefreshCw size={14} />
                  <span>Reset 30s</span>
                </button>
                <button
                  onClick={handleTeacherReveal}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-md ${
                    isRevealed
                      ? 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                      : 'bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black ring-2 ring-amber-400/50'
                  }`}
                >
                  {isRevealed ? <EyeOff size={16} /> : <Eye size={16} />}
                  <span>{isRevealed ? 'Hide Answer' : 'Reveal Answer to Class'}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 30-Second Linear Progress Bar */}
        <div className="w-full bg-zinc-800 h-2.5 rounded-full mt-5 overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ease-linear rounded-full ${
              secondsRemaining <= 5
                ? 'bg-rose-500'
                : secondsRemaining <= 15
                ? 'bg-amber-400'
                : 'bg-emerald-500'
            }`}
            style={{ width: `${(secondsRemaining / 30) * 100}%` }}
          />
        </div>
      </section>

      {/* Main Question Display Card */}
      <section className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border-2 border-zinc-700/60 rounded-3xl p-6 sm:p-10 shadow-2xl text-center relative overflow-hidden">
        <span className="text-zinc-400 uppercase tracking-widest text-xs font-black">
          Challenge Question {currentQuestion.id}
        </span>
        <h3 className="text-2xl sm:text-4xl font-black text-white mt-3 leading-snug max-w-4xl mx-auto">
          {currentQuestion.question}
        </h3>

        {/* Answer Locked Notification for Students */}
        {userRole === 'student' && isAnswered && !isRevealed && (
          <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-sm animate-bounce">
            <Lock size={16} />
            <span>Answer locked in! Waiting for instructor reveal...</span>
          </div>
        )}
      </section>

      {/* 4 Iconic Kahoot Shape Buttons Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {currentQuestion.options.map((optionText, optIdx) => {
          const cfg = SHAPE_CONFIGS[optIdx];
          const isSelected = selectedOptionIndex === optIdx;
          const isOptionCorrect = currentQuestion.correctIndex === optIdx;

          // Compute vote tally percentage
          const optionVotes = liveTally[optIdx] || 0;
          const votePercentage = totalVotes > 0 ? Math.round((optionVotes / totalVotes) * 100) : 0;

          // Determine button visual state
          let containerStyles = `${cfg.bgClass} ${cfg.hoverClass} text-white shadow-xl transform active:scale-95 transition-all`;
          let opacityStyle = '';

          if (isRevealed) {
            if (isOptionCorrect) {
              containerStyles = `${cfg.bgClass} ring-4 ring-white shadow-2xl scale-[1.02]`;
            } else {
              opacityStyle = 'opacity-40 grayscale-[40%]';
            }
          } else if (isAnswered) {
            if (isSelected) {
              containerStyles = `${cfg.bgClass} ${cfg.activeRing} ring-offset-4 ring-offset-zinc-950 scale-[1.02]`;
            } else {
              opacityStyle = 'opacity-60';
            }
          }

          return (
            <button
              key={cfg.shape}
              type="button"
              disabled={isAnswered || isRevealed}
              onClick={() => handleSelectShape(optIdx)}
              className={`min-h-[120px] sm:min-h-[140px] p-5 sm:p-6 rounded-3xl flex flex-col justify-between text-left relative overflow-hidden group cursor-pointer disabled:cursor-default ${containerStyles} ${opacityStyle}`}
            >
              {/* Top row: Shape Icon & Option Letter */}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="p-1 rounded-xl bg-black/20 backdrop-blur-sm">
                    {cfg.svgIcon}
                  </div>
                  <span className="text-xl sm:text-2xl font-black tracking-wider text-white drop-shadow">
                    {cfg.label}
                  </span>
                </div>

                {/* Status Badges */}
                <div className="flex items-center gap-2">
                  {isSelected && (
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-white text-zinc-950 flex items-center gap-1 shadow-md">
                      <CheckCircle size={14} /> Selected
                    </span>
                  )}
                  {isRevealed && isOptionCorrect && (
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-white text-emerald-700 flex items-center gap-1 shadow-lg animate-pulse">
                      <CheckCircle size={14} /> Correct Answer!
                    </span>
                  )}
                </div>
              </div>

              {/* Option Text */}
              <p className="text-lg sm:text-2xl font-black mt-4 leading-tight text-white drop-shadow-sm">
                {optionText}
              </p>

              {/* Teacher Mode: Live Vote Tally Bar */}
              {userRole === 'teacher' && totalVotes > 0 && (
                <div className="w-full mt-4 pt-3 border-t border-white/20">
                  <div className="flex justify-between items-center text-xs font-black text-white/90 mb-1">
                    <span>{optionVotes} votes</span>
                    <span>{votePercentage}%</span>
                  </div>
                  <div className="w-full bg-black/30 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-white h-full rounded-full transition-all duration-500"
                      style={{ width: `${votePercentage}%` }}
                    />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </section>

      {/* Answer Reveal State: Explanation & Points */}
      {isRevealed && (
        <section className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl animate-fadeIn space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <CheckCircle size={24} />
              </span>
              <div>
                <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">
                  Classroom Reveal
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-white">
                  Correct Answer:{' '}
                  <span className="text-emerald-400">
                    Option {SHAPE_CONFIGS[currentQuestion.correctIndex].label} (
                    {SHAPE_CONFIGS[currentQuestion.correctIndex].name})
                  </span>
                </h4>
              </div>
            </div>

            {userRole === 'student' && isAnswered && (
              <div
                className={`px-4 py-2 rounded-2xl font-black text-sm flex items-center gap-2 ${
                  isCorrect
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}
              >
                {isCorrect ? '🎉 Great Job! +1,000 Points!' : '💡 Good Try! Keep Learning!'}
              </div>
            )}
          </div>

          <div className="bg-zinc-950/80 p-5 rounded-2xl border border-zinc-800 text-zinc-300 text-base sm:text-lg leading-relaxed">
            <strong className="text-white">Explanation: </strong>
            {currentQuestion.explanation}
          </div>

          {/* Teacher Navigation to Next Question */}
          {userRole === 'teacher' && (
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => handleTeacherChangeQuestion(currentQuestionIndex - 1)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
              >
                <ChevronLeft size={16} /> Previous
              </button>
              <button
                disabled={currentQuestionIndex === kahootQuestions.length - 1}
                onClick={() => handleTeacherChangeQuestion(currentQuestionIndex + 1)}
                className="px-5 py-2.5 rounded-xl text-sm font-black bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition-all flex items-center gap-1.5 shadow-lg disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>Next Question</span>
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </section>
      )}

      {/* Question Selector Dots for Quick Jumps */}
      <section className="flex items-center justify-center flex-wrap gap-2 pt-2">
        {kahootQuestions.map((q, idx) => {
          const isCurrent = idx === currentQuestionIndex;
          const answered = studentAnswers[q.id] !== undefined;
          return (
            <button
              key={q.id}
              onClick={() => {
                if (userRole === 'teacher') {
                  handleTeacherChangeQuestion(idx);
                } else {
                  setInternalQuestionIndex(idx);
                }
              }}
              className={`w-9 h-9 rounded-xl font-mono text-xs font-black transition-all flex items-center justify-center cursor-pointer ${
                isCurrent
                  ? 'bg-emerald-500 text-zinc-950 ring-2 ring-emerald-400 scale-110 shadow-lg'
                  : answered
                  ? 'bg-zinc-800 text-emerald-400 border border-emerald-500/40'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800'
              }`}
              title={`Question ${idx + 1}: ${q.topic}`}
            >
              {idx + 1}
            </button>
          );
        })}
      </section>
    </div>
  );
}