# Project Plan: Dzuel's Computer Class Interactive Curriculum

## 1. Problem - What problem are we solving?

Traditional slide decks (PowerPoint, static PDFs) are passive and ineffective for teaching foundational digital literacy to secondary school students (ages 12–18) who have zero prior computer experience. Teachers need an interactive presentation and learning platform in the browser that replaces abstract slides with dynamic visual models, abundant labeled illustrations, real-world Nigerian analogies, and hands-on exercises to demystify computers and keep students engaged during classroom and laboratory sessions. 

Additionally, because computer labs in Nigerian schools frequently assign **two students to share a single laptop**, the platform natively supports equal lab-partner pairing, private authenticated access with a 29-student whitelist roster, joint and individual assignment submissions, real-time slide mirroring, and gamified Kahoot-style quiz battles. 

To ensure laboratory discipline and learning focus, the platform must proactively alert instructors whenever students navigate away from the lesson screen (tab switching, window minimization, or app changing), provide extended 3-hour session stability for double laboratory periods, offer sticky floating presenter navigation so teachers never scroll to advance slides, and provide high-visibility classroom zoom scaling.

## 2. Users & Access Security - Who is this for?

### A. Students (Secondary School Learners, Ages 12–18)
- **Portal URL:** Main platform route (`/`).
- **Direct-to-Lesson Entry:** Upon login, students land directly into the active lesson stage in `follow-teacher` sync mode.
- **Flexible Access Modes (Shared Laptops & Solo Use):**
  - **Solo Learner Mode:** For self-study or when a partner is absent. Logs in with 1 verified Patron Number and Name.
  - **Equal Lab Partners Mode:** For paired classroom sessions. Two equal cards (*Partner A* and *Partner B*—no primary/secondary hierarchy). Both students enter their verified Patron Numbers and Full Names.
- **Roster Gatekeeper:** Only students matching the registered 29 lab Patron Numbers can log in (`20230165`, `20250523`, `20250464`, `20250509`, `20250571`, `20250520`, `20250562`, `20250527`, `20250643`, `20250409`, `20230338`, `20250461`, `20230204`, `20230374`, `20250609`, `20230169`, `20250652`, `20250650`, `20250549`, `20230187`, `20250545`, `20230344`, `20250647`, `20230063`, `20230122`, `20230330`, `20230313`, `20230272`, `20230123`).
- **Complete Login Sanitization:**
  - The "View Class Patron List" dropdown is completely removed so student IDs remain private.
  - The "Instructor / Admin Access" link is completely removed from the student login page so students cannot access administrative gates.
- **3-Hour Extended Session Validity:** Enforces a 180-minute (3-hour) session timeout, allowing students to comfortably complete long practical sessions, notes transcriptions, and exams without mid-class disconnection.
- **Screen Inattention & Visibility Tracking:**
  - Listens to browser `visibilitychange` and `blur` events.
  - When a student switches tabs or minimizes the window, their session reports `isFocused: false` and the time away to the instructor in real time.
- **Dual Classroom Experience:**
  - *Follow Teacher Mode:* Student laptop screen automatically mirrors the teacher's active slide and Kahoot questions in real time.
  - *Self-Paced Mode:* When unlocked by teacher, students can freely browse "Copy Notes" at their own pace to write into exercise books or complete assignments.

### B. Instructors & Administrators
- **Control Room URL:** Separate, dedicated path (`/instructor`).
- **Role Hierarchy & PIN Credentials:**
  - `adminTolu` (Super Admin): Full system power — manage student rosters, wipe/reset test data, override module locks, configure settings, and export school records.
  - `adminIsaac` (Instructor): Classroom teaching power — advance live slides, launch Kahoot quizzes, reveal answers, toggle module locks, and grade student submissions.
- **Sticky Floating Presenter Dock:** Fixed navigation controls (`[ ◀ Prev Slide ]`, `Stage X of Y`, `[ Next Slide ▶ ]`) anchored at the bottom of the screen, accessible without scrolling up and down.
- **Live Inattention & Screen-Leave Alerts:**
  - Real-time notification banner showing students who have navigated away from the lesson and for how long.
  - Real-time focus badges in the attendance roster: 🟢 *Focused* vs. 🔴 *Left Screen (Away duration)*.

## 3. Pedagogical Principles & Curriculum Quality Standards

### A. Dual-Layer Explanation Standard (Bookish + Simple English)
Every computer science topic, component, and stage must follow this rigorous teaching structure:
1. **Formal "Bookish" Definition:** Clear, academically precise terminology so students excel in external examinations (WAEC, NECO, BECE).
2. **Simple English Explanation:** Plain, conversational breakdown ("In simple English: What does this actually mean?").
3. **Everyday Nigerian Real-Life Analogy:** Familiar connections (Yam cooking, cassava grating, market POS agents, NEPA power cuts/inverters, biological human body mappings).
4. **Golden Memory Formula:** Short, punchy mnemonic (e.g., `RECEIVES → WORKS → SHOWS → STORES`).

