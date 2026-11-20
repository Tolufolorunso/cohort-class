# Feature: Module 3 Curriculum, Dynamic Workstation Roster & 20-Level RapidTyping

**From build-plan:** feature 12
**Build attempt:** 1
**Branch:** feature/module-3-curriculum-dynamic-workstation-roster-20-level-rapidtyping
**Status:** verified

## Goal

1. Eliminate hardcoded student names from `lessons/lib/roster.ts` so that barcodes strictly identify authorized lab workstations, while student names come dynamically from user input at login and are displayed in the instructor attendance desk, live slide sessions, and assignment records.
2. Expand the RapidTyping engine in `lessons/components/today/InteractiveRapidTyping.tsx` from 3 basic sentences to a comprehensive 20-level curriculum across 5 learning tiers with live accuracy %, WPM metrics, and mastery stars.
3. Provide complete, textbook-grade pre-class instructor lecture notes for Modules 1, 2, and 3, accessible as printable dossiers in `/instructor` and as expandable reading text in the in-slide Teacher Guide drawer (`T` key).
4. Build the official Module 3 ("Computer Usage, Booting & Rapid-Typing") curriculum in clean 16:9 widescreen PowerPoint-style presentation slides with 4 full lessons, interactive simulators (Booting simulator, window controls playground, folder & file lab, 20-level RapidTyping embed, ergonomics guide), student copy notes, homework assignments, and a 10-question Kahoot quiz.

## Design reference

- 16:9 widescreen presentation slide standard established in Modules 1 and 2 (`module-1.tsx`, `module-2.tsx`, `TodayClassDeck.tsx`).
- In-slide Teacher Guide drawer with `useIsInstructor` security gate and expandable lecture dossier.
- Projector-readable typography scale (18px / 21px / 24px) and high-contrast dark theme (`zinc-950` / `zinc-900` / `emerald-400` / `amber-400`).
- Strict African cultural representation for all human illustrations (Black African students and educators; zero Caucasian stock photos).

## In scope

1. **Dynamic Student Login & Roster Refactor (`lessons/lib/roster.ts`, `lessons/components/auth/StudentLogin.tsx`)**:
   - Completely remove the static `PATRON_DIRECTORY` dictionary.
   - Maintain `AUTHORIZED_PATRONS: string[]` (30 lab workstation barcodes).
   - Implement `registerPatronName(barcode: string, name: string)` and `getStudentNameByBarcode(barcode: string): string` with dynamic storage (in-memory + `localStorage`).
   - If a barcode has not logged in yet, display `Patron #${barcode}` or `Unassigned (${barcode})`.
   - Update `validateSoloLogin` and `validatePartnerLogin` to register entered names dynamically.
2. **Dynamic Name Propagation in Instructor Desk & APIs (`CohortAttendanceDesk.tsx`, attendance route)**:
   - Reflect dynamic student names in `CohortAttendanceDesk.tsx` (reads from live connected students or registered patrons).
   - In `/api/cohorts/[cohortType]/attendance/route.ts`, return recorded student names or dynamic registered names without hardcoded fallbacks.
3. **20-Level RapidTyping Progression Engine (`InteractiveRapidTyping.tsx`)**:
   - 20 levels categorized into 5 tiers:
     - *Tier 1 (Levels 1–4): Home Row Foundations* (`asdf jkl;`, alternating keys, words `dad, sad, ask, glad`, home row sentences).
     - *Tier 2 (Levels 5–8): Top Row Integration* (`qwer tyui op`, words `type, write, power`, top/home sentences, full pangram `The quick brown fox...`).
     - *Tier 3 (Levels 9–12): Bottom Row & Shift Keys* (`zxcv bnm`, words `zoom, next, cable`, capitalization `Lagos, Abuja, Nigeria`, Nigerian tech sentences).
     - *Tier 4 (Levels 13–16): Numbers, Symbols & CLI Syntax* (number row `12345 67890`, symbols `pass#2026, $150, 100%`, shortcuts `Ctrl+C / Ctrl+V / Ctrl+S`, commands `cd /lessons && npm run dev`).
     - *Tier 5 (Levels 17–20): African Tech Speedruns & Champion Challenge* (Yaba tech hub passage, IPOS speed flow, ergonomics zen, 20-level grandmaster sprint).
   - Tier selection tabs/pills, level completion cards, real-time WPM, accuracy %, error tracking, and celebratory badges.
