import { StudentSession } from '../types/platform';

export const AUTHORIZED_PATRONS: string[] = [
  '20230194',
  '20250535',
  '20230270',
  '20230067',
  '20230207',
  '20230125',
  '20230279',
  '20230166',
  '20250504',
  '20230300',
  '20230137',
  '20250670',
  '20230335',
  '20230371',
  '20230189',
  '20230126',
  '20230370',
  '20230201',
  '20230361',
  '20250487',
  '20230056',
  '20250429',
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

