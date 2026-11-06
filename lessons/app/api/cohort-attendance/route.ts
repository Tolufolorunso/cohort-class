import { NextResponse } from 'next/server';

const VALID_API_KEY = 'dzf_live_85605f3bdd15ab044f0ed52e13f025be11cb60cc3c7187e4';

// Helper proxy if external clients or frontends hit /api/cohort-attendance
export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cohortType = searchParams.get('cohortType') || 'cohort-8';
    const body = await request.json();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://dzf-cohorts.vercel.app';
    const remoteUrl = `${baseUrl}/api/cohorts/${cohortType}/attendance`;

    // Try fetching the remote/local cohorts endpoint
    const res = await fetch(remoteUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-DZF-API-Key': VALID_API_KEY,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Proxy forwarding error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cohortType = searchParams.get('cohortType') || 'cohort-8';
    const date = searchParams.get('date') || new Date().toISOString().slice(0, 10);
    const week = searchParams.get('week') || '3';

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://dzf-cohorts.vercel.app';
    const remoteUrl = `${baseUrl}/api/cohorts/${cohortType}/attendance?date=${date}&week=${week}`;

    const res = await fetch(remoteUrl, {
      headers: {
        'X-DZF-API-Key': VALID_API_KEY,
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Proxy forwarding error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