4. **Complete Pre-Class Instructor Lecture Notes & Master Briefings (`lessons/data/module1.ts`, `lessons/data/module2.ts`, `lessons/data/module3.ts`)**:
   - Expand `module1MasterBriefing` and `module2MasterBriefing` with full, textbook-grade lecture notes (semiconductor switching, register-level fetch-decode-execute cycle, bus widths, DDR/SSD architecture, classroom delivery script).
   - In `TeacherGuideDrawer.tsx`, add an expandable full lecture notes modal/view for live teacher reference.
5. **Module 3 Curriculum Data & Slides (`lessons/data/module3.ts`, `Module3MasterBriefingModal.tsx`, `lessons/data/curriculum.ts`)**:
   - Create `lessons/data/module3.ts` with 4 lessons:
     - Lesson 1: Cold & Warm Booting, Power Cycles, and Desktop Anatomy.
     - Lesson 2: Mouse, Touchpad & Window Control Mastery (Minimize, Maximize, Close, Resize).
     - Lesson 3: Folder Hierarchy, File Creation & Storage Management Lab.
     - Lesson 4: Touch-Typing Ergonomics, F/J Anchor Discipline & Lab Etiquette.
   - 6 clean 16:9 presentation stages with interactive simulators.
   - Dedicated teacher notes per stage (`promptQuestion`, `talkingPoint`, `watchOutFor`, `formalExamTerm`, `analogyStory`).
   - Student copy notes, homework assignment, and 10-question Kahoot quiz.
   - Create `lessons/components/instructor/Module3MasterBriefingModal.tsx` with printable lesson plan.
   - Register Module 3 in `lessons/data/curriculum.ts` and activate `/learn/module-3`.

## Out of scope

- Future Phase 1 modules (Module 4 Operating Systems, Module 5 File Management deep dive, Module 6 Internet Basics, Module 7 MS Office).
- External database integrations (Supabase/PostgreSQL) — keeping local storage + Next.js in-memory ledger.
- Hardware device driver interactions.

## Build loop

- `workflow.stepReview`: feature (review after completing all steps)
- `workflow.checkpointCommits`: disabled
- Verification commands:
  - Lint: `npm --prefix lessons run lint`
  - Build: `npm --prefix lessons run build`

## Build steps

- [x] 1. **Dynamic Student Login & Roster Refactor**:
  - In `lessons/lib/roster.ts`, delete `PATRON_DIRECTORY`. Retain `AUTHORIZED_PATRONS: string[]` of 30 lab barcodes.
  - Implement dynamic name registration (`registerPatronName`, `getStudentNameByBarcode`) using in-memory cache and `localStorage`.
  - Update `validateSoloLogin` and `validatePartnerLogin` to register student names upon validation.
  - Done when: `getStudentNameByBarcode('20230165')` returns `Patron #20230165` if unregistered, and returns the entered name once registered; `npm --prefix lessons run lint` passes.

- [x] 2. **Attendance Desk & API Dynamic Name Integration**:
  - In `lessons/components/instructor/CohortAttendanceDesk.tsx`, display dynamic student names from active sessions or dynamic registration store, falling back cleanly to `Patron #<barcode>`.
  - In `lessons/app/api/cohorts/[cohortType]/attendance/route.ts`, eliminate references to static student name dictionaries.
  - Done when: Attendance desk shows entered student names for logged-in machines and `Patron #<barcode>` for pending machines; `npm --prefix lessons run lint` passes.

