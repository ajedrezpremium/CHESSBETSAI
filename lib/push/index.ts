import { createClient } from '@supabase/supabase-js'
import webpush from 'web-push'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

webpush.setVapidDetails(
  'mailto:admin@chessbets.academy',
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

export interface PushSubData {
  endpoint: string
  keys: { p256dh: string; auth: string }
}

export async function saveSubscription(userId: string, sub: PushSubData) {
  const { error } = await supabaseAdmin
    .from('push_subscriptions')
    .upsert({ user_id: userId, subscription: sub, updated_at: new Date().toISOString() }, { onConflict: 'user_id' })
  return !error
}

export async function removeSubscription(userId: string) {
  await supabaseAdmin.from('push_subscriptions').delete().eq('user_id', userId)
}

export async function getSubscription(userId: string): Promise<PushSubData | null> {
  const { data } = await supabaseAdmin.from('push_subscriptions').select('subscription').eq('user_id', userId).maybeSingle()
  return data?.subscription || null
}

export async function sendPush(userId: string, title: string, body: string, url?: string) {
  try {
    const sub = await getSubscription(userId)
    if (!sub) return false
    await webpush.sendNotification(sub as any, JSON.stringify({ title, body, url }))
    return true
  } catch (err: any) {
    if (err.statusCode === 410) await removeSubscription(userId)
    return false
  }
}
