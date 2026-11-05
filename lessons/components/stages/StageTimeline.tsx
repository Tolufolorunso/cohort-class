'use client';

import React, { useState } from 'react';
import { timelineEvents, module1ImageCards } from '../../data/module1';
import { Sparkles, ArrowRight, Award } from '../icons/Icons';
import { EducationalImage } from '../presentation/EducationalImage';

const FIVE_GENERATIONS = [
  {
    gen: '1st Generation (1940–1956)',
    component: 'Vacuum Tubes',
    icon: '💡',
    desc: 'Room-sized machines, consumed massive electricity, generated extreme heat, broke down frequently (e.g. ENIAC, UNIVAC).',
  },
  {
    gen: '2nd Generation (1956–1963)',
    component: 'Transistors',
    icon: '⚡',
    desc: 'Replaced vacuum tubes; made computers 100x smaller, faster, cheaper, and far more energy-efficient.',
  },
  {
    gen: '3rd Generation (1964–1971)',
    component: 'Integrated Circuits (ICs)',
    icon: '🔲',
    desc: 'Combined hundreds of microscopic transistors on a single silicon chip; introduced keyboards and monitors.',
  },
  {
    gen: '4th Generation (1971–Present)',
    component: 'Microprocessors (VLSI/ULSI)',
    icon: '💻',
    desc: 'Entire CPU placed on a single microchip; made Personal Computers (PCs), laptops, and smartphones accessible to all.',
  },
  {
    gen: '5th Generation (Present & Beyond)',
    component: 'Artificial Intelligence (AI)',
    icon: '🤖',
    desc: 'Voice recognition, robotics, autonomous vehicles, neural networks, and quantum computing systems.',
  },
];

export function StageTimeline() {
  const [selectedEventId, setSelectedEventId] = useState(timelineEvents[0].id);

  const activeIndex = timelineEvents.findIndex((e) => e.id === selectedEventId);
  const activeEvent = timelineEvents[activeIndex >= 0 ? activeIndex : 0];

  const abacusImage = module1ImageCards.find((c) => c.id === 'history-abacus') || {
    id: 'history-abacus',
    title: 'The Ancient Wooden Abacus',
    caption: 'Humanity’s earliest bead-sliding calculator, invented thousands of years ago in Mesopotamia and Asia.',
    url: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=800&q=80',
    fallbackType: 'abacus' as const,
    badge: 'Ancient Roots',
  };

  const babbageImage = module1ImageCards.find((c) => c.id === 'history-babbage') || {
    id: 'history-babbage',
    title: 'Charles Babbage’s Mechanical Engines',
    caption: 'The Difference and Analytical Engines introduced the world’s first concept of a programmable general computer.',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    fallbackType: 'babbage' as const,
    badge: 'Father of Computers',
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Header */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles size={14} /> Lesson 2: History & Evolution of Computing
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-white">
            From Sliding Beads to Silicon Microchips
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-2 leading-relaxed">
            Computers did not appear overnight. Humans spent thousands of years inventing mechanical tools to accelerate counting, calculate taxes, and eliminate mathematical mistakes.
          </p>
        </div>
      </section>

      {/* Visual Artifacts */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EducationalImage
          src={abacusImage.url}
          alt={abacusImage.title}
          title={abacusImage.title}
          caption={abacusImage.caption}
          fallbackType={abacusImage.fallbackType}
          badge={abacusImage.badge}
        />
        <EducationalImage
          src={babbageImage.url}
          alt={babbageImage.title}
          title={babbageImage.title}
          caption={babbageImage.caption}
          fallbackType={babbageImage.fallbackType}
          badge={babbageImage.badge}
        />
      </section>

      {/* Interactive Horizontal Timeline Cards */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-black text-white">Pioneering Inventions That Shaped Modern Computing</h3>
          <p className="text-zinc-400 text-sm">Select an invention below to study its inventor, mechanism, and historical significance.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {timelineEvents.map((event) => {
            const isSelected = event.id === selectedEventId;
            return (
              <button
                key={event.id}
                onClick={() => setSelectedEventId(event.id)}
                className={`p-4 rounded-2xl text-left transition-all border cursor-pointer flex flex-col justify-between ${
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
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-2 border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-xl">
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

            <div className="bg-zinc-800/80 border border-zinc-700/60 rounded-2xl px-4 py-2.5 max-w-sm">
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

              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <Award size={16} /> Why This Changed Computing History
                </div>
                <p className="text-sm sm:text-base text-zinc-300 mt-1 font-medium">
                  {activeEvent.significance}
                </p>
              </div>
            </div>

            {/* Stepper Navigation */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-zinc-400 uppercase">Classroom Discussion Prompt</span>
                <p className="text-sm text-zinc-300 mt-2 italic">
                  &quot;Imagine calculating 50 multi-digit numbers by hand on paper vs. using {activeEvent.title}. How did this tool save time and prevent costly arithmetic errors?&quot;
                </p>
              </div>

              <button
                onClick={() => {
                  const nextIdx = (activeIndex + 1) % timelineEvents.length;
                  setSelectedEventId(timelineEvents[nextIdx].id);
                }}
                className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm transition-all cursor-pointer shadow-md"
              >
                <span>Next Invention</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* The 5 Generations of Electronic Computers */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
              Lesson 2: Electronic Milestones
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              The 5 Generations of Modern Electronic Computers
            </h3>
          </div>
          <span className="text-xs text-zinc-400 bg-zinc-800 px-3 py-1 rounded-full border border-zinc-700">
            Vacuum Tubes → Transistors → ICs → Microprocessors → AI
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
          {FIVE_GENERATIONS.map((gen, idx) => (
            <div
              key={idx}
              className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="text-2xl">{gen.icon}</div>
                <div className="text-xs font-black text-amber-400 uppercase tracking-wide mt-2">
                  {gen.gen}
                </div>
                <div className="text-base font-black text-white mt-0.5">
                  {gen.component}
                </div>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {gen.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
