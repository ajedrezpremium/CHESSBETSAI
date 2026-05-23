import type { Metadata } from 'next'
import { getAdminStats } from '@/lib/admin/service'
import { Users, DollarSign, Activity, Clock, TrendingUp, Target, Award, Zap } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Admin Panel — Chess Bets Academy',
  description: 'Panel de administración: estadísticas globales, usuarios, cursos y configuración.',
}

export default async function AdminPage() {
  const stats = await getAdminStats()

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100">Panel de Administración</h1>
        <p className="text-zinc-500">Resumen global de la plataforma</p>
      </div>

      {!stats && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center text-sm text-zinc-500">
          No hay datos disponibles. Ejecuta las migraciones en Supabase.
        </div>
      )}

      {stats && (
        <>
          {/* Top stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <Users className="mb-3 h-5 w-5 text-amber-500" />
              <div className="text-2xl font-bold text-zinc-100">{stats.totalUsers}</div>
              <div className="text-sm text-zinc-500">Usuarios registrados</div>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <Activity className="mb-3 h-5 w-5 text-blue-500" />
              <div className="text-2xl font-bold text-zinc-100">{stats.totalBets}</div>
              <div className="text-sm text-zinc-500">Apuestas totales</div>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <TrendingUp className="mb-3 h-5 w-5 text-emerald-500" />
              <div className="text-2xl font-bold text-zinc-100">
                {stats.totalProfit > 0 ? '+' : ''}{stats.totalProfit.toFixed(2)}€
              </div>
              <div className="text-sm text-zinc-500">Profit global</div>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <Clock className="mb-3 h-5 w-5 text-purple-500" />
              <div className="text-2xl font-bold text-zinc-100">{stats.pendingBets}</div>
              <div className="text-sm text-zinc-500">Apuestas pendientes</div>
            </div>
          </div>

          {/* Secondary stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <Target className="mb-3 h-5 w-5 text-amber-500" />
              <div className="text-lg font-bold text-zinc-100">{stats.totalStaked.toFixed(2)}€</div>
              <div className="text-sm text-zinc-500">Total apostado</div>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <Zap className="mb-3 h-5 w-5 text-blue-500" />
              <div className="text-lg font-bold text-zinc-100">{stats.winRate}%</div>
              <div className="text-sm text-zinc-500">Win Rate global</div>
              <div className="text-xs text-zinc-600">{stats.wins}W / {stats.losses}L</div>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <Award className="mb-3 h-5 w-5 text-purple-500" />
              <div className="text-lg font-bold text-zinc-100">
                {stats.totalBets > 0 ? (stats.totalProfit / stats.totalBets).toFixed(2) : '0'}€
              </div>
              <div className="text-sm text-zinc-500">Profit promedio por apuesta</div>
            </div>
          </div>

          {/* Top Users */}
          <div className="mb-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                <Award className="h-4 w-4" /> Mejores ELO
              </h3>
              {stats.topUsers.length === 0 ? (
                <p className="py-4 text-center text-sm text-zinc-600">Sin datos</p>
              ) : (
                <div className="space-y-2">
                  {stats.topUsers.map((u, i) => (
                    <div key={u.id} className="flex items-center justify-between rounded-lg bg-zinc-800/30 px-4 py-2.5">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-zinc-500">#{i + 1}</span>
                        <span className="text-sm text-zinc-300">{u.full_name || u.email || '—'}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-amber-500 font-medium">{u.elo} ELO</span>
                        <span className="text-zinc-500">{u.xp} XP</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                <Users className="h-4 w-4" /> Últimos Registros
              </h3>
              {stats.recentUsers.length === 0 ? (
                <p className="py-4 text-center text-sm text-zinc-600">Sin usuarios</p>
              ) : (
                <div className="space-y-2">
                  {stats.recentUsers.map((u) => (
                    <div key={u.id} className="flex items-center justify-between rounded-lg bg-zinc-800/30 px-4 py-2.5">
                      <span className="text-sm text-zinc-300">{u.full_name || u.email || '—'}</span>
                      <span className="text-xs text-zinc-600">{new Date(u.created_at).toLocaleDateString('es-ES')}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent activity */}
          {stats.recentActivity.length > 0 && (
            <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                <Activity className="h-4 w-4" /> Actividad Reciente
              </h3>
              <div className="space-y-2">
                {stats.recentActivity.slice(0, 10).map((a) => (
                  <div key={a.id} className="flex items-center justify-between rounded-lg bg-zinc-800/30 px-4 py-2">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-zinc-300">{a.event_name}</span>
                      <span className="text-[10px] text-zinc-600">{a.user_email.slice(0, 8)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className={a.profit >= 0 ? 'text-emerald-500' : 'text-red-500'}>
                        {a.profit > 0 ? '+' : ''}{a.profit.toFixed(2)}€
                      </span>
                      <span className="text-zinc-600">{new Date(a.created_at).toLocaleDateString('es-ES')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Win Rate bar */}
          {stats.totalBets > 0 && (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                <Target className="h-4 w-4" /> Rendimiento Global
              </h3>
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-emerald-500">Ganadas ({stats.wins})</span>
                    <span className="text-red-500">Perdidas ({stats.losses})</span>
                  </div>
                  <div className="flex h-3 overflow-hidden rounded-full bg-zinc-800">
                    <div
                      className="bg-emerald-500 transition-all"
                      style={{ width: `${stats.winRate}%` }}
                    />
                    <div
                      className="bg-red-500/60 transition-all"
                      style={{ width: `${100 - stats.winRate}%` }}
                    />
                  </div>
                  <div className="mt-1 text-center text-xs text-zinc-600">{stats.winRate}% Win Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-zinc-500">ROI</div>
                  <div className={`text-lg font-bold ${stats.totalProfit >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {stats.totalProfit > 0 ? '+' : ''}{stats.totalProfit.toFixed(2)}€
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
