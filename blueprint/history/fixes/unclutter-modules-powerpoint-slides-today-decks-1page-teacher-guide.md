# Feature: Unclutter Modules into PowerPoint Slide Decks, Dynamic Today Decks & 1-Page Teacher Guides

**From build-plan:** fix/enhancement
**Build attempt:** 1
**Branch:** feature/unclutter-modules-powerpoint-slides-today-decks-1page-teacher-guide
**Status:** verified

## Goal

1. Eliminate all crowded, dense multi-component pages across modules and make every module mirror the clean 16:9 widescreen PowerPoint presentation slide format established in Today's Practical Class (`TodayClassDeck.tsx`).
2. Make "Today" dynamically powered by the current active module:
   - For students: `/today` loads the presentation slide deck for the current active module.
   - For instructors: `/instructor/today` loads the presentation slide deck for the current active module with instructor presenter tools (slide broadcasting, module switcher, teacher drawer).
   - `/learn/[moduleId]` uses the exact same PowerPoint presentation slide deck for that specific module.
3. Streamline all teacher notes into clean, digestible 1-page guides written in simple, friendly English with 40-minute pacing, 3 golden ideas, everyday Nigerian analogies, common student pitfalls, and verbal check questions.

## In scope

1. **Slide Architecture & Data Contracts:**
   - Define unified slide schema (`PresentationSlide`) with badge, title, subtitle, 2x2 bullet points (icon, title, desc), Nigerian analogy, interactive lab type, and 3-card teacher notes (`promptQuestion`, `talkingPoint`, `watchOutFor`).
   - Create clean slide decks for Module 1 (10 slides), Module 2 (10 slides), and Module 3 (12 slides).
2. **Unified PowerPoint Slide Deck Component (`UnifiedSlideDeck.tsx`):**
   - 16:9 widescreen card layout with large typography, generous whitespace, and zero visual clutter.
   - Top navigation: slide jump selector, module switcher (for instructors), teacher guide toggle, 1-page notes viewer modal, fullscreen toggle.
   - Progress bar and slide number indicator (`SLIDE 01 / 10`).
   - Interactive lab embeds:
     - Module 1: IPOS cycle simulator, Device classification lab.
     - Module 2: Peripheral input/output sorter, 7-step PC disassembly simulator, Byte capacity ladder.
     - Module 3: Booting simulator, Window controls playground, Mouse gym, Folder/file creator, 20-level RapidTyping engine.
   - In-slide Teacher Guide drawer (`T` key) with 3 quick cards.
   - Sticky bottom presenter dock (`◀ Previous Slide`, `Slide X of Y`, `Next Slide ▶`).
   - Global keyboard navigation (`←`, `→`, `Space`, `T`, `F`).
3. **Dynamic "Today" Routes for Student & Instructor:**
   - `/today`: Loads the student slide deck for the current active module.
   - `/instructor/today`: Loads the instructor slide deck with presenter controls and live slide broadcasting.
   - `/learn/[moduleId]`: Direct slide deck for that specific module.
4. **Digestible 1-Page Pre-Class Teacher Briefings:**
   - Replace long multi-page dossiers with crisp, 1-page digestible teacher guides in simple English:
     - Module 1: Introduction to Computers
     - Module 2: Parts of a Computer (Hardware Lab)
     - Module 3: Computer Usage, Booting & Rapid-Typing
   - Dedicated print layout (`@media print`) so instructors can print a 1-page physical lesson sheet.
5. **Storage & Session Sync:**
   - Track `currentActiveModule` in `platformStorage.ts` and `/api/live-session`.
   - Real-time slide broadcasting between instructor on `/instructor/today` and students on `/today`.

## Out of scope

- Future Phase 1 modules (Modules 4–7) content authoring.
- External database integrations.

## Build steps

- [x] 1. **Unified Slide Data & Contracts**: Create `lessons/types/presentation.ts` and module slide decks for Module 1, Module 2, and Module 3 in `lessons/data/slides/`.
- [x] 2. **Digestible 1-Page Teacher Briefings**: Write simple-English 1-page teacher briefing guides for Modules 1, 2, and 3 in `lessons/data/teacherBriefings.ts` and update briefing modals.
- [x] 3. **Unified PowerPoint Slide Deck Component**: Build `lessons/components/presentation/UnifiedSlideDeck.tsx` mirroring `TodayClassDeck.tsx` with clean 16:9 layout, embedded interactive simulators, in-slide teacher drawer, and presenter controls.
- [x] 4. **Dynamic Today Routes (`/today` & `/instructor/today`)**:
  - Update `lessons/app/today/page.tsx` for students.
  - Create `lessons/app/instructor/today/page.tsx` for instructors with module switcher and live broadcast.
  - Update `lessons/components/learn/LearnView.tsx` to use the unified slide deck for `/learn/[moduleId]`.
- [x] 5. **Instructor Control Desk Navigation & Current Module Sync**:
  - Add `/instructor/today` button to `/instructor`.
  - Wire `getCurrentActiveModule` and `setCurrentActiveModule` in `platformStorage.ts` and `/api/live-session`.
- [x] 6. **End-to-End Verification**:
  - Run `npm --prefix lessons run lint` (0 errors, 0 warnings).
  - Run `npm --prefix lessons run build` (all routes compile cleanly).

## Verification

- **ESLint:**
  - `npm --prefix lessons run lint`: PASSED (0 errors, 0 warnings).
- **TypeScript Compilation & Next.js Production Build:**
  - `npm --prefix lessons run build`: PASSED (Compiled in 1.4s, TypeScript checked in 2.7s, all 30 static routes generated cleanly in 1.4s).
- **Findings Ledger:**
  - `blueprint/context/findings.md`: 0 open findings.
- **Independent Review:**
  - Not selected under `when-sensitive` policy (UI and presentation layout refactoring).

## Try it now

1. **Student Today Deck:** Open [http://localhost:3000/today](http://localhost:3000/today) to experience the clean 16:9 widescreen PowerPoint presentation slides.
2. **Instructor Today Deck:** Open [http://localhost:3000/instructor/today](http://localhost:3000/instructor/today) to test presenter mode, switch modules from the top dropdown, and press `T` to see the in-slide teacher notes.
3. **1-Page Teacher Briefing:** Click **`📄 1-Page Guide`** (or open `/instructor`) to view and test the 1-page lesson plan and print layout.
4. **Any Module Slide Deck:** Visit [http://localhost:3000/learn/module-1](http://localhost:3000/learn/module-1), [http://localhost:3000/learn/module-2](http://localhost:3000/learn/module-2), or [http://localhost:3000/learn/module-3](http://localhost:3000/learn/module-3).
