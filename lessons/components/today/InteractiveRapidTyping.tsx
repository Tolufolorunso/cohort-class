'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

export interface TypingLevel {
  id: number;
  tier: 1 | 2 | 3 | 4 | 5;
  tierName: string;
  name: string;
  description: string;
  text: string;
  targetWpm?: number;
}

export const TYPING_LEVELS: TypingLevel[] = [
  // Tier 1: Home Row Foundations (Levels 1-4)
  {
    id: 1,
    tier: 1,
    tierName: 'Tier 1: Home Row',
    name: 'Level 1: Home Row Base Anchors',
    description: 'Anchor fingers on A S D F (Left Hand) and J K L ; (Right Hand)',
    text: 'asdf jkl; asdf jkl; asdf jkl; fjdksla;',
    targetWpm: 12,
  },
  {
    id: 2,
    tier: 1,
    tierName: 'Tier 1: Home Row',
    name: 'Level 2: Alternating Hand Rhythm',
    description: 'Keep thumbs rested on Space and alternate left and right hands smoothly.',
    text: 'a j s k d l f ; aa jj ss kk dd ll ff ;;',
    targetWpm: 15,
  },
  {
    id: 3,
    tier: 1,
    tierName: 'Tier 1: Home Row',
    name: 'Level 3: Home Row Real Words',
    description: 'Real English words typed strictly with your Home Row fingers!',
    text: 'dad sad ask fall glad flask salad all salsa',
    targetWpm: 18,
  },
  {
    id: 4,
    tier: 1,
    tierName: 'Tier 1: Home Row',
    name: 'Level 4: Home Row Full Sentences',
    description: 'Keep your eyes on the screen and do not look down at the keyboard.',
    text: 'all lads ask for dad and dad had a salad',
    targetWpm: 20,
  },

  // Tier 2: Top Row Integration (Levels 5-8)
  {
    id: 5,
    tier: 2,
    tierName: 'Tier 2: Top Row',
    name: 'Level 5: Top Row Reaching Anchors',
    description: 'Reach up from Home Row to Q W E R T Y and U I O P then return to base.',
    text: 'qwer tyui op qwer uiop reew tyyt pour tree',
    targetWpm: 16,
  },
  {
    id: 6,
    tier: 2,
    tierName: 'Tier 2: Top Row',
    name: 'Level 6: Top Row Computer Words',
    description: 'Type essential computer terms combining Top Row and Home Row.',
    text: 'type write power root pure wire port tower route',
    targetWpm: 20,
  },
  {
    id: 7,
    tier: 2,
    tierName: 'Tier 2: Top Row',
    name: 'Level 7: Top & Home Row Flow',
    description: 'Flow smoothly across two full rows of letters without lifting your palms.',
    text: 'we were quiet while they wrote their reports well',
    targetWpm: 22,
  },
  {
    id: 8,
    tier: 2,
    tierName: 'Tier 2: Top Row',
    name: 'Level 8: The English Alphabet Pangram',
    description: 'The famous typist sentence containing all standard English letters.',
    text: 'the quick brown fox jumps over the lazy dog',
    targetWpm: 25,
  },

  // Tier 3: Bottom Row & Shift Keys (Levels 9-12)
  {
    id: 9,
    tier: 3,
    tierName: 'Tier 3: Bottom Row & Capitals',
    name: 'Level 9: Bottom Row Reaching Anchors',
    description: 'Reach downwards with fingers to Z X C V and B N M without moving your wrists.',
    text: 'zxcv bnm zxcv bnm van cab mix zinc moon ban',
    targetWpm: 18,
  },
  {
    id: 10,
    tier: 3,
    tierName: 'Tier 3: Bottom Row & Capitals',
    name: 'Level 10: Three-Row Core Tech Words',
    description: 'Words spanning Home, Top, and Bottom rows for complete keyboard reach.',
    text: 'cable monitor screen mouse backup branch client zoom',
    targetWpm: 22,
  },
  {
    id: 11,
    tier: 3,
    tierName: 'Tier 3: Bottom Row & Capitals',
    name: 'Level 11: Capital Letters & Shift Coordination',
    description: 'Hold opposite Shift key with pinky while striking capital letters.',
    text: 'Lagos Abuja Nigeria Africa Python Windows CPU RAM',
    targetWpm: 22,
  },
  {
    id: 12,
    tier: 3,
    tierName: 'Tier 3: Bottom Row & Capitals',
    name: 'Level 12: African Innovation Sentences',
    description: 'Flow through capitalized sentences celebrating African technology builders.',
    text: 'In Nigeria, smart young students build the future with code.',
    targetWpm: 25,
  },

  // Tier 4: Numbers, Punctuation & CLI Syntax (Levels 13-16)
  {
    id: 13,
    tier: 4,
    tierName: 'Tier 4: Numbers & Symbols',
    name: 'Level 13: Number Row Precision',
    description: 'Reach up to the number keys 1 through 0 with precision.',
    text: '12345 67890 2023 2025 2026 100 250 500 1000',
    targetWpm: 20,
  },
  {
    id: 14,
    tier: 4,
    tierName: 'Tier 4: Numbers & Symbols',
    name: 'Level 14: Practical Passwords & Symbols',
    description: 'Practice everyday punctuation and secure password characters.',
    text: 'pass#2026, price=$150, battery=100%, count=(score*2);',
    targetWpm: 22,
  },
  {
    id: 15,
    tier: 4,
    tierName: 'Tier 4: Numbers & Symbols',
    name: 'Level 15: Essential Keyboard Shortcuts',
    description: 'Master typing common keyboard combinations and shortcut rules.',
    text: 'Ctrl+C copies, Ctrl+V pastes, and Ctrl+S saves your work!',
    targetWpm: 25,
  },
  {
    id: 16,
    tier: 4,
    tierName: 'Tier 4: Numbers & Symbols',
    name: 'Level 16: Terminal Commands & Paths',
    description: 'Real developer terminal commands typed in programming workflows.',
    text: 'cd /lessons && npm run dev --port 3000 && git status',
    targetWpm: 26,
  },

  // Tier 5: African Tech & Speedrun Challenges (Levels 17-20)
  {
    id: 17,
    tier: 5,
    tierName: 'Tier 5: Speedrun Champion',
    name: 'Level 17: Yaba Tech Hub Innovation',
    description: 'Passage on Nigerian technological advancements and digital education.',
    text: 'Software developers in Yaba and Ikeja build digital products used worldwide.',
    targetWpm: 28,
  },
  {
    id: 18,
    tier: 5,
    tierName: 'Tier 5: Speedrun Champion',
    name: 'Level 18: The Sacred IPOS Data Cycle',
    description: 'Formal curriculum summary typed at high speed and accuracy.',
    text: 'Computers process raw unorganized data into meaningful information through IPOS.',
    targetWpm: 30,
  },
  {
    id: 19,
    tier: 5,
    tierName: 'Tier 5: Speedrun Champion',
    name: 'Level 19: Typing Ergonomics & Posture',
    description: 'Typing wisdom for posture, wrist health, and long-term focus.',
    text: 'Sit straight, keep feet flat, breathe calmly, and let your fingers glide effortlessly.',
    targetWpm: 32,
  },
  {
    id: 20,
    tier: 5,
    tierName: 'Tier 5: Speedrun Champion',
    name: 'Level 20: Grandmaster Speedrun Final',
    description: 'The ultimate 20-level championship sprint. Unlock your Grandmaster badge!',
    text: 'Congratulations! You have conquered all twenty levels of rapid typing at Dzuels Computer Class!',
    targetWpm: 35,
  },
];

