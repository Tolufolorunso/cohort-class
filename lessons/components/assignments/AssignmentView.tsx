'use client';

import React, { useState, useEffect } from 'react';
import { ModuleAssignment, StudentSubmission } from '../../types/platform';
import { saveSubmission, getSubmissions } from '../../lib/platformStorage';
import { FileText, CheckCircle, Award } from '../icons/Icons';

interface AssignmentViewProps {
  assignment: ModuleAssignment;
}

export function AssignmentView({ assignment }: AssignmentViewProps) {
  const [patronNumber, setPatronNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submittedReceipt, setSubmittedReceipt] = useState<StudentSubmission | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if this student/browser already submitted for this module
  useEffect(() => {
    const timer = setTimeout(() => {
      const existing = getSubmissions();
      const found = existing.find((sub) => sub.moduleId === assignment.moduleId);
      if (found) {
        setSubmittedReceipt(found);
        setPatronNumber(found.patronNumber);
        setStudentName(found.studentName);
        setAnswers(found.answers);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [assignment.moduleId]);

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
      setErrorMessage('Please enter your assigned Patron Number (e.g. DZ-2026-001) before submitting.');
      return;
    }

    if (!trimmedName) {
      setErrorMessage('Please enter your Full Name (Surname and First name) before submitting.');
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
      const submission = saveSubmission({
        patronNumber: trimmedPatron,
        studentName: trimmedName,
        moduleId: assignment.moduleId,
        moduleTitle: assignment.moduleTitle,
        answers,
      });

      setSubmittedReceipt(submission);
      setIsSubmitting(false);
    } catch {
      setErrorMessage('Failed to save assignment. Please check your storage settings and try again.');
      setIsSubmitting(false);
    }
  };

  const handleResubmit = () => {
    setSubmittedReceipt(null);
  };

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
            <strong>Requirement:</strong> Every student must provide their unique <strong>Patron Number</strong> and <strong>Full Name</strong>. Submissions are saved directly to the classroom lab registry.
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
                Patron Number
              </span>
              <span className="text-base sm:text-lg font-mono font-bold text-emerald-400">
                {submittedReceipt.patronNumber}
              </span>
            </div>

            <div className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-3.5 text-center">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                Student Name
              </span>
              <span className="text-base sm:text-lg font-bold text-white truncate block">
                {submittedReceipt.studentName}
              </span>
            </div>

            <div className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-3.5 text-center">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                Submission Timestamp
              </span>
              <span className="text-xs font-medium text-zinc-300 block">
                {new Date(submittedReceipt.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })},{' '}
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
                <p className="text-sm text-zinc-200 whitespace-pre-wrap font-mono">
                  {submittedReceipt.answers[q.id] || '(No answer provided)'}
                </p>
              </div>
            ))}
          </div>

          {/* Update / Edit Button */}
          <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end">
            <button
              onClick={handleResubmit}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
            >
              Edit & Re-submit Assignment
            </button>
          </div>
        </div>
      )}

      {/* Main Submission Form */}
      {!submittedReceipt && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student Identification Box */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-md">
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-2">
              <span>👤</span> Student Identification Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-200 mb-1.5">
                  Patron Number <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={patronNumber}
                  onChange={(e) => setPatronNumber(e.target.value)}
                  placeholder="e.g. DZ-2026-001"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white font-mono placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
                <span className="text-[11px] text-zinc-500 mt-1 block">
                  Your designated laboratory registration ID
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-200 mb-1.5">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Oluwaseun Adeleke"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
                <span className="text-[11px] text-zinc-500 mt-1 block">
                  Enter your official name as registered with the teacher
                </span>
              </div>
            </div>
          </div>

          {/* Question Cards */}
          <div className="space-y-6">
            {assignment.questions.map((q) => (
              <div
                key={q.id}
                className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-5 sm:p-6 shadow-md transition-colors"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-extrabold text-xs flex items-center justify-center border border-emerald-500/30 shrink-0 mt-0.5">
                    Q{q.id}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white leading-snug">
                      {q.prompt}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      <strong>Guidance:</strong> {q.guidance}
                    </p>
                  </div>
                </div>

                <div className="mt-3">
                  <textarea
                    rows={4}
                    value={answers[q.id] || ''}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                    placeholder={q.placeholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-600/50 text-rose-200 text-xs font-semibold animate-in fade-in">
              ⚠️ {errorMessage}
            </div>
          )}

          {/* Submit Action Bar */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-zinc-400 text-center sm:text-left">
              Make sure you have double-checked all answers and your Patron Number before submitting.
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-sm tracking-wide transition-all shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
            >
              <FileText size={18} />
              <span>{isSubmitting ? 'Recording Submission...' : 'Submit Assignment'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
