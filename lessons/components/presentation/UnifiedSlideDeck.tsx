'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getModuleDeck, getAllModuleDecks } from '../../data/slides';
import { getOnePageTeacherGuide } from '../../data/teacherBriefings';
import { OnePageTeacherBriefingModal } from '../instructor/OnePageTeacherBriefingModal';
import { useIsInstructor } from '../../hooks/useIsInstructor';
import { getCurrentActiveModule, setCurrentActiveModule } from '../../lib/platformStorage';
import { getStudentSession } from '../../lib/roster';

import { InteractiveIPOSLab } from '../interactive/InteractiveIPOSLab';
import { InteractiveDeviceSorter } from '../interactive/InteractiveDeviceSorter';
import { InteractivePeripheralSorter } from '../interactive/InteractivePeripheralSorter';
import { InteractiveDisassemblyLab } from '../interactive/InteractiveDisassemblyLab';
import { InteractiveByteLadder } from '../interactive/InteractiveByteLadder';
import { InteractiveBootingSimulator } from '../interactive/InteractiveBootingSimulator';
import { InteractiveWindowPlayground } from '../interactive/InteractiveWindowPlayground';
import { InteractiveQuizLauncher } from '../interactive/InteractiveQuizLauncher';
import { InteractiveMouseTrainer } from '../today/InteractiveMouseTrainer';
import { InteractiveFolderLab } from '../today/InteractiveFolderLab';
import { InteractiveRapidTyping } from '../today/InteractiveRapidTyping';

interface UnifiedSlideDeckProps {
  initialModuleId?: string;
  isInstructorView?: boolean;
}

