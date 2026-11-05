# Dzuel's Computer Class - Project Overview

<!-- blueprint:source-hash 09baa42814dfc1ed2acdd1055b06034b4923bc35b8e82d946c127a49c865a4b3 -->

> Interactive classroom presentation and digital literacy curriculum platform replacing static slides with visual simulations, real-time slide mirroring, gamified Kahoot-style quiz battles, and dedicated student laptop portals.

## Problem

Traditional slide decks (PowerPoint, static PDFs) are passive and ineffective for teaching foundational digital literacy to secondary school students (ages 12–18) who have zero prior computer experience. Teachers need an interactive presentation and learning platform in the browser that replaces slides with dynamic visual models, real-world analogies, and hands-on exercises to demystify computers and keep students engaged during classroom and laboratory sessions. Additionally, students using individual laptops assigned to them in the computer lab need a dedicated, secure learning portal to participate in live classroom games, copy lesson notes into their exercise books, and submit homework assignments using their verified Patron Number and Name.

## Users

- **Students (Ages 12–18, Secondary School Learners):**
  - Connect via assigned classroom laptops at `/`.
  - Log in with verified **Patron Number** (validated against the 22-student lab roster) and **Full Name**.
  - Sessions automatically expire after 1 hour (60 minutes) for lab security and clean turnover.
  - In *Follow Teacher Mode*, student screens automatically mirror the teacher's active slides and Kahoot questions in real time.
  - In *Self-Paced Mode*, students copy formatted lesson notes into physical exercise books and complete homework.
- **Instructors & Administrators:**
  - Access the separate Instructor Control Room at `/instructor`.
  - **Super Admin (`adminTolu`):** Full system authority to manage rosters, wipe/reset test submissions, override module locks, configure settings, and export school records.
  - **Instructor (`adminIsaac`):** Classroom teaching authority to advance live slides, trigger Kahoot quizzes, reveal answers, toggle module locks, and grade student submissions.

## Usage model

- **Classroom Environment:** Classroom projector connected to teacher PC displaying `/instructor` (or clean projected stage view); students simultaneously connect from individual assigned laptops at `/`.
- **Cloud Hosting & Connectivity:** Hosted on Vercel for instant browser access on school laptops; supports local offline execution as fallback.
- **Access Control:** Strict URL and credential separation: Student Portal at `/` (22-patron whitelist gate) vs. Instructor Control Room at `/instructor` (`adminTolu` & `adminIsaac` PINs).
- **Session Lifespan:** Student laptop sessions expire every 60 minutes.
- **Slide Mirroring:** Real-time synchronization via Next.js `/api/live-session` with "Follow Teacher" vs. "Self-Paced" toggle.

## Features

1. **Module 1 Interactive Classroom Stage (Shipped)** - Fullscreen presentation shell with keyboard navigation (`←`/`→`) and interactive Module 1 lesson beats (What is a Computer definition, IPOS cycle simulator with analogies, History timeline explorer, Device classification lab, Real-world applications, and 10-question review quiz).
2. **Classroom Platform Enhancements (Shipped)** - Visual zoom & projector scaling controls (`A-`/`A+`), Teacher vs. Student dual-role mode, instructor answer-reveal control, progressive module locking, student "Copy Notes" view, assignment submission with Patron Number & Name, and root startup scripts (`npm run dev` at root).
3. **Role Separation, Patron Authentication & Real-Time Slide Mirroring** - Separate Student portal (`/`) from Instructor control room (`/instructor`); 22-patron whitelist login gate with 1-hour session expiry; dual-PIN access (`adminTolu` super-admin and `adminIsaac` instructor); real-time slide sync (`/api/live-session`) with "Follow Teacher" vs. "Self-Paced" toggle and live student attendance counter.
4. **Module 1 Complete 4-Lesson Overhaul & Gamified Kahoot Arena** - Integrate full 4-lesson content from `module-1.md` (Understanding Computers, History & Generations, Types of Computers, Uses & Importance); rich educational imagery; pre-generated Kahoot-style quiz game with 4 colored shapes (🔺 Red, 🔷 Blue, 🟡 Yellow, 🟩 Green), countdown timer, live response tally, and teacher answer reveal.
5. **Module 2: Parts of a Computer (Full 4-Lesson Hardware Lab)** - Integrate full 4-lesson content from `module-2.md` (Hardware Introduction, Input/Output Devices, System Unit Internals with PC Disassembly simulator, Storage Devices & Lab Safety); human body analogy interactive widget; and Module 2 pre-generated Kahoot game arena.
6. **Module 3: Computer Usage, Booting & Core Terminology** - Mouse & touch typing practice, virtual booting sequence, and hardware/software terminology cards.
7. **Module 4: Operating Systems & Basic Configurations** - Virtual OS desktop explorer, window management, and system settings simulation.
8. **Module 5: File Management & Organization** - Interactive folder hierarchy tree, file extensions lab, and file organization simulation.
9. **Module 6: Internet Basics & Digital Citizenship** - URL anatomy simulator, browser controls, and online safety pledge.
10. **Module 7: Microsoft Office Productivity Suite** - Interactive overview of Word, Excel, and PowerPoint interfaces and use cases.
11. **Phase 2 Curriculum Hub (Modules 8-13)** - Interactive lessons for Computational Thinking (Mod 8), Scratch Programming (Mod 9), Python Scripting (Mod 10), JavaScript Web Logic (Mod 11), and Mobile App Concepts (Mod 12-13).
12. **Phase 3 Curriculum Hub (Modules 14-19)** - Interactive lessons for Web Design (Mod 14), Git/GitHub (Mod 15), AI Prompting (Mod 16), Robotics/Arduino (Mod 17), Digital Design (Mod 18), Cybersecurity & Career Pathways (Mod 19).

## Data model

- **Authorized Student Record:**
  - `patronNumber: string` (e.g., `"20230194"`)
  - `studentName: string`
  - `assignedAt: string`
- **Active Student Session:**
  - `patronNumber: string`
  - `studentName: string`
  - `loginTimestamp: number`
  - `expiresAt: number` (loginTimestamp + 3600000 ms / 1 hour)
- **Live Classroom Session State (`/api/live-session`):**
  - `activeModuleId: string` (e.g. `'module-1'`)
  - `activeLessonIndex: number`
  - `activeStageIndex: number`
  - `syncMode: 'follow-teacher' | 'self-paced'`
  - `activeKahootQuestionId: number | null`
  - `isKahootRevealed: boolean`
  - `activeStudentsCount: number`
  - `updatedAt: string`
- **Student Assignment Submission:**
  - `id: string`
  - `patronNumber: string`
  - `studentName: string`
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

## Tech stack

- **Core Framework:** Next.js 16 (App Router), React 19, TypeScript 5.
- **Styling:** Tailwind CSS v4 (`lessons/app/globals.css`).
- **Icons & Graphics:** Clean inline SVGs, verified educational diagrams, and responsive WebP image cards with offline fallbacks.
- **State & Synchronization:** Next.js server route (`/api/live-session`) with short-polling/SSE + local storage persistence.
- **Security:** PIN check on `/instructor` (`adminTolu` super-admin, `adminIsaac` teacher) and Patron whitelist verification on `/`.

## Deployment

- **Hosting Platform:** Vercel cloud hosting for real-time live access on assigned classroom laptops and teacher projector.
- **Local Fallback:** 100% offline-ready via `npm run dev` from the curriculum workspace root.
