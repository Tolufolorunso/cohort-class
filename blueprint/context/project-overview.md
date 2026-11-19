# Dzuel's Computer Class - Project Overview

<!-- blueprint:source-hash a079504509881392ae7608735b84726ccb81a05d783c1fd292c15a90a9b965ab -->

> Interactive classroom presentation and digital literacy curriculum platform built with clean, un-crowded PowerPoint-style slides in natural simple English, dedicated in-slide live instructor guides, pre-class briefings, real-time slide mirroring, independent student slide navigation, standalone gamified Kahoot-style quiz battles, shared equal-partner laptop support, screen inattention detection, and culturally authentic African educational instruction.

## Problem

Traditional slide decks (PowerPoint, static PDFs) are passive and ineffective for teaching foundational digital literacy to secondary school students (ages 12–18) in Ekiti State, Nigeria. At the same time, overly dense web pages with competing definition tabs create visual clutter. Teachers need an interactive presentation and learning platform in the browser that feels like a clean, crisp PowerPoint slide deck: un-crowded, written in natural simple English, with abundant labeled illustrations, hands-on interactive simulators, and clear step-by-step guidance.

Additionally, computer laboratories frequently assign two students to share a laptop. The platform natively supports equal lab-partner pairing, private 30-student whitelist access, joint/individual assignment submissions, real-time slide mirroring, inattention detection (tab switching/minimization alerts), extended 3-hour session stability, sticky floating presenter navigation, classroom zoom scaling, and official Dzuels Foundation Cohort API attendance synchronization.

## Users & Access Security

- **Students (Ages 12–18, Secondary School Learners):**
  - Access via classroom laptops at `/` with direct landing into active lesson stages.
  - **Login Modes:** Solo Learner Mode (1 patron) or Equal Lab Partners Mode (Partner A & Partner B, no hierarchy).
  - **Roster Whitelist:** 30 registered patron numbers in `lessons/lib/roster.ts` (including `20250645`).
  - **Sanitized Login:** Public patron dropdown and instructor access links completely removed from student view.
  - **Session Stability:** 180-minute (3-hour) session lifetime.
  - **Inattention Tracking:** Monitors `visibilitychange` and `blur` events; reports `isFocused: false` and away duration to instructor in real time.
  - **Dual Experience:** Follow Teacher Mode (automatic slide mirroring) or Self-Paced Mode (independent navigation and notes transcription).
  - **Assignments:** Flexible Joint Partner or Individual submissions from the same laptop.
- **Instructors & Administrators:**
  - Access dedicated control room at `/instructor`.
  - **Roles:** Super Admin (`adminTolu` - full admin authority) and Instructor (`adminIsaac` - classroom teaching authority).
  - **Presenter Dock:** Sticky floating bottom navigation (`[ ◀ Prev ]`, `Stage X of Y`, `[ Next ▶ ]`).
  - **Live Monitoring:** Real-time inattention banners and focus badges (🟢 *Focused* vs. 🔴 *Away*).

## Usage Model

- **Environment:** Teacher PC projected to screen displaying `/instructor` or Quiz Arena; students connected on assigned laptops (`/`, `/learn/[moduleId]`, `/today`, `/arena`).
- **Hosting & Offline:** Hosted on Vercel; zero-dependency offline local fallback (`npm run dev`).
- **Access Control:** URL & credential separation: Student Portal (`/`, 30-patron whitelist) vs. Control Room (`/instructor`, PIN-gated).
- **Session Duration:** 3-hour student session lifetime.
- **Slide Sync:** Real-time Next.js polling via `/api/live-session` with Follow Teacher vs. Self-Paced toggle.

## Pedagogical Principles & Curriculum Presentation Standards

- **Clean PowerPoint Slide Standard (Student View):**
  1. *16:9 Format:* Large, readable typography with generous whitespace; never dense text walls.
  2. *Natural Simple English:* Core definitions and concepts written directly in plain, friendly English.
  3. *Zero Clutter:* Elimination of multi-mode tabs (`"In Simple English"`, `"Formal Bookish"`, `"Nigerian Analogies"`). Unified, concise cards (max 3–4 bullets per slide).
  4. *Focused Interactive Simulators:* Dedicated, uncluttered stages for IPOS cycle, device sorting, PC disassembly, and typing arena.
  5. *Navigation:* Full keyboard arrow support (`←`/`→`/`Space`), slide jump dropdown, and instant fullscreen projector mode (`F`).
