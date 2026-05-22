import { createClient } from '@/lib/supabase/server'
import { randomBytes } from 'crypto'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const supabase = await createClient()
  if (!supabase?.auth) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const code = randomBytes(4).toString('hex')

  await supabase
    .from('profiles')
    .update({ telegram_code: code, telegram_code_expires: new Date(Date.now() + 15 * 60 * 1000).toISOString() })
    .eq('id', user.id)

  return Response.json({
    code,
    botUsername: process.env.TELEGRAM_BOT_USERNAME || 'chessbetsai_bot',
    deepLink: `https://t.me/${process.env.TELEGRAM_BOT_USERNAME || 'chessbetsai_bot'}?start=${code}`,
  })
}
