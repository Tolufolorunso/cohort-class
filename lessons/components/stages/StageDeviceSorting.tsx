'use client';

import React, { useState } from 'react';
import { deviceItems, module1Info } from '../../data/module1';
import { DeviceCategory } from '../../types/curriculum';
import { TeacherGuideDrawer } from '../presentation/TeacherGuideDrawer';

const CATEGORIES: Array<{
  id: DeviceCategory;
  name: string;
  icon: string;
  color: string;
  desc: string;
}> = [
  {
    id: 'desktop',
    name: 'Desktop Computer',
    icon: '🖥️',
    color: 'hover:border-sky-500 hover:bg-sky-950/40 text-sky-300',
    desc: 'Stationary on desks, separate tower, screen, keyboard.',
  },
  {
    id: 'laptop',
    name: 'Laptop / Notebook',
    icon: '💻',
    color: 'hover:border-emerald-500 hover:bg-emerald-950/40 text-emerald-300',
    desc: 'Portable clamshell with rechargeable battery and touchpad.',
  },
  {
    id: 'smartphone',
    name: 'Smartphone / Tablet',
    icon: '📱',
    color: 'hover:border-amber-500 hover:bg-amber-950/40 text-amber-300',
    desc: 'Handheld touchscreen microcomputers in pockets and bags.',
  },
  {
    id: 'supercomputer',
    name: 'Supercomputer',
    icon: '🏢',
    color: 'hover:border-purple-500 hover:bg-purple-950/40 text-purple-300',
    desc: 'Massive warehouse clusters for weather forecasting and science.',
  },
];

export function StageDeviceSorting() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<DeviceCategory | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const stageMeta = module1Info.stages.find((s) => s.id === 'device-sorting');
  const teacherNotes = stageMeta?.teacherNotes;

  const currentItem = deviceItems[currentIndex];

  const handleClassify = (cat: DeviceCategory) => {
    setSelectedCategory(cat);
    if (cat === currentItem.category) {
      setIsCorrect(true);
      setScore((s) => s + 1);
      setFeedbackMessage(`🎉 Correct! ${currentItem.explanation}`);
    } else {
      setIsCorrect(false);
      setFeedbackMessage(
        `Not quite! Notice where this device is kept: Is it stationary on a desk, carried in a bag, held in hand, or filling a room?`
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
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 animate-fadeIn select-none">
      {/* 16:9 Presentation Slide Card */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md flex flex-col justify-between min-h-[500px]">
        {/* Slide Header */}
        <div className="border-b border-zinc-800/80 pb-4 mb-5">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-xs uppercase font-black tracking-wider px-2.5 py-1 rounded-full border bg-emerald-950/80 text-emerald-400 border-emerald-800/60">
              LESSON 3 • CLASSIFICATION LAB
            </span>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-zinc-300 bg-zinc-950 px-2.5 py-1 rounded-lg border border-zinc-800">
                Score: <strong className="text-emerald-400 font-mono">{score}</strong> / {deviceItems.length}
              </span>
              <span className="text-xs font-mono font-bold text-zinc-500">
                STAGE 04 / 06
              </span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Device Classification Lab
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-1 font-medium">
            Test your knowledge: Sort modern computers by size, portability, and power.
          </p>
        </div>

        {/* Lab Content Area */}
        {!completed ? (
          <div className="space-y-5 my-auto">
            {/* Challenge Card */}
            <div className="bg-zinc-950/80 border-2 border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-inner flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-3xl shrink-0">
                  ❓
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                    Question {currentIndex + 1} of {deviceItems.length}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
                    {currentItem.name}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {currentItem.clues.map((clue, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 text-[11px]"
                      >
                        🔍 {clue}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Next Button after answering */}
              {selectedCategory && (
                <button
                  type="button"
                  onClick={handleNextItem}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  {currentIndex < deviceItems.length - 1 ? 'Next Device ➔' : 'View Results 🏆'}
                </button>
              )}
            </div>

            {/* Category Choices Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                let btnStyle = 'bg-zinc-950/60 border-zinc-800 text-zinc-300';

                if (isSelected) {
                  btnStyle = isCorrect
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-lg scale-105'
                    : 'bg-rose-950/80 border-rose-500 text-rose-300 shadow-lg scale-105';
                }

                return (
                  <button
                    key={cat.id}
                    type="button"
                    disabled={selectedCategory !== null}
                    onClick={() => handleClassify(cat.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-left flex flex-col justify-between gap-1.5 ${btnStyle} ${
                      !selectedCategory ? cat.color : ''
                    }`}
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-white">
                        {cat.name}
                      </h4>
                      <p className="text-[10px] text-zinc-400 mt-0.5 leading-snug">
                        {cat.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feedback Banner */}
            {feedbackMessage && (
              <div
                className={`p-3.5 rounded-xl text-xs sm:text-sm border flex items-center justify-between gap-3 animate-fadeIn ${
                  isCorrect
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                    : 'bg-rose-950/60 border-rose-500 text-rose-200'
                }`}
              >
                <span>{feedbackMessage}</span>
                <span className="text-lg">{isCorrect ? '✅' : '❌'}</span>
              </div>
            )}
          </div>
        ) : (
          /* Completion Celebration Card */
          <div className="bg-zinc-950/90 border border-emerald-500/50 rounded-2xl p-8 text-center my-auto flex flex-col items-center gap-3">
            <span className="text-5xl">🏆 ⭐ 🎉</span>
            <h3 className="text-xl sm:text-2xl font-black text-emerald-300">
              Lab Complete! You scored {score} of {deviceItems.length}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-md">
              Excellent sorting! You know exactly how to tell a stationary desktop from a portable laptop, a handheld phone, and a supercomputer.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-2 px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs border border-zinc-700 cursor-pointer"
            >
              Try Again ↺
            </button>
          </div>
        )}

        {/* Footer Analogy */}
        <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
          <span>💡 Desktop = Deep Freezer (Stays home)</span>
          <span>💻 Laptop = Cooler Box (Travels with you)</span>
          <span>📱 Smartphone = Pocket Water Flask</span>
        </div>
      </div>

      {/* In-Slide Live Teacher Guide Drawer (Press 'T' or click button) */}
      <TeacherGuideDrawer teacherNotes={teacherNotes} />
    </div>
  );
}