- [x] 3. **20-Level RapidTyping Engine Expansion**:
  - In `lessons/components/today/InteractiveRapidTyping.tsx`, implement the 20-level curriculum across 5 tiers (Home Row, Top Row, Bottom Row & Shift, Numbers & Symbols, African Tech Speedruns).
  - Add Tier navigation tabs, level cards, live WPM counter, accuracy %, error tracking, and completion badges.
  - Done when: All 20 levels can be selected and completed interactively with live WPM and accuracy feedback; `npm --prefix lessons run lint` passes.

- [x] 4. **Complete Pre-Class Instructor Lecture Dossiers**:
  - In `lessons/data/module1.ts` and `lessons/data/module2.ts`, enrich master briefings with comprehensive, textbook-grade lecture dossiers covering deep technical theory, pedagogical delivery scripts, and syllabus exam breakdowns.
  - In `lessons/components/presentation/TeacherGuideDrawer.tsx`, add an expandable "Read Full Lecture Notes" button/view allowing instructors to consult the complete study text.
  - Done when: Authenticated instructors can read the full lecture notes in the in-slide drawer and in `/instructor` pre-class briefings; `npm --prefix lessons run lint` passes.

- [x] 5. **Module 3 Curriculum Data & Presentation Deck**:
  - Create `lessons/data/module3.ts` with 4 full lessons, 6 clean 16:9 widescreen presentation stages, interactive simulators (Booting simulator, window controls playground, folder & file lab, 20-level RapidTyping embed, and ergonomics guide), dedicated teacher notes per stage, student copy notes, homework assignment, and 10-question Kahoot quiz.
  - Create `lessons/components/instructor/Module3MasterBriefingModal.tsx` with a printable lesson plan.
  - Register Module 3 in `lessons/data/curriculum.ts` and verify `/learn/module-3`, `/notes/module-3`, and `/assignments/module-3` render cleanly.
  - Done when: Module 3 presentation slides load and navigate smoothly, simulators function interactively, copy notes and assignments render, and `npm --prefix lessons run build` compiles all static pages.

- [x] 6. **End-to-End Verification**:
  - Run `npm --prefix lessons run lint` (0 errors, 0 warnings).
  - Run `npm --prefix lessons run build` (all routes compile successfully).
  - Verify solo and partner login with custom entered names and check that instructor desk shows dynamic names.
  - Done when: Full lint and build pass without warnings, and dynamic names reflect cleanly across the app.

## Files / areas

- `lessons/lib/roster.ts` — Roster logic, dynamic name store, barcode whitelist.
- `lessons/components/auth/StudentLogin.tsx` — Login form validation and name registration.
- `lessons/components/instructor/CohortAttendanceDesk.tsx` — Attendance cards with dynamic names.
- `lessons/app/api/cohorts/[cohortType]/attendance/route.ts` — Attendance API endpoint.
- `lessons/components/today/InteractiveRapidTyping.tsx` — 20-level typing curriculum engine.
- `lessons/data/module1.ts` & `lessons/data/module2.ts` — Comprehensive lecture notes enrichment.
- `lessons/components/presentation/TeacherGuideDrawer.tsx` — Expandable full lecture notes reader.
- `lessons/data/module3.ts` — Complete Module 3 curriculum data.
- `lessons/components/instructor/Module3MasterBriefingModal.tsx` — Printable Module 3 briefing.
- `lessons/data/curriculum.ts` — Curriculum catalog registration.

## Data / contracts

- **Workstation Barcode:** `barcode: string` (must be in `AUTHORIZED_PATRONS`).
- **Dynamic Student Registration:** `Record<string, { name: string; registeredAt: number }>`.
- **Student Session:** `mode: 'solo' | 'partner'`, `patronNumber: string`, `studentName: string`, `partnerA: StudentPartner`, `partnerB?: StudentPartner`, `loggedInAt: number`, `expiresAt: number` (3h).
- **RapidTyping Level:** `{ id: number; tier: 1 | 2 | 3 | 4 | 5; tierName: string; name: string; description: string; text: string; targetWpm?: number }`.

## Testing

- Logic verification: TypeScript compiler check during `npm --prefix lessons run build`.
- Code quality: `npm --prefix lessons run lint`.
- Interactive walkthrough: Solo & partner login with entered names; 20-level typing test; Module 3 slide navigation and interactive simulators.

