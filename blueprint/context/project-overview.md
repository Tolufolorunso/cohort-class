# Dzuel's Computer Class - Project Overview

<!-- blueprint:source-hash c99e54c832be1103dabaee34a97b2b2cc0c03b2bccb60c6a0e8ec335725e48de -->

> Interactive classroom presentation and digital literacy curriculum platform replacing static slides with visual simulations, real-time slide mirroring, gamified Kahoot-style quiz battles, dedicated student laptop portals with native support for shared equal-partner laptops, real-time screen inattention detection, and culturally authentic simple-English instruction.

## Problem

Traditional slide decks (PowerPoint, static PDFs) are passive and ineffective for teaching foundational digital literacy to secondary school students (ages 12–18) in Ekiti State, Nigeria, who have zero prior computer experience. Teachers need an interactive presentation and learning platform in the browser that replaces slides with dynamic visual models, abundant labeled illustrations, real-world Nigerian analogies, and hands-on exercises to demystify computers and keep students engaged during classroom and laboratory sessions.

Furthermore, computer laboratories in the school frequently assign **two students to share a single laptop**. The platform natively supports equal lab-partner pairing (neither student is "primary"), private authenticated access via a 29-student whitelist roster (with the public patron dropdown and instructor links removed from the student login screen), flexible joint vs. individual assignment submissions, real-time slide mirroring, and gamified Kahoot-style quiz battles.

To ensure laboratory discipline and learning focus, the platform proactively alerts instructors whenever students navigate away from the lesson screen (tab switching, window minimization, or app changing), provides extended 3-hour session stability for double laboratory periods, offers sticky floating presenter navigation so teachers never scroll to advance slides, and provides high-visibility classroom zoom scaling.

## Users & Access Security

- **Students (Ages 12–18, Secondary School Learners):**
  - Connect via assigned classroom laptops at `/`.
  - **Direct-to-Lesson Entry:** Upon login, students land directly into the active lesson stage in `follow-teacher` sync mode.
  - **Solo Learner Mode:** For self-study or when a partner is absent. Logs in with 1 verified Patron Number and Name.
  - **Equal Lab Partners Mode:** For paired classroom sessions. Two equal cards (*Partner A* and *Partner B*—no primary/secondary hierarchy). Both students enter their verified Patron Numbers and Full Names.
  - **Roster Whitelist Gatekeeper:** Access restricted to registered 29 lab Patron Numbers in `lessons/lib/roster.ts`.
  - **Login Screen Sanitization:**
    - The "View Class Patron List" dropdown is completely removed so registration numbers remain private.
    - The "Instructor / Admin Access" link is completely removed from the student login page so students cannot access administrative gates.
  - **3-Hour Extended Session Validity:** Enforces a 180-minute (3-hour) session timeout, allowing students to comfortably complete long practical sessions, notes transcriptions, and exams without mid-class disconnection.
  - **Screen Inattention & Visibility Tracking:**
    - Listens to browser `visibilitychange` and `blur` events.
    - When a student switches tabs or minimizes the window, their session reports `isFocused: false` and the duration away to the instructor in real time.
  - **Dual Classroom Experience:**
    - *Follow Teacher Mode:* Student laptop screen automatically mirrors the teacher's active slide and Kahoot questions in real time.
    - *Self-Paced Mode:* When unlocked by teacher, students can freely browse "Copy Notes" at their own pace to write into physical exercise books or complete assignments.
  - **Assignment Submission Choice:** Supports submitting assignments as a **Joint Partner Submission** (both names and patron numbers recorded) or as an **Individual Submission** from the same laptop.
