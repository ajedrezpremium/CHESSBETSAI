import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-500 text-xs font-bold text-black">
                ♟
              </div>
              <span className="font-bold text-white">Chess Bets Academy</span>
            </div>
            <p className="text-sm text-zinc-500">
            Piensa como un Gran Maestro. Apuesta como un Quant.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-zinc-300">
              Plataforma
            </h4>
            <div className="flex flex-col gap-2 text-sm text-zinc-500">
              <Link href="/academy" className="hover:text-zinc-300">
                Academia
              </Link>
              <Link href="/live" className="hover:text-zinc-300">
                Live Trading
              </Link>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-zinc-300">
              Legal
            </h4>
            <div className="flex flex-col gap-2 text-sm text-zinc-500">
              <span>Términos y Condiciones</span>
              <span>Privacidad</span>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-zinc-800 pt-6 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} Chess Bets Academy. Solo para fines
          educativos. No garantizamos ganancias.
        </div>
      </div>
    </footer>
  )
}
