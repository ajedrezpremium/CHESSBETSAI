import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getGradoById, getLessonById } from '@/lib/academy/content'
import { LessonViewer } from '@/components/academy/LessonViewer'

export async function generateMetadata({ params }: { params: Promise<{ gradoId: string; leccionId: string }> }): Promise<Metadata> {
  const { gradoId, leccionId } = await params
  const grado = getGradoById(Number(gradoId))
  const lesson = grado ? getLessonById(grado.id, leccionId) : null
  if (!grado || !lesson) return { title: 'Lección no encontrada — Chess Bets Academy' }
  return {
    title: `${lesson.titulo} — ${grado.nombre} — Chess Bets Academy`,
    description: `Lección ${lesson.id}: ${lesson.titulo} del grado ${grado.nombre}.`,
  }
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ gradoId: string; leccionId: string }>
}) {
  const { gradoId, leccionId } = await params
  const id = parseInt(gradoId)
  const grado = getGradoById(id)
  const lesson = getLessonById(id, leccionId)

  if (!grado || !lesson) {
    notFound()
  }

  return (
    <LessonViewer
      lesson={lesson}
      gradoId={grado.id}
      gradoNombre={grado.nombre}
    />
  )
}
