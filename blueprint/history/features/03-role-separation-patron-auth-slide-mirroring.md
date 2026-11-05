# Feature: Role Separation, Patron Authentication & Real-Time Slide Mirroring

**From build-plan:** feature 3
**Build attempt:** 1
**Branch:** feature/role-separation-patron-auth-slide-mirroring
**Status:** verified

## Goal

Completely separate the Student Portal (`/`) from the Instructor Control Room (`/instructor`), implement strict Patron Number authentication with the 22-student secondary school roster and a 1-hour session timeout, configure dual-PIN instructor access (`adminTolu` super-admin and `adminIsaac` instructor), and establish real-time slide mirroring (`/api/live-session`) so the instructor controls the classroom pace while students follow live on their laptops.

## Design reference

- Student Portal (`/`):
  - Clean, distraction-free student experience with **no** teacher role switchers or administrative controls.
  - Friendly login modal/screen requiring verified **Patron Number** and **Full Name**.
  - Student status bar in header: Student Name, Patron Number badge, 60-minute session countdown indicator, and zoom scaling controls.
  - Dual Sync Behavior:
    - *Follow Teacher:* Student laptop automatically displays whichever slide/stage the teacher is presenting.
    - *Self-Paced:* When unlocked by teacher, student can freely navigate "Copy Notes" to transcribe into exercise books or complete homework.
- Instructor Control Room (`/instructor`):
  - Dedicated administrative dashboard route protected by instructor PINs (`adminTolu` or `adminIsaac`).
  - Presenter Command Bar: Next / Previous slide, jump to stage, and presenter notes.
  - "Follow Teacher" vs. "Self-Paced" sync toggle switch.
  - Live Student Attendance Roster: Grid showing all 22 Patron Numbers with real-time active indicators.
  - Module lock toggles and student homework submission inspector.

## In scope

- **1. Student Roster & 1-Hour Session Management (`lessons/lib/roster.ts`):**
  - Encode the 22 authorized Patron Numbers: `20230194`, `20250535`, `20230270`, `20230067`, `20230207`, `20230125`, `20230279`, `20230166`, `20250504`, `20230300`, `20230137`, `20250670`, `20230335`, `20230371`, `20230189`, `20230126`, `20230370`, `20230201`, `20230361`, `20250487`, `20230056`, `20250429`.
  - Validate student login input and reject unauthorized patrons with clear feedback.
  - Enforce a 60-minute (1-hour) session expiry with automatic logout/prompt on expiration.
- **2. Teacher Credentials & Dual Roles (`lessons/lib/auth.ts`):**
  - Authenticate `adminTolu` (Super Admin - full system control) and `adminIsaac` (Instructor - classroom teaching control).
  - Secure the `/instructor` route with persistent session handling and role badges.
- **3. Real-Time Classroom Live Session API (`lessons/app/api/live-session/route.ts`):**
  - Next.js server route managing live classroom state: `activeModuleId`, `activeStageIndex`, `syncMode` (`follow-teacher` | `self-paced`), `activeKahootQuestionId`, `isKahootRevealed`, and active student heartbeats.
  - Provides lightweight polling (every 1.5s) compatible with Vercel serverless deployment and zero external cloud costs.
- **4. Student Portal Login Screen & Follow-Teacher View (`lessons/components/auth/StudentLogin.tsx`, `lessons/app/page.tsx`):**
  - High-contrast, friendly login card asking for Patron Number and Name.
  - Dedicated student header showing verified Patron badge, 1-hour session timer, and zoom controls.
  - Removes the teacher role switcher from the student header.
  - Listens to live session state: when `syncMode === 'follow-teacher'`, locks stage view to instructor's current slide.
- **5. Instructor Control Room (`lessons/app/instructor/page.tsx`):**
  - PIN gate prompt for `adminTolu` or `adminIsaac`.
  - Live slide controller (Next/Prev, stage selector) broadcasting position changes to `/api/live-session`.
  - Mode toggle: "Follow Teacher (Screens Locked)" vs. "Self-Paced (Student Browsing)".
  - Real-time 22-student attendance board showing connected patron laptops.
  - Module locking manager and student submissions review table with JSON export.
- **6. Verification & Quality Gates:**
  - Verify clean lint (`npm run lint`) and production build (`npm run build`).
  - Test student login with valid vs. invalid Patron Numbers.
  - Test 1-hour session expiration timer.
  - Test instructor login with `adminTolu` and `adminIsaac`.
  - Test live slide mirroring between instructor and student tabs.

## Out of scope

- Module 2 and Module 3 full lesson datasets (scheduled for Features 4 and 5).
- Paid external WebSocket/database services (in-memory Next.js route meets the free Vercel + offline requirement).

## Build loop

- `workflow.stepReview: "feature"`
- `workflow.checkpointCommits: "disabled"`
- Implementation executes on `feature/role-separation-patron-auth-slide-mirroring`, verifies lint and build, and presents one final review packet before `/check`.

## Build steps

- [x] 1. **Roster Definition & Session Security:** Create `lessons/lib/roster.ts` with the 22 whitelisted Patron Numbers, login validation, and 1-hour session expiry helpers.
  - *Done when:* Helper functions validate authorized patrons, reject invalid ones, and correctly report session expiry after 60 minutes.
