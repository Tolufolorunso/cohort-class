import { StudentSession } from '../types/platform';

export const AUTHORIZED_PATRONS: string[] = ["20230165", "20250523", "20250464", "20250509", "20250571", "20250520", "20250562", "20250527", "20250643", "20250409", "20230338", "20250461", "20230204", "20230374", "20250609", "20230169", "20250652", "20250650", "20250549", "20230187", "20250545", "20230344", "20250647", "20230063", "20230122", "20230330", "20230313", "20230272", "20230123"];

export const SESSION_DURATION_MS = 60 * 60 * 1000; // 1 hour (3,600,000 ms)

const STUDENT_SESSION_KEY = 'dzuels_student_session';

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function isPatronWhitelisted(patronNumber: string): boolean {
  const normalized = patronNumber.trim().toUpperCase();
  return AUTHORIZED_PATRONS.includes(normalized);
}

export function validateStudentLogin(
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
  const session: StudentSession = {
    patronNumber: trimmedPatron,
    studentName: trimmedName,
    loggedInAt: now,
    expiresAt: now + SESSION_DURATION_MS,
  };

  return { success: true, session };
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

