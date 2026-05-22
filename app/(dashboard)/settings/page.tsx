'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Save, LogOut, User, Send, CheckCircle, XCircle, Loader } from 'lucide-react'

export default function SettingsPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  // Telegram state
  const [telegramConnected, setTelegramConnected] = useState(false)
  const [telegramChatId, setTelegramChatId] = useState<number | null>(null)
  const [telegramCode, setTelegramCode] = useState('')
  const [telegramLoading, setTelegramLoading] = useState(false)
  const [telegramCopied, setTelegramCopied] = useState(false)
  const [telegramBotUsername, setTelegramBotUsername] = useState('chessbetsai_bot')

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
        supabase
          .from('telegram_subscriptions')
          .select('chat_id')
          .eq('user_id', user.id)
          .single()
          .then((res3: any) => { const sub = res3.data
            if (sub) {
              setTelegramConnected(true)
              setTelegramChatId(sub.chat_id)
            }
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

      {/* Telegram Section */}
      <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-400 uppercase tracking-wider">
          <Send className="h-4 w-4" />
          Telegram — Notificaciones
        </h3>

        {telegramConnected ? (
          <div>
            <div className="mb-3 flex items-center gap-2 rounded-lg bg-emerald-500/10 px-4 py-3 text-sm text-emerald-500">
              <CheckCircle className="h-4 w-4" />
              Conectado{telegramChatId ? ` (chat #${telegramChatId})` : ''}
            </div>
            <button
              onClick={async () => {
                const supabase = createClient()
                const { data: { user } } = await supabase.auth.getUser()
                if (user) {
                  await supabase.from('telegram_subscriptions').delete().eq('user_id', user.id)
                  setTelegramConnected(false)
                  setTelegramChatId(null)
                }
              }}
              className="flex items-center gap-2 rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10"
            >
              <XCircle className="h-4 w-4" />
              Desconectar Telegram
            </button>
          </div>
        ) : (
          <div>
            <p className="mb-4 text-sm text-zinc-500">
              Conecta tu Telegram para recibir alertas de value bets y notificaciones.
            </p>
            {!telegramCode ? (
              <button
                onClick={async () => {
                  setTelegramLoading(true)
                  try {
                    const res = await fetch('/api/telegram/connect')
                    const data = await res.json()
                    if (data.code) {
                      setTelegramCode(data.code)
                      setTelegramBotUsername(data.botUsername)
                    }
                  } catch {}
                  setTelegramLoading(false)
                }}
                disabled={telegramLoading}
                className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-amber-400 disabled:opacity-50"
              >
                {telegramLoading ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Generar Código de Conexión
              </button>
            ) : (
              <div className="space-y-3">
                <div className="rounded-lg bg-zinc-800 p-4 text-center">
                  <p className="mb-1 text-xs text-zinc-500">Tu código de conexión (válido 15 min):</p>
                  <p className="select-all text-2xl font-bold tracking-widest text-amber-500">
                    {telegramCode}
                  </p>
                </div>
                <ol className="space-y-2 text-sm text-zinc-400">
                  <li>1. Abre Telegram y busca <span className="font-medium text-zinc-200">@{telegramBotUsername}</span></li>
                  <li>2. Envía: <span className="rounded bg-zinc-800 px-2 py-0.5 font-mono text-amber-400">/connect {telegramCode}</span></li>
                  <li>3. ¡Listo! Recibirás confirmación</li>
                </ol>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(telegramCode)
                    setTelegramCopied(true)
                    setTimeout(() => setTelegramCopied(false), 3000)
                  }}
                  className="flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-800"
                >
                  {telegramCopied ? '¡Copiado!' : 'Copiar código'}
                </button>
                <p className="text-xs text-zinc-600">
                  ¿Aún no creamos el bot? Sigue los pasos de setup debajo.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

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
