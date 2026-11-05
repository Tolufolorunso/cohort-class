# Dzuel's Computer Class - Project Overview

<!-- blueprint:source-hash 6c4eb1e65814f4f836ca978276cfe5c418228970523579937ebe49622d257c85 -->

> Interactive presentation and digital literacy curriculum platform replacing static classroom slides with visual simulations, real-world analogies, teacher/student roles, and student notebook/homework tools.

## Problem

Traditional slide decks (PowerPoint, static PDFs) are passive and ineffective for teaching foundational digital literacy to secondary school students (ages 12–18) who have zero prior computer experience. Teachers need an interactive presentation and learning platform in the browser that replaces slides with dynamic visual models, real-world analogies, and hands-on exercises to demystify computers and keep students engaged during classroom and laboratory sessions. Additionally, students using individual laptops assigned to them in the computer lab need a structured place to copy lesson notes, complete assignments, and submit work using their Patron Number and Name.

## Users

- **Teacher / Instructor (Primary):** Controls the lesson flow from the classroom projector, triggers answer reveals when ready, locks/unlocks curriculum modules, and reviews student assignments.
- **Students (Ages 12–18, Secondary):** Use assigned classroom laptops to participate in live exercises, copy formatted lesson notes into physical exercise books, complete interactive homework, and submit assignments with their **Patron Number** and **Full Name**.

## Usage model

- **Classroom Environment:** Classroom projector connected to teacher PC; students simultaneously connect from individual assigned laptops.
- **Cloud Hosting & Connectivity:** Hosted on Vercel for instant browser access on school laptops; supports local offline execution as fallback.
- **Access Control:** Lightweight Teacher Mode (PIN/passcode protected) vs. Student Mode; progressive module locking to keep students focused on the active lesson.
- **Data Persistence:** Submissions and lock states persist reliably in local storage / server API routes.

## Features

1. **Module 1 Interactive Classroom Stage (Shipped)** - Fullscreen presentation shell with keyboard navigation (`←`/`→`) and interactive Module 1 lesson beats (What is a Computer definition, IPOS cycle simulator with analogies, History timeline explorer, Device classification lab, Real-world applications, and 10-question review quiz).
2. **Classroom Platform Enhancements (Headline Feature)** - Visual zoom & projector scaling controls (`A-`/`A+`), Teacher vs. Student dual-role mode, instructor answer-reveal control, progressive module locking, student "Copy Notes" view, assignment submission with Patron Number & Name, and root startup scripts (`npm run dev` at root).
3. **Module 2: Parts of a Computer** - Interactive hardware anatomy (Motherboard, CPU, RAM, Storage, and Peripherals) with rich child-friendly imagery, interactive PC disassembly simulator, human body analogy, and input/output sorting lab.
4. **Module 3: Computer Usage & Core Terminology** - Mouse/keyboard practice, booting simulation, and core terminology cards.
5. **Module 4: Operating Systems & Basic Configurations** - Virtual OS desktop explorer, window management, and basic settings simulator.
6. **Module 5: File Management & Organization** - Interactive file tree explorer (folders, paths, extensions, and file organization lab).
7. **Module 6: Internet Basics & Digital Citizenship** - URL anatomy simulator, browser controls, and digital safety pledge.
8. **Module 7: Microsoft Office Productivity Suite** - Interactive overview of Word, Excel, and PowerPoint interfaces and use cases.
9. **Phase 2 Curriculum Hub (Modules 8-13)** - Interactive lessons for Computational Thinking (Mod 8), Scratch Programming (Mod 9), Python Scripting (Mod 10), JavaScript Web Logic (Mod 11), and Mobile App Concepts (Mod 12-13).
10. **Phase 3 Curriculum Hub (Modules 14-19)** - Interactive lessons for Web Design (Mod 14), Git/GitHub (Mod 15), AI Prompting (Mod 16), Robotics/Arduino (Mod 17), Digital Design (Mod 18), Cybersecurity & Career Pathways (Mod 19).

## Data model

### Module
- `id` (string) - Unique identifier (e.g., `'module-1'`, `'module-2'`)
- `title` (string) - Module title
- `phase` (number) - Curriculum phase (1, 2, or 3)
- `duration` (string) - Estimated duration
- `isLocked` (boolean) - Whether access is locked by instructor
- `notes` (StudentNoteSection[]) - Formatted lesson notes for exercise book transcription
- `stages` (LessonStage[]) - Ordered interactive presentation beats

### StudentSubmission
- `id` (string) - Unique submission ID
- `patronNumber` (string) - Student Patron ID (e.g., `'DZ-2026-042'`)
- `studentName` (string) - Student full name (e.g., `'Adebayo Oluwaseun'`)
- `moduleId` (string) - Associated module ID
- `answers` (Record<string, unknown>) - Submitted answers / homework responses
- `submittedAt` (string) - ISO timestamp

### ModuleLockState
- `unlockedModules` (string[]) - Array of module IDs currently unlocked by the instructor

### VisualZoomConfig
- `zoomLevel` (string) - `'normal' | 'large' | 'extra-large'`
- `highContrast` (boolean) - High-contrast projector visibility toggle

### UserRoleState
- `activeRole` (string) - `'teacher' | 'student'`
- `isTeacherAuthenticated` (boolean) - Whether instructor PIN has been validated

### QuizQuestion
- `id` (number) - Question identifier
- `prompt` (string) - Question text
- `options` (string[]) - Multiple choice options
- `correctIndex` (number) - Index of correct answer
- `explanation` (string) - Teaching rationale (revealed under instructor control)

## Tech stack

- **Next.js 16 (App Router):** Fast client rendering, layout management, and React Server Components.
- **React 19:** Interactive components, keyboard listeners, role management, and state.
- **TypeScript 5:** Static type definitions for curriculum data, student submissions, and roles.
- **Tailwind CSS v4:** Modern styling with dynamic zoom scaling and high-contrast projector support.
- **Vercel Cloud Hosting:** Seamless multi-device classroom access across teacher projector and student laptops.
- **Local Client Storage:** Reliable offline-ready persistence for student submissions and lock states.

## Monetization

Not in v1 (non-profit educational initiative by Dzuels Foundation to alleviate poverty through quality digital literacy education).

## UI/UX

- **Classroom Projector View:** Scalable font sizing (`A-` / `A` / `A+`), high-contrast colors, and fullscreen presentation toggle (`F`).
- **Teacher vs. Student Header:** Distinct header bar showing active role, phase, module switcher, and lock status.
- **Copy Notes View:** Clean, readable card view formatted specifically for students to copy key definitions and diagrams into physical exercise books.
- **Student Submission Drawer:** Simple form prompting for Patron Number and Full Name before submitting homework exercises.
- **Instructor Dashboard Modal:** Secure panel for teachers to unlock upcoming modules and view submitted student assignments.

## Deployment

- **Primary Cloud Host:** Vercel deployment of the Next.js app in `lessons/`.
- **Local Fallback:** Runs locally via `npm run dev` directly from the `/curriculum` root.
- **Environment Variables:** None required for MVP.
- **Database / Storage:** Browser local storage with lightweight API sync for multi-device classroom review.
