import { TeacherRole, TeacherSession } from '../types/platform';

const TEACHER_SESSION_KEY = 'dzuels_teacher_session';

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

interface TeacherCredential {
  role: TeacherRole;
  displayName: string;
  isSuperAdmin: boolean;
}

const TEACHER_CREDENTIALS: Record<string, TeacherCredential> = {
  adminTolu: {
    role: 'adminTolu',
    displayName: 'Instructor Tolu (Super Admin)',
    isSuperAdmin: true,
  },
  adminIsaac: {
    role: 'adminIsaac',
    displayName: 'Instructor Isaac (Classroom Instructor)',
    isSuperAdmin: false,
  },
};

export function validateTeacherPin(
  pin: string
): { success: boolean; session?: TeacherSession; error?: string } {
  const trimmed = pin.trim();

  if (!trimmed) {
    return { success: false, error: 'Please enter the Instructor PIN.' };
  }

  const credential = TEACHER_CREDENTIALS[trimmed];
  if (!credential) {
    return {
      success: false,
      error: 'Invalid Instructor PIN. Only authorized credentials (adminTolu / adminIsaac) are permitted.',
    };
  }

  const session: TeacherSession = {
    role: credential.role,
    displayName: credential.displayName,
    authenticatedAt: Date.now(),
  };

  return { success: true, session };
}

export function saveTeacherSession(session: TeacherSession): void {
  if (!isBrowser()) return;
  localStorage.setItem(TEACHER_SESSION_KEY, JSON.stringify(session));
}

export function getTeacherSession(): TeacherSession | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(TEACHER_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    clearTeacherSession();
    return null;
  }
}

export function clearTeacherSession(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(TEACHER_SESSION_KEY);
}

export function isSuperAdmin(role: TeacherRole): boolean {
  return role === 'adminTolu';
}

