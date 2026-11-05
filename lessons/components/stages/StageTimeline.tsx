'use client';

import React, { useState } from 'react';
import { timelineEvents } from '../../data/module1';
import { Sparkles, ArrowRight, Award } from '../icons/Icons';

export function StageTimeline() {
  const [selectedEventId, setSelectedEventId] = useState(timelineEvents[0].id);

  const activeIndex = timelineEvents.findIndex((e) => e.id === selectedEventId);
  const activeEvent = timelineEvents[activeIndex >= 0 ? activeIndex : 0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Header */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles size={14} /> Historical Milestones
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            From Sliding Beads to Silicon Microchips
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-1">
            Computers did not appear overnight. Humans spent thousands of years inventing mechanical tools to accelerate counting, calculate taxes, and eliminate mathematical mistakes.
          </p>
        </div>
      </section>

      {/* Interactive Horizontal Timeline Cards */}
      <section className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {timelineEvents.map((event) => {
            const isSelected = event.id === selectedEventId;
            return (
              <button
                key={event.id}
                onClick={() => setSelectedEventId(event.id)}
                className={`p-4 rounded-xl text-left transition-all border cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-400 ring-2 ring-amber-500/30 text-amber-300 shadow-lg scale-[1.02]'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    {event.period}
                  </div>
                  <div className="text-base sm:text-lg font-black mt-1 text-white">
                    {event.title}
                  </div>
                </div>

                <div className="mt-4 text-xs font-semibold text-zinc-400">
                  {event.pioneer}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Era Spotlight Card */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-2 border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
            <div>
              <span className="px-3 py-1 rounded-full bg-amber-500 text-zinc-950 text-xs font-black uppercase tracking-wider">
                {activeEvent.period}
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-white mt-2">
                {activeEvent.title}
              </h3>
              <p className="text-sm sm:text-base text-zinc-400 mt-1 font-medium">
                Pioneered by: <span className="text-amber-300 font-bold">{activeEvent.pioneer}</span>
              </p>
            </div>

            <div className="bg-zinc-800/80 border border-zinc-700/60 rounded-xl px-4 py-2.5 max-w-sm">
              <div className="text-xs font-bold text-zinc-400 uppercase">Core Mechanical Innovation:</div>
              <div className="text-sm font-bold text-amber-300 mt-0.5">{activeEvent.keyInnovation}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Historical Background & Design:
                </h4>
                <p className="text-base sm:text-lg text-zinc-200 mt-2 leading-relaxed">
                  {activeEvent.description}
                </p>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <Award size={16} /> Why This Changed Computing History
                </div>
                <p className="text-sm sm:text-base text-zinc-300 mt-1 font-medium">
                  {activeEvent.significance}
                </p>
              </div>
            </div>

            {/* Stepper Navigation */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-zinc-400 uppercase">Classroom Prompt</span>
                <p className="text-sm text-zinc-300 mt-2 italic">
                  &quot;Imagine performing 50 multiplications by hand on paper vs. using {activeEvent.title}. How did this tool save time and prevent costly arithmetic errors?&quot;
                </p>
              </div>

              <button
                onClick={() => {
                  const nextIdx = (activeIndex + 1) % timelineEvents.length;
                  setSelectedEventId(timelineEvents[nextIdx].id);
                }}
                className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm transition-all cursor-pointer shadow-md"
              >
                <span>Next Invention</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
