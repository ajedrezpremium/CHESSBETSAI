'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Save, LogOut, User } from 'lucide-react'

export default function SettingsPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then((res: any) => { const user = res.data?.user
      if (user) {
        setEmail(user.email || '')
        supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single()
          .then((res2: any) => { const data = res2.data
            if (data) setFullName(data.full_name || '')
          })
      }
    })
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    setError('')

    const supabase = createClient()
    const { error: err } = await supabase
      .from('profiles')
      .update({ full_name: fullName, updated_at: new Date().toISOString() })
      .eq('id', (await supabase.auth.getUser()).data.user?.id)

    if (err) {
      setError(err.message)
    } else {
      setSaved(true)
    }
    setSaving(false)
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100">Configuración</h1>
        <p className="text-zinc-500">Administra tu cuenta y perfil</p>
      </div>

      <form onSubmit={handleSave} className="mb-8 space-y-5">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-400 uppercase tracking-wider">
            <User className="h-4 w-4" />
            Información Personal
          </h3>

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm text-zinc-400">
                Nombre completo
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-amber-500/50"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-zinc-400">Email</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-sm text-zinc-500 outline-none"
              />
              <p className="mt-1 text-xs text-zinc-600">
                El email no se puede cambiar desde aquí
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400">
            {error}
          </div>
        )}

        {saved && (
          <div className="rounded-lg bg-emerald-500/10 px-4 py-2 text-sm text-emerald-500">
            Perfil actualizado correctamente
          </div>
        )}

        <Button
          type="submit"
          variant="gold"
          className="w-full"
          disabled={saving}
        >
          <Save className="mr-2 h-4 w-4" />
          {saving ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </form>

      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
        <h3 className="mb-2 text-sm font-semibold text-zinc-300">
          Cerrar Sesión
        </h3>
        <p className="mb-4 text-sm text-zinc-500">
          Cierra tu sesión en este dispositivo
        </p>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10"
        >
          <LogOut className="h-4 w-4" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  )
}
