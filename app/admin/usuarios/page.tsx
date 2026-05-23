'use client'

import { useState, useEffect, useCallback } from 'react'
import { Shield, User, Search, CheckCircle, XCircle } from 'lucide-react'

const PLANS_LIST = ['free', 'pro', 'elite'] as const

interface AdminUser {
  id: string
  email: string | null
  full_name: string | null
  role: string
  elo: number
  xp: number
  streak: number
  membership_plan: string
  created_at: string
}

interface Toast {
  type: 'success' | 'error'
  message: string
}

export default function AdminUsuariosPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [toggleId, setToggleId] = useState<string | null>(null)
  const [changingPlan, setChangingPlan] = useState<string | null>(null)
  const [toast, setToast] = useState<Toast | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(t)
    }
  }, [toast])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await fetch('/admin/api/users')
      const data = await res.json()
      setUsers(data)
    } catch {}
    setLoading(false)
  }

  const toggleRole = useCallback(async (userId: string, currentRole: string) => {
    const action = currentRole === 'admin' ? 'quitarle permisos de admin' : 'hacerlo admin'
    if (!window.confirm(`¿Estás seguro de ${action} a este usuario?`)) return

    setToggleId(userId)
    const newRole = currentRole === 'admin' ? 'student' : 'admin'
    try {
      const res = await fetch('/admin/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: newRole }),
      })
      if (!res.ok) throw new Error()
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)))
      setToast({ type: 'success', message: `Rol actualizado a ${newRole}` })
    } catch {
      setToast({ type: 'error', message: 'Error al actualizar rol' })
    }
    setToggleId(null)
  }, [])

  const filtered = users.filter((u) =>
    (u.full_name || '').toLowerCase().includes(search.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6">
      {toast && (
        <div className={`mb-4 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${
          toast.type === 'success'
            ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
            : 'border-red-500/20 bg-red-500/10 text-red-400'
        }`}>
          {toast.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          {toast.message}
        </div>
      )}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Usuarios</h1>
          <p className="text-zinc-500">{users.length} usuario{users.length !== 1 ? 's' : ''} registrado{users.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Buscar usuario..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 rounded-xl border border-zinc-700 bg-zinc-800 py-2 pl-10 pr-4 text-sm text-zinc-100 outline-none focus:border-amber-500/50"
          />
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
              <div className="h-7 w-7 animate-pulse rounded-full bg-zinc-800" />
              <div className="h-4 flex-1 animate-pulse rounded bg-zinc-800" />
              <div className="h-4 w-24 animate-pulse rounded bg-zinc-800" />
              <div className="h-4 w-12 animate-pulse rounded bg-zinc-800" />
              <div className="h-4 w-12 animate-pulse rounded bg-zinc-800" />
              <div className="h-4 w-16 animate-pulse rounded bg-zinc-800" />
              <div className="h-6 w-20 animate-pulse rounded bg-zinc-800" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center text-sm text-zinc-500">
          {search ? 'Sin resultados' : 'No hay usuarios registrados'}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900">
                <th className="px-4 py-3 text-left font-medium text-zinc-400">Usuario</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-400">Email</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-400">Rol</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-400">ELO</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-400">XP</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-400">Racha</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-400">Plan</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-400">Acción</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b border-zinc-800/50 last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800">
                        {u.role === 'admin' ? (
                          <Shield className="h-3.5 w-3.5 text-amber-500" />
                        ) : (
                          <User className="h-3.5 w-3.5 text-zinc-500" />
                        )}
                      </div>
                      <span className="font-medium text-zinc-200">{u.full_name || 'Sin nombre'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-zinc-400">{u.email || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-md px-2 py-0.5 text-[10px] font-medium uppercase ${u.role === 'admin' ? 'bg-amber-500/10 text-amber-500' : 'bg-zinc-800 text-zinc-500'}`}>
                      {u.role || 'student'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-zinc-300">{u.elo || 1000}</td>
                  <td className="px-4 py-3 text-amber-500">{u.xp || 0}</td>
                  <td className="px-4 py-3 text-zinc-400">{u.streak || 0} días</td>
                  <td className="px-4 py-3">
                    <select
                      value={u.membership_plan || 'free'}
                      onChange={async (e) => {
                        const plan = e.target.value
                        if (!window.confirm(`¿Cambiar plan de ${u.full_name || u.email} a ${plan}?`)) return
                        setChangingPlan(u.id)
                        try {
                          const res = await fetch('/admin/api/users', {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ userId: u.id, membership_plan: plan }),
                          })
                          if (!res.ok) throw new Error()
                          setUsers((prev) => prev.map((p) => p.id === u.id ? { ...p, membership_plan: plan } : p))
                          setToast({ type: 'success', message: `Plan cambiado a ${plan}` })
                        } catch {
                          setToast({ type: 'error', message: 'Error al cambiar plan' })
                        }
                        setChangingPlan(null)
                      }}
                      disabled={changingPlan === u.id}
                      className="rounded-md border border-zinc-700 bg-zinc-800 px-2 py-1 text-xs text-zinc-200 focus:border-amber-500/50 outline-none"
                    >
                      {PLANS_LIST.map((p) => (
                        <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleRole(u.id, u.role)}
                      disabled={toggleId === u.id}
                      className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                        u.role === 'admin'
                          ? 'border border-red-500/30 text-red-400 hover:bg-red-500/10'
                          : 'border border-amber-500/30 text-amber-500 hover:bg-amber-500/10'
                      }`}
                    >
                      {toggleId === u.id ? '...' : u.role === 'admin' ? 'Quitar Admin' : 'Hacer Admin'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
