import { notFound } from 'next/navigation'
import { getGradoById, getLessonById } from '@/lib/academy/content'
import { LessonViewer } from '@/components/academy/LessonViewer'

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
