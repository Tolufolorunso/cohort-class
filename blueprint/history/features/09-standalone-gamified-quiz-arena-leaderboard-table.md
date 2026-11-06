# Feature: Standalone Gamified Quiz Arena, Multi-Scope Question Bank & Live Leaderboard Table

**From build-plan:** feature 9
**Build attempt:** 1
**Branch:** feature/standalone-gamified-quiz-arena-leaderboard-table
**Status:** verified

## Goal

Decouple the Kahoot quiz battle from the linear lesson slides into a dedicated standalone page (`/arena`), add multi-scope question packs (Module 1, Module 2, and a new 10-question Neutral Everyday Computer Literacy & Shortcuts set), implement an in-room custom question creator for instructors, and introduce a real-time **Participant Performance Table** and 3-tiered Podium celebration shown exclusively on the instructor/projector screen while preserving student leaderboard privacy.

## In scope

1. **Multi-Scope Question Bank Architecture (`lessons/data/neutralQuestions.ts` & `curriculum.ts`):**
   - Defined `QuizScope: 'module-1' | 'module-2' | 'neutral' | 'custom'`.
   - Pre-bundled a 10-question Neutral Computer Literacy & Shortcuts Bank (`Ctrl+C`, `Ctrl+V`, `Ctrl+S`, `Ctrl+Z`, mouse single vs. double click, right-click context menu, clean shutdown sequence, safe web browsing, and flash drive care).
   - Reused Module 1 Pack (10 questions) and Module 2 Pack (15 questions) as standalone selectable packs.
2. **Real-Time Quiz Session & Participant Scorecards (`/api/live-session`):**
   - Extended `/api/live-session` with `quizState`:
     - `activeQuestion`: `KahootQuestion | null`
     - `activeScope`: `QuizScope`
     - `questionStartTime`: `number`
     - `isRevealed`: `boolean`
     - `participants`: `Record<string, QuizParticipantScore>` (tracks `score`, `streak`, `correctCount`, `totalAnswered`, `lastOptionIndex`, `lastIsCorrect`, `responseTimeMs`, and `rank`).
   - On student vote: calculated Kahoot arcade score (1,000 base + millisecond speed bonus up to 500), updated correctness, streak, and participant stats in real time.
3. **Dedicated Standalone Student Arena (`lessons/app/arena/page.tsx`):**
   - Direct access at `/arena`.
   - Header integration: Added **`🎮 Quiz Arena`** link in `lessons/components/navigation/Header.tsx`.
   - **Student Privacy Standard:** Students see large interactive shape buttons (🔺 Red Triangle, 🔷 Blue Diamond, 🟡 Yellow Circle, 🟩 Green Square), 30s timer countdown, personal points earned, personal rank indicator (e.g. *"You are #3 in class"*), and streak badge. Students **never** see the full class leaderboard on their laptops.
4. **Instructor Host Arena & Live Question Builder:**
   - Host controls in `lessons/components/arena/HostQuizDesk.tsx` integrated into `/instructor`:
     - Quiz Pack Selector: Module 1 Pack, Module 2 Pack, Neutral Everyday Literacy Pack, Custom Pack, Mixed Pack.
     - Question Navigation: Next Question, Previous, Launch/Broadcast, Reset Scores, Reveal Answer.
     - In-room Question Creator (`QuestionCreatorModal.tsx`): form to add custom questions on the fly (prompt, 4 choices, correct answer, explanation, category tag) with persistent browser localStorage.
5. **Projector-Only Live Participant Performance Table & Podium Celebration:**
   - Real-time Performance Table (`ParticipantPerformanceTable.tsx`) displaying:
     - Rank (🥇 1st, 🥈 2nd, 🥉 3rd, 4th...)
     - Student Name & Patron Number (handles Solo and Equal Lab Partners)
     - Total Score (e.g. `9,450 pts`)
     - Correct / Total (e.g. `8 / 10`)
     - Accuracy % progress bar (e.g. `80%`)
     - Current Streak (e.g. `🔥 4 in a row`)
     - Last Response Status (🟢 Correct / 🔴 Wrong / 🔒 Locked in / ⏳ Thinking...)
   - 3-tiered Podium celebration screen at end of game with animated confetti and CSV scorecard export.
6. **Slide Stage Decoupling:**
   - Removed quiz stage from being the final slide of `/learn/[moduleId]`.
   - Concluded lesson slides with a "Module Complete" milestone (`StageModuleComplete.tsx`) and a 1-click button: *"🎮 Enter Quiz Arena →"*.

## Out of scope

- Public global internet leaderboard (participants are strictly from the local classroom/cohort session).
- Displaying full class leaderboard on student laptop screens (explicit non-requirement to protect learner confidence).

