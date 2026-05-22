export interface Sport {
  key: string
  group: string
  title: string
  description: string
  active: boolean
  has_outrights: boolean
}

export interface Outcome {
  name: string
  price: number
}

export interface Market {
  key: string
  last_update: string
  outcomes: Outcome[]
}

export interface Bookmaker {
  key: string
  title: string
  last_update: string
  markets: Market[]
}

export interface OddsEvent {
  id: string
  sport_key: string
  sport_title: string
  commence_time: string
  home_team: string
  away_team: string
  bookmakers: Bookmaker[]
}

export interface ScoreEvent {
  id: string
  sport_key: string
  sport_title: string
  commence_time: string
  home_team: string
  away_team: string
  scores: { name: string; score: string }[] | null
  last_update: string
}

export interface BestOdds {
  home: { price: number; bookmaker: string }
  draw: { price: number; bookmaker: string }
  away: { price: number; bookmaker: string }
}
