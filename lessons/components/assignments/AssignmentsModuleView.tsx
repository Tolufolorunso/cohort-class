'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '../navigation/Header';
import { AssignmentView } from './AssignmentView';
import { StudentLogin } from '../auth/StudentLogin';
import { useClassroomAttention } from '../../hooks/useClassroomAttention';

import { module1Assignment } from '../../data/module1';
import { module2Assignment } from '../../data/module2';
import { ZoomLevel, StudentSession, SyncMode } from '../../types/platform';
import { getZoomLevel, setZoomLevel, getUnlockedModules } from '../../lib/platformStorage';
import { getStudentSession, clearStudentSession, saveStudentSession } from '../../lib/roster';

interface AssignmentsModuleViewProps {
  moduleId: string;
}

export function AssignmentsModuleView({ moduleId }: AssignmentsModuleViewProps) {
  const router = useRouter();

  const [studentSession, setStudentSessionState] = useState<StudentSession | null>(null);
  const [hasCheckedSession, setHasCheckedSession] = useState(false);

  const [zoomLevel, setZoomState] = useState<ZoomLevel>('normal');
  const [unlockedModuleIds, setUnlockedModuleIds] = useState<string[]>(['module-1']);
  const [syncMode, setSyncMode] = useState<SyncMode>('follow-teacher');

  const attention = useClassroomAttention();

  useEffect(() => {
    const timer = setTimeout(() => {
      const active = getStudentSession();
      setStudentSessionState(active);
      setZoomState(getZoomLevel());
      setUnlockedModuleIds(getUnlockedModules());
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

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (zoomLevel === 'xlarge') {
      root.style.fontSize = '24px';
    } else if (zoomLevel === 'large') {
      root.style.fontSize = '21px';
    } else {
      root.style.fontSize = '18px';
    }
  }, [zoomLevel]);

  // Transmit heartbeat with attention tracking while submitting assignments
  useEffect(() => {
    if (!studentSession) return;

    const pollSession = async () => {
      try {
        const queryParams = new URLSearchParams();
        queryParams.set('mode', studentSession.mode || 'solo');
        queryParams.set('patron', studentSession.patronNumber);
        queryParams.set('name', studentSession.studentName);
        if (studentSession.mode === 'partner' && studentSession.partnerB) {
          queryParams.set('patronA', studentSession.partnerA.patronNumber);
          queryParams.set('nameA', studentSession.partnerA.studentName);
          queryParams.set('patronB', studentSession.partnerB.patronNumber);
          queryParams.set('nameB', studentSession.partnerB.studentName);
        }
        queryParams.set('isFocused', String(attention.isFocused));
        if (!attention.isFocused && attention.leftScreenAt) {
          queryParams.set('leftScreenAt', String(attention.leftScreenAt));
        }

        const url = `/api/live-session?${queryParams.toString()}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setSyncMode(data.syncMode || 'follow-teacher');
        }
      } catch {
        // Offline fallback
      }
    };

    pollSession();
    const interval = setInterval(pollSession, 2000);
    return () => clearInterval(interval);
  }, [studentSession, attention.isFocused, attention.leftScreenAt]);

  const handleLoginSuccess = useCallback((session: StudentSession) => {
    setStudentSessionState(session);
    saveStudentSession(session);
  }, []);

  const handleLogout = useCallback(() => {
    clearStudentSession();
    setStudentSessionState(null);
    router.push('/');
  }, [router]);

  const handleZoomChange = (level: ZoomLevel) => {
    setZoomState(level);
    setZoomLevel(level);
  };

  if (!hasCheckedSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-emerald-400 font-mono text-sm">
        Loading classroom homework...
      </div>
    );
  }

  if (!studentSession) {
    return <StudentLogin onLoginSuccess={handleLoginSuccess} />;
  }

  const activeAssignment = moduleId === 'module-2' ? module2Assignment : module1Assignment;

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-emerald-500 selection:text-zinc-950">
      <Header
        currentModuleId={moduleId}
        onSelectModule={(newModId) => router.push(`/assignments/${newModId}`)}
        activeView="assignment"
        zoomLevel={zoomLevel}
        onChangeZoom={handleZoomChange}
        unlockedModuleIds={unlockedModuleIds}
        session={studentSession}
        syncMode={syncMode}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        <AssignmentView assignment={activeAssignment} />
      </main>
    </div>
  );
}

