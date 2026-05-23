import { Resend } from 'resend'
import { sendPush } from '@/lib/push'

const resend = new Resend(process.env.RESEND_API_KEY || 're_...')

type NotificationEvent =
  | { type: 'grado_completed'; grado: string; userName: string }
  | { type: 'xp_milestone'; xp: number; tier: string; userName: string }
  | { type: 'streak_reminder'; streak: number; userName: string }
  | { type: 'welcome'; userName: string }

const TEMPLATES: Record<NotificationEvent['type'], (data: any) => { subject: string; body: string; html: string }> = {
  grado_completed: ({ grado, userName }) => ({
    subject: `🎓 ¡Felicidades ${userName}! Has completado ${grado}`,
    body: `🎓 Has completado ${grado}. ¡Descarga tu certificado desde tu perfil!`,
    html: `<h2>¡Enhorabuena!</h2><p>Has completado el grado <strong>${grado}</strong> en Chess Bets Academy.</p><p>Ya puedes descargar tu certificado desde tu perfil.</p>`,
  }),
  xp_milestone: ({ xp, tier, userName }) => ({
    subject: `🏆 ${userName} has alcanzado ${xp} XP — ¡Plan ${tier}!`,
    body: `🏆 ¡Has alcanzado ${xp} XP y desbloqueado el plan ${tier}!`,
    html: `<h2>¡Nuevo hito!</h2><p>Has alcanzado <strong>${xp} XP</strong> y desbloqueado el plan <strong>${tier}</strong>.</p><p>Disfruta de todas las ventajas de tu nuevo plan.</p>`,
  }),
  streak_reminder: ({ streak, userName }) => ({
    subject: `🔥 ${userName}, llevas ${streak} días seguidos en Chess Bets`,
    body: `🔥 Llevas ${streak} días consecutivos. ¡No rompas tu racha!`,
    html: `<h2>¡Sigue así!</h2><p>Llevas <strong>${streak} días</strong> consecutivos aprendiendo en Chess Bets Academy.</p><p>No rompas tu racha, hoy te espera una nueva lección.</p>`,
  }),
  welcome: ({ userName }) => ({
    subject: `♟ Bienvenido a Chess Bets Academy, ${userName}`,
    body: `♟ Bienvenido ${userName}. Empieza tu primer grado en la Academia.`,
    html: `<h2>¡Bienvenido!</h2><p>Has dado el primer paso para convertirte en un trader deportivo profesional.</p><p>Empieza por la <a href="${process.env.NEXT_PUBLIC_SITE_URL}/academy">Academia</a> y completa tu primer grado.</p>`,
  }),
}

export async function sendNotification(userId: string, email: string, event: NotificationEvent) {
  try {
    const template = TEMPLATES[event.type](event as any)
    await resend.emails.send({
      from: 'Chess Bets Academy <notifications@chessbets.academy>',
      to: email,
      subject: template.subject,
      html: template.html,
    })
    await sendPush(userId, template.subject, template.body, '/academy')
  } catch (err) {
    console.error('Notification error:', err)
  }
}