export function InteractiveRapidTyping() {
  const [selectedLevelId, setSelectedLevelId] = useState<number>(1);
  const [selectedTierFilter, setSelectedTierFilter] = useState<number | 'all'>('all');

  const currentLevel = useMemo(() => {
    return TYPING_LEVELS.find((l) => l.id === selectedLevelId) || TYPING_LEVELS[0];
  }, [selectedLevelId]);

  const filteredLevels = useMemo(() => {
    if (selectedTierFilter === 'all') return TYPING_LEVELS;
    return TYPING_LEVELS.filter((l) => l.tier === selectedTierFilter);
  }, [selectedTierFilter]);

  const targetText = currentLevel.text;
  const [userInput, setUserInput] = useState<string>('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number | null>(null);
  const [errorsCount, setErrorsCount] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!startTime || endTime) return;
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 500);
    return () => clearInterval(interval);
  }, [startTime, endTime]);

  const handleReset = useCallback((levelId?: number) => {
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setCurrentTime(null);
    setErrorsCount(0);
    setIsCompleted(false);
    if (levelId) {
      setSelectedLevelId(levelId);
    }
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isCompleted) return;

    const now = Date.now();
    if (!startTime && value.length > 0) {
      setStartTime(now);
      setCurrentTime(now);
    }

    // Check last typed character
    const lastTypedIndex = value.length - 1;
    if (lastTypedIndex >= 0 && lastTypedIndex < targetText.length) {
      if (value[lastTypedIndex] !== targetText[lastTypedIndex]) {
        setErrorsCount((prev) => prev + 1);
      }
    }

    setUserInput(value);

    // Completed level
    if (value.length >= targetText.length) {
      setEndTime(now);
      setCurrentTime(now);
      setIsCompleted(true);
    }
  };

  // Metrics calculation
  const totalChars = targetText.length;
  const typedLength = userInput.length;
  const progressPercent = Math.min(100, Math.round((typedLength / totalChars) * 100));

  const effectiveEnd = endTime || currentTime || startTime || 0;
  const elapsedSeconds =
    startTime && effectiveEnd > startTime
      ? Math.max(1, Math.round((effectiveEnd - startTime) / 1000))
      : 0;

  const wordsTyped = typedLength / 5;
  const wpm = elapsedSeconds > 0 ? Math.round((wordsTyped / elapsedSeconds) * 60) : 0;
  const accuracy = typedLength > 0 ? Math.max(0, Math.round(((typedLength - errorsCount) / typedLength) * 100)) : 100;

  return (
    <div className="w-full bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col gap-4 select-none">
      {/* Header and Level Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold tracking-wider text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">
              Keyboard Speed Lab
            </span>
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60">
              Level {selectedLevelId} of 20
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-white mt-1">
            {currentLevel.name}
          </h4>
        </div>

        <div className="flex items-center gap-2">
          {/* Reset button */}
          <button
            onClick={() => handleReset()}
            className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all text-xs font-bold border border-zinc-700 cursor-pointer flex items-center gap-1.5"
            title="Reset current level"
          >
            <span>↺</span>
            <span>Restart</span>
          </button>
        </div>
      </div>

      {/* Tier Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold bg-zinc-950/60 p-1.5 rounded-xl border border-zinc-800/80">
        <span className="text-[10px] text-zinc-500 uppercase font-black px-2">Tiers:</span>
        <button
          onClick={() => setSelectedTierFilter('all')}
          className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
            selectedTierFilter === 'all'
              ? 'bg-zinc-700 text-white font-bold shadow-sm'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
          }`}
        >
          All (20)
        </button>
        {[1, 2, 3, 4, 5].map((tierNum) => {
          const labels: Record<number, string> = {
            1: 'Tier 1: Home Row',
            2: 'Tier 2: Top Row',
            3: 'Tier 3: Bottom Row',
            4: 'Tier 4: Numbers & Symbols',
            5: 'Tier 5: Speedrun',
          };
          return (
            <button
              key={tierNum}
              onClick={() => setSelectedTierFilter(tierNum)}
              className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                selectedTierFilter === tierNum
                  ? 'bg-cyan-500 text-zinc-950 font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              {labels[tierNum]}
            </button>
          );
        })}
      </div>

      {/* Level Selection Pills Horizontal Scroll */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 text-xs font-medium scrollbar-thin">
        {filteredLevels.map((level) => {
          const isCurrent = level.id === selectedLevelId;
          return (
            <button
              key={level.id}
              onClick={() => handleReset(level.id)}
              className={`px-2.5 py-1.5 rounded-xl whitespace-nowrap transition-all border text-xs cursor-pointer ${
                isCurrent
                  ? 'bg-cyan-500 text-zinc-950 font-black border-cyan-400 shadow-md scale-105'
                  : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white'
              }`}
            >
              <span className="font-mono font-bold mr-1">#{level.id}</span>
              <span>{level.name.split(':')[1]?.trim() || level.name}</span>
            </button>
          );
        })}
      </div>

      {/* Level Description */}
      <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80 flex items-center justify-between text-xs text-zinc-300">
        <p className="font-medium">
          🎯 <strong className="text-white">{currentLevel.tierName}:</strong> {currentLevel.description}
        </p>
        {currentLevel.targetWpm && (
          <span className="text-[11px] font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/60 whitespace-nowrap ml-2">
            Goal: {currentLevel.targetWpm} WPM
          </span>
        )}
      </div>

      {/* Live Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
        <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
          <span className="text-[10px] text-zinc-400 uppercase font-bold">Speed (WPM)</span>
          <p className="text-xl sm:text-2xl font-black text-cyan-400">{wpm}</p>
        </div>
        <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
          <span className="text-[10px] text-zinc-400 uppercase font-bold">Accuracy</span>
          <p className="text-xl sm:text-2xl font-black text-emerald-400">{accuracy}%</p>
        </div>
        <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
          <span className="text-[10px] text-zinc-400 uppercase font-bold">Progress</span>
          <p className="text-xl sm:text-2xl font-black text-amber-400">{progressPercent}%</p>
        </div>
        <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
          <span className="text-[10px] text-zinc-400 uppercase font-bold">Mistakes</span>
          <p className="text-xl sm:text-2xl font-black text-red-400">{errorsCount}</p>
        </div>
      </div>

      {/* Typing Display Box */}
      <div
        onClick={() => inputRef.current?.focus()}
        className="bg-zinc-950 border-2 border-cyan-500/40 rounded-2xl p-5 sm:p-6 cursor-text relative shadow-inner overflow-hidden min-h-[140px] flex flex-col justify-center"
      >
        {/* Hidden Input for Real Keystrokes */}
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInputChange}
          autoFocus
          className="absolute inset-0 opacity-0 cursor-text w-full h-full"
        />

        {/* Text Presentation */}
        <div className="font-mono text-base sm:text-xl tracking-wider flex flex-wrap gap-y-2 leading-relaxed">
          {targetText.split('').map((char, index) => {
            const isTyped = index < userInput.length;
            const isCurrent = index === userInput.length;
            const isCorrect = isTyped && userInput[index] === char;
            const isWrong = isTyped && userInput[index] !== char;

            let charColor = 'text-zinc-600';
            if (isCorrect) charColor = 'text-emerald-400 font-bold';
            if (isWrong) charColor = 'text-red-400 bg-red-950/80 underline font-bold';

            return (
              <span
                key={index}
                className={`relative px-0.5 rounded transition-colors ${charColor} ${
                  isCurrent ? 'bg-cyan-500/30 text-cyan-200 ring-2 ring-cyan-400 font-black animate-pulse' : ''
                }`}
              >
                {char === ' ' ? '␣' : char}
                {isCurrent && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400" />
                )}
              </span>
            );
          })}
        </div>

        {/* Focus prompt if not active */}
        {!isCompleted && userInput.length === 0 && (
          <div className="mt-4 text-xs text-cyan-400 font-semibold flex items-center gap-1.5 animate-pulse">
            <span>⌨️ Click here or just start typing on your keyboard to begin!</span>
          </div>
        )}

        {/* Completed Celebration Banner */}
        {isCompleted && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-center animate-fadeIn">
            <span className="text-3xl">🎉 ⭐ 🏆</span>
            <h5 className="text-base sm:text-lg font-black text-emerald-300 mt-1">
              {selectedLevelId === 20 ? '👑 Grandmaster Speed Champion!' : 'Level Completed Champion!'}
            </h5>
            <p className="text-xs text-zinc-300 mt-0.5">
              Speed: <strong>{wpm} WPM</strong> | Accuracy: <strong>{accuracy}%</strong> | Mistakes: <strong>{errorsCount}</strong>
            </p>
            <div className="mt-3 flex justify-center gap-2">
              {selectedLevelId < 20 ? (
                <button
                  onClick={() => handleReset(selectedLevelId + 1)}
                  className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Next Level ({selectedLevelId + 1}) ➔
                </button>
              ) : (
                <button
                  onClick={() => handleReset(1)}
                  className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  🏆 Replay Grandmaster Champion Challenge
                </button>
              )}
              <button
                onClick={() => handleReset(selectedLevelId)}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-all"
              >
                Retry Level
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