- **Dedicated Instructor Teaching System:**
  1. *In-Slide Live Teacher Guide Drawer (`T` Key):* Drops down 3 quick cards: ❓ **Ask the Class**, 🗣️ **Key Talking Point**, and ⚠️ **Watch Out For**.
  2. *Instructor Module Master Briefing Desk (`/instructor`):* Comprehensive pre-class reading guide with 40-minute lab pacing, formal academic syllabus definitions (for WAEC/NECO reference), story-form Nigerian analogies, and a printable PDF lesson plan.
- **Strict Cultural Authenticity & Extensive Visuals:**
  - **Zero White People Photos:** All human imagery exclusively depicts Black African students in uniforms, African ICT teachers, and African professionals.
  - **Abundant Visuals:** Labeled real hardware photos, cutaways, and offline vector SVGs for zero-connectivity school labs.
- **Classroom Zoom Scale:** Normal (18px), Large (21px), X-Large / Projector (24px).
- **Standalone Gamified Quiz Arena (`/arena`):**
  - Pre-bundled question packs (Module 1, Module 2, Neutral Shortcuts & Literacy) + custom question builder.
  - Leaderboard privacy: student screens show personal shape buttons, timer, score, rank, and streak; full leaderboard table and podium exclusive to instructor projector.
  - Scoring: 1,000 base points for correct answers + speed bonus (up to 500 pts).

## Multi-Page Architecture & Route Map

- `/` — Student entry gate (with direct-to-lesson routing upon login).
- `/learn/[moduleId]` — Fullscreen interactive classroom presentation stages (Module 1, Module 2, etc.) in clean PowerPoint slide format.
- `/today` — Dedicated practical class presentation deck (Rapid-Typing, Folders/Files, and Mouse/Window navigation).
- `/arena` — Dedicated Standalone Gamified Quiz Arena.
- `/notes` & `/notes/[moduleId]` — Dedicated student notebook transcription desk with print layout.
- `/assignments` & `/assignments/[moduleId]` — Homework & practical submission center.
- `/instructor` — Instructor Control Room with live slide broadcast dock, Module Master Briefings with printable lesson plans, Quiz Arena Host Desk, cohort attendance desk, attention alerts, and grading ledger.

## Features

1. **Module 1 Interactive Classroom Stage (Shipped)** - Fullscreen presentation shell with keyboard navigation and interactive Module 1 lesson beats.
2. **Classroom Platform Enhancements (Shipped)** - Visual zoom scaling, dual-role mode, answer-reveal control, module locking, and Copy Notes view.
3. **Role Separation, Patron Authentication & Real-Time Slide Mirroring (Shipped)** - Separate student portal and instructor room; 22-patron whitelist; dual-PIN access; live slide sync.
4. **Module 1 Complete 4-Lesson Overhaul & Gamified Kahoot Arena (Shipped)** - Full 4 lessons, rich imagery, Kahoot-style quiz game with colored shapes and countdown timer.
5. **Shared Laptop Equal-Partner System, Cultural Visual Architecture & Simple-English Overhaul (Shipped)** - Solo vs. Equal Lab Partners login; African-only cultural educational imagery; simple-English baseline.
6. **Module 2: Parts of a Computer (Full 4-Lesson Hardware Lab & Disassembly) (Shipped)** - Hardware introduction, I/O devices, system unit internals, 7-step PC disassembly simulator, and Module 2 quiz.
7. **Platform Architecture Perfection & Classroom Attention Security (Shipped)** - Real-time student inattention & screen-leave detection; 3-hour sessions; clean login security; multi-page architecture; sticky presenter dock; and classroom zoom scaling.
8. **Official Cohort Attendance API Integration & Instructor Desk (Shipped)** - Real-time attendance marking via DZF Cohort API (`cohort-8`); Single Check-In, Quick Bulk Check-In, and Roster Sync; offline resilience caching.
9. **Standalone Gamified Quiz Arena, Multi-Scope Question Bank & Live Leaderboard Table (Shipped)** - Dedicated `/arena` route; multi-scope packs; custom question creator; projector-only live leaderboard table and 3-tier podium.
10. **Module 1 Overhaul: Clean PowerPoint Slides & Comprehensive Instructor Guide (Next)** - Redo Module 1 into un-crowded 16:9 presentation slides in natural simple English; eliminate multi-mode definition tabs; uncluttered IPOS and sorting labs; live in-slide Teacher Guide drawer (`T`); and pre-class Module Master Briefing in `/instructor` with printable lesson plan.
11. **Module 2 Overhaul: Clean PowerPoint Slides & Hardware Lab Guide (Next)** - Redo Module 2 into un-crowded presentation slides in natural simple English; streamline 7-step disassembly; eliminate language toggle clutter; in-slide Teacher Guide drawer; and hardware demonstration briefing in `/instructor`.
12. **Module 3: Computer Usage, Booting & Rapid-Typing** - Formalize practical classroom material (mouse/touchpad navigation, window controls, folder & file creation, and home-row rapid typing from `/today`) into official Module 3 curriculum stages, notes, and assignments.
13. **Module 4: Operating Systems & Basic Configurations** - Virtual OS desktop explorer, window management, and system settings simulation.
14. **Module 5: File Management & Organization** - Interactive folder hierarchy tree, file extensions lab, and file organization simulation.
15. **Module 6: Internet Basics & Digital Citizenship** - URL anatomy simulator, browser controls, and online safety pledge.
16. **Module 7: Microsoft Office Productivity Suite** - Interactive overview of Word, Excel, and PowerPoint interfaces and use cases.
17. **Phase 2 Curriculum Hub (Modules 8-13)** - Interactive lessons for Computational Thinking (Mod 8), Scratch Programming (Mod 9), HTML & CSS Web Design (Mod 10), AI Prompting (Mod 11), JavaScript Web Logic (Mod 12), and Mobile App Concepts (Mod 13).
18. **Phase 3 Curriculum Hub (Modules 14-20)** - Interactive lessons for Python Scripting (Mod 14), Git & GitHub (Mod 15), Advanced AI & Workflows (Mod 16), Robotics/Arduino (Mod 17), Digital Creativity (Mod 18), Cybersecurity (Mod 19), and Tech Career Pathways (Mod 20).

