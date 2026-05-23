import { createClient } from '@/lib/supabase/server'
import { saveSubscription } from '@/lib/push'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const supabase = await createClient()
  if (!supabase?.auth) return Response.json({ error: 'No auth' }, { status: 401 })
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { subscription } = await req.json()
  if (!subscription?.endpoint || !subscription?.keys) {
    return Response.json({ error: 'Invalid subscription' }, { status: 400 })
  }

  const ok = await saveSubscription(user.id, subscription)
  return Response.json({ ok })
}
