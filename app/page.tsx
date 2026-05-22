import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronRight, Brain, BookOpen, BarChart3, Shield, Trophy, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'Live Sports Bets AI',
    desc: 'Agente IA 24/7 especializado en análisis de apuestas en vivo, detección de value bets y trading deportivo.',
  },
  {
    icon: BookOpen,
    title: '10 Grados Chess Bets',
    desc: 'Sistema de progresión tipo cinturones: desde fundamentos hasta Grandmaster Syndicate.',
  },
  {
    icon: BarChart3,
    title: 'Live Trading',
    desc: 'Dashboards en tiempo real, radar de value bets, comparador de cuotas y heatmaps.',
  },
  {
    icon: Shield,
    title: 'Gestión de Bankroll',
    desc: 'Kelly Criterion, flat betting, gestión conservadora y agresiva con análisis de riesgo.',
  },
  {
    icon: Trophy,
    title: 'Gamificación',
    desc: 'XP, ligas, logros, badges, rankings globales y retos diarios.',
  },
  {
    icon: Sparkles,
    title: 'Certificación Profesional',
    desc: 'Certificados oficiales: Certified Live Trader, Value Hunter, Quant Analyst y Grandmaster.',
  },
]

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.15)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(59,130,246,0.08)_0%,_transparent_50%)]" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/50 px-4 py-1.5 text-xs text-zinc-400">
            <Sparkles className="h-3 w-3 text-amber-500" />
            Academia #1 de Live Sports Betting con IA
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-6xl sm:leading-tight">
            Piensa como un{' '}
            <span className="bg-gradient-to-r from-amber-500 to-yellow-400 bg-clip-text text-transparent">
              Gran Maestro
            </span>
            <br />
            Apuesta como un{' '}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Quant
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-zinc-400">
            La plataforma definitiva para dominar las apuestas deportivas EN VIVO.
            Aprende trading cuantitativo, detección de valor y análisis táctico con
            inteligencia artificial.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/academy">
              <Button variant="gold" size="lg">
                Entrar en la Academia
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/live">
              <Button variant="secondary" size="lg">
                Probar Live Sports Bets AI
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-800 py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Todo lo que necesitas para{' '}
              <span className="text-amber-500">dominar el live betting</span>
            </h2>
            <p className="mx-auto max-w-2xl text-zinc-400">
              Una plataforma completa con IA, academia, herramientas de trading y comunidad.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-zinc-700 hover:bg-zinc-900"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold text-zinc-100">{f.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-500">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-black p-12">
            <h2 className="mb-4 text-3xl font-bold">
              ¿Listo para llevar tus apuestas al{' '}
              <span className="text-amber-500">siguiente nivel</span>?
            </h2>
            <p className="mb-8 text-zinc-400">
              Únete a la academia y empieza tu camino hacia Grandmaster.
            </p>
            <Link href="/auth/register">
              <Button variant="gold" size="lg">
                Comenzar Nivel 1 — Gratis
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
