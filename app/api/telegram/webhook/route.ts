import { sendMessage, setCommands } from '@/lib/telegram/bot'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const update = await request.json()
    const message = update.message

    if (!message?.text) {
      return new Response('ok', { status: 200 })
    }

    const chatId = message.chat.id
    const text = message.text.trim()
    const username = message.from?.username || null

    // /start <code> — link Telegram to account
    if (text.startsWith('/start')) {
      const parts = text.split(' ')
      const code = parts[1]

      if (!code) {
        await sendMessage(chatId, `👋 ¡Bienvenido a Chess Bets Academy!

Para conectar tu cuenta:
1. Inicia sesión en chess-bets-academy.vercel.app
2. Ve a Configuración → Telegram
3. Copia tu código de conexión
4. Envíame /connect <código>

Comandos disponibles:
/help — Mostrar ayuda
/alerts — Activar/desactivar alertas
/resumen — Resumen diario
/stop — Detener notificaciones`)
        return new Response('ok', { status: 200 })
      }

      const supabase = await createClient()
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('telegram_code', code)
        .single()

      if (!profile) {
        await sendMessage(chatId, '❌ Código inválido o expirado. Genera uno nuevo en Configuración → Telegram.')
        return new Response('ok', { status: 200 })
      }

      const { error } = await supabase
        .from('telegram_subscriptions')
        .upsert({
          user_id: profile.id,
          chat_id: chatId,
          username,
        })

      if (error) {
        await sendMessage(chatId, '❌ Error al conectar. Intenta de nuevo.')
      } else {
        await sendMessage(chatId, '✅ ¡Cuenta conectada exitosamente! Recibirás alertas de value bets y notificaciones aquí.')
      }

      return new Response('ok', { status: 200 })
    }

    // /connect <code>
    if (text.startsWith('/connect')) {
      const parts = text.split(' ')
      const code = parts[1]

      if (!code) {
        await sendMessage(chatId, '❌ Uso: /connect <código>. Genera un código en Configuración → Telegram.')
        return new Response('ok', { status: 200 })
      }

      const supabase = await createClient()
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('telegram_code', code)
        .single()

      if (!profile) {
        await sendMessage(chatId, '❌ Código inválido o expirado.')
        return new Response('ok', { status: 200 })
      }

      const { error } = await supabase
        .from('telegram_subscriptions')
        .upsert({ user_id: profile.id, chat_id: chatId, username })

      if (error) {
        await sendMessage(chatId, '❌ Error al conectar.')
      } else {
        await sendMessage(chatId, '✅ Conectado correctamente.')
        await supabase.from('profiles').update({ telegram_code: null }).eq('id', profile.id)
      }

      return new Response('ok', { status: 200 })
    }

    // /help
    if (text === '/help') {
      await sendMessage(chatId, `🤖 <b>Chess Bets Academy Bot</b>

Comandos:
/start — Conectar tu cuenta
/connect &lt;código&gt; — Vincular con código
/alerts — Activar/desactivar alertas
/resumen — Resumen diario de apuestas
/stop — Detener notificaciones`)
      return new Response('ok', { status: 200 })
    }

    // Default
    await sendMessage(chatId, `No entendí ese comando. Usa /help para ver los comandos disponibles.`)
    return new Response('ok', { status: 200 })
  } catch {
    return new Response('ok', { status: 200 })
  }
}
