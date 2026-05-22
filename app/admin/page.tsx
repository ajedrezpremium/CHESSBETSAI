import { getAdminStats } from '@/lib/admin/service'
import { Users, DollarSign, Activity, Clock, TrendingUp } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const stats = await getAdminStats()

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100">
          Panel de Administración
        </h1>
        <p className="text-zinc-500">Resumen global de la plataforma</p>
      </div>

      {!stats && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center text-sm text-zinc-500">
          No hay datos disponibles. Asegúrate de que las migraciones de Supabase están ejecutadas.
        </div>
      )}

      {stats && (
        <>
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <Users className="mb-3 h-5 w-5 text-amber-500" />
              <div className="text-2xl font-bold text-zinc-100">
                {stats.totalUsers}
              </div>
              <div className="text-sm text-zinc-500">Usuarios registrados</div>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <Activity className="mb-3 h-5 w-5 text-blue-500" />
              <div className="text-2xl font-bold text-zinc-100">
                {stats.totalBets}
              </div>
              <div className="text-sm text-zinc-500">Apuestas totales</div>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <TrendingUp className="mb-3 h-5 w-5 text-emerald-500" />
              <div className="text-2xl font-bold text-zinc-100">
                {stats.totalProfit > 0 ? '+' : ''}{stats.totalProfit}€
              </div>
              <div className="text-sm text-zinc-500">Profit global</div>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <Clock className="mb-3 h-5 w-5 text-purple-500" />
              <div className="text-2xl font-bold text-zinc-100">
                {stats.pendingBets}
              </div>
              <div className="text-sm text-zinc-500">Apuestas pendientes</div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-400 uppercase tracking-wider">
              <Users className="h-4 w-4" />
              Últimos Usuarios Registrados
            </h3>
            {stats.recentUsers.length === 0 ? (
              <p className="py-4 text-center text-sm text-zinc-600">
                No hay usuarios registrados
              </p>
            ) : (
              <div className="space-y-2">
                {stats.recentUsers.map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center justify-between rounded-lg bg-zinc-800/30 px-4 py-2.5"
                  >
                    <span className="text-sm text-zinc-300">
                      {u.email || 'Sin email'}
                    </span>
                    <span className="text-xs text-zinc-600">
                      {new Date(u.created_at).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
