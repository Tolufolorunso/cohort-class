'use client';

import React, { useState } from 'react';
import { quizQuestions } from '../../data/module1';
import { UserRole } from '../../types/platform';
import {
  Award,
  CheckCircle,
  RefreshCw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Shield,
  Lock,
} from '../icons/Icons';

interface StageQuizProps {
  userRole?: UserRole;
}

export function StageQuiz({ userRole = 'student' }: StageQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [revealedQuestions, setRevealedQuestions] = useState<Record<number, boolean>>({});
  const [showSummary, setShowSummary] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const selectedOptionIndex = userAnswers[currentQuestion.id];
  const isAnswered = selectedOptionIndex !== undefined;

  // Answer is revealed if instructor has toggled reveal, or if in teacher mode with active reveal
  const isRevealed = Boolean(revealedQuestions[currentQuestion.id]);

  const handleSelectOption = (optionIndex: number) => {
    // If student has already answered and locked, don't allow changing
    if (isAnswered && isRevealed) return;

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));
  };

  const handleToggleReveal = (qId: number) => {
    if (userRole !== 'teacher') return;
    setRevealedQuestions((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  const handleRevealAll = () => {
    if (userRole !== 'teacher') return;
    const all: Record<number, boolean> = {};
    quizQuestions.forEach((q) => {
      all[q.id] = true;
    });
    setRevealedQuestions(all);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setRevealedQuestions({});
    setShowSummary(false);
  };

  // Calculate score based on user answers
  const correctCount = Object.entries(userAnswers).filter(
    ([qId, ans]) => quizQuestions.find((q) => q.id === Number(qId))?.correctIndex === ans
  ).length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Quiz Header Bar */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles size={14} /> Classroom Knowledge Check
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Module 1 Review Challenge (10 Questions)
          </h2>
          <p className="text-zinc-400 text-sm mt-0.5">
            {userRole === 'teacher'
              ? 'Instructor Control Mode: You decide when to reveal the correct answer and explanation to the classroom.'
              : 'Select your answer choice. Your instructor will reveal the correct answers on the main classroom screen.'}
          </p>
        </div>

        {/* Live Status & Teacher Reveal Controls */}
        <div className="flex items-center flex-wrap gap-3">
          {userRole === 'teacher' && (
            <button
              onClick={handleRevealAll}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-colors flex items-center gap-1.5"
              title="Reveal all 10 answers at once"
            >
              <Eye size={14} />
              <span>Reveal All</span>
            </button>
          )}

          <div className="flex items-center gap-4 bg-zinc-950 px-5 py-2.5 rounded-xl border border-zinc-800">
            <div>
              <span className="text-zinc-500 text-xs uppercase block font-bold">Answered</span>
              <span className="text-white font-bold">
                {Object.keys(userAnswers).length} / {quizQuestions.length}
              </span>
            </div>
            <div className="h-8 w-px bg-zinc-800" />
            <div>
              <span className="text-zinc-500 text-xs uppercase block font-bold">Class Score</span>
              <span className="text-emerald-400 font-black">{correctCount} Correct</span>
            </div>
          </div>
        </div>
      </section>

      {/* Question Stepper Indicator */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {quizQuestions.map((q, idx) => {
          const isCurrent = idx === currentQuestionIndex;
          const ans = userAnswers[q.id];
          const hasAnswered = ans !== undefined;
          const isQRevealed = Boolean(revealedQuestions[q.id]);
          const isCorrect = hasAnswered && ans === q.correctIndex;

          return (
            <button
              key={q.id}
              onClick={() => {
                setCurrentQuestionIndex(idx);
                setShowSummary(false);
              }}
              className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center transition-all cursor-pointer border ${
                isCurrent
                  ? 'ring-2 ring-emerald-400 bg-emerald-500 text-zinc-950 border-emerald-300 font-black shadow-md'
                  : isQRevealed
                  ? isCorrect
                    ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                    : 'bg-rose-950/80 text-rose-400 border-rose-800'
                  : hasAnswered
                  ? 'bg-zinc-800 text-emerald-300 border-emerald-700/60'
                  : 'bg-zinc-800/80 text-zinc-400 border-zinc-700 hover:bg-zinc-700'
              }`}
              title={`Question ${idx + 1}`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Active Question Surface */}
      {!showSummary ? (
        <section className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border-2 border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-xl max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Question {currentQuestionIndex + 1} of {quizQuestions.length} — Topic: {currentQuestion.topic}
            </span>

            {/* Answer State Pill */}
            <div className="flex items-center gap-2">
              {userRole === 'teacher' ? (
                <button
                  onClick={() => handleToggleReveal(currentQuestion.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                    isRevealed
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-600/60 hover:bg-emerald-900/60'
                      : 'bg-amber-950/60 text-amber-300 border-amber-600/60 hover:bg-amber-900/60 animate-pulse'
                  }`}
                  title="Click to reveal or hide answer to class"
                >
                  {isRevealed ? (
                    <>
                      <EyeOff size={14} />
                      <span>Hide Answer</span>
                    </>
                  ) : (
                    <>
                      <Eye size={14} />
                      <span>Reveal Answer to Class</span>
                    </>
                  )}
                </button>
              ) : (
                <span className="text-xs font-bold text-zinc-400 flex items-center gap-1">
                  {isRevealed ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Eye size={13} /> Answer Revealed
                    </span>
                  ) : (
                    <span className="text-zinc-500 flex items-center gap-1">
                      <Lock size={12} /> Instructor Controls Answer
                    </span>
                  )}
                </span>
              )}
            </div>
          </div>

          <h3 className="text-xl sm:text-3xl font-extrabold text-white leading-snug">
            {currentQuestion.question}
          </h3>

          {/* 4 Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentQuestion.options.map((option, optIdx) => {
              const optionLabel = String.fromCharCode(65 + optIdx); // A, B, C, D
              const isSelected = selectedOptionIndex === optIdx;
              const isCorrectOption = optIdx === currentQuestion.correctIndex;

              let style = 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700';

              if (isRevealed) {
                // If instructor has revealed answer
                if (isCorrectOption) {
                  style =
                    'bg-emerald-500/20 text-emerald-300 border-emerald-500 ring-2 ring-emerald-500 font-bold';
                } else if (isSelected && !isCorrectOption) {
                  style =
                    'bg-rose-500/20 text-rose-300 border-rose-500 ring-2 ring-rose-500';
                } else {
                  style = 'bg-zinc-900/60 text-zinc-500 border-zinc-800 opacity-60';
                }
              } else if (isSelected) {
                // Not revealed, but selected by student/class
                style =
                  'bg-emerald-950/70 text-emerald-300 border-emerald-500/80 ring-2 ring-emerald-500/50 font-bold';
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={isRevealed}
                  className={`p-4 rounded-xl text-left border transition-all flex items-start gap-3 cursor-pointer text-sm sm:text-base ${style}`}
                >
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 ${
                      isRevealed && isCorrectOption
                        ? 'bg-emerald-500 text-zinc-950'
                        : isRevealed && isSelected
                        ? 'bg-rose-500 text-white'
                        : isSelected
                        ? 'bg-emerald-500 text-zinc-950'
                        : 'bg-zinc-700 text-zinc-200'
                    }`}
                  >
                    {optionLabel}
                  </span>
                  <span className="flex-1 font-medium">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Student Mode Waiting Banner */}
          {!isRevealed && isAnswered && userRole === 'student' && (
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-400 flex items-center gap-2.5">
              <span className="text-base">🔒</span>
              <span>
                Your answer is marked! The instructor will reveal the correct answer and explanation to the class when everyone is ready.
              </span>
            </div>
          )}

          {/* Teacher Mode Prompt when answer not revealed */}
          {!isRevealed && userRole === 'teacher' && (
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-600/40 text-xs sm:text-sm text-amber-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-amber-400 shrink-0" />
                <span>
                  <strong>Teacher Mode:</strong> Answers are currently hidden from students. Click &quot;Reveal Answer to Class&quot; when ready.
                </span>
              </div>
              <button
                onClick={() => handleToggleReveal(currentQuestion.id)}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shrink-0 transition-colors"
              >
                Reveal Answer Now
              </button>
            </div>
          )}

          {/* Answer Explanation Box (Shown when revealed) */}
          {isRevealed && (
            <div
              className={`p-5 rounded-xl border text-sm sm:text-base space-y-2 animate-in fade-in ${
                selectedOptionIndex === currentQuestion.correctIndex
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                  : 'bg-zinc-950 border-amber-500/40 text-zinc-200'
              }`}
            >
              <div className="font-bold flex items-center gap-2">
                <CheckCircle size={18} className="text-emerald-400" />
                <span>
                  Correct Answer: Option {String.fromCharCode(65 + currentQuestion.correctIndex)} (
                  {currentQuestion.options[currentQuestion.correctIndex]})
                </span>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Stepper Buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold border transition-colors cursor-pointer ${
                currentQuestionIndex === 0
                  ? 'bg-zinc-800/40 text-zinc-600 border-zinc-800 cursor-not-allowed'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700'
              }`}
            >
              <ChevronLeft size={16} />
              <span>Previous Question</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition-colors cursor-pointer shadow-md"
            >
              <span>
                {currentQuestionIndex < quizQuestions.length - 1
                  ? 'Next Question'
                  : 'View Results'}
              </span>
              <ChevronRight size={16} />
            </button>
          </div>
        </section>
      ) : (
        /* Summary Screen */
        <section className="bg-zinc-900 border-2 border-emerald-500/30 rounded-2xl p-8 max-w-xl mx-auto text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <Award size={44} />
          </div>

          <div>
            <h3 className="text-2xl sm:text-4xl font-black text-white">
              Quiz Completed!
            </h3>
            <p className="text-zinc-300 text-base mt-2">
              Outstanding effort! The class reviewed all 10 foundational concepts of Module 1.
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 inline-block w-full max-w-sm">
            <span className="text-xs uppercase font-bold text-zinc-400">Final Class Score</span>
            <div className="text-5xl font-black text-emerald-400 mt-2">
              {correctCount} / {quizQuestions.length}
            </div>
            <div className="text-xs text-zinc-400 mt-2 font-medium">
              {correctCount >= 8
                ? '🌟 Excellent Mastery of Computer Basics!'
                : correctCount >= 5
                ? '👍 Good Progress! Ready for Module 2.'
                : '📚 Good First Try! Review definitions and IPOS cycle.'}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleReset}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm transition-colors cursor-pointer border border-zinc-700"
            >
              <RefreshCw size={16} />
              <span>Restart Quiz for Next Class</span>
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
