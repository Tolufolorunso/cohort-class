'use client';

import React, { useState, useEffect } from 'react';
import {
  StudentSubmission,
  ModuleLockState,
} from '../../types/platform';
import {
  getSubmissions,
  saveModuleLockState,
  clearAllSubmissions,
} from '../../lib/platformStorage';
import {
  Shield,
  Lock,
  Unlock,
  CheckCircle,
  FileText,
  Download,
} from '../icons/Icons';

interface InstructorDashboardProps {
  currentModuleId: string;
  onSelectModule: (moduleId: string) => void;
  unlockedModuleIds: string[];
  onUpdateLockState: (state: ModuleLockState) => void;
  onClose: () => void;
}

const ALL_MODULES = [
  {
    id: 'module-1',
    number: 1,
    title: 'Module 1: Introduction to Computers',
    description: 'Foundations of computing, IPOS cycle, computer history, and device classification.',
    isCore: true,
  },
  {
    id: 'module-2',
    number: 2,
    title: 'Module 2: Hardware & Peripheral Components',
    description: 'Deep dive into CPU, RAM, storage devices, motherboard, ports, and expansion cards.',
    isCore: false,
  },
  {
    id: 'module-3',
    number: 3,
    title: 'Module 3: Operating Systems & File Management',
    description: 'GUI fundamentals, file hierarchies, directory creation, file extensions, and lab safety.',
    isCore: false,
  },
  {
    id: 'module-4',
    number: 4,
    title: 'Module 4: Keyboard Mastery & Word Processing',
    description: 'Touch-typing technique, home row discipline, document formatting, and school report creation.',
    isCore: false,
  },
  {
    id: 'module-5',
    number: 5,
    title: 'Module 5: Internet, Digital Literacy & Safety',
    description: 'Web browsing, search operators, email etiquette, cyber hygiene, and online ethics.',
    isCore: false,
  },
];

