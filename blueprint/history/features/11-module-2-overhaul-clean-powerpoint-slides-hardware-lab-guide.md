# Feature: Module 2 Overhaul: Clean PowerPoint Slides & Hardware Lab Guide

**From build-plan:** feature 11
**Build attempt:** 1
**Branch:** feature/module-2-overhaul-clean-powerpoint-slides-hardware-lab-guide
**Status:** verified

## Goal

Transform Module 2 (`/learn/module-2`: Parts of a Computer / Hardware Lab) from dense, multi-scroll text into clean, un-crowded 16:9 PowerPoint-style presentation slides written in natural simple English. Eliminate multi-mode language selector tabs (`"In Simple English"`, `"Formal Bookish Definition"`, `"Nigerian Everyday Analogies"`) from student screens. Keep interactive laboratories (human body hardware analogy, peripheral sorting lab, 7-step internal system unit disassembly simulator, and byte capacity ladder) focused, responsive, and uncluttered. Equip every slide with an in-slide live `Teacher Guide` drawer (toggleable via `T` key or button), and build a dedicated pre-class `Module 2 Hardware Lab Master Briefing` desk in `/instructor` with a 40-minute lab pacing schedule, formal examination syllabus references (WAEC/NECO), complete story-form Nigerian analogies, hardware safety rules, and a 1-click printable lesson plan.

## In scope

1. **Module 2 Student Slides Overhaul (`lessons/components/stages/`):**
   - `StageHardwareAnatomy.tsx`: Refactored into clean PowerPoint-style cards: What is Hardware?, Human Body Analogy (CPU = Brain, Monitor = Eyes, Keyboard/Mouse = Hands, Hard Drive = Memory), 6 External Desktop Parts, and the crucial distinction between the System Unit and the CPU. Completely eliminated the 3-mode definition tabs.
   - `StageInputOutputLab.tsx`: Refactored into an un-crowded, interactive peripheral laboratory: Input vs. Output in simple English, clean drag/click sorting for 6 primary devices (Keyboard, Mouse, Scanner, Monitor, Printer, Touchscreen), Touchscreen dual-function card, and clean peripheral port connectors (USB, HDMI, Audio).
   - `StageSystemUnitDisassembly.tsx`: Refactored into a clean 7-step interactive PC disassembly simulator (Power & Unplug ➔ Ground ESD ➔ Remove Side Panel ➔ Disconnect PSU ➔ Unclip RAM ➔ Unseat Storage ➔ Inspect CPU & Heatsink) with concise cards, clear visual cues, and zero text-wall clutter.
   - `StageStorageBytes.tsx`: Refactored into clean presentation cards: Primary Memory (RAM, volatile) vs. Secondary Storage (HDD/SSD/Flash, permanent), HDD mechanical platters vs. SSD silicon chips, interactive Byte Scale Ladder (Bit, Byte, KB, MB, GB, TB), Capacity Calculator slider, and electrical lab safety.
   - `StageModuleComplete.tsx`: Verified clean summary takeaways and direct launcher for Quiz Arena Module 2 pack.
2. **In-Slide Live Teacher Guide Drawer:**
   - On all Module 2 stages, embedded `TeacherGuideDrawer.tsx` (toggleable via `T` key or `🧑‍🏫 Teacher Guide` button) with 3 quick cards:
     - ❓ **Ask the Class:** Prompt questions for student participation.
     - 🗣️ **Key Talking Point:** Simple conversational explanation.
     - ⚠️ **Watch Out For:** Common student misunderstandings (e.g. calling the System Unit "CPU", confusing RAM with Hard drive, pulling flash drives while reading).
3. **Pre-Class Instructor Master Briefing in `/instructor`:**
   - Created `lessons/components/instructor/Module2MasterBriefingModal.tsx`.
   - Wired into `lessons/app/instructor/page.tsx` with top action button: `🛠️ Mod 2 Hardware Brief`.
   - Contains 40-minute lab pacing schedule, formal WAEC/NECO examination definitions, full story-form Nigerian analogies, hardware electrical safety checklist, and a **`🖨️ Print / Save Lesson Plan`** button for physical classroom use.
