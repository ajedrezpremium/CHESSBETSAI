import { createClient } from '@/lib/supabase/server'

export interface DashboardStats {
  totalBets: number
  wins: number
  losses: number
  pending: number
  winRate: number
  totalStaked: number
  totalProfit: number
  roi: number
  bankroll: number
  currentStreak: number
  recentBets: BetRecord[]
}

export interface BetRecord {
  id: string
  event_name: string
  market: string
  selection: string
  odds: number
  stake: number
  result: 'win' | 'loss' | 'pending'
  profit: number
  sport: string | null
  created_at: string
}

export interface UserProfile {
  elo: number
  xp: number
  streak: number
  full_name: string | null
}

export async function getProfile(): Promise<UserProfile | null> {
  const supabase = await createClient()
  if (!supabase?.auth) return null

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('profiles')
    .select('elo, xp, streak, full_name')
    .eq('id', user.id)
    .single()

  return data
}

export async function getDashboardStats(): Promise<DashboardStats | null> {
  const supabase = await createClient()
  if (!supabase?.auth) return null

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: bets } = await supabase
    .from('betting_history')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50)

  if (!bets) {
    return {
      totalBets: 0, wins: 0, losses: 0, pending: 0,
      winRate: 0, totalStaked: 0, totalProfit: 0, roi: 0,
      bankroll: 1000, currentStreak: 0, recentBets: [],
    }
  }

  const totalBets = bets.length
  const wins = bets.filter((b: any) => b.result === 'win').length
  const losses = bets.filter((b: any) => b.result === 'loss').length
  const pending = bets.filter((b: any) => b.result === 'pending').length
  const winRate = totalBets > 0 ? Math.round((wins / (wins + losses)) * 100) : 0
  const totalStaked = bets.reduce((sum: number, b: any) => sum + Number(b.stake), 0)
  const totalProfit = bets.reduce((sum: number, b: any) => sum + Number(b.profit), 0)

  // Calculate streak from most recent results
  let streak = 0
  const completedBets = bets.filter((b: any) => b.result !== 'pending')
  for (const bet of completedBets) {
    if (bet.result === 'win') streak++
    else break
  }

  const bankroll = 1000 + totalProfit

  return {
    totalBets, wins, losses, pending, winRate,
    totalStaked: Math.round(totalStaked * 100) / 100,
    totalProfit: Math.round(totalProfit * 100) / 100,
    roi: totalStaked > 0 ? Math.round((totalProfit / totalStaked) * 10000) / 100 : 0,
    bankroll: Math.round(bankroll * 100) / 100,
    currentStreak: streak,
    recentBets: bets.slice(0, 10) as BetRecord[],
  }
}
