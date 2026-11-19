# Project Plan: Dzuel's Computer Class Interactive Curriculum

## 1. Problem - What problem are we solving?

Traditional slide decks (PowerPoint, static PDFs) are passive and ineffective for teaching foundational digital literacy to secondary school students (ages 12–18) in Ekiti State, Nigeria, who have zero prior computer experience. At the same time, overly dense web pages with multiple competing definition tabs create visual clutter and overwhelm young beginners. Teachers need an interactive presentation and learning platform in the browser that feels like a clean, crisp PowerPoint slide deck: un-crowded, written in natural simple English, featuring abundant labeled illustrations, hands-on interactive simulators, and clear step-by-step guidance.

Additionally, because computer labs in Nigerian schools frequently assign **two students to share a single laptop**, the platform natively supports equal lab-partner pairing, private authenticated access with a 30-student whitelist roster, joint and individual assignment submissions, real-time slide mirroring, independent student slide navigation, and gamified Kahoot-style quiz battles. 

To ensure laboratory discipline and learning focus, the platform proactively alerts instructors whenever students navigate away from the lesson screen (tab switching, window minimization, or app changing), provides extended 3-hour session stability for double laboratory periods, offers sticky floating presenter navigation so teachers never scroll to advance slides, provides high-visibility classroom zoom scaling, and synchronizes official attendance records with the Dzuels Foundation Cohort API.

## 2. Users & Access Security - Who is this for?

### A. Students (Secondary School Learners, Ages 12–18)
- **Portal URL:** Main platform route (`/`).
- **Direct-to-Lesson Entry:** Upon login, students land directly into the active lesson stage with self-paced slide controls and teacher catch-up.
- **Flexible Access Modes (Shared Laptops & Solo Use):**
  - **Solo Learner Mode:** For self-study or when a partner is absent. Logs in with 1 verified Patron Number and Name.
  - **Equal Lab Partners Mode:** For paired classroom sessions. Two equal cards (*Partner A* and *Partner B*—no primary/secondary hierarchy). Both students enter their verified Patron Numbers and Full Names.
- **Roster Gatekeeper:** Only students matching the registered 30 lab Patron Numbers can log in (including `20250645` - Michael Olowookere).
- **Complete Login Sanitization:**
  - The "View Class Patron List" dropdown is completely removed so student IDs remain private.
  - The "Instructor / Admin Access" link is completely removed from the student login page so students cannot access administrative gates.
- **3-Hour Extended Session Validity:** Enforces a 180-minute (3-hour) session timeout, allowing students to comfortably complete long practical sessions, notes transcriptions, and exams without mid-class disconnection.
- **Screen Inattention & Visibility Tracking:**
  - Listens to browser `visibilitychange` and `blur` events.
  - When a student switches tabs or minimizes the window, their session reports `isFocused: false` and the time away to the instructor in real time.
- **Dual Classroom Experience:**
  - *Follow Teacher Mode:* Student laptop screen automatically mirrors the teacher's active slide, while still allowing the student to navigate forward or backward independently.
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

## 3. Pedagogical Principles & Curriculum Presentation Standards

### A. The Clean PowerPoint Presentation Standard (Student View)
Every lesson stage and slide adheres to strict presentation cleanliness:
1. **16:9 Widescreen Slide Format:** Large, readable typography with generous whitespace; never dense text walls.
2. **Natural Simple English:** Core definitions, explanations, and instructions are written directly in plain, friendly English so 12-to-18-year-old beginners understand immediately.
3. **Zero Clutter on Student Screens:** Eliminate multiple confusing tabs (`"In Simple English"`, `"Formal Bookish Definition"`, and `"Nigerian Everyday Analogies"`). All explanations are unified into clear, concise cards (maximum 3–4 bullet points per slide).
4. **Focused Interactive Simulators:** Interactive widgets (e.g., IPOS drag-and-drop, device sorters, 7-step PC disassembly, and typing arena) occupy dedicated, uncluttered stages with clear visual feedback.
5. **Presentation Navigation:** Full keyboard arrow support (`←`/`→`/`Space`), slide jump dropdown, and instant fullscreen projector mode (`F`).

### B. The Dedicated Instructor Teaching System
Teachers receive comprehensive instruction and classroom assistance without crowding the student slides:
1. **In-Slide Live Teacher Guide Drawer (`T` Key or Button):**
   - Available directly on the live presentation slide.
   - Drops down 3 practical cards:
     - ❓ **Ask the Class:** Engaging prompt questions to ignite classroom discussion.
     - 🗣️ **Key Talking Point:** Exact conversational words to explain the concept.
     - ⚠️ **Watch Out For:** Common student pitfalls or mistakes during the practical session.
