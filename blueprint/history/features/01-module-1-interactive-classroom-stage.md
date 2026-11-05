# Feature: Module 1 Interactive Classroom Stage

**From build-plan:** feature 1
**Build attempt:** 1
**Branch:** feature/module-1-interactive-classroom-stage
**Status:** verified

## Goal

Build an interactive, projector-ready presentation stage view for **Module 1: Introduction to Computers** in `lessons/`. This replaces traditional presentation slides with dynamic, offline-capable learning beats (What is a Computer, IPOS simulator with real-world analogies, History timeline explorer, Device classification lab, Real-world applications, and a 10-question review quiz) controlled effortlessly via keyboard or on-screen controls.

## Design reference

- Projector-first presentation layout:
  - High-contrast, large-format typography (readable from 5–10 meters).
  - Clean top bar displaying current phase, module title, progress track, and stage indicator.
  - Navigation controls: prominent previous/next buttons and full keyboard control (`←`/`→`, `Space`, `F` for fullscreen).
  - Tactile interactive widget cards with active states, subtle animations, and instant feedback.

## In scope

- **1. Types & Data Architecture (`lessons/types/` & `lessons/data/`):**
  - Define TypeScript schemas for `LessonStage`, `Module`, `IPOSStep`, `AnalogyScenario`, `TimelineEvent`, `DeviceItem`, and `QuizQuestion`.
  - Provide complete, verified data for Module 1 derived from the curriculum handbook (`dzuels_curriculum_1.docx`).
- **2. Presentation Shell (`lessons/components/presentation/`):**
  - Fullscreen stage wrapper with keyboard navigation (`ArrowRight` / `Space` = next, `ArrowLeft` = prev, `f` = toggle fullscreen).
  - Top progress bar, stage title banner, and stage jump menu.
  - Floating/docked presenter controls for easy forward/back navigation while teaching.
- **3. Stage 1: Hook & Definition ("What is a Computer?"):**
  - Simple, understandable definition of a computer as an electronic machine processing input to output.
  - Core characteristics cards: Speed, Accuracy, Diligence, Storage Capacity, Automation.
  - Interactive comparison tool: Calculator vs. Computer.
- **4. Stage 2: The IPOS Cycle Simulator:**
  - Interactive visualization of Input → Processing → Output → Storage.
  - Real-world analogy switcher:
    - *Analogy 1: Baking a Cake* (Ingredients → Oven Baking → Finished Cake → Refrigerator Storage).
    - *Analogy 2: Math Calculation* (Entering Numbers → CPU Adds Numbers → Result on Screen → File Saved to Disk).
    - *Analogy 3: ATM Cash Withdrawal* (Card & PIN Entered → Bank Server Checks Balance → Cash Dispensed → Account Statement Stored).
  - Animated stepper: manual step-through or auto-play simulation highlighting each stage with clear explanatory callouts.
- **5. Stage 3: History & Evolution Journey:**
  - Interactive timeline highlighting milestone innovations:
    - Abacus (ancient counting tool)
    - Napier's Bones (1617)
    - Pascaline (1642, Blaise Pascal)
    - Analytical Engine (1837, Charles Babbage & Ada Lovelace)
    - Modern Microprocessor Era (1971–Present)
  - Clickable era cards revealing inventor, key innovation, and historical significance.
- **6. Stage 4: Device Classification Lab:**
  - Interactive sorting activity for classroom participation.
  - Categories: Personal Computers (Desktops, Laptops), Mobile Devices (Smartphones, Tablets), and Supercomputers.
  - Device cards to classify with instant visual feedback (correct placement celebration, helpful retry hints).
  - Live progress counter of correctly classified devices.
- **7. Stage 5: Where Computers Are Used (Real-World Applications):**
  - Interactive exploration grid covering Schools, Hospitals, Banks, Supermarkets, Homes, and Transportation.
  - Sector details showing concrete computer uses (e.g., patient records, barcode scanning, ATM processing).
  - Thought-provoking classroom discussion prompt for each sector.
- **8. Stage 6: Classroom Knowledge Check (Review Quiz):**
  - 10 multiple-choice questions matching the curriculum handbook.
  - Classroom voting mode: Large question display, selectable options, instant answer reveal with concise teaching explanation.
  - Live score tally, completion summary, and one-click quiz reset for the next class.
- **9. Complete Offline Operation:**
  - 100% self-contained: all icons, graphics, SVGs, and fonts render locally without internet connectivity.

## Out of scope

- Backend database or user account authentication (MVP runs entirely client-side).
- Persistent storage across browser sessions (state resets per class session).
- Modules 2 through 19 (scheduled in subsequent roadmap items).
- External network requests, analytics, or remote CDN dependencies.

## Build loop

- `workflow.stepReview: "feature"`
- `workflow.checkpointCommits: "disabled"`
- Implementation executes on `feature/module-1-interactive-classroom-stage`, verifies lint and build, and presents one final feature review packet before `/check`.

## Build steps

- [x] 1. **Curriculum Schemas & Module 1 Dataset:** Create `lessons/types/curriculum.ts` and populate `lessons/data/module1.ts` with complete data for all 6 stages.
  - *Done when:* Types compile cleanly and `module1.ts` exports all definitions, analogies, timeline events, device sorting items, real-world sectors, and 10 review questions.
- [x] 2. **Presentation Shell & Controls:** Build `lessons/components/presentation/StageShell.tsx` and navigation components (`ProgressBar.tsx`, `PresenterControls.tsx`) with keyboard shortcuts (`ArrowRight`, `ArrowLeft`, `Space`, `f`).
  - *Done when:* The shell renders with stage switching, keyboard navigation functions smoothly, and fullscreen toggles without errors.
