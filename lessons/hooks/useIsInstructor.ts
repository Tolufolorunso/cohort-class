'use client';

import { useSyncExternalStore } from 'react';
import { getTeacherSession } from '../lib/auth';

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('dzuels:teacher-auth', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('dzuels:teacher-auth', callback);
  };
}

function getSnapshot(): boolean {
  return Boolean(getTeacherSession());
}

function getServerSnapshot(): boolean {
  return false;
}

export function useIsInstructor(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
