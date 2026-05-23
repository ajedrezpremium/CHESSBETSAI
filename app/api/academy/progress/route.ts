import { createClient } from '@/lib/supabase/server'
import { sendNotification } from '@/lib/notifications'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const supabase = await createClient()
  if (!supabase?.auth) return Response.json({ error: 'Not authenticated' }, { status: 401 })

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json({ error: 'Not authenticated' }, { status: 401 })

  const url = new URL(req.url)
  const gradoId = url.searchParams.get('gradoId')

  let query = supabase
    .from('student_progress')
    .select('*')
    .eq('user_id', user.id)

  if (gradoId) {
    query = query.eq('grado_id', parseInt(gradoId))
  }

  const { data, error } = await query

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data || [])
}

export async function POST(req: Request) {
  const supabase = await createClient()
  if (!supabase?.auth) return Response.json({ error: 'Not authenticated' }, { status: 401 })

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json({ error: 'Not authenticated' }, { status: 401 })

  const { gradoId, leccionId, completado, quizScore } = await req.json()

  const { data: existing } = await supabase
    .from('student_progress')
    .select('id')
    .eq('user_id', user.id)
    .eq('grado_id', gradoId)
    .eq('leccion_id', leccionId)
    .single()

  let result
  if (existing) {
    result = await supabase
      .from('student_progress')
      .update({
        completado: completado ?? true,
        progreso: quizScore ?? 100,
        updated_at: new Date().toISOString(),
      })
      .eq('id', existing.id)
  } else {
    result = await supabase
      .from('student_progress')
      .insert({
        user_id: user.id,
        grado_id: gradoId,
        leccion_id: leccionId,
        completado: completado ?? true,
        progreso: quizScore ?? 100,
      })
  }

  if (result.error) return Response.json({ error: result.error.message }, { status: 500 })

  let xpAwarded = 0
  if (completado && quizScore && quizScore >= 60) {
    const bonus = quizScore >= 100 ? 50 : 20
    xpAwarded = 100 + bonus
    const { data: profile } = await supabase.from('profiles').select('xp, email, full_name, email_notifications').eq('id', user.id).single()
    const p = profile as any
    const currentXp = p?.xp || 0
    await supabase.from('profiles').update({ xp: currentXp + xpAwarded }).eq('id', user.id)

    // Check if grado fully completed → send notification
    if (p?.email && p?.email_notifications !== false) {
      const { data: allLessons } = await supabase
        .from('student_progress')
        .select('leccion_id, completado')
        .eq('user_id', user.id)
        .eq('grado_id', gradoId)
      const totalLessons = allLessons?.length || 0
      if (totalLessons > 0 && allLessons?.every((l: any) => l.completado)) {
        const { getGradoById } = await import('@/lib/academy/content')
        const grado = getGradoById(gradoId)
        if (grado) {
          sendNotification(user.id, p.email, { type: 'grado_completed', grado: grado.nombre, userName: p.full_name || 'Usuario' })
        }
      }
    }
  }

  return Response.json({ success: true, xpAwarded })
}
