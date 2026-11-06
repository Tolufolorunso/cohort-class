'use client';

import React, { useState } from 'react';
import {
  humanBodyAnalogies,
  module2ImageCards,
} from '../../data/module2';
import { EducationalImage } from '../presentation/EducationalImage';
import { BookOpen, Sparkles, CheckCircle, Info } from '../icons/Icons';

export function StageHardwareAnatomy() {
  const [explanationMode, setExplanationMode] = useState<
    'simple' | 'bookish' | 'nigerian'
  >('simple');
  const [selectedBodyPartId, setSelectedBodyPartId] = useState<string>(
    humanBodyAnalogies[0].id
  );

  const activeBodyAnalogy =
    humanBodyAnalogies.find((b) => b.id === selectedBodyPartId) ||
    humanBodyAnalogies[0];

  const studentInspectionImage =
    module2ImageCards.find(
      (c) => c.id === 'african-students-hardware-inspection'
    ) || module2ImageCards[0];

  const teacherDemoImage =
    module2ImageCards.find((c) => c.id === 'african-teacher-hardware-demo') ||
    module2ImageCards[1];

  const monitorImage =
    module2ImageCards.find((c) => c.id === 'monitor-desktop-display') ||
    module2ImageCards[2];

  const keyboardImage =
    module2ImageCards.find((c) => c.id === 'keyboard-ergonomic-keys') ||
    module2ImageCards[3];

  const mouseImage =
    module2ImageCards.find((c) => c.id === 'mouse-optical-sensor') ||
    module2ImageCards[4];

  const systemUnitImage =
    module2ImageCards.find((c) => c.id === 'system-unit-chassis') ||
    module2ImageCards[5];

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

      {/* Hero Definition Card: Hardware vs Software */}
      <section className="bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles size={14} />
              <span>Lesson 1 · The Physical Machine</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              What Is Computer Hardware?
            </h2>

            {/* Dynamic Explanation Mode Text */}
            {explanationMode === 'simple' && (
              <div className="space-y-3">
                <p className="text-lg sm:text-xl text-emerald-300 font-semibold leading-relaxed">
                  Hardware means the physical parts of a computer. If you can physically see it, touch it with your hands, and hold it, it is hardware!
                </p>
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                  Examples: The screen in front of your eyes (monitor), the keys you press (keyboard), the mouse you roll on the desk, and the metal box sitting beside you (system unit).
                </p>
                <div className="p-3.5 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-emerald-300 text-xs sm:text-sm font-mono flex items-center gap-2">
                  <span>💡</span>
                  <span><strong>Golden Rule:</strong> Hardware is touchable machinery; Software is untouchable programs and apps inside.</span>
                </div>
              </div>
            )}

            {explanationMode === 'bookish' && (
              <div className="space-y-3">
                <blockquote className="text-lg sm:text-xl text-amber-300 font-serif italic border-l-4 border-amber-500 pl-4 py-1">
                  &ldquo;Computer hardware refers to the physical, electronic, and electromechanical components of a computer system that can be seen, touched, and manipulated.&rdquo;
                </blockquote>
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                  WAEC / NECO syllabus standard: Hardware operates under the instruction of system and application software. Without hardware, software cannot execute; without software, hardware remains inactive silicon and metal.
                </p>
                <div className="p-3.5 bg-amber-950/40 border border-amber-800/40 rounded-xl text-amber-300 text-xs sm:text-sm font-mono flex items-center gap-2">
                  <span>🎓</span>
                  <span><strong>Examination Formula:</strong> Hardware = Physical Tangible Machinery | Software = Intangible Instructions.</span>
                </div>
              </div>
            )}

            {explanationMode === 'nigerian' && (
              <div className="space-y-3">
                <p className="text-lg sm:text-xl text-orange-300 font-semibold leading-relaxed">
                  Think of pounded yam! Hardware is the heavy mortar and pestle you can hold in your hands; Software is the cooking recipe and knowledge inside your mother&rsquo;s head!
                </p>
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                  You cannot pound yam with only knowledge (software) without the pestle (hardware). And the pestle cannot pound yam by itself without instructions. Both work together!
                </p>
                <div className="p-3.5 bg-orange-950/40 border border-orange-800/40 rounded-xl text-orange-300 text-xs sm:text-sm font-mono flex items-center gap-2">
                  <span>🍠</span>
                  <span><strong>Market Analogy:</strong> Hardware is the physical POS machine in the market; Software is the OPay/Moniepoint app running inside it.</span>
                </div>
              </div>
            )}

            {/* Critical Teacher Alert */}
            <div className="mt-4 p-4 rounded-2xl bg-zinc-950 border border-amber-500/30 flex items-start gap-3">
              <Info size={20} className="text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-zinc-300">
                <span className="font-bold text-amber-400 block mb-0.5">Common Student Error to Avoid:</span>
                Many people mistakenly call the big rectangular computer case the &ldquo;CPU&rdquo;. That is incorrect! The box is called the <strong>System Unit</strong>. The CPU is a small microprocessor chip mounted inside that box on the motherboard.
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <EducationalImage
              src={studentInspectionImage.url}
              alt={studentInspectionImage.title}
              title={studentInspectionImage.title}
              caption={studentInspectionImage.caption}
              fallbackType={studentInspectionImage.fallbackType}
              badge={studentInspectionImage.badge}
              aspect="aspect-4/3"
            />
          </div>
        </div>
      </section>

      {/* Interactive Human Body Hardware Analogy Mapper */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
              <span>Interactive Classroom Model</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Understanding Hardware Through the Human Body
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">
              Click any human body part below to discover its exact computer hardware twin.
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 shrink-0">
            {humanBodyAnalogies.length} Body Pairs
          </span>
        </div>

        {/* Clickable Body Parts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {humanBodyAnalogies.map((analogy) => {
            const isSelected = analogy.id === selectedBodyPartId;
            return (
              <button
                key={analogy.id}
                type="button"
                onClick={() => setSelectedBodyPartId(analogy.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-950/70 border-emerald-500 shadow-md ring-2 ring-emerald-500/30'
                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/40 text-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="text-2xl">{analogy.icon}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </div>
                <div>
                  <span className="text-[11px] font-bold block uppercase tracking-wider opacity-70">
                    {analogy.bodyPart}
                  </span>
                  <span
                    className={`text-xs sm:text-sm font-extrabold line-clamp-1 ${
                      isSelected ? 'text-emerald-300' : 'text-zinc-200'
                    }`}
                  >
                    {analogy.computerPart}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Analogy Spotlight Card */}
        <div className="bg-zinc-950 border border-emerald-500/40 rounded-2xl p-5 sm:p-7 shadow-inner">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-zinc-900 border border-zinc-800 rounded-xl text-center">
              <span className="text-5xl sm:text-6xl mb-3">{activeBodyAnalogy.icon}</span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                {activeBodyAnalogy.bodyPart}
              </span>
              <span className="text-zinc-500 text-xs font-mono my-1">EQUALS IN COMPUTER</span>
              <span className="text-base sm:text-lg font-black text-white">
                {activeBodyAnalogy.computerPart}
              </span>
            </div>

            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
                <CheckCircle size={14} className="text-emerald-400" />
                <span>How They Work Identically:</span>
              </div>
              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
                {activeBodyAnalogy.roleDescription}
              </p>
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs sm:text-sm text-emerald-300 leading-relaxed font-mono">
                💡 <strong>Simple English Tip:</strong> {activeBodyAnalogy.simpleEnglishNote}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 6 Main External Desktop Parts Showcase */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              The 6 Main External Desktop Components
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm mt-0.5">
              Every complete desktop workstation in our school laboratory consists of these core physical parts.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1 rounded-full">
            Laboratory Equipment
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Monitor Card */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden p-4 space-y-3 hover:border-zinc-700 transition-colors">
            <EducationalImage
              src={monitorImage.url}
              alt={monitorImage.title}
              title={monitorImage.title}
              fallbackType={monitorImage.fallbackType}
              badge={monitorImage.badge}
              aspect="aspect-16/10"
            />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40">
                Visual Output
              </span>
              <h4 className="text-base font-extrabold text-white mt-1.5">1. Monitor (Display Screen)</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Displays information from the computer as text, pictures, videos, and applications. Without it, you cannot see what you are doing.
              </p>
            </div>
          </div>

          {/* Keyboard Card */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden p-4 space-y-3 hover:border-zinc-700 transition-colors">
            <EducationalImage
              src={keyboardImage.url}
              alt={keyboardImage.title}
              title={keyboardImage.title}
              fallbackType={keyboardImage.fallbackType}
              badge={keyboardImage.badge}
              aspect="aspect-16/10"
            />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                Text &amp; Command Input
              </span>
              <h4 className="text-base font-extrabold text-white mt-1.5">2. Keyboard (Typing Device)</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Contains letters, numbers, and symbols used to enter words, write notes, and send commands into the computer.
              </p>
            </div>
          </div>

          {/* Mouse Card */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden p-4 space-y-3 hover:border-zinc-700 transition-colors">
            <EducationalImage
              src={mouseImage.url}
              alt={mouseImage.title}
              title={mouseImage.title}
              fallbackType={mouseImage.fallbackType}
              badge={mouseImage.badge}
              aspect="aspect-16/10"
            />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">
                Pointing Input
              </span>
              <h4 className="text-base font-extrabold text-white mt-1.5">3. Mouse (Screen Pointer)</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Controls the arrow pointer on the screen. Used for clicking buttons, selecting text, opening files, and dragging icons.
              </p>
            </div>
          </div>

          {/* System Unit Card */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden p-4 space-y-3 hover:border-zinc-700 transition-colors">
            <EducationalImage
              src={systemUnitImage.url}
              alt={systemUnitImage.title}
              title={systemUnitImage.title}
              fallbackType={systemUnitImage.fallbackType}
              badge={systemUnitImage.badge}
              aspect="aspect-16/10"
            />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                Core Housing Case
              </span>
              <h4 className="text-base font-extrabold text-white mt-1.5">4. System Unit (Tower Case)</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                The protective steel case that holds the main processing, memory, power, and storage components that make the computer run.
              </p>
            </div>
          </div>

          {/* Speakers Card */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden p-4 space-y-3 hover:border-zinc-700 transition-colors">
            <EducationalImage
              src="https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80"
              alt="Computer Speakers"
              title="Computer Speakers"
              fallbackType="speakers"
              badge="Audio Output"
              aspect="aspect-16/10"
            />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400 bg-pink-950/60 px-2 py-0.5 rounded border border-pink-800/40">
                Audio Output
              </span>
              <h4 className="text-base font-extrabold text-white mt-1.5">5. Speakers &amp; Headphones</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Produces sound from the computer so students can hear pronunciation lessons, video audio, and classroom alerts.
              </p>
            </div>
          </div>

          {/* Webcam Card */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden p-4 space-y-3 hover:border-zinc-700 transition-colors">
            <EducationalImage
              src="https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=600&q=80"
              alt="Computer Webcam"
              title="Computer Webcam"
              fallbackType="webcam"
              badge="Video Input"
              aspect="aspect-16/10"
            />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                Video Input
              </span>
              <h4 className="text-base font-extrabold text-white mt-1.5">6. Webcam (Digital Camera)</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                A small video camera that captures pictures and live video of students and teachers for online classes and meetings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hardware Microarchitecture Cutaways Section */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-7 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                Visual Deep Dive
              </span>
              <span className="text-xs font-bold text-zinc-400">• Component Microarchitecture Cutaways</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1">
              Inside the Chips: What Happens Beneath the Surface?
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          {/* CPU Cutaway */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 space-y-3">
            <EducationalImage
              src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80"
              alt="CPU Microarchitecture Cutaway"
              fallbackType="cpu-cutaway"
              badge="Processor Core Cutaway"
              aspect="aspect-16/10"
            />
            <div>
              <h4 className="text-sm font-black text-white">CPU Silicon Die & Heat Spreader</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Beneath the metal heat spreader lid (IHS) lies the tiny silicon die containing billions of microscopic transistors arranged into processing cores and high-speed L3 memory cache.
              </p>
            </div>
          </div>

          {/* RAM Cutaway */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 space-y-3">
            <EducationalImage
              src="https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=800&q=80"
              alt="RAM Stick Anatomy Cutaway"
              fallbackType="ram-cutaway"
              badge="RAM Contact Alignment"
              aspect="aspect-16/10"
            />
            <div>
              <h4 className="text-sm font-black text-white">DDR RAM Stick & Key Alignment Notch</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                The golden contacts transfer millions of bytes every microsecond. The asymmetric notch in the center ensures a student or technician can never install the RAM stick backwards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Classroom Partner Discussion Box */}
      <section className="bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-zinc-900 border border-emerald-600/30 rounded-2xl p-5 sm:p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              🤝 Partner Classroom Practical:
            </span>
            <p className="text-sm sm:text-base text-zinc-200 font-medium">
              Turn to your lab partner. Point to your laboratory workstation and test each other: name the 6 external hardware parts, and explain which body part corresponds to the CPU!
            </p>
          </div>
          <div className="shrink-0">
            <EducationalImage
              src={teacherDemoImage.url}
              alt={teacherDemoImage.title}
              fallbackType="school"
              className="w-32 h-20 rounded-lg overflow-hidden border border-zinc-700"
              aspect="aspect-video"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

