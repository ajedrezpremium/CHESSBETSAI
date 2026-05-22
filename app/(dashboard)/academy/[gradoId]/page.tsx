import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getGradoById } from '@/lib/academy/content'
import { LessonCard } from '@/components/academy/LessonCard'

export default async function GradoPage({
  params,
}: {
  params: Promise<{ gradoId: string }>
}) {
  const { gradoId } = await params
  const id = parseInt(gradoId)
  const grado = getGradoById(id)

  if (!grado) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/academy"
        className="mb-6 inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300"
      >
        <ChevronLeft className="h-3 w-3" />
        Todos los Grados
      </Link>

      <div className="mb-8">
        <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl bg-zinc-800">
          {grado.icono}
        </div>
        <h1 className="text-2xl font-bold text-zinc-100">
          Grado {grado.id}: {grado.nombre}
        </h1>
        <p className="mt-1 text-zinc-500">{grado.descripcion}</p>
        <div className="mt-3 text-sm text-zinc-600">
          {grado.lecciones.length} lecciones
        </div>
      </div>

      <div className="space-y-3">
        {grado.lecciones.map((lesson, index) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            gradoId={grado.id}
            completado={false}
            bloqueado={index > 0 && false}
          />
        ))}
      </div>
    </div>
  )
}
