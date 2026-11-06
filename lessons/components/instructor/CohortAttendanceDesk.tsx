'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AUTHORIZED_PATRONS, getStudentNameByBarcode } from '../../lib/roster';
import { CohortAttendanceSummary } from '../../types/platform';
import {
  Users,
  CheckCircle,
  RefreshCw,
  Shield,
  Info,
} from '../icons/Icons';

const DZF_API_KEY = 'dzf_live_85605f3bdd15ab044f0ed52e13f025be11cb60cc3c7187e4';

interface CohortAttendanceDeskProps {
  activeStudents: Record<
    string,
    {
      studentName: string;
      lastSeen: number;
      partnerB?: { patronNumber: string; studentName: string };
      mode?: string;
      isFocused?: boolean;
      leftScreenAt?: number | null;
      awayDurationSeconds?: number;
    }
  >;
  currentTime: number;
  connectedLaptopsCount?: number;
}

export function CohortAttendanceDesk({
  activeStudents,
  currentTime,
  connectedLaptopsCount = 0,
}: CohortAttendanceDeskProps) {
  const [cohortType, setCohortType] = useState('cohort-8');
  const [selectedWeek, setSelectedWeek] = useState(3);
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().slice(0, 10);
  });
  const [apiEndpointMode, setApiEndpointMode] = useState<'local' | 'cloud'>('local');

  // Attendance ledger from server: barcode -> attended boolean
  const [serverAttendance, setServerAttendance] = useState<Record<string, boolean>>({});
  const [markedByMap, setMarkedByMap] = useState<Record<string, string>>({});
  const [serverStats, setServerStats] = useState<{
    presentCount: number;
    absentCount: number;
    attendanceRate: number;
    totalStudents: number;
  }>({
    presentCount: 0,
    absentCount: AUTHORIZED_PATRONS.length,
    attendanceRate: 0,
    totalStudents: AUTHORIZED_PATRONS.length,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [barcodeInput, setBarcodeInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'present' | 'absent' | 'connected'>('all');

  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
    unmatched?: string[];
  } | null>(null);

  // Compute active connected barcodes from live lab sessions
  const activeConnectedBarcodes = useMemo(() => {
    const list: string[] = [];
    for (const patron of AUTHORIZED_PATRONS) {
      const direct = activeStudents[patron];
      if (direct && currentTime - direct.lastSeen <= 45000) {
        list.push(patron);
        continue;
      }
      for (const student of Object.values(activeStudents)) {
        if (
          student.partnerB &&
          student.partnerB.patronNumber === patron &&
          currentTime - student.lastSeen <= 45000
        ) {
          list.push(patron);
          break;
        }
      }
    }
    return list;
  }, [activeStudents, currentTime]);

  const getBaseApiUrl = useCallback(() => {
    if (apiEndpointMode === 'cloud') {
      return `https://dzf-cohorts.vercel.app/api/cohorts/${cohortType}/attendance`;
    }
    return `/api/cohorts/${cohortType}/attendance`;
  }, [apiEndpointMode, cohortType]);

  // Synchronize with server on mount or when filters change without synchronous setState inside effect
  useEffect(() => {
    let ignore = false;

    async function loadAttendance() {
      try {
        const url = `${getBaseApiUrl()}?date=${selectedDate}&week=${selectedWeek}`;
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'X-DZF-API-Key': DZF_API_KEY,
          },
        });

        if (!res.ok) return;

        const data: CohortAttendanceSummary = await res.json();
        if (!ignore && data.success && data.students) {
          const newMap: Record<string, boolean> = {};
          const byMap: Record<string, string> = {};
          for (const s of data.students) {
            newMap[s.barcode] = Boolean(s.attended);
            if (s.markedBy) byMap[s.barcode] = s.markedBy;
          }
          setServerAttendance(newMap);
          setMarkedByMap(byMap);
          setServerStats({
            presentCount: data.presentCount ?? 0,
            absentCount: data.absentCount ?? (data.totalStudents ?? AUTHORIZED_PATRONS.length),
            attendanceRate: data.attendanceRate ?? 0,
            totalStudents: data.totalStudents ?? AUTHORIZED_PATRONS.length,
          });
        }
      } catch {
        // Fallback gracefully if server is initializing
      }
    }

    loadAttendance();

    return () => {
      ignore = true;
    };
  }, [getBaseApiUrl, selectedDate, selectedWeek]);

  // Manual refresh triggered by user action
  const handleManualRefresh = async () => {
    setIsLoading(true);
    setFeedback(null);
    try {
      const url = `${getBaseApiUrl()}?date=${selectedDate}&week=${selectedWeek}`;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'X-DZF-API-Key': DZF_API_KEY,
        },
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data: CohortAttendanceSummary = await res.json();
      if (data.success && data.students) {
        const newMap: Record<string, boolean> = {};
        const byMap: Record<string, string> = {};
        for (const s of data.students) {
          newMap[s.barcode] = Boolean(s.attended);
          if (s.markedBy) byMap[s.barcode] = s.markedBy;
        }
        setServerAttendance(newMap);
        setMarkedByMap(byMap);
        setServerStats({
          presentCount: data.presentCount ?? 0,
          absentCount: data.absentCount ?? (data.totalStudents ?? AUTHORIZED_PATRONS.length),
          attendanceRate: data.attendanceRate ?? 0,
          totalStudents: data.totalStudents ?? AUTHORIZED_PATRONS.length,
        });
        setFeedback({
          type: 'success',
          message: `Refreshed from server: ${data.presentCount ?? 0} present (${data.attendanceRate ?? 0}%) for Week ${selectedWeek} on ${selectedDate}.`,
        });
      } else {
        throw new Error(data.error || 'Failed to retrieve records');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error';
      setFeedback({
        type: 'error',
        message: `Could not load attendance: ${msg}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Mode A: Single Student Check-In
  const handleSingleCheckIn = async (barcode: string, attended: boolean) => {
    setIsSubmitting(true);
    setFeedback(null);
    try {
      const res = await fetch(getBaseApiUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-DZF-API-Key': DZF_API_KEY,
        },
        body: JSON.stringify({
          barcode,
          date: selectedDate,
          week: selectedWeek,
          attended,
        }),
      });

      const data: CohortAttendanceSummary = await res.json();
      if (data.success) {
        const studentName = getStudentNameByBarcode(barcode);
        setServerAttendance((prev) => {
          const next = { ...prev, [barcode]: attended };
          const present = Object.values(next).filter(Boolean).length;
          const total = AUTHORIZED_PATRONS.length;
          setServerStats({
            presentCount: present,
            absentCount: total - present,
            attendanceRate: total > 0 ? Math.round((present / total) * 100) : 0,
            totalStudents: total,
          });
          return next;
        });
        setMarkedByMap((prev) => ({ ...prev, [barcode]: data.markedBy || 'API: Academy Instructor' }));
        setFeedback({
          type: 'success',
          message: attended
            ? `✓ Marked ${studentName} (${barcode}) PRESENT for Week ${selectedWeek}`
            : `Marked ${studentName} (${barcode}) ABSENT for Week ${selectedWeek}`,
          unmatched: data.unmatched && data.unmatched.length > 0 ? data.unmatched : undefined,
        });
      } else {
        setFeedback({
          type: 'error',
          message: data.error || 'Single check-in failed',
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Check-in request failed';
      setFeedback({ type: 'error', message: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mode B: Bulk Barcodes Check-In
  const handleBulkCheckIn = async (barcodes: string[], attended = true, label = 'students') => {
    if (barcodes.length === 0) {
      setFeedback({
        type: 'info',
        message: 'No students selected for bulk attendance.',
      });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);
    try {
      const res = await fetch(getBaseApiUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-DZF-API-Key': DZF_API_KEY,
        },
        body: JSON.stringify({
          barcodes,
          date: selectedDate,
          week: selectedWeek,
          attended,
        }),
      });

      const data: CohortAttendanceSummary = await res.json();
      if (data.success) {
        setServerAttendance((prev) => {
          const next = { ...prev };
          for (const b of barcodes) {
            next[b] = attended;
          }
          const present = Object.values(next).filter(Boolean).length;
          const total = AUTHORIZED_PATRONS.length;
          setServerStats({
            presentCount: present,
            absentCount: total - present,
            attendanceRate: total > 0 ? Math.round((present / total) * 100) : 0,
            totalStudents: total,
          });
          return next;
        });

        setFeedback({
          type: 'success',
          message: `✓ Successfully marked ${data.markedCount} ${label} ${attended ? 'PRESENT' : 'ABSENT'} on server.`,
          unmatched: data.unmatched && data.unmatched.length > 0 ? data.unmatched : undefined,
        });
      } else {
        setFeedback({
          type: 'error',
          message: data.error || 'Bulk check-in failed',
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Bulk check-in request failed';
      setFeedback({ type: 'error', message: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mode C: Detailed Records Sync (Mixed Attendance)
  const handleDetailedSync = async () => {
    setIsSubmitting(true);
    setFeedback(null);
    try {
      const records = AUTHORIZED_PATRONS.map((barcode) => ({
        barcode,
        attended: Boolean(serverAttendance[barcode]),
      }));

      const res = await fetch(getBaseApiUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-DZF-API-Key': DZF_API_KEY,
        },
        body: JSON.stringify({
          date: selectedDate,
          week: selectedWeek,
          records,
        }),
      });

      const data: CohortAttendanceSummary = await res.json();
      if (data.success) {
        setFeedback({
          type: 'success',
          message: `✓ Detailed roster synchronized with server (${data.markedCount} records updated).`,
          unmatched: data.unmatched && data.unmatched.length > 0 ? data.unmatched : undefined,
        });
      } else {
        setFeedback({
          type: 'error',
          message: data.error || 'Detailed synchronization failed',
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Detailed synchronization request failed';
      setFeedback({ type: 'error', message: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Barcode Scanner Form Submit
  const handleBarcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = barcodeInput.trim().toUpperCase();
    if (!clean) return;
    handleSingleCheckIn(clean, true);
    setBarcodeInput('');
  };

  // Filtered student list
  const filteredPatrons = useMemo(() => {
    return AUTHORIZED_PATRONS.filter((patron) => {
      const name = getStudentNameByBarcode(patron).toLowerCase();
      const code = patron.toLowerCase();
      const matchesSearch = name.includes(searchQuery.toLowerCase()) || code.includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      const isPresent = Boolean(serverAttendance[patron]);
      const isConnected = activeConnectedBarcodes.includes(patron);

      if (statusFilter === 'present') return isPresent;
      if (statusFilter === 'absent') return !isPresent;
      if (statusFilter === 'connected') return isConnected;
      return true;
    });
  }, [searchQuery, statusFilter, serverAttendance, activeConnectedBarcodes]);

  return (
    <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
      {/* Header & Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Users size={18} />
            </span>
            <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              Official Cohort Attendance Desk
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Live API v2
            </span>
          </div>
          <p className="text-xs text-zinc-400">
            Official cohort attendance tracking for Cohort 8. Attendance is stored for graduation certificate readiness with zero patron points.
          </p>
        </div>

        {/* Date, Week, Cohort selectors */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Cohort input */}
          <div className="flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800">
            <span className="text-[11px] font-bold text-zinc-400">Cohort:</span>
            <input
              type="text"
              value={cohortType}
              onChange={(e) => setCohortType(e.target.value)}
              className="bg-transparent text-xs font-bold text-amber-400 w-20 focus:outline-none"
            />
          </div>

          {/* Week Selector */}
          <div className="flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800">
            <span className="text-[11px] font-bold text-zinc-400">Week:</span>
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(Number(e.target.value))}
              className="bg-transparent text-xs font-bold text-emerald-400 focus:outline-none cursor-pointer"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((w) => (
                <option key={w} value={w} className="bg-zinc-900 text-white">
                  Week {w}
                </option>
              ))}
            </select>
          </div>

          {/* Date Picker */}
          <div className="flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800">
            <span className="text-[11px] font-bold text-zinc-400">Date:</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
            />
          </div>

          {/* Refresh from Server */}
          <button
            onClick={handleManualRefresh}
            disabled={isLoading || isSubmitting}
            title="Refresh attendance records from official server"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-all disabled:opacity-50"
          >
            <RefreshCw size={14} className={isLoading ? 'animate-spin text-amber-400' : ''} />
            <span>Sync</span>
          </button>

          {/* API Mode toggle */}
          <button
            onClick={() => setApiEndpointMode((prev) => (prev === 'local' ? 'cloud' : 'local'))}
            title={apiEndpointMode === 'local' ? 'Target: Local Next.js API' : 'Target: Production Vercel Server'}
            className="text-[10px] font-mono px-2 py-1 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white"
          >
            {apiEndpointMode === 'local' ? 'Target: /api' : 'Target: dzf-cohorts'}
          </button>
        </div>
      </div>

      {/* KPI Stats Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Total Roster */}
        <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Cohort Roster</span>
            <Users size={16} />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{serverStats.totalStudents}</span>
            <span className="text-[11px] text-zinc-500 font-medium">Students</span>
          </div>
          <span className="text-[10px] text-zinc-500 mt-1">
            {connectedLaptopsCount > 0 ? `${connectedLaptopsCount} laptops active` : 'Cohort 8 Enrolled'}
          </span>
        </div>

        {/* Present Count */}
        <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Verified Present</span>
            <CheckCircle size={16} />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-400">{serverStats.presentCount}</span>
            <span className="text-[11px] text-emerald-500/80 font-medium">of {serverStats.totalStudents}</span>
          </div>
          <span className="text-[10px] text-emerald-400/70 mt-1">
            {activeConnectedBarcodes.length} currently on laptops
          </span>
        </div>

        {/* Absent Count */}
        <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Unmarked / Absent</span>
            <span className="text-xs">✗</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-zinc-300">{serverStats.absentCount}</span>
            <span className="text-[11px] text-zinc-500 font-medium">Students</span>
          </div>
          <span className="text-[10px] text-zinc-500 mt-1">Pending check-in</span>
        </div>

        {/* Attendance Rate Progress Bar */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-amber-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Attendance Rate</span>
            <span className="text-xs font-mono font-bold">{serverStats.attendanceRate}%</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-2.5 overflow-hidden my-1">
            <div
              className="bg-amber-400 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, serverStats.attendanceRate)}%` }}
            />
          </div>
          <span className="text-[10px] text-amber-400/80 mt-1">
            Graduation threshold: ≥ 80%
          </span>
        </div>
      </div>

      {/* Feedback Toast / Alert Banner */}
      {feedback && (
        <div
          className={`p-3.5 rounded-2xl border flex items-start justify-between gap-3 text-xs ${
            feedback.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
              : feedback.type === 'error'
              ? 'bg-rose-950/40 border-rose-500/50 text-rose-300'
              : 'bg-zinc-800/60 border-zinc-700 text-zinc-200'
          }`}
        >
          <div className="space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <span>{feedback.type === 'success' ? '✓' : feedback.type === 'error' ? '⚠️' : 'ℹ️'}</span>
              <span>{feedback.message}</span>
            </p>
            {feedback.unmatched && feedback.unmatched.length > 0 && (
              <p className="text-[11px] text-amber-400">
                Notice: Unmatched barcode(s) ignored without failing: {feedback.unmatched.join(', ')}
              </p>
            )}
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-zinc-400 hover:text-white text-xs font-bold px-2 py-0.5 rounded-md hover:bg-zinc-800"
          >
            ✕
          </button>
        </div>
      )}

      {/* Action Command Row: Barcode Scanner & Bulk Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Barcode Scanner / Single Input (Mode A) */}
        <div className="lg:col-span-5 bg-zinc-950 border border-zinc-800/90 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>📟</span> Single Check-In (Scanner / Patron Barcode)
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
              Mode A
            </span>
          </div>

          <form onSubmit={handleBarcodeSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={barcodeInput}
              onChange={(e) => setBarcodeInput(e.target.value)}
              placeholder="Scan barcode or patron # (e.g. 20250645)"
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-zinc-600"
            />
            <button
              type="submit"
              disabled={isSubmitting || !barcodeInput.trim()}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs transition-all disabled:opacity-50"
            >
              Check In
            </button>
          </form>

          <p className="text-[10px] text-zinc-500">
            Works directly with physical USB barcode scanners (auto-submits on Enter) or manual keypad entry.
          </p>
        </div>

        {/* Right: Bulk Action Command Toolbar (Mode B & Mode C) */}
        <div className="lg:col-span-7 bg-zinc-950 border border-zinc-800/90 rounded-2xl p-4 space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>⚡</span> Bulk Attendance Commands
            </span>
            <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400">
              <span className="px-1.5 py-0.5 rounded bg-zinc-800">Mode B</span>
              <span className="px-1.5 py-0.5 rounded bg-zinc-800">Mode C</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
            {/* Mark All Connected */}
            <button
              onClick={() =>
                handleBulkCheckIn(
                  activeConnectedBarcodes,
                  true,
                  `connected students (${activeConnectedBarcodes.length})`
                )
              }
              disabled={isSubmitting || activeConnectedBarcodes.length === 0}
              className="px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all disabled:opacity-40 flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/50"
            >
              <span>🟢</span>
              <span className="truncate">Mark Connected ({activeConnectedBarcodes.length})</span>
            </button>

            {/* Mark All 30 Roster */}
            <button
              onClick={() =>
                handleBulkCheckIn(
                  AUTHORIZED_PATRONS,
                  true,
                  `entire cohort (${AUTHORIZED_PATRONS.length})`
                )
              }
              disabled={isSubmitting}
              className="px-3 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-400 font-bold text-xs transition-all disabled:opacity-40 flex items-center justify-center gap-1.5"
            >
              <span>⚡</span>
              <span className="truncate">Mark All 30 Present</span>
            </button>

            {/* Sync Detailed Roster (Mode C) */}
            <button
              onClick={handleDetailedSync}
              disabled={isSubmitting}
              className="px-3 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs transition-all disabled:opacity-40 flex items-center justify-center gap-1.5"
            >
              <span>📋</span>
              <span className="truncate">Sync Grid (Mode C)</span>
            </button>
          </div>

          <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1">
            <span>Audit log streams to /dashboard/admin/daily-actions</span>
            <button
              onClick={() => handleBulkCheckIn(AUTHORIZED_PATRONS, false, 'entire cohort')}
              disabled={isSubmitting}
              className="text-zinc-500 hover:text-rose-400 underline transition-colors"
            >
              Reset / Mark All Absent
            </button>
          </div>
        </div>
      </div>

      {/* Roster Grid & Filter Toolbar */}
      <div className="space-y-3 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          {/* Search Input */}
          <div className="flex items-center gap-2 w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student or barcode..."
              className="w-full px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 flex-wrap">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                statusFilter === 'all'
                  ? 'bg-amber-500 text-zinc-950'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white'
              }`}
            >
              All ({AUTHORIZED_PATRONS.length})
            </button>
            <button
              onClick={() => setStatusFilter('present')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                statusFilter === 'present'
                  ? 'bg-emerald-500 text-zinc-950'
                  : 'bg-zinc-950 text-zinc-400 hover:text-emerald-400'
              }`}
            >
              Present ({serverStats.presentCount})
            </button>
            <button
              onClick={() => setStatusFilter('absent')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                statusFilter === 'absent'
                  ? 'bg-rose-500 text-white'
                  : 'bg-zinc-950 text-zinc-400 hover:text-rose-400'
              }`}
            >
              Absent ({serverStats.absentCount})
            </button>
            <button
              onClick={() => setStatusFilter('connected')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                statusFilter === 'connected'
                  ? 'bg-cyan-500 text-zinc-950'
                  : 'bg-zinc-950 text-zinc-400 hover:text-cyan-400'
              }`}
            >
              Connected ({activeConnectedBarcodes.length})
            </button>
          </div>
        </div>

        {/* 30 Students Interactive Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {filteredPatrons.map((patron) => {
            const isPresent = Boolean(serverAttendance[patron]);
            const isConnected = activeConnectedBarcodes.includes(patron);
            const studentName = getStudentNameByBarcode(patron);
            const markedBy = markedByMap[patron];

            const live = activeStudents[patron];
            let partnerOf: string | null = null;
            for (const [key, student] of Object.entries(activeStudents)) {
              if (student.partnerB && student.partnerB.patronNumber === patron) {
                partnerOf = key;
                break;
              }
            }
            const liveRecord = live || (partnerOf ? activeStudents[partnerOf] : null);
            const isInattentive = Boolean(isConnected && liveRecord && liveRecord.isFocused === false);

            return (
              <div
                key={patron}
                className={`p-3 rounded-2xl border transition-all flex flex-col justify-between gap-2 ${
                  isPresent
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-100 shadow-sm'
                    : 'bg-zinc-950 border-zinc-800/80 text-zinc-400'
                }`}
              >
                {/* Header: Barcode & Connection Dot */}
                <div className="flex items-center justify-between gap-1">
                  <span className="font-mono text-xs font-black text-white">
                    {patron}
                  </span>
                  <div className="flex items-center gap-1">
                    {isInattentive ? (
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" title="Away from lesson tab" />
                    ) : isConnected ? (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Laptop online in room" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-zinc-700" title="Offline" />
                    )}
                  </div>
                </div>

                {/* Student Name */}
                <div className="min-h-[2.5rem]">
                  <p className="text-xs font-bold text-white line-clamp-2 leading-tight">
                    {studentName}
                  </p>
                  <span className="text-[10px] text-zinc-500 block mt-0.5">
                    {isConnected ? (isInattentive ? '🔴 Away' : '🟢 Laptop Active') : '⚪ Device Offline'}
                  </span>
                </div>

                {/* Server Status Pill & Toggle Action */}
                <div className="pt-1 border-t border-zinc-800/70 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span
                      className={`font-black px-2 py-0.5 rounded-full ${
                        isPresent
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {isPresent ? '✓ Present' : '✗ Absent'}
                    </span>
                    {markedBy && (
                      <span className="text-[9px] text-zinc-500 truncate max-w-[65px]" title={markedBy}>
                        API
                      </span>
                    )}
                  </div>

                  {/* Toggle Mode A Check-In button */}
                  <button
                    onClick={() => handleSingleCheckIn(patron, !isPresent)}
                    disabled={isSubmitting}
                    className={`w-full py-1 px-2 rounded-lg text-[10px] font-bold transition-all ${
                      isPresent
                        ? 'bg-zinc-800 hover:bg-rose-950/60 hover:text-rose-300 text-zinc-300'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    }`}
                  >
                    {isPresent ? 'Mark Absent' : 'Mark Present →'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Domain Policy Callout Banner */}
      <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <Shield size={18} className="text-amber-400 shrink-0" />
          <div>
            <span className="font-bold text-zinc-200">Zero Patron Points Policy: </span>
            <span>
              Cohort training check-ins award 0 library patron points and do not alter the main library leaderboard. Attendance is tracked strictly for cohort graduation readiness and logged to daily actions.
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 text-[11px] font-mono text-zinc-500">
          <Info size={14} />
          <span>Key: dzf_live_8560...</span>
        </div>
      </div>
    </section>
  );
}
