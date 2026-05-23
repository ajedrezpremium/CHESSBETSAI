import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const supabase = await createClient()
  if (!supabase?.auth) return Response.json([])

  const { data: authData } = await supabase.auth.getUser()
  const user = authData?.user
  if (!user) return Response.json([], { status: 401 })

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') return Response.json([], { status: 403 })

  const { data } = await supabase
    .from('profiles')
    .select('id, email, full_name, role, elo, xp, streak, membership_plan, created_at')
    .order('created_at', { ascending: false })
    .limit(100)

  return Response.json(data || [])
}

async function adminGuard(): Promise<{ supabase: any; user: any } | null> {
  const supabase = await createClient()
  if (!supabase?.auth) return null
  const { data: authData } = await supabase.auth.getUser()
  const user = authData?.user
  if (!user) return null
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') return null
  return { supabase, user }
}

export async function PATCH(request: Request) {
  const ctx = await adminGuard()
  if (!ctx) return Response.json({ error: 'Forbidden' }, { status: 403 })

  const { userId, role, membership_plan } = await request.json()
  const updates: Record<string, string> = {}
  if (role) updates.role = role
  if (membership_plan) updates.membership_plan = membership_plan
  if (!userId || Object.keys(updates).length === 0) return Response.json({ error: 'Missing fields' }, { status: 400 })

  const { error } = await ctx.supabase.from('profiles').update(updates).eq('id', userId)
  if (error) return Response.json({ error: error.message }, { status: 500 })

  return Response.json({ ok: true })
}
