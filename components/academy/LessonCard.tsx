import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Play, Lock, CheckCircle, Clock } from 'lucide-react'
import type { Lesson } from '@/lib/academy/content'

interface LessonCardProps {
  lesson: Lesson
  gradoId: number
  completado: boolean
  bloqueado: boolean
}

export function LessonCard({ lesson, gradoId, completado, bloqueado }: LessonCardProps) {
  return (
    <Link
      href={bloqueado ? '#' : `/academy/${gradoId}/${lesson.id}`}
      className={cn(
        'group flex items-center gap-4 rounded-xl border p-4 transition-all',
        completado
          ? 'border-emerald-500/20 bg-emerald-500/5'
          : bloqueado
            ? 'border-zinc-800/50 bg-zinc-900/20 opacity-50'
            : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900'
      )}
    >
      <div
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
          completado
            ? 'bg-emerald-500/10 text-emerald-500'
            : bloqueado
              ? 'bg-zinc-800 text-zinc-600'
              : 'bg-amber-500/10 text-amber-500'
        )}
      >
        {completado ? (
          <CheckCircle className="h-5 w-5" />
        ) : bloqueado ? (
          <Lock className="h-4 w-4" />
        ) : (
          <Play className="h-5 w-5" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h4 className={cn(
            'text-sm font-medium truncate',
            completado ? 'text-emerald-300' : 'text-zinc-100'
          )}>
            {lesson.titulo}
          </h4>
          {completado && (
            <span className="text-[10px] font-medium text-emerald-500">Completado</span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-zinc-500 line-clamp-1">
          {lesson.descripcion}
        </p>
        <div className="mt-1.5 flex items-center gap-3 text-[10px] text-zinc-600">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {lesson.duracion}
          </span>
          <span>Lección {lesson.order}</span>
        </div>
      </div>
    </Link>
  )
}