2. **Instructor Module Master Briefing Desk (`/instructor`):**
   - A dedicated pre-class briefing sheet for every module.
   - Comprehensive lesson overview: 40-minute laboratory pacing breakdown, formal academic definitions (for WAEC/NECO examination syllabus alignment), and detailed Nigerian analogies (yam cooking, market POS, NEPA power cuts) written out as ready-to-tell stories.
   - **`🖨️ Print / Save Lesson Plan`** button for physical classroom reference.

### C. Extensive Visuals & Cultural Authenticity Standard
- **STRICT REPRESENTATION RULE:** Zero photos of white people. All human imagery exclusively depicts **Black / African secondary school students in uniforms, African ICT teachers, and African professionals** (doctors, bankers, engineers, mechanized farmers).
- **Abundant Illustrations & Cutaways:** Text must never stand alone. Every concept features multi-image galleries, real labeled hardware photos, and component cutaways.
- **Offline Vector Fallbacks:** High-quality inline SVG schematics ensure every diagram renders cleanly even in school labs with zero internet connectivity.

### D. Classroom Zoom & Projector Scaling Ladder
- **Normal:** 18px baseline (bolder and readable from laptop desks).
- **Large:** 21px baseline.
- **X-Large (Projector Mode):** 24px baseline (crystal clear when beamed across large classrooms).

### E. Standalone Gamified Quiz Arena & Live Performance Table
- **Dedicated Route (`/arena`):** Decoupled from lesson slides so quizzes can be launched as warm-ups, mid-class battles, or end-of-module exams.
- **Multi-Scope Question Bank:** Curated question packs for Module 1, Module 2, and Neutral General Literacy/Shortcuts, plus a live in-room question builder.
- **Leaderboard Privacy:** Student screens display personal shape buttons, timer, personal score, rank, and streak. The full class leaderboard table and podium remain exclusive to the instructor projector screen.

### F. Official Cohort Attendance API Integration
- Synchronizes attendance directly with the Dzuels Foundation Cohort API at `https://dzf-cohorts.vercel.app/api`.
- Authenticates with staff key via `X-DZF-API-Key` for `cohort-8`.
- Supports Single Check-In (scanner/toggle), Quick Bulk Check-In, and Detailed Roster Sync with offline resilience caching.

## 4. Multi-Page Architecture & Route Map

- `/` — Student entry gate (with direct-to-lesson routing upon login).
- `/learn/[moduleId]` — Fullscreen interactive classroom presentation stages (Module 1, Module 2, etc.) in clean PowerPoint slide format.
- `/today` — Dedicated practical class presentation deck (Rapid-Typing, Folders/Files, and Mouse/Window navigation).
- `/arena` — Dedicated Standalone Gamified Quiz Arena.
- `/notes` & `/notes/[moduleId]` — Dedicated student notebook transcription desk with print layout.
- `/assignments` & `/assignments/[moduleId]` — Homework & practical submission center.
- `/instructor` — Instructor Control Room with live slide broadcast dock, Module Master Briefings with printable lesson plans, Quiz Arena host desk, cohort attendance desk, attention alerts, and grading ledger.

## 5. Features & Build Roadmap

### Phase 1: Foundational Digital Literacy & Core Platform
- **Module 1 (Shipped / Redo Planned in Feature 10):** Introduction to Computers.
- **Module 2 (Shipped / Redo Planned in Feature 11):** Parts of a Computer.
- **Features 7–9 (Shipped):** Platform Architecture & Attention Security, Official Cohort Attendance API, Standalone Quiz Arena.
- **Feature 10 (Next):** Module 1 Complete Overhaul: Clean PowerPoint Slides & Comprehensive Instructor Teaching Guide.
- **Feature 11 (Next):** Module 2 Complete Overhaul: Clean PowerPoint Slides & Hardware Lab Guide.
- **Feature 12 (Next):** Module 3: Computer Usage, Booting & Rapid-Typing (integrating `/today` practical navigation, folders/files, and touch-typing into formal curriculum).
- **Modules 4–7:** Operating Systems, File Management, Internet Basics, Microsoft Office Suite.

### Phase 2: Intermediate (Creative Logic & App Development)
- **Modules 8–13:** Computational Thinking, Scratch Visual Programming, HTML/CSS Web Design, Introduction to AI & Responsible Prompting, JavaScript Web Logic, Mobile App Concepts.

### Phase 3: Advanced (Specialized Technologies & Futures)
- **Modules 14–20:** Python Scripting, Git & GitHub, Advanced AI & Workflows, Robotics/Arduino, Digital Creativity, Cybersecurity & Career Pathways.

## 6. Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript 5.
- **Styling:** Tailwind CSS v4.
- **Visuals & Imagery:** Culturally authentic African educational photography, verified component schematics, and responsive offline inline SVGs.
- **Deployment:** Vercel cloud hosting + zero-dependency local execution (`npm run dev` at root).

## 7. Monetization

Non-profit philanthropic education initiative by Dzuels Foundation to bridge the digital divide in Ekiti State, Nigeria. 100% free for educational use.
