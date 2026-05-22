import { getAllUsers } from '@/lib/admin/service'
import { Shield, User } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminUsuariosPage() {
  const users = await getAllUsers()

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100">Usuarios</h1>
        <p className="text-zinc-500">
          {users.length} usuario{users.length !== 1 ? 's' : ''} registrado{users.length !== 1 ? 's' : ''}
        </p>
      </div>

      {users.length === 0 && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center text-sm text-zinc-500">
          No hay usuarios registrados
        </div>
      )}

      {users.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900">
                <th className="px-4 py-3 text-left font-medium text-zinc-400">Usuario</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-400">Email</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-400">Rol</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-400">ELO</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-400">XP</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-400">Registro</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u: any) => (
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
                      <span className="font-medium text-zinc-200">
                        {u.full_name || 'Sin nombre'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-zinc-400">{u.email || '—'}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-md px-2 py-0.5 text-[10px] font-medium uppercase ${
                        u.role === 'admin'
                          ? 'bg-amber-500/10 text-amber-500'
                          : 'bg-zinc-800 text-zinc-500'
                      }`}
                    >
                      {u.role || 'student'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-zinc-300">{u.elo || 1000}</td>
                  <td className="px-4 py-3 text-amber-500">{u.xp || 0}</td>
                  <td className="px-4 py-3 text-xs text-zinc-600">
                    {new Date(u.created_at).toLocaleDateString('es-ES')}
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
