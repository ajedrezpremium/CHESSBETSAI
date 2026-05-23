import { StatCard } from '@/components/ui/StatCard'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getDashboardStats, getProfile } from '@/lib/stats/service'
import {
  BookOpen,
  BarChart3,
  TrendingUp,
  Target,
  Zap,
  ChevronRight,
  Trophy,
  Wallet,
  Activity,
  User,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Dashboard — Chess Bets Academy',
  description: 'Resumen de tu actividad: bankroll, ROI, racha, apuestas recientes y estadísticas en vivo.',
}

export default async function Dashboard() {
  const [stats, profile] = await Promise.all([
    getDashboardStats(),
    getProfile(),
  ])

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100">
          {profile?.full_name ? `Bienvenido, ${profile.full_name}` : 'Dashboard'}
        </h1>
        <p className="text-zinc-500">
          {stats
            ? 'Resumen de tu actividad'
            : 'Conecta Supabase y registra apuestas para ver tus estadísticas'}
        </p>
      </div>

      {!stats && (
        <div className="mb-8 rounded-xl border border-amber-500/20 bg-amber-500/5 p-6 text-sm text-zinc-400">
          Ejecuta la migración <code className="rounded bg-zinc-800 px-1">supabase/migrations/00002_betting_history.sql</code> en
          el SQL Editor de Supabase para activar el dashboard.
        </div>
      )}

      {stats && (
        <>
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={Wallet}
              label="Bankroll"
              value={`${stats.bankroll.toFixed(2)} €`}
              color="text-emerald-500"
              sub={stats.totalProfit >= 0 ? `+${stats.totalProfit.toFixed(2)} €` : `${stats.totalProfit.toFixed(2)} €`}
            />
            <StatCard
              icon={TrendingUp}
              label="ROI"
              value={stats.roi > 0 ? `+${stats.roi}%` : `${stats.roi}%`}
              color={stats.roi >= 0 ? 'text-emerald-500' : 'text-red-500'}
              sub={`${stats.wins}W / ${stats.losses}L`}
            />
            <StatCard
              icon={Target}
              label="Win Rate"
              value={`${stats.winRate}%`}
              color="text-blue-500"
              sub={`${stats.totalBets} apuestas totales`}
            />
            <StatCard
              icon={Zap}
              label="Racha Actual"
              value={`${stats.currentStreak}`}
              color={stats.currentStreak > 0 ? 'text-amber-500' : 'text-zinc-500'}
              sub={stats.currentStreak > 0 ? 'victorias consecutivas' : 'sin racha activa'}
            />
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                <Activity className="h-4 w-4" />
                Últimas Apuestas
              </h3>
              {stats.recentBets.length === 0 ? (
                <p className="py-6 text-center text-sm text-zinc-600">
                  No hay apuestas registradas
                </p>
              ) : (
                <div className="space-y-2">
                  {stats.recentBets.slice(0, 5).map((bet) => (
                    <div
                      key={bet.id}
                      className="flex items-center justify-between rounded-lg bg-zinc-800/50 px-3 py-2"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-zinc-200">
                          {bet.event_name}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {bet.selection} @ {Number(bet.odds).toFixed(2)}
                        </p>
                      </div>
                      <div className="ml-3 text-right">
                        <div className="text-xs font-medium text-zinc-400">
                          {Number(bet.stake).toFixed(2)}€
                        </div>
                        <div
                          className={`text-xs font-medium ${
                            bet.result === 'win'
                              ? 'text-emerald-500'
                              : bet.result === 'loss'
                                ? 'text-red-500'
                                : 'text-zinc-500'
                          }`}
                        >
                          {bet.result === 'win'
                            ? `+${Number(bet.profit).toFixed(2)}€`
                            : bet.result === 'loss'
                              ? `${Number(bet.profit).toFixed(2)}€`
                              : 'Pendiente'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                <Trophy className="h-4 w-4" />
                Progreso Academia
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400">ELO</span>
                  <span className="text-lg font-bold text-zinc-100">
                    {profile?.elo ?? 1000}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400">XP</span>
                  <span className="text-lg font-bold text-amber-500">
                    {profile?.xp ?? 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400">Racha de estudio</span>
                  <span className="text-lg font-bold text-zinc-100">
                    {profile?.streak ?? 0} días
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/academy"
          className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-zinc-700"
        >
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-amber-500" />
            <div>
              <div className="font-semibold text-zinc-100">Ir a la Academia</div>
              <div className="text-sm text-zinc-500">Continúa tu formación</div>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-zinc-600 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          href="/live"
          className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-zinc-700"
        >
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-emerald-500" />
            <div>
              <div className="font-semibold text-zinc-100">Live Trading</div>
              <div className="text-sm text-zinc-500">Analiza partidos y detecta value bets</div>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-zinc-600 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          href="/perfil"
          className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-zinc-700"
        >
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-purple-500" />
            <div>
              <div className="font-semibold text-zinc-100">Mi Perfil</div>
              <div className="text-sm text-zinc-500">Estadísticas, historial y logros</div>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-zinc-600 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}
