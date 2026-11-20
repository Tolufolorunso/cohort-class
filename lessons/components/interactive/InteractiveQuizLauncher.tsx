'use client';

import React from 'react';
import Link from 'next/link';

interface InteractiveQuizLauncherProps {
  moduleId: string;
}

export function InteractiveQuizLauncher({ moduleId }: InteractiveQuizLauncherProps) {
  const modNum = moduleId.replace('module-', '');

  return (
    <div className="flex flex-col items-center justify-center text-center p-6 sm:p-8 bg-zinc-950/80 border border-emerald-500/40 rounded-2xl gap-5 my-auto shadow-2xl">
      <div className="relative">
        <span className="text-6xl sm:text-7xl">🎉</span>
        <span className="absolute -top-2 -right-2 text-2xl animate-bounce">⭐</span>
      </div>

      <div>
        <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-700/60 inline-block mb-2">
          Milestone Complete!
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Congratulations on Finishing Module {modNum}!
        </h2>
        <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mt-1 font-medium mx-auto">
          You have mastered this topic&apos;s presentation concepts and interactive laboratory challenges. Put your knowledge to the test in the live Quiz Arena!
        </p>
      </div>

      {/* 3 Quick Action Cards */}
      <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-lg">
        {/* Launch Quiz Arena */}
        <Link
          href={`/arena?scope=${moduleId}`}
          className="flex-1 min-w-[200px] px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-sm transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
        >
          <span>🎮</span>
          <span>Launch Quiz Arena</span>
        </Link>

        {/* View Copy Notes */}
        <Link
          href={`/notes/${moduleId}`}
          className="px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-bold text-xs transition-all flex items-center gap-1.5"
        >
          <span>📖</span>
          <span>Copy Notes</span>
        </Link>

        {/* View Homework Assignment */}
        <Link
          href={`/assignments/${moduleId}`}
          className="px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-bold text-xs transition-all flex items-center gap-1.5"
        >
          <span>✍️</span>
          <span>Homework</span>
        </Link>
      </div>
    </div>
  );
}
