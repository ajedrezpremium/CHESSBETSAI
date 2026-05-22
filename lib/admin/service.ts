import { createClient } from '@/lib/supabase/server'

export interface AdminStats {
  totalUsers: number
  totalBets: number
  totalProfit: number
  totalStaked: number
  pendingBets: number
  recentUsers: { id: string; email: string; created_at: string }[]
}

export async function checkAdmin(): Promise<boolean> {
  const supabase = await createClient()
  if (!supabase?.auth) return false

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false

  const { data } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  return data?.role === 'admin'
}

export async function getAdminStats(): Promise<AdminStats | null> {
  const supabase = await createClient()
  if (!supabase?.auth) return null

  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  const { data: recentUsers } = await supabase
    .from('profiles')
    .select('id, email, created_at')
    .order('created_at', { ascending: false })
    .limit(10)

  const { data: bets } = await supabase
    .from('betting_history')
    .select('stake, profit, result')

  const totalBets = bets?.length || 0
  const totalStaked = bets?.reduce((s: number, b: any) => s + Number(b.stake), 0) || 0
  const totalProfit = bets?.reduce((s: number, b: any) => s + Number(b.profit), 0) || 0
  const pendingBets = bets?.filter((b: any) => b.result === 'pending').length || 0

  return {
    totalUsers: totalUsers || 0,
    totalBets,
    totalProfit: Math.round(totalProfit * 100) / 100,
    totalStaked: Math.round(totalStaked * 100) / 100,
    pendingBets,
    recentUsers: (recentUsers || []) as any,
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
