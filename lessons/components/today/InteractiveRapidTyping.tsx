'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface TypingLevel {
  id: number;
  name: string;
  description: string;
  text: string;
}

const TYPING_LEVELS: TypingLevel[] = [
  {
    id: 1,
    name: 'Level 1: Home Row Base',
    description: 'Master the anchor keys: A S D F (Left Hand) & J K L ; (Right Hand)',
    text: 'asdf jkl; asdf jkl; fjdksla;',
  },
  {
    id: 2,
    name: 'Level 2: First Real Words',
    description: 'Type actual words made only with your Home Row fingers!',
    text: 'dad sad ask fall glad flask salad all',
  },
  {
    id: 3,
    name: 'Level 3: Full Sentence Flow',
    description: 'Fast hands! Keep your eyes on the screen and do not look down.',
    text: 'all lads ask for dad and dad had a salad',
  },
];

export function InteractiveRapidTyping() {
  const [selectedLevelId, setSelectedLevelId] = useState<number>(1);
  const currentLevel = TYPING_LEVELS.find((l) => l.id === selectedLevelId) || TYPING_LEVELS[0];

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

  // Next required character
  const nextChar = targetText[typedLength] || '';

  return (
    <div className="w-full bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col gap-4 select-none">
      {/* Header and Level Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">
            Keyboard Speed Lab
          </span>
          <h4 className="text-base sm:text-lg font-bold text-white mt-1">
            Rapid-Typing Trainer: Home Row Mastery
          </h4>
        </div>

        {/* Level Selector Pills */}
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          {TYPING_LEVELS.map((level) => (
            <button
              key={level.id}
              onClick={() => handleReset(level.id)}
              className={`px-3 py-1 rounded-lg transition-all ${
                selectedLevelId === level.id
                  ? 'bg-cyan-500 text-zinc-950 font-black shadow-md'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {level.name.split(':')[0]}
            </button>
          ))}
          <button
            onClick={() => handleReset()}
            className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-all text-xs"
            title="Reset text"
          >
            ↺ Restart
          </button>
        </div>
      </div>

      {/* Level Description */}
      <p className="text-xs text-zinc-400 font-medium">
        🎯 {currentLevel.description}
      </p>

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
        className="bg-zinc-950 border-2 border-cyan-500/40 rounded-2xl p-5 sm:p-6 cursor-text relative shadow-inner overflow-hidden"
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
        <div className="font-mono text-lg sm:text-2xl tracking-widest flex flex-wrap gap-y-2 leading-relaxed">
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
              Level Completed Champion!
            </h5>
            <p className="text-xs text-zinc-300 mt-0.5">
              Speed: <strong>{wpm} WPM</strong> | Accuracy: <strong>{accuracy}%</strong>
            </p>
            <div className="mt-3 flex justify-center gap-2">
              {selectedLevelId < 3 ? (
                <button
                  onClick={() => handleReset(selectedLevelId + 1)}
                  className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Next Level ({selectedLevelId + 1}) ➔
                </button>
              ) : (
                <button
                  onClick={() => handleReset(1)}
                  className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-black text-xs transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Play Again ↺
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Visual Home-Row Keyboard Guide */}
      <div className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-3 flex flex-col items-center gap-2">
        <div className="text-[11px] font-bold text-zinc-400 flex items-center justify-between w-full px-2">
          <span>🖐️ Left Hand: <strong>A S D F</strong></span>
          <span className="text-cyan-400 font-black">Next Key: [{nextChar === ' ' ? 'SPACEBAR' : nextChar.toUpperCase() || 'DONE'}]</span>
          <span>Right Hand: <strong>J K L ;</strong> 🖐️</span>
        </div>

        {/* Mini Home Row Keyboard Visual */}
        <div className="flex items-center gap-1.5 py-1 overflow-x-auto max-w-full">
          {/* Left Hand Keys */}
          <div className="flex gap-1 bg-zinc-900/90 p-1.5 rounded-lg border border-zinc-800">
            {[
              { key: 'a', finger: 'Pinky' },
              { key: 's', finger: 'Ring' },
              { key: 'd', finger: 'Middle' },
              { key: 'f', finger: 'Index', bump: true },
            ].map(({ key, finger, bump }) => {
              const isTarget = nextChar.toLowerCase() === key;
              return (
                <div
                  key={key}
                  className={`w-9 h-11 rounded-lg flex flex-col items-center justify-center font-mono font-bold text-xs transition-all border ${
                    isTarget
                      ? 'bg-cyan-500 text-zinc-950 border-cyan-300 scale-110 shadow-lg shadow-cyan-500/30'
                      : 'bg-zinc-800/90 text-zinc-200 border-zinc-700'
                  }`}
                >
                  <span className="text-sm uppercase">{key}</span>
                  <span className="text-[8px] opacity-70">{finger[0]}</span>
                  {bump && <span className="w-1.5 h-0.5 bg-amber-400 rounded-full mt-0.5" title="Raised bump on F" />}
                </div>
              );
            })}
          </div>

          {/* Spacebar */}
          <div
            className={`h-11 px-6 rounded-lg flex flex-col items-center justify-center font-mono font-bold text-xs transition-all border ${
              nextChar === ' '
                ? 'bg-cyan-500 text-zinc-950 border-cyan-300 scale-105 shadow-lg shadow-cyan-500/30'
                : 'bg-zinc-800/90 text-zinc-300 border-zinc-700'
            }`}
          >
            <span className="text-[10px] uppercase font-sans">SPACEBAR</span>
            <span className="text-[8px] opacity-70">Thumbs</span>
          </div>

          {/* Right Hand Keys */}
          <div className="flex gap-1 bg-zinc-900/90 p-1.5 rounded-lg border border-zinc-800">
            {[
              { key: 'j', finger: 'Index', bump: true },
              { key: 'k', finger: 'Middle' },
              { key: 'l', finger: 'Ring' },
              { key: ';', finger: 'Pinky' },
            ].map(({ key, finger, bump }) => {
              const isTarget = nextChar.toLowerCase() === key;
              return (
                <div
                  key={key}
                  className={`w-9 h-11 rounded-lg flex flex-col items-center justify-center font-mono font-bold text-xs transition-all border ${
                    isTarget
                      ? 'bg-cyan-500 text-zinc-950 border-cyan-300 scale-110 shadow-lg shadow-cyan-500/30'
                      : 'bg-zinc-800/90 text-zinc-200 border-zinc-700'
                  }`}
                >
                  <span className="text-sm uppercase">{key}</span>
                  <span className="text-[8px] opacity-70">{finger[0]}</span>
                  {bump && <span className="w-1.5 h-0.5 bg-amber-400 rounded-full mt-0.5" title="Raised bump on J" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Secret Pro Tip */}
      <div className="bg-zinc-950/80 border border-cyan-500/30 rounded-xl p-3 flex items-center gap-3 text-xs text-zinc-300">
        <span className="text-2xl">⚡</span>
        <span>
          <strong>The Golden Rule of Rapid Typing:</strong> Feel the bumps on <strong>F</strong> and <strong>J</strong>. Keep your eyes on the screen, <strong>not your fingers!</strong>
        </span>
      </div>
    </div>
  );
}