## Build steps

- [x] 1. **Step 1: Curriculum Types & Neutral Question Bank**
  - Added `QuizScope`, `QuizParticipantScore`, and `LiveQuizSession` interfaces in `lessons/types/curriculum.ts` and `lessons/types/platform.ts`.
  - Created `lessons/data/neutralQuestions.ts` with 10 curated questions on everyday Nigerian digital literacy & shortcuts.
- [x] 2. **Step 2: Real-Time Quiz Session State & Server Scoring (`/api/live-session`)**
  - Updated `lessons/app/api/live-session/route.ts` to manage active quiz state, active question, answer reveals, question transitions, and participant scorecard ledger.
  - Processed student votes with speed-adjusted scoring (1,000 base + speed bonus) and updated participant scores/streaks in real time.
- [x] 3. **Step 3: Dedicated Student Arena Route & Navigation Header Link**
  - Created `lessons/app/arena/page.tsx` for students with shape voting buttons (🔺 🔷 🟡 🟩), timer countdown, personal score, personal rank, and streak counter (no full class table).
  - Added `🎮 Quiz Arena` navigation item to `lessons/components/navigation/Header.tsx`.
- [x] 4. **Step 4: Instructor Quiz Host Controls & Custom Question Creator**
  - Created `lessons/components/arena/HostQuizDesk.tsx` and integrated into `/instructor`.
  - Provided pack switcher (Module 1, Module 2, Neutral Everyday Tech, Custom, Mixed).
  - Provided in-room question creator modal (`QuestionCreatorModal.tsx`).
- [x] 5. **Step 5: Live Participant Performance Table & Podium Celebration**
  - Built `ParticipantPerformanceTable.tsx` for the host/projector screen with sorting by score, rank badges, accuracy, streak, and live status.
  - Built final Podium celebration with top 3 winners, confetti, and CSV scorecard export.
- [x] 6. **Step 6: Slide Stage Decoupling & Verification**
  - Updated `lessons/data/module1.ts` and `lessons/data/module2.ts` to conclude stages with a "Module Complete" milestone (`StageModuleComplete.tsx`) and an "Enter Quiz Arena" button instead of the embedded quiz.
  - Ran `npm --prefix lessons run lint` and `npm --prefix lessons run build`.

## Verification

- **Automated Logic & Scoring Tests:**
  - `node lessons/scripts/test-quiz-scoring.mjs`: PASSED (10 neutral questions verified, Kahoot scoring speed bonus formulas verified).
- **TypeScript Compilation:**
  - `cd lessons; npx tsc --noEmit`: 0 errors.
- **ESLint:**
  - `npm --prefix lessons run lint`: 0 errors, 0 warnings.
- **Production Build:**
  - `npm --prefix lessons run build`: Compiled successfully in 12.8s; all 28 static routes and dynamic API routes generated cleanly.

## Try it now

1. Start the dev server with `npm --prefix lessons run dev`.
2. Visit `http://localhost:3000/arena` on a student laptop:
   - Log in with patron number `PAT-004` (or pair up as Lab Partners).
   - Notice the personal performance bar: score, streak, and private rank pill (*"Your Rank: Ready"*).
   - Confirm the full class leaderboard table is **NOT** visible on this student screen.
3. Open `http://localhost:3000/instructor` in another tab (or on the classroom projector):
   - Scroll to **Gamified Quiz Arena & Projector Desk**.
   - Select a pack: **⚡ Neutral**, **🖥️ Module 1**, **💻 Module 2**, or **✏️ Custom**.
   - Click **▶️ Launch Quiz Arena** (or **⚡ Broadcast Question**).
4. Back on the student screen (`/arena`):
   - Notice the live question and 4 colored shape buttons (🔺 Red, 🔷 Blue, 🟡 Yellow, 🟩 Green) appear with a 30s timer.
   - Click a shape (or tap keys `1`, `2`, `3`, or `4` on your keyboard) to lock in your answer.
5. On the instructor screen:
   - Observe live vote tallies incrementing in real time.
   - Click **Reveal Answer 👁️** to reveal the answer and simple-English explanation.
   - Review the **Live Participant Performance Table** to see the student's score, accuracy %, streak, and rank.
   - Click **🎉 View Podium** to celebrate the top 3 class champions with gold, silver, and bronze pedestals!
   - Click **📥 Export CSV** to download the cohort scorecard.
6. Visit `http://localhost:3000/learn/module-1`:
   - Navigate to the final slide and verify it displays the **Module 1 Complete!** milestone with the **"🎮 Enter Live Quiz Arena →"** button.

