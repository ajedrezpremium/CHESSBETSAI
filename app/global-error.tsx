'use client'

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body className="flex min-h-screen flex-col items-center justify-center bg-black px-4">
        <div className="max-w-md text-center">
          <div className="mb-4 text-6xl">💥</div>
          <h1 className="mb-2 text-2xl font-bold text-zinc-100">Fallo crítico</h1>
          <p className="mb-6 text-sm text-zinc-500">La aplicación falló al cargar. Recarga la página.</p>
          <button
            onClick={reset}
            className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-medium text-black hover:bg-amber-400"
          >
            Recargar
          </button>
        </div>
      </body>
    </html>
  )
}
