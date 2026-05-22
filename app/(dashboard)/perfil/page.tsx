import { getProfile } from '@/lib/profile/service'
import { getDashboardStats } from '@/lib/stats/service'
import { redirect } from 'next/navigation'
import {
  User,
  Mail,
  Calendar,
  Trophy,
  Zap,
  TrendingUp,
  Target,
  Wallet,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

export default async function PerfilPage() {
  const [profile, stats] = await Promise.all([
    getProfile(),
    getDashboardStats(),
  ])

  if (!profile) {
    redirect('/auth/login')
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 flex items-center gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 text-3xl font-bold text-black">
          {(profile.full_name || profile.email || 'U')[0].toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">
            {profile.full_name || 'Usuario'}
          </h1>
          <div className="mt-1 flex items-center gap-1 text-sm text-zinc-500">
            <Mail className="h-3.5 w-3.5" />
            {profile.email}
          </div>
          <div className="mt-1 flex items-center gap-1 text-xs text-zinc-600">
            <Calendar className="h-3 w-3" />
            Miembro desde{' '}
            {new Date(profile.created_at).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
            })}
          </div>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-center">
          <Trophy className="mx-auto mb-1 h-5 w-5 text-amber-500" />
          <div className="text-xl font-bold text-zinc-100">{profile.elo}</div>
          <div className="text-xs text-zinc-500">ELO</div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-center">
          <Zap className="mx-auto mb-1 h-5 w-5 text-purple-500" />
          <div className="text-xl font-bold text-amber-500">{profile.xp}</div>
          <div className="text-xs text-zinc-500">XP</div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-center">
          <TrendingUp className="mx-auto mb-1 h-5 w-5 text-emerald-500" />
          <div className="text-xl font-bold text-zinc-100">
            {profile.streak} días
          </div>
          <div className="text-xs text-zinc-500">Racha</div>
        </div>
      </div>

      {stats && (
        <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <h3 className="mb-4 text-sm font-semibold text-zinc-400 uppercase tracking-wider">
            Estadísticas de Apuestas
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <div className="text-xs text-zinc-500">Total Apuestas</div>
              <div className="text-lg font-bold text-zinc-100">
                {stats.totalBets}
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-500">Win Rate</div>
              <div className="text-lg font-bold text-zinc-100">
                {stats.winRate}%
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-500">ROI</div>
              <div
                className={`text-lg font-bold ${
                  stats.roi >= 0 ? 'text-emerald-500' : 'text-red-500'
                }`}
              >
                {stats.roi > 0 ? '+' : ''}
                {stats.roi}%
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-500">Profit</div>
              <div
                className={`text-lg font-bold ${
                  stats.totalProfit >= 0
                    ? 'text-emerald-500'
                    : 'text-red-500'
                }`}
              >
                {stats.totalProfit > 0 ? '+' : ''}
                {stats.totalProfit.toFixed(2)}€
              </div>
            </div>
          </div>
        </div>
      )}

      {stats && stats.recentBets.length > 0 && (
        <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <h3 className="mb-4 text-sm font-semibold text-zinc-400 uppercase tracking-wider">
            Últimas Apuestas
          </h3>
          <div className="space-y-2">
            {stats.recentBets.slice(0, 5).map((bet) => (
              <div
                key={bet.id}
                className="flex items-center justify-between rounded-lg bg-zinc-800/30 px-4 py-2.5"
              >
                <div>
                  <p className="text-sm font-medium text-zinc-200">
                    {bet.event_name}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {bet.selection} @ {Number(bet.odds).toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-zinc-500">
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
        </div>
      )}

      <Link href="/settings">
        <Button variant="secondary" className="w-full">
          Editar Perfil
        </Button>
      </Link>
    </div>
  )
}
