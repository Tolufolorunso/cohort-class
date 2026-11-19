'use client';

import React, { useState } from 'react';
import { module2Info } from '../../data/module2';
import { TeacherGuideDrawer } from '../presentation/TeacherGuideDrawer';

interface ByteTier {
  id: string;
  name: string;
  abbreviation: string;
  exactSize: string;
  realWorldExample: string;
  icon: string;
}

const BYTE_TIERS: ByteTier[] = [
  {
    id: 'bit',
    name: 'Bit (Binary Digit)',
    abbreviation: 'b',
    exactSize: '0 or 1',
    realWorldExample: 'A single electrical switch: ON (1) or OFF (0).',
    icon: '⚡',
  },
  {
    id: 'byte',
    name: 'Byte',
    abbreviation: 'B',
    exactSize: '8 Bits',
    realWorldExample: 'Stores 1 single keyboard letter (e.g., "A").',
    icon: '🔤',
  },
  {
    id: 'kilobyte',
    name: 'Kilobyte',
    abbreviation: 'KB',
    exactSize: '1,024 Bytes',
    realWorldExample: 'About 1 whole page of plain typed homework essay.',
    icon: '📄',
  },
  {
    id: 'megabyte',
    name: 'Megabyte',
    abbreviation: 'MB',
    exactSize: '1,024 KB',
    realWorldExample: '1 high-quality Afrobeat MP3 song or 1 smartphone photo.',
    icon: '🎵',
  },
  {
    id: 'gigabyte',
    name: 'Gigabyte',
    abbreviation: 'GB',
    exactSize: '1,024 MB',
    realWorldExample: '1 full-length HD Nollywood movie or 250 songs.',
    icon: '🎬',
  },
  {
    id: 'terabyte',
    name: 'Terabyte',
    abbreviation: 'TB',
    exactSize: '1,024 GB',
    realWorldExample: 'An entire school library archive or ~1,000 HD movies.',
    icon: '📚',
  },
];

