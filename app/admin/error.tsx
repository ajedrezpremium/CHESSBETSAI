'use client'

export default function AdminError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mb-4 text-5xl">🔒</div>
        <h1 className="mb-2 text-xl font-bold text-zinc-100">Error de administración</h1>
        <p className="mb-6 text-sm text-zinc-500">{error.message || 'Error al cargar el panel de administración.'}</p>
        <button
          onClick={reset}
          className="rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-medium text-black hover:bg-amber-400"
        >
          Reintentar
        </button>
      </div>
    </div>
  )
}
