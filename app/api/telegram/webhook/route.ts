import { sendMessage } from '@/lib/telegram/bot'
import { createClient } from '@/lib/supabase/server'
import { chatWithAgent } from '@/lib/openrouter/agent'

export const dynamic = 'force-dynamic'

async function streamResponse(aiResponse: Response): Promise<string> {
  if (!aiResponse.body) return ''
  const reader = aiResponse.body.getReader()
  const decoder = new TextDecoder()
  let full = ''
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    const chunk = decoder.decode(value)
    const lines = chunk.split('\n').filter(l => l.startsWith('data: '))
    for (const line of lines) {
      const data = line.slice(6)
      if (data === '[DONE]') continue
      try {
        const parsed = JSON.parse(data)
        full += parsed.choices?.[0]?.delta?.content || ''
      } catch {}
    }
  }
  return full
}

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

O simplemente envíame cualquier mensaje y te responderé con IA.

Comandos:
/help — Mostrar ayuda
/analizar <partido> — Analizar un partido con IA
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
        await sendMessage(chatId, '❌ Código inválido o expirado.')
        return new Response('ok', { status: 200 })
      }

      const { error } = await supabase
        .from('telegram_subscriptions')
        .upsert({ user_id: profile.id, chat_id: chatId, username })

      if (error) {
        await sendMessage(chatId, '❌ Error al conectar.')
      } else {
        await sendMessage(chatId, '✅ ¡Cuenta conectada! Ahora puedes consultar la IA desde Telegram.')
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

Puedes hablarme en lenguaje natural sobre:
• Análisis de partidos en vivo
• Detección de value bets
• Estrategias de trading deportivo
• Gestión de bankroll
• Conceptos de la academia

Comandos:
/start — Conectar tu cuenta
/connect <código> — Vincular cuenta
/analizar <partido> — Analizar un partido
/help — Mostrar ayuda
/stop — Detener notificaciones`)
      return new Response('ok', { status: 200 })
    }

    // /analizar <match>
    if (text.startsWith('/analizar')) {
      const query = text.replace('/analizar', '').trim()
      if (!query) {
        await sendMessage(chatId, '❌ Uso: /analizar Real Madrid vs Barcelona')
        return new Response('ok', { status: 200 })
      }

      await sendMessage(chatId, '🧠 Analizando...')

      const aiResponse = await chatWithAgent([
        { role: 'user', content: `Analiza este partido: ${query}` },
      ])

      if (aiResponse && aiResponse.ok) {
        const reply = await streamResponse(aiResponse)
        await sendMessage(chatId, reply || '❌ No pude analizar el partido.')
      } else {
        await sendMessage(chatId, '❌ Error al conectar con la IA.')
      }

      return new Response('ok', { status: 200 })
    }

    // Anything else → AI agent
    await sendMessage(chatId, '🧠 Consultando a Live Sports Bets AI...')

    const aiResponse = await chatWithAgent([
      { role: 'user', content: text },
    ])

    if (aiResponse && aiResponse.ok) {
      const reply = await streamResponse(aiResponse)
      await sendMessage(chatId, reply || '❌ No pude generar respuesta.')
    } else {
      await sendMessage(chatId, '❌ Error al conectar con la IA.')
    }

    return new Response('ok', { status: 200 })
  } catch {
    return new Response('ok', { status: 200 })
  }
}
