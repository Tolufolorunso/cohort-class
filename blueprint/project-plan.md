# Project Plan: Dzuel's Computer Class Interactive Curriculum

## 1. Problem - What problem are we solving?

Traditional slide decks (PowerPoint, static PDFs) are passive and ineffective for teaching foundational digital literacy to secondary school students (ages 12–18) who have zero prior computer experience. Teachers need an interactive presentation and learning platform in the browser that replaces slides with dynamic visual models, real-world analogies, and hands-on exercises to demystify computers and keep students engaged during classroom and laboratory sessions. Additionally, students using individual laptops assigned to them in the computer lab need a secure, dedicated portal to participate in live classroom games, copy lesson notes into their exercise books, and submit homework assignments using their verified Patron Number and Name.

## 2. Users & Access Security - Who is this for?

### A. Students (Secondary School Learners, Ages 12–18)
- **Portal URL:** Main platform route (`/`).
- **Authentication Gate:** Students log in using their assigned **Patron Number** and **Full Name**.
- **Whitelisted Roster Only:** Only students matching the 22 authorized lab Patron Numbers can log in:
  > `20230194`, `20250535`, `20230270`, `20230067`, `20230207`, `20230125`, `20230279`, `20230166`, `20250504`, `20230300`, `20230137`, `20250670`, `20230335`, `20230371`, `20230189`, `20230126`, `20230370`, `20230201`, `20230361`, `20250487`, `20230056`, `20250429`.
- **1-Hour Auto Session Expiry:** For computer lab security and clean class turnover, student sessions automatically expire after 1 hour (60 minutes), prompting re-authentication.
- **Dual Classroom Experience:**
  - *Follow Teacher Mode:* Student laptop screen automatically mirrors the teacher's active slide and Kahoot questions in real time.
  - *Self-Paced Mode:* When unlocked by teacher, students can freely browse "Copy Notes" at their own pace to write into exercise books or complete assignments.

### B. Instructors & Administrators
- **Control Room URL:** Separate, dedicated path (`/instructor`).
- **Role Hierarchy & PIN Credentials:**
  - `adminTolu` (Super Admin): Full system power — manage student rosters, wipe/reset test data, override module locks, configure settings, and export full school records.
  - `adminIsaac` (Instructor): Classroom teaching power — advance live slides, launch Kahoot quizzes, reveal answers, toggle module locks, and grade student submissions.

## 3. Features - What does the platform need?

### A. Platform Shell, Authentication & Live Mirroring
- **Strict Role Separation:** No casual in-header role switcher. Students remain strictly on `/`; teachers log into `/instructor`.
- **Patron Whitelist Gatekeeper:** Validates Patron Number against the 22-student registry with clear feedback and 1-hour session timeout.
- **Real-Time Slide Mirroring:** Next.js `/api/live-session` syncs teacher's slide position, active stage, and quiz questions to all connected student laptops on Vercel without third-party subscriptions.
- **Visual Zoom Scaling (`A-` / `A` / `A+`):** High-contrast projector scaling (100%, 115%, 130%) for legibility on dim school screens.
- **Teacher Classroom Controls:** "Follow Teacher" vs. "Self-Paced" sync toggle, progressive module locking, and live attendance counter (e.g., "19/22 Students Active").

### B. Gamified Kahoot-Style Quiz Experience
- **Pre-Generated Questions:** All objective questions curated and bundled with lessons ahead of time.
- **4 Vibrant Kahoot Response Buttons:**
  - 🔺 **Red Triangle** (Option A)
  - 🔷 **Blue Diamond** (Option B)
  - 🟡 **Yellow Circle** (Option C)
  - 🟩 **Green Square** (Option D)
- **Live Classroom Flow:** 30s countdown timer, real-time vote distribution tally, teacher-triggered answer reveal with celebration animations, full explanations, and a class leaderboard.

### C. Curriculum Structure & Timing (Phases 1, 2 & 3)
- **Pacing Standard:** Each module represents at least 2+ hours of total instruction. Modules are taught across multiple class sessions (1 to 4+ lessons per module, ~40 minutes each). Teachers pause and resume at any lesson beat.
- **Module 1 (Expanded):** Understanding Computers (Data vs. Information, IPOS Cycle, Computer Evolution & Generations, Classification, Societal Applications, and Kahoot Arena).
- **Module 2:** Parts of a Computer (Hardware Anatomy, Human Body Analogy, Peripheral Sorting, System Unit & Dissection Lab, Storage & Safety, and Kahoot Arena).
- **Modules 3–7:** Computer Usage & Booting, Operating Systems, File Management, Internet & Digital Citizenship, Office Productivity Suite.
- **Phases 2 & 3 (Modules 8–19):** Coding (Scratch, Python, JS), Web Design, Git, AI Prompting, Robotics, Cybersecurity & Careers.

## 4. Data - What are we storing?

- **Authorized Student Roster:** 22 verified Patron Numbers and full student names.
- **Active Live Session State (`/api/live-session`):** Active module ID, active lesson/stage index, mirror mode (`follow-teacher` | `self-paced`), active Kahoot question ID, and answer reveal status.
- **Student Submissions & Progress:** `{ id, patronNumber, studentName, moduleId, answers, submittedAt, kahootScore }`.
- **Instructor State:** Module locks, active PIN session (`adminTolu` or `adminIsaac`), and attendance log.
- **Persistence:** Local storage caching for offline resilience + Next.js Vercel API state with JSON/CSV export.

## 5. Tech - What stack are we using?

- **Framework:** Next.js 16 (App Router), React 19, TypeScript 5.
- **Styling:** Tailwind CSS v4.
- **Visuals & Imagery:** Child-friendly inline SVGs, verified educational diagrams, and responsive WebP image cards with offline fallbacks.
- **Deployment:** Vercel cloud hosting + zero-dependency local execution (`npm run dev` at root).

## 6. Monetization

Non-profit philanthropic education initiative by Dzuels Foundation to bridge the digital divide in Ekiti State. 100% free for educational use.

## 7. UI/UX Direction

- Projector-first large typography and high contrast.
- Playful, tactile Kahoot game buttons and visual badges.
- Dedicated distraction-free student note-copying cards with "Mark as Copied" checkboxes.
- Clean instructor command desk with slide preview, student submission list, and timer controls.

## 8. Deployment

- Hosted on Vercel for instantaneous browser access on student laptops and teacher projector.
- 100% local lab offline execution fallback via `npm run dev`.

## 9. Usage model and constraints

- Responsive across projector displays, teacher laptops, and student laptops.
- Submissions, locks, and attendance persist reliably across browser reloads.
