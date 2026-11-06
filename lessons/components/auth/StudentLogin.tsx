'use client';

import React, { useState } from 'react';
import { StudentSession, LoginMode } from '../../types/platform';
import {
  validateSoloLogin,
  validatePartnerLogin,
  saveStudentSession,
} from '../../lib/roster';
import { GraduationCap, Users, User } from '../icons/Icons';

interface StudentLoginProps {
  onLoginSuccess: (session: StudentSession) => void;
}

export function StudentLogin({ onLoginSuccess }: StudentLoginProps) {
  const [mode, setMode] = useState<LoginMode>('solo');

  // Solo form fields
  const [soloPatron, setSoloPatron] = useState('');
  const [soloName, setSoloName] = useState('');

  // Partner form fields
  const [partnerAPatron, setPartnerAPatron] = useState('');
  const [partnerAName, setPartnerAName] = useState('');
  const [partnerBPatron, setPartnerBPatron] = useState('');
  const [partnerBName, setPartnerBName] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const handleModeChange = (newMode: LoginMode) => {
    setMode(newMode);
    setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (mode === 'solo') {
      const validation = validateSoloLogin(soloPatron, soloName);
      if (!validation.success || !validation.session) {
        setErrorMessage(validation.error || 'Invalid student credentials.');
        return;
      }
      saveStudentSession(validation.session);
      onLoginSuccess(validation.session);
    } else {
      const validation = validatePartnerLogin(
        partnerAPatron,
        partnerAName,
        partnerBPatron,
        partnerBName
      );
      if (!validation.success || !validation.session) {
        setErrorMessage(validation.error || 'Invalid partner credentials.');
        return;
      }
      saveStudentSession(validation.session);
      onLoginSuccess(validation.session);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-950 text-zinc-100 selection:bg-emerald-500 selection:text-zinc-950">
      <div
        className={`w-full transition-all duration-200 ${
          mode === 'partner' ? 'max-w-2xl' : 'max-w-md'
        } bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6`}
      >
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
          <p className="text-xs text-zinc-400 leading-relaxed max-w-md mx-auto">
            Welcome to Dzuel&apos;s Computer Class! Enter your assigned Patron Number and Full Name to access today&apos;s interactive lesson.
          </p>
        </div>

        {/* Mode Selector Toggle: Solo Learner vs. Equal Lab Partners */}
        <div className="bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800 flex items-center gap-1.5 shadow-inner">
          <button
            type="button"
            onClick={() => handleModeChange('solo')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              mode === 'solo'
                ? 'bg-emerald-500 text-zinc-950 shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
            }`}
          >
            <User size={16} />
            <span>Solo Learner (1 Student)</span>
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('partner')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              mode === 'partner'
                ? 'bg-emerald-500 text-zinc-950 shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
            }`}
          >
            <Users size={16} />
            <span>Equal Lab Partners (2 Students)</span>
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'solo' ? (
            /* Solo Learner Form */
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                  Patron Number <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={soloPatron}
                  onChange={(e) => {
                    setSoloPatron(e.target.value);
                    setErrorMessage('');
                  }}
                  placeholder="e.g. 20230165"
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
                  value={soloName}
                  onChange={(e) => {
                    setSoloName(e.target.value);
                    setErrorMessage('');
                  }}
                  placeholder="e.g. Adewale Oluwaseun"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-sm font-semibold placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
                <p className="text-[11px] text-zinc-500 mt-1">
                  Enter your surname and first name
                </p>
              </div>
            </div>
          ) : (
            /* Equal Lab Partners Form (Side-by-side on desktop) */
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-[12px] text-emerald-300 flex items-center gap-2">
                <span className="text-base">🤝</span>
                <span>
                  <strong>Shared Classroom Laptop:</strong> Two students learn together as equal lab partners with equal participation and credit.
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Partner A Card */}
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3.5 shadow-sm">
                  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Partner A
                    </span>
                    <span className="text-[10px] text-zinc-500 font-bold">First Student</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      Patron Number <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={partnerAPatron}
                      onChange={(e) => {
                        setPartnerAPatron(e.target.value);
                        setErrorMessage('');
                      }}
                      placeholder="e.g. 20230165"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-mono text-sm font-bold placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all tracking-wider"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      Full Name <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={partnerAName}
                      onChange={(e) => {
                        setPartnerAName(e.target.value);
                        setErrorMessage('');
                      }}
                      placeholder="e.g. Adewale Oluwaseun"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs font-semibold placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                </div>

                {/* Partner B Card */}
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3.5 shadow-sm">
                  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Partner B
                    </span>
                    <span className="text-[10px] text-zinc-500 font-bold">Second Student</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      Patron Number <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={partnerBPatron}
                      onChange={(e) => {
                        setPartnerBPatron(e.target.value);
                        setErrorMessage('');
                      }}
                      placeholder="e.g. 20250523"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-mono text-sm font-bold placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all tracking-wider"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      Full Name <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={partnerBName}
                      onChange={(e) => {
                        setPartnerBName(e.target.value);
                        setErrorMessage('');
                      }}
                      placeholder="e.g. Chioma Eze"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs font-semibold placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

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
              <strong>3-Hour Lab Session:</strong> Your laptop session remains active for 180 minutes while in class.
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-sm tracking-wide transition-all shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center gap-2"
          >
            <span>
              {mode === 'partner'
                ? 'Enter Computer Class Together (2 Partners)'
                : 'Enter Computer Class'}
            </span>
            <span>→</span>
          </button>
        </form>
      </div>
    </div>
  );
}
