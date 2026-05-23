import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe() {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2026-04-22.dahlia' as any,
      typescript: true,
    })
  }
  return _stripe
}

export function getPriceId(tier: 'pro' | 'elite'): string {
  return tier === 'elite' ? process.env.STRIPE_PRICE_ELITE! : process.env.STRIPE_PRICE_PRO!
}

export async function createCheckout(customerId: string | null, priceId: string, userId: string, returnUrl: string) {
  const s = getStripe()
  return s.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    customer: customerId || undefined,
    client_reference_id: userId,
    metadata: { userId },
    success_url: `${returnUrl}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${returnUrl}?canceled=true`,
  })
}

export async function createPortal(customerId: string, returnUrl: string) {
  return getStripe().billingPortal.sessions.create({ customer: customerId, return_url: returnUrl })
}

