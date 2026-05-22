import { gradosData } from '@/lib/academy/content'
import { BookOpen, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function AdminCursosPage() {
  const totalLecciones = gradosData.reduce(
    (sum, g) => sum + g.lecciones.length,
    0
  )

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100">Cursos</h1>
        <p className="text-zinc-500">
          {gradosData.length} grados · {totalLecciones} lecciones
        </p>
      </div>

      <div className="space-y-3">
        {gradosData.map((grado) => (
          <div
            key={grado.id}
            className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg text-lg bg-zinc-800">
                  {grado.icono}
                </div>
                <div>
                  <div className="text-xs font-medium text-zinc-500">
                    GRADO {grado.id}
                  </div>
                  <h3 className="font-semibold text-zinc-100">
                    {grado.nombre}
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-zinc-500">
                  {grado.lecciones.length} lecciones
                </span>
                <ChevronRight className="h-4 w-4 text-zinc-600" />
              </div>
            </div>
            <p className="mt-2 text-sm text-zinc-500">{grado.descripcion}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {grado.lecciones.map((l) => (
                <span
                  key={l.id}
                  className="rounded-md bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400"
                >
                  {l.titulo}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
