# Feature: Module 2: Parts of a Computer (Full 4-Lesson Hardware Lab & Disassembly)

**From build-plan:** feature 6
**Build attempt:** 1
**Branch:** feature/module-2-parts-of-a-computer-hardware-lab-disassembly
**Status:** verified

## Goal

Integrate the complete 4-lesson curriculum from `modules data/module-2.md` into the interactive classroom platform for Dzuels Computer Class. This feature introduces computer hardware, peripheral input and output devices, internal system unit components with an interactive step-by-step PC disassembly simulator, storage devices with a byte scale ladder, and a pre-generated Module 2 Kahoot review arena. All hardware topics enforce the Dual-Layer Simple English standard (formal WAEC/NECO definitions + simple English breakdowns + everyday Nigerian analogies + golden memory formulas) and strictly authentic African educational photography with offline vector SVG fallbacks.

## Design reference

Matches existing classroom presentation aesthetics in `lessons/components/presentation/StageShell.tsx` and `lessons/components/stages/`:
- High-contrast projector dark theme (`bg-zinc-950`, `text-zinc-100`, `border-zinc-800`, `text-emerald-400`).
- Dual-Layer language mode switcher (`💡 In Simple English`, `🎓 Formal Bookish Definition`, `🍠 Nigerian Everyday Analogies`).
- Interactive PC Disassembly teardown bay with vector schematics, clickable tool actions, and component inspection trays.
- Interactive Human Body hardware analogy mapper.
- Interactive Byte scale conversion ladder (Bit -> Byte -> KB -> MB -> GB -> TB) with real-world file size estimator.
- Pre-generated 4-shape Kahoot game arena (🔺 Red Triangle, 🔷 Blue Diamond, 🟡 Yellow Circle, 🟩 Green Square).

## In scope

1. **Curriculum Dataset (`lessons/data/module2.ts`):**
   - Full 4-lesson syllabus breakdown from `modules data/module-2.md` (Lesson 1: Intro to Hardware; Lesson 2: Input & Output Devices; Lesson 3: System Unit & Internals; Lesson 4: Computer Storage & Hardware Practical).
   - 5 presentation stages: `hardware-anatomy`, `input-output-lab`, `system-unit-disassembly`, `storage-and-bytes`, `module2-kahoot-arena`.
   - Dual-layer explanations for every hardware part: Formal Bookish (WAEC/NECO), Simple English breakdown, relatable Nigerian analogies, and memory formulas.
   - Comprehensive African educational imagery and vector SVG fallback specs.
   - Student notebook copy-notes (`module2Notes`) and homework practical assignment (`module2Assignment`) with solo/partner submission support.
   - 15 pre-generated Kahoot questions from Section A of `module-2.md`.
2. **Interactive Stage Components (`lessons/components/stages/`):**
   - `StageHardwareAnatomy.tsx`: Hardware vs. Software comparison, 6 core desktop parts, and interactive Human Body Analogy widget (Brain -> CPU, Eyes -> Monitor, Hands -> Keyboard/Mouse, Ears -> Speakers, Memory -> Storage, Circulation/Skeleton -> Motherboard/PSU).
   - `StageInputOutputLab.tsx`: Deep dive into input devices (keyboard, mouse, scanner, microphone, touchscreen, webcam) and output devices (monitor, printer, speakers, projector), with interactive sorting sandbox and peripheral port connector explorer (USB, HDMI, VGA, Audio 3.5mm, Power).
   - `StageSystemUnitDisassembly.tsx`: Interactive 7-step PC disassembly simulator (1. Safety & ESD discharge -> 2. Side panel removal -> 3. Motherboard inspection -> 4. CPU & Heat Sink fan unclip -> 5. RAM stick release & gold pins -> 6. Storage drive SATA disconnect -> 7. Power Supply Unit PSU inspection).
   - `StageStorageBytes.tsx`: Primary vs. Secondary storage, HDD magnetic platters vs. SSD silicon chips, interactive Byte Capacity Ladder with file size calculator, and laboratory safety rules.
