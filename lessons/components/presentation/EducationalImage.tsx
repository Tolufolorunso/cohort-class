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

      case 'motherboard':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full bg-zinc-900 select-none">
            {/* Mainboard PCB */}
            <rect x="50" y="25" width="300" height="175" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" />
            {/* Bus traces */}
            <path d="M 70 50 L 150 50 L 150 90 M 70 80 L 130 80 M 230 70 L 310 70 M 230 110 L 310 110 M 150 150 L 150 180 L 300 180" stroke="#facc15" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
            {/* CPU Socket */}
            <rect x="150" y="55" width="65" height="65" rx="4" fill="#18181b" stroke="#f59e0b" strokeWidth="2" />
            <rect x="160" y="65" width="45" height="45" fill="#27272a" />
            <text x="182" y="92" fill="#fbbf24" fontSize="10" textAnchor="middle" fontWeight="bold">CPU</text>
            {/* RAM Slots */}
            <rect x="235" y="45" width="10" height="85" rx="2" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1" />
            <rect x="252" y="45" width="10" height="85" rx="2" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1" />
            <text x="249" y="145" fill="#93c5fd" fontSize="9" textAnchor="middle">RAM SLOTS</text>
            {/* PCIe Slots */}
            <rect x="75" y="140" width="140" height="12" rx="2" fill="#18181b" stroke="#3b82f6" strokeWidth="1.5" />
            <rect x="75" y="165" width="140" height="12" rx="2" fill="#18181b" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="145" y="190" fill="#93c5fd" fontSize="9" textAnchor="middle">PCIe EXPANSION SLOTS</text>
            {/* Rear I/O */}
            <rect x="52" y="40" width="14" height="70" fill="#71717a" />
            <text x="200" y="222" fill="#34d399" fontSize="12" textAnchor="middle" fontWeight="bold">
              MOTHERBOARD (Main Printed Circuit Board)
            </text>
          </svg>
        );

      case 'cpu':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full bg-zinc-900 select-none">
            {/* Outer PCB green square */}
            <rect x="135" y="30" width="130" height="130" rx="8" fill="#047857" stroke="#10b981" strokeWidth="2" />
            {/* Gold corner pin 1 marker */}
            <polygon points="138,33 150,33 138,45" fill="#facc15" />
            {/* Metal heat spreader */}
            <rect x="150" y="45" width="100" height="100" rx="6" fill="#3f3f46" stroke="#d4d4d8" strokeWidth="2" />
            <rect x="160" y="55" width="80" height="80" rx="4" fill="#27272a" />
            {/* Core text */}
            <text x="200" y="85" fill="#ffffff" fontSize="14" textAnchor="middle" fontWeight="black">MICRO</text>
            <text x="200" y="103" fill="#38bdf8" fontSize="13" textAnchor="middle" fontWeight="black">PROCESSOR</text>
            <text x="200" y="122" fill="#a1a1aa" fontSize="9" textAnchor="middle">CENTRAL UNIT</text>
            {/* Circuit traces radiating */}
            <line x1="100" y1="95" x2="135" y2="95" stroke="#38bdf8" strokeWidth="2" />
            <line x1="265" y1="95" x2="300" y2="95" stroke="#38bdf8" strokeWidth="2" />
            <line x1="200" y1="5" x2="200" y2="30" stroke="#38bdf8" strokeWidth="2" />
            <line x1="200" y1="160" x2="200" y2="185" stroke="#38bdf8" strokeWidth="2" />
            <text x="200" y="215" fill="#38bdf8" fontSize="12" textAnchor="middle" fontWeight="bold">
              CPU (Central Processing Unit · Master Brain)
            </text>
          </svg>
        );

      case 'ram':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full bg-zinc-900 select-none">
            {/* Long RAM module PCB */}
            <rect x="40" y="70" width="320" height="80" rx="6" fill="#065f46" stroke="#34d399" strokeWidth="2" />
            {/* Black memory chips */}
            {[65, 115, 165, 225, 275].map((x) => (
              <rect key={x} x={x} y="85" width="40" height="40" rx="3" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
            ))}
            {/* Gold connector pins with key notch in middle */}
            <rect x="50" y="145" width="140" height="10" fill="#facc15" />
            <rect x="200" y="145" width="150" height="10" fill="#facc15" />
            {/* Middle Notch */}
            <rect x="190" y="140" width="10" height="15" fill="#18181b" />
            <text x="200" y="110" fill="#a7f3d0" fontSize="10" textAnchor="middle" fontWeight="black" opacity="0.3">DDR RAM</text>
            <text x="200" y="215" fill="#34d399" fontSize="12" textAnchor="middle" fontWeight="bold">
              RAM STICK (Random Access Memory · Fast Workspace)
            </text>
          </svg>
        );

      case 'psu':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full bg-zinc-900 select-none">
            {/* Metal casing */}
            <rect x="70" y="40" width="200" height="140" rx="8" fill="#18181b" stroke="#71717a" strokeWidth="2.5" />
            {/* Big cooling fan grill */}
            <circle cx="145" cy="110" r="45" fill="#09090b" stroke="#52525b" strokeWidth="2" />
            <circle cx="145" cy="110" r="15" fill="#27272a" />
            {/* AC Power socket */}
            <rect x="215" y="65" width="40" height="30" rx="4" fill="#09090b" stroke="#3f3f46" strokeWidth="1.5" />
            <circle cx="225" cy="80" r="2.5" fill="#facc15" />
            <circle cx="235" cy="74" r="2.5" fill="#facc15" />
            <circle cx="245" cy="80" r="2.5" fill="#facc15" />
            {/* Power switch */}
            <rect x="220" y="110" width="30" height="18" rx="2" fill="#dc2626" />
            {/* Multi-colored cable bundle out */}
            <path d="M 270 140 Q 300 130 330 110" stroke="#facc15" strokeWidth="3" fill="none" />
            <path d="M 270 145 Q 300 140 330 130" stroke="#dc2626" strokeWidth="3" fill="none" />
            <path d="M 270 150 Q 300 150 330 150" stroke="#18181b" strokeWidth="3" fill="none" />
            <path d="M 270 155 Q 300 160 330 170" stroke="#ea580c" strokeWidth="3" fill="none" />
            <text x="200" y="218" fill="#f87171" fontSize="12" textAnchor="middle" fontWeight="bold">
              POWER SUPPLY UNIT (PSU · High-Voltage AC to DC)
            </text>
          </svg>
        );

      case 'harddrive':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full bg-zinc-900 select-none">
            {/* Drive Case */}
            <rect x="110" y="25" width="180" height="165" rx="10" fill="#18181b" stroke="#94a3b8" strokeWidth="2.5" />
            {/* Spinning Magnetic Platter */}
            <circle cx="200" cy="100" r="55" fill="#334155" stroke="#cbd5e1" strokeWidth="2" />
            <circle cx="200" cy="100" r="18" fill="#64748b" stroke="#f1f5f9" strokeWidth="1.5" />
            {/* Actuator arm */}
            <circle cx="140" cy="145" r="8" fill="#e2e8f0" />
            <line x1="140" y1="145" x2="190" y2="105" stroke="#e2e8f0" strokeWidth="3.5" />
            <polygon points="190,105 195,102 195,108" fill="#ef4444" />
            <text x="200" y="220" fill="#94a3b8" fontSize="12" textAnchor="middle" fontWeight="bold">
              HARD DISK DRIVE (HDD · Magnetic Platters &amp; Actuator Arm)
            </text>
          </svg>
        );

      case 'ssd':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full bg-zinc-900 select-none">
            {/* SSD Casing */}
            <rect x="90" y="35" width="220" height="145" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            {/* NAND Flash chips */}
            <rect x="110" y="55" width="45" height="50" rx="3" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
            <rect x="170" y="55" width="45" height="50" rx="3" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
            <rect x="230" y="55" width="45" height="50" rx="3" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
            <rect x="170" y="115" width="55" height="40" rx="3" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
            <text x="197" y="140" fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold">CONTROLLER</text>
            {/* SATA connector pins */}
            <rect x="90" y="170" width="60" height="8" fill="#facc15" />
            <text x="200" y="215" fill="#38bdf8" fontSize="12" textAnchor="middle" fontWeight="bold">
              SOLID STATE DRIVE (SSD · Ultra-Fast Silicon Flash Chips)
            </text>
          </svg>
        );

      case 'keyboard':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full bg-zinc-900 select-none">
            <rect x="40" y="50" width="320" height="120" rx="8" fill="#18181b" stroke="#10b981" strokeWidth="2" />
            {/* Key rows */}
            {[65, 85, 105, 125].map((y) => (
              <line key={y} x1="55" y1={y} x2="345" y2={y} stroke="#3f3f46" strokeWidth="10" strokeDasharray="18,6" />
            ))}
            {/* Spacebar */}
            <rect x="130" y="145" width="140" height="12" rx="3" fill="#52525b" />
            <text x="200" y="210" fill="#34d399" fontSize="12" textAnchor="middle" fontWeight="bold">
              KEYBOARD (Text &amp; Command QWERTY Input)
            </text>
          </svg>
        );

      case 'mouse':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full bg-zinc-900 select-none">
            {/* Mouse Body */}
            <path d="M 160 70 C 160 40 240 40 240 70 L 240 140 C 240 180 160 180 160 140 Z" fill="#18181b" stroke="#a855f7" strokeWidth="3" />
            {/* Split line */}
            <line x1="200" y1="42" x2="200" y2="100" stroke="#a855f7" strokeWidth="2" />
            {/* Scroll wheel */}
            <rect x="194" y="60" width="12" height="24" rx="4" fill="#3b82f6" />
            {/* Optical sensor glow */}
            <circle cx="200" cy="130" r="15" fill="#a855f7" opacity="0.3" />
            <text x="200" y="210" fill="#c084fc" fontSize="12" textAnchor="middle" fontWeight="bold">
              OPTICAL MOUSE (Pointing &amp; Click Input)
            </text>
          </svg>
        );

      case 'monitor':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full bg-zinc-900 select-none">
            {/* Screen */}
            <rect x="70" y="30" width="260" height="140" rx="8" fill="#18181b" stroke="#3b82f6" strokeWidth="3" />
            <rect x="80" y="40" width="240" height="120" rx="4" fill="#09090b" />
            <rect x="95" y="55" width="80" height="15" rx="3" fill="#10b981" />
            {/* Stand */}
            <rect x="188" y="170" width="24" height="25" fill="#3f3f46" />
            <rect x="160" y="195" width="80" height="8" rx="4" fill="#52525b" />
            <text x="200" y="225" fill="#60a5fa" fontSize="12" textAnchor="middle" fontWeight="bold">
              MONITOR (Visual Display Output · Soft Copy)
            </text>
          </svg>
        );

      case 'printer':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full bg-zinc-900 select-none">
            {/* Printer Box */}
            <rect x="80" y="70" width="240" height="100" rx="8" fill="#18181b" stroke="#10b981" strokeWidth="2.5" />
            {/* Top paper feed */}
            <rect x="130" y="35" width="140" height="40" rx="2" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
            {/* Output tray */}
            <rect x="110" y="145" width="180" height="35" rx="3" fill="#334155" />
            <rect x="130" y="150" width="140" height="25" rx="2" fill="#ffffff" />
            <line x1="145" y1="158" x2="220" y2="158" stroke="#0f172a" strokeWidth="2" />
            <line x1="145" y1="165" x2="200" y2="165" stroke="#0f172a" strokeWidth="2" />
            <text x="200" y="215" fill="#34d399" fontSize="12" textAnchor="middle" fontWeight="bold">
              PRINTER (Hard Copy Output on Paper)
            </text>
          </svg>
        );

      case 'scanner':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full bg-zinc-900 select-none">
            {/* Scanner Base */}
            <rect x="70" y="60" width="260" height="110" rx="8" fill="#18181b" stroke="#38bdf8" strokeWidth="2" />
            {/* Glass platen */}
            <rect x="90" y="75" width="220" height="80" rx="4" fill="#0284c7" opacity="0.4" />
            {/* Light beam line */}
            <line x1="180" y1="75" x2="180" y2="155" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
            <text x="200" y="210" fill="#38bdf8" fontSize="12" textAnchor="middle" fontWeight="bold">
              FLATBED SCANNER (Paper Document to Digital Image Input)
            </text>
          </svg>
        );

      case 'webcam':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full bg-zinc-900 select-none">
            {/* Camera Housing */}
            <rect x="130" y="50" width="140" height="80" rx="16" fill="#18181b" stroke="#06b6d4" strokeWidth="2.5" />
            {/* Big Center Lens */}
            <circle cx="200" cy="90" r="28" fill="#09090b" stroke="#06b6d4" strokeWidth="3" />
            <circle cx="200" cy="90" r="14" fill="#1e293b" />
            <circle cx="204" cy="86" r="4" fill="#ffffff" opacity="0.8" />
            {/* LED Status */}
            <circle cx="150" cy="90" r="3" fill="#22c55e" />
            {/* Monitor clip stand */}
            <path d="M 175 130 L 175 160 L 225 160 L 225 130" fill="none" stroke="#52525b" strokeWidth="4" />
            <text x="200" y="210" fill="#22d3ee" fontSize="12" textAnchor="middle" fontWeight="bold">
              WEBCAM (Video &amp; Image Capture Input)
            </text>
          </svg>
        );

      case 'speakers':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full bg-zinc-900 select-none">
            {/* Left speaker */}
            <rect x="90" y="45" width="85" height="135" rx="8" fill="#18181b" stroke="#ec4899" strokeWidth="2" />
            <circle cx="132" cy="80" r="16" fill="#09090b" stroke="#ec4899" strokeWidth="1.5" />
            <circle cx="132" cy="130" r="28" fill="#09090b" stroke="#ec4899" strokeWidth="2" />
            {/* Right speaker */}
            <rect x="225" y="45" width="85" height="135" rx="8" fill="#18181b" stroke="#ec4899" strokeWidth="2" />
            <circle cx="267" cy="80" r="16" fill="#09090b" stroke="#ec4899" strokeWidth="1.5" />
            <circle cx="267" cy="130" r="28" fill="#09090b" stroke="#ec4899" strokeWidth="2" />
            {/* Sound waves */}
            <path d="M 320 90 Q 335 110 320 130" stroke="#f472b6" strokeWidth="2" fill="none" />
            <path d="M 330 80 Q 350 110 330 140" stroke="#f472b6" strokeWidth="2" fill="none" />
            <text x="200" y="215" fill="#f472b6" fontSize="12" textAnchor="middle" fontWeight="bold">
              SPEAKERS (Audible Sound Wave Output)
            </text>
          </svg>
        );

      case 'flashdrive':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full bg-zinc-900 select-none">
            {/* USB Metal Head */}
            <rect x="240" y="85" width="60" height="40" rx="3" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
            <rect x="260" y="93" width="12" height="10" fill="#09090b" />
            <rect x="260" y="107" width="12" height="10" fill="#09090b" />
            {/* Thumb Drive Body */}
            <rect x="100" y="75" width="145" height="60" rx="10" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2.5" />
            <circle cx="125" cy="105" r="10" fill="#0f172a" />
            <text x="175" y="110" fill="#93c5fd" fontSize="12" textAnchor="middle" fontWeight="black">32 GB</text>
            <text x="200" y="210" fill="#60a5fa" fontSize="12" textAnchor="middle" fontWeight="bold">
              USB FLASH DRIVE (Pocket Secondary Storage)
            </text>
          </svg>
        );

      case 'memorycard':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full bg-zinc-900 select-none">
            {/* SD Card Body with cut corner */}
            <polygon points="140,40 230,40 260,70 260,170 140,170" fill="#18181b" stroke="#f59e0b" strokeWidth="2.5" />
            {/* Gold pin lines */}
            {[155, 175, 195, 215, 235].map((x) => (
              <rect key={x} x={x} y="48" width="10" height="25" rx="2" fill="#facc15" />
            ))}
            {/* Lock switch */}
            <rect x="135" y="85" width="8" height="15" fill="#f59e0b" />
            <text x="200" y="130" fill="#ffffff" fontSize="14" textAnchor="middle" fontWeight="black">SD CARD</text>
            <text x="200" y="150" fill="#fbbf24" fontSize="11" textAnchor="middle">64 GB</text>
            <text x="200" y="215" fill="#fbbf24" fontSize="12" textAnchor="middle" fontWeight="bold">
              SD MEMORY CARD (Micro Flash Storage)
            </text>
          </svg>
        );

      case 'touchscreen':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full bg-zinc-900 select-none">
            {/* Tablet Frame */}
            <rect x="90" y="30" width="220" height="150" rx="12" fill="#18181b" stroke="#a855f7" strokeWidth="3" />
            <rect x="100" y="40" width="200" height="130" rx="8" fill="#09090b" />
            {/* Touch Ripple */}
            <circle cx="200" cy="100" r="15" fill="#c084fc" opacity="0.5" />
            <circle cx="200" cy="100" r="30" stroke="#c084fc" strokeWidth="2" fill="none" opacity="0.6" />
            <circle cx="200" cy="100" r="45" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="4,4" fill="none" opacity="0.4" />
            <text x="200" y="215" fill="#c084fc" fontSize="12" textAnchor="middle" fontWeight="bold">
              TOUCHSCREEN (Simultaneous Input &amp; Output Device)
            </text>
          </svg>
        );

      case 'projector':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full bg-zinc-900 select-none">
            {/* Projector Body */}
            <rect x="60" y="70" width="140" height="80" rx="8" fill="#18181b" stroke="#f59e0b" strokeWidth="2.5" />
            {/* Big Optical Lens */}
            <circle cx="180" cy="110" r="24" fill="#09090b" stroke="#f59e0b" strokeWidth="3" />
            <circle cx="180" cy="110" r="14" fill="#38bdf8" opacity="0.8" />
            {/* Light Beam out to screen */}
            <polygon points="195,95 340,40 340,180 195,125" fill="#fef08a" opacity="0.25" />
            {/* Projected Screen */}
            <rect x="335" y="35" width="8" height="150" rx="2" fill="#e2e8f0" />
            <text x="200" y="215" fill="#fbbf24" fontSize="12" textAnchor="middle" fontWeight="bold">
              PROJECTOR (Classroom Large Display Output)
            </text>
          </svg>
        );

      case 'disassembly':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full bg-zinc-900 select-none">
            {/* Open PC Chassis */}
            <rect x="80" y="30" width="240" height="160" rx="8" fill="#09090b" stroke="#10b981" strokeWidth="2" />
            {/* Motherboard inside */}
            <rect x="95" y="45" width="130" height="130" rx="4" fill="#064e3b" />
            <rect x="135" y="70" width="40" height="40" rx="2" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
            {/* PSU in corner */}
            <rect x="235" y="45" width="70" height="60" rx="4" fill="#18181b" stroke="#71717a" strokeWidth="1.5" />
            {/* HDD Bay below */}
            <rect x="235" y="115" width="70" height="60" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="200" y="222" fill="#34d399" fontSize="12" textAnchor="middle" fontWeight="bold">
              SYSTEM UNIT TEARDOWN (7-Step Disassembly Bay)
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