export default function RootLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-amber-500" />
        <p className="text-sm text-zinc-500">Cargando...</p>
      </div>
    </div>
  )
}