4. **Code Quality & Verification:**
   - Clean TypeScript types, zero React impure render calls, passed ESLint and Next.js build (`npm --prefix lessons run lint` and `npm --prefix lessons run build`).

## Out of scope

- Module 3 curriculum build (Usage, Booting & Rapid Typing) — reserved for Feature 12.
- Standalone Quiz Arena `/arena` game logic or question scoring mechanics (already shipped).
- Server deployment or database persistence changes.

## Build steps

- [x] 1. **Add Module 2 Instructor Notes & Master Briefing Data Contract**
  - Updated `lessons/data/module2.ts` to attach structured `teacherNotes` across all 5 Module 2 stages (`StageMeta`), providing prompt questions, talking points, common student pitfalls, and formal syllabus terms.
  - Exported `module2MasterBriefing` containing the complete 40-minute hardware lab pacing schedule, WAEC/NECO examination definitions, relatable Nigerian analogies, hardware lab safety rules, and verbal check questions with answers.
- [x] 2. **Overhaul Stages 1 & 2 (Hardware Anatomy & Input/Output Lab)**
  - Rewrote `StageHardwareAnatomy.tsx` and `StageInputOutputLab.tsx` into clean 16:9 PowerPoint-style cards. Removed the 3-mode definition tabs (`"In Simple English"`, `"Formal Bookish"`, `"Nigerian Everyday Analogies"`). Added the in-slide `TeacherGuideDrawer` (`T` key / button).
- [x] 3. **Overhaul Stages 3, 4 & Completion (Disassembly Simulator & Storage/Bytes)**
  - Rewrote `StageSystemUnitDisassembly.tsx` and `StageStorageBytes.tsx` into clean PowerPoint slide cards with the in-slide `TeacherGuideDrawer` on each stage. Streamlined the 7-step PC teardown simulation and the interactive byte capacity slider. Ensured `StageModuleComplete.tsx` cleanly handles Module 2 completion.
- [x] 4. **Build Pre-Class Module 2 Master Briefing in `/instructor`**
  - Created `lessons/components/instructor/Module2MasterBriefingModal.tsx` and wired it into `lessons/app/instructor/page.tsx`.
  - Added the "Mod 2 Hardware Brief" launcher button at the top of the command desk next to Module 1.
- [x] 5. **Verification & End-to-End Build**
  - Ran `npm --prefix lessons run lint` and `npm --prefix lessons run build`. Both succeeded with 0 errors.

## Verification

- **ESLint:**
  - `npm --prefix lessons run lint`: PASSED (0 errors, 0 warnings).
- **TypeScript Compilation & Next.js Production Build:**
  - `npm --prefix lessons run build`: PASSED (Compiled in 1.8s, TypeScript checked in 3.5s, all 29 static routes generated cleanly in 2.2s).
- **Findings Ledger:**
  - `blueprint/context/findings.md`: 0 open findings.
- **Independent Review:**
  - Not selected under `when-sensitive` policy (UI and content refactor).

## Try it now

1. Start the local Next.js dev server if not already running:
   ```powershell
   npm --prefix lessons run dev
   ```
2. Open [http://localhost:3000/learn/module-2](http://localhost:3000/learn/module-2) in your browser:
   - Check the un-crowded 16:9 presentation slide layout with large text and natural simple English.
   - Confirm that the multi-mode tabs (*"In Simple English"*, *"Formal Bookish"*, *"Nigerian Analogies"*) are gone.
   - Press **`T`** on your keyboard (or click **🧑‍🏫 Teacher Guide**) to test the in-slide prompt card drawer.
   - Test the interactive labs across all 5 stages using **`→`** or **`Spacebar`**:
     - *Stage 1:* Human Body Hardware Twins.
     - *Stage 2:* Peripheral Input/Output sorting with instant checkmarks.
     - *Stage 3:* 7-step PC disassembly simulator.
     - *Stage 4:* Byte ladder & flash drive capacity slider.
3. Open the Instructor Control Room at [http://localhost:3000/instructor](http://localhost:3000/instructor):
   - Enter PIN `2025` or `2026`.
   - Click the **🛠️ Mod 2 Hardware Brief** button.
   - Review the 40-minute lab pacing schedule, WAEC definitions, and 7-step disassembly safety checklist, and test the **🖨️ Print Lesson Plan** button.
