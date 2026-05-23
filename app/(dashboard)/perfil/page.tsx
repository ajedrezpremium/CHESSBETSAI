'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  User, Mail, Calendar, Trophy, Zap, TrendingUp, Target,
  Wallet, ShieldCheck, Swords, BookOpen, Settings, BarChart3,
  PieChart, AlertTriangle, Lightbulb, Download, Sparkles,
  ChevronRight, CheckCircle, XCircle, Clock, Dumbbell,
  Medal, Crown, Coins, Star, Crown as CrownIcon, Lock as LockIcon,
} from 'lucide-react'
import { PLANS } from '@/lib/membership/plans'
import type { PlanTier } from '@/lib/membership/plans'

interface Bet {
  id: string
  event_name: string
  market: string
  selection: string
  odds: number
  stake: number
  result: 'win' | 'loss' | 'pending'
  profit: number
  type: 'demo' | 'real'
  sport: string | null
  created_at: string
}

interface Profile {
  id: string
  email: string | null
  full_name: string | null
  role: string
  elo: number
  xp: number
  streak: number
  created_at: string
  membership_plan: string
  bankroll: number
  max_bankroll: number
}



function MiniChart({ data, color, height = 60 }: { data: number[]; color: string; height?: number }) {
  if (data.length < 2) return null
  const max = Math.max(...data, 1)
  const min = Math.min(...data, 0)
  const range = max - min || 1
  const w = 100 / (data.length - 1)
  const pts = data.map((v, i) => `${i * w},${height - ((v - min) / range) * (height - 10) - 5}`).join(' ')
  return (
    <svg viewBox={`0 0 100 ${height}`} className="w-full" preserveAspectRatio="none">
      <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={pts} />
      <polyline fill={`${color}15`} stroke="none" points={`0,${height} ${pts} 100,${height}`} />
    </svg>
  )
}

function WinPie({ wins, losses }: { wins: number; losses: number }) {
  const total = wins + losses
  if (total === 0) return <div className="text-xs text-zinc-600">Sin datos</div>
  const pct = (wins / total) * 100
  const dash = `${pct} ${100 - pct}`
  return (
    <svg viewBox="0 0 36 36" className="h-20 w-20">
      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#27272a" strokeWidth="2" />
      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#10b981" strokeWidth="2"
        strokeDasharray={dash} strokeLinecap="butt" transform="rotate(-90 18 18)" />
      <text x="18" y="20" textAnchor="middle" fontSize="7" fill="#e4e4e7" fontWeight="bold">{pct.toFixed(0)}%</text>
    </svg>
  )
}

function WeekHeatmap({ bets }: { bets: Bet[] }) {
  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
  const weekData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const dayStr = d.toISOString().slice(0, 10)
    const dayBets = bets.filter(b => b.created_at?.slice(0, 10) === dayStr)
    const wins = dayBets.filter(b => b.result === 'win').length
    const losses = dayBets.filter(b => b.result === 'loss').length
    return { day: days[i], wins, losses, total: dayBets.length }
  })
  const max = Math.max(...weekData.map(d => d.total), 1)
  return (
    <div className="flex gap-1.5">
      {weekData.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <span className="text-[9px] text-zinc-600">{d.day.slice(0, 2)}</span>
          <div className="flex h-12 w-6 flex-col-reverse gap-0.5">
            {d.wins > 0 && <div className="w-full rounded-t bg-emerald-500/60" style={{ height: `${(d.wins / max) * 100}%` }} />}
            {d.losses > 0 && <div className="w-full rounded-t bg-red-500/60" style={{ height: `${(d.losses / max) * 100}%` }} />}
            {d.total === 0 && <div className="w-full rounded bg-zinc-800" style={{ height: '4px' }} />}
          </div>
          <span className="text-[9px] text-zinc-500">{d.total}</span>
        </div>
      ))}
    </div>
  )
}

