# Feature: Platform Architecture Perfection & Classroom Attention Security

**From build-plan:** feature 7
**Build attempt:** 1
**Branch:** feature/platform-architecture-perfection-classroom-attention-security
**Status:** verified

## Goal

Perfect the core classroom platform before proceeding to Module 3, addressing critical instructional needs identified during laboratory observation:
1. Detect student inattention and screen-leave events in real-time, notifying the instructor immediately with live away duration counters.
2. Extend student session validity from 60 minutes to 180 minutes (3 hours) to support double laboratory periods, note-taking, and hands-on exercises.
3. Completely remove the "Instructor / Admin Access" link from the student login page to secure instructor credentials and eliminate teacher PIN guessing.
4. Provide a sticky, persistent slide navigation dock at the bottom of the instructor screen, allowing the teacher to change slides from anywhere on the page without scrolling back up.
5. Upgrade the classroom typography zoom ladder to Normal (18px), Large (21px), and X-Large (24px) for clear legibility on laptops and projection screens.
6. Restructure the platform into a true multi-page App Router architecture (`/`, `/learn/[moduleId]`, `/notes/[moduleId]`, `/assignments/[moduleId]`, `/instructor`), directing students straight into the live interactive lesson stage upon logging in.
7. Elevate visual density with microarchitecture component cutaways (CPU die, RAM pin alignment, HDD spinning platter) and offline SVG vector fallbacks.

## In scope

1. **Classroom Attention & Visibility Security:**
   - Client-side hook (`lessons/hooks/useClassroomAttention.ts`) listening to `visibilitychange`, `blur`, and `focus`.
   - Transmit `isFocused` and `leftScreenAt` via the `/api/live-session` heartbeat.
   - Real-time top alert banner on `/instructor` displaying students who left the screen with away duration timers.
   - Live attendance grid with pulsing red badges (`🔴 Left Screen (Xs)`).
2. **Session Duration Extension:**
   - `SESSION_DURATION_MS = 3 * 60 * 60 * 1000` (180 minutes) in `lessons/lib/roster.ts`.
   - Updated login notices and header session countdown tooltips.
3. **Student Login Sanitization:**
   - Removal of the instructor link from `lessons/components/auth/StudentLogin.tsx`.
4. **Sticky Floating Slide Controller Dock:**
   - Floating persistent dock on `/instructor` (`[← Prev Slide]`, `Stage X of Y: Title`, `[Next Slide →]`) accessible regardless of scroll position.
   - Global keyboard navigation (`ArrowLeft` / `ArrowRight`, `PageUp` / `PageDown`) for presenter clickers.
5. **Classroom Zoom Scale Upgrade:**
   - 18px (Normal), 21px (Large), 24px (X-Large Projector).
6. **Multi-Page Architecture & Prerendering:**
   - Dedicated App Router routes with `generateStaticParams`:
     - `/` — Student login gate / direct landing
     - `/learn/[moduleId]` — Interactive fullscreen lesson stage
     - `/notes/[moduleId]` & `/notes` — Student notebook transcription desk
     - `/assignments/[moduleId]` & `/assignments` — Homework submission desk
     - `/instructor` — Instructor control room
   - Header navigation linking seamlessly across routes.
7. **Expanded Visual Density & Cutaways:**
   - Microarchitecture cutaways for `cpu-cutaway`, `ram-cutaway`, and `storage-platter` in `EducationalImage.tsx`.
   - Integrated into `StageHardwareAnatomy.tsx` and `StageStorageBytes.tsx`.

## Out of scope

- Camera/facial eye-tracking (inattention detection uses privacy-respecting browser visibility and focus events only).
- Module 3 curriculum content (scheduled as Feature 8).

## Build steps

- [x] 1. **Session Duration & Login Security Sanitization**
  - Updated `lessons/lib/roster.ts` with `SESSION_DURATION_MS = 3 * 60 * 60 * 1000`.
  - Removed "Instructor / Admin Access" link from `StudentLogin.tsx`.
- [x] 2. **Real-Time Inattention Contract & Heartbeat API**
  - Updated `lessons/types/platform.ts` with attention fields (`isFocused`, `leftScreenAt`).
  - Updated `/api/live-session` to record focus state and return `attentionAlerts`.
- [x] 3. **Attention Detection Hook & Student Stage Integration**
  - Implemented `useClassroomAttention` to hook `visibilitychange`, `blur`, and `focus`.
  - Connected hook to student polling heartbeat in stage, notes, and assignments views.
- [x] 4. **Instructor Sticky Slide Controller Dock & Live Attention Alerts**
  - Built floating bottom slide dock component on `/instructor`.
  - Added real-time attention alert banner and pulsing attendance card badges.
  - Added global keyboard arrow slide navigation for presenter clickers.
- [x] 5. **Classroom Zoom Ladder Expansion (18px / 21px / 24px)**
  - Updated zoom scale logic across all views.
- [x] 6. **Multi-Page Architecture & Direct-to-Active-Lesson Flow**
  - Created App Router routes (`/learn/[moduleId]`, `/notes/[moduleId]`, `/assignments/[moduleId]`) with `generateStaticParams`.
  - Updated `Header.tsx` to handle page routing seamlessly.
- [x] 7. **Expanded Visual Density & Offline Schematics**
  - Added `cpu-cutaway`, `ram-cutaway`, and `storage-platter` to `EducationalImage.tsx`.
  - Embedded microarchitecture cutaway cards into lesson stages.
- [x] 8. **Verification & Quality Gate**
  - `npm --prefix lessons run lint` (0 errors).
  - `npm --prefix lessons run build` (26/26 pages statically generated).

## Verification Results

- `npm --prefix lessons run lint`: passed cleanly with exit code 0.
- `npm --prefix lessons run build`: compiled 26 static/partial prerendered routes in 2.4s.
- Routes generated:
  - `○ /`
  - `○ /_not-found`
  - `ƒ /api/live-session`
  - `○ /assignments`
  - `○ /assignments/module-1`
  - `○ /assignments/module-2`
  - `○ /instructor`
  - `○ /learn/module-1`
  - `○ /learn/module-2`
  - `○ /notes`
  - `○ /notes/module-1`
  - `○ /notes/module-2`

## Try It Now

1. Start development server: `npm --prefix lessons run dev`.
2. Open `http://localhost:3000` (Student) and `http://localhost:3000/instructor` (PIN: `adminTolu`).
3. Switch away from student tab; verify top alert banner and red pulsing badge appear on `/instructor`.
4. On `/instructor`, scroll down past the preview to the homework ledger; verify sticky slide dock remains at bottom and advances slides with Next button or Arrow keys.
5. In student header, navigate between Lesson Stage, Copy Notes, and Homework; verify dedicated routes `/learn/module-1`, `/notes/module-1`, and `/assignments/module-1`.

