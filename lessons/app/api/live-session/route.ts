import { NextResponse } from 'next/server';
import {
  LiveSessionState,
  LiveConnectedLaptop,
  ClassroomAttentionAlert,
  LiveQuizState,
} from '../../../types/platform';

const initialQuizState: LiveQuizState = {
  quizActive: false,
  quizTitle: 'Everyday Computer Literacy Arena',
  scope: 'neutral',
  activeQuestionIndex: 0,
  activeQuestion: null,
  isRevealed: false,
  questionStartTime: Date.now(),
  timeLimitSeconds: 30,
  isTimerRunning: false,
  timerPausedAt: null,
  timeRemainingSeconds: 30,
  autoRevealOnTimeout: true,
  showLeaderboard: false,
  participants: {},
  tally: [0, 0, 0, 0],
};

// In-memory live session state for classroom mirroring
const liveSession: LiveSessionState = {
  activeModuleId: 'module-1',
  activeLessonIndex: 0,
  activeStageIndex: 0,
  syncMode: 'follow-teacher',
  activeKahootQuestionId: null,
  isKahootRevealed: false,
  kahootVotes: {},
  kahootTally: [0, 0, 0, 0],
  quizState: initialQuizState,
  activeStudents: {},
  activeLaptops: {},
  updatedAt: Date.now(),
};

// Compute vote tally across the 4 Kahoot shapes
function computeTally(): [number, number, number, number] {
  const tally: [number, number, number, number] = [0, 0, 0, 0];
  if (liveSession.kahootVotes) {
    for (const optIdx of Object.values(liveSession.kahootVotes)) {
      if (optIdx >= 0 && optIdx <= 3) {
        tally[optIdx]++;
      }
    }
  }
  return tally;
}

// Compute participant ranks dynamically based on score, accuracy, and speed
function computeRanks() {
  if (!liveSession.quizState || !liveSession.quizState.participants) return;
  const list = Object.values(liveSession.quizState.participants);
  list.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.accuracyRate !== a.accuracyRate) return b.accuracyRate - a.accuracyRate;
    return (a.responseTimeMs || 0) - (b.responseTimeMs || 0);
  });
  list.forEach((p, idx) => {
    p.rank = idx + 1;
  });
}

// Compute live seconds remaining on the active question
function computeRemainingSeconds(quizState: LiveQuizState): number {
  if (!quizState.quizActive || !quizState.activeQuestion) {
    return quizState.timeLimitSeconds || 30;
  }
  if (quizState.isRevealed) {
    return 0;
  }
  const limit = quizState.timeLimitSeconds || quizState.activeQuestion.timeLimitSeconds || 30;
  if (!quizState.isTimerRunning) {
    if (quizState.timerPausedAt && quizState.questionStartTime) {
      const elapsedBeforePause = Math.max(
        0,
        Math.floor((quizState.timerPausedAt - quizState.questionStartTime) / 1000)
      );
      return Math.max(0, limit - elapsedBeforePause);
    }
    return limit;
  }
  const now = Date.now();
  const elapsed = Math.max(0, Math.floor((now - quizState.questionStartTime) / 1000));
  return Math.max(0, limit - elapsed);
}

// Clean up students and laptops who have been inactive for more than 45 seconds
function pruneInactiveSessions() {
  const now = Date.now();
  const threshold = 45 * 1000;

  for (const [patron, record] of Object.entries(liveSession.activeStudents)) {
    if (now - record.lastSeen > threshold) {
      delete liveSession.activeStudents[patron];
    }
  }

  if (liveSession.activeLaptops) {
    for (const [laptopId, laptop] of Object.entries(liveSession.activeLaptops)) {
      if (now - laptop.lastSeen > threshold) {
        delete liveSession.activeLaptops[laptopId];
      }
    }
  }
}

// Calculate total active students across all laptops
function countActiveStudents(): { studentCount: number; laptopCount: number } {
  if (!liveSession.activeLaptops) {
    const studentCount = Object.keys(liveSession.activeStudents).length;
    return { studentCount, laptopCount: studentCount };
  }

  let totalStudents = 0;
  const laptops = Object.values(liveSession.activeLaptops);
  for (const laptop of laptops) {
    if (laptop.mode === 'partner' && laptop.partnerB) {
      totalStudents += 2;
    } else {
      totalStudents += 1;
    }
  }

  return {
    studentCount: Math.max(totalStudents, Object.keys(liveSession.activeStudents).length),
    laptopCount: laptops.length,
  };
}

