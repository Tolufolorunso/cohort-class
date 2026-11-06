'use client';

import React, { useState } from 'react';
import { applicationSectors, module1ImageCards } from '../../data/module1';
import { Sparkles, ArrowRight, CheckCircle, Shield } from '../icons/Icons';
import { EducationalImage } from '../presentation/EducationalImage';

const LAB_SAFETY_RULES = [
  {
    number: 1,
    title: 'No Food or Liquids',
    description: 'Never bring pure water sachets, soft drinks, gala, or oily snacks near computers. Spills cause instant electrical short circuits and destroy motherboards.',
    icon: '🚫',
  },
  {
    number: 2,
    title: 'Clean & Dry Hands',
    description: 'Always wash and wipe hands completely dry before touching laptops and keyboards. Prevents moisture and dirt from getting trapped under keys.',
    icon: '🧼',
  },
  {
    number: 3,
    title: 'Gentle Keystrokes',
    description: 'Press keyboard keys and click the mouse gently. Never hammer, bang, or pound keys when thinking through a difficult problem.',
    icon: '⌨️',
  },
  {
    number: 4,
    title: 'Proper Operating System Shutdown',
    description: 'Always shut down cleanly through the computer menu. Never pull the power cable or turn off the extension socket directly while files are open.',
    icon: '🔌',
  },
  {
    number: 5,
    title: 'NEPA & Electrical Hazard Caution',
    description: 'If you smell burning, see sparks, hear the lab UPS inverter beeping loudly, or notice loose wires, alert your instructor immediately without touching.',
    icon: '⚠️',
  },
];

export function StageApplications() {
  const [selectedSectorId, setSelectedSectorId] = useState(
    applicationSectors[0].id
  );

  const activeIndex = applicationSectors.findIndex(
    (s) => s.id === selectedSectorId
  );
  const activeSector =
    applicationSectors[activeIndex >= 0 ? activeIndex : 0];

  const hospitalImage = module1ImageCards.find((c) => c.id === 'hospital-healthcare') || {
    id: 'hospital-healthcare',
    title: 'Computers in African Healthcare & Clinics',
    caption: 'African healthcare doctors and nurses using digital diagnostic monitors, patient ultrasound, and electronic health records to save lives.',
    url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    fallbackType: 'hospital' as const,
    badge: 'African Medical Innovation',
  };

  const atmImage = module1ImageCards.find((c) => c.id === 'banking-atm') || {
    id: 'banking-atm',
    title: 'Nigerian Market POS & 24/7 ATM Terminal',
    caption: 'POS terminals and ATM machines used across Nigerian markets, supermarkets, and banks for instant electronic cash withdrawals and card transfers.',
    url: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
    fallbackType: 'bank' as const,
    badge: 'Instant Digital Commerce',
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Educational Image Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EducationalImage
          src={hospitalImage.url}
          alt={hospitalImage.title}
          title={hospitalImage.title}
          caption={hospitalImage.caption}
          fallbackType={hospitalImage.fallbackType}
          badge={hospitalImage.badge}
        />
        <EducationalImage
          src={atmImage.url}
          alt={atmImage.title}
          title={atmImage.title}
          caption={atmImage.caption}
          fallbackType={atmImage.fallbackType}
          badge={atmImage.badge}
        />
      </section>

      {/* Sector Selection Tabs */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles size={14} /> Lesson 4: Uses and Importance of Computers
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white">
              Where Are Computers Used in Everyday Society?
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-1">
              Select a sector to explore how computing systems power modern institutions:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 mt-4 pt-4 border-t border-zinc-800">
          {applicationSectors.map((sector) => {
            const isSelected = sector.id === selectedSectorId;
            return (
              <button
                key={sector.id}
                onClick={() => setSelectedSectorId(sector.id)}
                className={`p-3 rounded-2xl text-center transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-sky-500/10 border-sky-400 ring-2 ring-sky-500/30 text-sky-300 font-bold shadow-md'
                    : 'bg-zinc-800/60 border-zinc-700/60 text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                <div className="text-xs sm:text-sm font-bold truncate">
                  {sector.name.split(' ')[0]}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Active Sector Display */}
      <section className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border-2 border-sky-500/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="border-b border-zinc-800 pb-4">
          <span className="px-3 py-1 rounded-full bg-sky-500 text-zinc-950 text-xs font-black uppercase tracking-wider">
            Sector In Focus
          </span>
          <h3 className="text-2xl sm:text-4xl font-black text-white mt-2">
            {activeSector.name}
          </h3>
          <p className="text-base sm:text-lg text-sky-300 mt-1 font-semibold">
            {activeSector.tagline}
          </p>
        </div>

        {/* 3 Real-World Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeSector.examples.map((example, idx) => (
            <div
              key={idx}
              className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">
                  <CheckCircle size={15} /> Application #{idx + 1}
                </div>
                <h4 className="text-lg font-bold text-white">
                  {example.title}
                </h4>
                <p className="text-sm text-zinc-300 mt-2 leading-relaxed">
                  {example.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Classroom Discussion Callout Box */}
        <div className="bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-900 border border-amber-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
              Classroom Discussion Prompt for Students:
            </span>
            <p className="text-base sm:text-lg font-bold text-zinc-100 italic">
              &quot;{activeSector.discussionPrompt}&quot;
            </p>
          </div>

          <button
            onClick={() => {
              const nextIdx = (activeIndex + 1) % applicationSectors.length;
              setSelectedSectorId(applicationSectors[nextIdx].id);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-zinc-950 font-bold text-sm transition-all cursor-pointer whitespace-nowrap self-end sm:self-auto shadow-md"
          >
            <span>Next Sector</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Computer Laboratory Rules & Safe Practices */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-rose-400 font-black text-xs uppercase tracking-wider">
          <Shield size={16} /> Vital Lab Etiquette
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-white">
          Computer Laboratory Safety & Etiquette Rules
        </h3>
        <p className="text-zinc-400 text-sm sm:text-base">
          To protect yourself from electrical shock and preserve our school computers, memorize and practice these 5 rules in every class:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
          {LAB_SAFETY_RULES.map((rule) => (
            <div
              key={rule.number}
              className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 flex flex-col justify-between space-y-2"
            >
              <div>
                <div className="text-2xl">{rule.icon}</div>
                <div className="text-xs font-black text-amber-400 uppercase tracking-wider mt-2">
                  Rule #{rule.number}
                </div>
                <div className="text-sm font-bold text-white mt-0.5">
                  {rule.title}
                </div>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {rule.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