3. **Hardware Vector SVGs & Kahoot Upgrades:**
   - Extend `ImageFallbackType` and `EducationalImage.tsx` with hardware vector schematics (`motherboard`, `cpu`, `ram`, `psu`, `harddrive`, `ssd`, `keyboard`, `mouse`, `monitor`, `printer`, `scanner`, `webcam`, `speakers`, `flashdrive`, `memorycard`, `touchscreen`, `projector`).
   - Upgrade `KahootArena.tsx` and `StageQuiz.tsx` to accept an optional `questions` prop so Module 2 questions run in the live synchronized game arena.
4. **Multi-Module Platform Integration:**
   - Update `StageShell.tsx` to accept dynamic `moduleInfo` metadata.
   - Update `lessons/app/page.tsx` (Student Portal) to render Module 2 stages, notes, and assignments when `currentModuleId === 'module-2'`.
   - Update `lessons/app/instructor/page.tsx` (Instructor Control Room) to support Module 2 stage navigation, live slide mirroring, and module unlocking.

## Out of scope

- Module 3 through Module 7 lesson stages (reserved for subsequent planned build-plan features).
- WebGL or three.js 3D rendering (keep the PC disassembly lightweight, fast-loading, and responsive using high-fidelity SVG and React state).
- External database integrations (all lesson data is statically compiled in TypeScript for zero-latency offline lab resilience).

## Build loop

- Step review: feature (all steps reviewed in this session).
- Checkpoint commits: disabled.
- Verification command: `npm --prefix lessons run lint` and `npm --prefix lessons run build`.

## Build steps

- [x] 1. **Curriculum Types & Module 2 Dataset (`module2.ts`)**
  - Extend `ImageFallbackType` in `lessons/types/curriculum.ts` to include hardware component identifiers (`motherboard`, `cpu`, `ram`, `psu`, `harddrive`, `ssd`, `keyboard`, `mouse`, `monitor`, `printer`, `scanner`, `webcam`, `speakers`, `flashdrive`, `memorycard`, `touchscreen`, `projector`).
  - Create `lessons/data/module2.ts` capturing all 4 lessons, 5 stage definitions, dual-layer explanations, Nigerian analogies, memory formulas, 15 Kahoot questions, `module2Notes`, and `module2Assignment`.
  - Done when: `lessons/data/module2.ts` compiles with full TypeScript strictness and exports all required dataset structures.

- [x] 2. **Interactive Hardware Anatomy & Input/Output Stages**
  - Build `lessons/components/stages/StageHardwareAnatomy.tsx` featuring the interactive Human Body Analogy mapper and 6 desktop component cards.
  - Build `lessons/components/stages/StageInputOutputLab.tsx` with the input vs. output sorting laboratory and peripheral port connector explorer.
  - Build `lessons/components/stages/StageStorageBytes.tsx` with HDD vs. SSD comparison, the interactive Byte Ladder calculator, and lab safety rules.
  - Done when: All three components render their interactive widgets, respond to user clicks, and respect the dual-layer language switcher.

- [x] 3. **Interactive System Unit PC Disassembly Simulator**
  - Build `lessons/components/stages/StageSystemUnitDisassembly.tsx` providing a 7-step virtual PC teardown workflow.
  - Implement interactive safety discharge, side panel removal, motherboard tracing, CPU heat sink inspection, RAM stick unclip, storage SATA disconnect, and PSU inspection.
  - Provide interactive reset, component detail inspection modals, partner discussion prompts, and lab safety alerts.
  - Done when: Students can advance through all 7 disassembly steps with interactive visual states and observable component callouts.

- [x] 4. **Hardware Vector SVGs in EducationalImage & Kahoot Support**
  - Add vector SVG schematics for all new hardware fallback types in `lessons/components/presentation/EducationalImage.tsx`.
  - Update `lessons/components/kahoot/KahootArena.tsx` and `lessons/components/stages/StageQuiz.tsx` to accept a custom `questions?: KahootQuestion[]` prop, defaulting to Module 1 questions when omitted.
  - Done when: Offline hardware schematics render crisp vector illustrations and `KahootArena` displays Module 2 questions when provided.

- [x] 5. **Multi-Module Platform Integration & Verification**
  - Update `StageShell.tsx` to accept an optional `moduleInfo?: ModuleData` prop.
  - Update `lessons/app/page.tsx` to render Module 2 stages, notes, and assignments when `currentModuleId === 'module-2'`.
  - Update `lessons/app/instructor/page.tsx` to dynamically switch stage controls, preview displays, and live mirroring for Module 2.
  - Run `npm --prefix lessons run lint` and `npm --prefix lessons run build`.
  - Done when: Both lint and production build pass with 0 errors, and switching between Module 1 and Module 2 works seamlessly in both student and instructor portals.

