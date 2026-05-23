'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, Trophy, ChevronRight, Brain } from 'lucide-react'
import type { QuizQuestion } from '@/lib/academy/content'

interface QuizProps {
  questions: QuizQuestion[]
  lessonId: string
  gradoId: number
  onComplete: (score: number, total: number) => void
}

export function Quiz({ questions, lessonId, gradoId, onComplete }: QuizProps) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [finished, setFinished] = useState(false)

  const question = questions[current]
  const isCorrect = selected === question.correcta

  const handleSelect = (idx: number) => {
    if (answered) return
    setSelected(idx)
  }

  const handleConfirm = () => {
    if (selected === null) return
    setAnswered(true)
    setAnswers([...answers, selected])
  }

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1)
      setSelected(null)
      setAnswered(false)
    } else {
      const correct = [...answers, selected].filter(
        (a, i) => a === questions[i].correcta
      ).length
      setFinished(true)
      onComplete(correct, questions.length)
    }
  }

  if (finished) {
    const correct = answers.filter((a, i) => a === questions[i].correcta).length
    const total = questions.length
    const percent = Math.round((correct / total) * 100)

    return (
      <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-center">
        <Trophy className="mx-auto mb-3 h-10 w-10 text-amber-500" />
        <h3 className="text-lg font-bold text-zinc-100">Quiz Completado</h3>
        <div className="mt-2">
          <span className="text-3xl font-bold text-amber-500">{correct}</span>
          <span className="text-zinc-500"> / {total}</span>
        </div>
        <div className="mt-3 flex justify-center">
          <div className="flex h-2 w-48 overflow-hidden rounded-full bg-zinc-800">
            <div
              className={`rounded-full transition-all ${
                percent >= 80 ? 'bg-emerald-500' : percent >= 50 ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
        <p className="mt-2 text-sm text-zinc-500">
          {percent >= 80 ? '¡Excelente! Dominas el tema.' :
           percent >= 50 ? 'Bien, pero repasa los conceptos clave.' :
           'Revisa la lección nuevamente.'}
        </p>
        {percent >= 60 && (
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-500">
            <Brain className="h-3 w-3" />
            +{percent >= 100 ? 150 : 120} XP
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
          Quiz • {current + 1} de {questions.length}
        </h3>
        <div className="flex h-2 w-32 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="rounded-full bg-amber-500 transition-all"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <p className="mb-4 text-sm font-medium text-zinc-200">{question.pregunta}</p>

      <div className="space-y-2">
        {question.opciones.map((opcion, idx) => {
          let style = 'border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800/50'
          if (answered) {
            if (idx === question.correcta) style = 'border-emerald-500/50 bg-emerald-500/10'
            else if (idx === selected) style = 'border-red-500/50 bg-red-500/10'
            else style = 'border-zinc-800 opacity-50'
          } else if (selected === idx) {
            style = 'border-amber-500/50 bg-amber-500/10'
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-all ${style}`}
            >
              <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs ${
                answered && idx === question.correcta
                  ? 'border-emerald-500 bg-emerald-500 text-black'
                  : answered && idx === selected
                  ? 'border-red-500 bg-red-500 text-white'
                  : selected === idx
                  ? 'border-amber-500 bg-amber-500/20 text-amber-500'
                  : 'border-zinc-600 text-zinc-500'
              }`}>
                {answered && idx === question.correcta ? <CheckCircle className="h-4 w-4" /> :
                 answered && idx === selected ? <XCircle className="h-4 w-4" /> :
                 String.fromCharCode(65 + idx)}
              </div>
              <span className="text-zinc-300">{opcion}</span>
            </button>
          )
        })}
      </div>

      {answered && (
        <div className={`mt-4 rounded-lg p-3 text-sm ${
          isCorrect ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
        }`}>
          <p className="font-medium">{isCorrect ? '✓ Correcto' : '✗ Incorrecto'}</p>
          <p className="mt-1 text-xs opacity-80">{question.explicacion}</p>
        </div>
      )}

      <div className="mt-4 flex justify-end">
        {!answered ? (
          <button
            onClick={handleConfirm}
            disabled={selected === null}
            className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-medium text-black disabled:opacity-50"
          >
            Confirmar
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-medium text-black"
          >
            {current < questions.length - 1 ? 'Siguiente' : 'Ver Resultados'}
            <ChevronRight className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  )
}
