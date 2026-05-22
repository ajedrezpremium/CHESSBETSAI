import { NextResponse } from 'next/server'
import { getOdds } from '@/lib/odds/client'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const sport = searchParams.get('sport') || 'upcoming'
  const regions = searchParams.get('regions') || 'uk,us,eu'

  const key = process.env.ODDS_API_KEY
  if (!key) {
    return NextResponse.json(
      { error: 'ODDS_API_KEY not configured. Get one free at the-odds-api.com' },
      { status: 400 }
    )
  }

  try {
    const data = await getOdds(sport, regions)
    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to fetch odds' },
      { status: 502 }
    )
  }
}
