import { redirect } from 'next/navigation'
import Link from 'next/link'
import { checkAdmin } from '@/lib/admin/service'
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ChevronRight,
  Shield,
} from 'lucide-react'

const adminLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/usuarios', label: 'Usuarios', icon: Users },
  { href: '/admin/cursos', label: 'Cursos', icon: BookOpen },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAdmin = await checkAdmin()

  if (!isAdmin) {
    redirect('/dashboard')
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="hidden w-64 shrink-0 border-r border-zinc-800 bg-black lg:block">
        <div className="flex items-center gap-2 border-b border-zinc-800 px-5 py-4">
          <Shield className="h-5 w-5 text-amber-500" />
          <span className="text-sm font-semibold text-zinc-100">
            Panel Admin
          </span>
        </div>
        <nav className="p-3">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100"
            >
              <link.icon className="h-4 w-4" />
              {link.label}
              <ChevronRight className="ml-auto h-3 w-3" />
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  )
}
