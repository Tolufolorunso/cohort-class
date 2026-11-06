# Feature: Shared Laptop Equal-Partner System, Cultural Visual Architecture & Module 1 Simple-English Overhaul

**From build-plan:** feature 5
**Build attempt:** 1
**Branch:** feature/shared-laptop-equal-partner-system-cultural-visual-architecture-module-1-simple-english-overhaul
**Status:** verified

## Goal

Provide first-class classroom support for the reality of Nigerian computer laboratories where two students share a single laptop as equal co-learners (neither is "primary"), eliminate patron number exposure by removing the public roster lookup from the login screen, enable flexible joint and individual assignment submissions, enforce a strict cultural authenticity standard for educational imagery (zero photos of white people; exclusively Black/African students, teachers, and professionals or labeled hardware cutaways), and critically overhaul Module 1 with a dual-layer simple English pedagogical standard (formal bookish definition + simple English breakdown + relatable Nigerian analogies + golden memory formulas) across all 4 lessons and interactive stages.

## In scope

1. **Shared Laptop Equal-Partner System:**
   - Segmented login mode selector on `/`: "Solo Learner (1 Student)" vs. "Equal Lab Partners (2 Students)".
   - Solo mode validates 1 Patron Number and Full Name against the 29-student whitelist roster.
   - Equal Lab Partners mode presents two symmetrical side-by-side cards: "Partner A" and "Partner B". Neither is labeled "primary"; both are equal co-learners.
   - Independent validation for both partners against the 29-student roster, preventing duplicate patron entry (Partner A and Partner B cannot have the same ID).
   - Display both partner names in the app header and active session badges (e.g., "Adewale O. & Chioma E. (Lab Partners)").
2. **Login Privacy Protection:**
   - Completely remove the "View Class Patron List" dropdown toggle from `StudentLogin.tsx` so student registration numbers remain private.
3. **Live Attendance & Assignment Submission Flexibility:**
   - Update `/api/live-session` to receive and broadcast paired partner attendance, accurately calculating total active student headcount.
   - Update `/instructor` dashboard attendance ledger to show both connected laptops and paired partner names.
   - Update `AssignmentView.tsx` to support both:
     - **Joint Partner Submission:** Both partners submit together with equal credit and both names/patrons recorded.
     - **Individual Submission:** Toggle allowing a student to submit their own specific assignment from the shared laptop.
   - Update instructor submission review to clearly distinguish joint submissions from individual submissions.
4. **Cultural Visual Architecture & Representation:**
   - Strict rule: Zero photos of white people in people photos. All human imagery exclusively features Black / African secondary school students in uniforms, African ICT teachers, and African professionals (doctors, bankers, engineers, mechanized farmers).
   - Abundant real-world educational hardware photography (motherboard, microchip, RAM stick, CPU heat sink, ports, classroom setups).
   - High-contrast offline vector SVG schematic fallbacks for all image cards in `EducationalImage.tsx`.
5. **Module 1 Critical Simple-English Overhaul:**
   - Implement the Dual-Layer Explanation Pattern across all 4 lessons and 6 interactive stages:
     - *Formal Bookish Definition:* Academic, WAEC/NECO standard definition for exam excellence.
     - *Simple English Breakdown:* Plain, conversational breakdown ("In simple English: What does this actually mean?").
     - *Everyday Nigerian Real-Life Analogy:* Yam cooking, cassava grating, market POS agents, NEPA power outages / inverters & UPS, human sensory organs.
     - *Golden Memory Formula:* Memorable mnemonics (e.g. `RECEIVES → WORKS → SHOWS → STORES`, `GIGO`).
   - Enhance the interactive stages (`StageDefinition`, `StageIPOS`, `StageTimeline`, `StageDeviceSorting`, `StageApplications`, and `KahootArena`) with rich visual illustrations and simple-English callouts.

## Out of scope

- Module 2 Hardware disassembly simulator (reserved for Feature 6).
- Permanent database persistence (PostgreSQL/Supabase) — remains in-memory Next.js server route + local storage caching.
- Dynamic Kahoot question authoring by teachers (questions remain pre-curated for zero latency).

