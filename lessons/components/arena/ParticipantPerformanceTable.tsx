'use client';

import React, { useState, useMemo } from 'react';
import { QuizParticipantScore } from '../../types/platform';
import { CheckCircle, Clock } from '../icons/Icons';

interface ParticipantPerformanceTableProps {
  participants: Record<string, QuizParticipantScore>;
  quizTitle?: string;
  isRevealed?: boolean;
}

export function ParticipantPerformanceTable({
  participants,
  quizTitle = 'Classroom Quiz Arena',
  isRevealed = false,
}: ParticipantPerformanceTableProps) {
  const [showPodium, setShowPodium] = useState<boolean>(false);
  const [filterQuery, setFilterQuery] = useState<string>('');

  // Sorted participants (descending by score, then accuracy)
  const rankedList: QuizParticipantScore[] = useMemo(() => {
    const list = Object.values(participants);
    list.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.accuracyRate !== a.accuracyRate) return b.accuracyRate - a.accuracyRate;
      return (a.responseTimeMs || 0) - (b.responseTimeMs || 0);
    });
    return list;
  }, [participants]);

  const filteredList = useMemo(() => {
    if (!filterQuery.trim()) return rankedList;
    const q = filterQuery.toLowerCase();
    return rankedList.filter(
      (p) =>
        p.studentName.toLowerCase().includes(q) ||
        p.patronNumber.toLowerCase().includes(q)
    );
  }, [rankedList, filterQuery]);

  // Aggregate stats
  const totalCount = rankedList.length;
  const avgScore =
    totalCount > 0
      ? Math.round(rankedList.reduce((acc, curr) => acc + curr.score, 0) / totalCount)
      : 0;
  const maxStreak =
    totalCount > 0 ? Math.max(...rankedList.map((p) => p.currentStreak || 0)) : 0;

  // Export class scorecard as CSV
  const handleExportCSV = () => {
    if (rankedList.length === 0) return;
    const headers = [
      'Rank',
      'Student Name',
      'Patron Number',
      'Mode',
      'Partner B',
      'Score (pts)',
      'Correct Count',
      'Total Answered',
      'Accuracy (%)',
      'Streak',
    ];
    const rows = rankedList.map((p, idx) => [
      idx + 1,
      `"${p.studentName.replace(/"/g, '""')}"`,
      p.patronNumber,
      p.mode,
      p.partnerB ? `"${p.partnerB.studentName}"` : 'None',
      p.score,
      p.correctCount,
      p.totalAnswered,
      `${p.accuracyRate}%`,
      p.currentStreak,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `dzuels-quiz-scorecard-${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6 select-none">
      {/* Header & Control Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-2xl p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
              🏆
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white">
                  Live Participant Performance Table
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Projector Screen
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Real-time cohort scorecard ranking participants by arcade points, accuracy, and streaks.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Summary Pills & Podium Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl text-xs">
            <span className="text-zinc-500 font-bold block text-[10px] uppercase">
              Participants
            </span>
            <span className="text-white font-black text-sm">{totalCount} in game</span>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl text-xs">
            <span className="text-zinc-500 font-bold block text-[10px] uppercase">
              Class Average
            </span>
            <span className="text-amber-300 font-black text-sm">{avgScore.toLocaleString()} pts</span>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl text-xs">
            <span className="text-zinc-500 font-bold block text-[10px] uppercase">
              Top Streak
            </span>
            <span className="text-orange-400 font-black text-sm">🔥 {maxStreak}</span>
          </div>

          <button
            onClick={() => setShowPodium(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-yellow-400 text-zinc-950 shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all"
          >
            <span>🎉</span>
            <span>View Podium</span>
          </button>

          <button
            onClick={handleExportCSV}
            disabled={totalCount === 0}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Download CSV Scorecard for teacher records"
          >
            <span>📥</span>
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Search Filter Bar */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search student or patron ID..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500"
          />
        </div>
        <span className="text-xs text-zinc-500">
          Showing {filteredList.length} of {totalCount}
        </span>
      </div>

      {/* Leaderboard Ranking Table */}
      <div className="overflow-x-auto rounded-2xl border border-zinc-800">
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-900/90 text-zinc-400 uppercase text-[10px] font-extrabold border-b border-zinc-800">
            <tr>
              <th className="py-3 px-3 w-14 text-center">Rank</th>
              <th className="py-3 px-3">Student / Lab Partners</th>
              <th className="py-3 px-3 text-right">Score</th>
              <th className="py-3 px-3 text-center">Correct / Total</th>
              <th className="py-3 px-3">Accuracy %</th>
              <th className="py-3 px-3 text-center">Streak</th>
              <th className="py-3 px-3 text-center">Current Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 bg-zinc-950">
            {filteredList.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-zinc-500">
                  No participants recorded yet. When students vote from their laptops, their scores will appear here in real time!
                </td>
              </tr>
            ) : (
              filteredList.map((p, idx) => {
                const rankNumber = idx + 1;
                const isGold = rankNumber === 1;
                const isSilver = rankNumber === 2;
                const isBronze = rankNumber === 3;

                return (
                  <tr
                    key={p.patronNumber}
                    className={`hover:bg-zinc-900/50 transition-colors ${
                      isGold
                        ? 'bg-amber-500/[0.04]'
                        : isSilver
                        ? 'bg-zinc-400/[0.03]'
                        : isBronze
                        ? 'bg-orange-500/[0.03]'
                        : ''
                    }`}
                  >
                    {/* Rank Badge */}
                    <td className="py-3 px-3 text-center font-black">
                      {isGold ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-400 text-zinc-950 text-xs shadow-md">
                          🥇
                        </span>
                      ) : isSilver ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-zinc-300 text-zinc-950 text-xs shadow-md">
                          🥈
                        </span>
                      ) : isBronze ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-700 text-white text-xs shadow-md">
                          🥉
                        </span>
                      ) : (
                        <span className="text-zinc-400 font-mono text-sm">#{rankNumber}</span>
                      )}
                    </td>

                    {/* Student Name & Patron */}
                    <td className="py-3 px-3">
                      <div className="font-bold text-zinc-100 flex items-center gap-1.5">
                        <span>{p.studentName}</span>
                        {p.mode === 'partner' && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/60 font-semibold">
                            Partners
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-zinc-500 font-mono mt-0.5">
                        {p.patronNumber}
                      </div>
                    </td>

                    {/* Score */}
                    <td className="py-3 px-3 text-right">
                      <span className="font-black text-sm text-amber-300 font-mono">
                        {p.score.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-zinc-500 block">pts</span>
                    </td>

                    {/* Correct / Total */}
                    <td className="py-3 px-3 text-center font-mono text-zinc-300">
                      {p.correctCount} / {p.totalAnswered}
                    </td>

                    {/* Accuracy Bar */}
                    <td className="py-3 px-3 w-36">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-zinc-800 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              p.accuracyRate >= 80
                                ? 'bg-emerald-400'
                                : p.accuracyRate >= 50
                                ? 'bg-amber-400'
                                : 'bg-red-400'
                            }`}
                            style={{ width: `${Math.min(100, Math.max(0, p.accuracyRate))}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-mono text-zinc-300 w-8 text-right font-bold">
                          {p.accuracyRate}%
                        </span>
                      </div>
                    </td>

                    {/* Streak */}
                    <td className="py-3 px-3 text-center">
                      {p.currentStreak > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 font-bold text-[11px]">
                          🔥 {p.currentStreak}
                        </span>
                      ) : (
                        <span className="text-zinc-600 font-mono">-</span>
                      )}
                    </td>

                    {/* Current Question Status */}
                    <td className="py-3 px-3 text-center">
                      {p.lastOptionIndex === undefined ? (
                        <span className="inline-flex items-center gap-1 text-zinc-500 text-[11px]">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Thinking...</span>
                        </span>
                      ) : isRevealed ? (
                        p.lastIsCorrect ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
                            <CheckCircle className="w-3.5 h-3.5" /> Correct
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-[11px] font-bold">
                            ✕ Incorrect
                          </span>
                        )
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[11px] font-bold">
                          🔒 Locked In
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Grand Finale Podium Modal */}
      {showPodium && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl relative text-center">
            <button
              onClick={() => setShowPodium(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-2 rounded-xl hover:bg-zinc-800 transition-colors"
            >
              ✕ Close
            </button>

            <div className="mb-6">
              <span className="text-4xl">👑</span>
              <h2 className="text-2xl sm:text-3xl font-black text-amber-400 mt-2">
                Quiz Arena Grand Champions!
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                {quizTitle} · Celebration Podium
              </p>
            </div>

            {/* 3-Tier Podium */}
            {rankedList.length < 1 ? (
              <p className="text-zinc-500 py-8">
                No participant scores recorded yet to build the podium.
              </p>
            ) : (
              <div className="flex items-end justify-center gap-3 sm:gap-6 my-8 px-2">
                {/* 2nd Place (Silver) */}
                <div className="flex-1 max-w-[180px] flex flex-col items-center">
                  {rankedList[1] && (
                    <div className="mb-2">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-300 text-zinc-950 font-black text-lg flex items-center justify-center shadow-lg mx-auto">
                        🥈
                      </div>
                      <div className="text-xs font-black text-white truncate max-w-[160px] mt-2">
                        {rankedList[1].studentName}
                      </div>
                      <div className="text-[11px] text-zinc-400 font-mono">
                        {rankedList[1].score.toLocaleString()} pts
                      </div>
                    </div>
                  )}
                  <div className="w-full h-32 sm:h-40 bg-gradient-to-t from-zinc-700 to-zinc-500 rounded-t-2xl flex items-center justify-center shadow-lg border-t-2 border-zinc-300">
                    <span className="text-3xl sm:text-4xl font-black text-white/90">2</span>
                  </div>
                </div>

                {/* 1st Place (Gold Champion) */}
                <div className="flex-1 max-w-[210px] flex flex-col items-center">
                  {rankedList[0] && (
                    <div className="mb-2">
                      <div className="w-16 h-16 rounded-3xl bg-amber-400 text-zinc-950 font-black text-2xl flex items-center justify-center shadow-xl mx-auto ring-4 ring-amber-300/50 animate-bounce">
                        🥇
                      </div>
                      <div className="text-sm font-black text-amber-300 truncate max-w-[180px] mt-2">
                        {rankedList[0].studentName}
                      </div>
                      <div className="text-xs text-amber-400/90 font-mono font-bold">
                        {rankedList[0].score.toLocaleString()} pts
                      </div>
                    </div>
                  )}
                  <div className="w-full h-44 sm:h-56 bg-gradient-to-t from-amber-600 to-yellow-400 rounded-t-3xl flex items-center justify-center shadow-2xl border-t-2 border-yellow-200">
                    <span className="text-4xl sm:text-5xl font-black text-zinc-950">1</span>
                  </div>
                </div>

                {/* 3rd Place (Bronze) */}
                <div className="flex-1 max-w-[180px] flex flex-col items-center">
                  {rankedList[2] && (
                    <div className="mb-2">
                      <div className="w-12 h-12 rounded-2xl bg-amber-800 text-white font-black text-lg flex items-center justify-center shadow-lg mx-auto">
                        🥉
                      </div>
                      <div className="text-xs font-black text-white truncate max-w-[160px] mt-2">
                        {rankedList[2].studentName}
                      </div>
                      <div className="text-[11px] text-zinc-400 font-mono">
                        {rankedList[2].score.toLocaleString()} pts
                      </div>
                    </div>
                  )}
                  <div className="w-full h-24 sm:h-28 bg-gradient-to-t from-amber-900 to-amber-700 rounded-t-2xl flex items-center justify-center shadow-lg border-t-2 border-amber-600">
                    <span className="text-2xl sm:text-3xl font-black text-white/90">3</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={handleExportCSV}
                className="px-5 py-2.5 rounded-xl text-xs font-black bg-amber-400 text-zinc-950 hover:bg-amber-300 shadow-lg transition-all"
              >
                📥 Download Full Cohort Scorecard (CSV)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
