'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { StudentLogin } from '../auth/StudentLogin';
import { UnifiedSlideDeck } from '../presentation/UnifiedSlideDeck';
import { StudentSession } from '../../types/platform';
import { getStudentSession, saveStudentSession } from '../../lib/roster';
import { useClassroomAttention } from '../../hooks/useClassroomAttention';

interface LearnViewProps {
  moduleId: string;
}

export function LearnView({ moduleId }: LearnViewProps) {
  const [studentSession, setStudentSessionState] = useState<StudentSession | null>(null);
  const [hasCheckedSession, setHasCheckedSession] = useState(false);

  // Track attention if student session is active
  useClassroomAttention();

  useEffect(() => {
    const timer = setTimeout(() => {
      const active = getStudentSession();
      setStudentSessionState(active);
      setHasCheckedSession(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!studentSession) return;
    const interval = setInterval(() => {
      const valid = getStudentSession();
      if (!valid) {
        setStudentSessionState(null);
      }
    }, 30 * 1000);
    return () => clearInterval(interval);
  }, [studentSession]);

  const handleLoginSuccess = useCallback((session: StudentSession) => {
    setStudentSessionState(session);
    saveStudentSession(session);
  }, []);

  if (!hasCheckedSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-emerald-400 font-mono text-sm">
        Loading classroom presentation...
      </div>
    );
  }

  if (!studentSession) {
    return <StudentLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return <UnifiedSlideDeck initialModuleId={moduleId} />;
}
