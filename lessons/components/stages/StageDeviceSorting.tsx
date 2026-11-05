'use client';

import React, { useState } from 'react';
import { deviceCategories, deviceItems } from '../../data/module1';
import { DeviceCategory } from '../../types/curriculum';
import { CheckCircle, RefreshCw, Sparkles } from '../icons/Icons';

export function StageDeviceSorting() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<DeviceCategory | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const currentItem = deviceItems[currentIndex];

  const handleClassify = (cat: DeviceCategory) => {
    setSelectedCategory(cat);
    if (cat === currentItem.category) {
      setIsCorrect(true);
      setScore((s) => s + 1);
      setFeedbackMessage(`Correct! ${currentItem.explanation}`);
    } else {
      setIsCorrect(false);
      setFeedbackMessage(
        `Not quite! Check the clues carefully: notice whether it is stationary, portable, handheld, or room-sized.`
      );
    }
  };

  const handleNextItem = () => {
    setSelectedCategory(null);
    setIsCorrect(null);
    setFeedbackMessage('');

    if (currentIndex < deviceItems.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedCategory(null);
    setIsCorrect(null);
    setScore(0);
    setCompleted(false);
    setFeedbackMessage('');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Header & Category Reference */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles size={14} /> Interactive Sorting Lab
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Device Classification Challenge
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-1">
              Read the device scenario and clues, then invite the class to vote on which category it belongs to!
            </p>
          </div>

          <div className="flex items-center gap-4 bg-zinc-950 px-4 py-2.5 rounded-xl border border-zinc-800 text-sm font-bold">
            <div>
              <span className="text-zinc-500 text-xs uppercase block">Progress</span>
              <span className="text-white">
                {currentIndex + 1} / {deviceItems.length}
              </span>
            </div>
            <div className="h-8 w-px bg-zinc-800" />
            <div>
              <span className="text-zinc-500 text-xs uppercase block">Score</span>
              <span className="text-emerald-400">{score} Points</span>
            </div>
          </div>
        </div>

        {/* Categories Reference Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4 pt-4 border-t border-zinc-800">
          {deviceCategories.map((c) => (
            <div key={c.id} className="bg-zinc-800/40 p-2.5 rounded-lg border border-zinc-700/40 text-xs">
              <div className="font-bold text-zinc-200">{c.name}</div>
              <div className="text-zinc-400 text-[11px] mt-0.5 line-clamp-2">{c.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Sorting Game Card */}
      {!completed ? (
        <section className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border-2 border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-xl max-w-4xl mx-auto space-y-6">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-bold uppercase tracking-wide border border-zinc-700">
              Mystery Device #{currentIndex + 1}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {currentItem.name}
            </h3>
          </div>

          {/* Clues Card */}
          <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Observation Clues:
            </div>
            <ul className="space-y-2">
              {currentItem.clues.map((clue, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-zinc-200">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <span>{clue}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Classification Options */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Which category does this device belong to?
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {deviceCategories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                let btnStyle = 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700';

                if (isSelected) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-500 text-zinc-950 font-black border-emerald-400 ring-2 ring-emerald-400';
                  } else {
                    btnStyle = 'bg-rose-500 text-white font-bold border-rose-400 ring-2 ring-rose-400';
                  }
                }

                return (
                  <button
                    key={cat.id}
                    onClick={() => handleClassify(cat.id)}
                    disabled={isCorrect === true}
                    className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer text-center ${btnStyle}`}
                  >
                    {cat.name.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Advance Button */}
          {feedbackMessage && (
            <div
              className={`p-4 rounded-xl border text-sm sm:text-base font-medium flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isCorrect
                  ? 'bg-emerald-500/10 border-emerald-400 text-emerald-300'
                  : 'bg-rose-500/10 border-rose-400 text-rose-300'
              }`}
            >
              <div>{feedbackMessage}</div>
              {isCorrect && (
                <button
                  onClick={handleNextItem}
                  className="px-5 py-2 rounded-lg bg-emerald-500 text-zinc-950 font-bold text-sm hover:bg-emerald-400 transition-colors cursor-pointer whitespace-nowrap self-end sm:self-auto"
                >
                  {currentIndex < deviceItems.length - 1 ? 'Next Device →' : 'View Results →'}
                </button>
              )}
            </div>
          )}
        </section>
      ) : (
        /* Completion Score Card */
        <section className="bg-zinc-900 border-2 border-emerald-500/30 rounded-2xl p-8 max-w-xl mx-auto text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle size={36} />
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Device Sorting Lab Completed!
            </h3>
            <p className="text-zinc-300 text-base mt-2">
              The class successfully categorized all 10 hardware targets across desktops, laptops, tablets, smartphones, and supercomputers.
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 inline-block px-8">
            <span className="text-xs uppercase font-bold text-zinc-400">Class Score</span>
            <div className="text-4xl font-black text-emerald-400 mt-1">
              {score} / {deviceItems.length}
            </div>
          </div>

          <div>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm transition-colors cursor-pointer border border-zinc-700"
            >
              <RefreshCw size={16} />
              <span>Restart Device Lab</span>
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
