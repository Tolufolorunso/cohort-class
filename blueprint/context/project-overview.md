# Dzuel's Computer Class - Project Overview

<!-- blueprint:source-hash d8307f902307b8babe947126800bfd3c106fbea0905cae5bddb38d6753f7db4e -->

> Interactive presentation and digital literacy curriculum platform replacing static classroom slides with visual simulations, real-world analogies, and hands-on learning beats.

## Problem

Traditional slide decks (PowerPoint, static PDFs) are passive and ineffective for teaching foundational digital literacy to secondary school students (ages 12–18) who have zero prior computer experience. Teachers need an interactive presentation platform directly in the browser that replaces slides with dynamic visual models, real-world analogies, and hands-on exercises to demystify computers and keep students engaged during classroom and laboratory sessions.

## Users

- **Teacher / Instructor (Primary):** Controls the lesson flow from the front of the classroom on a projector or large monitor using keyboard shortcuts (`←`/`→`, Space) and interactive widgets without needing slides.
- **Students (Ages 12–18, Secondary):** Actively participate during class demonstrations, answer interactive review quizzes, and engage with visual classification and IPOS simulations. (Future: individual lab workstation access).

## Usage model

- **Classroom Environment:** Classroom and computer laboratory settings, typically projected or displayed on large monitors.
- **Offline Reliability:** 100% offline operation required; zero reliance on internet connectivity, external CDNs, or remote APIs during class sessions.
- **Scale:** Single classroom presentation instance per teaching session; lightweight client-side state.
- **Trust & Boundaries:** No user accounts, passwords, cloud persistence, or multi-tenant boundaries required for MVP.

## Features

1. **Module 1 Interactive Classroom Stage (Headline Feature)** - Fullscreen presentation shell with keyboard navigation (`←`/`→`) and interactive Module 1 lesson beats (What is a Computer definition, IPOS cycle simulator with analogies, History timeline explorer, Device classification lab, Real-world applications, and 10-question review quiz).
2. **Module 2: Parts of a Computer** - Interactive hardware anatomy (Motherboard, CPU, RAM, Storage, and Input/Output/Storage sorting lab).
3. **Module 3: Computer Usage & Core Terminology** - Mouse/keyboard practice, booting simulation, and core terminology cards.
4. **Module 4: Operating Systems & Basic Configurations** - Virtual OS desktop explorer, window management, and basic settings simulator.
5. **Module 5: File Management & Organization** - Interactive file tree explorer (folders, paths, extensions, and file organization lab).
6. **Module 6: Internet Basics & Digital Citizenship** - URL anatomy simulator, browser controls, and digital safety pledge.
7. **Module 7: Microsoft Office Productivity Suite** - Interactive overview of Word, Excel, and PowerPoint interfaces and use cases.
8. **Phase 2 Curriculum Hub (Modules 8-12)** - Interactive lessons for Computational Thinking (Mod 8), Scratch Programming (Mod 9), Python Scripting (Mod 10), JavaScript Web Logic (Mod 11), and Mobile App Concepts (Mod 12).
9. **Phase 3 Curriculum Hub (Modules 13-19)** - Interactive lessons for Web Design (Mod 13), Git/GitHub (Mod 14), AI Prompting (Mod 15), Robotics/Arduino (Mod 16), Digital Design (Mod 17), Cybersecurity (Mod 18), and Career Pathways (Mod 19).

## Data model

Curriculum content and presentation states are structured cleanly in TypeScript schemas under `lessons/`:

### Module
- `id` (string) - Unique module identifier (e.g., `'module-1'`)
- `title` (string) - Module title (e.g., `'Introduction to Computers'`)
- `phase` (number) - Curriculum phase (1, 2, or 3)
- `duration` (string) - Estimated duration (e.g., `'2 Weeks (4 Lessons)'`)
- `stages` (LessonStage[]) - Ordered list of presentation stages

### LessonStage
- `id` (string) - Stage identifier (e.g., `'ipos-cycle'`)
- `title` (string) - Stage heading for projector display
- `subtitle` (string) - Brief guidance or topic description
- `type` (string) - Beat type: `'concept' | 'simulator' | 'timeline' | 'sorting-lab' | 'grid' | 'quiz'`
- `data` (unknown) - Specialized widget payload for the stage

### IPOSData
- `steps` (IPOSStep[]) - Input, Processing, Output, and Storage steps
- `analogies` (Analogy[]) - Real-world scenarios (e.g. baking a cake, ATM withdrawal, math calculation)

### TimelineEvent
- `id` (string) - Historical device id (e.g., `'abacus'`, `'pascaline'`, `'analytical-engine'`, `'microprocessor'`)
- `year` (string) - Era or year of invention
- `title` (string) - Device/invention name
- `creator` (string) - Inventor or pioneer
- `significance` (string) - Key innovation and why it mattered

### DeviceItem
- `id` (string) - Device item identifier
- `name` (string) - Name (e.g., `'Smart Watch'`, `'ATM'`, `'MacBook'`, `'Gaming Tower'`)
- `category` (string) - `'desktop' | 'laptop' | 'tablet' | 'smartphone' | 'supercomputer'`
- `clues` (string[]) - Helpful hints for student deduction

### QuizQuestion
- `id` (string) - Question id
- `prompt` (string) - Question text
- `options` (string[]) - 4 multiple choice options
- `correctIndex` (number) - 0-based index of the correct answer
- `explanation` (string) - Clear teaching explanation displayed after voting

### ClassroomSessionState (Client-side)
- `currentStageIndex` (number) - Active presentation stage index
- `isFullscreen` (boolean) - Fullscreen mode flag
- `completedExercises` (Record<string, boolean>) - Tracking completed stage activities
- `quizAnswers` (Record<string, number>) - Selected quiz responses and score tally

## Tech stack

- **Next.js 16 (App Router):** Fast client-side rendering, layout management, and React Server Components.
- **React 19:** Interactive components, keyboard listeners, animations, and state management.
- **TypeScript 5:** Static type definitions for curriculum data and interactive states.
- **Tailwind CSS v4:** Modern styling with high-contrast, large-display readability for classrooms.
- **Local SVGs & Assets:** 100% self-contained visual assets with zero external network dependencies.

## Monetization

Not in v1 (non-profit educational initiative by Dzuels Foundation to alleviate poverty through quality digital literacy education).

## UI/UX

- `lessons/app/page.tsx` or `lessons/app/module-1/page.tsx` - Fullscreen stage view for live teaching.
- **Projector-Ready Display:** Large headings (32px–48px), bold high-contrast text, clear visual hierarchy.
- **Stage Progress Bar:** Top visual bar indicating progress through the module.
- **Teacher Keyboard Shortcuts:** `ArrowRight` / `Space` for next stage, `ArrowLeft` for previous stage, `F` for fullscreen toggle.
- **Tactile Interactive Widgets:** Interactive step simulators with real-world analogies, drag/click device sorting, and live quiz with instant feedback.

## Deployment

- **Target Host:** Local classroom PC or school lab server via `npm --prefix lessons run dev` or `npm --prefix lessons run build && npm --prefix lessons run start`.
- **Cloud Deployment:** Optional deployment to Vercel for teacher preparation outside the lab.
- **Environment Variables:** None required for MVP.
- **Database/Storage:** None required for MVP.
