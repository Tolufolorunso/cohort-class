'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { InteractiveMouseTrainer } from './InteractiveMouseTrainer';
import { InteractiveFolderLab } from './InteractiveFolderLab';
import { InteractiveRapidTyping } from './InteractiveRapidTyping';
import { useIsInstructor } from '../../hooks/useIsInstructor';

interface Slide {
  id: number;
  part: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  bullets: Array<{ icon: string; title: string; desc: string }>;
  analogy?: string;
  interactiveType?: 'mouse' | 'folder' | 'typing';
  teacherNotes: {
    promptQuestion: string;
    talkingPoint: string;
    watchOutFor: string;
  };
}

const SLIDES: Slide[] = [
  // Slide 1: Welcome & Mission
  {
    id: 1,
    part: 'WELCOME & OVERVIEW',
    badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60',
    title: 'Today’s Practical: Mastering Your Computer',
    subtitle: 'From zero fear to fast navigation, neat files, and rapid typing!',
    bullets: [
      {
        icon: '🖱️',
        title: '1. Navigating Around',
        desc: 'Master the mouse, clicking rules, and window buttons (Minimize, Maximize, Close).',
      },
      {
        icon: '📁',
        title: '2. Computer Usage (Folders & Files)',
        desc: 'Create your own folders, name your files, and keep your school work organized.',
      },
      {
        icon: '⌨️',
        title: '3. Rapid-Typing & Home Row',
        desc: 'Find the secret bumps on F and J, sit properly, and type fast without looking down.',
      },
    ],
    analogy: 'Golden Rule: Touch the computer gently, sit straight, and don’t be afraid to click. You cannot break the computer!',
    teacherNotes: {
      promptQuestion: 'Ask the class: Who has ever been afraid of clicking the wrong button on a computer?',
      talkingPoint: 'Reassure students immediately: Computers are built to obey commands. Errors are easily undone with Ctrl+Z or Backspace.',
      watchOutFor: 'Students who look nervous or hesitant to touch the mouse or touchpad.',
    },
  },

  // Slide 2: The Mouse & Touchpad
  {
    id: 2,
    part: 'PART 1: NAVIGATING AROUND',
    badgeColor: 'bg-blue-950/80 text-blue-400 border-blue-800/60',
    title: 'The Mouse: Your Digital Hand',
    subtitle: 'Learn the 4 essential actions to talk to your computer.',
    bullets: [
      {
        icon: '👆',
        title: 'Left-Click (1 Tap)',
        desc: 'Choose or select an item. Like pointing with your index finger: "I want this one."',
      },
      {
        icon: '✌️',
        title: 'Double-Click (2 Quick Taps)',
        desc: 'Open a folder, app, or file. Like knocking twice on a classroom door: "Knock-Knock, open please!"',
      },
      {
        icon: '🖱️',
        title: 'Right-Click (1 Right Tap)',
        desc: 'Opens the Secret Options Menu! Like asking: "What can I do with this item?"',
      },
      {
        icon: '🖐️',
        title: 'Drag & Drop (Hold & Slide)',
        desc: 'Hold the left button down, slide the mouse, and let go to move something into a folder.',
      },
    ],
    analogy: 'Think of your mouse as your physical index finger reaching inside the screen!',
    teacherNotes: {
      promptQuestion: 'Ask: Why do we have two buttons on a mouse instead of just one?',
      talkingPoint: 'Left button is for doing things (Select & Open); Right button is for choices (Options menu).',
      watchOutFor: 'Students lifting the mouse completely off the desk or pressing down too hard on the touchpad.',
    },
  },

  // Slide 3: Interactive Mouse Gym
  {
    id: 3,
    part: 'PART 1: HANDS-ON PRACTICE',
    badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60',
    title: 'Practice Lab: The Mouse & Touchpad Gym',
    subtitle: 'Put your hands on the mouse or touchpad and complete the 5 challenges!',
    bullets: [],
    interactiveType: 'mouse',
    teacherNotes: {
      promptQuestion: 'Check laptop pairs: Partner A does steps 1-2, Partner B does steps 3-4!',
      talkingPoint: 'Encourage students to relax their wrists and keep the mouse flat on the mousepad or desk.',
      watchOutFor: 'Students who struggle with double-clicking because they tap too slowly. Remind them: "Tap-tap quickly!"',
    },
  },

  // Slide 4: Window Controls
  {
    id: 4,
    part: 'PART 1: NAVIGATING AROUND',
    badgeColor: 'bg-blue-950/80 text-blue-400 border-blue-800/60',
    title: 'Window Controls: The Top-Right Corner',
    subtitle: 'Every window on your computer has 3 magic buttons.',
    bullets: [
      {
        icon: '➖',
        title: 'Minimize (Minus)',
        desc: 'Puts the window to sleep down on the Taskbar at the bottom. The app is NOT closed!',
      },
      {
        icon: '🗖',
        title: 'Maximize / Restore (Square)',
        desc: 'Expands the window to fill your entire laptop screen so you have full room to work.',
      },
      {
        icon: '❌',
        title: 'Close (Red X)',
        desc: 'Completely shuts the app when you are finished. (Always save your work first!)',
      },
    ],
    analogy: 'The Taskbar at the bottom of your screen is like a shelf. Minimize puts your book on the shelf; Close puts it back in the locker.',
    teacherNotes: {
      promptQuestion: 'Ask: If you click Minimize (−), is your document deleted?',
      talkingPoint: 'Stress that Minimize merely hides the window on the bottom Taskbar shelf. You can click it anytime to wake it up.',
      watchOutFor: 'Students panicking when a window disappears after clicking Minimize.',
    },
  },

  // Slide 5: Folders vs Files
  {
    id: 5,
    part: 'PART 2: COMPUTER USAGE',
    badgeColor: 'bg-amber-950/80 text-amber-400 border-amber-800/60',
    title: 'Folders vs. Files: The Golden Difference',
    subtitle: 'Never confuse where you store things with what you created.',
    bullets: [
      {
        icon: '📁',
        title: 'A Folder (The Container / School Bag)',
        desc: 'A yellow envelope that holds files and other folders. It keeps your desktop neat so papers are not scattered.',
      },
      {
        icon: '📄',
        title: 'A File (The Paper / Homework)',
        desc: 'The actual item you created: a typed essay, drawing, photo, or music track (e.g. notes.txt or photo.jpg).',
      },
      {
        icon: '🏷️',
        title: 'File Extensions (.txt, .docx, .png)',
        desc: 'The letters after the dot tell the computer what type of paper it is so it opens with the right app.',
      },
    ],
    analogy: 'Real-Life Nigerian Analogy: A Folder is like your School Bag or Cupboard. A File is the exercise book sheet you put inside!',
    teacherNotes: {
      promptQuestion: 'Ask: Can you write text directly inside a folder without creating a file?',
      talkingPoint: 'A folder is empty space for organizing. You write inside files, and store files inside folders.',
      watchOutFor: 'Students naming every folder "New Folder" without renaming it.',
    },
  },

  // Slide 6: How to Create a Folder (5 Steps)
  {
    id: 6,
    part: 'PART 2: COMPUTER USAGE',
    badgeColor: 'bg-amber-950/80 text-amber-400 border-amber-800/60',
    title: 'How to Create a New Folder in 5 Steps',
    subtitle: 'Memorize these 5 simple steps for every computer you ever use.',
    bullets: [
      {
        icon: '1️⃣',
        title: 'Step 1: Find Empty Space',
        desc: 'Move your mouse pointer to an empty area on your Desktop or inside a folder.',
      },
      {
        icon: '2️⃣',
        title: 'Step 2: Right-Click',
        desc: 'Click your right mouse button to open the secret options menu.',
      },
      {
        icon: '3️⃣',
        title: 'Step 3: Point to "New"',
        desc: 'Slide your pointer gently down to "New" to see what you can create.',
      },
      {
        icon: '4️⃣',
        title: 'Step 4: Click "Folder"',
        desc: 'Click the yellow "Folder" icon. A new yellow folder appears on your screen!',
      },
      {
        icon: '5️⃣',
        title: 'Step 5: Type Name & Press Enter',
        desc: 'Type your name (e.g. "Adeola Computer Notes") and press the big ENTER key!',
      },
    ],
    analogy: 'Pro Shortcut: You can also press Ctrl + Shift + N to instantly spawn a new folder!',
    teacherNotes: {
      promptQuestion: 'Ask: What key on the keyboard locks in your new folder name?',
      talkingPoint: 'The ENTER key (or Return key) submits and saves your new name.',
      watchOutFor: 'Students clicking away before typing the name, resulting in folders named "New folder (2)".',
    },
  },

  // Slide 7: Interactive Desktop Simulator
  {
    id: 7,
    part: 'PART 2: HANDS-ON PRACTICE',
    badgeColor: 'bg-amber-950/80 text-amber-400 border-amber-800/60',
    title: 'Practice Lab: Create Folders & Files',
    subtitle: 'Try creating a folder, renaming it with your name, and creating a file inside!',
    bullets: [],
    interactiveType: 'folder',
    teacherNotes: {
      promptQuestion: 'Challenge: Have each partner create a folder with their own first name!',
      talkingPoint: 'Demonstrate how double-clicking opens the folder so you can see what is inside.',
      watchOutFor: 'Students who accidentally delete items. Remind them that deleted items go to the Recycle Bin.',
    },
  },

  // Slide 8: Rapid-Typing & Home Row Secret
  {
    id: 8,
    part: 'PART 3: RAPID-TYPING',
    badgeColor: 'bg-cyan-950/80 text-cyan-400 border-cyan-800/60',
    title: 'Rapid-Typing: The Secret of the Home Row',
    subtitle: 'How professional programmers and typists type fast without looking down.',
    bullets: [
      {
        icon: '🪑',
        title: '1. Champion Sitting Posture',
        desc: 'Sit upright, feet flat on the ground, screen at eye level. Relax your wrists!',
      },
      {
        icon: '📍',
        title: '2. The Two Secret Bumps (F and J)',
        desc: 'Feel keys F and J on your keyboard right now! They have tiny raised bumps so your index fingers can find home in the dark.',
      },
      {
        icon: '🖐️',
        title: '3. Left Hand Home: A - S - D - F',
        desc: 'Pinky on A, Ring on S, Middle on D, Pointer on F.',
      },
      {
        icon: '🖐️',
        title: '4. Right Hand Home: J - K - L - ;',
        desc: 'Pointer on J, Middle on K, Ring on L, Pinky on ;. Both thumbs rest on the Spacebar!',
      },
    ],
    analogy: 'The Golden Rule of Rapid Typing: Keep your eyes on the SCREEN, not your fingers. Trust the bumps on F and J!',
    teacherNotes: {
      promptQuestion: 'Ask everyone right now: Close your eyes and use your index fingers to find the bumps on F and J!',
      talkingPoint: 'Once fingers learn where home is, typing becomes muscle memory just like riding a bicycle.',
      watchOutFor: 'Students typing with only one finger ("chicken pecking"). Insist on resting all 8 fingers on the home row.',
    },
  },

  // Slide 9: Interactive Rapid-Typing Arena
  {
    id: 9,
    part: 'PART 3: HANDS-ON PRACTICE',
    badgeColor: 'bg-cyan-950/80 text-cyan-400 border-cyan-800/60',
    title: 'Practice Lab: Rapid-Typing Arena',
    subtitle: 'Type the keys shown on screen. Watch your speed (WPM) and accuracy climb!',
    bullets: [],
    interactiveType: 'typing',
    teacherNotes: {
      promptQuestion: 'Competition: Who can reach over 15 WPM with 95% accuracy on Level 1?',
      talkingPoint: 'Accuracy is more important than speed. Speed comes automatically when you hit the right keys.',
      watchOutFor: 'Students looking down at their hands. Challenge them to look only at the screen.',
    },
  },

  // Slide 10: Summary & 3 Life-Saving Shortcuts
  {
    id: 10,
    part: 'SUMMARY & TAKEAWAYS',
    badgeColor: 'bg-purple-950/80 text-purple-400 border-purple-800/60',
    title: 'The 3 Life-Saving Shortcuts & Class Summary',
    subtitle: 'Memorize these 3 shortcuts to protect your work from NEPA power cuts!',
    bullets: [
      {
        icon: '💾',
        title: 'Ctrl + S = SAVE YOUR WORK!',
        desc: 'Press this every 2 minutes! In Nigeria, NEPA can strike anytime. Ctrl + S ensures your notes are never lost.',
      },
      {
        icon: '📋',
        title: 'Ctrl + C = COPY',
        desc: 'Duplicates any highlighted text or file without deleting the original.',
      },
      {
        icon: '📌',
        title: 'Ctrl + V = PASTE',
        desc: 'Puts the copied text or file into the new location or folder.',
      },
    ],
    analogy: 'Class Checklist: Left-click selects, Double-click opens, Right-click options. Folders hold files. Home row is ASDF JKL;. Ctrl+S saves your life!',
    teacherNotes: {
      promptQuestion: 'Ask: What shortcut will save you when NEPA takes the light?',
      talkingPoint: 'Have the whole class chant: "Ctrl + S! Save my work!" Have them write the 3 shortcuts into their notebooks.',
      watchOutFor: 'Students pressing Ctrl and S one after another instead of holding Ctrl while tapping S.',
    },
  },
];