- [x] 3. **Stage 1 (Definition) & Stage 2 (IPOS Simulator):** Build `StageDefinition.tsx` and `StageIPOS.tsx` with analogy switching and animated step-through controls.
  - *Done when:* The definition view displays core characteristics, and the IPOS simulator transitions between steps with clear visuals and analogy explanations for cake, math, and ATM.
- [x] 4. **Stage 3 (History Timeline) & Stage 4 (Classification Lab):** Build `StageTimeline.tsx` and `StageDeviceSorting.tsx`.
  - *Done when:* Timeline cards expand with era details on click, and the sorting game allows categorizing devices into proper buckets with instant feedback and score counting.
- [x] 5. **Stage 5 (Real-World Sectors) & Stage 6 (Review Quiz):** Build `StageApplications.tsx` and `StageQuiz.tsx`.
  - *Done when:* Sector cards reveal practical computer uses, and the 10-question quiz allows interactive answer reveals, score tracking, and clean resets.
- [x] 6. **Integration, Polish & Verification:** Wire all stages into `lessons/app/page.tsx`, ensure projector typography and contrast standards, test all keyboard interactions, and run build and lint checks (`npm --prefix lessons run lint`, `npm --prefix lessons run build`).
  - *Done when:* `npm --prefix lessons run lint` and `npm --prefix lessons run build` pass with zero errors, and the full presentation runs end-to-end locally.

## Files / areas

- `lessons/types/curriculum.ts` (new) — Core curriculum and presentation type definitions.
- `lessons/data/module1.ts` (new) — Complete Module 1 curriculum content and questions.
- `lessons/components/presentation/StageShell.tsx` (new) — Presentation container, header, keyboard listeners.
- `lessons/components/presentation/ProgressBar.tsx` (new) — Top progress indicator.
- `lessons/components/presentation/PresenterControls.tsx` (new) — On-screen navigation dock.
- `lessons/components/stages/StageDefinition.tsx` (new) — Stage 1: Computer definition & comparison.
- `lessons/components/stages/StageIPOS.tsx` (new) — Stage 2: IPOS cycle interactive simulator.
- `lessons/components/stages/StageTimeline.tsx` (new) — Stage 3: History of computing visual timeline.
- `lessons/components/stages/StageDeviceSorting.tsx` (new) — Stage 4: Device classification interactive lab.
- `lessons/components/stages/StageApplications.tsx` (new) — Stage 5: Where computers are used.
- `lessons/components/stages/StageQuiz.tsx` (new) — Stage 6: 10-question interactive review quiz.
- `lessons/app/page.tsx` (modified) — Connects StageShell and loads Module 1.
- `lessons/app/globals.css` (modified) — Projector utility classes and animation helpers if needed.

## Data / contracts

- `LessonStage`: `{ id: string; title: string; subtitle: string; type: StageType; }`
- `IPOSScenario`: `{ id: string; name: string; description: string; steps: { phase: 'input' | 'processing' | 'output' | 'storage'; label: string; detail: string; icon: string; }[] }`
- `QuizQuestion`: `{ id: number; question: string; options: string[]; correctIndex: number; explanation: string; }`
- All data is bundled statically in JavaScript/TypeScript bundle — zero network latency, zero remote calls.

## Testing

- Testing is opt-in and no test runner is configured yet.
- Verification gate:
  - Static typechecking via `npm --prefix lessons run build`.
  - Code quality and syntax checks via `npm --prefix lessons run lint`.
  - End-to-end manual verification of all 6 presentation stages, keyboard shortcuts, and interactive widgets.

## Notes for the AI

- Keep all code self-contained inside `lessons/`.
- Ensure font sizing is generous: minimum 18px body text, 36px–48px headings, for projection visibility.
- Build clean inline SVG icons or local components — no external image or CDN links.
- Respect the proportional-engineering mandate: avoid unnecessary external state packages (React `useState`/`useCallback` handles stage navigation and quiz state cleanly).


<!-- blueprint:completion {"schemaVersion":2,"specBytes":9642,"specSha256":"7beec3798b81c6af97db1554a1db0f59598d7666945325f7092b00390aff1ed5","branch":"refs/heads/feature/module-1-interactive-classroom-stage","head":"fd3548be9dfdd4b48eaacefd55b3c71324efca7a","baseRef":"refs/heads/master","baseCommit":"fd3548be9dfdd4b48eaacefd55b3c71324efca7a","sourceTree":"92c769885d4b494c63a1a6faa388afceb35960e8","landing":"local-merge","absentOptional":[]} -->

## Try it now

1. Start the presentation server:
   ```bash
   npm --prefix lessons run dev
   ```
2. Open http://localhost:3000 in your browser.
3. Test the interactive beats:
   - Stage 1: Explore definitions, 5 characteristics, and the Calculator vs. Computer comparison table.
   - Stage 2: Advance to IPOS Simulator (`→` or `Space`), switch between Cake, Math, and ATM analogies, and click "Auto-Play Flow".
   - Stage 3: Click through the History timeline from Abacus to Microchips.
   - Stage 4: Play the Device Classification Lab by sorting 10 devices into Desktop, Laptop, Tablet, Smartphone, or Supercomputer.
   - Stage 5: Explore the 6 real-world societal sectors and classroom discussion prompts.
   - Stage 6: Complete the 10-question review quiz and view instant explanations and score tally.
4. Press `F` to test fullscreen projection mode.
