import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const supabase = await createClient()
  if (!supabase?.auth) return Response.json({ error: 'No auth' }, { status: 401 })
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const url = new URL(req.url)
  const sort = url.searchParams.get('sort') || 'elo'
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '50'), 100)

  const orderMap: Record<string, { column: string; ascending: boolean }> = {
    elo: { column: 'elo', ascending: false },
    xp: { column: 'xp', ascending: false },
    streak: { column: 'streak', ascending: false },
    win_rate: { column: 'win_rate', ascending: false },
  }

  const order = orderMap[sort] || orderMap.elo

  const { data, count } = await supabase
    .from('profiles')
    .select('id, full_name, email, elo, xp, streak, membership_plan, created_at', { count: 'exact', head: false })
    .not('full_name', 'is', null)
    .order(order.column, { ascending: order.ascending })
    .limit(limit)

  const ranked = (data || []).map((p: any, i: number) => ({
    rank: i + 1,
    id: p.id,
    name: p.full_name || p.email?.split('@')[0] || 'Anónimo',
    elo: p.elo || 1000,
    xp: p.xp || 0,
    streak: p.streak || 0,
    plan: p.membership_plan || 'free',
    created_at: p.created_at,
  }))

  // Include current user's rank
  const userRank = ranked.findIndex((r: any) => r.id === user.id) + 1

  return Response.json({ data: ranked, total: count, userRank: userRank || null })
}