## Files / areas

- `lessons/types/curriculum.ts` - Extend `ImageFallbackType` with hardware components.
- `lessons/data/module2.ts` - Full 4-lesson Module 2 dataset, dual-layer text, analogies, notes, assignment, and Kahoot questions.
- `lessons/components/presentation/EducationalImage.tsx` - Offline vector SVG schematics for hardware parts.
- `lessons/components/kahoot/KahootArena.tsx` - Accept dynamic questions prop.
- `lessons/components/stages/StageQuiz.tsx` - Forward questions prop to `KahootArena`.
- `lessons/components/stages/StageHardwareAnatomy.tsx` - Lesson 1 hardware anatomy & human body analogy widget.
- `lessons/components/stages/StageInputOutputLab.tsx` - Lesson 2 input/output sorting & peripheral ports.
- `lessons/components/stages/StageSystemUnitDisassembly.tsx` - Lesson 3 PC disassembly simulator.
- `lessons/components/stages/StageStorageBytes.tsx` - Lesson 4 storage drives, byte ladder, and lab safety.
- `lessons/components/presentation/StageShell.tsx` - Support dynamic `moduleInfo`.
- `lessons/app/page.tsx` - Student portal multi-module routing.
- `lessons/app/instructor/page.tsx` - Instructor control room multi-module stage controls.

## Data / contracts

- `ModuleData`:
  - `id: 'module-2'`
  - `moduleNumber: 2`
  - `title: 'Module 2: Parts of a Computer'`
  - `duration: '2 Weeks · 4 Lessons (40 mins each)'`
  - `stages: StageMeta[]` (5 stages: `hardware-anatomy`, `input-output-lab`, `system-unit-disassembly`, `storage-and-bytes`, `module2-kahoot-arena`).
- `KahootQuestion`: 15 questions adhering to `[string, string, string, string]` 4-option tuple mapped to shapes `[triangle, diamond, circle, square]` with `correctIndex (0-3)`.
- `LiveSessionState`: `activeModuleId: 'module-1' | 'module-2'`. When instructor switches module, student views mirror in real time when in `follow-teacher` sync mode.

## Testing

- Strict TypeScript compilation verification via `npm --prefix lessons run build`.
- ESLint code quality verification via `npm --prefix lessons run lint`.
- Component interaction testing: human body analogy clicking, PC disassembly step transitions, byte ladder slider calculations, Kahoot answer selections, and module switching.

## Notes for the AI

- Cultural authenticity: Exclusively Black/African secondary school students and teachers in school uniforms or lab coats. Zero white people in people photos.
- Proportional engineering: Avoid heavy external libraries (like three.js or physics engines) when React state and high-definition SVG vector diagrams deliver an immediate, responsive, and robust educational experience.
- Dual-Layer language: Every single hardware part must have the formal definition, simple English breakdown, Nigerian analogy, and memory formula.
- Do not use em dashes (U+2014) anywhere in generated files.


<!-- blueprint:completion {"schemaVersion":2,"specBytes":11176,"specSha256":"95f00b5d8cda6c2ebb553793abe1d3e7db96953f962c0b2a357f768946474abd","branch":"refs/heads/feature/module-2-parts-of-a-computer-hardware-lab-disassembly","head":"22836359a37ca99d0eb19df3a19c292a3850ce6c","baseRef":"refs/heads/main","baseCommit":"22836359a37ca99d0eb19df3a19c292a3850ce6c","sourceTree":"6d75d6ad586af1b4d1021a6083a1a85594585f63","landing":"local-merge","absentOptional":[]} -->

## Try it now

1. Start dev server: `npm --prefix lessons run dev`
2. Open http://localhost:3000, log in with student patron (e.g. `20230165`), and click `M2: Hardware` in top bar.
3. Explore all 5 stages: Hardware Anatomy with Body Analogy, Input/Output device classification and ports, 7-step PC Disassembly simulator, Storage Drives with Byte Scale calculator, and the Module 2 Kahoot review arena.
4. Open http://localhost:3000/instructor with PIN `adminIsaac`, unlock Module 2, and test live slide mirroring.
