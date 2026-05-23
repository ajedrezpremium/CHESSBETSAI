'use client'

interface Props {
  questions: string[]
  onSelect: (question: string) => void
}

export function SuggestedQuestions({ questions, onSelect }: Props) {
  return (
    <div className="space-y-2 pl-10">
      <p className="text-xs text-zinc-500">Sugerencias:</p>
      <div className="flex flex-wrap gap-2">
        {questions.map((q) => (
          <button
            key={q}
            onClick={() => onSelect(q)}
            className="rounded-full border border-zinc-700 bg-zinc-800/50 px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:border-amber-500/30 hover:text-amber-400"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  )
}
