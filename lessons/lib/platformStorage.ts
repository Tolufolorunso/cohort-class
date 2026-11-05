import {
  UserRole,
  ZoomLevel,
  StudentSubmission,
  ModuleLockState,
} from '../types/platform';

const STORAGE_KEYS = {
  USER_ROLE: 'dzuels_user_role',
  ZOOM_LEVEL: 'dzuels_zoom_level',
  UNLOCKED_MODULES: 'dzuels_unlocked_modules',
  SUBMISSIONS: 'dzuels_student_submissions',
  TEACHER_PIN: 'dzuels_teacher_pin',
};

const DEFAULT_UNLOCKED = ['module-1'];
const DEFAULT_TEACHER_PIN = '1234';

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function getUserRole(): UserRole {
  if (!isBrowser()) return 'teacher';
  const saved = localStorage.getItem(STORAGE_KEYS.USER_ROLE);
  return saved === 'student' ? 'student' : 'teacher';
}

export function setUserRole(role: UserRole): void {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
}

export function getZoomLevel(): ZoomLevel {
  if (!isBrowser()) return 'normal';
  const saved = localStorage.getItem(STORAGE_KEYS.ZOOM_LEVEL);
  if (saved === 'large' || saved === 'xlarge') return saved;
  return 'normal';
}

export function setZoomLevel(level: ZoomLevel): void {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEYS.ZOOM_LEVEL, level);
}

export const saveZoomLevel = setZoomLevel;

export function getUnlockedModules(): string[] {
  if (!isBrowser()) return DEFAULT_UNLOCKED;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.UNLOCKED_MODULES);
    if (!raw) return DEFAULT_UNLOCKED;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_UNLOCKED;
  } catch {
    return DEFAULT_UNLOCKED;
  }
}

export function getModuleLockState(): ModuleLockState {
  return { unlockedModuleIds: getUnlockedModules() };
}

export function setUnlockedModules(moduleIds: string[]): void {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEYS.UNLOCKED_MODULES, JSON.stringify(moduleIds));
}

export function saveModuleLockState(state: ModuleLockState): ModuleLockState {
  setUnlockedModules(state.unlockedModuleIds);
  return state;
}

export function isModuleUnlocked(moduleId: string): boolean {
  const unlocked = getUnlockedModules();
  return unlocked.includes(moduleId);
}

export function toggleModuleLock(moduleId: string): boolean {
  const unlocked = getUnlockedModules();
  let updated: string[];
  let isNowUnlocked = false;

  if (unlocked.includes(moduleId)) {
    // Don't allow locking module-1 (first module must always remain accessible)
    if (moduleId === 'module-1') return true;
    updated = unlocked.filter((id) => id !== moduleId);
    isNowUnlocked = false;
  } else {
    updated = [...unlocked, moduleId];
    isNowUnlocked = true;
  }

  setUnlockedModules(updated);
  return isNowUnlocked;
}

export function verifyTeacherPin(enteredPin: string): boolean {
  if (!isBrowser()) return enteredPin === DEFAULT_TEACHER_PIN;
  const savedPin = localStorage.getItem(STORAGE_KEYS.TEACHER_PIN) || DEFAULT_TEACHER_PIN;
  return enteredPin === savedPin;
}

export function setTeacherPin(newPin: string): void {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEYS.TEACHER_PIN, newPin);
}

export function getSubmissions(): StudentSubmission[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveSubmission(
  sub: Omit<StudentSubmission, 'id' | 'submittedAt' | 'status'>
): StudentSubmission {
  const current = getSubmissions();
  const newSubmission: StudentSubmission = {
    ...sub,
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    submittedAt: new Date().toISOString(),
    status: 'submitted',
  };

  const updated = [newSubmission, ...current];
  if (isBrowser()) {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(updated));
  }
  return newSubmission;
}

export function clearAllSubmissions(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(STORAGE_KEYS.SUBMISSIONS);
}