export function InstructorDashboard({
  currentModuleId,
  onSelectModule,
  unlockedModuleIds,
  onUpdateLockState,
  onClose,
}: InstructorDashboardProps) {
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<StudentSubmission | null>(null);
  const [filterModule, setFilterModule] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [confirmClear, setConfirmClear] = useState(false);

  // Load submissions safely
  useEffect(() => {
    const timer = setTimeout(() => {
      setSubmissions(getSubmissions());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Handle module toggle
  const handleToggleModuleLock = (moduleId: string) => {
    const isCurrentlyUnlocked = unlockedModuleIds.includes(moduleId);
    let nextUnlocked: string[];

    if (isCurrentlyUnlocked) {
      // Don't lock module 1 completely if it's the current active foundational module
      if (moduleId === 'module-1' && unlockedModuleIds.length === 1) {
        return;
      }
      nextUnlocked = unlockedModuleIds.filter((id) => id !== moduleId);
    } else {
      nextUnlocked = [...unlockedModuleIds, moduleId];
    }

    const newState = saveModuleLockState({ unlockedModuleIds: nextUnlocked });
    onUpdateLockState(newState);
  };

  const handleClearSubmissions = () => {
    clearAllSubmissions();
    setSubmissions([]);
    setSelectedSubmission(null);
    setConfirmClear(false);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(submissions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `dzuels-student-submissions-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Filtered submissions
  const filteredSubmissions = submissions.filter((sub) => {
    const matchesModule = filterModule === 'all' || sub.moduleId === filterModule;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      sub.patronNumber.toLowerCase().includes(query) ||
      sub.studentName.toLowerCase().includes(query);
    return matchesModule && matchesSearch;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:px-6 sm:py-8 space-y-8 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/80 via-zinc-900 to-zinc-900 border border-amber-500/40 rounded-2xl p-5 sm:p-7 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Shield size={16} />
            <span>Classroom Administration</span>
            <span>•</span>
            <span>Instructor Controls</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Teacher Control Dashboard
          </h1>
          <p className="text-zinc-300 text-xs sm:text-sm mt-1 max-w-2xl">
            Control student module access, unlock upcoming lessons, and inspect student homework submissions by Patron Number & Full Name.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors border border-zinc-700"
          >
            Return to Lesson
          </button>
        </div>
      </div>

      {/* Grid: 1. Module Locking Manager */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-7 shadow-lg space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-800">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span>📚</span> Progressive Curriculum Module Locking
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Lock modules to keep students focused on the current lesson. Unlocked modules become immediately accessible on student laptops.
            </p>
          </div>
          <div className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
            {unlockedModuleIds.length} of {ALL_MODULES.length} Modules Unlocked
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_MODULES.map((m) => {
            const isUnlocked = unlockedModuleIds.includes(m.id);
            const isCurrent = m.id === currentModuleId;

            return (
              <div
                key={m.id}
                className={`rounded-xl border p-4 transition-all flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-zinc-950/70 border-emerald-500/40 shadow-sm'
                    : 'bg-zinc-950/40 border-zinc-800 opacity-75'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                      Module {m.number}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                        isUnlocked
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
                      }`}
                    >
                      {isUnlocked ? <Unlock size={10} /> : <Lock size={10} />}
                      <span>{isUnlocked ? 'Unlocked' : 'Locked'}</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white leading-snug">{m.title}</h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed line-clamp-2">
                    {m.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleToggleModuleLock(m.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isUnlocked
                        ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-sm'
                    }`}
                  >
                    {isUnlocked ? (
                      <>
                        <Lock size={13} />
                        <span>Lock Module</span>
                      </>
                    ) : (
                      <>
                        <Unlock size={13} />
                        <span>Unlock for Class</span>
                      </>
                    )}
                  </button>

                  {isUnlocked && (
                    <button
                      onClick={() => onSelectModule(m.id)}
                      className={`text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors ${
                        isCurrent
                          ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-800'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {isCurrent ? 'Current' : 'Select'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 2: Student Assignment Submissions Inspector */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-7 shadow-lg space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <FileText size={20} className="text-emerald-400" />
              <span>Student Homework Lab Registry</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Review and grade homework submissions made by students using their assigned computer lab laptops.
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            {submissions.length > 0 && (
              <>
                <button
                  onClick={handleExportJSON}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors"
                  title="Download all submissions as JSON backup"
                >
                  <Download size={14} />
                  <span>Export JSON</span>
                </button>

                {!confirmClear ? (
                  <button
                    onClick={() => setConfirmClear(true)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 border border-rose-800/60 transition-colors"
                  >
                    Clear All
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handleClearSubmissions}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition-colors"
                    >
                      Confirm Clear
                    </button>
                    <button
                      onClick={() => setConfirmClear(false)}
                      className="px-2 py-1.5 rounded-xl text-xs text-zinc-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-zinc-950 p-3 rounded-xl border border-zinc-800">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-zinc-400 font-semibold whitespace-nowrap">Filter Module:</span>
            <select
              value={filterModule}
              onChange={(e) => setFilterModule(e.target.value)}
              className="bg-zinc-900 border border-zinc-700 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">All Modules ({submissions.length})</option>
              <option value="module-1">Module 1: Introduction</option>
              <option value="module-2">Module 2: Hardware</option>
              <option value="module-3">Module 3: OS & Files</option>
            </select>
          </div>

          <div className="w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Patron No or Name..."
              className="w-full bg-zinc-900 border border-zinc-700 text-xs text-white rounded-lg px-3 py-1.5 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Submissions List / Table */}
        {filteredSubmissions.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-zinc-950/50 border border-dashed border-zinc-800 text-zinc-400">
            <FileText size={36} className="mx-auto mb-2 text-zinc-600" />
            <h3 className="text-sm font-bold text-zinc-300">No Student Submissions Found</h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
              When students complete and submit their homework in the Homework tab, their Patron Number, Name, and answers will appear here immediately.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-zinc-800">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-zinc-950 text-zinc-400 font-bold uppercase tracking-wider border-b border-zinc-800">
                <tr>
                  <th className="p-3 sm:p-4">Patron Number</th>
                  <th className="p-3 sm:p-4">Student Name</th>
                  <th className="p-3 sm:p-4">Module</th>
                  <th className="p-3 sm:p-4">Submitted At</th>
                  <th className="p-3 sm:p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80 bg-zinc-900/50">
                {filteredSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="p-3 sm:p-4 font-mono font-bold text-emerald-400">
                      {sub.patronNumber}
                    </td>
                    <td className="p-3 sm:p-4 font-bold text-white">
                      {sub.studentName}
                    </td>
                    <td className="p-3 sm:p-4 text-zinc-400">
                      {sub.moduleTitle}
                    </td>
                    <td className="p-3 sm:p-4 text-zinc-400">
                      {new Date(sub.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })},{' '}
                      {new Date(sub.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 sm:p-4 text-right">
                      <button
                        onClick={() => setSelectedSubmission(sub)}
                        className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-zinc-950 font-bold text-xs transition-all border border-emerald-500/30"
                      >
                        Inspect Answers
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Submission Inspection Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl text-zinc-100 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
                  {selectedSubmission.patronNumber.slice(-3)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {selectedSubmission.studentName}
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    Patron No: <span className="text-emerald-400 font-bold">{selectedSubmission.patronNumber}</span> • {selectedSubmission.moduleTitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-zinc-400 hover:text-white font-bold text-lg px-2"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <CheckCircle size={14} className="text-emerald-400" />
                <span>
                  Submitted on {new Date(selectedSubmission.submittedAt).toLocaleString()}
                </span>
              </div>

              {Object.entries(selectedSubmission.answers).map(([qId, ans]) => (
                <div key={qId} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                    Question {qId} Response:
                  </span>
                  <p className="text-sm text-zinc-200 whitespace-pre-wrap font-sans leading-relaxed">
                    {ans || '(Blank / Not answered)'}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-zinc-800 flex justify-end">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
