import { NextResponse } from 'next/server';
import {
  AUTHORIZED_PATRONS,
  getStudentNameByBarcode,
  isPatronWhitelisted,
} from '../../../../../lib/roster';

const VALID_API_KEY = 'dzf_live_85605f3bdd15ab044f0ed52e13f025be11cb60cc3c7187e4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-DZF-API-Key, Authorization',
};

// In-memory attendance ledger: cohortType -> dateKey (YYYY-MM-DD) -> week -> barcode -> Record
const attendanceLedger: Record<
  string,
  Record<
    string,
    Record<
      number,
      Record<
        string,
        {
          attended: boolean;
          name: string;
          markedBy: string;
          markedAt: string;
        }
      >
    >
  >
> = {};

function normalizeDateKey(inputDate?: string): string {
  if (!inputDate) {
    return new Date().toISOString().slice(0, 10);
  }
  const trimmed = String(inputDate).trim();
  if (trimmed.length >= 10) {
    return trimmed.slice(0, 10);
  }
  return new Date().toISOString().slice(0, 10);
}

function verifyApiKey(request: Request): boolean {
  const headerKey =
    request.headers.get('x-dzf-api-key') ||
    request.headers.get('X-DZF-API-Key') ||
    request.headers.get('authorization')?.replace('Bearer ', '');
  return headerKey === VALID_API_KEY;
}

interface RouteParams {
  params: Promise<{ cohortType: string }>;
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(request: Request, context: RouteParams) {
  if (!verifyApiKey(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Invalid or missing X-DZF-API-Key header' },
      { status: 401, headers: corsHeaders }
    );
  }

  try {
    const { cohortType } = await context.params;
    const body = await request.json();

    const dateKey = normalizeDateKey(body.date);
    const weekNum = typeof body.week === 'number' ? body.week : parseInt(body.week || '3', 10) || 3;

    if (!attendanceLedger[cohortType]) {
      attendanceLedger[cohortType] = {};
    }
    if (!attendanceLedger[cohortType][dateKey]) {
      attendanceLedger[cohortType][dateKey] = {};
    }
    if (!attendanceLedger[cohortType][dateKey][weekNum]) {
      attendanceLedger[cohortType][dateKey][weekNum] = {};
    }

    const currentCohortStore = attendanceLedger[cohortType][dateKey][weekNum];
    const nowIso = new Date().toISOString();

    const markedRecords: Array<{
      barcode: string;
      name: string;
      status: string;
      attended: boolean;
    }> = [];
    const unmatchedBarcodes: string[] = [];

    // Mode A: Single Student Check-In (Scanner / Mobile)
    if (body.barcode !== undefined) {
      const barcode = String(body.barcode).trim();
      const attended = body.attended !== false;

      if (isPatronWhitelisted(barcode)) {
        const studentName = getStudentNameByBarcode(barcode);
        currentCohortStore[barcode] = {
          attended,
          name: studentName,
          markedBy: 'API: Academy Instructor',
          markedAt: nowIso,
        };
        markedRecords.push({
          barcode,
          name: studentName,
          status: 'marked',
          attended,
        });
      } else {
        unmatchedBarcodes.push(barcode);
      }
    }

    // Mode B: Bulk Barcode Check-In (Quick Batch)
    if (Array.isArray(body.barcodes)) {
      const attended = body.attended !== false;
      for (const rawBarcode of body.barcodes) {
        const barcode = String(rawBarcode).trim();
        if (isPatronWhitelisted(barcode)) {
          const studentName = getStudentNameByBarcode(barcode);
          currentCohortStore[barcode] = {
            attended,
            name: studentName,
            markedBy: 'API: Academy Instructor',
            markedAt: nowIso,
          };
          markedRecords.push({
            barcode,
            name: studentName,
            status: 'marked',
            attended,
          });
        } else {
          unmatchedBarcodes.push(barcode);
        }
      }
    }

    // Mode C: Detailed Records (Mixed Attendance / Explicit Roster)
    if (Array.isArray(body.records)) {
      for (const rec of body.records) {
        if (!rec || !rec.barcode) continue;
        const barcode = String(rec.barcode).trim();
        const attended = rec.attended !== false;

        if (isPatronWhitelisted(barcode)) {
          const studentName = getStudentNameByBarcode(barcode);
          currentCohortStore[barcode] = {
            attended,
            name: studentName,
            markedBy: 'API: Academy Instructor',
            markedAt: nowIso,
          };
          markedRecords.push({
            barcode,
            name: studentName,
            status: 'marked',
            attended,
          });
        } else {
          unmatchedBarcodes.push(barcode);
        }
      }
    }

    const totalSubmitted = markedRecords.length + unmatchedBarcodes.length;
    const markedCount = markedRecords.length;

    let responseDateIso = `${dateKey}T00:00:00.000Z`;
    try {
      if (body.date) {
        responseDateIso = new Date(body.date).toISOString();
      }
    } catch {
      responseDateIso = `${dateKey}T00:00:00.000Z`;
    }

    return NextResponse.json(
      {
        success: true,
        message: `Successfully processed attendance for ${markedCount} student(s).`,
        cohortType,
        date: responseDateIso,
        week: weekNum,
        totalSubmitted,
        markedCount,
        records: markedRecords,
        unmatched: unmatchedBarcodes,
        markedBy: 'API: Academy Instructor',
      },
      { headers: corsHeaders }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid request payload';
    return NextResponse.json({ success: false, error: message }, { status: 400, headers: corsHeaders });
  }
}

export async function GET(request: Request, context: RouteParams) {
  if (!verifyApiKey(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Invalid or missing X-DZF-API-Key header' },
      { status: 401, headers: corsHeaders }
    );
  }

  try {
    const { cohortType } = await context.params;
    const { searchParams } = new URL(request.url);

    const dateKey = normalizeDateKey(searchParams.get('date') || undefined);
    const weekNum = parseInt(searchParams.get('week') || '3', 10) || 3;

    const recordedCohort = attendanceLedger[cohortType]?.[dateKey]?.[weekNum] || {};

    const students = AUTHORIZED_PATRONS.map((barcode) => {
      const recorded = recordedCohort[barcode];
      const studentName = recorded?.name || getStudentNameByBarcode(barcode);
      const attended = recorded ? Boolean(recorded.attended) : false;
      return {
        barcode,
        name: studentName,
        attended,
        markedBy: recorded?.markedBy || 'API: Academy Instructor',
      };
    });

    const totalStudents = students.length;
    const presentCount = students.filter((s) => s.attended).length;
    const absentCount = totalStudents - presentCount;
    const attendanceRate = totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0;

    return NextResponse.json(
      {
        success: true,
        cohortType,
        date: dateKey,
        week: weekNum,
        totalStudents,
        presentCount,
        absentCount,
        attendanceRate,
        students,
        requester: 'API: Academy Instructor',
      },
      { headers: corsHeaders }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown query error';
    return NextResponse.json({ success: false, error: message }, { status: 400, headers: corsHeaders });
  }
}
