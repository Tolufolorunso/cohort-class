'use client';

import { useState, useEffect, useRef } from 'react';

export interface ClassroomAttentionState {
  isFocused: boolean;
  leftScreenAt: number | null;
  awayDurationSeconds: number;
}

/**
 * Hook to detect student inattention, tab switching, and window minimization.
 * Listens to document `visibilitychange` and window `blur`/`focus` events.
 */
export function useClassroomAttention(): ClassroomAttentionState {
  const [isFocused, setIsFocused] = useState<boolean>(true);
  const [leftScreenAt, setLeftScreenAt] = useState<number | null>(null);
  const [awayDurationSeconds, setAwayDurationSeconds] = useState<number>(0);
  const leftScreenAtRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const handleInattention = () => {
      const now = Date.now();
      setIsFocused(false);
      if (!leftScreenAtRef.current) {
        leftScreenAtRef.current = now;
        setLeftScreenAt(now);
      }
    };

    const handleAttentionRegained = () => {
      // Regained only if document is visible and window is focused
      if (document.visibilityState === 'visible') {
        setIsFocused(true);
        leftScreenAtRef.current = null;
        setLeftScreenAt(null);
        setAwayDurationSeconds(0);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleInattention();
      } else {
        handleAttentionRegained();
      }
    };

    const handleWindowBlur = () => {
      handleInattention();
    };

    const handleWindowFocus = () => {
      handleAttentionRegained();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    // Initial check
    if (document.visibilityState === 'hidden') {
      handleInattention();
    }

    // Interval to increment away timer when student has switched away
    const interval = setInterval(() => {
      if (leftScreenAtRef.current) {
        const elapsed = Math.max(0, Math.round((Date.now() - leftScreenAtRef.current) / 1000));
        setAwayDurationSeconds(elapsed);
      }
    }, 1000);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      clearInterval(interval);
    };
  }, []);

  return {
    isFocused,
    leftScreenAt,
    awayDurationSeconds,
  };
}

