'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { GradoData } from '@/lib/academy/content'
import { ChevronRight, CheckCircle, Lock, BookOpen } from 'lucide-react'

interface GradoCardProps {
  grado: GradoData
  index: number
}

export function GradoCard({ grado, index }: GradoCardProps) {
  const [progreso, setProgreso] = useState(0)
  const [completado, setCompletado] = useState(false)

  useEffect(() => {
    fetch(`/api/academy/progress?gradoId=${grado.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const completed = data.filter((p: any) => p.completado).length
          const pct = Math.round((completed / grado.lecciones.length) * 100)
          setProgreso(pct)
          if (completed === grado.lecciones.length) setCompletado(true)
        }
      })
      .catch(() => {})
  }, [grado.id, grado.lecciones.length])

  return (
    <Link
      href={`/academy/${grado.id}`}
      className={cn(
        'group relative overflow-hidden rounded-xl border p-5 transition-all duration-300',
        completado
          ? 'border-emerald-500/30 bg-emerald-500/5'
          : progreso > 0
            ? 'border-amber-500/30 bg-zinc-900'
            : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg text-lg', grado.color)}>
            {grado.icono}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-zinc-500">GRADO {index + 1}</span>
              {completado && <CheckCircle className="h-4 w-4 text-emerald-500" />}
              {!completado && progreso === 0 && <Lock className="h-3 w-3 text-zinc-600" />}
            </div>
            <h3 className="font-semibold text-zinc-100">{grado.nombre}</h3>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-zinc-600 transition-transform group-hover:translate-x-1" />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-zinc-500">{grado.descripcion}</p>

      <div className="mt-4 flex items-center gap-4">
        <div className="flex-1">
          <div className="h-1.5 rounded-full bg-zinc-800">
            <div
              className={cn('h-1.5 rounded-full transition-all', completado ? 'bg-emerald-500' : 'bg-amber-500')}
              style={{ width: `${progreso}%` }}
            />
          </div>
        </div>
        <span className="text-xs font-medium text-zinc-500">{progreso}%</span>
        <span className="flex items-center gap-1 text-xs text-zinc-600">
          <BookOpen className="h-3 w-3" />
          {grado.lecciones.length} lecciones
        </span>
      </div>
    </Link>
  )
}
