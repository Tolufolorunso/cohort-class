import { NextResponse } from 'next/server';
import { LiveSessionState } from '../../../types/platform';

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

// Clean up students who have been inactive for more than 45 seconds
function pruneInactiveStudents() {
  const now = Date.now();
  const threshold = 45 * 1000;
  for (const [patron, record] of Object.entries(liveSession.activeStudents)) {
    if (now - record.lastSeen > threshold) {
      delete liveSession.activeStudents[patron];
    }
  }
}

export async function GET(request: Request) {
  pruneInactiveStudents();

  // Check if student heartbeat is attached in query params
  const { searchParams } = new URL(request.url);
  const patron = searchParams.get('patron');
  const studentName = searchParams.get('name');

  if (patron) {
    liveSession.activeStudents[patron] = {
      studentName: studentName || 'Student',
      lastSeen: Date.now(),
    };
  }

  const currentTally = computeTally();
  liveSession.kahootTally = currentTally;

  return NextResponse.json({
    ...liveSession,
    kahootTally: currentTally,
    connectedCount: Object.keys(liveSession.activeStudents).length,
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
    pruneInactiveStudents();

    const currentTally = computeTally();
    liveSession.kahootTally = currentTally;

    return NextResponse.json({
      success: true,
      session: {
        ...liveSession,
        kahootTally: currentTally,
        connectedCount: Object.keys(liveSession.activeStudents).length,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid payload' },
      { status: 400 }
    );
  }
}

