# Project Plan: Dzuel's Computer Class Interactive Curriculum

## 1. Problem - What problem are we solving?

Traditional slide decks (PowerPoint, static PDFs) are passive and ineffective for teaching foundational digital literacy to secondary school students (ages 12–18) who have zero prior computer experience. Teachers need an interactive presentation platform directly in the browser that replaces slides with dynamic visual models, real-world analogies, and hands-on exercises to demystify computers and keep students engaged during classroom and laboratory sessions.

## 2. Users - Who is this for?

- **Primary User (Teacher / Instructor):** Uses the web interface to lead live classroom sessions in front of the class on a projector or large monitor, controlling the flow without switching between slides and tools.
- **Secondary User (Students, Ages 12–18):** Engages with live demonstrations, answers review questions, and participates in hands-on activities. In future phases, students can navigate the interactive exercises on individual lab computers.

## 3. Features - What does the MVP need?

### MVP Scope (Feature 1 Focus)
- **Slide-Alternative Stage View Shell:** Fullscreen-ready presentation layout with keyboard navigation (`←`, `→`, Space, Esc), stage progress bar, quick stage selector, and large projector-friendly typography.
- **Module 1: Introduction to Computers Interactive Beats:**
  1. *What is a Computer?* — Accessible definition, device comparison, and core characteristics.
  2. *The IPOS Cycle Simulator* — Interactive simulation of Input → Processing → Output → Storage using real-world analogies (e.g. cake baking, arithmetic) with animated visual feedback.
  3. *Computer History Journey* — Interactive visual timeline from ancient counting (Abacus, Napier's Bones, Pascaline, Analytical Engine) to modern microchips.
  4. *Device Classification Lab* — Interactive drag/click sorting of Desktops, Laptops, Tablets, Smartphones, and Supercomputers.
  5. *Where Computers Are Used* — Interactive environment cards (Schools, Hospitals, Banks, Supermarkets, Homes).
  6. *Classroom Knowledge Check* — 10-question live review quiz with instant visual feedback and score tally.
- **Curriculum Navigation:** Seamless navigation between sections and phases.

### Explicit Exclusions / Non-Goals for Feature 1
- No backend database or authentication required (runs 100% client-side).
- No external CDN or internet dependencies (all graphics and logic are bundled locally for offline lab use).
- Subsequent modules (Modules 2–19) will be implemented as subsequent features.

## 4. Data - What are we storing?

- Structured curriculum content stored as TypeScript data structures in `lessons/`.
- Transient client-side state: current presentation stage, interactive simulator states, and quiz scores (reset on demand for fresh class sessions).
- No sensitive or persistent database storage needed for MVP.

## 5. Tech - What stack are we using?

- **Framework:** Next.js 16 (App Router), React 19, TypeScript 5.
- **Styling:** Tailwind CSS v4 (`lessons/app/globals.css`).
- **Icons & Graphics:** Local SVG components / Lucide React icons bundled offline.
- **Portability:** 100% offline-ready; runs locally via `npm --prefix lessons run dev`.

## 6. Monetize - How will this make money?

Non-profit philanthropic education initiative by Dzuels Foundation to bridge the digital divide. Free for educational deployment.

## 7. UI/UX - How should this look and feel?

- **Presentation-First Design:** Clean, distraction-free stage layout with large headings, high-contrast readable typography, and dark/light classroom options suitable for projectors.
- **Interactive Micro-Experiences:** Interactive buttons, animated process flows, and tactile feedback on sorting/quiz exercises.
- **Teacher Ergonomics:** Keyboard shortcuts for effortless slide/stage advancing while walking around the classroom.

## 8. Deployment - Where and how will this ship?

- **Primary Mode:** Local offline execution on the teacher's classroom PC (`npm --prefix lessons run dev` or `npm --prefix lessons run start`).
- **Optional Online Hosting:** Vercel deployment for remote teacher preparation and public curriculum access.

## 9. Usage model and constraints

- Must operate reliably without active internet connectivity in school laboratories.
- Self-contained with zero external API dependencies.
