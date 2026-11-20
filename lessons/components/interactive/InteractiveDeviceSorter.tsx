'use client';

import React, { useState } from 'react';
import { deviceItems } from '../../data/module1';
import { DeviceCategory } from '../../types/curriculum';

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
    desc: 'Stationary on desks, separate screen and keyboard.',
  },
  {
    id: 'laptop',
    name: 'Laptop Computer',
    icon: '💻',
    color: 'hover:border-emerald-500 hover:bg-emerald-950/40 text-emerald-300',
    desc: 'Portable clamshell with built-in battery and screen.',
  },
  {
    id: 'smartphone',
    name: 'Smartphone / Tablet',
    icon: '📱',
    color: 'hover:border-amber-500 hover:bg-amber-950/40 text-amber-300',
    desc: 'Handheld touchscreen microcomputers in pockets.',
  },
  {
    id: 'supercomputer',
    name: 'Supercomputer',
    icon: '🏢',
    color: 'hover:border-purple-500 hover:bg-purple-950/40 text-purple-300',
    desc: 'Massive computational clusters for science & weather.',
  },
];

export function InteractiveDeviceSorter() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<DeviceCategory | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentItem = deviceItems[currentIndex];

  const handleClassify = (cat: DeviceCategory) => {
    setSelectedCategory(cat);
    if (cat === currentItem.category) {
      setIsCorrect(true);
      setScore((s) => s + 1);
    } else {
      setIsCorrect(false);
    }
  };

  const handleNext = () => {
    setSelectedCategory(null);
    setIsCorrect(null);
    if (currentIndex + 1 < deviceItems.length) {
      setCurrentIndex((idx) => idx + 1);
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
  };

  if (completed) {
    return (
      <div className="p-8 text-center bg-zinc-950/80 border border-emerald-500/40 rounded-2xl flex flex-col items-center justify-center gap-3 my-auto shadow-xl">
        <span className="text-5xl">🏆</span>
        <h3 className="text-xl font-black text-white">Classification Challenge Mastered!</h3>
        <p className="text-sm text-zinc-300 font-medium max-w-md">
          You correctly categorized <strong className="text-emerald-400">{score} of {deviceItems.length}</strong> real-world computing devices!
        </p>
        <button
          onClick={handleReset}
          className="mt-2 px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs transition-all shadow-md active:scale-95 cursor-pointer"
        >
          🔄 Try Challenge Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full my-auto">
      {/* Device Presentation Box */}
      <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-4">
          <span className="text-4xl p-2.5 rounded-2xl bg-zinc-900 border border-zinc-700">
            {CATEGORIES.find((c) => c.id === currentItem.category)?.icon || '💻'}
          </span>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[11px] font-mono text-zinc-500">
                Item {currentIndex + 1} of {deviceItems.length}
              </span>
              <span className="text-xs font-bold text-emerald-400">
                Score: {score}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">
              {currentItem.name}
            </h3>
            <p className="text-xs text-zinc-400">
              {currentItem.clues.join(' • ')}
            </p>
          </div>
        </div>

        {isCorrect !== null && (
          <button
            onClick={handleNext}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs transition-all shrink-0 cursor-pointer shadow-md"
          >
            Next Device →
          </button>
        )}
      </div>

      {/* 4 Classification Choice Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          let borderState = 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700';

          if (isSelected) {
            if (isCorrect) {
              borderState = 'border-emerald-500 bg-emerald-950/60 text-emerald-300 ring-2 ring-emerald-500/50';
            } else {
              borderState = 'border-red-500 bg-red-950/60 text-red-300 ring-2 ring-red-500/50';
            }
          }

          return (
            <button
              key={cat.id}
              onClick={() => !isCorrect && handleClassify(cat.id)}
              disabled={isCorrect !== null}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${borderState} ${cat.color}`}
            >
              <span className="text-2xl p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                {cat.icon}
              </span>
              <div>
                <span className="text-xs font-black block text-white tracking-wide">
                  {cat.name}
                </span>
                <span className="text-[11px] text-zinc-400">
                  {cat.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback banner */}
      {isCorrect !== null && (
        <div
          className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
            isCorrect
              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
              : 'bg-red-950/60 border-red-500/40 text-red-300'
          }`}
        >
          <span>{isCorrect ? '✅ Spot on!' : '❌ Not quite!'}</span>
          <span>
            {isCorrect
              ? `Correct! ${currentItem.name} is classified under ${selectedCategory}.`
              : `Incorrect. Look closely at size, portability, and power.`}
          </span>
        </div>
      )}
    </div>
  );
}
