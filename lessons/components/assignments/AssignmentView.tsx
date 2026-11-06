'use client';

import React, { useState, useEffect } from 'react';
import { ModuleAssignment, StudentSubmission, SubmissionType, StudentSession } from '../../types/platform';
import { saveSubmission, getSubmissions } from '../../lib/platformStorage';
import { getStudentSession } from '../../lib/roster';
import { FileText, CheckCircle, Award, Users, User } from '../icons/Icons';

interface AssignmentViewProps {
  assignment: ModuleAssignment;
}

export function AssignmentView({ assignment }: AssignmentViewProps) {
  const [session, setSession] = useState<StudentSession | null>(null);
  const [submissionType, setSubmissionType] = useState<SubmissionType>('joint');
  const [individualPartner, setIndividualPartner] = useState<'partnerA' | 'partnerB'>('partnerA');

  const [patronNumber, setPatronNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submittedReceipt, setSubmittedReceipt] = useState<StudentSubmission | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if this student/browser already submitted for this module or has active session
  useEffect(() => {
    const timer = setTimeout(() => {
      const activeSession = getStudentSession();
      if (activeSession) {
        setSession(activeSession);
        if (activeSession.mode === 'partner' && activeSession.partnerB) {
          setSubmissionType('joint');
          setPatronNumber(activeSession.partnerA.patronNumber);
          setStudentName(
            `${activeSession.partnerA.studentName} & ${activeSession.partnerB.studentName} (Lab Partners)`
          );
        } else {
          setSubmissionType('individual');
          setPatronNumber(activeSession.patronNumber);
          setStudentName(activeSession.studentName);
        }
      }

      const existing = getSubmissions();
      const found = existing.find((sub) => sub.moduleId === assignment.moduleId);
      if (found) {
        setSubmittedReceipt(found);
        setPatronNumber(found.patronNumber);
        setStudentName(found.studentName);
        setAnswers(found.answers);
        if (found.submissionType) {
          setSubmissionType(found.submissionType);
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [assignment.moduleId]);

  const handleSelectSubmissionType = (type: SubmissionType) => {
    setSubmissionType(type);
    if (!session || session.mode !== 'partner' || !session.partnerB) return;
    if (type === 'joint') {
      setPatronNumber(`${session.partnerA.patronNumber} & ${session.partnerB.patronNumber}`);
      setStudentName(
        `${session.partnerA.studentName} & ${session.partnerB.studentName} (Lab Partners)`
      );
    } else {
      const active = individualPartner === 'partnerA' ? session.partnerA : session.partnerB;
      setPatronNumber(active.patronNumber);
      setStudentName(active.studentName);
    }
  };

  const handleSelectPartner = (partnerKey: 'partnerA' | 'partnerB') => {
    setIndividualPartner(partnerKey);
    if (!session || session.mode !== 'partner' || !session.partnerB) return;
    const active = partnerKey === 'partnerA' ? session.partnerA : session.partnerB;
    setPatronNumber(active.patronNumber);
    setStudentName(active.studentName);
  };

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    const trimmedPatron = patronNumber.trim();
    const trimmedName = studentName.trim();

    if (!trimmedPatron) {
      setErrorMessage('Please enter your 8-digit Patron Number before submitting.');
      return;
    }

    if (!trimmedName) {
      setErrorMessage('Please enter student name(s) before submitting.');
      return;
    }

    // Check if at least one question is answered
    const answeredCount = Object.values(answers).filter((a) => a.trim().length > 0).length;
    if (answeredCount === 0) {
      setErrorMessage('Please answer at least one question before submitting your assignment.');
      return;
    }

    setIsSubmitting(true);

    try {
      let submissionData: Omit<StudentSubmission, 'id' | 'submittedAt' | 'status'>;

      if (session && session.mode === 'partner' && session.partnerB) {
        if (submissionType === 'joint') {
          submissionData = {
            submissionType: 'joint',
            partnerA: session.partnerA,
            partnerB: session.partnerB,
            patronNumber: `${session.partnerA.patronNumber} & ${session.partnerB.patronNumber}`,
            studentName: `${session.partnerA.studentName} & ${session.partnerB.studentName} (Lab Partners)`,
            moduleId: assignment.moduleId,
            moduleTitle: assignment.moduleTitle,
            answers,
          };
        } else {
          const activePartner =
            individualPartner === 'partnerA' ? session.partnerA : session.partnerB;
          const otherPartner =
            individualPartner === 'partnerA' ? session.partnerB : session.partnerA;
          submissionData = {
            submissionType: 'individual',
            partnerA: session.partnerA,
            partnerB: session.partnerB,
            submittingStudent: activePartner.studentName,
            patronNumber: activePartner.patronNumber,
            studentName: `${activePartner.studentName} (Partner: ${otherPartner.studentName})`,
            moduleId: assignment.moduleId,
            moduleTitle: assignment.moduleTitle,
            answers,
          };
        }
      } else {
        submissionData = {
          submissionType: 'individual',
          partnerA: session?.partnerA || {
            patronNumber: trimmedPatron,
            studentName: trimmedName,
          },
          patronNumber: trimmedPatron,
          studentName: trimmedName,
          moduleId: assignment.moduleId,
          moduleTitle: assignment.moduleTitle,
          answers,
        };
      }

      const saved = saveSubmission(submissionData);
      setSubmittedReceipt(saved);
      setIsSubmitting(false);
    } catch {
      setErrorMessage('Failed to save assignment. Please check your storage settings and try again.');
      setIsSubmitting(false);
    }
  };

  const handleResubmit = () => {
    setSubmittedReceipt(null);
  };

  const isPartnerSession = Boolean(session && session.mode === 'partner' && session.partnerB);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:px-6 sm:py-8 space-y-6">
      {/* Assignment Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/70 via-zinc-900 to-zinc-900 border border-emerald-600/40 rounded-2xl p-5 sm:p-7 shadow-xl">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
          <FileText size={16} />
          <span>Interactive Homework Assignment</span>
          <span>•</span>
          <span>{assignment.moduleId.toUpperCase()}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          {assignment.moduleTitle}
        </h1>
        <p className="text-zinc-300 text-sm sm:text-base mt-2 leading-relaxed">
          {assignment.instructions}
        </p>

        <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center gap-2 text-xs text-amber-300 font-medium">
          <span className="text-base">📌</span>
          <span>
            <strong>Requirement:</strong> Every student or pair must provide verified <strong>Patron Number(s)</strong> and <strong>Full Name(s)</strong>. Submissions are saved directly to the classroom lab registry.
          </span>
        </div>
      </div>

      {/* Submitted Success Receipt View */}
      {submittedReceipt && (
        <div className="bg-zinc-900/90 border-2 border-emerald-500 rounded-2xl p-6 sm:p-8 shadow-2xl animate-in fade-in">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-6 border-b border-zinc-800">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle size={32} />
            </div>
            <div className="text-center sm:text-left flex-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-zinc-950 mb-2">
                <Award size={14} /> Assignment Successfully Submitted
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Great job, {submittedReceipt.studentName}!
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                Your answers have been securely recorded in the classroom computer lab registry. Your instructor can now review your work.
              </p>
            </div>
          </div>

          {/* Submission Details Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
            <div className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-3.5 text-center">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                Patron Number(s)
              </span>
              <span className="text-sm sm:text-base font-mono font-bold text-emerald-400 truncate block">
                {submittedReceipt.patronNumber}
              </span>
            </div>

            <div className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-3.5 text-center">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                Submission Type & Student
              </span>
              <span className="text-xs sm:text-sm font-bold text-white truncate block">
                {submittedReceipt.submissionType === 'joint' ? '🤝 Joint Partners' : '👤 Individual'} •{' '}
                {submittedReceipt.studentName}
              </span>
            </div>

            <div className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-3.5 text-center">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                Submission Timestamp
              </span>
              <span className="text-xs font-medium text-zinc-300 block">
                {new Date(submittedReceipt.submittedAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })},{' '}
                {new Date(submittedReceipt.submittedAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Answer Preview */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Submitted Responses:
            </h3>
            {assignment.questions.map((q) => (
              <div key={q.id} className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800">
                <span className="text-xs font-bold text-emerald-400 block mb-1">
                  Question {q.id}: {q.prompt}
                </span>
                <p className="text-sm text-zinc-200 whitespace-pre-wrap font-sans leading-relaxed">
                  {submittedReceipt.answers[q.id] || '(Blank / Not answered)'}
                </p>
              </div>
            ))}
          </div>

          {/* Resubmit or Edit Button */}
          <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end">
            <button
              onClick={handleResubmit}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
            >
              Edit or Resubmit Answers
            </button>
          </div>
        </div>
      )}

      {/* Main Assignment Form */}
      {!submittedReceipt && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Shared Laptop Mode Selector (when logged in as equal lab partners) */}
          {isPartnerSession && session && session.partnerB && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                <Users size={16} className="text-emerald-400" />
                <span>Shared Laptop Submission Option:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSelectSubmissionType('joint')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    submissionType === 'joint'
                      ? 'bg-emerald-950/50 border-emerald-500 text-white shadow-md ring-1 ring-emerald-500/30'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base">🤝</span>
                    <span className="font-bold text-xs">Joint Partner Submission</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-snug">
                    Submit together as equal partners. Both <strong>{session.partnerA.studentName}</strong> and <strong>{session.partnerB.studentName}</strong> receive full credit!
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectSubmissionType('individual')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    submissionType === 'individual'
                      ? 'bg-emerald-950/50 border-emerald-500 text-white shadow-md ring-1 ring-emerald-500/30'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base">👤</span>
                    <span className="font-bold text-xs">Individual Submission</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-snug">
                    Submit independently on this laptop. Choose which student is submitting this response now.
                  </p>
                </button>
              </div>

              {submissionType === 'individual' && (
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row items-center gap-3">
                  <span className="text-xs font-semibold text-zinc-400 shrink-0">Submitting As:</span>
                  <div className="flex flex-wrap items-center gap-4">
                    <label className="flex items-center gap-2 text-xs font-bold text-white cursor-pointer">
                      <input
                        type="radio"
                        name="submittingPartner"
                        value="partnerA"
                        checked={individualPartner === 'partnerA'}
                        onChange={() => handleSelectPartner('partnerA')}
                        className="accent-emerald-500"
                      />
                      <span>{session.partnerA.studentName} ({session.partnerA.patronNumber})</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs font-bold text-white cursor-pointer">
                      <input
                        type="radio"
                        name="submittingPartner"
                        value="partnerB"
                        checked={individualPartner === 'partnerB'}
                        onChange={() => handleSelectPartner('partnerB')}
                        className="accent-emerald-500"
                      />
                      <span>{session.partnerB.studentName} ({session.partnerB.patronNumber})</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Student Identification Banner */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
              <User size={16} className="text-emerald-400" />
              <span>Student Identification</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                  Patron Number(s) <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={patronNumber}
                  onChange={(e) => setPatronNumber(e.target.value)}
                  placeholder="e.g. 20230165"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white font-mono text-sm font-bold placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                  Student Full Name(s) <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Adewale Oluwaseun"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-sm font-semibold placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Homework Questions List */}
          <div className="space-y-4">
            {assignment.questions.map((q, idx) => (
              <div
                key={q.id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-lg space-y-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-black text-xs flex items-center justify-center shrink-0 border border-emerald-500/40">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                      {q.prompt}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      💡 <strong>Guidance:</strong> {q.guidance}
                    </p>
                  </div>
                </div>

                <div>
                  <textarea
                    rows={4}
                    value={answers[q.id] || ''}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                    placeholder={q.placeholder}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-sm placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-y leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Error Message Banner */}
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-600 text-rose-200 text-xs font-semibold flex items-center gap-2">
              <span className="text-base">⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submission Action Bar */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="text-xs text-zinc-400 text-center sm:text-left">
              <span>
                Make sure you review your answers before submitting. Your work is recorded directly to your teacher&apos;s dashboard.
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-zinc-950 font-black text-sm tracking-wide transition-all shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center gap-2 shrink-0"
            >
              {isSubmitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <span>
                    {isPartnerSession && submissionType === 'joint'
                      ? 'Submit as Joint Partners'
                      : 'Submit Homework'}
                  </span>
                  <span>🚀</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
