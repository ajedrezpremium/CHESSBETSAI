'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ChevronRight, Sparkles, BookOpen, Swords, Trophy, Zap, BarChart3 } from 'lucide-react'

export default function OnboardingModal() {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [step, setStep] = useState(0)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async (res: any) => {
      const user = res.data?.user
      if (!user) { setChecking(false); return }
      const { data: profile } = await supabase.from('profiles').select('xp, created_at').eq('id', user.id).single()
      // Show onboarding if new user (0 XP) AND account created in last 24h
      if (profile && (profile.xp || 0) === 0) {
        const created = new Date(profile.created_at || Date.now())
        const ago = (Date.now() - created.getTime()) / 3600000
        if (ago < 24) setShow(true)
      }
      setChecking(false)
    })
  }, [])

  const steps = [
    {
      icon: <Sparkles className="h-8 w-8 text-amber-500" />,
      title: 'Bienvenido a Chess Bets Academy',
      desc: 'La plataforma definitiva para convertirte en un trader deportivo profesional con ayuda de IA.',
    },
    {
      icon: <BookOpen className="h-8 w-8 text-amber-500" />,
      title: '1. Aprende con los Grados',
      desc: '10 grados tipo cinturón con 29 lecciones interactivas. Cada grado incluye lecciones teóricas, ejemplos prácticos y un quiz final para ganar XP.',
      link: { href: '/academy', label: 'Ir a la Academia →' },
    },
    {
      icon: <Swords className="h-8 w-8 text-amber-500" />,
      title: '2. Registra tus Apuestas',
      desc: 'Lleva un historial completo de todas tus apuestas, separa las reales de las de práctica, y obtén estadísticas detalladas de tu rendimiento.',
      link: { href: '/apuestas', label: 'Registrar Apuesta →' },
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-amber-500" />,
      title: '3. Analiza tu Perfil',
      desc: 'Tu perfil muestra tu evolución: bankroll, ELO, XP, win rate, ROI, heatmap semanal y recomendaciones personalizadas por IA.',
      link: { href: '/perfil', label: 'Ver mi Perfil →' },
    },
    {
      icon: <Trophy className="h-8 w-8 text-amber-500" />,
      title: '4. Consigue Certificaciones',
      desc: 'Completa todos los quizzes de un grado para obtener un certificado premium descargable. ¡Demuestra tu nivel!',
      link: { href: '/academy', label: 'Ver Grados →' },
    },
    {
      icon: <Zap className="h-8 w-8 text-amber-500" />,
      title: '5. Usa la IA',
      desc: 'El agente IA conoce tu bankroll, ELO e historial. Pregúntale cualquier cosa sobre cuotas, estrategias o análisis en vivo.',
      link: { href: '/live', label: 'Live Trading con IA →' },
    },
  ]

  const dismiss = () => {
    setShow(false)
    localStorage.setItem('onboarding_done', 'true')
  }

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1); else dismiss()
  }

  if (checking || !show) return null

  const s = steps[step]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
        <div className="mb-4 flex justify-center">{s.icon}</div>
        <h2 className="mb-2 text-xl font-bold text-zinc-100">{s.title}</h2>
        <p className="mb-6 text-sm text-zinc-500 leading-relaxed">{s.desc}</p>

        {s.link && (
          <a href={s.link.href} onClick={dismiss}
            className="mb-4 inline-flex items-center gap-1 text-sm text-amber-500 hover:text-amber-400 underline underline-offset-4">
            {s.link.label}
          </a>
        )}

        <div className="mb-6 flex justify-center gap-1.5">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 w-6 rounded-full transition-colors ${i === step ? 'bg-amber-500' : 'bg-zinc-800'}`} />
          ))}
        </div>

        <div className="flex gap-3">
          <button onClick={dismiss} className="flex-1 rounded-xl border border-zinc-700 py-2.5 text-sm text-zinc-400 hover:bg-zinc-800">
            Saltar
          </button>
          <button onClick={next} className="flex-1 rounded-xl bg-amber-500 py-2.5 text-sm font-medium text-black hover:bg-amber-400 flex items-center justify-center gap-1">
            {step < steps.length - 1 ? 'Siguiente' : '¡Empezar!'} <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