- [x] 2. **Instructor Dual-PIN Authentication:** Create `lessons/lib/auth.ts` handling `adminTolu` (Super Admin) and `adminIsaac` (Instructor) PIN validation and session persistence.
  - *Done when:* `adminTolu` and `adminIsaac` validate accurately with appropriate role capabilities.
- [x] 3. **Real-Time Live Session API:** Create `lessons/app/api/live-session/route.ts` with `GET` and `POST` handlers tracking active module, stage index, sync mode, and student heartbeats.
  - *Done when:* The API endpoint responds with current session state on `GET` and updates state on `POST`.
- [x] 4. **Student Login Screen & Portal Integration:** Build `lessons/components/auth/StudentLogin.tsx` and update `lessons/app/page.tsx` to require login, display the 60-minute countdown, remove teacher switchers, and synchronize to instructor slides in Follow-Teacher mode.
  - *Done when:* Unauthenticated students see the login screen, valid patrons log in and see their countdown badge, and slides mirror the instructor's live stage.
- [x] 5. **Instructor Control Room Dashboard:** Build `lessons/app/instructor/page.tsx` featuring PIN login, slide broadcasting controls, Follow-Teacher / Self-Paced toggle, 22-student live attendance grid, and module locking.
  - *Done when:* Teachers can log into `/instructor`, advance slides, toggle sync mode, and observe connected students.
- [x] 6. **Verification & Edge Testing:** Run `npm run lint` and `npm run build` from root; verify student login with valid/invalid patrons, session timeout handling, and cross-tab slide mirroring.
  - *Done when:* Lint and build pass with zero errors and slide sync works end-to-end between `/instructor` and `/`.

## Files / areas

- `lessons/types/platform.ts` (modified) — Types for student roster, sessions, instructor roles, and live session state.
- `lessons/lib/roster.ts` (new) — 22-patron whitelist, login validation, and 1-hour session timeout.
- `lessons/lib/auth.ts` (new) — Dual-PIN instructor authentication (`adminTolu` & `adminIsaac`).
- `lessons/app/api/live-session/route.ts` (new) — Server route for real-time classroom slide mirroring and student presence.
- `lessons/components/auth/StudentLogin.tsx` (new) — Friendly Patron Number login component.
- `lessons/components/navigation/Header.tsx` (modified) — Student-only header with Patron badge and session timer; removes teacher switcher.
- `lessons/app/page.tsx` (modified) — Student portal root with login gate and real-time slide sync.
- `lessons/app/instructor/page.tsx` (new) — Instructor command room with live slide controller and attendance grid.

## Data / contracts

- `AuthorizedPatrons`: 22 Patron IDs (`20230194`, `20250535`, etc.).
- `StudentSession`: `{ patronNumber: string; studentName: string; loggedInAt: number; expiresAt: number; }` (expiresAt = loggedInAt + 3600000).
- `TeacherRole`: `'adminTolu' | 'adminIsaac'`.
- `LiveSessionState`: `{ activeModuleId: string; activeLessonIndex: number; activeStageIndex: number; syncMode: 'follow-teacher' | 'self-paced'; activeKahootQuestionId: number | null; isKahootRevealed: boolean; activeStudents: Record<string, number>; updatedAt: number; }`.

## Testing

- Verification gate:
  - `npm run lint` from root.
  - `npm run build` from root.
  - Test student login with valid patron `20230194` (succeeds) and invalid `99999999` (rejected).
  - Test session expiry countdown and logout.
  - Test instructor login with `adminTolu` and `adminIsaac`.
  - Test slide advance on `/instructor` reflecting immediately on `/`.

## Notes for the AI

- Keep student portal completely separate from instructor route: never show admin buttons on `/`.
- Ensure student session expiry is 100% resilient across page reloads.
- Use clean, accessible design with high-contrast text for both projector and laptop displays.
- Zero paid dependencies: `/api/live-session` with short polling handles live classroom sync cleanly on free Vercel.


<!-- blueprint:completion {"schemaVersion":2,"specBytes":9151,"specSha256":"45040c758e024678f3720870d6418beaa0e9fc120507d9086ee153569dc65b2e","branch":"refs/heads/feature/role-separation-patron-auth-slide-mirroring","head":"f74850cc85986b136dbf16c48617ceb1ff662f1b","baseRef":"refs/heads/main","baseCommit":"f74850cc85986b136dbf16c48617ceb1ff662f1b","sourceTree":"699667797c8cd17ebf932760b64541268f00f986","landing":"local-merge","absentOptional":[]} -->

## Try it now

1. Start the presentation and laboratory server from root:
   ```bash
   npm run dev
   ```
2. Open http://localhost:3000 in your browser:
   - Enter invalid Patron Number (e.g. 99999999) -> observe validation error.
   - Enter a registered Patron Number (e.g. 20230194) and Full Name -> logs in and shows the 60-minute session countdown.
   - Observe header: clean student-only navigation with no admin or role toggles.
3. In a separate tab/window, open http://localhost:3000/instructor:
   - Enter PIN `adminIsaac` (or `adminTolu` for Super Admin).
   - In the Class Attendance Roster, observe student 20230194 show as Online.
   - Click "Next Slide" -> watch student screen automatically advance in Follow-Teacher mode.
