'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ChevronLeft, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
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

      // Code block handling
      if (line.startsWith('[code lang=') || line === '[code]') {
        flushCode(i)
        flushTable(i)
        codeLines = []
        continue
      }
      if (line === '[/code]') {
        flushCode(i)
        continue
      }
      if (codeLines !== null) {
        codeLines.push(line)
        continue
      }

      // Table handling
      if (line.startsWith('|') && line.endsWith('|')) {
        const cells = line.split('|').filter((c) => c.trim())
        if (line.includes('---') || line.includes('---')) {
          continue
        }
        if (!tableHeader) {
          tableHeader = cells
        } else {
          tableRows.push(cells)
        }
        continue
      }
      if (tableHeader && !line.startsWith('|')) {
        flushTable(i)
      }

      // Headings
      if (line.startsWith('## ')) {
        result.push(
          <h2 key={i} className="mb-4 mt-8 text-xl font-bold text-zinc-100 first:mt-0">
            {line.slice(3)}
          </h2>
        )
        continue
      }
      if (line.startsWith('### ')) {
        result.push(
          <h3 key={i} className="mb-3 mt-6 text-lg font-semibold text-zinc-200">
            {line.slice(4)}
          </h3>
        )
        continue
      }

      // Blockquote
      if (line.startsWith('> ')) {
        result.push(
          <blockquote
            key={i}
            className="my-4 border-l-2 border-amber-500 bg-amber-500/5 py-3 pl-4 text-sm italic text-zinc-300"
          >
            {renderInline(line.slice(2))}
          </blockquote>
        )
        continue
      }

      // Checkbox list
      if (line.startsWith('- [ ]') || line.startsWith('- [x]')) {
        const checked = line.startsWith('- [x]')
        result.push(
          <div key={i} className="flex items-center gap-2 py-1">
            <div
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                checked ? 'border-emerald-500 bg-emerald-500' : 'border-zinc-600'
              }`}
            >
              {checked && <CheckCircle className="h-3 w-3 text-black" />}
            </div>
            <span className="text-sm text-zinc-300">{renderInline(line.slice(6))}</span>
          </div>
        )
        continue
      }

      // Bullet list
      if (line.startsWith('- **') && line.endsWith('**')) {
        result.push(
          <p key={i} className="my-2 text-sm font-semibold text-zinc-200">
            {renderInline(line.slice(3, -3))}
          </p>
        )
        continue
      }
      if (line.startsWith('- ')) {
        result.push(
          <li key={i} className="ml-4 text-sm leading-relaxed text-zinc-300">
            {renderInline(line.slice(2))}
          </li>
        )
        continue
      }

      // Bold paragraph
      if (line.startsWith('**') && line.endsWith('**')) {
        result.push(
          <p key={i} className="my-2 text-sm font-semibold text-zinc-200">
            {renderInline(line.slice(2, -2))}
          </p>
        )
        continue
      }

      // Empty line
      if (line.trim() === '') {
        result.push(<div key={i} className="h-3" />)
        continue
      }

      // Numbered list
      if (/^\d+\.\s/.test(line)) {
        result.push(
          <li key={i} className="ml-4 text-sm leading-relaxed text-zinc-300 list-decimal">
            {renderInline(line.replace(/^\d+\.\s/, ''))}
          </li>
        )
        continue
      }

      // Default paragraph
      result.push(
        <p key={i} className="text-sm leading-relaxed text-zinc-300">
          {renderInline(line)}
        </p>
      )
    }

    flushCode(lines.length)
    flushTable(lines.length)

    return result
  }, [lesson.contenido])

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <Link
          href="/academy"
          className="mb-4 inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300"
        >
          <ChevronLeft className="h-3 w-3" />
          Volver a Grados
        </Link>
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span>Grado {gradoId}</span>
          <span>·</span>
          <span>{gradoNombre}</span>
          <span>·</span>
          <span>Lección {lesson.order}</span>
        </div>
        <h1 className="mt-2 text-2xl font-bold text-zinc-100">
          {lesson.titulo}
        </h1>
        <p className="mt-1 text-sm text-zinc-500">{lesson.descripcion}</p>
        <div className="mt-3 flex items-center gap-4 text-xs text-zinc-600">
          <span>Duración: {lesson.duracion}</span>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 leading-relaxed">
        {elements}
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-zinc-800 pt-6">
        <Link href="/academy">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Volver
          </Button>
        </Link>
        <Button
          variant={completado ? 'secondary' : 'gold'}
          size="sm"
          onClick={() => setCompletado(!completado)}
        >
          {completado ? (
            <>
              <CheckCircle className="mr-1 h-4 w-4" />
              Completada
            </>
          ) : (
            'Marcar como Completada'
          )}
        </Button>
      </div>
    </div>
  )
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g)
  return parts.map((part, j) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={j} className="font-semibold text-zinc-200">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={j} className="rounded bg-zinc-800 px-1 py-0.5 text-xs text-amber-400">
          {part.slice(1, -1)}
        </code>
      )
    }
    return part
  })
}
