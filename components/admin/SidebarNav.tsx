'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, BookOpen, ChevronRight, Shield } from 'lucide-react'

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/usuarios', label: 'Usuarios', icon: Users },
  { href: '/admin/cursos', label: 'Cursos', icon: BookOpen },
]

export default function SidebarNav() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 shrink-0 border-r border-zinc-800 bg-black lg:block">
      <div className="flex items-center gap-2 border-b border-zinc-800 px-5 py-4">
        <Shield className="h-5 w-5 text-amber-500" />
        <span className="text-sm font-semibold text-zinc-100">Panel Admin</span>
      </div>
      <nav className="p-3">
        {links.map((link) => {
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                active
                  ? 'bg-amber-500/10 text-amber-500'
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100'
              }`}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
              {active && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-amber-500" />}
              {!active && <ChevronRight className="ml-auto h-3 w-3" />}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
