import { GradoCard } from '@/components/academy/GradoCard'
import { gradosData } from '@/lib/academy/content'

export default function AcademyPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/50 px-3 py-1 text-xs text-zinc-400">
          🎓 Chess Bets Academy
        </div>
        <h1 className="text-3xl font-bold text-zinc-100">
          Los 10 Grados{' '}
          <span className="text-amber-500">Chess Bets</span>
        </h1>
        <p className="mt-2 text-zinc-500">
          Sistema de progresión tipo cinturones. Cada grado desbloquea lecciones,
          simuladores y certificaciones.
        </p>
      </div>

      <div className="grid gap-4">
        {gradosData.map((grado, i) => (
          <GradoCard key={grado.id} grado={grado} index={i} />
        ))}
      </div>
    </div>
  )
}
