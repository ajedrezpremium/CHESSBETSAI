import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const supabase = await createClient()
  if (!supabase?.auth) return Response.json([])

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json([], { status: 401 })

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') return Response.json([], { status: 403 })

  const { data } = await supabase
    .from('profiles')
    .select('id, email, full_name, role, elo, xp, streak, created_at')
    .order('created_at', { ascending: false })
    .limit(100)

  return Response.json(data || [])
}

export async function PATCH(request: Request) {
  const supabase = await createClient()
  if (!supabase?.auth) return Response.json({ error: 'No auth' }, { status: 401 })

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json({ error: 'No user' }, { status: 401 })

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 })

  const { userId, role } = await request.json()
  if (!userId || !role) return Response.json({ error: 'Missing fields' }, { status: 400 })

  const { error } = await supabase.from('profiles').update({ role }).eq('id', userId)
  if (error) return Response.json({ error: error.message }, { status: 500 })

  return Response.json({ ok: true })
}
