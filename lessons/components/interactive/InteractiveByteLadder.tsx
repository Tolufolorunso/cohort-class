'use client';

import React, { useState } from 'react';

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
    realWorldExample: '1 high-quality MP3 song or 1 smartphone photo.',
    icon: '🎵',
  },
  {
    id: 'gigabyte',
    name: 'Gigabyte',
    abbreviation: 'GB',
    exactSize: '1,024 MB',
    realWorldExample: '1 full-length HD movie or 250 songs.',
    icon: '🎬',
  },
  {
    id: 'terabyte',
    name: 'Terabyte',
    abbreviation: 'TB',
    exactSize: '1,024 GB',
    realWorldExample: 'Every book in a school library or 500 HD movies.',
    icon: '🏢',
  },
];

export function InteractiveByteLadder() {
  const [selectedTierIndex, setSelectedTierIndex] = useState(2); // default Kilobyte
  const [flashDriveGb, setFlashDriveGb] = useState(32);

  const activeTier = BYTE_TIERS[selectedTierIndex];
  const photosCount = flashDriveGb * 250;
  const songsCount = flashDriveGb * 200;
  const moviesCount = Math.floor(flashDriveGb / 2);

  return (
    <div className="flex flex-col gap-5 w-full my-auto">
      {/* 6-Level Byte Ladder Tabs */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {BYTE_TIERS.map((tier, idx) => {
          const isSelected = idx === selectedTierIndex;
          return (
            <button
              key={tier.id}
              onClick={() => setSelectedTierIndex(idx)}
              className={`p-2.5 rounded-xl text-center transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-amber-500 text-zinc-950 border-amber-400 font-black shadow-md scale-105'
                  : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700 text-zinc-400'
              }`}
            >
              <div className="text-xl mb-0.5">{tier.icon}</div>
              <div className="text-xs font-black">{tier.abbreviation}</div>
              <div className="text-[10px] font-mono opacity-80">{tier.name.split(' ')[0]}</div>
            </button>
          );
        })}
      </div>

      {/* Selected Tier Spotlight */}
      <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-4">
          <span className="text-4xl p-2.5 rounded-2xl bg-zinc-900 border border-zinc-700 text-white">
            {activeTier.icon}
          </span>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-950 text-amber-400 border border-amber-800/60">
                Tier {selectedTierIndex + 1} of 6
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                {activeTier.exactSize}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">
              {activeTier.name} ({activeTier.abbreviation})
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-medium">
              👉 Real-World Example: {activeTier.realWorldExample}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Flash Drive Capacity Slider */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-zinc-950 to-zinc-900 border border-zinc-800">
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">💾</span>
            <span className="text-xs font-bold text-white">
              Flash Drive Capacity Calculator:
            </span>
          </div>
          <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold">
            {flashDriveGb} GB Flash Drive
          </span>
        </div>

        <input
          type="range"
          min={4}
          max={128}
          step={4}
          value={flashDriveGb}
          onChange={(e) => setFlashDriveGb(Number(e.target.value))}
          className="w-full accent-emerald-500 cursor-pointer h-2 bg-zinc-800 rounded-lg mb-3"
        />

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <span className="text-emerald-400 font-black block text-sm">~{photosCount}</span>
            <span className="text-[11px] text-zinc-400">Photos</span>
          </div>
          <div className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <span className="text-sky-400 font-black block text-sm">~{songsCount}</span>
            <span className="text-[11px] text-zinc-400">Songs</span>
          </div>
          <div className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <span className="text-purple-400 font-black block text-sm">~{moviesCount}</span>
            <span className="text-[11px] text-zinc-400">HD Movies</span>
          </div>
        </div>
      </div>
    </div>
  );
}
