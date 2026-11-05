# Feature: Module 1 Complete 4-Lesson Overhaul & Gamified Kahoot Arena

**From build-plan:** feature 4
**Build attempt:** 1
**Status:** verified
**Branch:** feature/module-1-complete-overhaul-kahoot-arena

## Goal

Overhaul Module 1 using the complete 4-lesson curriculum from `module-1.md` (Understanding Computers, History & Evolution, Types of Computers, Uses & Importance), integrate high-resolution educational imagery with offline fallbacks, and build an interactive, gamified Kahoot-style quiz battle arena with 4 colored response shapes (🔺 Red Triangle, 🔷 Blue Diamond, 🟡 Yellow Circle, 🟩 Green Square), live timer, real-time vote tally, and instructor-controlled answer reveals.

## Design reference

- Gamified Kahoot-Style Quiz Arena:
  - 4 massive, tactile response buttons on student screens:
    - 🔺 **Red Triangle** (Option A) — `#E21B3C`
    - 🔷 **Blue Diamond** (Option B) — `#1368CE`
    - 🟡 **Yellow Circle** (Option C) — `#D89E00`
    - 🟩 **Green Square** (Option D) — `#26890C`
  - 30-second animated visual countdown timer with audio-visual urgency cues.
  - Student Interface: displays prominent shape buttons, vibrates/pulses on tap, and transitions into a suspenseful "Answer Locked In!" state.
  - Teacher Interface (`/instructor`): displays live response distribution bars (e.g., "14 voted Red, 5 voted Blue") without revealing the correct option until the instructor clicks **"Reveal Answer to Class"**.
  - Answer Reveal State: correct shape expands with confetti animation, points awarded, and rich pedagogical explanation.
- Educational Imagery & Child-Friendly Visuals:
  - High-contrast visual cards with curated educational photos from `module-1.md`.
  - Offline-resilient fallback illustrations (clean inline SVGs) so lessons never show broken image icons in computer labs with slow internet.
  - Distinctive visual callout badges: "💡 Did You Know?", "🍳 Cooking & ATM Analogy", "⚠️ Lab Safety Rule", "🔬 Real-Life Example".

## In scope

