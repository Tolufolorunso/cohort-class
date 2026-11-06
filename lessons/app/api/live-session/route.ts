import { NextResponse } from 'next/server';
import { LiveSessionState, LiveConnectedLaptop, ClassroomAttentionAlert } from '../../../types/platform';

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
  const leftScreenAt = !isFocused ? (rawLeftScreenAt || now) : null;
  const awayDurationSeconds = !isFocused && leftScreenAt ? Math.max(0, Math.round((now - leftScreenAt) / 1000)) : 0;

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
        const studentDisplayName = lap.mode === 'partner' && lap.partnerB
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
    if (body.activeKahootQuestionId !== undefined) {
      if (liveSession.activeKahootQuestionId !== body.activeKahootQuestionId) {
        liveSession.activeKahootQuestionId = body.activeKahootQuestionId;
        liveSession.kahootVotes = {}; // Reset votes for new question
        liveSession.isKahootRevealed = false;
      }
    }
    if (body.isKahootRevealed !== undefined) {
      liveSession.isKahootRevealed = Boolean(body.isKahootRevealed);
    }

    // Handle student live vote submission
    if (body.patronNumber && typeof body.kahootOptionIndex === 'number') {
      if (!liveSession.kahootVotes) {
        liveSession.kahootVotes = {};
      }
      liveSession.kahootVotes[body.patronNumber] = Number(body.kahootOptionIndex);
    }

    liveSession.updatedAt = Date.now();
    pruneInactiveSessions();

    const currentTally = computeTally();
    liveSession.kahootTally = currentTally;
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
    return NextResponse.json(
      { success: false, error: 'Invalid payload' },
      { status: 400 }
    );
  }
}
