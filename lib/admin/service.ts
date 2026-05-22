import { createClient } from '@/lib/supabase/server'

export interface AdminStats {
  totalUsers: number
  totalBets: number
  totalProfit: number
  totalStaked: number
  pendingBets: number
  wins: number
  losses: number
  winRate: number
  recentUsers: { id: string; email: string; full_name: string | null; created_at: string }[]
  topUsers: { id: string; full_name: string | null; email: string; elo: number; xp: number }[]
  recentActivity: { id: string; event_name: string; user_email: string; profit: number; created_at: string }[]
}

export async function checkAdmin(): Promise<boolean> {
  const supabase = await createClient()
  if (!supabase?.auth) return false
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false
  const { data } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  return data?.role === 'admin'
}

export async function getAdminStats(): Promise<AdminStats | null> {
  const supabase = await createClient()
  if (!supabase?.auth) return null

  const { count: totalUsers } = await supabase.from('profiles').select('*', { count: 'exact', head: true })

  const { data: recentUsers } = await supabase
    .from('profiles')
    .select('id, email, full_name, created_at')
    .order('created_at', { ascending: false })
    .limit(10)

  const { data: topUsers } = await supabase
    .from('profiles')
    .select('id, full_name, email, elo, xp')
    .order('elo', { ascending: false })
    .limit(5)

  const { data: bets } = await supabase.from('betting_history').select('stake, profit, result, event_name, user_id, created_at').order('created_at', { ascending: false }).limit(20)

  const totalBets = bets?.length || 0
  const totalStaked = bets?.reduce((s: number, b: any) => s + Number(b.stake), 0) || 0
  const totalProfit = bets?.reduce((s: number, b: any) => s + Number(b.profit), 0) || 0
  const pendingBets = bets?.filter((b: any) => b.result === 'pending').length || 0
  const wins = bets?.filter((b: any) => b.result === 'win').length || 0
  const losses = bets?.filter((b: any) => b.result === 'loss').length || 0
  const winRate = totalBets > 0 ? Math.round((wins / (wins + losses)) * 100) : 0

  return {
    totalUsers: totalUsers || 0,
    totalBets,
    totalProfit: Math.round(totalProfit * 100) / 100,
    totalStaked: Math.round(totalStaked * 100) / 100,
    pendingBets,
    wins,
    losses,
    winRate,
    recentUsers: (recentUsers || []) as any,
    topUsers: (topUsers || []) as any,
    recentActivity: (bets?.map((b: any) => ({ id: b.id, event_name: b.event_name, user_email: b.user_id, profit: Number(b.profit), created_at: b.created_at })) || []) as any,
  }
}

export async function getAllUsers() {
  const supabase = await createClient()
  if (!supabase?.auth) return []
  const { data } = await supabase
    .from('profiles')
    .select('id, email, full_name, role, elo, xp, streak, created_at')
    .order('created_at', { ascending: false })
    .limit(100)
  return data || []
}

export async function updateUserRole(userId: string, role: string) {
  const supabase = await createClient()
  if (!supabase?.auth) return { error: 'No auth' }
  const { error } = await supabase.from('profiles').update({ role }).eq('id', userId)
  return { error: error?.message || null }
}
