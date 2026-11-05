'use client';

import React, { useState } from 'react';
import { StudentSession } from '../../types/platform';
import { validateStudentLogin, saveStudentSession, AUTHORIZED_PATRONS } from '../../lib/roster';
import { GraduationCap, Shield } from '../icons/Icons';

interface StudentLoginProps {
  onLoginSuccess: (session: StudentSession) => void;
}

export function StudentLogin({ onLoginSuccess }: StudentLoginProps) {
  const [patronNumber, setPatronNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showRosterHint, setShowRosterHint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const validation = validateStudentLogin(patronNumber, studentName);
    if (!validation.success || !validation.session) {
      setErrorMessage(validation.error || 'Invalid credentials');
      return;
    }

    saveStudentSession(validation.session);
    onLoginSuccess(validation.session);
  };

  const handleSelectSample = (patron: string) => {
    setPatronNumber(patron);
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-950 text-zinc-100 selection:bg-emerald-500 selection:text-zinc-950">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Branding & Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 mb-2 shadow-inner">
            <GraduationCap size={36} />
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
            Dzuels Computer Lab Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Student Classroom Login
          </h1>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Welcome to Dzuel&apos;s Computer Class! Enter your assigned Patron Number and Full Name to access today&apos;s interactive lesson.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1.5">
              Patron Number <span className="text-emerald-400">*</span>
            </label>
            <input
              type="text"
              required
              autoFocus
              value={patronNumber}
              onChange={(e) => {
                setPatronNumber(e.target.value);
                setErrorMessage('');
              }}
              placeholder="e.g. 20230194"
              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white font-mono text-base font-bold placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all tracking-wider"
            />
            <p className="text-[11px] text-zinc-500 mt-1">
              Your 8-digit laboratory registration ID
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1.5">
              Full Name <span className="text-emerald-400">*</span>
            </label>
            <input
              type="text"
              required
              value={studentName}
              onChange={(e) => {
                setStudentName(e.target.value);
                setErrorMessage('');
              }}
              placeholder="e.g. Adewale Oluwaseun"
              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-sm font-semibold placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
            <p className="text-[11px] text-zinc-500 mt-1">
              Enter your surname and first name
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-600/50 text-rose-200 text-xs font-semibold animate-in fade-in flex items-start gap-2">
              <span className="text-base shrink-0">⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Session Expiry Notice */}
          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-400 flex items-center gap-2">
            <span className="text-emerald-400 text-sm">⏱️</span>
            <span>
              <strong>1-Hour Lab Session:</strong> Your session remains active for 60 minutes while in class.
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-sm tracking-wide transition-all shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center gap-2"
          >
            <span>Enter Computer Class</span>
            <span>→</span>
          </button>
        </form>

        {/* Quick Patron Number Lookup for Classroom */}
        <div className="pt-2 border-t border-zinc-800/80 text-center">
          <button
            type="button"
            onClick={() => setShowRosterHint(!showRosterHint)}
            className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            {showRosterHint ? 'Hide Registered Class Numbers ▲' : 'View Class Patron List (22 Students) ▼'}
          </button>

          {showRosterHint && (
            <div className="mt-3 p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-left max-h-36 overflow-y-auto animate-in fade-in">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                Click your Patron Number:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {AUTHORIZED_PATRONS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handleSelectSample(p)}
                    className="px-2 py-1 rounded bg-zinc-800 hover:bg-emerald-500 hover:text-zinc-950 text-zinc-300 font-mono text-[11px] font-semibold transition-colors"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Instructor Portal Link */}
        <div className="text-center pt-2">
          <a
            href="/instructor"
            className="inline-flex items-center gap-1.5 text-[11px] text-zinc-500 hover:text-amber-400 font-semibold transition-colors"
          >
            <Shield size={12} />
            <span>Are you an instructor? Open Instructor Portal</span>
          </a>
        </div>
      </div>
    </div>
  );
}

