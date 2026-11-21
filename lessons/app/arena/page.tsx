'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Link from 'next/link';
import { Header } from '../../components/navigation/Header';
import { StudentLogin } from '../../components/auth/StudentLogin';
import { useClassroomAttention } from '../../hooks/useClassroomAttention';
import { getStudentSession, clearStudentSession, saveStudentSession } from '../../lib/roster';
import {
  getTeacherSession,
  validateTeacherPin,
  saveTeacherSession,
  clearTeacherSession,
} from '../../lib/auth';
import { getZoomLevel, setZoomLevel, getUnlockedModules } from '../../lib/platformStorage';
import {
  StudentSession,
  TeacherSession,
  ZoomLevel,
  LiveQuizState,
  QuizParticipantScore,
} from '../../types/platform';
import { KahootQuestion, KahootShape } from '../../types/curriculum';
import { Sparkles, Award, CheckCircle, Clock, Flame, Shield } from '../../components/icons/Icons';
import { HostQuizDesk } from '../../components/arena/HostQuizDesk';
import {
  playUrgentTick,
  playCorrectSound,
  playIncorrectSound,
  playTimesUpSound,
  isQuizAudioMuted,
  toggleQuizAudio,
} from '../../lib/quizAudio';

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
  const [teacherSession, setTeacherSession] = useState<TeacherSession | null>(null);
  const [isHostMode, setIsHostMode] = useState<boolean>(false);
  const [hasCheckedSession, setHasCheckedSession] = useState<boolean>(false);
  const [zoomLevel, setZoomState] = useState<ZoomLevel>('normal');
  const [unlockedModuleIds, setUnlockedModuleIds] = useState<string[]>(['module-1']);

  // Audio FX toggle
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);

  // Teacher PIN gate on /arena
  const [showTeacherPinModal, setShowTeacherPinModal] = useState<boolean>(false);
  const [teacherPinInput, setTeacherPinInput] = useState<string>('');
  const [teacherPinError, setTeacherPinError] = useState<string>('');

  // Live session state polled from server
  const [quizState, setQuizState] = useState<LiveQuizState | null>(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(30);

  // Classroom attention tracking
  const attentionState = useClassroomAttention();
  const attentionRef = useRef(attentionState);
  useEffect(() => {
    attentionRef.current = attentionState;
  }, [attentionState]);

  // Stable refs for tracking question transitions without triggering pollSession recreation
  const answeredQuestionIdRef = useRef<number | null>(null);
  const lastQuestionStartTimeRef = useRef<number>(0);
  const hasPlayedRevealSoundRef = useRef<boolean>(false);
  const lastTickSecondRef = useRef<number>(-1);

  // Load sessions on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const sSession = getStudentSession();
      const tSession = getTeacherSession();
      setStudentSession(sSession);
      setTeacherSession(tSession);
      if (tSession && !sSession) {
        setIsHostMode(true);
      }
      setZoomState(getZoomLevel());
      setUnlockedModuleIds(getUnlockedModules());
      setIsAudioMuted(isQuizAudioMuted());
      setHasCheckedSession(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleZoomChange = (level: ZoomLevel) => {
    setZoomState(level);
    setZoomLevel(level);
  };

  const handleToggleAudio = () => {
    const next = toggleQuizAudio();
    setIsAudioMuted(next);
  };

  const handleLogout = () => {
    clearStudentSession();
    setStudentSession(null);
  };

  const handleTeacherLogout = () => {
    clearTeacherSession();
    setTeacherSession(null);
    setIsHostMode(false);
  };

  // Poll live session state (stable dependency - never recreated by attention changes)
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

      const currentAttention = attentionRef.current;
      params.set('isFocused', String(currentAttention.isFocused));
      if (currentAttention.leftScreenAt) {
        params.set('leftScreenAt', String(currentAttention.leftScreenAt));
      }

      const res = await fetch(`/api/live-session?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.quizState) {
          // Compare before updating state to avoid infinite render storms
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

          // Reset local answered option if active question has changed or timer restarted
          const newQ = data.quizState.activeQuestion;
          const newStartTime = data.quizState.questionStartTime;
          if (
            newQ &&
            (newQ.id !== answeredQuestionIdRef.current ||
              newStartTime !== lastQuestionStartTimeRef.current)
          ) {
            answeredQuestionIdRef.current = newQ.id;
            lastQuestionStartTimeRef.current = newStartTime;

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
  }, [studentSession]);

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
  const isTimerRunning = Boolean(quizState?.isTimerRunning);
  const activeQuestionId = activeQuestion?.id;
  const questionStartTime = quizState?.questionStartTime;
  const timeLimit = quizState?.timeLimitSeconds || activeQuestion?.timeLimitSeconds || 30;

  // Synchronize countdown timer strictly
  useEffect(() => {
    if (!quizActive || !activeQuestionId || isRevealed || !questionStartTime) {
      return;
    }

    const updateTimer = () => {
      const now = Date.now();
      let remaining = 0;
      if (isTimerRunning) {
        const elapsed = Math.max(0, Math.floor((now - questionStartTime) / 1000));
        remaining = Math.max(0, timeLimit - elapsed);
      } else if (quizState?.timeRemainingSeconds !== undefined) {
        remaining = quizState.timeRemainingSeconds;
      } else {
        remaining = timeLimit;
      }
      setSecondsRemaining(remaining);

      // Audio tick during final 5 seconds
      if (isTimerRunning && remaining <= 5 && remaining > 0 && lastTickSecondRef.current !== remaining) {
        lastTickSecondRef.current = remaining;
        playUrgentTick();
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 500);
    return () => clearInterval(timer);
  }, [
    quizActive,
    activeQuestionId,
    questionStartTime,
    isRevealed,
    timeLimit,
    isTimerRunning,
    quizState?.timeRemainingSeconds,
  ]);

  // Audio trigger on Reveal
  useEffect(() => {
    if (!isRevealed) {
      hasPlayedRevealSoundRef.current = false;
    } else if (!hasPlayedRevealSoundRef.current && activeQuestion) {
      hasPlayedRevealSoundRef.current = true;
      if (selectedOptionIndex !== null) {
        if (selectedOptionIndex === activeQuestion.correctIndex) {
          playCorrectSound();
        } else {
          playIncorrectSound();
        }
      } else {
        playTimesUpSound();
      }
    }
  }, [isRevealed, activeQuestion, selectedOptionIndex]);

  // Current participant stats (personal only, privacy protected)
  const myParticipant: QuizParticipantScore | null = useMemo(() => {
    if (!quizState?.participants || !studentSession) return null;
    return quizState.participants[studentSession.patronNumber] || null;
  }, [quizState, studentSession]);

  // Handle student voting
  const handleVote = useCallback(
    async (optionIndex: number) => {
      if (
        !studentSession ||
        !activeQuestion ||
        selectedOptionIndex !== null ||
        isRevealed ||
        secondsRemaining <= 0
      ) {
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
    [studentSession, activeQuestion, selectedOptionIndex, isRevealed, secondsRemaining, pollSession]
  );

  // Keyboard shortcut listener (1-4 or A-D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedOptionIndex !== null || isRevealed || !activeQuestion || secondsRemaining <= 0) {
        return;
      }
      if (['1', 'a', 'A'].includes(e.key)) handleVote(0);
      else if (['2', 'b', 'B'].includes(e.key)) handleVote(1);
      else if (['3', 'c', 'C'].includes(e.key)) handleVote(2);
      else if (['4', 'd', 'D'].includes(e.key)) handleVote(3);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOptionIndex, isRevealed, activeQuestion, secondsRemaining, handleVote]);

  // Handle Instructor PIN Submit on /arena
  const handleTeacherPinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTeacherPinError('');
    const res = validateTeacherPin(teacherPinInput);
    if (!res.success || !res.session) {
      setTeacherPinError(res.error || 'Invalid PIN');
      return;
    }
    saveTeacherSession(res.session);
    setTeacherSession(res.session);
    setIsHostMode(true);
    setShowTeacherPinModal(false);
    setTeacherPinInput('');
  };

  if (!hasCheckedSession) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-400">
        <div className="animate-spin text-2xl">⏳</div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Instructor / Projector Host Mode View on /arena
  // -------------------------------------------------------------
  if (isHostMode && teacherSession) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col font-sans select-none">
        {/* Projector Header Bar */}
        <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-md px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black text-xl">
              🎮
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-base sm:text-lg text-white">
                  Dzuels Quiz Arena • Projector Host Desk
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Projector Screen
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Logged in as <strong>{teacherSession.displayName}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleToggleAudio}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                isAudioMuted
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-500'
                  : 'bg-amber-500/10 border-amber-500/40 text-amber-300'
              }`}
              title="Toggle Game Sound FX"
            >
              <span>{isAudioMuted ? '🔇' : '🔊'}</span>
              <span>{isAudioMuted ? 'Sound Muted' : 'Sound ON'}</span>
            </button>

            {studentSession && (
              <button
                onClick={() => setIsHostMode(false)}
                className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold border border-zinc-700 transition-all"
              >
                📱 Switch to Student Controller
              </button>
            )}
            <Link
              href="/instructor"
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-black transition-all shadow-md"
            >
              Control Room (/instructor) →
            </Link>
            <button
              onClick={handleTeacherLogout}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-rose-400 text-xs font-bold transition-colors"
            >
              Exit Host
            </button>
          </div>
        </header>

        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
          <HostQuizDesk />
        </main>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Student Login / Unauthenticated Gate
  // -------------------------------------------------------------
  if (!studentSession) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-4 relative">
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

          {/* Quick Switch to Instructor Projector Mode */}
          <div className="mt-6 text-center border-t border-zinc-800/80 pt-4">
            <button
              onClick={() => setShowTeacherPinModal(true)}
              className="text-xs text-zinc-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1.5 font-bold"
            >
              <Shield size={14} className="text-amber-400" />
              <span>Projector Host Mode (Instructor PIN)</span>
            </button>
          </div>
        </div>

        {/* Instructor PIN Modal */}
        {showTeacherPinModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">👨‍🏫</span>
                  <h3 className="text-base font-bold text-white">Instructor Host Access</h3>
                </div>
                <button
                  onClick={() => setShowTeacherPinModal(false)}
                  className="text-zinc-500 hover:text-white text-sm"
                >
                  ✕
                </button>
              </div>
              <p className="text-xs text-zinc-400">
                Enter your instructor PIN to launch and control the Quiz Arena on the classroom projector screen.
              </p>

              <form onSubmit={handleTeacherPinSubmit} className="space-y-3">
                <input
                  type="password"
                  required
                  autoFocus
                  value={teacherPinInput}
                  onChange={(e) => {
                    setTeacherPinInput(e.target.value);
                    setTeacherPinError('');
                  }}
                  placeholder="Enter PIN"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white font-mono text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                {teacherPinError && (
                  <p className="text-xs text-rose-400 font-medium">⚠️ {teacherPinError}</p>
                )}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowTeacherPinModal(false)}
                    className="flex-1 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-black"
                  >
                    Unlock Host
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // Student Player Game Screen
  // -------------------------------------------------------------
  const effectiveSecondsRemaining = isRevealed ? 0 : secondsRemaining;

  const isAnswerCorrect =
    selectedOptionIndex !== null &&
    activeQuestion !== null &&
    selectedOptionIndex === activeQuestion.correctIndex;

  // Compute countdown percentage
  const timePercent = Math.max(
    0,
    Math.min(100, Math.round((effectiveSecondsRemaining / timeLimit) * 100))
  );
  const timerBarColor =
    effectiveSecondsRemaining <= 5
      ? 'bg-rose-500'
      : effectiveSecondsRemaining <= 10
      ? 'bg-amber-500'
      : 'bg-emerald-500';

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

      <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-6 flex flex-col justify-between">
        {/* Top Personal Performance Bar (Student Privacy Standard) */}
        <section className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-3 sm:p-4 mb-3 shadow-xl flex flex-wrap items-center justify-between gap-3">
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
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Audio Toggle */}
            <button
              onClick={handleToggleAudio}
              className={`p-2 rounded-xl border text-xs font-bold transition-colors ${
                isAudioMuted
                  ? 'bg-zinc-800 border-zinc-700 text-zinc-500'
                  : 'bg-amber-500/10 border-amber-500/40 text-amber-300'
              }`}
              title="Toggle sound"
            >
              {isAudioMuted ? '🔇' : '🔊'}
            </button>

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

            {/* Personal Rank */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-inner">
              <Award className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="text-[10px] uppercase font-bold text-emerald-400/80 leading-none">
                  Rank
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
                  !isTimerRunning && !isRevealed
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                    : effectiveSecondsRemaining <= 5 && !isRevealed
                    ? 'bg-red-500/20 border-red-500 text-red-300 animate-pulse'
                    : 'bg-zinc-800/80 border-zinc-700 text-zinc-200'
                }`}
              >
                <Clock className="w-4 h-4 text-zinc-400" />
                <span>
                  {!isTimerRunning && !isRevealed
                    ? '⏸️ Paused'
                    : isRevealed
                    ? 'Revealed'
                    : `${effectiveSecondsRemaining}s`}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Dynamic Countdown Progress Bar */}
        {quizActive && activeQuestion && !isRevealed && (
          <div className="w-full bg-zinc-900 border border-zinc-800 rounded-full h-3 overflow-hidden shadow-inner mb-4">
            <div
              className={`h-full transition-all duration-300 ease-linear rounded-full ${timerBarColor}`}
              style={{ width: `${timePercent}%` }}
            />
          </div>
        )}

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
            <div className="bg-zinc-900/95 border border-zinc-800 rounded-3xl p-5 sm:p-7 text-center shadow-2xl relative overflow-hidden">
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
                      : quizState.scope === 'module-3'
                      ? 'Module 3 Pack'
                      : 'Custom Question'}
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug max-w-3xl mx-auto">
                {activeQuestion.question}
              </h2>

              {/* Status Indicator Banner */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs font-bold">
                {selectedOptionIndex === null && !isRevealed && effectiveSecondsRemaining > 0 && (
                  <span className="text-amber-400 flex items-center gap-1.5 animate-pulse">
                    <span>⚡</span> Tap your answer shape quickly for maximum speed bonus!
                  </span>
                )}
                {selectedOptionIndex === null && !isRevealed && effectiveSecondsRemaining <= 0 && (
                  <span className="text-rose-400 flex items-center gap-1.5">
                    <span>⏱️</span> Time is up! Waiting for the instructor to reveal results...
                  </span>
                )}
                {selectedOptionIndex !== null && !isRevealed && (
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" /> Answer locked in! Waiting for the countdown to complete...
                  </span>
                )}
                {isRevealed && (
                  <span className="text-zinc-300 font-semibold">
                    Round completed! Review explanation and score below.
                  </span>
                )}
              </div>
            </div>

            {/* Answer Locked-In Confirmation Card (Tactile Feedback) */}
            {selectedOptionIndex !== null && !isRevealed && (
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-700 shadow-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0 ${SHAPE_BUTTONS[selectedOptionIndex]?.bgClass}`}
                  >
                    {SHAPE_BUTTONS[selectedOptionIndex]?.label}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                      Your Selected Answer:
                    </div>
                    <div className="text-sm sm:text-base font-extrabold text-white">
                      {activeQuestion.options[selectedOptionIndex]}
                    </div>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Locked In 🔒</span>
                </div>
              </div>
            )}

            {/* Answer Explanation on Reveal */}
            {isRevealed && (
              <div
                className={`p-4 sm:p-6 rounded-2xl border text-left shadow-xl transition-all ${
                  isAnswerCorrect
                    ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-100'
                    : selectedOptionIndex === null
                    ? 'bg-amber-950/30 border-amber-600/40 text-amber-100'
                    : 'bg-zinc-900/90 border-zinc-700 text-zinc-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                      isAnswerCorrect
                        ? 'bg-emerald-500 text-zinc-950'
                        : selectedOptionIndex === null
                        ? 'bg-amber-500 text-zinc-950'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {isAnswerCorrect ? '🎉' : selectedOptionIndex === null ? '⏱️' : '💡'}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-black text-white">
                      {isAnswerCorrect
                        ? 'Spot On! Excellent Speed Bonus Awarded!'
                        : selectedOptionIndex === null
                        ? `Time's Up! The Correct Answer was Option ${String.fromCharCode(
                            65 + activeQuestion.correctIndex
                          )} (${SHAPE_BUTTONS[activeQuestion.correctIndex]?.name})`
                        : `Nice Effort! The Correct Answer was Option ${String.fromCharCode(
                            65 + activeQuestion.correctIndex
                          )} (${SHAPE_BUTTONS[activeQuestion.correctIndex]?.name})`}
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
                const isInteractionDisabled =
                  selectedOptionIndex !== null || isRevealed || effectiveSecondsRemaining <= 0;

                return (
                  <button
                    key={s.label}
                    onClick={() => handleVote(idx)}
                    disabled={isInteractionDisabled}
                    className={`relative p-4 sm:p-5 rounded-2xl sm:rounded-3xl flex items-center gap-4 text-left transition-all duration-150 shadow-xl ${
                      s.bgClass
                    } ${s.hoverClass} ${
                      isSelected ? `${s.activeRing} scale-[1.02] shadow-2xl` : ''
                    } ${
                      selectedOptionIndex !== null && !isSelected && !isRevealed
                        ? 'opacity-40 grayscale-[20%] cursor-not-allowed'
                        : ''
                    } ${
                      effectiveSecondsRemaining <= 0 && selectedOptionIndex === null && !isRevealed
                        ? 'opacity-50 cursor-not-allowed'
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
