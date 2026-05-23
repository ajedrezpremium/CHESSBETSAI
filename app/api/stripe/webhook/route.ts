import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-04-22.dahlia' as any, typescript: true })
}

function getAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature')
  if (!sig) return Response.json({ error: 'No signature' }, { status: 400 })

  const body = await req.text()
  const stripe = getStripe()

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return Response.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabaseAdmin = getAdmin()

  const handleSubscription = async (subscription: any) => {
    const customerId = subscription.customer as string
    const subId = subscription.id as string
    const status = subscription.status as string
    const priceId = subscription.items?.data?.[0]?.price?.id as string | undefined
    const endsAt = subscription.cancel_at || subscription.ended_at || null

    let plan = 'free'
    if (priceId === process.env.STRIPE_PRICE_PRO) plan = 'pro'
    else if (priceId === process.env.STRIPE_PRICE_ELITE) plan = 'elite'

    const subStatus = ['active', 'past_due', 'canceled', 'incomplete'].includes(status) ? status : 'inactive'

    await supabaseAdmin
      .from('profiles')
      .update({
        membership_plan: subStatus === 'active' ? plan : 'free',
        stripe_subscription_id: subId,
        subscription_status: subStatus,
        subscription_ends_at: endsAt,
      })
      .eq('stripe_customer_id', customerId)
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any
        const userId = session.metadata?.userId
        if (userId) {
          await supabaseAdmin
            .from('profiles')
            .update({ stripe_customer_id: session.customer })
            .eq('id', userId)
        }
        break
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await handleSubscription(event.data.object)
        break
    }
    return Response.json({ received: true })
  } catch (err) {
    console.error('Webhook error:', err)
    return Response.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
