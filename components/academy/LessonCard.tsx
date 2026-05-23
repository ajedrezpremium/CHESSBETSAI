'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Play, Lock, CheckCircle, Clock } from 'lucide-react'
import type { Lesson } from '@/lib/academy/content'

interface LessonCardProps {
  lesson: Lesson
  gradoId: number
}

export function LessonCard({ lesson, gradoId }: LessonCardProps) {
  const [completado, setCompletado] = useState(false)

  useEffect(() => {
    fetch(`/api/academy/progress?gradoId=${gradoId}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const found = data.find((p: any) => p.leccion_id === lesson.id)
          if (found?.completado) setCompletado(true)
        }
      })
      .catch(() => {})
  }, [gradoId, lesson.id])

  return (
    <Link
      href={`/academy/${gradoId}/${lesson.id}`}
      className={cn(
        'group flex items-center gap-4 rounded-xl border p-4 transition-all',
        completado
          ? 'border-emerald-500/20 bg-emerald-500/5'
          : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900'
      )}
    >
      <div
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
          completado
            ? 'bg-emerald-500/10 text-emerald-500'
            : 'bg-amber-500/10 text-amber-500'
        )}
      >
        {completado ? <CheckCircle className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h4 className={cn('text-sm font-medium truncate', completado ? 'text-emerald-300' : 'text-zinc-100')}>
            {lesson.titulo}
          </h4>
          {completado && <span className="text-[10px] font-medium text-emerald-500">Completado</span>}
        </div>
        <p className="mt-0.5 text-xs text-zinc-500 line-clamp-1">{lesson.descripcion}</p>
        <div className="mt-1.5 flex items-center gap-3 text-[10px] text-zinc-600">
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{lesson.duracion}</span>
          <span>Lección {lesson.order}</span>
          {completado && <span className="text-emerald-500/70">✓ Quiz superado</span>}
        </div>
      </div>
    </Link>
  )
}
