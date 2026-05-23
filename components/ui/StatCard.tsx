import type { LucideIcon } from 'lucide-react'

export function StatCard({ icon: Icon, label, value, color, sub }: {
  icon: LucideIcon
  label: string
  value: string
  color: string
  sub: string
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{label}</p>
        <Icon className={`h-4 w-4 ${color}`} />
      </div>
      <p className={`mt-1 text-2xl font-bold ${color}`}>{value}</p>
      <p className="mt-0.5 text-xs text-zinc-600">{sub}</p>
    </div>
  )
}
