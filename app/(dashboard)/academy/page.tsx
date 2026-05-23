'use client'

import { useState, useEffect } from 'react'
import { GradoCard } from '@/components/academy/GradoCard'
import { gradosData } from '@/lib/academy/content'
import { createClient } from '@/lib/supabase/client'
import { Crown, Star, Lock } from 'lucide-react'
import Link from 'next/link'
import { PLANS } from '@/lib/membership/plans'
import type { PlanTier } from '@/lib/membership/plans'

export default function AcademyPage() {
  const [plan, setPlan] = useState<PlanTier>('free')

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async (res: any) => {
      const user = res.data?.user
      if (!user) return
      const { data } = await supabase.from('profiles').select('membership_plan').eq('id', user.id).single()
      if (data?.membership_plan) setPlan(data.membership_plan)
    })
  }, [])

  const cfg = PLANS[plan]
  const locked = plan === 'free'
  const upgrades = plan !== 'elite'

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/50 px-3 py-1 text-xs text-zinc-400">
          🎓 Chess Bets Academy
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-100">
              Los 10 Grados{' '}<span className="text-amber-500">Chess Bets</span>
            </h1>
            <p className="mt-2 text-zinc-500">Sistema de progresión tipo cinturones. Cada grado desbloquea lecciones, simuladores y certificaciones.</p>
          </div>
          <div className={`hidden rounded-lg border px-3 py-2 text-xs sm:flex items-center gap-2 ${cfg.color.includes('amber') ? 'border-amber-500/30' : 'border-zinc-700'}`}>
            {plan === 'free' && <Lock className="h-3.5 w-3.5 text-zinc-500" />}
            {plan === 'pro' && <Star className="h-3.5 w-3.5 text-amber-500" />}
            {plan === 'elite' && <Crown className="h-3.5 w-3.5 text-purple-400" />}
            Plan {cfg.name} · {cfg.price}
          </div>
        </div>
      </div>

      {locked && (
        <div className="mb-6 flex items-center justify-between rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
          <div>
            <p className="text-sm font-medium text-zinc-200">Plan Free — Grados 1 a 5 disponibles</p>
            <p className="text-xs text-zinc-500">Actualiza a Pro para acceder a los 10 Grados completos</p>
          </div>
          <Link href="/upgrade" className="flex items-center gap-1 rounded-lg bg-amber-500 px-4 py-2 text-xs font-medium text-black hover:bg-amber-400">
            <Star className="h-3.5 w-3.5" /> Actualizar
          </Link>
        </div>
      )}

      <div className="grid gap-4">
        {gradosData.map((grado, i) => {
          const isLocked = locked && grado.id > 5
          return (
            <div key={grado.id} className="relative">
              {isLocked && (
                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-black/60 backdrop-blur-[1px]">
                  <Link href="/upgrade" className="flex flex-col items-center gap-2 text-center">
                    <Lock className="h-6 w-6 text-amber-500" />
                    <span className="text-xs font-medium text-zinc-300">Disponible en Pro</span>
                    <span className="rounded-lg bg-amber-500 px-3 py-1 text-xs font-medium text-black">Ver Planes</span>
                  </Link>
                </div>
              )}
              <GradoCard key={grado.id} grado={grado} index={i} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
