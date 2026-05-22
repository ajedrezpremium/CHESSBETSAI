import { createClient } from '@/lib/supabase/server'

export interface ProfileData {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
  role: string
  elo: number
  xp: number
  streak: number
  created_at: string
}

export async function getProfile(): Promise<ProfileData | null> {
  const supabase = await createClient()
  if (!supabase?.auth) return null

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return { ...data, email: user.email } as ProfileData
}

export async function updateProfile(data: {
  full_name?: string
  avatar_url?: string
}) {
  const supabase = await createClient()
  if (!supabase?.auth) return null

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { error } = await supabase
    .from('profiles')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', user.id)

  if (error) throw error
  return true
}
