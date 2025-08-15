import { NextResponse } from 'next/server';
import { kpis, salesData, teamDirectory } from '@/lib/data/dashboard';

export async function GET() {
  try {
    return NextResponse.json({ 
      success: true, 
      data: {
        kpis,
        salesData,
        teamDirectory
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}