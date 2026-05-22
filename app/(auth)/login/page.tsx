'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    const redirect = searchParams.get('redirect') || '/dashboard'
    router.push(redirect)
    router.refresh()
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm text-zinc-400">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-amber-500/50"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm text-zinc-400">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-amber-500/50"
        />
      </div>

      {error && (
        <div className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400">
          {error}
        </div>
      )}

      <Button type="submit" variant="gold" className="w-full" disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  )
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-2xl">
            ♟
          </div>
          <h1 className="text-2xl font-bold text-zinc-100">Iniciar Sesión</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Accede a tu cuenta de Chess Bets Academy
          </p>
        </div>

        <Suspense fallback={<div className="text-center text-zinc-500">Cargando...</div>}>
          <LoginForm />
        </Suspense>

        <p className="mt-6 text-center text-sm text-zinc-500">
          ¿No tienes cuenta?{' '}
          <Link href="/auth/register" className="text-amber-500 hover:text-amber-400">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  )
}