export function TodayClassDeck() {
  const isInstructor = useIsInstructor();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isTeacherMode, setIsTeacherMode] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const totalSlides = SLIDES.length;
  const currentSlide = SLIDES[currentSlideIndex];

  const handleNext = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleSelectSlide = (index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlideIndex(index);
    }
  };

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

  // Keyboard Navigation: Left/Right arrows, Spacebar, F for Fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing in an input
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
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 't') {
        if (isInstructor) {
          e.preventDefault();
          setIsTeacherMode((prev) => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isInstructor]);

  return (
    <div className="w-full flex-1 flex flex-col bg-zinc-950 text-zinc-100 min-h-screen">
      {/* Top Slide Presentation Control Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/90 backdrop-blur-md px-4 py-2.5 sm:px-6 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-30 shadow-md">
        {/* Left: Branding & Slide Counter */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-black text-sm hover:scale-105 transition-all"
            title="Return to Student Portal"
          >
            DZ
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-white">
                Today&apos;s Practical Class
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-black uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-700/60">
                Slide {currentSlideIndex + 1} of {totalSlides}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 hidden sm:block">
              Rapid-Typing • Computer Usage • Navigating Around
            </p>
          </div>
        </div>

        {/* Center: Slide Jump Selector */}
        <div className="flex items-center gap-2">
          <select
            value={currentSlideIndex}
            onChange={(e) => handleSelectSlide(Number(e.target.value))}
            className="bg-zinc-950 border border-zinc-700 text-xs font-semibold text-zinc-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer max-w-[200px] sm:max-w-xs truncate"
          >
            {SLIDES.map((slide, idx) => (
              <option key={slide.id} value={idx}>
                {idx + 1}. {slide.title}
              </option>
            ))}
          </select>
        </div>

        {/* Right: Tools & Mode Toggles */}
        <div className="flex items-center gap-2">
          {/* Teacher Guide Toggle - Only visible to authenticated instructors */}
          {isInstructor && (
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

          {/* Copy Notes Modal Trigger */}
          <button
            onClick={() => setShowNotesModal(true)}
            className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
            title="View Student Copy Notes"
          >
            <span>📖</span>
            <span className="hidden sm:inline">Notebook Summary</span>
          </button>

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

      {/* Progress Bar */}
      <div className="w-full bg-zinc-900 h-1.5">
        <div
          className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-amber-500 h-full transition-all duration-300"
          style={{ width: `${((currentSlideIndex + 1) / totalSlides) * 100}%` }}
        />
      </div>

      {/* Main Slide Stage Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-center">
        {/* PowerPoint Slide Container (Clean 16:9 feel, not crowded!) */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm flex flex-col justify-between min-h-[520px] transition-all">
          {/* Slide Header */}
          <div className="border-b border-zinc-800/80 pb-4 mb-6">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span
                className={`text-xs uppercase font-black tracking-wider px-2.5 py-1 rounded-full border ${currentSlide.badgeColor}`}
              >
                {currentSlide.part}
              </span>
              <span className="text-xs font-mono font-bold text-zinc-500">
                SLIDE {String(currentSlideIndex + 1).padStart(2, '0')} / {totalSlides}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {currentSlide.title}
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 mt-1 font-medium">
              {currentSlide.subtitle}
            </p>
          </div>

          {/* Slide Body Content */}
          <div className="flex-1 flex flex-col justify-center">
            {/* If slide has interactive simulation */}
            {currentSlide.interactiveType === 'mouse' && <InteractiveMouseTrainer />}
            {currentSlide.interactiveType === 'folder' && <InteractiveFolderLab />}
            {currentSlide.interactiveType === 'typing' && <InteractiveRapidTyping />}

            {/* If slide is bulleted PowerPoint content */}
            {!currentSlide.interactiveType && currentSlide.bullets.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 my-auto">
                {currentSlide.bullets.map((bullet, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800 hover:border-zinc-700 transition-all flex items-start gap-4 shadow-sm"
                  >
                    <span className="text-3xl sm:text-4xl p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                      {bullet.icon}
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-1">
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

            {/* Nigerian Real-World Analogy / Golden Rule Callout */}
            {currentSlide.analogy && (
              <div className="mt-6 bg-gradient-to-r from-emerald-950/60 to-zinc-950 border border-emerald-500/40 rounded-2xl p-4 flex items-center gap-3">
                <span className="text-2xl">🇳🇬</span>
                <p className="text-xs sm:text-sm text-emerald-200 font-semibold leading-snug">
                  {currentSlide.analogy}
                </p>
              </div>
            )}
          </div>

          {/* Teacher Guide Drawer - Only visible to authenticated instructors */}
          {isInstructor && isTeacherMode && (
            <div className="mt-6 p-4 rounded-2xl bg-amber-950/50 border border-amber-500/50 text-xs text-amber-200 animate-fadeIn">
              <div className="flex items-center gap-2 font-black uppercase tracking-wider text-amber-400 mb-2">
                <span>🧑‍🏫 Instructor Talking Points & Classroom Notes:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-zinc-300">
                <div className="bg-zinc-950/80 p-2.5 rounded-xl border border-amber-800/40">
                  <span className="font-bold text-amber-400 block mb-1">❓ Ask the Class:</span>
                  <p>{currentSlide.teacherNotes.promptQuestion}</p>
                </div>
                <div className="bg-zinc-950/80 p-2.5 rounded-xl border border-amber-800/40">
                  <span className="font-bold text-emerald-400 block mb-1">💡 Key Explanation:</span>
                  <p>{currentSlide.teacherNotes.talkingPoint}</p>
                </div>
                <div className="bg-zinc-950/80 p-2.5 rounded-xl border border-amber-800/40">
                  <span className="font-bold text-red-400 block mb-1">⚠️ Watch Out For:</span>
                  <p>{currentSlide.teacherNotes.watchOutFor}</p>
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
            className={`px-4 sm:px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer border ${
              currentSlideIndex === 0
                ? 'bg-zinc-900 text-zinc-600 border-zinc-800 cursor-not-allowed opacity-50'
                : 'bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700 shadow-sm active:scale-95'
            }`}
          >
            <span>◀ Previous Slide</span>
            <span className="text-[10px] text-zinc-400 hidden sm:inline">(← key)</span>
          </button>

          {/* Dots Indicator */}
          <div className="hidden md:flex items-center gap-1.5">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectSlide(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentSlideIndex
                    ? 'w-6 bg-emerald-400'
                    : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                }`}
                title={`Jump to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentSlideIndex === totalSlides - 1}
            className={`px-5 sm:px-8 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 ${
              currentSlideIndex === totalSlides - 1
                ? 'bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed opacity-50'
                : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-black shadow-emerald-500/20'
            }`}
          >
            <span>Next Slide ▶</span>
            <span className="text-[10px] text-zinc-900/80 hidden sm:inline">(→ / Space)</span>
          </button>
        </div>
      </footer>

      {/* Copy Notes Modal for Students */}
      {showNotesModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📝</span>
                <h3 className="text-lg font-black text-white">
                  Class Notes: Copy into Your Exercise Book
                </h3>
              </div>
              <button
                onClick={() => setShowNotesModal(false)}
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 text-xs sm:text-sm text-zinc-300 pr-2">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <h4 className="font-bold text-emerald-400 text-sm mb-1">
                  1. Mouse Actions:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-zinc-300">
                  <li><strong>Left-Click:</strong> Select or choose an item.</li>
                  <li><strong>Double-Click:</strong> Knock twice to open folders and apps.</li>
                  <li><strong>Right-Click:</strong> Opens the Secret Options Menu.</li>
                  <li><strong>Drag & Drop:</strong> Hold left button + slide to move files.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <h4 className="font-bold text-amber-400 text-sm mb-1">
                  2. Folders & Files:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-zinc-300">
                  <li><strong>Folder:</strong> The school bag/envelope. Holds files inside.</li>
                  <li><strong>File:</strong> The sheet of paper you create (e.g. notes.txt).</li>
                  <li><strong>Create Folder:</strong> Right-click empty space ➔ New ➔ Folder ➔ Type name ➔ Enter.</li>
                  <li><strong>Rename Shortcut:</strong> Select item and press <strong>F2</strong>.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <h4 className="font-bold text-cyan-400 text-sm mb-1">
                  3. Rapid-Typing & Home Row:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-zinc-300">
                  <li><strong>Left Hand:</strong> A, S, D, F (Index on bump F).</li>
                  <li><strong>Right Hand:</strong> J, K, L, ; (Index on bump J).</li>
                  <li><strong>Thumbs:</strong> Rest on Spacebar.</li>
                  <li><strong>Golden Rule:</strong> Keep eyes on the screen, not fingers!</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <h4 className="font-bold text-purple-400 text-sm mb-1">
                  4. The 3 Life-Saving Shortcuts:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-zinc-300">
                  <li><strong>Ctrl + S:</strong> Save your work (protect from NEPA power cuts!).</li>
                  <li><strong>Ctrl + C:</strong> Copy highlighted text or files.</li>
                  <li><strong>Ctrl + V:</strong> Paste copied items into the new place.</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-4 mt-4 flex items-center justify-between">
              <span className="text-xs text-zinc-500">
                Dzuels Computer Class • Foundational Practical
              </span>
              <button
                onClick={() => setShowNotesModal(false)}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs cursor-pointer shadow-md"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