## Build loop

- Step review policy: manual review per step.
- Checkpoint commits: none before `/complete`.
- Verification command: `npm --prefix lessons run lint` and `npm --prefix lessons run build`.

## Build steps

- [x] 1. **Data Models & Roster Engine for Equal-Partner Sessions**
  - Update `lessons/types/platform.ts` with `LoginMode`, `StudentPartner`, updated `StudentSession`, updated `LiveSessionState`, and updated `StudentSubmission` (with `submissionType: 'joint' | 'individual'`).
  - Update `lessons/lib/roster.ts` with `validateSoloLogin` and `validatePartnerLogin` functions, enforcing 29-student whitelist checks and disallowing identical partner patron numbers.
  - *Done when:* Type checks pass and roster helper functions validate solo and partner credentials accurately. Check with `npm --prefix lessons run lint`.

- [x] 2. **Student Login UI Redesign (Solo & Equal Lab Partners, Privacy Protection)**
  - Overhaul `lessons/components/auth/StudentLogin.tsx`:
    - Add segmented toggle for "Solo Learner" vs. "Equal Lab Partners".
    - Render symmetrical "Partner A" and "Partner B" input cards in partner mode with clear labels and equal visual weighting.
    - Completely remove the "View Class Patron List" dropdown button and list.
    - Display clear validation error messages for missing, invalid, or duplicate credentials.
  - Update `lessons/components/navigation/Header.tsx` and `lessons/app/page.tsx` to display both partner names and active session timer.
  - *Done when:* Student login provides seamless switching between Solo and Partner modes, rejects duplicate or unlisted patron numbers, hides the public patron roster, and displays both partner names in the header upon login.

- [x] 3. **Live Attendance & Assignment Submission for Shared Laptops**
  - Update `lessons/app/api/live-session/route.ts` to process paired partner heartbeats and return accurate laptop and student headcounts.
  - Update `lessons/app/instructor/page.tsx` and `lessons/components/teacher/InstructorDashboard.tsx` to display paired partners in the live attendance ledger.
  - Update `lessons/components/assignments/AssignmentView.tsx` to provide a "Joint Partner Submission" vs. "Individual Submission" choice when in partner mode, recording both partners' metadata.
  - Update `lessons/lib/platformStorage.ts` to handle joint submissions.
  - Update instructor assignment review to clearly show submission type and all participating students.
  - *Done when:* Heartbeats record both partners; instructor sees paired attendance; and assignments can be submitted jointly or individually with complete attribution.

- [x] 4. **Cultural Visual Architecture & Authentic Imagery Standard**
  - Audit and update all image URLs in `lessons/data/module1.ts`: replace any non-African human stock photos with authentic imagery depicting Black / African students in school uniforms, African ICT educators, and African professionals, or high-definition hardware component close-ups.
  - Update `lessons/components/presentation/EducationalImage.tsx` with offline vector SVG schematics for all image cards, ensuring complete visual resilience without an active internet connection.
  - *Done when:* All human photos depict Black / African individuals, all hardware photos are high-quality component representations, and offline SVGs render when network fails.

- [x] 5. **Module 1 Critical Content Overhaul (Dual-Layer Simple English Standard)**
  - Rewrite all 4 lessons in `lessons/data/module1.ts` to embed the Dual-Layer Explanation Standard:
    1. Formal "Bookish" definition.
    2. Simple English explanation ("What does this actually mean?").
    3. Everyday Nigerian real-life analogy (yam cooking, cassava grating, POS terminal, NEPA power cuts/inverters, body senses).
    4. Golden memory formula (`RECEIVES → WORKS → SHOWS → STORES`, `GIGO`).
  - Update `StageDefinition.tsx`, `StageIPOS.tsx`, `StageTimeline.tsx`, `StageDeviceSorting.tsx`, `StageApplications.tsx`, and `KahootArena.tsx` to prominently present simple English breakdowns alongside formal terminology.
  - *Done when:* Every lesson beat in Module 1 includes both formal and simple English layers with Nigerian analogies, verified through the classroom stage.

