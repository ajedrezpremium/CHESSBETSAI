const TELEGRAM_API = 'https://api.telegram.org/bot'

function getBotToken() {
  return process.env.TELEGRAM_BOT_TOKEN
}

export async function sendMessage(chatId: number, text: string) {
  const token = getBotToken()
  if (!token) return null

  const res = await fetch(`${TELEGRAM_API}${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
    }),
  })

  return res.ok
}

export async function setWebhook(url: string) {
  const token = getBotToken()
  if (!token) return null

  const res = await fetch(`${TELEGRAM_API}${token}/setWebhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  })

  return res.json()
}

export async function getWebhookInfo() {
  const token = getBotToken()
  if (!token) return null

  const res = await fetch(`${TELEGRAM_API}${token}/getWebhookInfo`)
  return res.json()
}

const commands = [
  { command: 'start', description: 'Conectar tu cuenta de Chess Bets Academy' },
  { command: 'help', description: 'Mostrar ayuda' },
  { command: 'alerts', description: 'Activar/desactivar alertas de value bets' },
  { command: 'resumen', description: 'Recibir resumen diario de apuestas' },
  { command: 'stop', description: 'Detener todas las notificaciones' },
]

export async function setCommands() {
  const token = getBotToken()
  if (!token) return null

  const res = await fetch(`${TELEGRAM_API}${token}/setMyCommands`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ commands }),
  })

  return res.json()
}
