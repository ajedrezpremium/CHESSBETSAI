import { createClient } from '@/lib/supabase/server'
import { removeSubscription } from '@/lib/push'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const supabase = await createClient()
  if (!supabase?.auth) return Response.json({ error: 'No auth' }, { status: 401 })
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  await removeSubscription(user.id)
  return Response.json({ ok: true })
}
