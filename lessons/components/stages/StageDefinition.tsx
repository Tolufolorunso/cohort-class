'use client';

import React, { useState } from 'react';
import {
  computerCharacteristics,
  calculatorVsComputer,
  module1ImageCards,
} from '../../data/module1';
import { Cpu, Monitor, CheckCircle, Sparkles } from '../icons/Icons';
import { EducationalImage } from '../presentation/EducationalImage';

export function StageDefinition() {
  const [selectedTraitId, setSelectedTraitId] = useState(
    computerCharacteristics[0].id
  );

  const activeTrait =
    computerCharacteristics.find((t) => t.id === selectedTraitId) ||
    computerCharacteristics[0];

  const desktopImage = module1ImageCards.find((c) => c.id === 'classroom-desktop') || {
    id: 'classroom-desktop',
    title: 'Modern Desktop Computer Setup',
    caption: 'A complete desktop workstation with monitor, system unit, keyboard, and mouse used in classroom computer labs.',
    url: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80',
    fallbackType: 'desktop' as const,
    badge: 'Hardware Station',
  };

  const tabletImage = module1ImageCards.find((c) => c.id === 'tablet-education') || {
    id: 'tablet-education',
    title: 'Interactive Digital Tablet',
    caption: 'Touchscreen computing device ideal for interactive reading, diagram drawing, and educational quizzes.',
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    fallbackType: 'tablet' as const,
    badge: 'Touch Computing',
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Definition Card for Projector */}
      <section className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 rounded-3xl border-2 border-emerald-500/30 p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Cpu size={160} />
        </div>

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={14} /> Lesson 1: Core Universal Definition
          </div>

          <h2 className="text-xl sm:text-3xl font-extrabold text-white leading-relaxed">
            A <span className="text-emerald-400 underline decoration-emerald-500/50 underline-offset-4">computer</span> is an electronic machine that accepts raw{' '}
            <span className="text-amber-400 font-bold">Data (Input)</span>,{' '}
            <span className="text-sky-400 font-bold">Processes</span> it at high speed following stored instructions, produces meaningful{' '}
            <span className="text-emerald-400 font-bold">Information (Output)</span>, and{' '}
            <span className="text-purple-400 font-bold">Stores</span> it for future use.
          </h2>

          {/* Golden Memory Rule Pill */}
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono font-bold text-xs sm:text-sm">
            <span>💡 MEMORY FORMULA:</span>
            <span className="text-white">RECEIVES → WORKS → SHOWS → STORES</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
            <div className="bg-zinc-800/80 rounded-2xl p-4 border border-zinc-700/60">
              <div className="text-emerald-400 font-bold text-sm">1. Electronic Device</div>
              <p className="text-xs text-zinc-300 mt-1">Runs on electric power and billions of microscopic transistors.</p>
            </div>
            <div className="bg-zinc-800/80 rounded-2xl p-4 border border-zinc-700/60">
              <div className="text-sky-400 font-bold text-sm">2. Multi-Purpose</div>
              <p className="text-xs text-zinc-300 mt-1">Unlike a calculator, it can write books, design graphics, and play music.</p>
            </div>
            <div className="bg-zinc-800/80 rounded-2xl p-4 border border-zinc-700/60">
              <div className="text-purple-400 font-bold text-sm">3. Programmable</div>
              <p className="text-xs text-zinc-300 mt-1">Follows step-by-step software programs created by human coders.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Educational Cards Side-by-Side */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EducationalImage
          src={desktopImage.url}
          alt={desktopImage.title}
          title={desktopImage.title}
          caption={desktopImage.caption}
          fallbackType={desktopImage.fallbackType}
          badge={desktopImage.badge}
        />
        <EducationalImage
          src={tabletImage.url}
          alt={tabletImage.title}
          title={tabletImage.title}
          caption={tabletImage.caption}
          fallbackType={tabletImage.fallbackType}
          badge={tabletImage.badge}
        />
      </section>

      {/* Data vs Information Pedagogical Spotlight */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-sky-400">
          <Sparkles size={16} /> Fundamental Concept
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-white">
          Data vs. Information: What is the Difference?
        </h3>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Before a computer can show anything useful, it must turn raw facts into organized, meaningful results.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-zinc-950 p-5 rounded-2xl border border-amber-500/30 space-y-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
              RAW DATA (Unprocessed Facts)
            </span>
            <p className="text-sm text-zinc-300">
              Raw figures or isolated symbols without context.
            </p>
            <div className="bg-zinc-900 p-3 rounded-xl font-mono text-sm text-amber-400 border border-zinc-800">
              45, 60, &quot;Tolu&quot;, &quot;Math&quot;, &quot;English&quot;
            </div>
            <p className="text-xs text-zinc-400 italic">
              These raw numbers alone do not tell us if the student passed, failed, or what term it was.
            </p>
          </div>

          <div className="bg-zinc-950 p-5 rounded-2xl border border-emerald-500/30 space-y-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              PROCESSED INFORMATION (Meaningful Results)
            </span>
            <p className="text-sm text-zinc-300">
              Data organized and calculated so that humans can make informed decisions.
            </p>
            <div className="bg-zinc-900 p-3 rounded-xl font-mono text-sm text-emerald-400 border border-zinc-800">
              Student: Tolu | Total Score: 105 / 200 | Average: 52.5% (Passed)
            </div>
            <p className="text-xs text-zinc-400 italic">
              Now parents and teachers can understand exactly how Tolu performed in school!
            </p>
          </div>
        </div>
      </section>

      {/* 5 Core Characteristics Interactive Explorer */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>5 Superpower Characteristics of Computers</span>
          </h3>
          <p className="text-zinc-400 text-sm sm:text-base">
            Click each characteristic to reveal how computers outperform manual human effort in everyday tasks.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
          {computerCharacteristics.map((trait) => {
            const isSelected = trait.id === selectedTraitId;
            return (
              <button
                key={trait.id}
                onClick={() => setSelectedTraitId(trait.id)}
                className={`p-3.5 sm:p-4 rounded-2xl text-left transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500/10 border-emerald-400 text-emerald-300 shadow-md ring-1 ring-emerald-400'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800/60'
                }`}
              >
                <div className="text-xs uppercase font-bold text-zinc-400">{trait.tagline}</div>
                <div className="text-base sm:text-lg font-bold mt-1 text-white">{trait.title}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Trait Detail Spotlight */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 sm:p-6 shadow-md flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <CheckCircle size={16} /> Selected Superpower
            </div>
            <h4 className="text-2xl sm:text-3xl font-black text-white">
              {activeTrait.title}
            </h4>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              {activeTrait.description}
            </p>
          </div>

          <div className="w-full md:w-80 bg-zinc-950 border border-zinc-800 rounded-2xl p-4">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wide">
              Real-World Classroom Example
            </div>
            <p className="text-sm font-medium text-zinc-200 mt-2">
              &quot;{activeTrait.realWorldExample}&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Classroom Discussion: Calculator vs. Computer */}
      <section className="bg-zinc-900 rounded-3xl border border-zinc-800 p-5 sm:p-6 space-y-4 shadow-lg">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Monitor size={22} className="text-sky-400" />
            <span>Classroom Comparison: Is a Calculator a Computer?</span>
          </h3>
          <p className="text-zinc-400 text-sm sm:text-base">
            A calculator is a dedicated single-purpose device. Here is why modern computers belong to an entirely different class of technology:
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm sm:text-base border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-xs font-bold text-zinc-400 uppercase tracking-wider">
                <th className="py-3 px-4">Feature / Aspect</th>
                <th className="py-3 px-4 text-amber-400">Standard Calculator</th>
                <th className="py-3 px-4 text-emerald-400">Modern Computer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-medium">
              {calculatorVsComputer.map((row, i) => (
                <tr key={i} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-zinc-200">{row.aspect}</td>
                  <td className="py-3.5 px-4 text-zinc-400">{row.calculator}</td>
                  <td className="py-3.5 px-4 text-emerald-300 font-semibold">{row.computer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