## Data Model

- **Authorized Student Record (`lessons/lib/roster.ts`):** `patronNumber: string`, `studentName: string`, `assignedAt: string`.
- **Shared Laptop Active Session:** `mode: 'solo' | 'partner'`, `patronNumberA: string`, `nameA: string`, `patronNumberB?: string`, `nameB?: string`, `loginTimestamp: number`, `expiresAt: number` (3h timeout), `isFocused: boolean`, `leftScreenAt?: number`, `awayDurationSeconds?: number`.
- **Live Classroom Session State (`/api/live-session`):** `activeModuleId: string`, `activeLessonIndex: number`, `activeStageIndex: number`, `syncMode: 'follow-teacher' | 'self-paced'`, `activeKahootQuestionId: number | null`, `isKahootRevealed: boolean`, `activeLaptopsCount: number`, `activeStudentsCount: number`, `awayStudentsCount: number`, `activePartners: Array<{ laptopId: string; partnerA: { patron: string; name: string }; partnerB?: { patron: string; name: string }; isFocused: boolean; leftScreenAt?: number }>`, `studentVotes: Record<number, number>`, `updatedAt: string`.
- **Gamified Quiz Question (`lessons/types/curriculum.ts`):** `id: number`, `question: string`, `options: [string, string, string, string]`, `correctIndex: number`, `explanation: string`, `topic: string`, `scope: 'module-1' | 'module-2' | 'module-3' | 'neutral' | 'custom'`, `timeLimitSeconds?: number`.
- **Quiz Arena Participant Scorecard:** `patronNumber: string`, `studentName: string`, `mode: 'solo' | 'partner'`, `score: number`, `correctCount: number`, `totalAnswered: number`, `accuracyRate: number` (%), `currentStreak: number`, `rank?: number`.
- **Official Cohort Attendance Student & Summary (`lessons/types/platform.ts`):** `barcode: string`, `name: string`, `attended: boolean`, `markedBy?: string`, `totalStudents: number`, `presentCount: number`, `absentCount: number`, `attendanceRate: number` (%).
- **Student Assignment Submission:** `id: string`, `submissionType: 'joint' | 'individual'`, `patronNumberA: string`, `nameA: string`, `patronNumberB?: string`, `nameB?: string`, `submittingPatron?: string`, `moduleId: string`, `moduleTitle: string`, `answers: Record<number, string>`, `submittedAt: string`, `status: 'submitted' | 'reviewed'`.

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript 5.
- **Styling:** Tailwind CSS v4 (`lessons/app/globals.css`).
- **Visuals:** Clean inline SVGs, verified African educational photography, responsive offline vector diagrams.
- **State & Sync:** Next.js server route (`/api/live-session`) with short-polling + local storage persistence.
- **Security:** PIN check on `/instructor` (`adminTolu` & `adminIsaac`) and 30-Patron whitelist verification on `/`.

## Deployment

- **Hosting Platform:** Vercel cloud hosting for real-time live access on assigned classroom laptops and teacher projector.
- **Local Fallback:** 100% offline-ready via `npm run dev` from the curriculum workspace root.

## Monetization

Non-profit philanthropic education initiative by Dzuels Foundation to bridge the digital divide in Ekiti State, Nigeria. 100% free for educational use.