export function UnifiedSlideDeck({
  initialModuleId,
  isInstructorView = false,
}: UnifiedSlideDeckProps) {
  const router = useRouter();
  const isInstructorAuth = useIsInstructor();
  const canSeeTeacherTools = isInstructorView || isInstructorAuth;

  const [activeModuleId, setActiveModuleId] = useState<string>(() => {
    return initialModuleId || getCurrentActiveModule();
  });

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isTeacherMode, setIsTeacherMode] = useState(isInstructorView);
  const [showTeacherBriefModal, setShowTeacherBriefModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const allDecks = getAllModuleDecks();
  const currentDeck = getModuleDeck(activeModuleId);
  const currentSlide = currentDeck.slides[currentSlideIndex] || currentDeck.slides[0];
  const totalSlides = currentDeck.slides.length;
  const currentGuide = getOnePageTeacherGuide(activeModuleId);

  // Switch module
  const handleSwitchModule = (newModuleId: string) => {
    setActiveModuleId(newModuleId);
    setCurrentSlideIndex(0);
    setCurrentActiveModule(newModuleId);

    // If on /learn/[moduleId], update URL route
    if (!isInstructorView && initialModuleId) {
      router.push(`/learn/${newModuleId}`);
    }

    // Broadcast module change if instructor
    if (isInstructorView) {
      fetch('/api/live-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'switch_module',
          moduleId: newModuleId,
          stageIndex: 0,
        }),
      }).catch(() => {});
    }
  };

  // Broadcast slide change to student screens (for instructor view)
  const broadcastSlide = useCallback(
    (slideIdx: number) => {
      if (!isInstructorView) return;
      fetch('/api/live-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_slide',
          stageIndex: slideIdx,
          moduleId: activeModuleId,
        }),
      }).catch(() => {});
    },
    [isInstructorView, activeModuleId]
  );

  // Student slide sync polling
  useEffect(() => {
    if (isInstructorView) return;
    const session = getStudentSession();
    if (!session) return;

    const interval = setInterval(async () => {
      try {
        const queryParams = new URLSearchParams();
        queryParams.set('mode', session.mode || 'solo');
        queryParams.set('patron', session.patronNumber);
        queryParams.set('name', session.studentName);

        const res = await fetch(`/api/live-session?${queryParams.toString()}`);
        if (!res.ok) return;
        const data = await res.json();

        // If teacher changed the active module and this is /today, sync module
        if (!initialModuleId && data.activeModuleId && data.activeModuleId !== activeModuleId) {
          setActiveModuleId(data.activeModuleId);
          setCurrentSlideIndex(data.activeStageIndex || 0);
        }
      } catch {
        // silent fallback
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isInstructorView, initialModuleId, activeModuleId]);

  // Slide navigation handlers
  const handleNext = useCallback(() => {
    if (currentSlideIndex < totalSlides - 1) {
      const nextIdx = currentSlideIndex + 1;
      setCurrentSlideIndex(nextIdx);
      broadcastSlide(nextIdx);
    }
  }, [currentSlideIndex, totalSlides, broadcastSlide]);

  const handlePrev = useCallback(() => {
    if (currentSlideIndex > 0) {
      const prevIdx = currentSlideIndex - 1;
      setCurrentSlideIndex(prevIdx);
      broadcastSlide(prevIdx);
    }
  }, [currentSlideIndex, broadcastSlide]);

  const handleSelectSlide = useCallback(
    (idx: number) => {
      if (idx >= 0 && idx < totalSlides) {
        setCurrentSlideIndex(idx);
        broadcastSlide(idx);
      }
    },
    [totalSlides, broadcastSlide]
  );

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  // Global presentation keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key.toLowerCase() === 't' && canSeeTeacherTools) {
        e.preventDefault();
        setIsTeacherMode((prev) => !prev);
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, canSeeTeacherTools]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between select-none">
      {/* Top Presentation Bar */}
      <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md px-3 sm:px-6 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          {/* Left: Branding & Module Info */}
          <div className="flex items-center gap-2.5">
            <Link
              href={isInstructorView ? '/instructor' : '/'}
              className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-black text-sm hover:scale-105 transition-all shadow-sm"
              title={isInstructorView ? 'Return to Instructor Room' : 'Return to Student Portal'}
            >
              DZ
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xs sm:text-sm text-white">
                  {isInstructorView ? "Today's Instructor Deck" : "Today's Class Presentation"}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-700/60">
                  Slide {currentSlideIndex + 1} of {totalSlides}
                </span>
              </div>

              {/* Module Switcher / Badge */}
              <div className="flex items-center gap-1.5 mt-0.5">
                {canSeeTeacherTools ? (
                  <select
                    value={activeModuleId}
                    onChange={(e) => handleSwitchModule(e.target.value)}
                    className="bg-zinc-900 border border-zinc-700 text-[11px] font-bold text-emerald-400 rounded px-1.5 py-0.5 focus:outline-none cursor-pointer hover:border-emerald-500 transition-all"
                    title="Switch Current Module"
                  >
                    {allDecks.map((deck) => (
                      <option key={deck.moduleId} value={deck.moduleId}>
                        {deck.moduleTitle}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className="text-[11px] text-zinc-400 font-medium">
                    {currentDeck.moduleTitle}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Center: Slide Jump Dropdown */}
          <div className="hidden sm:flex items-center gap-2">
            <select
              value={currentSlideIndex}
              onChange={(e) => handleSelectSlide(Number(e.target.value))}
              className="bg-zinc-950 border border-zinc-700 text-xs font-semibold text-zinc-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer max-w-[220px] lg:max-w-xs truncate"
            >
              {currentDeck.slides.map((s, idx) => (
                <option key={s.id} value={idx}>
                  {idx + 1}. {s.title}
                </option>
              ))}
            </select>
          </div>

          {/* Right Tools & Modals */}
          <div className="flex items-center gap-2">
            {/* Teacher Guide Drawer Toggle */}
            {canSeeTeacherTools && (
              <button
                onClick={() => setIsTeacherMode((prev) => !prev)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                  isTeacherMode
                    ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-md'
                    : 'bg-zinc-800 text-zinc-300 hover:text-white border-zinc-700'
                }`}
                title="Toggle Teacher Talking Points & Classroom Notes (Press 'T')"
              >
                <span>🧑‍🏫</span>
                <span className="hidden sm:inline">Teacher Guide</span>
                <span className="text-[10px] opacity-70">({isTeacherMode ? 'ON' : 'OFF'})</span>
              </button>
            )}

            {/* 1-Page Teacher Guide Modal Trigger */}
            {canSeeTeacherTools && (
              <button
                onClick={() => setShowTeacherBriefModal(true)}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                title="Open 1-Page Pre-Class Teacher Briefing Sheet"
              >
                <span>📄</span>
                <span className="hidden md:inline">1-Page Guide</span>
              </button>
            )}

            {/* Copy Notes Link */}
            <Link
              href={`/notes/${activeModuleId}`}
              className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-bold transition-all flex items-center gap-1"
              title="Open Student Copy Notes"
            >
              <span>📖</span>
              <span className="hidden lg:inline">Notes</span>
            </Link>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 text-xs transition-all cursor-pointer"
              title="Toggle Fullscreen (Press 'F')"
            >
              {isFullscreen ? '⛷️ Exit' : '⛶ Fullscreen'}
            </button>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-zinc-900 h-1.5">
        <div
          className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-amber-500 h-full transition-all duration-300"
          style={{ width: `${((currentSlideIndex + 1) / totalSlides) * 100}%` }}
        />
      </div>

      {/* Main Presentation Stage */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-3 sm:p-6 lg:p-8 flex flex-col justify-center">
        {/* PowerPoint Slide Container (Clean 16:9 widescreen feel) */}
        <div className="bg-zinc-900/85 border border-zinc-800 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-sm flex flex-col justify-between min-h-[520px] transition-all">
          {/* Slide Header */}
          <div className="border-b border-zinc-800/80 pb-3 mb-5">
            <div className="flex items-center justify-between gap-3 mb-1.5">
              <span
                className={`text-[11px] uppercase font-black tracking-wider px-2.5 py-1 rounded-full border ${currentSlide.badgeColor}`}
              >
                {currentSlide.part}
              </span>
              <span className="text-xs font-mono font-bold text-zinc-500">
                SLIDE {String(currentSlideIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              {currentSlide.title}
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-zinc-400 mt-1 font-medium">
              {currentSlide.subtitle}
            </p>
          </div>

          {/* Slide Body: Interactive Gym OR 2x2 Bullet Cards */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Interactive Simulator Embeds */}
            {currentSlide.interactiveType === 'ipos' && <InteractiveIPOSLab />}
            {currentSlide.interactiveType === 'device-sorting' && <InteractiveDeviceSorter />}
            {currentSlide.interactiveType === 'peripheral-sorting' && <InteractivePeripheralSorter />}
            {currentSlide.interactiveType === 'system-unit-disassembly' && <InteractiveDisassemblyLab />}
            {currentSlide.interactiveType === 'storage-bytes' && <InteractiveByteLadder />}
            {currentSlide.interactiveType === 'booting' && <InteractiveBootingSimulator />}
            {currentSlide.interactiveType === 'desktop-controls' && <InteractiveWindowPlayground />}
            {currentSlide.interactiveType === 'mouse-gym' && <InteractiveMouseTrainer />}
            {currentSlide.interactiveType === 'folder-lab' && <InteractiveFolderLab />}
            {currentSlide.interactiveType === 'touch-typing' && <InteractiveRapidTyping />}
            {currentSlide.interactiveType === 'quiz-launcher' && (
              <InteractiveQuizLauncher moduleId={activeModuleId} />
            )}

            {/* Standard Bulleted PowerPoint Content (2x2 Cards) */}
            {!currentSlide.interactiveType && currentSlide.bullets.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5 my-auto">
                {currentSlide.bullets.map((bullet, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800 hover:border-zinc-700 transition-all flex items-start gap-3.5 shadow-sm"
                  >
                    <span className="text-2xl sm:text-3xl p-2 rounded-xl bg-zinc-900 border border-zinc-800 shrink-0">
                      {bullet.icon}
                    </span>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white mb-0.5">
                        {bullet.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                        {bullet.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Nigerian Everyday Analogy / Golden Rule Callout */}
            {currentSlide.analogy && (
              <div className="mt-5 bg-gradient-to-r from-emerald-950/60 to-zinc-950 border border-emerald-500/40 rounded-2xl p-3.5 flex items-center gap-3">
                <span className="text-2xl shrink-0">🇳🇬</span>
                <p className="text-xs sm:text-sm text-emerald-200 font-semibold leading-snug">
                  {currentSlide.analogy}
                </p>
              </div>
            )}
          </div>

          {/* In-Slide Teacher Guide Drawer (Only when enabled by instructor) */}
          {canSeeTeacherTools && isTeacherMode && (
            <div className="mt-5 p-4 rounded-2xl bg-amber-950/50 border border-amber-500/50 text-xs text-amber-200 animate-fadeIn">
              <div className="flex items-center justify-between gap-2 font-black uppercase tracking-wider text-amber-400 mb-2">
                <span className="flex items-center gap-1.5">
                  <span>🧑‍🏫</span>
                  <span>Instructor In-Slide Talking Points & Classroom Notes:</span>
                </span>
                <button
                  onClick={() => setShowTeacherBriefModal(true)}
                  className="text-[11px] underline hover:text-white cursor-pointer font-bold"
                >
                  Open Full 1-Page Plan ↗
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-zinc-300">
                <div className="bg-zinc-950/80 p-3 rounded-xl border border-amber-800/40">
                  <span className="font-bold text-amber-400 block mb-1">❓ Ask the Class:</span>
                  <p className="text-xs leading-relaxed">{currentSlide.teacherNotes.promptQuestion}</p>
                </div>
                <div className="bg-zinc-950/80 p-3 rounded-xl border border-amber-800/40">
                  <span className="font-bold text-emerald-400 block mb-1">💡 Key Explanation:</span>
                  <p className="text-xs leading-relaxed">{currentSlide.teacherNotes.talkingPoint}</p>
                </div>
                <div className="bg-zinc-950/80 p-3 rounded-xl border border-amber-800/40">
                  <span className="font-bold text-red-400 block mb-1">⚠️ Watch Out For:</span>
                  <p className="text-xs leading-relaxed">{currentSlide.teacherNotes.watchOutFor}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Sticky Bottom Presenter Dock */}
      <footer className="sticky bottom-0 z-30 border-t border-zinc-800 bg-zinc-900/95 backdrop-blur-md px-4 py-3 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            disabled={currentSlideIndex === 0}
            className="px-4 sm:px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:pointer-events-none text-zinc-200 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-95"
          >
            <span>◀</span>
            <span className="hidden sm:inline">Previous Slide</span>
          </button>

          {/* Center: Slide indicator & Shortcut tips */}
          <div className="flex flex-col items-center">
            <span className="text-xs sm:text-sm font-black text-white tracking-wide">
              Slide {currentSlideIndex + 1} of {totalSlides}
            </span>
            <span className="text-[10px] text-zinc-400 font-mono hidden sm:block">
              Use [←] / [→] keys or Spacebar to advance
            </span>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentSlideIndex === totalSlides - 1}
            className="px-4 sm:px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:pointer-events-none text-zinc-950 font-black text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
          >
            <span className="hidden sm:inline">Next Slide</span>
            <span>▶</span>
          </button>
        </div>
      </footer>

      {/* 1-Page Teacher Briefing Modal */}
      <OnePageTeacherBriefingModal
        guide={currentGuide}
        isOpen={showTeacherBriefModal}
        onClose={() => setShowTeacherBriefModal(false)}
      />
    </div>
  );
}
