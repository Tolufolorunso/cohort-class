'use client';

import React, { useState } from 'react';
import { ImageFallbackType } from '../../types/curriculum';

interface EducationalImageProps {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  fallbackType: ImageFallbackType;
  badge?: string;
  className?: string;
  aspect?: string;
}

export function EducationalImage({
  src,
  alt,
  title,
  caption,
  fallbackType,
  badge,
  className = '',
  aspect = 'aspect-video',
}: EducationalImageProps) {
  const [imageError, setImageError] = useState(false);
  const [preferSchematic, setPreferSchematic] = useState(false);

  // High quality vector SVG illustrations for offline / laboratory learning
  const renderFallbackSvg = () => {
    switch (fallbackType) {
      case 'desktop':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full bg-zinc-900 select-none">
            {/* Monitor */}
            <rect x="70" y="30" width="180" height="110" rx="8" fill="#18181b" stroke="#3b82f6" strokeWidth="3" />
            <rect x="80" y="40" width="160" height="90" rx="4" fill="#09090b" />
            <rect x="95" y="55" width="60" height="15" rx="3" fill="#10b981" opacity="0.8" />
            <rect x="95" y="78" width="130" height="8" rx="2" fill="#52525b" />
            <rect x="95" y="92" width="100" height="8" rx="2" fill="#52525b" />
            {/* Stand */}
            <rect x="150" y="140" width="20" height="25" fill="#3f3f46" />
            <rect x="130" y="165" width="60" height="8" rx="3" fill="#52525b" />
            {/* Keyboard */}
            <rect x="60" y="180" width="150" height="25" rx="4" fill="#27272a" stroke="#52525b" strokeWidth="1.5" />
            <line x1="70" y1="188" x2="200" y2="188" stroke="#71717a" strokeWidth="2" strokeDasharray="6,4" />
            <line x1="70" y1="196" x2="190" y2="196" stroke="#71717a" strokeWidth="2" strokeDasharray="8,4" />
            {/* Mouse */}
            <rect x="225" y="182" width="20" height="30" rx="10" fill="#27272a" stroke="#52525b" strokeWidth="1.5" />
            <line x1="235" y1="182" x2="235" y2="195" stroke="#71717a" strokeWidth="1.5" />
            {/* System Unit (Tower) */}
            <rect x="270" y="35" width="65" height="160" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="2.5" />
            <circle cx="302" cy="55" r="8" fill="#10b981" />
            <rect x="282" y="75" width="40" height="12" rx="2" fill="#27272a" />
            <rect x="282" y="95" width="40" height="12" rx="2" fill="#27272a" />
            <rect x="285" y="145" width="35" height="35" rx="4" fill="#09090b" stroke="#3f3f46" strokeWidth="1" />
            <text x="200" y="225" fill="#a1a1aa" fontSize="12" textAnchor="middle" fontWeight="bold">
              DESKTOP COMPUTER (Workstation)
            </text>
          </svg>
        );

      case 'laptop':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full bg-zinc-900 select-none">
            {/* Laptop Screen */}
            <polygon points="100,50 300,50 280,150 120,150" fill="#18181b" stroke="#38bdf8" strokeWidth="3" />
            <polygon points="110,60 290,60 274,142 126,142" fill="#09090b" />
            <rect x="150" y="80" width="100" height="20" rx="4" fill="#38bdf8" opacity="0.6" />
            {/* Laptop Base */}
            <polygon points="70,165 330,165 300,150 100,150" fill="#27272a" stroke="#52525b" strokeWidth="2" />
            {/* Keyboard & Trackpad */}
            <rect x="120" y="152" width="160" height="7" rx="1" fill="#3f3f46" />
            <rect x="175" y="158" width="50" height="5" rx="1" fill="#52525b" />
            <text x="200" y="205" fill="#38bdf8" fontSize="13" textAnchor="middle" fontWeight="bold">
              PORTABLE LAPTOP (Mobile Learning)
            </text>
          </svg>
        );

      case 'tablet':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full bg-zinc-900 select-none">
            <rect x="110" y="35" width="180" height="150" rx="16" fill="#18181b" stroke="#a855f7" strokeWidth="3" />
            <rect x="122" y="47" width="156" height="126" rx="8" fill="#09090b" />
            <circle cx="200" cy="180" r="4" fill="#a855f7" />
            <rect x="140" y="70" width="80" height="15" rx="3" fill="#a855f7" opacity="0.7" />
            <rect x="140" y="95" width="120" height="8" rx="2" fill="#52525b" />
            <rect x="140" y="110" width="100" height="8" rx="2" fill="#52525b" />
            <text x="200" y="215" fill="#c084fc" fontSize="13" textAnchor="middle" fontWeight="bold">
              TOUCHSCREEN TABLET (Interactive Quiz)
            </text>
          </svg>
        );

      case 'smartphone':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full bg-zinc-900 select-none">
            <rect x="155" y="30" width="90" height="165" rx="18" fill="#18181b" stroke="#f59e0b" strokeWidth="3" />
            <rect x="162" y="42" width="76" height="141" rx="12" fill="#09090b" />
            <rect x="185" y="35" width="30" height="4" rx="2" fill="#3f3f46" />
            <rect x="172" y="60" width="56" height="30" rx="6" fill="#f59e0b" opacity="0.5" />
            <circle cx="200" cy="190" r="3" fill="#71717a" />
            <text x="200" y="220" fill="#fbbf24" fontSize="13" textAnchor="middle" fontWeight="bold">
              SMARTPHONE (Microcomputer in Your Pocket)
            </text>
          </svg>
        );

      case 'supercomputer':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full bg-zinc-900 select-none">
            {/* Server Racks */}
            <rect x="70" y="35" width="70" height="150" rx="4" fill="#18181b" stroke="#ef4444" strokeWidth="2" />
            <rect x="165" y="35" width="70" height="150" rx="4" fill="#18181b" stroke="#ef4444" strokeWidth="2" />
            <rect x="260" y="35" width="70" height="150" rx="4" fill="#18181b" stroke="#ef4444" strokeWidth="2" />
            {/* Blinking status LEDs */}
            {[50, 75, 100, 125, 150].map((y) => (
              <g key={y}>
                <line x1="80" y1={y} x2="130" y2={y} stroke="#3f3f46" strokeWidth="2" />
                <circle cx="85" cy={y} r="2" fill="#22c55e" />
                <line x1="175" y1={y} x2="225" y2={y} stroke="#3f3f46" strokeWidth="2" />
                <circle cx="180" cy={y} r="2" fill="#3b82f6" />
                <line x1="270" y1={y} x2="320" y2={y} stroke="#3f3f46" strokeWidth="2" />
                <circle cx="275" cy={y} r="2" fill="#ef4444" />
              </g>
            ))}
            <text x="200" y="215" fill="#f87171" fontSize="13" textAnchor="middle" fontWeight="bold">
              SUPERCOMPUTER (Massive Parallel Processing Racks)
            </text>
          </svg>
        );

      case 'ipos':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full bg-zinc-900 select-none">
            {/* 4 Circles representing IPOS */}
            {/* Input */}
            <circle cx="70" cy="100" r="35" fill="#0284c7" opacity="0.3" stroke="#38bdf8" strokeWidth="3" />
            <text x="70" y="98" fill="#e0f2fe" fontSize="13" textAnchor="middle" fontWeight="black">INPUT</text>
            <text x="70" y="114" fill="#7dd3fc" fontSize="9" textAnchor="middle">Keyboard</text>

            {/* Arrow 1 */}
            <path d="M 110 100 L 135 100" stroke="#facc15" strokeWidth="3" markerEnd="url(#arrow)" />

            {/* Processing */}
            <circle cx="170" cy="100" r="35" fill="#e11d48" opacity="0.3" stroke="#fb7185" strokeWidth="3" />
            <text x="170" y="98" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="black">PROCESS</text>
            <text x="170" y="114" fill="#f43f5e" fontSize="9" textAnchor="middle">CPU Brain</text>

            {/* Arrow 2 */}
            <path d="M 210 100 L 235 100" stroke="#facc15" strokeWidth="3" />

            {/* Output */}
            <circle cx="270" cy="100" r="35" fill="#16a34a" opacity="0.3" stroke="#4ade80" strokeWidth="3" />
            <text x="270" y="98" fill="#dcfce7" fontSize="12" textAnchor="middle" fontWeight="black">OUTPUT</text>
            <text x="270" y="114" fill="#86efac" fontSize="9" textAnchor="middle">Monitor</text>

            {/* Storage Box below */}
            <rect x="130" y="160" width="80" height="35" rx="8" fill="#9333ea" opacity="0.3" stroke="#c084fc" strokeWidth="3" />
            <text x="170" y="177" fill="#f3e8ff" fontSize="12" textAnchor="middle" fontWeight="black">STORAGE</text>
            <text x="170" y="190" fill="#d8b4fe" fontSize="9" textAnchor="middle">SSD / Drive</text>

            {/* Bidirectional arrows to storage */}
            <path d="M 170 140 L 170 155" stroke="#c084fc" strokeWidth="2.5" strokeDasharray="3,3" />

            <text x="200" y="222" fill="#fde047" fontSize="12" textAnchor="middle" fontWeight="bold">
              THE COMPUTER IPOS DATA CYCLE
            </text>
          </svg>
        );

      case 'abacus':
      case 'history':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full bg-zinc-900 select-none">
            {/* Wooden Frame */}
            <rect x="80" y="40" width="240" height="130" rx="8" fill="#451a03" stroke="#b45309" strokeWidth="4" />
            <rect x="92" y="52" width="216" height="106" rx="4" fill="#1c1917" />
            {/* Horizontal Divider */}
            <line x1="92" y1="85" x2="308" y2="85" stroke="#b45309" strokeWidth="3" />
            {/* 6 Vertical Rods with Beads */}
            {[115, 150, 185, 220, 255, 290].map((x, i) => (
              <g key={x}>
                <line x1={x} y1="52" x2={x} y2="158" stroke="#78716c" strokeWidth="2" />
                {/* Upper deck bead */}
                <ellipse cx={x} cy={i % 2 === 0 ? "65" : "75"} rx="10" ry="7" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
                {/* Lower deck beads */}
                <ellipse cx={x} cy="100" rx="10" ry="7" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
                <ellipse cx={x} cy="115" rx="10" ry="7" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
                <ellipse cx={x} cy="130" rx="10" ry="7" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
              </g>
            ))}
            <text x="200" y="200" fill="#fcd34d" fontSize="13" textAnchor="middle" fontWeight="bold">
              THE ANCIENT ABACUS (Slide-Bead Calculation)
            </text>
          </svg>
        );

      case 'safety':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full bg-zinc-900 select-none">
            {/* Warning Shield */}
            <polygon points="200,30 270,70 270,140 200,180 130,140 130,70" fill="#7f1d1d" stroke="#ef4444" strokeWidth="3" />
            {/* Glass with spilled water crossed out */}
            <circle cx="200" cy="105" r="35" fill="#450a0a" stroke="#f87171" strokeWidth="2" />
            <line x1="175" y1="80" x2="225" y2="130" stroke="#ef4444" strokeWidth="4" />
            <line x1="225" y1="80" x2="175" y2="130" stroke="#ef4444" strokeWidth="4" />
            <text x="200" y="112" fill="#ffffff" fontSize="22" textAnchor="middle" fontWeight="black">NO LIQUIDS</text>
            <text x="200" y="210" fill="#fca5a5" fontSize="13" textAnchor="middle" fontWeight="bold">
              LAB RULE: KEEP ALL DRINKS & LIQUIDS AWAY
            </text>
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full bg-zinc-900 select-none">
            <rect x="60" y="40" width="280" height="140" rx="12" fill="#18181b" stroke="#10b981" strokeWidth="2" />
            <circle cx="200" cy="110" r="30" fill="#065f46" />
            <text x="200" y="117" fill="#6ee7b7" fontSize="24" textAnchor="middle" fontWeight="black">ICT</text>
            <text x="200" y="210" fill="#6ee7b7" fontSize="13" textAnchor="middle" fontWeight="bold">
              EDUCATIONAL COMPUTING PLATFORM
            </text>
          </svg>
        );
    }
  };

  const showFallback = imageError || preferSchematic;

  return (
    <div className={`group relative bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl ${className}`}>
      {/* Top Header Pill */}
      {badge && (
        <div className="absolute top-3 left-3 z-20">
          <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-zinc-950/90 text-emerald-400 border border-emerald-500/40 backdrop-blur-md shadow-md">
            {badge}
          </span>
        </div>
      )}

      {/* Schematic / Photo Mode Toggle */}
      <div className="absolute top-3 right-3 z-20">
        <button
          type="button"
          onClick={() => setPreferSchematic((prev) => !prev)}
          className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-zinc-900/90 text-zinc-300 hover:text-white border border-zinc-700/80 backdrop-blur-md transition-all shadow-md cursor-pointer"
          title="Switch between Photo and Vector Schematic"
        >
          {preferSchematic ? '📷 Photo' : '📐 Diagram'}
        </button>
      </div>

      {/* Image or SVG Vector Canvas */}
      <div className={`w-full ${aspect} relative overflow-hidden flex items-center justify-center bg-zinc-900`}>
        {showFallback ? (
          renderFallbackSvg()
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={src}
            alt={alt}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        )}
      </div>

      {/* Title & Caption */}
      {(title || caption) && (
        <div className="p-4 sm:p-5 bg-zinc-900/95 border-t border-zinc-800 space-y-1">
          {title && <h4 className="text-base sm:text-lg font-black text-white">{title}</h4>}
          {caption && <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{caption}</p>}
        </div>
      )}
    </div>
  );
}