- [x] 6. **Verification & End-to-End Quality Gate**
  - Run `npm --prefix lessons run lint` and `npm --prefix lessons run build`.
  - Verify complete workflow: solo and partner login, session display, privacy enforcement, joint/individual submissions, attendance mirroring, cultural imagery, and Module 1 interactive stages.
  - *Done when:* Lint and build pass with 0 errors and 0 warnings, and observable feature behavior satisfies all acceptance criteria.

## Files / areas

- `lessons/types/platform.ts` - Data types for solo/partner sessions, submissions, and live session state.
- `lessons/lib/roster.ts` - Solo and partner authentication and session storage helpers.
- `lessons/components/auth/StudentLogin.tsx` - Solo vs. Partner login UI and removal of patron roster dropdown.
- `lessons/components/navigation/Header.tsx` - Display both partner names and session status.
- `lessons/app/page.tsx` - Session initialization, live mirroring, and state management.
- `lessons/app/api/live-session/route.ts` - Paired partner heartbeat, attendance counting, and vote aggregation.
- `lessons/app/instructor/page.tsx` - Paired attendance and submission ledger in instructor dashboard.
- `lessons/components/teacher/InstructorDashboard.tsx` - Paired attendance display and submission review.
- `lessons/components/assignments/AssignmentView.tsx` - Joint vs. individual submission UI and storage logic.
- `lessons/lib/platformStorage.ts` - Submission persistence supporting joint and individual formats.
- `lessons/data/module1.ts` - Module 1 lessons, dual-layer explanations, Nigerian analogies, and authentic image cards.
- `lessons/components/presentation/EducationalImage.tsx` - High-contrast offline vector SVG fallbacks.
- `lessons/components/stages/` - Stage components updated for dual-layer simple English presentation.

## Data / contracts

- `LoginMode: 'solo' | 'partner'`
- `StudentPartner: { patronNumber: string; studentName: string }`
- `StudentSession`:
  - `mode: LoginMode`
  - `partnerA: StudentPartner`
  - `partnerB?: StudentPartner`
  - `patronNumber: string` (partnerA.patronNumber for indexing)
  - `studentName: string` (formatted for display)
  - `loggedInAt: number`
  - `expiresAt: number`
- `SubmissionType: 'joint' | 'individual'`
- `StudentSubmission`:
  - `id: string`
  - `submissionType: SubmissionType`
  - `partnerA: StudentPartner`
  - `partnerB?: StudentPartner`
  - `submittingStudent?: string`
  - `patronNumber: string`
  - `studentName: string`
  - `moduleId: string`
  - `moduleTitle: string`
  - `answers: Record<number, string>`
  - `submittedAt: string`
  - `status: 'submitted' | 'reviewed'`

## Testing

- Typecheck & Lint: `npm --prefix lessons run lint`
- Production Build: `npm --prefix lessons run build`
- Manual browser verification:
  - Solo login with valid patron (e.g. `20230165`).
  - Partner login with two valid patrons (e.g. `20230165` and `20250523`).
  - Duplicate partner error check (entering `20230165` for both Partner A and B).
  - Unregistered patron error check.
  - Confirm absence of public patron list toggle on login.
  - Joint assignment submission and individual assignment submission.
  - Live attendance visibility on `/instructor`.
  - Visual inspection of African educational imagery and Module 1 dual-layer explanations.

## Notes for the AI

- Maintain human attribution in git commits: do NOT add AI `Co-Authored-By` or generated-by trailers.
- Follow the Proportional Engineering standard: reuse existing Next.js and React patterns without unnecessary dependencies.
- Ensure all offline SVG fallbacks render crisp diagrams even if external Unsplash images cannot load.
- Ensure Partner A and Partner B are treated with 100% equality—no "primary" vs "secondary" terminology anywhere in the UI or code.

## Findings

No findings were raised during implementation.

## Independent review

No independent review was requested for this work item.

