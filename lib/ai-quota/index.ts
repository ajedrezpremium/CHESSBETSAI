import { createClient } from '@/lib/supabase/server'

const DAILY_LIMITS: Record<string, number> = { free: 5, pro: Infinity, elite: Infinity }

export async function checkAiQuota(): Promise<{ allowed: boolean; remaining: number; message?: string }> {
  try {
    const supabase = await createClient()
    if (!supabase?.auth) return { allowed: true, remaining: Infinity }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { allowed: true, remaining: Infinity }

    const { data: profile } = await supabase
      .from('profiles')
      .select('membership_plan, daily_queries, last_query_date')
      .eq('id', user.id)
      .maybeSingle()

    if (!profile) return { allowed: true, remaining: Infinity }

    const limit = DAILY_LIMITS[profile.membership_plan || 'free'] ?? Infinity
    if (!isFinite(limit)) return { allowed: true, remaining: Infinity }

    const today = new Date().toISOString().slice(0, 10)
    const used = profile.last_query_date === today ? (profile.daily_queries || 0) : 0
    const remaining = Math.max(0, limit - used)

    if (remaining <= 0) {
      return { allowed: false, remaining: 0, message: 'Límite diario alcanzado (5 consultas). Actualiza a Pro para ilimitado.' }
    }

    return { allowed: true, remaining }
  } catch {
    return { allowed: true, remaining: Infinity }
  }
}

export async function incrementAiQuota(): Promise<void> {
  try {
    const supabase = await createClient()
    if (!supabase?.auth) return

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const today = new Date().toISOString().slice(0, 10)

    const { data: profile } = await supabase
      .from('profiles')
      .select('daily_queries, last_query_date')
      .eq('id', user.id)
      .maybeSingle()

    const isNewDay = profile?.last_query_date !== today
    const newCount = isNewDay ? 1 : (profile?.daily_queries || 0) + 1

    await supabase.from('profiles').update({ daily_queries: newCount, last_query_date: today }).eq('id', user.id)
  } catch {
    // best-effort
  }
}