## Notes for the AI

- Preserve genuine human attribution (zero AI `Co-Authored-By` trailers).
- Strict African representation for all human imagery (zero photos of white people).
- Keep slides clean 16:9 widescreen format in natural simple English.
- Protect instructor guide and pre-class notes behind `useIsInstructor` authentication.
- Never add static hardcoded student names to any file.

<!-- blueprint:completion {"schemaVersion":2,"specBytes":11742,"specSha256":"f2097254789f487a5705bd29040471cc75b52de3dcc894bf66725c389c9be1f0","branch":"refs/heads/feature/module-3-curriculum-dynamic-workstation-roster-20-level-rapidtyping","head":"9f4cc40895e6c28bc8aff2a9426ed2bb3383c2a4","baseRef":"refs/heads/main","baseCommit":"9f4cc40895e6c28bc8aff2a9426ed2bb3383c2a4","sourceTree":"88618f6a0dd0c72b60da0af1618d3afe16d23f0a","landing":"local-merge","absentOptional":[]} -->

## Verification

- **ESLint:**
  - `npm --prefix lessons run lint`: PASSED (0 errors, 0 warnings).
- **TypeScript Compilation & Next.js Production Build:**
  - `npm --prefix lessons run build`: PASSED (Compiled in 1.6s, TypeScript checked in 3.3s, all 29 static routes generated cleanly).
- **Findings Ledger:**
  - `blueprint/context/findings.md`: 0 open findings.
- **Independent Review:**
  - Not selected under `when-sensitive` policy (Classroom UI, typing engine, and dynamic local roster refactor).

## Try it now

1. Start the Next.js local development server:
   ```powershell
   npm --prefix lessons run dev
   ```
2. Open the Student Portal at [http://localhost:3000](http://localhost:3000):
   - Choose **Solo Learner Mode** or **Equal Lab Partners Mode**.
   - Enter any registered workstation barcode (e.g., `20230165` or `20250645`) and type in your real student name (e.g. `Aminat Bello`).
   - Notice that the workstation barcode is strictly validated, while the student name is entered dynamically with zero hardcoded lookup lists.
3. Open the Instructor Control Desk at [http://localhost:3000/instructor](http://localhost:3000/instructor):
   - Log in with PIN `2025` or `2026`.
   - In the Cohort Attendance Desk, confirm the machine displays your dynamically entered student name (`Aminat Bello`) next to the barcode identifier.
   - Click the top header button **📘 Mod 3 Booting & Typing Brief** to open the complete 4-chapter instructor lecture dossier and preview the 1-click printable lesson plan.
4. Launch the Module 3 Interactive Presentation Slides at [http://localhost:3000/learn/module-3](http://localhost:3000/learn/module-3):
   - Navigate using `→` or `Spacebar` through all 6 stages:
     - *Stage 1 (Booting):* Cold vs. Warm boot interactive simulator with BIOS POST sequence.
     - *Stage 2 (Desktop Controls):* Interactive window controls playground (Minimize, Maximize, Close, Resize).
     - *Stage 3 (Mouse Mastery):* Pointer rules and interactive mouse trainer.
     - *Stage 4 (Folder Lab):* File hierarchy and directory creation lab.
     - *Stage 5 (Touch-Typing):* Home row F/J anchors with embedded 20-level RapidTyping engine.
     - *Stage 6 (Ergonomics):* 20-20-20 eye rule, spine posture, and `Ctrl+S` safety habits.
   - Press **`T`** on any slide to open the live Teacher Guide drawer and expand "📖 Read Full Complete Lecture Notes for this Topic".
5. Test the 20-Level RapidTyping Engine at [http://localhost:3000/today](http://localhost:3000/today) or inside Module 3 Stage 5:
   - Filter by tiers (Home Row, Top Row, Bottom Row, Numbers/CLI, African Tech Speedruns).
   - Complete Level 1 or Level 2 to verify real-time WPM, accuracy %, error tracking, and celebratory completion banners.
