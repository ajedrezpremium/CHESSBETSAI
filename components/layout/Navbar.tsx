'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, LogOut, User, Menu, X, TriangleAlert } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/academy', label: 'Academia' },
  { href: '/live', label: 'Live Trading' },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [supabaseReady, setSupabaseReady] = useState(true)

  useEffect(() => {
    try {
      const supabase = createClient()
      if (supabase && supabase.auth) {
        supabase.auth.getUser().then((res: any) => setUser(res.data?.user))
      } else {
        setSupabaseReady(false)
      }
    } catch {
      setSupabaseReady(false)
    }
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    if (supabase?.auth) {
      await supabase.auth.signOut()
    }
    setUser(null)
    router.push('/')
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-zinc-800/50 bg-black/80 backdrop-blur-xl">
      {!supabaseReady && (
        <div className="flex items-center justify-center gap-2 bg-amber-500/10 px-4 py-1.5 text-xs text-amber-400">
          <TriangleAlert className="h-3 w-3" />
          Configura Supabase — copia <code className="rounded bg-zinc-800 px-1">.env.local.example</code> a{' '}
          <code className="rounded bg-zinc-800 px-1">.env.local</code> y completa las credenciales
        </div>
      )}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-sm font-bold text-black">
            ♟
          </div>
          <span className="text-lg font-bold text-white">
            Chess Bets <span className="text-amber-500">Academy</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'bg-zinc-800 text-amber-500'
                  : 'text-zinc-400 hover:text-zinc-100'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-lg bg-zinc-800/50 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
              >
                <User className="h-4 w-4" />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-lg p-2 text-zinc-500 hover:text-zinc-300"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="gold" size="sm">
                  Empezar Ahora
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-zinc-400 md:hidden"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-zinc-800 bg-black px-4 py-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                'block rounded-lg px-4 py-3 text-sm font-medium',
                pathname === link.href
                  ? 'bg-zinc-800 text-amber-500'
                  : 'text-zinc-400'
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 border-t border-zinc-800 pt-3">
            {user ? (
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm text-red-400"
              >
                <LogOut className="h-4 w-4" /> Cerrar Sesión
              </button>
            ) : (
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg bg-amber-500 px-4 py-3 text-center text-sm font-medium text-black"
              >
                Empezar Ahora
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
