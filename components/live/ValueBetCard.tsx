import { TrendingUp, TrendingDown } from 'lucide-react'

interface ValueBetCardProps {
  outcome: string
  ev: number
  price: number
  bookmaker: string
}

export function ValueBetCard({ outcome, ev, price, bookmaker }: ValueBetCardProps) {
  return (
    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 transition-all hover:border-amber-500/30">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            {ev > 0 ? (
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span className="font-semibold text-zinc-100">{outcome}</span>
          </div>
          <div className="mt-1 flex items-center gap-3 text-xs text-zinc-500">
            <span>
              EV: <span className={ev > 0 ? 'text-emerald-500' : 'text-red-500'}>{ev > 0 ? '+' : ''}{ev}%</span>
            </span>
            <span>@ {price.toFixed(2)}</span>
            <span>{bookmaker}</span>
          </div>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-xs font-bold text-amber-500">
          +{ev.toFixed(0)}%
        </div>
      </div>
    </div>
  )
}