export async function GET(request: Request) {
  pruneInactiveSessions();

  // Check if student / laptop heartbeat is attached in query params
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('mode') || 'solo';
  const patron = searchParams.get('patron');
  const studentName = searchParams.get('name');
  const patronA = searchParams.get('patronA');
  const nameA = searchParams.get('nameA');
  const patronB = searchParams.get('patronB');
  const nameB = searchParams.get('nameB');

  // Attention tracking query parameters
  const isFocusedParam = searchParams.get('isFocused');
  const isFocused = isFocusedParam !== 'false';
  const leftScreenAtParam = searchParams.get('leftScreenAt');
  const rawLeftScreenAt = leftScreenAtParam ? Number(leftScreenAtParam) : null;

  const now = Date.now();
  const leftScreenAt = !isFocused ? rawLeftScreenAt || now : null;
  const awayDurationSeconds =
    !isFocused && leftScreenAt ? Math.max(0, Math.round((now - leftScreenAt) / 1000)) : 0;

  if (mode === 'partner' && patronA && patronB) {
    const laptopId = `${patronA}_${patronB}`;
    if (!liveSession.activeLaptops) {
      liveSession.activeLaptops = {};
    }
    const laptop: LiveConnectedLaptop = {
      laptopId,
      mode: 'partner',
      partnerA: { patronNumber: patronA, studentName: nameA || 'Partner A' },
      partnerB: { patronNumber: patronB, studentName: nameB || 'Partner B' },
      lastSeen: now,
      isFocused,
      leftScreenAt,
      awayDurationSeconds,
    };
    liveSession.activeLaptops[laptopId] = laptop;

    liveSession.activeStudents[patronA] = {
      studentName: `${nameA || 'Student A'} & ${nameB || 'Student B'} (Lab Partners)`,
      lastSeen: now,
      mode: 'partner',
      partnerB: { patronNumber: patronB, studentName: nameB || 'Partner B' },
      isFocused,
      leftScreenAt,
      awayDurationSeconds,
    };
  } else if (patron) {
    const laptopId = patron;
    if (!liveSession.activeLaptops) {
      liveSession.activeLaptops = {};
    }
    const laptop: LiveConnectedLaptop = {
      laptopId,
      mode: 'solo',
      partnerA: { patronNumber: patron, studentName: studentName || 'Student' },
      lastSeen: now,
      isFocused,
      leftScreenAt,
      awayDurationSeconds,
    };
    liveSession.activeLaptops[laptopId] = laptop;

    liveSession.activeStudents[patron] = {
      studentName: studentName || 'Student',
      lastSeen: now,
      mode: 'solo',
      isFocused,
      leftScreenAt,
      awayDurationSeconds,
    };
  }

  // Aggregate current attention alerts for the instructor
  const attentionAlerts: ClassroomAttentionAlert[] = [];
  if (liveSession.activeLaptops) {
    for (const [lapId, lap] of Object.entries(liveSession.activeLaptops)) {
      if (lap.isFocused === false && lap.leftScreenAt) {
        const studentDisplayName =
          lap.mode === 'partner' && lap.partnerB
            ? `${lap.partnerA.studentName} & ${lap.partnerB.studentName} (Shared Laptop)`
            : lap.partnerA.studentName;
        attentionAlerts.push({
          laptopId: lapId,
          studentName: studentDisplayName,
          leftScreenAt: lap.leftScreenAt,
          awayDurationSeconds: Math.max(0, Math.round((now - lap.leftScreenAt) / 1000)),
        });
      }
    }
  }

  const currentTally = computeTally();
  liveSession.kahootTally = currentTally;
  if (liveSession.quizState) {
    liveSession.quizState.tally = currentTally;
    computeRanks();

    // Check timer countdown and auto-reveal on timeout
    if (
      liveSession.quizState.quizActive &&
      liveSession.quizState.isTimerRunning &&
      !liveSession.quizState.isRevealed
    ) {
      const remaining = computeRemainingSeconds(liveSession.quizState);
      liveSession.quizState.timeRemainingSeconds = remaining;

      if (remaining === 0 && (liveSession.quizState.autoRevealOnTimeout ?? true)) {
        liveSession.quizState.isRevealed = true;
        liveSession.quizState.isTimerRunning = false;
        liveSession.isKahootRevealed = true;
      }
    } else if (liveSession.quizState.quizActive) {
      liveSession.quizState.timeRemainingSeconds = computeRemainingSeconds(liveSession.quizState);
    }
  }

  const counts = countActiveStudents();

  return NextResponse.json({
    ...liveSession,
    kahootTally: currentTally,
    connectedCount: counts.studentCount,
    connectedLaptops: counts.laptopCount,
    activeLaptops: liveSession.activeLaptops,
    attentionAlerts,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.activeModuleId !== undefined) {
      liveSession.activeModuleId = String(body.activeModuleId);
    }
    if (body.activeLessonIndex !== undefined) {
      liveSession.activeLessonIndex = Number(body.activeLessonIndex);
    }
    if (body.activeStageIndex !== undefined) {
      liveSession.activeStageIndex = Number(body.activeStageIndex);
    }
    if (body.syncMode === 'follow-teacher' || body.syncMode === 'self-paced') {
      liveSession.syncMode = body.syncMode;
    }

    if (body.action === 'switch_module') {
      if (body.moduleId) liveSession.activeModuleId = String(body.moduleId);
      if (body.stageIndex !== undefined) liveSession.activeStageIndex = Number(body.stageIndex);
    }

    if (body.action === 'update_slide') {
      if (body.stageIndex !== undefined) liveSession.activeStageIndex = Number(body.stageIndex);
      if (body.moduleId) liveSession.activeModuleId = String(body.moduleId);
    }

    // -------------------------------------------------------------
    // Quiz Host Management Actions
    // -------------------------------------------------------------
    if (body.action === 'start-quiz') {
      if (!liveSession.quizState) {
        liveSession.quizState = { ...initialQuizState };
      }
      const timeLimit = Number(
        body.timeLimitSeconds || body.activeQuestion?.timeLimitSeconds || 30
      );
      liveSession.quizState.quizActive = true;
      liveSession.quizState.scope = body.scope || 'neutral';
      liveSession.quizState.quizTitle = body.quizTitle || 'Classroom Quiz Arena';
      liveSession.quizState.activeQuestionIndex = Number(body.activeQuestionIndex ?? 0);
      liveSession.quizState.activeQuestion = body.activeQuestion || null;
      liveSession.quizState.timeLimitSeconds = timeLimit;
      liveSession.quizState.timeRemainingSeconds = timeLimit;
      liveSession.quizState.isTimerRunning = true;
      liveSession.quizState.timerPausedAt = null;
      liveSession.quizState.isRevealed = false;
      liveSession.quizState.showLeaderboard = false;
      liveSession.quizState.questionStartTime = Date.now();
      liveSession.kahootVotes = {};
      liveSession.quizState.tally = [0, 0, 0, 0];
      for (const p of Object.values(liveSession.quizState.participants)) {
        p.lastOptionIndex = undefined;
        p.lastIsCorrect = undefined;
      }
      if (body.activeQuestion?.id) {
        liveSession.activeKahootQuestionId = body.activeQuestion.id;
        liveSession.isKahootRevealed = false;
      }
    } else if (body.action === 'change-question') {
      if (!liveSession.quizState) {
        liveSession.quizState = { ...initialQuizState };
      }
      const timeLimit = Number(
        body.timeLimitSeconds ||
          body.activeQuestion?.timeLimitSeconds ||
          liveSession.quizState.timeLimitSeconds ||
          30
      );
      liveSession.quizState.quizActive = true;
      liveSession.quizState.activeQuestionIndex = Number(body.activeQuestionIndex ?? 0);
      liveSession.quizState.activeQuestion = body.activeQuestion || null;
      liveSession.quizState.timeLimitSeconds = timeLimit;
      liveSession.quizState.timeRemainingSeconds = timeLimit;
      liveSession.quizState.isTimerRunning = true;
      liveSession.quizState.timerPausedAt = null;
      liveSession.quizState.isRevealed = false;
      liveSession.quizState.showLeaderboard = false;
      liveSession.quizState.questionStartTime = Date.now();
      liveSession.kahootVotes = {};
      liveSession.quizState.tally = [0, 0, 0, 0];
      for (const p of Object.values(liveSession.quizState.participants)) {
        p.lastOptionIndex = undefined;
        p.lastIsCorrect = undefined;
      }
      if (body.activeQuestion?.id) {
        liveSession.activeKahootQuestionId = body.activeQuestion.id;
        liveSession.isKahootRevealed = false;
      }
    } else if (body.action === 'pause-timer') {
      if (liveSession.quizState && liveSession.quizState.isTimerRunning) {
        liveSession.quizState.isTimerRunning = false;
        liveSession.quizState.timerPausedAt = Date.now();
        liveSession.quizState.timeRemainingSeconds = computeRemainingSeconds(liveSession.quizState);
      }
    } else if (body.action === 'resume-timer') {
      if (
        liveSession.quizState &&
        !liveSession.quizState.isTimerRunning &&
        !liveSession.quizState.isRevealed
      ) {
        if (liveSession.quizState.timerPausedAt && liveSession.quizState.questionStartTime) {
          const pausedDuration = Date.now() - liveSession.quizState.timerPausedAt;
          liveSession.quizState.questionStartTime += pausedDuration;
        }
        liveSession.quizState.timerPausedAt = null;
        liveSession.quizState.isTimerRunning = true;
        liveSession.quizState.timeRemainingSeconds = computeRemainingSeconds(liveSession.quizState);
      }
    } else if (body.action === 'extend-time') {
      if (liveSession.quizState) {
        const extraSeconds = Number(body.seconds || 10);
        liveSession.quizState.timeLimitSeconds =
          (liveSession.quizState.timeLimitSeconds || 30) + extraSeconds;
        if (liveSession.quizState.isRevealed) {
          liveSession.quizState.isRevealed = false;
          liveSession.quizState.isTimerRunning = true;
          liveSession.isKahootRevealed = false;
        }
        liveSession.quizState.timeRemainingSeconds = computeRemainingSeconds(liveSession.quizState);
      }
    } else if (body.action === 'set-time-limit') {
      if (liveSession.quizState) {
        const newLimit = Number(body.timeLimitSeconds || 30);
        liveSession.quizState.timeLimitSeconds = newLimit;
        if (liveSession.quizState.isTimerRunning) {
          liveSession.quizState.questionStartTime = Date.now();
        }
        liveSession.quizState.timeRemainingSeconds = newLimit;
      }
    } else if (body.action === 'toggle-leaderboard') {
      if (liveSession.quizState) {
        liveSession.quizState.showLeaderboard =
          body.showLeaderboard !== undefined
            ? Boolean(body.showLeaderboard)
            : !liveSession.quizState.showLeaderboard;
      }
    } else if (body.action === 'pause-quiz') {
      if (liveSession.quizState) {
        liveSession.quizState.quizActive = false;
        liveSession.quizState.activeQuestion = null;
        liveSession.quizState.isRevealed = false;
        liveSession.quizState.isTimerRunning = false;
        liveSession.quizState.showLeaderboard = false;
      }
      liveSession.kahootVotes = {};
      liveSession.activeKahootQuestionId = null;
      liveSession.isKahootRevealed = false;
    } else if (body.action === 'reveal-quiz-answer') {
      if (liveSession.quizState) {
        liveSession.quizState.isRevealed = true;
        liveSession.quizState.isTimerRunning = false;
        liveSession.quizState.timeRemainingSeconds = 0;
      }
      liveSession.isKahootRevealed = true;
    } else if (body.action === 'reset-quiz-scores') {
      if (liveSession.quizState) {
        liveSession.quizState.participants = {};
        liveSession.quizState.tally = [0, 0, 0, 0];
        liveSession.quizState.activeQuestionIndex = 0;
        liveSession.quizState.isRevealed = false;
        liveSession.quizState.quizActive = false;
        liveSession.quizState.isTimerRunning = false;
        liveSession.quizState.showLeaderboard = false;
      }
      liveSession.kahootVotes = {};
      liveSession.activeKahootQuestionId = null;
      liveSession.isKahootRevealed = false;
    }

    // Legacy compatibility for direct question broadcasts
    if (body.activeKahootQuestionId !== undefined) {
      if (liveSession.activeKahootQuestionId !== body.activeKahootQuestionId) {
        liveSession.activeKahootQuestionId = body.activeKahootQuestionId;
        liveSession.kahootVotes = {}; // Reset votes for new question
        liveSession.isKahootRevealed = false;
        if (liveSession.quizState) {
          liveSession.quizState.isRevealed = false;
          liveSession.quizState.questionStartTime = Date.now();
          liveSession.quizState.isTimerRunning = true;
          liveSession.quizState.tally = [0, 0, 0, 0];
          for (const p of Object.values(liveSession.quizState.participants)) {
            p.lastOptionIndex = undefined;
            p.lastIsCorrect = undefined;
          }
        }
      }
    }
    if (body.isKahootRevealed !== undefined) {
      liveSession.isKahootRevealed = Boolean(body.isKahootRevealed);
      if (liveSession.quizState) {
        liveSession.quizState.isRevealed = Boolean(body.isKahootRevealed);
        if (liveSession.quizState.isRevealed) {
          liveSession.quizState.isTimerRunning = false;
          liveSession.quizState.timeRemainingSeconds = 0;
        }
      }
    }

    // -------------------------------------------------------------
    // Student Live Quiz Vote Submission
    // -------------------------------------------------------------
    const isStudentVote =
      body.action === 'submit-quiz-vote' ||
      (body.patronNumber &&
        (typeof body.quizOptionIndex === 'number' || typeof body.kahootOptionIndex === 'number'));

    if (isStudentVote && body.patronNumber) {
      const patron = String(body.patronNumber);
      const optIdx = Number(
        body.quizOptionIndex !== undefined ? body.quizOptionIndex : body.kahootOptionIndex
      );

      if (optIdx >= 0 && optIdx <= 3) {
        if (!liveSession.quizState) {
          liveSession.quizState = { ...initialQuizState };
        }

        const remaining = computeRemainingSeconds(liveSession.quizState);

        // Reject vote if answers are already revealed or if time has expired
        if (
          liveSession.quizState.isRevealed ||
          (remaining <= 0 && !liveSession.quizState.isTimerRunning)
        ) {
          return NextResponse.json({
            success: false,
            error: "Time's up! Answers are locked for this question.",
            timeout: true,
          });
        }

        if (!liveSession.kahootVotes) {
          liveSession.kahootVotes = {};
        }
        liveSession.kahootVotes[patron] = optIdx;

        const now = Date.now();
        const activeQ = body.question || liveSession.quizState.activeQuestion;
        const timeLimitMs =
          (liveSession.quizState.timeLimitSeconds || activeQ?.timeLimitSeconds || 30) * 1000;
        const startTime = liveSession.quizState.questionStartTime || now;
        const elapsedMs = Math.max(0, now - startTime);
        const remainingRatio = Math.max(0, Math.min(1, (timeLimitMs - elapsedMs) / timeLimitMs));
        const speedBonus = Math.round(500 * remainingRatio);
        const basePoints = 500;

        const isCorrect = activeQ ? optIdx === activeQ.correctIndex : true;
        const pointsAwarded = isCorrect ? basePoints + speedBonus : 0;

        const studentName =
          body.studentName || liveSession.activeStudents[patron]?.studentName || patron;
        const mode = body.mode || 'solo';
        const partnerB = body.partnerB || liveSession.activeStudents[patron]?.partnerB;

        // Ensure participant record exists
        if (!liveSession.quizState.participants[patron]) {
          liveSession.quizState.participants[patron] = {
            patronNumber: patron,
            studentName,
            mode,
            partnerB,
            score: 0,
            correctCount: 0,
            totalAnswered: 0,
            accuracyRate: 0,
            currentStreak: 0,
          };
        }

        const participant = liveSession.quizState.participants[patron];

        // Only score once per question
        if (participant.lastOptionIndex === undefined) {
          participant.studentName = studentName;
          participant.mode = mode;
          if (partnerB) participant.partnerB = partnerB;
          participant.score += pointsAwarded;
          participant.totalAnswered += 1;
          if (isCorrect) {
            participant.correctCount += 1;
            participant.currentStreak += 1;
          } else {
            participant.currentStreak = 0;
          }
          participant.accuracyRate = Math.round(
            (participant.correctCount / participant.totalAnswered) * 100
          );
          participant.lastOptionIndex = optIdx;
          participant.lastIsCorrect = isCorrect;
          participant.responseTimeMs = elapsedMs;
        }

        computeRanks();

        // Check if all active connected students have answered
        const counts = countActiveStudents();
        const votesSubmitted = Object.keys(liveSession.kahootVotes).length;
        if (
          counts.studentCount > 0 &&
          votesSubmitted >= counts.studentCount &&
          !liveSession.quizState.isRevealed
        ) {
          liveSession.quizState.isRevealed = true;
          liveSession.quizState.isTimerRunning = false;
          liveSession.quizState.timeRemainingSeconds = 0;
          liveSession.isKahootRevealed = true;
        }
      }
    }

    liveSession.updatedAt = Date.now();
    pruneInactiveSessions();

    const currentTally = computeTally();
    liveSession.kahootTally = currentTally;
    if (liveSession.quizState) {
      liveSession.quizState.tally = currentTally;
    }
    const counts = countActiveStudents();

    return NextResponse.json({
      success: true,
      session: {
        ...liveSession,
        kahootTally: currentTally,
        connectedCount: counts.studentCount,
        connectedLaptops: counts.laptopCount,
        activeLaptops: liveSession.activeLaptops,
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}
