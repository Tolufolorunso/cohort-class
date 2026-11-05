# Feature: Classroom Platform Enhancements

**From build-plan:** feature 2
**Build attempt:** 1
**Branch:** feature/classroom-platform-enhancements
**Status:** verified

## Goal

Upgrade the web curriculum platform with essential classroom teaching, student note-taking, and projector usability capabilities: in-header visual zoom scaling (`A-`/`A+`) for dim or distant projectors, Teacher vs. Student dual-role mode, instructor-controlled answer reveals, progressive module locking, a dedicated student "Copy Notes" view for exercise book transcription, interactive assignment submission requiring **Patron Number** and **Full Name**, an Instructor Review Dashboard, and root startup scripts (`npm run dev` from the repository root).

## Design reference

- Projector & Student Usability Standards:
  - Zoom Scaling: Instant toggle (`Normal`, `Large`, `Extra Large`) scaling interface text and cards so the teacher can ensure visibility on any projector.
  - Role Indicator: Distinct header pill indicating active mode (`👨‍🏫 Instructor Mode` vs. `🎓 Student Mode`).
  - View Tabs: Switch smoothly between **Interactive Lesson Stage**, **Student Copy Notes**, and **Homework Assignment**.
  - Student Notes Card: Clean, high-readability layout with clear section dividers, copy markers, and summary boxes specifically styled for students copying into physical notebooks.
  - Student Submission Form: Prominent inputs for **Patron Number** (e.g. `DZ-2026-001`) and **Full Name** before submitting homework.
  - Instructor Panel: PIN-protected modal or dashboard allowing teachers to lock/unlock modules and review student submissions.

## In scope

- **1. Root Startup Scripts (`package.json` at root):**
  - Enable running `npm run dev`, `npm run build`, `npm run start`, and `npm run lint` directly from `c:\Users\oreofe\Desktop\dzuels\computer class\curriculum` without changing directories into `lessons/`.
- **2. Platform Types & Storage Architecture (`lessons/types/platform.ts`, `lessons/lib/platformStorage.ts`):**
  - Define types for `UserRole` (`'teacher' | 'student'`), `ZoomLevel` (`'normal' | 'large' | 'xlarge'`), `StudentSubmission`, `ModuleLockState`, and `StudentNoteSection`.
  - Provide local storage helpers for persisting role selection, zoom level, module lock states, and assignment submissions with offline lab resilience.
- **3. Student Notes & Homework Dataset (`lessons/data/module1.ts`):**
  - Add structured "Copy Notes" content for Module 1 formatted for secondary school students (Key Definitions, IPOS Summary, History Milestones table, Device Types, Lab Rules).
  - Add structured Homework Assignment questions for Module 1.
- **4. Enhanced Header & Navigation (`lessons/components/navigation/Header.tsx`):**
  - Redesigned top navigation with Dzuels Foundation branding, module switcher with lock status badges, view switcher (Stage View vs. Notes vs. Assignment vs. Teacher Dashboard), visual zoom buttons (`A-`/`A+`), role switcher, and fullscreen button.
- **5. Student Copy Notes View (`lessons/components/notes/StudentNotesView.tsx`):**
  - Distraction-free, projector-friendly and student-laptop-friendly view containing formatted lesson notes for students to copy into their physical exercise books.
- **6. Assignment Submission Form (`lessons/components/assignments/AssignmentView.tsx`):**
  - Interactive homework interface where students answer questions, enter their **Patron Number** and **Student Full Name**, and submit their work with instant confirmation.
- **7. Teacher Mode Controls & Instructor Dashboard (`lessons/components/teacher/InstructorDashboard.tsx`):**
  - Instructor-only answer reveal toggle in `StageQuiz.tsx` (in student mode, answers remain unrevealed until submission).
  - Module lock/unlock manager allowing teachers to unlock Module 2, Module 3, etc. as the class progresses.
  - Submissions review table showing student submissions sorted by Patron Number, Name, submission time, and answers.
- **8. Integration & Polish (`lessons/app/page.tsx` & layout):**
  - Wire zoom level classes to the root container.
  - Ensure seamless switching between Stage View, Notes View, and Assignment View.
  - Verify lint and build from root (`npm run lint`, `npm run build`).

## Out of scope

- Module 2 interactive stage contents (scheduled for Feature 3).
- Remote cloud database setup (local client storage meets the 100% offline requirement).
- External authentication services or passwords (lightweight PIN check for teacher mode is sufficient).

## Build loop

- `workflow.stepReview: "feature"`
- `workflow.checkpointCommits: "disabled"`
- Implementation executes on `feature/classroom-platform-enhancements`, verifies lint and build, and presents one final feature review packet before `/check`.

## Build steps

- [x] 1. **Root Startup Scripts:** Create root `package.json` delegating scripts (`dev`, `build`, `start`, `lint`) to `lessons/`.
  - *Done when:* `npm run lint` and `npm run dev` can be invoked directly from the project root.
- [x] 2. **Platform Types & Storage Helpers:** Create `lessons/types/platform.ts` and `lessons/lib/platformStorage.ts` for managing roles, zoom levels, module lock states, and student assignment submissions in offline storage.
  - *Done when:* Helper functions for saving/retrieving submissions, zoom levels, and lock states compile cleanly.
