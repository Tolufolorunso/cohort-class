import { StudentSession, StudentPartner } from '../types/platform';

export const AUTHORIZED_PATRONS: string[] = [
  "20230165", "20250523", "20250464", "20250509", "20250571",
  "20250520", "20250562", "20250527", "20250643", "20250409",
  "20230338", "20250461", "20230204", "20230374", "20250609",
  "20230169", "20250652", "20250650", "20250549", "20230187",
  "20250545", "20230344", "20250647", "20230063", "20230122",
  "20230330", "20230313", "20230272", "20230123"
];

export const SESSION_DURATION_MS = 60 * 60 * 1000; // 1 hour (3,600,000 ms)

const STUDENT_SESSION_KEY = 'dzuels_student_session';

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function isPatronWhitelisted(patronNumber: string): boolean {
  const normalized = patronNumber.trim().toUpperCase();
  return AUTHORIZED_PATRONS.includes(normalized);
}

/**
 * Validate a solo student login (1 student on laptop)
 */
export function validateSoloLogin(
  patronNumber: string,
  studentName: string
): { success: boolean; session?: StudentSession; error?: string } {
  const trimmedPatron = patronNumber.trim().toUpperCase();
  const trimmedName = studentName.trim();

  if (!trimmedPatron) {
    return { success: false, error: 'Please enter your assigned Patron Number.' };
  }

  if (!isPatronWhitelisted(trimmedPatron)) {
    return {
      success: false,
      error: `Patron Number "${trimmedPatron}" is not registered in this computer class. Please verify with Instructor Tolu or Isaac.`,
    };
  }

  if (!trimmedName || trimmedName.length < 2) {
    return {
      success: false,
      error: 'Please enter your Full Name (at least 2 letters).',
    };
  }

  const now = Date.now();
  const partnerA: StudentPartner = {
    patronNumber: trimmedPatron,
    studentName: trimmedName,
  };

  const session: StudentSession = {
    mode: 'solo',
    partnerA,
    patronNumber: trimmedPatron,
    studentName: trimmedName,
    loggedInAt: now,
    expiresAt: now + SESSION_DURATION_MS,
  };

  return { success: true, session };
}

/**
 * Validate paired equal lab partners login (2 students sharing 1 laptop)
 * Neither student is "primary" - both are equal co-learners
 */
export function validatePartnerLogin(
  patronA: string,
  nameA: string,
  patronB: string,
  nameB: string
): { success: boolean; session?: StudentSession; error?: string } {
  const trimmedPatronA = patronA.trim().toUpperCase();
  const trimmedNameA = nameA.trim();
  const trimmedPatronB = patronB.trim().toUpperCase();
  const trimmedNameB = nameB.trim();

  // Partner A validation
  if (!trimmedPatronA) {
    return { success: false, error: 'Please enter Patron Number for Partner A.' };
  }
  if (!isPatronWhitelisted(trimmedPatronA)) {
    return {
      success: false,
      error: `Partner A's Patron Number "${trimmedPatronA}" is not registered. Please verify with your instructor.`,
    };
  }
  if (!trimmedNameA || trimmedNameA.length < 2) {
    return { success: false, error: 'Please enter Full Name for Partner A.' };
  }

  // Partner B validation
  if (!trimmedPatronB) {
    return { success: false, error: 'Please enter Patron Number for Partner B.' };
  }
  if (!isPatronWhitelisted(trimmedPatronB)) {
    return {
      success: false,
      error: `Partner B's Patron Number "${trimmedPatronB}" is not registered. Please verify with your instructor.`,
    };
  }
  if (!trimmedNameB || trimmedNameB.length < 2) {
    return { success: false, error: 'Please enter Full Name for Partner B.' };
  }

  // Strict check: Partner A and Partner B cannot be the same student
  if (trimmedPatronA === trimmedPatronB) {
    return {
      success: false,
      error: 'Partner A and Partner B cannot use the same Patron Number. Each student must enter their own registered number.',
    };
  }

  const now = Date.now();
  const partnerA: StudentPartner = {
    patronNumber: trimmedPatronA,
    studentName: trimmedNameA,
  };
  const partnerB: StudentPartner = {
    patronNumber: trimmedPatronB,
    studentName: trimmedNameB,
  };

  const session: StudentSession = {
    mode: 'partner',
    partnerA,
    partnerB,
    patronNumber: trimmedPatronA,
    studentName: `${trimmedNameA} & ${trimmedNameB} (Lab Partners)`,
    loggedInAt: now,
    expiresAt: now + SESSION_DURATION_MS,
  };

  return { success: true, session };
}

/**
 * Backward compatibility alias for single student validation
 */
export function validateStudentLogin(
  patronNumber: string,
  studentName: string
): { success: boolean; session?: StudentSession; error?: string } {
  return validateSoloLogin(patronNumber, studentName);
}

export function saveStudentSession(session: StudentSession): void {
  if (!isBrowser()) return;
  localStorage.setItem(STUDENT_SESSION_KEY, JSON.stringify(session));
}

export function getStudentSession(): StudentSession | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(STUDENT_SESSION_KEY);
    if (!raw) return null;
    const session: StudentSession = JSON.parse(raw);

    // Validate 1-hour session expiry
    if (!session.expiresAt || Date.now() >= session.expiresAt) {
      clearStudentSession();
      return null;
    }

    // Ensure partnerA exists for older session objects
    if (!session.partnerA && session.patronNumber && session.studentName) {
      session.mode = 'solo';
      session.partnerA = {
        patronNumber: session.patronNumber,
        studentName: session.studentName,
      };
    }

    return session;
  } catch {
    clearStudentSession();
    return null;
  }
}

export function clearStudentSession(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(STUDENT_SESSION_KEY);
}

export function getRemainingSessionMinutes(session: StudentSession): number {
  const diffMs = session.expiresAt - Date.now();
  if (diffMs <= 0) return 0;
  return Math.max(1, Math.ceil(diffMs / (60 * 1000)));
}

export function getAllAuthorizedPatrons(): string[] {
  return [...AUTHORIZED_PATRONS];
}
