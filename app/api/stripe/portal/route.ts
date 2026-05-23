import { createClient } from '@/lib/supabase/server'
import { getStripe, createPortal } from '@/lib/stripe/server'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const supabase = await createClient()
    if (!supabase?.auth) return Response.json({ error: 'No auth' }, { status: 401 })

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.redirect(new URL('/login', req.url))

    const { data: profile } = await supabase.from('profiles').select('stripe_customer_id').eq('id', user.id).single()
    if (!profile?.stripe_customer_id) {
      return Response.redirect(new URL('/upgrade', req.url))
    }

    const returnUrl = new URL('/settings', req.url).toString()
    const session = await createPortal(profile.stripe_customer_id, returnUrl)

    return Response.redirect(session.url)
  } catch {
    return Response.redirect(new URL('/settings', req.url))
  }
}