- **1. Comprehensive 4-Lesson Curriculum Dataset (`lessons/data/module1.ts`):**
  - Restructure Module 1 into 4 modular lessons (40 mins each, 2+ hours total):
    - **Lesson 1:** Understanding Computers (What is a computer, Data vs. Information, IPOS cycle with Cooking/ATM analogies, CPU brain, Characteristics).
    - **Lesson 2:** History and Evolution of Computers (Abacus, Napier's Bones, Pascaline, Jacquard Loom, Charles Babbage & Ada Lovelace, Hollerith, and 5 Generations: Vacuum Tubes to AI).
    - **Lesson 3:** Types of Computers (Classification by Size: Supercomputer to Microcomputer/Mobile/Embedded; by Data Type: Analog, Digital, Hybrid; by Purpose: General vs. Special).
    - **Lesson 4:** Uses and Importance of Computers (Schools, Hospitals, Banks, Communication, Transportation, Agriculture, and Lab Etiquette/Safety).
  - Add image metadata (URL, label, caption, and local SVG fallback) for all hardware, historical machines, and real-world scenes.
  - Encode 10 pre-generated Kahoot challenge questions with shape mappings, correct indices, and detailed explanations from `module-1.md`.
  - Expand `module1Notes` to cover all 4 lessons with section-by-section notebook transcription points and "Mark as Copied" markers.
  - Expand `module1Assignment` with Section B short-answer questions and the Parent Interview home assignment.
- **2. Gamified Kahoot-Style Quiz Arena Component (`lessons/components/kahoot/KahootArena.tsx`):**
  - Interactive Kahoot battle arena supporting dual modes (`student` vs `teacher`).
  - 4 iconic shape buttons with high-contrast geometry and responsive click feedback.
  - 30-second linear/circular animated countdown timer.
  - Live vote distribution tally and student score/streak tracker.
  - Instructor controls: Launch Question, Reveal Answer, and Next Question.
- **3. Overhauled Lesson Stage Views (`lessons/components/stages/`):**
  - Update stage views to support the expanded 4-lesson curriculum beats with rich visual cards and image galleries.
  - Add image display cards with graceful local SVG fallbacks.
  - Replace the static quiz stage with the gamified `KahootArena`.
- **4. Live Session Synchronization (`lessons/app/api/live-session/route.ts` & pages):**
  - Extend live session state to broadcast `activeKahootQuestionId`, `isKahootRevealed`, and student answer selections in real time between `/instructor` and `/`.
- **5. Verification & Verification Gates:**
  - Verify clean lint (`npm run lint`) and production build (`npm run build`).
  - Test Kahoot response submission, countdown timer, and answer reveal end-to-end.
  - Test student copy notes across all 4 lessons.

## Out of scope

- Module 2 hardware anatomy content (scheduled for Feature 5).
- Audio sound effects requiring external audio files (CSS/SVG animations provide visual game feedback).

## Build loop

- `workflow.stepReview: "feature"`
- `workflow.checkpointCommits: "disabled"`
- Implementation executes on `feature/module-1-complete-overhaul-kahoot-arena`, verifies lint and build, and presents one final review packet before `/check`.

## Build steps

- [x] 1. **Data Model & Module 1 Dataset Expansion:** Update `lessons/types/curriculum.ts` and `lessons/data/module1.ts` with the 4 complete lessons, image references, 10 pre-generated Kahoot questions, and expanded notebook notes from `module-1.md`.
  - *Done when:* All 4 lessons, images, Kahoot questions, and notes are exported and typecheck cleanly.
- [x] 2. **Gamified Kahoot Arena Component:** Build `lessons/components/kahoot/KahootArena.tsx` with 4 colored shapes, countdown timer, live response counter, answer reveal, and streak score tracking.
  - *Done when:* The Kahoot arena renders interactive shape buttons, ticks down 30s, reveals answers on instructor command, and awards score points.
- [x] 3. **Interactive Lesson Stage Overhaul:** Enhance Module 1 presentation stages with rich imagery, visual callout boxes, and embed `KahootArena` into the final review stage.
  - *Done when:* The presentation displays the rich 4-lesson content with educational diagrams and offline SVG fallbacks.
- [x] 4. **Live Kahoot Mirroring Integration:** Wire Kahoot state into `/api/live-session`, `lessons/app/page.tsx`, and `lessons/app/instructor/page.tsx` so questions and reveals sync instantly across tabs.
  - *Done when:* Launching a question or revealing an answer on `/instructor` updates all connected student screens simultaneously.
- [x] 5. **Expanded Copy Notes & Homework Views:** Ensure `StudentNotesView.tsx` and `AssignmentView.tsx` display the 4-lesson notes and the parent-interview home assignment.
  - *Done when:* Students can read, copy, and check off notes for all 4 lessons, and submit the expanded assignment.
- [x] 6. **Verification & Quality Gates:** Run `npm run lint` and `npm run build` from root; verify Kahoot gameplay and lesson navigation on laptop and projector viewport sizes.
  - *Done when:* Lint and build pass with zero errors, and all 4 lessons and Kahoot arena function end-to-end.

## Files / areas

- `lessons/types/curriculum.ts` (modified) — Types for lessons, image cards, and Kahoot questions.
- `lessons/data/module1.ts` (modified) — Complete 4-lesson content, images, Kahoot questions, and notebook notes.
- `lessons/components/kahoot/KahootArena.tsx` (new) — 4-shape Kahoot game arena with countdown and reveal.
- `lessons/components/presentation/EducationalImage.tsx` (new) — Offline-resilient image cards with inline SVG fallbacks.
- `lessons/components/stages/` (modified) — StageDefinition, StageIPOS, StageTimeline, StageDeviceSorting, StageApplications with imagery.
- `lessons/app/api/live-session/route.ts` (modified) — Kahoot live question, vote collection, and reveal state broadcast.
- `lessons/app/page.tsx` (modified) — Integrates live Kahoot sync into student portal.
- `lessons/app/instructor/page.tsx` (modified) — Instructor Kahoot launcher and live vote distribution monitor.

## Verification

- **Lint:** `npm --prefix lessons run lint` passed with 0 errors and 0 warnings.
- **Production Build:** `npm --prefix lessons run build` compiled successfully in 1.7s; generated static routes for `/`, `/_not-found`, `/instructor`, and dynamic `/api/live-session`.
- **Kahoot Game Arena:** 10 questions from `module-1.md` Section A verified against teacher answer guide (1:B, 2:C, 3:A, 4:D, 5:D, 6:B, 7:A, 8:C, 9:B, 10:B).
- **Offline Reliability:** Verified inline SVG vector diagrams render immediately if network fails or images fail to load.

## Try it now

1. Start the development server:
   ```bash
   npm --prefix lessons run dev
   ```
2. Open `http://localhost:3000` in one browser window (Student Portal) and log in with Patron Number `20230194` and name "Adebayo Tolu".
3. Open `http://localhost:3000/instructor` in an incognito window and log in with PIN `adminTolu`.
4. In the Instructor Control Room, advance to Stage 6 (**Gamified Kahoot Quiz Arena**).
5. Watch the student screen automatically navigate to Question 1 in real time.
6. On the student window, click **🔷 Blue Diamond (Option B)**. Observe the "Answer locked in!" status and score update.
7. On the instructor window, observe the live vote distribution bar showing 1 vote for Blue Diamond.
8. Click **"Reveal Answer to Class"** on the instructor screen and watch both screens instantly celebrate the correct answer with full pedagogical explanations.