- [x] 3. **Module 1 Notes & Homework Datasets:** Add structured student copy-notes content and homework assignment questions to `lessons/data/module1.ts`.
  - *Done when:* `module1Notes` and `module1Assignment` are exported and typed with clear copy points and questions.
- [x] 4. **Enhanced Header with Zoom & Role Switcher:** Build `lessons/components/navigation/Header.tsx` featuring visual zoom controls (`A-`/`A+`), module switcher with lock badges, view navigation, role toggle, and fullscreen button.
  - *Done when:* The header renders with zoom scaling, module switching, and role toggling functioning smoothly.
- [x] 5. **Student Copy Notes & Assignment Submission Views:** Build `StudentNotesView.tsx` and `AssignmentView.tsx` with Patron Number and Full Name inputs.
  - *Done when:* Students can read and copy formatted notes, and fill out and submit homework with their Patron Number and Name, receiving a success badge.
- [x] 6. **Teacher Controls & Instructor Dashboard:** Build `InstructorDashboard.tsx` and integrate instructor-only answer reveals into `StageQuiz.tsx`.
  - *Done when:* Teachers can toggle module locks, inspect student submissions by Patron Number & Name, and control when quiz answers are revealed to the class.
- [x] 7. **Integration & Verification:** Wire all platform views and zoom state into `lessons/app/page.tsx`, test responsive views on projector and laptop sizes, and verify clean build and lint from root (`npm run lint && npm run build`).
  - *Done when:* `npm run lint` and `npm run build` pass with zero errors from project root, and all views function end-to-end.

## Files / areas

- `package.json` (new at root) — Scripts delegating to `lessons/`.
- `lessons/types/platform.ts` (new) — Types for roles, zoom, submissions, notes, and lock states.
- `lessons/lib/platformStorage.ts` (new) — Storage manager for submissions and settings.
- `lessons/data/module1.ts` (modified) — Student notes and homework assignment data.
- `lessons/components/navigation/Header.tsx` (new) — Enhanced navigation bar.
- `lessons/components/notes/StudentNotesView.tsx` (new) — Formatted student notebook view.
- `lessons/components/assignments/AssignmentView.tsx` (new) — Interactive homework submission form.
- `lessons/components/teacher/InstructorDashboard.tsx` (new) — Teacher review and module lock modal.
- `lessons/components/stages/StageQuiz.tsx` (modified) — Instructor answer reveal integration.
- `lessons/components/presentation/StageShell.tsx` (modified) — Connects enhanced header and zoom scaling.
- `lessons/app/page.tsx` (modified) — Master view switcher (Stage View vs Notes vs Assignment).

## Data / contracts

- `StudentSubmission`: `{ id: string; patronNumber: string; studentName: string; moduleId: string; answers: Record<string, string>; submittedAt: string; }`
- `ZoomLevel`: `'normal' | 'large' | 'xlarge'`
- `UserRole`: `'teacher' | 'student'`
- `ModuleLockState`: `{ unlockedModules: string[] }` (defaults to `['module-1']`)

## Testing

- Verification gate:
  - Run `npm run lint` from root.
  - Run `npm run build` from root.
  - Test visual zoom scaling across `normal`, `large`, and `xlarge`.
  - Test role switching between Teacher and Student.
  - Test student assignment submission with Patron Number and Name, and verify appearance in Instructor Dashboard.
  - Test instructor answer-reveal control in quiz.

## Notes for the AI

- Preserve 100% offline isolation: no external network calls or cloud dependencies.
- Ensure Patron Number is clearly labeled and validated before submission.
- Ensure the student notes layout has distinct, easily readable sections with clear bullet points suitable for manual copying into physical notebooks.
- Keep teacher PIN simple and friendly for classroom use (e.g., default PIN `1234` or custom set).


<!-- blueprint:completion {"schemaVersion":2,"specBytes":9192,"specSha256":"d0fb106cd03194e87dc14befa8e1add592a2c48f6eb73cecd43750bf96b8191a","branch":"refs/heads/feature/classroom-platform-enhancements","head":"944ee33d56449f38677a0683bc4ef5a116e5780d","baseRef":"refs/heads/master","baseCommit":"944ee33d56449f38677a0683bc4ef5a116e5780d","sourceTree":"2496ee610f4bee88ab28a18718750b545932e5e2","landing":"local-merge","absentOptional":[]} -->

## Try it now

1. Start the development server directly from the repository root:
   ```bash
   npm run dev
   ```
2. Open http://localhost:3000 in your browser.
3. Test the platform capabilities:
   - Visual Zoom Scaling: Click A-, A, or A+ in the top right to scale font and layout sizes for your classroom projector.
   - Copy Notes View: Click the "Copy Notes" tab to read notebook-optimized notes and click "Mark as Copied" per section.
   - Homework Submission: Click "Homework", enter your Patron Number (e.g. DZ-2026-001) and Full Name, answer questions, and submit to view the confirmation receipt.
   - Instructor Controls: Click "Teacher Panel" (enter PIN 1234) to manage progressive module locks and review/export student submissions.
   - Quiz Answer Reveal: In Stage 6 (Quiz), see how answers remain locked in Student Mode and can be revealed to the class in Teacher Mode.