- **Instructors & Administrators:**
  - Access the separate Instructor Control Room at `/instructor`.
  - **Super Admin (`adminTolu`):** Full system authority to manage student rosters, wipe/reset test submissions, override module locks, configure settings, and export school records.
  - **Instructor (`adminIsaac`):** Classroom teaching authority to advance live slides, trigger Kahoot quizzes, reveal answers, toggle module locks, and grade student submissions.
  - **Sticky Floating Presenter Dock:** Fixed navigation controls (`[ ◀ Prev Slide ]`, `Stage X of Y`, `[ Next Slide ▶ ]`) anchored at the bottom of the screen, accessible without scrolling up and down.
  - **Live Inattention Alerts & Attendance:**
    - Real-time notification banner showing students who have navigated away from the lesson and for how long.
    - Real-time focus badges in the attendance roster: 🟢 *Focused* vs. 🔴 *Left Screen (Away duration)*.

## Usage Model

- **Classroom Environment:** Classroom projector connected to teacher PC displaying `/instructor` (or clean projected stage view); students simultaneously connect from individual or shared assigned laptops at `/`.
- **Cloud Hosting & Connectivity:** Hosted on Vercel for instant browser access on school laptops; supports local offline execution as fallback (`npm run dev`).
- **Access Control:** Strict URL and credential separation: Student Portal at `/` (29-patron whitelist gate) vs. Instructor Control Room at `/instructor` (`adminTolu` & `adminIsaac` PINs).
- **Session Lifespan:** Student laptop sessions expire after 3 hours (180 minutes).
- **Slide Mirroring:** Real-time synchronization via Next.js `/api/live-session` with "Follow Teacher" vs. "Self-Paced" toggle and live student attendance counter.

## Pedagogical Principles & Curriculum Quality Standards

- **Dual-Layer Explanation Standard (Bookish + Simple English):**
  1. *Formal "Bookish" Definition:* Clear, academically precise terminology so students excel in external examinations (WAEC, NECO, BECE).
  2. *Simple English Breakdown:* Plain, conversational explanation ("In simple English: What does this actually mean?").
  3. *Everyday Nigerian Real-Life Analogy:* Relatable connections (yam cooking, cassava grating, market POS terminals, NEPA power cuts/inverters, biological human body mappings).
  4. *Golden Memory Formula:* Short, punchy mnemonic (e.g., `RECEIVES → WORKS → SHOWS → STORES`).
- **Strict Cultural Authenticity & Extensive Visuals:**
  - **Zero White People in People Photos:** All human imagery exclusively depicts **Black / African secondary school students in uniforms, African ICT teachers, and African professionals** (doctors, bankers, engineers, mechanized farmers).
  - **Abundant Illustrations & Cutaways:** Text must never stand alone. Every concept features multi-image galleries, real labeled hardware photos, and component cutaways.
  - **Offline Vector Fallbacks:** High-quality inline SVG schematics ensure every diagram renders cleanly even in school labs with zero internet connectivity.
- **Classroom Zoom & Projector Scaling Ladder:**
  - **Normal:** 18px baseline (bolder and readable from laptop desks).
  - **Large:** 21px baseline.
  - **X-Large (Projector Mode):** 24px baseline (crystal clear when beamed across large classrooms).
- **Gamified Kahoot-Style Quiz Experience:**
  - Pre-generated curated questions with 4 vibrant response shapes: 🔺 Red Triangle (A), 🔷 Blue Diamond (B), 🟡 Yellow Circle (C), 🟩 Green Square (D).
  - 30s countdown timer, live response distribution tally, instructor-triggered reveal celebrations, and collaborative partner scoring.

## Multi-Page Architecture & Route Map

- `/` — Student entry gate (with direct-to-lesson routing upon login).
- `/learn/[moduleId]` — Fullscreen interactive classroom stage (Module 1, Module 2, etc.).
- `/notes` & `/notes/[moduleId]` — Dedicated student notebook transcription desk (with progress check-offs and print layout).
- `/assignments` & `/assignments/[moduleId]` — Homework & practical submission center (Solo and Joint partner submissions).
- `/instructor` — Instructor Control Room with live slide broadcast dock, screen-leave attention alerts, module locking, and grading ledger.

## Features

