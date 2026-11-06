'use client';

import React, { useState } from 'react';
import {
  byteScaleTiers,
  module2ImageCards,
  ByteScaleTier,
} from '../../data/module2';
import { EducationalImage } from '../presentation/EducationalImage';
import { BookOpen, Sparkles, Shield } from '../icons/Icons';

export function StageStorageBytes() {
  const [explanationMode, setExplanationMode] = useState<
    'simple' | 'bookish' | 'nigerian'
  >('simple');

  // Interactive Byte Scale Tier
  const [selectedTierId, setSelectedTierId] = useState<string>(
    byteScaleTiers[3].id // Default to Megabyte (MB)
  );
  const activeTier: ByteScaleTier =
    byteScaleTiers.find((t) => t.id === selectedTierId) || byteScaleTiers[3];

  // Interactive Capacity Calculator (Slider in GB)
  const [driveCapacityGB, setDriveCapacityGB] = useState<number>(32); // Default 32 GB flash drive

  // Real-world calculations:
  // 1 song = 4 MB (0.004 GB)
  // 1 smartphone photo = 3 MB (0.003 GB)
  // 1 HD Nollywood movie = 1.5 GB
  // 1 page school essay = 0.002 MB (0.000002 GB)
  const totalSongs = Math.floor((driveCapacityGB * 1024) / 4);
  const totalPhotos = Math.floor((driveCapacityGB * 1024) / 3);
  const totalMovies = (driveCapacityGB / 1.5).toFixed(1);

  const hddImage =
    module2ImageCards.find((c) => c.id === 'hard-disk-drive-hdd') ||
    module2ImageCards[9];

  const ssdImage =
    module2ImageCards.find((c) => c.id === 'solid-state-drive-ssd') ||
    module2ImageCards[10];

  const flashDriveImage =
    module2ImageCards.find((c) => c.id === 'usb-flash-drive') ||
    module2ImageCards[11];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Dual-Layer Language Mode Selector Bar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-2 flex flex-wrap items-center justify-between gap-2 shadow-lg">
        <div className="flex items-center gap-2 px-3 text-xs font-bold text-zinc-400">
          <BookOpen size={16} className="text-emerald-400" />
          <span>How would you like this explained?</span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => setExplanationMode('simple')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              explanationMode === 'simple'
                ? 'bg-emerald-500 text-zinc-950 shadow-md ring-1 ring-emerald-400'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <span>💡 In Simple English</span>
            <span className="text-[10px] opacity-80">(Recommended)</span>
          </button>
          <button
            type="button"
            onClick={() => setExplanationMode('bookish')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              explanationMode === 'bookish'
                ? 'bg-emerald-500 text-zinc-950 shadow-md ring-1 ring-emerald-400'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <span>🎓 Formal Bookish Definition</span>
            <span className="text-[10px] opacity-80">(WAEC / NECO)</span>
          </button>
          <button
            type="button"
            onClick={() => setExplanationMode('nigerian')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              explanationMode === 'nigerian'
                ? 'bg-emerald-500 text-zinc-950 shadow-md ring-1 ring-emerald-400'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <span>🍠 Nigerian Everyday Analogies</span>
          </button>
        </div>
      </div>

      {/* Hero: What is Computer Storage & RAM vs Storage */}
      <section className="bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Sparkles size={14} />
            <span>Lesson 4 · Permanent Memory &amp; The Digital Scale</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Computer Storage Devices &amp; The Byte Ladder
          </h2>

          {explanationMode === 'simple' && (
            <div className="space-y-3">
              <p className="text-base sm:text-lg text-emerald-300 font-semibold leading-relaxed">
                Storage means the permanent place where a computer keeps your files, school projects, pictures, and songs so they are never lost.
              </p>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                When you shut down your computer or when NEPA takes electricity, everything in temporary memory (RAM) vanishes. But everything saved to your storage drive (HDD or SSD) stays safe forever!
              </p>
            </div>
          )}

          {explanationMode === 'bookish' && (
            <div className="space-y-3">
              <p className="text-base sm:text-lg text-amber-300 font-serif italic leading-relaxed border-l-4 border-amber-500 pl-4">
                &ldquo;Computer storage devices constitute non-volatile secondary auxiliary memory capable of retaining data and machine instructions indefinitely without electrical power. In contrast, primary memory (RAM) is volatile and semiconductor-based.&rdquo;
              </p>
              <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-300 font-mono">
                WAEC / NECO Note: Primary Storage = Fast, volatile (RAM/ROM) | Secondary Storage = High capacity, non-volatile, magnetic/optical/solid-state (HDD, SSD, Flash).
              </div>
            </div>
          )}

          {explanationMode === 'nigerian' && (
            <div className="space-y-3">
              <p className="text-base sm:text-lg text-orange-300 font-semibold leading-relaxed">
                Think of your school study desk versus a heavy metal locker with a padlock!
              </p>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                <strong>RAM is your study desk:</strong> You can quickly open 3 exercise books on your desk to write your homework. But before closing school, the bell rings and the classroom is swept clean.
              </p>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                <strong>Storage is your locked school locker:</strong> You put your textbooks and notebooks inside, lock the padlock, and go home for holidays. Even after 3 months, your books are still exactly where you left them!
              </p>
            </div>
          )}
        </div>

        {/* Storage Devices Showdown: HDD vs SSD vs Flash */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          {/* HDD */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-inner">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 text-xl">💽</span>
                <h3 className="text-base sm:text-lg font-bold text-white">Hard Disk (HDD)</h3>
              </div>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-950/80 border border-amber-800 px-2 py-0.5 rounded-full">
                Magnetic
              </span>
            </div>
            <EducationalImage
              src={hddImage.url}
              alt={hddImage.title}
              title={hddImage.title}
              fallbackType={hddImage.fallbackType}
              badge="Traditional Drive"
              aspect="aspect-16/10"
            />
            <ul className="space-y-1.5 text-xs text-zinc-300">
              <li className="flex items-center gap-1.5">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Mechanism:</strong> Spinning metal platters.</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Speed:</strong> Moderate (~120 MB/s).</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Fragile:</strong> Sensitive to drops.</span>
              </li>
            </ul>
          </div>

          {/* SSD */}
          <div className="bg-zinc-950 border border-emerald-500/30 rounded-2xl p-5 space-y-4 shadow-inner">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 text-xl">⚡</span>
                <h3 className="text-base sm:text-lg font-bold text-white">Solid State (SSD)</h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded-full">
                Silicon Chips
              </span>
            </div>
            <EducationalImage
              src={ssdImage.url}
              alt={ssdImage.title}
              title={ssdImage.title}
              fallbackType={ssdImage.fallbackType}
              badge="Modern Flash"
              aspect="aspect-16/10"
            />
            <ul className="space-y-1.5 text-xs text-zinc-300">
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Mechanism:</strong> Silent silicon flash microchips.</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Speed:</strong> Ultra-fast (500+ MB/s).</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Durable:</strong> Zero moving mechanical parts.</span>
              </li>
            </ul>
          </div>

          {/* USB Flash Drive */}
          <div className="bg-zinc-950 border border-blue-500/30 rounded-2xl p-5 space-y-4 shadow-inner">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-blue-500/20 text-blue-400 text-xl">💾</span>
                <h3 className="text-base sm:text-lg font-bold text-white">USB Flash Drive</h3>
              </div>
              <span className="text-[10px] font-bold text-blue-400 bg-blue-950/80 border border-blue-800 px-2 py-0.5 rounded-full">
                Pocket Portable
              </span>
            </div>
            <EducationalImage
              src={flashDriveImage.url}
              alt={flashDriveImage.title}
              title={flashDriveImage.title}
              fallbackType={flashDriveImage.fallbackType}
              badge="Pocket Storage"
              aspect="aspect-16/10"
            />
            <ul className="space-y-1.5 text-xs text-zinc-300">
              <li className="flex items-center gap-1.5">
                <span className="text-blue-400 font-bold">•</span>
                <span><strong>Portability:</strong> Fits inside your school uniform pocket.</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-blue-400 font-bold">•</span>
                <span><strong>Capacity:</strong> Commonly 16 GB, 32 GB, 64 GB.</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-blue-400 font-bold">•</span>
                <span><strong>Transfer:</strong> Moves homework between laptops.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Byte Scale Ladder */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
              <span>Mathematical Scale of Memory</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              The Byte Conversion Ladder
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">
              Computers measure capacity in powers of 2. Click each step on the ladder to see its exact formula.
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 shrink-0">
            Bit &rarr; Byte &rarr; KB &rarr; MB &rarr; GB &rarr; TB
          </span>
        </div>

        {/* Step Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {byteScaleTiers.map((tier) => {
            const isSelected = tier.id === selectedTierId;
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => setSelectedTierId(tier.id)}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  isSelected
                    ? 'bg-purple-950/70 border-purple-500 shadow-md ring-2 ring-purple-500/30'
                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/40 text-zinc-400'
                }`}
              >
                <span className="text-2xl block mb-1">{tier.icon}</span>
                <span className="text-xs font-bold uppercase tracking-wider block text-white">
                  {tier.abbreviation}
                </span>
                <span className="text-[11px] text-zinc-400 font-medium truncate block">
                  {tier.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Tier Spotlight Card */}
        <div className="p-5 sm:p-7 rounded-2xl bg-zinc-950 border border-purple-500/40 shadow-inner">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{activeTier.icon}</span>
              <div>
                <h4 className="text-lg sm:text-xl font-black text-white">
                  {activeTier.name} ({activeTier.abbreviation})
                </h4>
                <span className="text-xs font-mono text-purple-400 font-bold">
                  {activeTier.exactEquivalent}
                </span>
              </div>
            </div>
            <div className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
              Formula: {activeTier.simpleFormula}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Everyday Analogy</span>
              <p className="text-zinc-200 font-medium">{activeTier.everydayAnalogy}</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Real-World Laboratory File</span>
              <p className="text-emerald-400 font-medium">{activeTier.realWorldExample}</p>
            </div>
          </div>
        </div>

        {/* Interactive Drive Capacity Estimator */}
        <div className="p-5 sm:p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <span>🧮</span> Interactive Laboratory Storage Calculator
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Drag the slider to choose a USB Flash Drive size and see how many songs, photos, and movies fit inside.
              </p>
            </div>
            <span className="text-sm font-black font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-xl">
              Capacity: {driveCapacityGB} Gigabytes (GB)
            </span>
          </div>

          {/* Range Slider */}
          <div className="space-y-2">
            <input
              type="range"
              min="4"
              max="128"
              step="4"
              value={driveCapacityGB}
              onChange={(e) => setDriveCapacityGB(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-zinc-500">
              <span>4 GB (Starter)</span>
              <span>16 GB (Standard)</span>
              <span>32 GB (Popular)</span>
              <span>64 GB (Large)</span>
              <span>128 GB (Max)</span>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
              <span className="text-2xl block mb-1">🎵</span>
              <span className="text-xs text-zinc-400 font-bold block uppercase">Afrobeat Songs (~4 MB each)</span>
              <span className="text-xl font-black text-emerald-400 font-mono mt-1 block">
                ~{totalSongs.toLocaleString()} songs
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
              <span className="text-2xl block mb-1">📸</span>
              <span className="text-xs text-zinc-400 font-bold block uppercase">Phone Photos (~3 MB each)</span>
              <span className="text-xl font-black text-blue-400 font-mono mt-1 block">
                ~{totalPhotos.toLocaleString()} photos
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
              <span className="text-2xl block mb-1">🎬</span>
              <span className="text-xs text-zinc-400 font-bold block uppercase">Full Movies (~1.5 GB each)</span>
              <span className="text-xl font-black text-purple-400 font-mono mt-1 block">
                ~{totalMovies} HD movies
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Laboratory Electrical Safety & Care Rules */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
          <Shield size={20} className="text-amber-400" />
          <h3 className="text-lg sm:text-xl font-black text-white">
            Classroom Hardware Care &amp; Electrical Safety Rules
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
            <span className="font-bold text-red-400 flex items-center gap-1.5">
              <span>🚫</span> 1. No Liquids Near Computers
            </span>
            <p className="text-zinc-300 leading-relaxed">
              Never bring pure water sachets, soft drinks, or tea near laboratory desks. Liquid spills cause catastrophic short circuits that burn motherboards.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
            <span className="font-bold text-amber-400 flex items-center gap-1.5">
              <span>⚡</span> 2. NEPA Surge &amp; UPS Protection
            </span>
            <p className="text-zinc-300 leading-relaxed">
              When public power drops or surges unexpectedly, voltage spikes can fry power supplies. Always use stabilizers and UPS battery backups.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
            <span className="font-bold text-emerald-400 flex items-center gap-1.5">
              <span>🔄</span> 3. Proper Windows Shutdown
            </span>
            <p className="text-zinc-300 leading-relaxed">
              Always click <em>Start &rarr; Power &rarr; Shut Down</em>. Never yank the plug from the wall; sudden shutoff can corrupt hard drive data tables!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