export function StageStorageBytes() {
  const stageMeta = module2Info.stages.find((s) => s.id === 'storage-and-bytes');
  const teacherNotes = stageMeta?.teacherNotes;

  // Selected Byte Tier for inspection
  const [selectedTierId, setSelectedTierId] = useState<string>('megabyte');
  const activeTier =
    BYTE_TIERS.find((t) => t.id === selectedTierId) || BYTE_TIERS[3];

  // Capacity Calculator slider (in GB)
  const [driveCapacityGB, setDriveCapacityGB] = useState<number>(32);

  const songsCount = Math.floor((driveCapacityGB * 1024) / 4);
  const photosCount = Math.floor((driveCapacityGB * 1024) / 3);
  const moviesCount = (driveCapacityGB / 1.5).toFixed(1);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 animate-fadeIn select-none">
      {/* 16:9 Presentation Slide Card */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md flex flex-col justify-between min-h-[520px]">
        {/* Slide Header */}
        <div className="border-b border-zinc-800/80 pb-4 mb-4">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-xs uppercase font-black tracking-wider px-2.5 py-1 rounded-full border bg-emerald-950/80 text-emerald-400 border-emerald-800/60">
              LESSON 4 • STORAGE &amp; BYTE SCALE
            </span>
            <span className="text-xs font-mono font-bold text-zinc-500">
              STAGE 04 / 05
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Storage Drives &amp; The Byte Ladder
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-1 font-medium">
            Primary volatile memory vs. permanent storage, and digital capacity math.
          </p>
        </div>

        {/* 2 Big Clean Concept Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Card 1: RAM vs Storage */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800 flex flex-col justify-between gap-2">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xl">⚡</span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800/50">
                  Volatile vs. Non-Volatile
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Primary Memory vs. Secondary Storage
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed mt-1">
                <strong>RAM (Primary):</strong> Ultra-fast, temporary workspace. Everything vanishes if NEPA light cuts!
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                <strong>HDD/SSD (Secondary):</strong> Permanent storage. Keeps your homework, photos, and apps safe forever with power OFF.
              </p>
            </div>
          </div>

          {/* Card 2: HDD vs SSD */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800 flex flex-col justify-between gap-2">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xl">💽</span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                  Drive Physics
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Hard Disk (HDD) vs. Solid State (SSD)
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed mt-1">
                <strong>HDD (Magnetic):</strong> Spinning metallic platters and mechanical needle. High capacity at low cost, but sensitive to drops.
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                <strong>SSD (Electronic):</strong> Solid silicon memory chips with zero moving parts. 5× faster, silent, and drop-resistant!
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Byte Scale Ladder Strip */}
        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>🪜</span>
              <span>The Byte Scale Ladder (Click to Inspect):</span>
            </span>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {activeTier.name} ({activeTier.exactSize})
            </span>
          </div>

          {/* Ladder Button Row */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {BYTE_TIERS.map((tier) => {
              const isSelected = tier.id === selectedTierId;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedTierId(tier.id)}
                  className={`py-2 px-1.5 rounded-xl text-center text-xs font-bold transition-all cursor-pointer border flex flex-col items-center justify-center gap-0.5 ${
                    isSelected
                      ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow-md font-black'
                      : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <span className="text-base">{tier.icon}</span>
                  <span className="text-xs font-mono">{tier.abbreviation}</span>
                  <span className="text-[10px] opacity-75">{tier.exactSize}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tier Real-World Example */}
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs sm:text-sm text-zinc-300 flex items-center gap-3">
            <span className="text-2xl shrink-0">{activeTier.icon}</span>
            <p className="leading-snug">
              <strong>{activeTier.name}:</strong> {activeTier.realWorldExample}
            </p>
          </div>
        </div>

        {/* Interactive Flash Drive Capacity Calculator */}
        <div className="mt-3 p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-2.5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>💾</span>
              <span>Flash Drive Capacity Calculator:</span>
            </span>
            <span className="text-xs font-black font-mono text-amber-400">
              Capacity: {driveCapacityGB} GB Flash Drive
            </span>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="range"
              min="8"
              max="128"
              step="8"
              value={driveCapacityGB}
              onChange={(e) => setDriveCapacityGB(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-emerald-400 font-extrabold text-sm block">
                {songsCount.toLocaleString()}
              </span>
              <span className="text-zinc-400 text-[10px]">Afrobeat Songs (4MB)</span>
            </div>
            <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-blue-400 font-extrabold text-sm block">
                {photosCount.toLocaleString()}
              </span>
              <span className="text-zinc-400 text-[10px]">Camera Photos (3MB)</span>
            </div>
            <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-amber-400 font-extrabold text-sm block">
                {moviesCount}
              </span>
              <span className="text-zinc-400 text-[10px]">HD Movies (1.5GB)</span>
            </div>
          </div>
        </div>

        {/* Nigerian Everyday Analogy Callout */}
        <div className="mt-3 bg-gradient-to-r from-emerald-950/60 to-zinc-950 border border-emerald-500/40 rounded-2xl p-3.5 flex items-center gap-3">
          <span className="text-2xl shrink-0">🇳🇬</span>
          <p className="text-xs sm:text-sm text-emerald-200 font-semibold leading-snug">
            <strong>Relatable Nigerian Analogy:</strong> RAM is like the top of your school study desk: you spread your notebook and pencil to write quickly, but when the school bell rings, the desk is wiped clean. Your Hard Drive is the locked metal locker in the corner: you pack your textbooks inside, lock it, and when you return next term, everything is safe!
          </p>
        </div>
      </div>

      {/* In-Slide Live Teacher Guide Drawer (Press 'T' or click button) */}
      <TeacherGuideDrawer teacherNotes={teacherNotes} />
    </div>
  );
}
