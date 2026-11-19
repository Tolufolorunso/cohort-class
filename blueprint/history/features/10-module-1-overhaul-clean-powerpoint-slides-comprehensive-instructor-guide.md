# Feature: Module 1 Overhaul: Clean PowerPoint Slides & Comprehensive Instructor Guide

**From build-plan:** feature 10
**Build attempt:** 1
**Branch:** feature/module-1-overhaul-clean-powerpoint-slides-comprehensive-instructor-guide
**Status:** verified

## Goal

Transform Module 1 (`/learn/module-1`) from cluttered, text-heavy pages into clean, un-crowded 16:9 PowerPoint-style presentation slides written in natural simple English. Eliminate multi-mode language selector tabs (`"In Simple English"`, `"Formal Bookish Definition"`, `"Nigerian Everyday Analogies"`) from student screens. Keep interactive labs (IPOS cycle simulator, evolution timeline, device sorting, and real-world applications) focused and uncluttered. Equip every slide with an in-slide live `Teacher Guide` drawer (toggleable via `T` key or button), and build a dedicated pre-class `Module 1 Master Briefing` desk in `/instructor` with a 40-minute pacing schedule, formal examination syllabus references (WAEC/NECO), complete story-form Nigerian analogies, and a 1-click printable lesson sheet.

## In scope

1. **Module 1 Student Slides Overhaul (`lessons/components/stages/`):**
   - `StageDefinition.tsx`: Refactored into clean PowerPoint-style cards: What is a Computer?, Data vs. Information (clear cards with cassava grinding / cooking analogy), and the 5 Superpowers (Speed, Accuracy, Memory, Never Tires, Multitasking). Completely eliminated the 3-mode definition tabs.
   - `StageIPOS.tsx`: Refactored into an un-crowded, interactive 4-stage simulator (Input ➔ Process ➔ Output ➔ Storage) with animated pulse flow, simple English definitions, and scenario switcher. Removed cluttered text walls and secondary tabs.
   - `StageTimeline.tsx`: Refactored into clean evolution milestone slides (Abacus ➔ Babbage & Lovelace ➔ Generations 1-5 ➔ Modern AI/smartphones) with 2 concise bullets each.
   - `StageDeviceSorting.tsx`: Refactored into a clean interactive categorization lab (Desktops, Laptops, Mobile/Tablets, Supercomputers) with instant checkmarks and zero visual clutter.
   - `StageApplications.tsx`: Refactored into clean sector cards (Schools, Hospitals, Banks, Agriculture & Commerce) and lab safety rules.
   - `StageModuleComplete.tsx`: Clean summary takeaways and direct launch button for Quiz Arena Module 1 pack.
2. **In-Slide Live Teacher Guide Drawer:**
   - On all Module 1 stages, added a collapsible `Teacher Guide` drawer (toggleable via `T` key or `🧑‍🏫 Teacher Guide` button) with 3 quick cards:
     - ❓ **Ask the Class:** Prompt questions for student participation.
     - 🗣️ **Key Talking Point:** Simple conversational explanation.
     - ⚠️ **Watch Out For:** Common student misunderstandings during the practical.
3. **Pre-Class Instructor Master Briefing in `/instructor`:**
   - Added a dedicated "Module 1 Master Briefing" modal/view inside the Instructor Control Room (`Module1MasterBriefingModal.tsx`).
   - Contains 40-minute lab pacing schedule, formal WAEC/NECO examination definitions, full story-form Nigerian analogies, answers to review questions, and a **`🖨️ Print / Save Lesson Plan`** button for physical classroom use.
4. **Code Quality & Verification:**
   - Clean TypeScript types, zero React impure render calls, passed ESLint and Next.js build.

## Out of scope

- Overhauling Module 2 (Parts of a Computer & Hardware Lab) — reserved for Feature 11.
- Module 3 curriculum build — reserved for Feature 12.
- Backend database persistence or server deployment changes.

## Build steps

- [x] 1. **Clean Up Module 1 Data & Add Instructor Notes Contract**
  - Updated `lessons/data/module1.ts` to provide clean slide copy (natural simple English definitions, bullet points, memory formulas) and structured `teacherNotes` (prompt question, talking points, watch out for, formal exam definitions) for all Module 1 stages.
  - Exported `module1MasterBriefing` with 40-minute pacing schedule, syllabus definitions, analogies, and verbal check questions.
- [x] 2. **Overhaul Stages 1 & 2 (Definition & IPOS Cycle Simulator)**
  - Rewrote `StageDefinition.tsx` and `StageIPOS.tsx` into clean 16:9 PowerPoint-style cards. Removed the 3-mode definition tabs (`"In Simple English"`, `"Formal Bookish"`, `"Nigerian Everyday Analogies"`). Added the in-slide `Teacher Guide` drawer (`T` key / button).
- [x] 3. **Overhaul Stages 3, 4, 5 & Completion (Timeline, Sorting, Applications & Summary)**
  - Rewrote `StageTimeline.tsx`, `StageDeviceSorting.tsx`, `StageApplications.tsx`, and `StageModuleComplete.tsx` into clean PowerPoint slide cards with the in-slide `Teacher Guide` drawer on each stage.
- [x] 4. **Build Pre-Class Module 1 Master Briefing in `/instructor`**
  - Added the "Module 1 Master Briefing" desk with 40-minute lesson plan, formal exam definitions, story-form Nigerian analogies, and print layout button in `lessons/app/instructor/page.tsx` (via `Module1MasterBriefingModal.tsx`).
- [x] 5. **Verification & End-to-End Build**
  - Ran `npm --prefix lessons run lint` and `npm --prefix lessons run build`. Both succeeded with 0 errors.

## Verification

- **ESLint:**
  - `npm --prefix lessons run lint`: PASSED (0 errors, 0 warnings).
- **TypeScript Compilation & Next.js Production Build:**
  - `npm --prefix lessons run build`: PASSED (Compiled in 1.5s, TypeScript checked in 3.0s, all 29 static routes generated cleanly in 1.4s).
- **Findings Ledger:**
  - `blueprint/context/findings.md`: 0 open findings.
- **Independent Review:**
  - Not selected under `when-sensitive` policy (UI and content refactor).

## Try it now

1. Start the Next.js dev server if it is not already running:
   ```bash
   npm --prefix lessons run dev
   ```
2. Open your browser and navigate to the student lesson stage:
   `http://localhost:3000/learn/module-1`
3. Observe the overhauled presentation slides:
   - Notice the un-crowded 16:9 slide layout with large text and natural simple English.
   - Confirm that the multi-mode tabs (`"In Simple English"`, `"Formal Bookish"`, `"Nigerian Everyday Analogies"`) are completely gone.
   - Press **`T`** on your keyboard (or click **"🧑‍🏫 Teacher Guide"** in the top right of the slide) to reveal the live talking points, question to ask the class, and pitfalls to watch out for.
   - Use the **`→`** arrow key or **`Spacebar`** to advance through all 6 stages.
4. Navigate to the Instructor Control Room:
   `http://localhost:3000/instructor`
   - Log in with PIN `2025` (adminIsaac) or `2026` (adminTolu).
   - Click the **"📖 Module 1 Master Brief (WAEC & Lesson Plan)"** button at the top of the command desk.
   - Review the complete 40-minute lab pacing schedule, formal WAEC/NECO syllabus definitions, story-form analogies, and click **"🖨️ Print Lesson Plan"** to preview the clean printable lesson sheet!
