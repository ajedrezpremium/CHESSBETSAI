import { createClient } from '@/lib/supabase/server'
import { getStripe, getPriceId, createCheckout } from '@/lib/stripe/server'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    if (!supabase?.auth) return Response.json({ error: 'No auth' }, { status: 401 })

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    const { tier } = await req.json()
    if (!tier || !['pro', 'elite'].includes(tier)) {
      return Response.json({ error: 'Invalid tier' }, { status: 400 })
    }

    // Get or create Stripe customer
    const { data: profile } = await supabase.from('profiles').select('stripe_customer_id').eq('id', user.id).single()
    let customerId = profile?.stripe_customer_id || null

    if (!customerId) {
      const customer = await getStripe().customers.create({
        email: user.email,
        metadata: { userId: user.id },
      })
      customerId = customer.id
      await supabase.from('profiles').update({ stripe_customer_id: customerId }).eq('id', user.id)
    }

    const priceId = getPriceId(tier)
    const returnUrl = new URL(req.headers.get('referer') || 'http://localhost:3000/upgrade')
    const session = await createCheckout(customerId, priceId, user.id, returnUrl.origin + '/upgrade')

    return Response.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return Response.json({ error: 'Failed to create checkout' }, { status: 500 })
  }
}
