'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from '../../components/navigation/Header';
import { StudentLogin } from '../../components/auth/StudentLogin';
import { useClassroomAttention } from '../../hooks/useClassroomAttention';
import { getStudentSession, clearStudentSession, saveStudentSession } from '../../lib/roster';
import { getZoomLevel, setZoomLevel, getUnlockedModules } from '../../lib/platformStorage';
import {
  StudentSession,
  ZoomLevel,
  LiveQuizState,
  QuizParticipantScore,
} from '../../types/platform';
import { KahootQuestion, KahootShape } from '../../types/curriculum';
import { Sparkles, Award, CheckCircle, Clock, Flame } from '../../components/icons/Icons';

const SHAPE_BUTTONS: {
  shape: KahootShape;
  label: string;
  name: string;
  bgClass: string;
  hoverClass: string;
  activeRing: string;
  svgIcon: React.ReactNode;
}[] = [
  {
    shape: 'triangle',
    label: 'A',
    name: 'Red Triangle',
    bgClass: 'bg-[#E21B3C]',
    hoverClass: 'hover:bg-[#C21532]',
    activeRing: 'ring-4 ring-red-400',
    svgIcon: (
      <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-12 sm:h-12 fill-white drop-shadow-md">
        <polygon points="50,15 90,85 10,85" />
      </svg>
    ),
  },
  {
    shape: 'diamond',
    label: 'B',
    name: 'Blue Diamond',
    bgClass: 'bg-[#1368CE]',
    hoverClass: 'hover:bg-[#0E54A8]',
    activeRing: 'ring-4 ring-blue-400',
    svgIcon: (
      <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-12 sm:h-12 fill-white drop-shadow-md">
        <polygon points="50,10 90,50 50,90 10,50" />
      </svg>
    ),
  },
  {
    shape: 'circle',
    label: 'C',
    name: 'Yellow Circle',
    bgClass: 'bg-[#D89E00]',
    hoverClass: 'hover:bg-[#B38300]',
    activeRing: 'ring-4 ring-amber-300',
    svgIcon: (
      <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-12 sm:h-12 fill-white drop-shadow-md">
        <circle cx="50" cy="50" r="38" />
      </svg>
    ),
  },
  {
    shape: 'square',
    label: 'D',
    name: 'Green Square',
    bgClass: 'bg-[#26890C]',
    hoverClass: 'hover:bg-[#1F6E0A]',
    activeRing: 'ring-4 ring-emerald-400',
    svgIcon: (
      <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-12 sm:h-12 fill-white drop-shadow-md">
        <rect x="18" y="18" width="64" height="64" rx="8" />
      </svg>
    ),
  },
];

