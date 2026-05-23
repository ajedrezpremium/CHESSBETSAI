'use client'

import { useTheme } from '@/components/ThemeProvider'
import { Sun, Moon, Monitor } from 'lucide-react'

const options = [
  { value: 'dark' as const, label: 'Oscuro', icon: Moon, desc: 'Fondo negro, texto claro' },
  { value: 'light' as const, label: 'Claro', icon: Sun, desc: 'Fondo claro, texto oscuro' },
  { value: 'system' as const, label: 'Sistema', icon: Monitor, desc: 'Sigue la configuración de tu dispositivo' },
]

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {options.map((opt) => {
        const active = theme === opt.value
        const Icon = opt.icon
        return (
          <button
            key={opt.value}
            onClick={() => setTheme(opt.value)}
            className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all ${
              active
                ? 'border-amber-500 bg-amber-500/10'
                : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-500'
            }`}
          >
            <Icon className={`h-5 w-5 ${active ? 'text-amber-500' : 'text-zinc-400'}`} />
            <span className={`text-sm font-medium ${active ? 'text-amber-500' : 'text-zinc-200'}`}>
              {opt.label}
            </span>
            <span className="text-[10px] text-zinc-500">{opt.desc}</span>
          </button>
        )
      })}
    </div>
  )
}
