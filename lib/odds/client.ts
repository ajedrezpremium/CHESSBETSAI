const BASE = 'https://api.the-odds-api.com/v4'

function getKey(): string {
  const key = process.env.ODDS_API_KEY
  if (!key) throw new Error('Missing ODDS_API_KEY env var')
  return key
}

export async function getSports(): Promise<import('./types').Sport[]> {
  const res = await fetch(`${BASE}/sports?apiKey=${getKey()}`)
  if (!res.ok) throw new Error(`Odds API error: ${res.status}`)
  return res.json()
}

export async function getOdds(
  sport: string = 'upcoming',
  regions: string = 'uk,us,eu'
): Promise<import('./types').OddsEvent[]> {
  const res = await fetch(
    `${BASE}/sports/${sport}/odds?apiKey=${getKey()}&regions=${regions}&markets=h2h&oddsFormat=decimal`
  )
  if (!res.ok) throw new Error(`Odds API error: ${res.status}`)
  return res.json()
}

export async function getScores(
  sport: string = 'upcoming',
  daysFrom: number = 1
): Promise<import('./types').ScoreEvent[]> {
  const res = await fetch(
    `${BASE}/sports/${sport}/scores?apiKey=${getKey()}&daysFrom=${daysFrom}`
  )
  if (!res.ok) throw new Error(`Odds API error: ${res.status}`)
  return res.json()
}
