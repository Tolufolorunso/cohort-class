# Project Plan: Dzuel's Computer Class Interactive Curriculum

## 1. Problem - What problem are we solving?

Traditional slide decks (PowerPoint, static PDFs) are passive and ineffective for teaching foundational digital literacy to secondary school students (ages 12–18) who have zero prior computer experience. Teachers need an interactive presentation and learning platform in the browser that replaces abstract slides with dynamic visual models, abundant labeled illustrations, real-world Nigerian analogies, and hands-on exercises to demystify computers and keep students engaged during classroom and laboratory sessions. 

Additionally, because computer labs in Nigerian schools frequently assign **two students to share a single laptop**, the platform must natively support equal lab-partner pairing, private authenticated access with a 29-student whitelist roster, joint and individual assignment submissions, real-time slide mirroring, and gamified Kahoot-style quiz battles.

## 2. Users & Access Security - Who is this for?

### A. Students (Secondary School Learners, Ages 12–18)
- **Portal URL:** Main platform route (`/`).
- **Flexible Access Modes (Shared Laptops & Solo Use):**
  - **Solo Learner Mode:** For self-study or when a partner is absent. Logs in with 1 verified Patron Number and Name.
  - **Equal Lab Partners Mode:** For paired classroom sessions. Two equal cards (*Partner A* and *Partner B*—no primary/secondary hierarchy). Both students enter their verified Patron Numbers and Full Names.
- **Roster Gatekeeper:** Only students matching the registered 29 lab Patron Numbers can log in (`20230165`, `20250523`, `20250464`, `20250509`, `20250571`, `20250520`, `20250562`, `20250527`, `20250643`, `20250409`, `20230338`, `20250461`, `20230204`, `20230374`, `20250609`, `20230169`, `20250652`, `20250650`, `20250549`, `20230187`, `20250545`, `20230344`, `20250647`, `20230063`, `20230122`, `20230330`, `20230313`, `20230272`, `20230123`).
- **Roster Privacy:** The "View Class Patron List" dropdown is completely removed from the login screen so registration numbers remain private.
- **1-Hour Auto Session Expiry:** Enforces a 60-minute session timeout for laboratory security and orderly class turnover.
- **Dual Classroom Experience:**
  - *Follow Teacher Mode:* Student laptop screen automatically mirrors the teacher's active slide and Kahoot questions in real time.
  - *Self-Paced Mode:* When unlocked by teacher, students can freely browse "Copy Notes" at their own pace to write into exercise books or complete assignments.

### B. Instructors & Administrators
- **Control Room URL:** Separate, dedicated path (`/instructor`).
- **Role Hierarchy & PIN Credentials:**
  - `adminTolu` (Super Admin): Full system power — manage student rosters, wipe/reset test data, override module locks, configure settings, and export school records.
  - `adminIsaac` (Instructor): Classroom teaching power — advance live slides, launch Kahoot quizzes, reveal answers, toggle module locks, and grade student submissions.
- **Live Attendance Roster:** Tracks active laptops and shows both paired partners as active simultaneously.

## 3. Pedagogical Principles & Curriculum Quality Standards

### A. Dual-Layer Explanation Standard (Bookish + Simple English)
Every computer science topic, component, and stage must follow this rigorous teaching structure:
1. **Formal "Bookish" Definition:** Clear, academically precise terminology so students excel in external examinations (WAEC, NECO, BECE).
2. **Simple English Explanation:** Plain, conversational breakdown ("In simple English: What does this actually mean?").
3. **Everyday Nigerian Real-Life Analogy:** Familiar connections (Yam cooking, cassava grating, market POS agents, NEPA power cuts/inverters, biological human body mappings).
4. **Golden Memory Formula:** Short, punchy mnemonic (e.g., `RECEIVES → WORKS → SHOWS → STORES`).

### B. Extensive Visuals & Cultural Authenticity Standard
- **STRICT REPRESENTATION RULE:** Zero photos of white people. All human imagery exclusively depicts **Black / African secondary school students in uniforms, African ICT teachers, and African professionals** (doctors, bankers, engineers, mechanized farmers).
- **Extensive Photography & Cutaways:** Abundant high-contrast educational photos directly tied to the lesson (real labeled motherboards, RAM sticks, CPU heat sinks, ports, classroom setups).
- **Offline Vector Fallbacks:** High-quality inline SVG schematics ensure every diagram renders cleanly even in school labs with zero internet connectivity.

### C. Gamified Kahoot-Style Quiz Experience
- **Pre-Generated Questions:** Curated ahead of time with zero mid-class generation lag.
- **4 Vibrant Response Shapes:** 🔺 Red Triangle (A), 🔷 Blue Diamond (B), 🟡 Yellow Circle (C), 🟩 Green Square (D).
- **Classroom Battle Flow:** 30s countdown timer, live response distribution tally, instructor-triggered reveal celebrations, and collaborative partner scoring.

## 4. Features & Build Modules (Phases 1, 2 & 3)

### Phase 1: Foundational Digital Literacy & Core Platform
- **Module 1 (Overhauled):** Introduction to Computers (Data vs. Information, IPOS Cycle with Cooking & ATM, Charles Babbage & 5 Generations, Computer Classification, Societal Applications, Lab Safety, and Kahoot Arena).
- **Module 2:** Parts of a Computer (Hardware Anatomy, Human Body Analogy, Peripheral Sorting, System Unit & Dissection Lab, Storage & Safety, and Kahoot Arena).
- **Modules 3–7:** Computer Usage & Booting, Operating Systems & Desktop Explorer, File Management & Organization, Internet Basics & Digital Citizenship, Microsoft Office Productivity Suite.

### Phase 2: Intermediate (Creative Logic & App Development)
- **Modules 8–13:** Computational Thinking, Scratch Visual Programming, Python Scripting, JavaScript Web Logic, and Mobile App Development.

### Phase 3: Advanced (Specialized Technologies & Futures)
- **Modules 14–19:** Web Design (HTML/CSS), Git & GitHub, AI Prompting & Workflows, Robotics & Physical Computing (Arduino), Digital Design, Cybersecurity & Tech Career Pathways.

## 5. Data - What are we storing?

- **Authorized Student Roster:** 29 verified Patron Numbers and full student names.
- **Shared Laptop Session State:** `{ patronNumberA, nameA, patronNumberB?, nameB?, isPair, loggedInAt, expiresAt }`.
- **Active Live Session State (`/api/live-session`):** Active module ID, active lesson/stage index, mirror mode (`follow-teacher` | `self-paced`), active Kahoot question ID, reveal status, student vote distribution.
- **Student Submissions & Progress:** `{ id, submissionType: 'joint' | 'individual', patronNumberA, nameA, patronNumberB?, nameB?, moduleId, answers, submittedAt, kahootScore }`.
- **Instructor State:** Module locks, active PIN session (`adminTolu` or `adminIsaac`), and paired attendance ledger.
- **Persistence:** Local storage caching for offline resilience + Next.js Vercel API state with JSON/CSV export.

## 6. Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript 5.
- **Styling:** Tailwind CSS v4.
- **Visuals & Imagery:** Culturally authentic African educational photography, verified component schematics, and responsive offline inline SVGs.
- **Deployment:** Vercel cloud hosting + zero-dependency local execution (`npm run dev` at root).

## 7. Monetization

Non-profit philanthropic education initiative by Dzuels Foundation to bridge the digital divide in Ekiti State, Nigeria. 100% free for educational use.
