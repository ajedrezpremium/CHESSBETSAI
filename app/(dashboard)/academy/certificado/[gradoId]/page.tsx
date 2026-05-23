import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getGradoById } from '@/lib/academy/content'
import { CertificateView } from '@/components/academy/CertificateView'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ gradoId: string }> }): Promise<Metadata> {
  const { gradoId } = await params
  const grado = getGradoById(Number(gradoId))
  if (!grado) return { title: 'Certificado no encontrado — Chess Bets Academy' }
  return {
    title: `Certificado — ${grado.nombre} — Chess Bets Academy`,
    description: `Certificado de finalización del grado ${grado.nombre} de Chess Bets Academy.`,
  }
}

export default async function CertificadoPage({
  params,
}: {
  params: Promise<{ gradoId: string }>
}) {
  const { gradoId } = await params
  const id = parseInt(gradoId)
  const grado = getGradoById(id)
  if (!grado) notFound()

  const supabase = await createClient()
  if (!supabase?.auth) redirect('/login')

  const { data: userData } = await supabase.auth.getUser()
  const user = userData?.user
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, elo, xp')
    .eq('id', user.id)
    .single()

  const { data: progress } = await supabase
    .from('student_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('grado_id', id)

  const completed = progress?.filter((p: any) => p.completado).length || 0
  const total = grado.lecciones.length
  const allCompleted = completed >= total

  if (!allCompleted) redirect(`/academy/${gradoId}`)

  return (
    <CertificateView
      userName={profile?.full_name || user.email || 'Usuario'}
      gradoNombre={grado.nombre}
      gradoId={grado.id}
      elo={profile?.elo || 1000}
      xp={profile?.xp || 0}
      completadas={completed}
      total={total}
    />
  )
}
