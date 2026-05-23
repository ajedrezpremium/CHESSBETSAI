'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { CheckCircle, X, Crown, Star, Sparkles, Loader } from 'lucide-react'
import { PLANS, type PlanTier } from '@/lib/membership/plans'

export default function UpgradePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentPlan, setCurrentPlan] = useState<PlanTier>('free')
  const [loading, setLoading] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    // Handle return from Stripe Checkout
    const sessionId = searchParams.get('session_id')
    const canceled = searchParams.get('canceled')
    if (sessionId) setMessage('¡Pago confirmado! Tu plan se ha actualizado.')
    if (canceled) setMessage('Pago cancelado. Puedes intentarlo cuando quieras.')
  }, [searchParams])

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async (res: any) => {
      const user = res.data?.user
      if (!user) { router.push('/login'); return }
      const { data } = await supabase.from('profiles').select('membership_plan').eq('id', user.id).single()
      if (data?.membership_plan) setCurrentPlan(data.membership_plan)
    })
  }, [router])

  const handleSelect = async (tier: PlanTier) => {
    if (tier === currentPlan || loading) return

    setLoading(tier)

    if (tier === 'free') {
      const supabase = createClient()
      await supabase.from('profiles').update({ membership_plan: 'free' }).eq('id', (await supabase.auth.getUser()).data.user?.id!)
      setCurrentPlan('free')
      setLoading(null)
      return
    }

    // Stripe Checkout for paid plans
    try {
      const res = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setMessage('Error al iniciar el pago. Intenta de nuevo.')
      }
    } catch {
      setMessage('Error de conexión. Intenta de nuevo.')
    }
    setLoading(null)
  }

  const tiers: PlanTier[] = ['free', 'pro', 'elite']
  const hasSubscription = currentPlan !== 'free'

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10 text-center">
        <Crown className="mx-auto mb-3 h-8 w-8 text-amber-500" />
        <h1 className="text-3xl font-bold text-zinc-100">Planes <span className="text-amber-500">Chess Bets</span></h1>
        <p className="mt-2 text-zinc-500">Elige el plan que mejor se adapte a tu nivel</p>
        {hasSubscription && (
          <a
            href="/api/stripe/portal"
            className="mt-3 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-300 underline underline-offset-4"
          >
            Gestionar suscripción actual
          </a>
        )}
      </div>

      {message && (
        <div className="mb-6 rounded-xl border border-zinc-700 bg-zinc-900/50 px-5 py-3 text-center text-sm text-zinc-300">
          {message}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => {
          const plan = PLANS[tier]
          const isCurrent = currentPlan === tier
          const isPro = tier === 'pro'
          const isLoading = loading === tier

          return (
            <div
              key={tier}
              className={`relative rounded-2xl border p-6 transition-all ${
                isCurrent
                  ? 'border-amber-500 bg-amber-500/5'
                  : isPro
                    ? 'border-amber-500/30 bg-zinc-900/70'
                    : 'border-zinc-800 bg-zinc-900/50'
              }`}
            >
              {isPro && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-3 py-1 text-[10px] font-bold text-black uppercase">
                  Recomendado
                </div>
              )}

              <div className="mb-4 text-center">
                <div className="text-3xl mb-2">{plan.icon}</div>
                <h3 className={`text-lg font-bold ${plan.color}`}>{plan.name}</h3>
                <div className="mt-1 text-2xl font-bold text-zinc-100">{plan.price}</div>
                {tier === 'free' && <div className="text-xs text-zinc-600">Siempre gratis</div>}
              </div>

              <div className="mb-6 space-y-2.5">
                {plan.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span className="text-xs text-zinc-300">{f}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleSelect(tier)}
                disabled={isCurrent || !!loading}
                className={`w-full rounded-xl py-3 text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  isCurrent
                    ? 'bg-zinc-800 text-zinc-500 cursor-default'
                    : tier === 'free'
                      ? 'border border-zinc-700 text-zinc-300 hover:bg-zinc-800'
                      : 'bg-amber-500 text-black hover:bg-amber-400 disabled:opacity-60'
                }`}
              >
                {isLoading && <Loader className="h-4 w-4 animate-spin" />}
                {isLoading ? 'Redirigiendo a pago...' : isCurrent ? 'Plan Actual' : tier === 'free' ? 'Downgrade a Free' : 'Suscribirse'}
              </button>
            </div>
          )
        })}
      </div>

      <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h3 className="mb-3 text-sm font-semibold text-zinc-200">Comparativa de Planes</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="px-4 py-3 text-left text-zinc-400">Feature</th>
                {tiers.map((t) => (
                  <th key={t} className={`px-4 py-3 text-center ${PLANS[t].color}`}>{PLANS[t].name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Grados disponibles', values: ['1-5', '1-10', '1-10'] },
                { label: 'IA', values: ['Básica', 'Avanzada', 'Full'] },
                { label: 'Consultas IA/día', values: ['5', 'Ilimitadas', 'Ilimitadas'] },
                { label: 'Alertas value bets', values: ['No', '✓', '✓'] },
                { label: 'API Access', values: ['No', 'No', '✓'] },
                { label: 'Webinars en vivo', values: ['No', 'No', '✓'] },
                { label: 'Soporte', values: ['Email', 'Prioritario', '24/7'] },
              ].map((row, i) => (
                <tr key={i} className="border-b border-zinc-800/50">
                  <td className="px-4 py-3 text-zinc-300">{row.label}</td>
                  {row.values.map((v, j) => (
                    <td key={j} className="px-4 py-3 text-center text-zinc-500">
                      {v === '✓' ? <CheckCircle className="mx-auto h-4 w-4 text-emerald-500" /> :
                       v === 'No' ? <X className="mx-auto h-4 w-4 text-zinc-600" /> : v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
