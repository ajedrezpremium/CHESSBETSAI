import { getOdds } from '@/lib/odds/client'
import { getBestOdds, detectValueBet } from '@/lib/odds/calculator'
import { Radio, Activity, TrendingUp, AlertTriangle, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { LiveEventCard } from '@/components/live/LiveEventCard'
import { ValueBetCard } from '@/components/live/ValueBetCard'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

export default async function LivePage() {
  const apiKey = process.env.ODDS_API_KEY
  let events: import('@/lib/odds/types').OddsEvent[] = []
  let error: string | null = null

  if (apiKey) {
    try {
      events = await getOdds('upcoming', 'uk,us,eu')
    } catch (e: any) {
      error = e.message
    }
  }

  const valueBets = events
    .map((e) => {
      const best = getBestOdds(e)
      if (!best) return null
      const homeProb = 0.45
      const drawProb = 0.25
      const awayProb = 0.30
      const values = detectValueBet(best, e.home_team, e.away_team, homeProb, drawProb, awayProb)
      return values.length > 0 ? { event: e, values } : null
    })
    .filter(Boolean)

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/50 px-3 py-1 text-xs text-zinc-400">
          <Radio className="h-3 w-3 text-red-500" />
          EN VIVO
        </div>
        <h1 className="text-3xl font-bold text-zinc-100">
          Live <span className="text-amber-500">Trading</span>
        </h1>
        <p className="mt-2 text-zinc-500">
          Radar de value bets, comparador de cuotas y análisis en tiempo real.
        </p>
      </div>

      {!apiKey && (
        <div className="mb-8 rounded-xl border border-amber-500/20 bg-amber-500/5 p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
            <div>
              <h3 className="font-semibold text-zinc-100">
                Conecta The Odds API para datos reales
              </h3>
              <p className="mt-1 text-sm text-zinc-500">
                Regístrate gratis en{' '}
                <a
                  href="https://the-odds-api.com"
                  target="_blank"
                  className="text-amber-500 hover:text-amber-400"
                >
                  the-odds-api.com
                </a>{' '}
                (500 requests/mes gratis) y añade la clave a tu{' '}
                <code className="rounded bg-zinc-800 px-1 py-0.5 text-xs">.env.local</code>:
              </p>
              <pre className="mt-2 rounded-lg bg-zinc-800 p-3 text-xs text-zinc-400">
                ODDS_API_KEY=tu_clave_aqui
              </pre>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-8 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
          Error: {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
              Partidos ({events.length})
            </h2>
            <span className="text-xs text-zinc-600">
              Mejores cuotas de {events.length > 0 ? events[0].bookmakers.length : '--'} casas
            </span>
          </div>

          {events.length === 0 && !error && (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
              <Activity className="mx-auto mb-3 h-8 w-8 text-zinc-700" />
              <p className="text-sm text-zinc-500">
                {apiKey ? 'Cargando partidos...' : 'Conecta The Odds API para ver partidos'}
              </p>
            </div>
          )}

          <div className="space-y-3">
            {events.slice(0, 20).map((event) => (
              <LiveEventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
              Value Bets
            </h2>
          </div>

          {valueBets.length === 0 && (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 text-center">
              <p className="text-sm text-zinc-500">
                No se detectaron value bets con los parámetros actuales.
              </p>
              <p className="mt-1 text-xs text-zinc-600">
                Ajusta las probabilidades o conecta más casas.
              </p>
            </div>
          )}

          <div className="space-y-3">
            {valueBets.slice(0, 5).map((vb: any) =>
              vb.values.map((v: any, i: number) => (
                <ValueBetCard key={`${vb.event.id}-${i}`} {...v} />
              ))
            )}
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h3 className="mb-3 font-semibold text-zinc-100">
              Live Sports Bets AI
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-zinc-500">
              Usa el agente IA (botón flotante abajo a la derecha) para analizar
              partidos, detectar value bets y recibir recomendaciones.
            </p>
            <div className="space-y-2 text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                Análisis de momentum
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                Detección de value bets
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                Cálculo de stake óptimo
              </div>
            </div>
            <Link
              href="https://the-odds-api.com"
              target="_blank"
              className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-zinc-700 p-2.5 text-xs text-zinc-400 transition-colors hover:bg-zinc-800"
            >
              <ExternalLink className="h-3 w-3" />
              Obtener API Key
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