### B. Extensive Visuals & Cultural Authenticity Standard
- **STRICT REPRESENTATION RULE:** Zero photos of white people. All human imagery exclusively depicts **Black / African secondary school students in uniforms, African ICT teachers, and African professionals** (doctors, bankers, engineers, mechanized farmers).
- **Abundant Illustrations & Cutaways:** Text must never stand alone. Every concept features multi-image galleries, real labeled hardware photos, and component cutaways.
- **Offline Vector Fallbacks:** High-quality inline SVG schematics ensure every diagram renders cleanly even in school labs with zero internet connectivity.

### C. Classroom Zoom & Projector Scaling Ladder
- **Normal:** 18px baseline (bolder and readable from laptop desks).
- **Large:** 21px baseline.
- **X-Large (Projector Mode):** 24px baseline (crystal clear when beamed across large classrooms).

### D. Gamified Kahoot-Style Quiz Experience
- **Pre-Generated Questions:** Curated ahead of time with zero mid-class generation lag.
- **4 Vibrant Response Shapes:** 🔺 Red Triangle (A), 🔷 Blue Diamond (B), 🟡 Yellow Circle (C), 🟩 Green Square (D).
- **Classroom Battle Flow:** 30s countdown timer, live response distribution tally, instructor-triggered reveal celebrations, and collaborative partner scoring.

### E. Official Cohort Attendance API Integration
- **Direct Integration:** Synchronizes attendance records directly with the Dzuels Foundation Cohort API at `https://dzf-cohorts.vercel.app/api`.
- **Authentication:** Authenticates with secret staff key `dzf_live_85605f3bdd15ab044f0ed52e13f025be11cb60cc3c7187e4` via `X-DZF-API-Key`.
- **Active Cohort:** `cohort-8`.
- **Multi-Mode Attendance Desk:**
  - **Single Check-In (Scanner / Mobile):** Real-time toggle or barcode scan for individual students.
  - **Quick Bulk Check-In:** Batch submission of barcodes (`Mark All Connected Present`, `Mark All Roster`).
  - **Detailed Records Sync:** Full roster sync with explicit `attended: true/false` status per student.
- **Session Attendance Retrieval (GET):** Live query of cohort attendance for any date and curriculum week (`totalStudents`, `presentCount`, `absentCount`, `attendanceRate` %).
- **Roster Alignment:** Expanded authorized patron whitelist to 30 students, including newly enrolled student `20250645`.

## 4. Multi-Page Architecture & Route Map

- `/` — Student entry gate (with direct-to-lesson routing upon login).
- `/learn/[moduleId]` — Fullscreen interactive classroom stage (Module 1, Module 2, etc.).
- `/notes` & `/notes/[moduleId]` — Dedicated student notebook transcription desk (with progress check-offs and print layout).
- `/assignments` & `/assignments/[moduleId]` — Homework & practical submission center (Solo and Joint partner submissions).
- `/instructor` — Instructor Control Room with live slide broadcast dock, official cohort attendance desk, screen-leave attention alerts, module locking, and grading ledger.

## 5. Features & Build Modules (Phases 1, 2 & 3)

### Phase 1: Foundational Digital Literacy & Core Platform
- **Module 1 (Shipped):** Introduction to Computers (Data vs. Information, IPOS Cycle with Cooking & ATM, History & Generations, Computer Classification, Societal Applications, and Kahoot Arena).
- **Module 2 (Shipped):** Parts of a Computer (Hardware Anatomy, Human Body Analogy, Peripheral Sorting, 7-Step PC Disassembly Simulator, Storage Drives & Byte Scale Ladder, and Kahoot Arena).
- **Feature 7 (Shipped):** Inattention detection, 3-hour sessions, sticky instructor dock, enhanced zoom, clean login, multi-page routing, and expanded visual density.
- **Feature 8 (Official Cohort Attendance Desk):** Official Cohort API integration (`dzf-cohorts.vercel.app`), multi-mode attendance marking (single, bulk, detailed sync), live stats (rate, present/absent), and roster expansion for `20250645`.
- **Modules 3–7:** Computer Usage & Booting, Operating Systems & Desktop Explorer, File Management & Organization, Internet Basics & Digital Citizenship, Microsoft Office Productivity Suite.

### Phase 2: Intermediate (Creative Logic & App Development)
- **Modules 8–13:** Computational Thinking, Scratch Visual Programming, Python Scripting, JavaScript Web Logic, and Mobile App Development.

### Phase 3: Advanced (Specialized Technologies & Futures)
- **Modules 14–19:** Web Design (HTML/CSS), Git & GitHub, AI Prompting & Workflows, Robotics & Physical Computing (Arduino), Digital Design, Cybersecurity & Tech Career Pathways.

## 6. Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript 5.
- **Styling:** Tailwind CSS v4.
- **Visuals & Imagery:** Culturally authentic African educational photography, verified component schematics, and responsive offline inline SVGs.
- **Deployment:** Vercel cloud hosting + zero-dependency local execution (`npm run dev` at root).

## 7. Monetization

Non-profit philanthropic education initiative by Dzuels Foundation to bridge the digital divide in Ekiti State, Nigeria. 100% free for educational use.
