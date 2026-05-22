import type { OddsEvent, BestOdds } from './types'

export function getBestOdds(event: OddsEvent): BestOdds | null {
  const h2hMarkets = event.bookmakers
    .map((b) => ({
      bookmaker: b.title,
      outcomes: b.markets.find((m) => m.key === 'h2h')?.outcomes || [],
    }))
    .filter((m) => m.outcomes.length === 3)

  if (h2hMarkets.length === 0) return null

  const homeTeam = event.home_team
  const awayTeam = event.away_team

  const best = { home: 0, draw: 0, away: 0 }
  const bookies = { home: '', draw: '', away: '' }

  for (const { bookmaker, outcomes } of h2hMarkets) {
    for (const o of outcomes) {
      if (o.name === homeTeam && o.price > best.home) {
        best.home = o.price
        bookies.home = bookmaker
      } else if (o.name === awayTeam && o.price > best.away) {
        best.away = o.price
        bookies.away = bookmaker
      } else if (o.name === 'Draw' && o.price > best.draw) {
        best.draw = o.price
        bookies.draw = bookmaker
      }
    }
  }

  return {
    home: { price: best.home, bookmaker: bookies.home },
    draw: { price: best.draw, bookmaker: bookies.draw },
    away: { price: best.away, bookmaker: bookies.away },
  }
}

export function impliedProbability(decimalOdds: number): number {
  return 1 / decimalOdds
}

export function detectValueBet(
  bestOdds: BestOdds,
  homeTeam: string,
  awayTeam: string,
  homeProb: number,
  drawProb: number,
  awayProb: number
): { outcome: string; ev: number; price: number; bookmaker: string }[] {
  const values: { outcome: string; ev: number; price: number; bookmaker: string }[] = []

  const checks = [
    { name: homeTeam, prob: homeProb, odds: bestOdds.home },
    { name: 'Draw', prob: drawProb, odds: bestOdds.draw },
    { name: awayTeam, prob: awayProb, odds: bestOdds.away },
  ]

  for (const check of checks) {
    if (!check.name || !check.odds.price) continue
    const ev = (check.prob * check.odds.price) - 1
    if (ev > 0.05) {
      values.push({
        outcome: check.name,
        ev: Math.round(ev * 10000) / 100,
        price: check.odds.price,
        bookmaker: check.odds.bookmaker,
      })
    }
  }

  return values
}
