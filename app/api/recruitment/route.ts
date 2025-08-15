import { NextResponse } from 'next/server';
import { jobOpenings, candidates } from '@/lib/data/recruitment';

export async function GET() {
  try {
    return NextResponse.json({ 
      success: true, 
      data: {
        openings: jobOpenings,
        candidates: candidates
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch recruitment data' },
      { status: 500 }
    );
  }
}