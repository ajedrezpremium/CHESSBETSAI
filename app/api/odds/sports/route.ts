import { NextResponse } from 'next/server'
import { getSports } from '@/lib/odds/client'

export async function GET() {
  const key = process.env.ODDS_API_KEY
  if (!key) {
    return NextResponse.json(
      { error: 'ODDS_API_KEY not configured' },
      { status: 400 }
    )
  }

  try {
    const data = await getSports()
    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to fetch sports' },
      { status: 502 }
    )
  }
}
