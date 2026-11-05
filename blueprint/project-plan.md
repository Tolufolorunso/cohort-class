# Project Plan: Dzuel's Computer Class Interactive Curriculum

## 1. Problem - What problem are we solving?

Traditional slide decks (PowerPoint, static PDFs) are passive and ineffective for teaching foundational digital literacy to secondary school students (ages 12–18) who have zero prior computer experience. Teachers need an interactive presentation and learning platform in the browser that replaces slides with dynamic visual models, real-world analogies, and hands-on exercises to demystify computers and keep students engaged during classroom and laboratory sessions. Additionally, students using individual laptops assigned to them in the computer lab need a structured place to copy lesson notes, complete assignments, and submit work using their Patron Number and Name.

## 2. Users - Who is this for?

- **Teacher / Instructor:** Uses the web interface on the classroom projector to present lessons, controls when answers are revealed to the class, locks/unlocks curriculum modules as the term progresses, and reviews student assignments.
- **Students (Ages 12–18):** 
  - In class: Participate in live demonstrations, classification labs, and interactive quizzes on their assigned classroom laptops.
  - In lab / study: Access the "Copy Notes" view to transcribe summaries into exercise books, complete interactive homework, and submit assignments with their **Patron Number** and **Full Name**.

## 3. Features - What does the platform need?

### Platform Shell & Core Controls (Feature 2 Focus)
- **Visual Zoom & Projector Sizing:** In-header scaling controls (`A-`, `A`, `A+`, `A++`) and high-contrast projector mode to ensure text is crystal clear on distant or dim classroom screens.
- **Dual Role Mode (Teacher vs. Student):**
  - *Instructor Mode (PIN-protected):* Controls live answer reveals, locks/unlocks modules, and reviews student assignment submissions.
  - *Student Mode:* Displays "Copy Notes" summary, interactive homework exercises, and hides quiz answers until submitted.
- **Student Assignment Submissions:** Students submit interactive homework and assignments by entering their **Patron Number** and **Full Name**, stored reliably in student storage and synced via Next.js API routes for the teacher.
- **Progressive Module Locking:** Modules remain locked until explicitly unlocked by the instructor as the class progresses.
- **Enhanced Header:** Dzuels Foundation branding, phase/module switcher, role toggle, zoom controls, and fullscreen projection toggle.
- **Root Startup Scripts:** Run `npm run dev` and `npm run build` directly from the repository root.

### Curriculum Modules (Phases 1, 2 & 3)
- **Module 1 (Shipped):** Introduction to Computers (IPOS simulator with analogies, history timeline, device classification, applications, 10-question quiz).
- **Module 2:** Parts of a Computer (Hardware anatomy, interactive PC dissection simulator, human body analogy, input/output/storage sorting, child-friendly illustrations).
- **Modules 3–7:** Computer Usage & Booting, Operating Systems, File Management, Internet & Digital Citizenship, Office Productivity Suite.
- **Phase 2 (Modules 8–13):** Computational Thinking, Scratch, Python, JavaScript, Mobile Apps.
- **Phase 3 (Modules 14–19):** Web Design, Git & GitHub, AI Prompting, Robotics (Arduino), Digital Creativity, Cybersecurity & Careers.

## 4. Data - What are we storing?

- Structured curriculum content, lesson notes, and questions stored as TypeScript datasets in `lessons/`.
- Student assignment submissions: `{ id, patronNumber, studentName, moduleId, answers, submittedAt }`.
- Instructor module lock/unlock state: `{ [moduleId]: boolean }`.
- Active visual zoom setting (`normal`, `large`, `extra-large`) and active user role (`teacher` | `student`).
- Offline-resilient and Vercel-ready: client storage persistence with optional lightweight API sync.

## 5. Tech - What stack are we using?

- **Framework:** Next.js 16 (App Router), React 19, TypeScript 5.
- **Styling:** Tailwind CSS v4 (`lessons/app/globals.css`).
- **Icons & Graphics:** Self-contained local SVGs and child-friendly illustrations.
- **Deployment Platform:** Vercel cloud hosting for real-time access on student laptops + local offline fallback.

## 6. Monetize - How will this make money?

Non-profit philanthropic education initiative by Dzuels Foundation to bridge the digital divide. Free for educational deployment.

## 7. UI/UX - How should this look and feel?

- **Projector & Child-Friendly:** Large readable typography, vibrant illustrations, tactile interactive widgets, and instant visual zoom.
- **Clear Role Separation:** Visible badge indicating whether the interface is in Instructor Mode or Student Mode.
- **Structured Note-Taking:** Clean "Copy Notes" card layout with bullet points, key terms, and diagrams specifically formatted for students copying into physical notebooks.

## 8. Deployment - Where and how will this ship?

- **Primary Cloud Deployment:** Vercel (`lessons/` deployed as Next.js app) so students and teachers connect simultaneously via their assigned laptops and projector.
- **Local Lab Fallback:** Can also run completely offline on local machines via `npm run dev` from the repository root.

## 9. Usage model and constraints

- Responsive across projector displays, teacher laptops, and student laptops.
- Submissions and lock states must persist reliably across browser reloads.
