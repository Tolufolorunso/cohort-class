# Fix: Separate Workstation Partner Students in Instructor Attendance Session

**Type:** Fix  
**Status:** verified  
**Branch:** fix/separate-workstation-partners-attendance  

## The Problem

1. **Merged Student Names in Instructor Session:**
   - When two students paired up on one workstation, `POST/GET /api/live-session` combined them into a single `activeStudents[patronA]` entry with `studentName: "${nameA} & ${nameB} (Lab Partners)"`.
   - `patronB` was not registered as an independent entry in `activeStudents`, forcing fallback scans and causing the attendance card for Student A to display both students' names concatenated together.
   - This made it cumbersome and confusing for the instructor to mark attendance individually when one student was present and the other stepped out or was absent.

2. **Attendance Grid Clarity:**
   - In `CohortAttendanceDesk.tsx`, the instructor needs to see each student as an independent card with their own barcode, official name, and individual Present/Absent toggle, while still indicating which workstation or lab partner they share a machine with.

## The Solution

1. **Independent Student Registration in `live-session` (`route.ts` & `platform.ts`):**
   - When a workstation heartbeat arrives with `mode: 'partner'`, register **two separate, independent entries** in `liveSession.activeStudents`:
     - `liveSession.activeStudents[patronA]`: `studentName: nameA`, `mode: 'partner'`, `workstationId: laptopId`, `sharedWith: { patronNumber: patronB, studentName: nameB }`.
     - `liveSession.activeStudents[patronB]`: `studentName: nameB`, `mode: 'partner'`, `workstationId: laptopId`, `sharedWith: { patronNumber: patronA, studentName: nameA }`.
   - Keep student names strictly individual so neither record ever displays combined or concatenated names.

2. **Individual Student Cards & Workstation Badge in `CohortAttendanceDesk.tsx`:**
   - Each patron in the 30-student roster is evaluated independently.
   - The student's name on their card strictly shows their own name.
   - For students sharing a workstation, display a clear, helpful badge: `💻 Workstation Pair: with [Partner Name]`.
   - Each student has an independent "Mark Present / Absent" button.
   - "Mark Connected Present" includes both individual barcodes in the ILAS API payload.

3. **Streamline Instructor Page Counting (`lessons/app/instructor/page.tsx`):**
   - Cleanly count connected patrons from `activeStudents` where each connected patron has their own active entry.

## Build Steps

- [x] **Step 1: Update Live Session Engine & Types**
  - Update `LiveSessionState` type in `lessons/types/platform.ts` to support `workstationId` and `sharedWith`.
  - In `lessons/app/api/live-session/route.ts`, register `patronA` and `patronB` as two distinct entries with individual names.
  - Done when `/api/live-session` returns distinct entries for each student.

- [x] **Step 2: Update Cohort Attendance Desk**
  - In `lessons/components/instructor/CohortAttendanceDesk.tsx`, display individual student names for every card.
  - Add `💻 Workstation Pair: with [Partner Name]` indicator on shared workstation cards.
  - Ensure individual attendance toggles and bulk check-in work independently for each partner.
  - Done when each student on a shared laptop has their own separate attendance card.

- [x] **Step 3: Quality Gates & Verification**
  - Run `npm --prefix lessons run lint` and `npm --prefix lessons run build`.
  - Verify that partner logins show up as two separate individual cards in the attendance desk.
  - Done when lint and build pass cleanly with 0 errors.

## Verify

1. Connect workstation with Partner A (`20260012`, `BABAJIDE, Kemi`) and Partner B (`20260015`, `OGUNLEYE, David`).
2. Open `/instructor` → Cohort Attendance Desk:
   - Confirm `20260012` card shows `BABAJIDE, Kemi` with badge `💻 Workstation Pair: with OGUNLEYE, David`.
   - Confirm `20260015` card shows `OGUNLEYE, David` with badge `💻 Workstation Pair: with BABAJIDE, Kemi`.
   - Confirm instructor can mark Kemi Present and David Absent independently.
3. Click "Mark Connected Present": confirm both barcodes `20260012` and `20260015` are included in the ILAS attendance submission.