function RecommendationCard({ type, title, description }: { type: 'success' | 'error' | 'tip'; title: string; description: string }) {
  const colors = {
    success: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: CheckCircle, text: 'text-emerald-400' },
    error: { bg: 'bg-red-500/10', border: 'border-red-500/20', icon: XCircle, text: 'text-red-400' },
    tip: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: Lightbulb, text: 'text-amber-400' },
  }
  const c = colors[type]
  const Icon = c.icon
  return (
    <div className={`flex items-start gap-3 rounded-lg ${c.bg} border ${c.border} p-3`}>
      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${c.text}`} />
      <div>
        <p className="text-xs font-medium text-zinc-200">{title}</p>
        <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
      </div>
    </div>
  )
}

function generateRecommendations(bets: Bet[], winRate: number, roi: number): any[] {
  const recs: any[] = []
  const total = bets.length

  if (total < 10) {
    recs.push({ type: 'tip', title: 'Pocas apuestas registradas', description: 'Registra al menos 20 apuestas para obtener un análisis significativo de tu rendimiento.' })
  }
  if (winRate < 45 && total >= 5) {
    recs.push({ type: 'error', title: 'Win rate bajo', description: 'Tu porcentaje de aciertos está por debajo del 45%. Revisa tu proceso de selección de apuestas y considera reducir el número de operaciones.' })
  }
  if (winRate > 60 && total >= 10) {
    recs.push({ type: 'success', title: 'Win rate sólido', description: 'Mantienes un porcentaje de aciertos saludable. Enfócate en mantener la disciplina.' })
  }
  if (roi < 0 && total >= 5) {
    recs.push({ type: 'error', title: 'ROI negativo', description: 'Estás perdiendo dinero a largo plazo. Reduce stakes y enfócate en detectar solo value bets con EV+ claro.' })
  }
  if (roi > 10 && total >= 10) {
    recs.push({ type: 'success', title: 'ROI positivo', description: 'Excelente rentabilidad. Asegúrate de seguir tu sistema y no desviarte por rachas.' })
  }
  const recentBets = bets.slice(0, 5)
  const recentWins = recentBets.filter(b => b.result === 'win').length
  if (recentWins <= 1 && bets.length >= 5) {
    recs.push({ type: 'error', title: 'Mala racha reciente', description: 'Tus últimas 5 apuestas tienen bajo rendimiento. Toma un descanso y revisa tu estrategia antes de seguir.' })
  }
  if (recentWins >= 4 && bets.length >= 5) {
    recs.push({ type: 'success', title: 'Buena racha', description: 'Excelente momento. Mantén la calma y no aumentes stakes por euforia.' })
  }
  const consejos = [
    { type: 'tip', title: 'Gestión de bankroll', description: 'Nunca apuestes más del 2% de tu bankroll en una sola operación. Usa Kelly Criterion para calcular stakes.' },
    { type: 'tip', title: 'Registro diario', description: 'Lleva un registro detallado de cada apuesta: motivo, stake, resultado. Esto te ayudará a identificar patrones.' },
    { type: 'tip', title: 'Especialización', description: 'Enfócate en 1-2 deportes o ligas donde tengas ventaja informativa sobre el mercado.' },
  ]
  recs.push(consejos[Math.floor(Math.random() * consejos.length)])
  return recs
}

export default function PerfilPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [bets, setBets] = useState<Bet[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'real' | 'demo'>('real')
  const [showAllBets, setShowAllBets] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async (res: any) => { const user = res.data?.user
      if (!user) { router.push('/login'); return }
      const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      const { data: betsData } = await supabase
        .from('betting_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(100)
      setProfile({ ...prof, email: user.email } as Profile)
      setBets(betsData || [])
      setLoading(false)
    })
  }, [router])

  const stats = useMemo(() => {
    const realBets = bets.filter(b => b.type === 'real' || !b.type)
    const demoBets = bets.filter(b => b.type === 'demo')
    const current = tab === 'real' ? realBets : (demoBets.length > 0 ? demoBets : realBets)
    const total = current.length
    const wins = current.filter(b => b.result === 'win').length
    const losses = current.filter(b => b.result === 'loss').length
    const pending = current.filter(b => b.result === 'pending').length
    const winRate = (wins + losses) > 0 ? Math.round((wins / (wins + losses)) * 100) : 0
    const totalStaked = current.reduce((s, b) => s + Number(b.stake), 0)
    const totalProfit = current.reduce((s, b) => s + Number(b.profit), 0)
    const roi = totalStaked > 0 ? Math.round((totalProfit / totalStaked) * 10000) / 100 : 0
    const bestStreak = current.reduce((best: number, b: any) => b.result === 'win' ? best + 1 : 0, 0)
    const worstStreak = current.reduce((worst: number, b: any) => b.result === 'loss' ? worst + 1 : 0, 0)
    const avgStake = total > 0 ? totalStaked / total : 0
    const avgOdds = current.filter(b => b.result !== 'pending').reduce((s, b) => s + Number(b.odds), 0) / Math.max(wins + losses, 1)
    return { total, wins, losses, pending, winRate, totalStaked, totalProfit, roi, bestStreak, worstStreak, avgStake, avgOdds, current }
  }, [bets, tab])

  const profitHistory = useMemo(() => {
    return stats.current
      .filter(b => b.result !== 'pending')
      .reverse()
      .reduce<number[]>((acc, b) => {
        const last = acc.length > 0 ? acc[acc.length - 1] : 0
        acc.push(last + Number(b.profit))
        return acc
      }, [])
  }, [stats.current])

  const recommendations = useMemo(() => generateRecommendations(stats.current, stats.winRate, stats.roi), [stats])

  const plan = useMemo(() => {
    if (!profile) return null
    const tier = (profile.membership_plan as PlanTier) || 'free'
    const cfg = PLANS[tier]
    const nextTier: PlanTier = tier === 'free' ? 'pro' : tier === 'pro' ? 'elite' : 'elite'
    const nextCfg = tier === 'elite' ? null : PLANS[nextTier]
    return { tier, cfg, nextCfg }
  }, [profile])

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="animate-pulse space-y-6">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-2xl bg-zinc-800" />
            <div className="space-y-3">
              <div className="h-6 w-48 rounded bg-zinc-800" />
              <div className="h-4 w-32 rounded bg-zinc-800" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map(i => <div key={i} className="h-24 rounded-xl bg-zinc-800" />)}
          </div>
          <div className="h-64 rounded-xl bg-zinc-800" />
        </div>
      </div>
    )
  }

  if (!profile) return null

  const bankroll = profile.bankroll || 1000
  const bankrollChange = stats.totalProfit

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 text-3xl font-bold text-black shadow-lg shadow-amber-500/20">
            {(profile.full_name || profile.email || 'U')[0].toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-zinc-100">{profile.full_name || 'Usuario'}</h1>
              {profile.role === 'admin' && <ShieldCheck className="h-4 w-4 text-amber-500" />}
            </div>
            <div className="mt-1 flex items-center gap-3 text-sm text-zinc-500">
              <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{profile.email}</span>
              <span className="text-zinc-700">|</span>
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />Miembro desde {new Date(profile.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'short' })}</span>
            </div>
          </div>
        </div>
        <button onClick={() => router.push('/settings')} className="flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-2 text-xs text-zinc-400 hover:bg-zinc-800">
          <Settings className="h-3.5 w-3.5" /> Configuración
        </button>
      </div>

      {/* Membership Plan */}
      {plan && (
        <div className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 ${plan.cfg.color}`}>
                {plan.cfg.tier === 'free' && <Sparkles className="h-5 w-5 text-zinc-400" />}
                {plan.cfg.tier === 'pro' && <Star className="h-5 w-5 text-amber-500" />}
                {plan.cfg.tier === 'elite' && <CrownIcon className="h-5 w-5 text-purple-400" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-zinc-100">Plan {plan.cfg.name}</span>
                  <span className={`rounded px-1.5 py-0.5 text-[10px] ${
                    plan.cfg.tier === 'pro' ? 'bg-amber-500/10 text-amber-500' :
                    plan.cfg.tier === 'elite' ? 'bg-purple-500/10 text-purple-400' :
                    'bg-zinc-800 text-zinc-500'
                  }`}>{plan.cfg.badge}</span>
                </div>
                <p className="mt-0.5 text-xs text-zinc-500">{plan.cfg.price}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {plan.nextCfg && (
                <button
                  onClick={() => router.push('/upgrade')}
                  className="flex items-center gap-1 rounded-lg border border-amber-500/30 px-3 py-1.5 text-xs text-amber-500 hover:bg-amber-500/10"
                >
                  {plan.cfg.tier === 'free' ? <Star className="h-3 w-3" /> : <CrownIcon className="h-3 w-3" />}
                  Mejorar a {plan.nextCfg.name}
                </button>
              )}
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {plan.cfg.features.slice(0, 3).map((f, i) => (
              <span key={i} className="flex items-center gap-1 text-[10px] text-zinc-500">
                <CheckCircle className="h-3 w-3 text-emerald-500" /> {f}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <Trophy className="mb-2 h-5 w-5 text-amber-500" />
          <div className="text-xl font-bold text-zinc-100">{profile.elo}</div>
          <div className="text-xs text-zinc-500">ELO Rating</div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <Zap className="mb-2 h-5 w-5 text-purple-500" />
          <div className="text-xl font-bold text-amber-500">{profile.xp}</div>
          <div className="text-xs text-zinc-500">XP Total</div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <TrendingUp className="mb-2 h-5 w-5 text-emerald-500" />
          <div className="text-xl font-bold text-zinc-100">{profile.streak} días</div>
          <div className="text-xs text-zinc-500">Racha activa</div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <Coins className="mb-2 h-5 w-5 text-blue-500" />
          <div className={`text-xl font-bold ${bankrollChange >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
            {bankroll.toFixed(0)}€
          </div>
          <div className="text-xs text-zinc-500">Bankroll</div>
        </div>
      </div>

      {/* Tabs: Real / Demo */}
      <div className="mb-4 flex items-center gap-2">
        <button
          onClick={() => setTab('real')}
          className={`rounded-lg px-4 py-2 text-xs font-medium transition-colors ${tab === 'real' ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'}`}
        >
          <Swords className="mr-1.5 inline h-3.5 w-3.5" />Reales
        </button>
        <button
          onClick={() => setTab('demo')}
          className={`rounded-lg px-4 py-2 text-xs font-medium transition-colors ${tab === 'demo' ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'}`}
        >
          <Dumbbell className="mr-1.5 inline h-3.5 w-3.5" />Entrenamiento
        </button>
        <span className="text-[10px] text-zinc-600">{stats.total} apuestas</span>
      </div>

      {/* Balance & Charts */}
      <div className="mb-6 grid gap-4 lg:grid-cols-3">
        {/* Balance */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <h3 className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            <Wallet className="h-3.5 w-3.5" /> Balance
          </h3>
          <div className="mb-3">
            <div className="text-2xl font-bold text-zinc-100">{bankroll.toFixed(2)}€</div>
            <div className={`flex items-center gap-1 text-sm ${bankrollChange >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {bankrollChange >= 0 ? '+' : ''}{bankrollChange.toFixed(2)}€
              <span className="text-xs text-zinc-600">({stats.roi}% ROI)</span>
            </div>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-zinc-500">Total apostado</span>
              <span className="text-zinc-300">{stats.totalStaked.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Ganado</span>
              <span className="text-emerald-500">+{stats.wins > 0 ? (stats.totalProfit > 0 ? stats.totalProfit : 0).toFixed(2) : '0.00'}€</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Perdido</span>
              <span className="text-red-500">{stats.losses > 0 ? (stats.totalProfit < 0 ? Math.abs(stats.totalProfit) : 0).toFixed(2) : '0.00'}€</span>
            </div>
          </div>
        </div>

        {/* Win Rate Pie */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <h3 className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            <PieChart className="h-3.5 w-3.5" /> Win Rate
          </h3>
          <div className="flex items-center gap-4">
            <WinPie wins={stats.wins} losses={stats.losses} />
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-zinc-400">Ganadas <span className="text-zinc-200 font-medium">{stats.wins}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <span className="text-zinc-400">Perdidas <span className="text-zinc-200 font-medium">{stats.losses}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-zinc-600" />
                <span className="text-zinc-400">Pendientes <span className="text-zinc-200 font-medium">{stats.pending}</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Profit Evolution */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <h3 className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            <BarChart3 className="h-3.5 w-3.5" /> Evolución
          </h3>
          {profitHistory.length > 0 ? (
            <MiniChart data={profitHistory} color={stats.totalProfit >= 0 ? '#10b981' : '#ef4444'} height={70} />
          ) : (
            <div className="flex h-[70px] items-center justify-center text-xs text-zinc-600">Sin datos</div>
          )}
          <div className="mt-1 flex justify-between text-[10px] text-zinc-600">
            <span>Inicio</span>
            <span>Actual</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-3 text-center">
          <div className="text-sm font-bold text-zinc-100">{stats.avgStake.toFixed(2)}€</div>
          <div className="text-[10px] text-zinc-500">Stake promedio</div>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-3 text-center">
          <div className="text-sm font-bold text-zinc-100">{stats.avgOdds.toFixed(2)}</div>
          <div className="text-[10px] text-zinc-500">Cuota promedio</div>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-3 text-center">
          <div className="text-sm font-bold text-emerald-500">{stats.bestStreak}</div>
          <div className="text-[10px] text-zinc-500">Mejor racha</div>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-3 text-center">
          <div className="text-sm font-bold text-red-500">{stats.worstStreak}</div>
          <div className="text-[10px] text-zinc-500">Peor racha</div>
        </div>
      </div>

      {/* Accesos directos */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button onClick={() => router.push('/academy')} className="flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-2 text-xs text-zinc-400 hover:bg-zinc-800">
          <BookOpen className="h-3.5 w-3.5" /> Ir a Academia
        </button>
        <button onClick={() => router.push('/live')} className="flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-2 text-xs text-zinc-400 hover:bg-zinc-800">
          <TrendingUp className="h-3.5 w-3.5" /> Live Trading
        </button>
        <button onClick={() => router.push('/settings')} className="flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-2 text-xs text-zinc-400 hover:bg-zinc-800">
          <Settings className="h-3.5 w-3.5" /> Configuración Web
        </button>
      </div>

      {/* Recommendations */}
      <div className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
        <h3 className="mb-4 flex items-center gap-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          <Lightbulb className="h-3.5 w-3.5" /> Análisis y Recomendaciones
        </h3>
        <div className="space-y-2">
          {recommendations.map((r, i) => (
            <RecommendationCard key={i} type={r.type} title={r.title} description={r.description} />
          ))}
        </div>
      </div>

      {/* Weekly Heatmap */}
      {stats.current.length > 0 && (
        <div className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <h3 className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            <BarChart3 className="h-3.5 w-3.5" /> Actividad Semanal
          </h3>
          <WeekHeatmap bets={stats.current} />
        </div>
      )}

      {/* Bet History */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            <Clock className="h-3.5 w-3.5" /> Historial de Apuestas
            <span className="ml-2 text-zinc-600">({stats.total})</span>
          </h3>
          {stats.total > 5 && (
            <button onClick={() => setShowAllBets(!showAllBets)} className="text-[10px] text-amber-500 hover:text-amber-400">
              {showAllBets ? 'Mostrar menos' : 'Ver todas'}
            </button>
          )}
        </div>
        {stats.current.length === 0 ? (
          <div className="py-8 text-center text-sm text-zinc-600">
            <Target className="mx-auto mb-2 h-8 w-8 text-zinc-700" />
            No hay apuestas {tab === 'demo' ? 'de entrenamiento' : 'reales'} aún.
          </div>
        ) : (
          <div className="space-y-1.5">
            {(showAllBets ? stats.current : stats.current.slice(0, 5)).map((bet) => (
              <div key={bet.id} className="flex items-center justify-between rounded-lg bg-zinc-800/30 px-4 py-2.5 transition-colors hover:bg-zinc-800/50">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium text-zinc-200">{bet.event_name}</p>
                    {bet.type === 'demo' && <span className="shrink-0 rounded bg-zinc-800 px-1 py-0.5 text-[9px] text-zinc-500">DEMO</span>}
                  </div>
                  <p className="text-xs text-zinc-500">
                    {bet.selection} @ {Number(bet.odds).toFixed(2)} · {Number(bet.stake).toFixed(2)}€
                  </p>
                </div>
                <div className="ml-3 text-right shrink-0">
                  <div className={`text-xs font-medium ${
                    bet.result === 'win' ? 'text-emerald-500' :
                    bet.result === 'loss' ? 'text-red-500' : 'text-zinc-500'
                  }`}>
                    {bet.result === 'win' ? `+${Number(bet.profit).toFixed(2)}€` :
                     bet.result === 'loss' ? `${Number(bet.profit).toFixed(2)}€` : 'Pendiente'}
                  </div>
                  <div className="text-[10px] text-zinc-600">{new Date(bet.created_at).toLocaleDateString('es-ES')}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