export default function StudentArenaPage() {
  const [studentSession, setStudentSession] = useState<StudentSession | null>(null);
  const [hasCheckedSession, setHasCheckedSession] = useState(false);
  const [zoomLevel, setZoomState] = useState<ZoomLevel>('normal');
  const [unlockedModuleIds, setUnlockedModuleIds] = useState<string[]>(['module-1']);

  // Live session state polled from server
  const [quizState, setQuizState] = useState<LiveQuizState | null>(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [answeredQuestionId, setAnsweredQuestionId] = useState<number | null>(null);
  const [lastQuestionStartTime, setLastQuestionStartTime] = useState<number>(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(30);

  // Classroom attention tracking
  const attentionState = useClassroomAttention();

  // Load student session
  useEffect(() => {
    const timer = setTimeout(() => {
      const session = getStudentSession();
      setStudentSession(session);
      setZoomState(getZoomLevel());
      setUnlockedModuleIds(getUnlockedModules());
      setHasCheckedSession(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleZoomChange = (level: ZoomLevel) => {
    setZoomState(level);
    setZoomLevel(level);
  };

  const handleLogout = () => {
    clearStudentSession();
    setStudentSession(null);
  };

  // Poll live session state
  const pollSession = useCallback(async () => {
    if (!studentSession) return;
    try {
      const params = new URLSearchParams();
      params.set('mode', studentSession.mode);
      if (studentSession.mode === 'partner' && studentSession.partnerB) {
        params.set('patronA', studentSession.partnerA.patronNumber);
        params.set('nameA', studentSession.partnerA.studentName);
        params.set('patronB', studentSession.partnerB.patronNumber);
        params.set('nameB', studentSession.partnerB.studentName);
      } else {
        params.set('patron', studentSession.patronNumber);
        params.set('name', studentSession.studentName);
      }

      params.set('isFocused', String(attentionState.isFocused));
      if (attentionState.leftScreenAt) {
        params.set('leftScreenAt', String(attentionState.leftScreenAt));
      }

      const res = await fetch(`/api/live-session?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.quizState) {
          setQuizState(data.quizState);

          // Reset local answered option if active question has changed or timer restarted
          if (
            data.quizState.activeQuestion &&
            (data.quizState.activeQuestion.id !== answeredQuestionId ||
              data.quizState.questionStartTime !== lastQuestionStartTime)
          ) {
            setAnsweredQuestionId(data.quizState.activeQuestion.id);
            setLastQuestionStartTime(data.quizState.questionStartTime);
            // Check if server already has our answer recorded
            const myScore = data.quizState.participants?.[studentSession.patronNumber];
            if (myScore?.lastOptionIndex !== undefined) {
              setSelectedOptionIndex(myScore.lastOptionIndex);
            } else {
              setSelectedOptionIndex(null);
            }
          }
        }
      }
    } catch {
      // Quiet fail on network jitter
    }
  }, [studentSession, attentionState, answeredQuestionId, lastQuestionStartTime]);

  useEffect(() => {
    if (!studentSession) return;
    const timer = setTimeout(() => {
      pollSession();
    }, 0);
    const interval = setInterval(pollSession, 1500);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [studentSession, pollSession]);

  // Active question derived from server state
  const activeQuestion: KahootQuestion | null = quizState?.activeQuestion || null;
  const isRevealed = Boolean(quizState?.isRevealed);
  const quizActive = Boolean(quizState?.quizActive);

  // Synchronize countdown timer based on questionStartTime
  useEffect(() => {
    if (!quizState || !activeQuestion || isRevealed) return;
    const timeLimit = activeQuestion.timeLimitSeconds || 30;

    const updateTimer = () => {
      const now = Date.now();
      const elapsed = Math.max(0, Math.floor((now - quizState.questionStartTime) / 1000));
      const remaining = Math.max(0, timeLimit - elapsed);
      setSecondsRemaining(remaining);
    };

    updateTimer();
    const timer = setInterval(updateTimer, 500);
    return () => clearInterval(timer);
  }, [quizState, activeQuestion, isRevealed]);

  // Current participant stats (personal only, privacy protected)
  const myParticipant: QuizParticipantScore | null = useMemo(() => {
    if (!quizState?.participants || !studentSession) return null;
    return quizState.participants[studentSession.patronNumber] || null;
  }, [quizState, studentSession]);

  // Handle student voting
  const handleVote = useCallback(
    async (optionIndex: number) => {
      if (!studentSession || !activeQuestion || selectedOptionIndex !== null || isRevealed) {
        return;
      }

      setSelectedOptionIndex(optionIndex);

      try {
        await fetch('/api/live-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'submit-quiz-vote',
            patronNumber: studentSession.patronNumber,
            studentName: studentSession.studentName,
            mode: studentSession.mode,
            partnerB: studentSession.partnerB,
            quizOptionIndex: optionIndex,
            question: activeQuestion,
          }),
        });
        pollSession();
      } catch {
        // Offline fallback: selection persists locally
      }
    },
    [studentSession, activeQuestion, selectedOptionIndex, isRevealed, pollSession]
  );

  // Keyboard shortcut listener (1-4 or A-D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedOptionIndex !== null || isRevealed || !activeQuestion) return;
      if (['1', 'a', 'A'].includes(e.key)) handleVote(0);
      else if (['2', 'b', 'B'].includes(e.key)) handleVote(1);
      else if (['3', 'c', 'C'].includes(e.key)) handleVote(2);
      else if (['4', 'd', 'D'].includes(e.key)) handleVote(3);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOptionIndex, isRevealed, activeQuestion, handleVote]);

  if (!hasCheckedSession) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-400">
        <div className="animate-spin text-2xl">⏳</div>
      </div>
    );
  }

  if (!studentSession) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <span className="text-4xl">🎮</span>
            <h1 className="text-2xl font-black text-amber-400 mt-2">Dzuels Quiz Arena</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Enter your Patron ID or Pair Up with a Lab Partner to join the live classroom quiz battle!
            </p>
          </div>
          <StudentLogin
            onLoginSuccess={(session) => {
              saveStudentSession(session);
              setStudentSession(session);
            }}
          />
        </div>
      </div>
    );
  }

  const isAnswerCorrect =
    selectedOptionIndex !== null &&
    activeQuestion !== null &&
    selectedOptionIndex === activeQuestion.correctIndex;

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col font-sans select-none">
      <Header
        currentModuleId="module-1"
        onSelectModule={() => {}}
        activeView="arena"
        zoomLevel={zoomLevel}
        onChangeZoom={handleZoomChange}
        unlockedModuleIds={unlockedModuleIds}
        session={studentSession}
        onLogout={handleLogout}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto p-3 sm:p-6 flex flex-col justify-between">
        {/* Top Personal Performance Bar (Student Privacy Standard) */}
        <section className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-3 sm:p-4 mb-4 shadow-xl flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black text-lg">
              🎮
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base text-zinc-100">
                  {studentSession.studentName}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700 font-mono">
                  {studentSession.patronNumber}
                </span>
              </div>
              <p className="text-xs text-zinc-400 flex items-center gap-2 mt-0.5">
                <span>{quizState?.quizTitle || 'Live Computer Quiz Arena'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </p>
            </div>
          </div>

          {/* Student Score, Streak & Private Rank Badges */}
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            {/* Score Badge */}
            <div className="bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-inner">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-[10px] uppercase font-bold text-amber-400/80 leading-none">
                  Points
                </div>
                <div className="text-base sm:text-lg font-black text-amber-300">
                  {myParticipant?.score?.toLocaleString() || 0}
                </div>
              </div>
            </div>

            {/* Streak Badge */}
            <div className="bg-orange-500/10 border border-orange-500/30 px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-inner">
              <Flame className="w-4 h-4 text-orange-400" />
              <div>
                <div className="text-[10px] uppercase font-bold text-orange-400/80 leading-none">
                  Streak
                </div>
                <div className="text-base sm:text-lg font-black text-orange-300">
                  {myParticipant?.currentStreak ? `🔥 ${myParticipant.currentStreak}` : '0'}
                </div>
              </div>
            </div>

            {/* Personal Rank (Student sees ONLY their own rank, not class list) */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-inner">
              <Award className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="text-[10px] uppercase font-bold text-emerald-400/80 leading-none">
                  Your Rank
                </div>
                <div className="text-base sm:text-lg font-black text-emerald-300">
                  {myParticipant?.rank ? `#${myParticipant.rank}` : 'Ready'}
                </div>
              </div>
            </div>

            {/* Timer countdown pill */}
            {activeQuestion && (
              <div
                className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 font-mono font-black text-base sm:text-lg transition-colors ${
                  secondsRemaining <= 5
                    ? 'bg-red-500/20 border-red-500 text-red-300 animate-pulse'
                    : 'bg-zinc-800/80 border-zinc-700 text-zinc-200'
                }`}
              >
                <Clock className="w-4 h-4 text-zinc-400" />
                <span>{secondsRemaining}s</span>
              </div>
            )}
          </div>
        </section>

        {/* Main Quiz Interactive Area */}
        {!quizActive || !activeQuestion ? (
          /* Waiting / Lobby State */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-zinc-900/40 border border-zinc-800/60 rounded-3xl backdrop-blur-sm">
            <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-4xl mb-4 shadow-lg animate-bounce">
              🎮
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Quiz Arena Waiting Room
            </h2>
            <p className="text-zinc-400 max-w-md mt-2 text-sm sm:text-base">
              The instructor will launch the live battle shortly. Watch the projector screen and get your fingers ready on the shapes!
            </p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg w-full">
              {SHAPE_BUTTONS.map((s) => (
                <div
                  key={s.label}
                  className={`${s.bgClass} text-white p-3 rounded-2xl flex flex-col items-center justify-center shadow-lg opacity-85`}
                >
                  {s.svgIcon}
                  <span className="text-xs font-black mt-1">{s.name}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">💡 Lab Tip:</span>
              <span>You can click shapes or tap keys 1, 2, 3, or 4 for faster answers!</span>
            </div>
          </div>
        ) : (
          /* Active Question & Shape Response Panel */
          <div className="flex-1 flex flex-col justify-between gap-4">
            {/* Active Question Banner */}
            <div className="bg-zinc-900/95 border border-zinc-800 rounded-3xl p-5 sm:p-8 text-center shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {activeQuestion.topic || 'Classroom Question'}
                </span>
                {quizState?.scope && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-zinc-800 text-zinc-400 border border-zinc-700">
                    {quizState.scope === 'neutral'
                      ? 'Everyday Shortcuts'
                      : quizState.scope === 'module-1'
                      ? 'Module 1 Pack'
                      : quizState.scope === 'module-2'
                      ? 'Module 2 Pack'
                      : 'Custom Question'}
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-snug max-w-4xl mx-auto">
                {activeQuestion.question}
              </h2>

              {/* Status Indicator */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs font-bold">
                {selectedOptionIndex === null && !isRevealed && (
                  <span className="text-amber-400 flex items-center gap-1.5 animate-pulse">
                    <span>⚡</span> Tap your answer shape below quickly for max speed bonus!
                  </span>
                )}
                {selectedOptionIndex !== null && !isRevealed && (
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" /> Answer locked in! Waiting for the instructor to reveal...
                  </span>
                )}
                {isRevealed && (
                  <span className="text-zinc-300 font-semibold">
                    Answer revealed by instructor! Review explanation below.
                  </span>
                )}
              </div>
            </div>

            {/* Answer Explanation on Reveal */}
            {isRevealed && (
              <div
                className={`p-4 sm:p-6 rounded-2xl border text-left shadow-xl transition-all ${
                  isAnswerCorrect
                    ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-100'
                    : 'bg-zinc-900/90 border-zinc-700 text-zinc-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                      isAnswerCorrect ? 'bg-emerald-500 text-zinc-950' : 'bg-red-500 text-white'
                    }`}
                  >
                    {isAnswerCorrect ? '🎉' : '💡'}
                  </div>
                  <div>
                    <h4 className="text-base font-black text-white">
                      {isAnswerCorrect
                        ? 'Spot On! Excellent Speed!'
                        : `Correct Answer: Option ${String.fromCharCode(65 + activeQuestion.correctIndex)} (${SHAPE_BUTTONS[activeQuestion.correctIndex]?.name})`}
                    </h4>
                    <p className="text-xs sm:text-sm mt-1 text-zinc-300 leading-relaxed">
                      {activeQuestion.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 4 Large Tactile Shape Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-auto">
              {SHAPE_BUTTONS.map((s, idx) => {
                const isSelected = selectedOptionIndex === idx;
                const isCorrectOption = isRevealed && activeQuestion.correctIndex === idx;
                const isIncorrectOption = isRevealed && isSelected && !isCorrectOption;

                return (
                  <button
                    key={s.label}
                    onClick={() => handleVote(idx)}
                    disabled={selectedOptionIndex !== null || isRevealed}
                    className={`relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex items-center gap-4 text-left transition-all duration-150 shadow-xl ${
                      s.bgClass
                    } ${s.hoverClass} ${
                      isSelected ? `${s.activeRing} scale-[1.02] shadow-2xl` : ''
                    } ${
                      selectedOptionIndex !== null && !isSelected && !isRevealed
                        ? 'opacity-40 grayscale-[20%] cursor-not-allowed'
                        : ''
                    } ${
                      isCorrectOption
                        ? 'ring-4 ring-white animate-pulse'
                        : isIncorrectOption
                        ? 'opacity-60'
                        : ''
                    }`}
                  >
                    {/* Shape Icon */}
                    <div className="shrink-0 p-1 sm:p-2 bg-black/20 rounded-xl sm:rounded-2xl">
                      {s.svgIcon}
                    </div>

                    {/* Option Text & Letter */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-6 h-6 rounded-lg bg-black/30 text-white font-black text-xs sm:text-sm flex items-center justify-center">
                          {s.label}
                        </span>
                        <span className="text-xs uppercase tracking-wider font-extrabold text-white/80">
                          {s.name}
                        </span>
                      </div>
                      <p className="text-sm sm:text-lg md:text-xl font-black text-white leading-tight drop-shadow-sm">
                        {activeQuestion.options[idx]}
                      </p>
                    </div>

                    {/* Lock In Badge */}
                    {isSelected && (
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1 border border-white/30">
                        <span>🔒</span>
                        <span>Your Pick</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
