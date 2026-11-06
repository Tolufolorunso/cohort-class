# Feature: Official Cohort Attendance API Integration & Instructor Desk

**From build-plan:** feature 8
**Build attempt:** 1
**Branch:** feature/official-cohort-attendance-api-integration
**Status:** verified

## Goal

Integrate the official Dzuels Foundation Cohort Attendance API (`https://dzf-cohorts.vercel.app/api`) into the Instructor Control Room, allowing instructors (Tolu and Isaac) to mark classroom attendance individually or in bulk, retrieve live server attendance rates, handle barcode check-ins, and expand the authorized student roster to include student `20250645`.

## In scope

1. **Authorized Roster Whitelist Expansion:**
   - Update `lessons/lib/roster.ts` to add student `20250645` (`OLOWOOKERE, Michael`) to `AUTHORIZED_PATRONS` and `PATRON_DIRECTORY` (expanding active roster from 29 to 30 students).
2. **Official Cohort Attendance API Endpoints:**
   - `POST /api/cohorts/[cohortType]/attendance`:
     - Secures endpoint with `X-DZF-API-Key: dzf_live_85605f3bdd15ab044f0ed52e13f025be11cb60cc3c7187e4`.
     - Supports **Mode A** (Single Barcode check-in `{ barcode, date, week, attended }`).
     - Supports **Mode B** (Bulk Barcodes check-in `{ barcodes: [...], date, week, attended }`).
     - Supports **Mode C** (Detailed records sync `{ date, week, records: [{ barcode, attended }] }`).
     - Safely returns `totalSubmitted`, `markedCount`, and `unmatched: []` without failing valid cohort students.
     - Full CORS support (`OPTIONS`, `Access-Control-Allow-Origin: *`, `X-DZF-API-Key`).
   - `GET /api/cohorts/[cohortType]/attendance?date=YYYY-MM-DD&week=X`:
     - Retrieves session summary with `totalStudents`, `presentCount`, `absentCount`, `attendanceRate` (%), and individual student records.
   - `lessons/app/api/cohort-attendance/route.ts`:
     - Flexible client proxy/forwarding endpoint.
3. **Platform Attendance Types & Contracts:**
   - Extended `lessons/types/platform.ts` with `CohortAttendanceStudent`, `CohortAttendanceSummary`, `markedBy`, and `requester` fields.
4. **Official Cohort Attendance Desk UI (`CohortAttendanceDesk.tsx`):**
   - Session Controls Bar: Cohort selector (`cohort-8`), Week selector (Weeks 1–12), Date picker (`YYYY-MM-DD`), and "Sync from Server" button.
   - Live Summary KPI Cards: Cohort Roster (30 students), Verified Present, Unmarked / Absent, and Attendance Rate visual progress bar against graduation threshold (≥ 80%).
   - Barcode Quick Scanner (Mode A): Single student check-in with USB barcode scanner auto-submit or manual entry.
   - Bulk Action Toolbar:
     - 🟢 *Mark Connected Students Present (Mode B)*: Automatically identifies active student laptops in the lab and marks them present in one click.
     - ⚡ *Mark All 30 Present (Mode B)*: Full cohort bulk check-in.
     - 📋 *Sync Grid (Mode C)*: Submits explicit states from the interactive grid.
     - 🔄 *Reset / Mark All Absent*: Fast session reset.
   - Interactive 30-Student Roster Grid: Live device connection dot (`🟢 Laptop Active`, `⚪ Offline`, `🔴 Away`), official verification pill (`✓ Present` / `✗ Absent`), and 1-click toggle action.
   - Filter toolbar: Search by name/barcode, filter by All, Present, Absent, and Connected.
   - Domain Policy Callout: Zero Patron Points policy for cohort certificate completion.

## Out of scope

- Direct database mutation (cohort attendance is stored and managed strictly through the official Dzuels Foundation Cohort API endpoint).
- Altering public library leaderboard (cohort training check-ins award 0 patron points).

## Build steps

- [x] 1. **Step 1: Roster Expansion for Student 20250645**
  - Added `"20250645"` to `AUTHORIZED_PATRONS` and `PATRON_DIRECTORY` in `lessons/lib/roster.ts` (`OLOWOOKERE, Michael`).
- [x] 2. **Step 2: Platform Types & Attendance Schema**
  - Added `CohortAttendanceStudent` and `CohortAttendanceSummary` in `lessons/types/platform.ts`.
- [x] 3. **Step 3: Secure Attendance Proxy API Route**
  - Implemented `lessons/app/api/cohorts/[cohortType]/attendance/route.ts` with `X-DZF-API-Key` authentication, Mode A, Mode B, Mode C, and GET session queries.
  - Implemented `lessons/app/api/cohort-attendance/route.ts` proxy helper.
- [x] 4. **Step 4: Instructor Cohort Attendance Desk UI & Bulk Actions**
  - Built `lessons/components/instructor/CohortAttendanceDesk.tsx` and integrated it into `lessons/app/instructor/page.tsx`.
- [x] 5. **Step 5: Live API Synchronization & Verification**
  - Automated API verification passed across Mode A, Mode B, Mode C, and GET queries.
  - `npm --prefix lessons run lint`: zero errors.
  - `npm --prefix lessons run build`: production build passed with all dynamic routes.

## Verification

- **Automated API Test Suite (`scratch-test.mjs`):**
  - Whitelist Verification for `20250645`: PASSED (30 students total).
  - 401 Unauthorized check without key: PASSED.
  - Mode A Single Check-In: PASSED.
  - Mode B Bulk Check-In: PASSED (verified 2 marked, 1 unmatched ignored).
  - Mode C Detailed Records Sync: PASSED.
  - GET Session Attendance Summary: PASSED.
- **ESLint:** `npm --prefix lessons run lint` passed with 0 errors and 0 warnings.
- **Production Build:** `npm --prefix lessons run build` compiled all routes (`ƒ /api/cohorts/[cohortType]/attendance`, `ƒ /api/cohort-attendance`, `/instructor`, `/`, etc.) with code 0.

## Try it now

1. Start the dev server with `npm --prefix lessons run dev`.
2. Visit `http://localhost:3000/` and verify student `20250645` can log in.
3. Visit `http://localhost:3000/instructor` (PIN: `adminIsaac` or `adminTolu`).
4. Scroll down to the **Official Cohort Attendance Desk**:
   - Inspect the Cohort (`cohort-8`), Week (`3`), and Date controls.
   - Click **Mark Connected** to mark all students currently active on laptops in bulk.
   - Click **Mark All 30 Present** to mark the entire cohort in one click.
   - Type or scan barcode `20250645` in the Single Check-In box and press Enter.
   - Click any student's "Mark Present" / "Mark Absent" button to toggle attendance individually.

