'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Trophy, Medal, TrendingUp, Zap, Crown, Star, Sparkles, Swords, ChevronRight, Loader } from 'lucide-react'

interface RankedUser {
  rank: number
  id: string
  name: string
  elo: number
  xp: number
  streak: number
  plan: string
}

type SortKey = 'elo' | 'xp' | 'streak'

const SORT_CONFIG: Record<SortKey, { label: string; icon: any; description: string }> = {
  elo: { label: 'ELO', icon: Trophy, description: 'Ranking por habilidad' },
  xp: { label: 'XP', icon: Zap, description: 'Ranking por experiencia' },
  streak: { label: 'Racha', icon: TrendingUp, description: 'Racha de estudio más larga' },
}

export default function LeaderboardPage() {
  const router = useRouter()
  const [users, setUsers] = useState<RankedUser[]>([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState<SortKey>('elo')
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [userRank, setUserRank] = useState<number | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async (res: any) => {
      const user = res.data?.user
      if (!user) { router.push('/login'); return }
      setCurrentUserId(user.id)
      fetchLeaderboard(sort)
    })
  }, [router])

  useEffect(() => { if (currentUserId) fetchLeaderboard(sort) }, [sort])

  const fetchLeaderboard = async (s: SortKey) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/leaderboard?sort=${s}&limit=50`)
      const data = await res.json()
      setUsers(data.data || [])
      setUserRank(data.userRank)
    } catch {}
    setLoading(false)
  }

  const planIcon = (plan: string) => {
    if (plan === 'elite') return <Crown className="h-3.5 w-3.5 text-purple-400" />
    if (plan === 'pro') return <Star className="h-3.5 w-3.5 text-amber-500" />
    return null
  }

  const rankDisplay = (rank: number) => {
    if (rank === 1) return <Medal className="h-5 w-5 text-amber-500" />
    if (rank === 2) return <Medal className="h-5 w-5 text-zinc-400" />
    if (rank === 3) return <Medal className="h-5 w-5 text-amber-700" />
    return <span className="w-5 text-center text-sm text-zinc-600">{rank}</span>
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/50 px-3 py-1 text-xs text-zinc-400">
            <Swords className="h-3 w-3" /> Comunidad
          </div>
          <h1 className="text-3xl font-bold text-zinc-100">
            Clasificación <span className="text-amber-500">Global</span>
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            {users.length} traders compitiendo{userRank ? ` · Tu puesto: #${userRank}` : ''}
          </p>
        </div>
      </div>

      {/* Sort tabs */}
      <div className="mb-6 flex gap-2">
        {(Object.entries(SORT_CONFIG) as [SortKey, typeof SORT_CONFIG[SortKey]][]).map(([key, cfg]) => {
          const Icon = cfg.icon
          return (
            <button key={key} onClick={() => setSort(key)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                sort === key ? 'bg-amber-500 text-black' : 'border border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300'
              }`}>
              <Icon className="h-4 w-4" /> {cfg.label}
            </button>
          )
        })}
      </div>

      {/* Leaderboard */}
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-14 animate-pulse rounded-xl bg-zinc-900/50" />
          ))}
        </div>
      ) : users.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-10 text-center text-sm text-zinc-500">
          No hay traders en el ranking todavía
        </div>
      ) : (
        <div className="space-y-1.5">
          {/* Header */}
          <div className="flex items-center gap-3 rounded-xl px-4 py-2 text-xs text-zinc-600 uppercase tracking-wider">
            <span className="w-8 text-center">#</span>
            <span className="flex-1">Trader</span>
            <span className="w-20 text-right">{sort === 'elo' ? 'ELO' : sort === 'xp' ? 'XP' : 'Racha'}</span>
            <span className="w-16 text-right hidden sm:block">Plan</span>
          </div>

          {users.map((u) => {
            const isMe = u.id === currentUserId
            return (
              <div key={u.id}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                  isMe ? 'border-amber-500/30 bg-amber-500/5' : 'border-zinc-800/50 bg-zinc-900/30 hover:bg-zinc-900/60'
                }`}>
                <div className="flex w-8 items-center justify-center">{rankDisplay(u.rank)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`truncate text-sm font-medium ${isMe ? 'text-amber-400' : 'text-zinc-200'}`}>
                      {u.name}
                    </span>
                    {isMe && <span className="shrink-0 rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] text-amber-500">TÚ</span>}
                  </div>
                  <p className="text-[10px] text-zinc-600">ID: {u.id.slice(0, 8)}</p>
                </div>

                <div className="w-20 text-right">
                  <span className={`text-sm font-bold ${sort === 'elo' ? 'text-amber-500' : sort === 'xp' ? 'text-blue-500' : 'text-emerald-500'}`}>
                    {sort === 'elo' ? u.elo : sort === 'xp' ? u.xp : `${u.streak}d`}
                  </span>
                </div>

                <div className="hidden w-16 items-center justify-end gap-1 sm:flex">
                  {planIcon(u.plan)}
                  <span className={`text-[10px] capitalize ${u.plan === 'elite' ? 'text-purple-400' : u.plan === 'pro' ? 'text-amber-500' : 'text-zinc-600'}`}>
                    {u.plan}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Legend */}
      <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">¿Cómo subir en el ranking?</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="flex items-start gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-xs font-bold text-amber-500">1</div>
            <p className="text-xs text-zinc-400">Completa lecciones en la <span className="text-zinc-200">Academia</span> para ganar XP y ELO</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-xs font-bold text-amber-500">2</div>
            <p className="text-xs text-zinc-400">Mantén una racha de estudio diaria para acumular <span className="text-zinc-200">streak</span></p>
          </div>
          <div className="flex items-start gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-xs font-bold text-amber-500">3</div>
            <p className="text-xs text-zinc-400">Actualiza a <span className="text-amber-500">Pro</span> o <span className="text-purple-400">Elite</span> para desbloquear todo el potencial</p>
          </div>
        </div>
      </div>
    </div>
  )
}