1. **Module 1 Interactive Classroom Stage (Shipped)** - Fullscreen presentation shell with keyboard navigation (`←`/`→`) and interactive Module 1 lesson beats (What is a Computer definition, IPOS cycle simulator with analogies, History timeline explorer, Device classification lab, Real-world applications, and 10-question review quiz).
2. **Classroom Platform Enhancements (Shipped)** - Visual zoom & projector scaling controls (`A-`/`A+`), Teacher vs. Student dual-role mode, instructor answer-reveal control, progressive module locking, student "Copy Notes" view, assignment submission with Patron Number & Name, and root startup scripts (`npm run dev` at root).
3. **Role Separation, Patron Authentication & Real-Time Slide Mirroring (Shipped)** - Separate Student portal (`/`) from Instructor control room (`/instructor`); 22-patron whitelist login gate with 1-hour session expiry; dual-PIN access (`adminTolu` super-admin and `adminIsaac` instructor); real-time slide sync (`/api/live-session`) with "Follow Teacher" vs. "Self-Paced" toggle and live student attendance counter.
4. **Module 1 Complete 4-Lesson Overhaul & Gamified Kahoot Arena (Shipped)** - Integrate full 4-lesson content from `module-1.md` (Understanding Computers, History & Generations, Types of Computers, Uses & Importance); rich educational imagery; pre-generated Kahoot-style quiz game with 4 colored shapes (🔺 Red, 🔷 Blue, 🟡 Yellow, 🟩 Green), countdown timer, live response tally, and teacher answer reveal.
5. **Shared Laptop Equal-Partner System, Cultural Visual Architecture & Module 1 Simple-English Overhaul (Shipped)** - Support Solo Learner vs. Equal Lab Partners (Partner A & Partner B) login modes; remove the patron list lookup toggle from login; update live session attendance and assignment submissions to support Joint and Individual options; enforce strict African-only cultural educational imagery (zero white people photos); and critically overhaul Module 1 with the Dual-Layer Explanation pattern (formal definition + simple English breakdown + relatable Nigerian analogies + memory formulas) across all 4 lessons and stages.
6. **Module 2: Parts of a Computer (Full 4-Lesson Hardware Lab & Disassembly) (Shipped)** - Integrate full 4-lesson content from `modules data/module-2.md` (Hardware Introduction, Input/Output Devices, System Unit Internals, Storage Devices & Lab Safety); dual-layer explanations (formal + simple English); human body hardware analogy interactive widget; extensive labeled African component photography; interactive System Unit disassembly simulator; and Module 2 pre-generated Kahoot game arena.
7. **Platform Architecture Perfection & Classroom Attention Security (Shipped)** - Real-time student inattention & screen-leave detection with live instructor alert banners and attendance grid focus indicators; 3-hour extended session validity; clean student login security (complete removal of instructor/admin access button); multi-page architecture with direct-to-active-lesson landing (`/learn/[moduleId]`, `/notes`, `/assignments`); sticky floating instructor slide controller dock (always visible without scrolling); increased classroom typography zoom scale (18px / 21px / 24px); and expanded visual illustration density across lesson stages.
8. **Official Cohort Attendance API Integration & Instructor Desk** - Real-time student attendance marking via DZF Cohort API (https://dzf-cohorts.vercel.app/api/cohorts/{cohortType}/attendance) with API key authentication; support for Single Check-In (scanner/toggle), Quick Bulk Barcode Check-In ("Mark All Connected Present", "Mark All Roster"), and Detailed Roster Sync; live attendance retrieval (GET) with present/absent counts and attendance rate (%); roster expansion to include student 20250645; and offline resilience caching.
9. **Module 3: Computer Usage, Booting & Core Terminology** - Mouse & touch typing practice, virtual booting sequence, and hardware/software terminology cards.
10. **Module 4: Operating Systems & Basic Configurations** - Virtual OS desktop explorer, window management, and system settings simulation.
11. **Module 5: File Management & Organization** - Interactive folder hierarchy tree, file extensions lab, and file organization simulation.
12. **Module 6: Internet Basics & Digital Citizenship** - URL anatomy simulator, browser controls, and online safety pledge.
13. **Module 7: Microsoft Office Productivity Suite** - Interactive overview of Word, Excel, and PowerPoint interfaces and use cases.
14. **Phase 2 Curriculum Hub (Modules 8-13)** - Interactive lessons for Computational Thinking (Mod 8), Scratch Programming (Mod 9), Python Scripting (Mod 10), JavaScript Web Logic (Mod 11), and Mobile App Concepts (Mod 12-13).
15. **Phase 3 Curriculum Hub (Modules 14-19)** - Interactive lessons for Web Design (Mod 14), Git/GitHub (Mod 15), AI Prompting (Mod 16), Robotics/Arduino (Mod 17), Digital Design (Mod 18), Cybersecurity & Career Pathways (Mod 19).

## Data Model

- **Authorized Student Record (`lessons/lib/roster.ts`):**
  - `patronNumber: string` (e.g., `"20230165"`)
  - `studentName: string`
  - `assignedAt: string`
- **Shared Laptop Active Session:**
  - `mode: 'solo' | 'partner'`
  - `patronNumberA: string`
  - `nameA: string`
  - `patronNumberB?: string`
  - `nameB?: string`
  - `loginTimestamp: number`
  - `expiresAt: number` (loginTimestamp + 10,800,000 ms / 3 hours)
  - `isFocused: boolean` (tracks window visibility / tab blur)
  - `leftScreenAt?: number`
  - `awayDurationSeconds?: number`
- **Live Classroom Session State (`/api/live-session`):**
  - `activeModuleId: string` (e.g. `'module-1'`)
  - `activeLessonIndex: number`
  - `activeStageIndex: number`
  - `syncMode: 'follow-teacher' | 'self-paced'`
  - `activeKahootQuestionId: number | null`
  - `isKahootRevealed: boolean`
  - `activeLaptopsCount: number`
  - `activeStudentsCount: number`
  - `awayStudentsCount: number` (real-time inattention counter)
  - `activePartners: Array<{ laptopId: string; partnerA: { patron: string; name: string }; partnerB?: { patron: string; name: string }; isFocused: boolean; leftScreenAt?: number }>`
  - `studentVotes: Record<number, number>` (counts for shape index 0, 1, 2, 3)
  - `updatedAt: string`
- **Student Assignment Submission:**
  - `id: string`
  - `submissionType: 'joint' | 'individual'`
  - `patronNumberA: string`
  - `nameA: string`
  - `patronNumberB?: string`
  - `nameB?: string`
  - `submittingPatron?: string` (when individual submission from shared laptop)
  - `moduleId: string`
  - `moduleTitle: string`
  - `answers: Record<number, string>`
  - `submittedAt: string`
  - `status: 'submitted' | 'reviewed'`
- **Pre-Generated Kahoot Question:**
  - `id: number`
  - `prompt: string`
  - `options: [string, string, string, string]` (mapped to Red Triangle, Blue Diamond, Yellow Circle, Green Square)
  - `correctIndex: number`
  - `explanation: string`
  - `timeLimitSeconds: number` (default 30)

## Tech Stack

- **Core Framework:** Next.js 16 (App Router), React 19, TypeScript 5.
- **Styling:** Tailwind CSS v4 (`lessons/app/globals.css`).
- **Icons & Graphics:** Clean inline SVGs, verified African educational photography, and responsive offline vector diagrams.
- **State & Synchronization:** Next.js server route (`/api/live-session`) with short-polling/SSE + local storage persistence.
- **Security:** PIN check on `/instructor` (`adminTolu` super-admin, `adminIsaac` teacher) and 29-Patron whitelist verification on `/`.

## Deployment

- **Hosting Platform:** Vercel cloud hosting for real-time live access on assigned classroom laptops and teacher projector.
- **Local Fallback:** 100% offline-ready via `npm run dev` from the curriculum workspace root.

## Monetization

Non-profit philanthropic education initiative by Dzuels Foundation to bridge the digital divide in Ekiti State, Nigeria. 100% free for educational use.
