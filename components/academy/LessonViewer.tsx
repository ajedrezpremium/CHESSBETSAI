'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, CheckCircle, Loader, Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Quiz } from './Quiz'
import type { Lesson } from '@/lib/academy/content'

interface LessonViewerProps {
  lesson: Lesson
  gradoId: number
  gradoNombre: string
}

function Table({ header, rows }: { header: string[]; rows: string[][] }) {
  return (
    <div className="my-4 overflow-x-auto rounded-xl border border-zinc-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900">
            {header.map((h, i) => (
              <th key={i} className="px-4 py-2.5 text-left font-semibold text-zinc-300">
                {h.trim()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-zinc-800/50 last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2 text-zinc-400">
                  {cell.trim()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function LessonViewer({ lesson, gradoId, gradoNombre }: LessonViewerProps) {
  const [completado, setCompletado] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [quizDone, setQuizDone] = useState(false)
  const [xpAwarded, setXpAwarded] = useState(0)

  useEffect(() => {
    fetch(`/api/academy/progress?gradoId=${gradoId}`)
      .then((r) => r.json())
      .then((data) => {
        const found = data?.find((p: any) => p.leccion_id === lesson.id)
        if (found?.completado) setCompletado(true)
      })
      .catch(() => {})
  }, [gradoId, lesson.id])

  const elements = useMemo(() => {
    const lines = lesson.contenido.split('\n')
    const result: React.ReactNode[] = []
    let codeLines: string[] | null = null
    let tableHeader: string[] | null = null
    let tableRows: string[][] = []

    const flushCode = (key: number) => {
      if (codeLines) {
        result.push(
          <pre key={key} className="my-4 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-300">
            <code>{codeLines.join('\n')}</code>
          </pre>
        )
        codeLines = null
      }
    }

    const flushTable = (key: number) => {
      if (tableHeader) {
        result.push(<Table key={key} header={tableHeader} rows={tableRows} />)
        tableHeader = null
        tableRows = []
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line.startsWith('[code lang=') || line === '[code]') {
        flushCode(i); flushTable(i); codeLines = []; continue
      }
      if (line === '[/code]') { flushCode(i); continue }
      if (codeLines !== null) { codeLines.push(line); continue }

      if (line.startsWith('|') && line.endsWith('|')) {
        const cells = line.split('|').filter((c) => c.trim())
        if (line.includes('---') || line.includes('---')) continue
        if (!tableHeader) tableHeader = cells
        else tableRows.push(cells)
        continue
      }
      if (tableHeader && !line.startsWith('|')) flushTable(i)

      if (line.startsWith('## ')) {
        result.push(<h2 key={i} className="mb-4 mt-8 text-xl font-bold text-zinc-100 first:mt-0">{line.slice(3)}</h2>)
        continue
      }
      if (line.startsWith('### ')) {
        result.push(<h3 key={i} className="mb-3 mt-6 text-lg font-semibold text-zinc-200">{line.slice(4)}</h3>)
        continue
      }
      if (line.startsWith('> ')) {
        result.push(<blockquote key={i} className="my-4 border-l-2 border-amber-500 bg-amber-500/5 py-3 pl-4 text-sm italic text-zinc-300">{renderInline(line.slice(2))}</blockquote>)
        continue
      }
      if (line.startsWith('- [ ]') || line.startsWith('- [x]')) {
        const checked = line.startsWith('- [x]')
        result.push(<div key={i} className="flex items-center gap-2 py-1"><div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${checked ? 'border-emerald-500 bg-emerald-500' : 'border-zinc-600'}`}>{checked && <CheckCircle className="h-3 w-3 text-black" />}</div><span className="text-sm text-zinc-300">{renderInline(line.slice(6))}</span></div>)
        continue
      }
      if (line.startsWith('- **') && line.endsWith('**')) {
        result.push(<p key={i} className="my-2 text-sm font-semibold text-zinc-200">{renderInline(line.slice(3, -3))}</p>)
        continue
      }
      if (line.startsWith('- ')) {
        result.push(<li key={i} className="ml-4 text-sm leading-relaxed text-zinc-300">{renderInline(line.slice(2))}</li>)
        continue
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        result.push(<p key={i} className="my-2 text-sm font-semibold text-zinc-200">{renderInline(line.slice(2, -2))}</p>)
        continue
      }
      if (line.trim() === '') { result.push(<div key={i} className="h-3" />); continue }
      if (/^\d+\.\s/.test(line)) {
        result.push(<li key={i} className="ml-4 text-sm leading-relaxed text-zinc-300 list-decimal">{renderInline(line.replace(/^\d+\.\s/, ''))}</li>)
        continue
      }
      result.push(<p key={i} className="text-sm leading-relaxed text-zinc-300">{renderInline(line)}</p>)
    }

    flushCode(lines.length)
    flushTable(lines.length)
    return result
  }, [lesson.contenido])

  const markAsComplete = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/academy/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gradoId,
          leccionId: lesson.id,
          completado: true,
          quizScore: 100,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setCompletado(true)
        setSaved(true)
        if (data.xpAwarded) setXpAwarded(data.xpAwarded)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch {}
    setSaving(false)
  }

  const handleQuizComplete = async (score: number, total: number) => {
    setQuizDone(true)
    const quizScore = Math.round((score / total) * 100)
    try {
      const res = await fetch('/api/academy/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gradoId,
          leccionId: lesson.id,
          completado: quizScore >= 60,
          quizScore,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setCompletado(quizScore >= 60)
        setSaved(true)
        if (data.xpAwarded) setXpAwarded(data.xpAwarded)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch {}
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <Link
          href={`/academy/${gradoId}`}
          className="mb-4 inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300"
        >
          <ChevronLeft className="h-3 w-3" />
          Volver a Grado {gradoId}
        </Link>
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span>Grado {gradoId}</span>
          <span>·</span>
          <span>{gradoNombre}</span>
          <span>·</span>
          <span>Lección {lesson.order}</span>
        </div>
        <h1 className="mt-2 text-2xl font-bold text-zinc-100">{lesson.titulo}</h1>
        <p className="mt-1 text-sm text-zinc-500">{lesson.descripcion}</p>
        <div className="mt-3 flex items-center gap-4 text-xs text-zinc-600">
          <span>Duración: {lesson.duracion}</span>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 leading-relaxed">
        {elements}
      </div>

      {/* Quiz */}
      {lesson.quiz && lesson.quiz.length > 0 && !quizDone && (
        <Quiz
          questions={lesson.quiz}
          lessonId={lesson.id}
          gradoId={gradoId}
          onComplete={handleQuizComplete}
        />
      )}

      {saved && xpAwarded > 0 && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-500/10 px-4 py-3 text-sm text-emerald-500">
          <Brain className="h-4 w-4" />
          +{xpAwarded} XP
        </div>
      )}

      <div className="mt-10 flex items-center justify-between border-t border-zinc-800 pt-6">
        <Link href={`/academy/${gradoId}`}>
          <Button variant="ghost" size="sm">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Volver
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          {saved && <span className="text-xs text-emerald-500">✓ Guardado</span>}
          <Button
            variant={completado ? 'secondary' : 'gold'}
            size="sm"
            onClick={markAsComplete}
            disabled={saving || completado}
          >
            {saving ? (
              <Loader className="mr-1 h-4 w-4 animate-spin" />
            ) : completado ? (
              <CheckCircle className="mr-1 h-4 w-4" />
            ) : null}
            {completado ? 'Completada' : 'Marcar como Completada'}
          </Button>
        </div>
      </div>
    </div>
  )
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g)
  return parts.map((part, j) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={j} className="font-semibold text-zinc-200">{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={j} className="rounded bg-zinc-800 px-1 py-0.5 text-xs text-amber-400">{part.slice(1, -1)}</code>
    }
    return part
  })
}
