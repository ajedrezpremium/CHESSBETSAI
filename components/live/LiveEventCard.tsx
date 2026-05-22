import type { OddsEvent } from '@/lib/odds/types'
import { getBestOdds } from '@/lib/odds/calculator'
import { Calendar, Clock } from 'lucide-react'

interface LiveEventCardProps {
  event: OddsEvent
}

export function LiveEventCard({ event }: LiveEventCardProps) {
  const best = getBestOdds(event)
  const time = new Date(event.commence_time)
  const isLive = time.getTime() < Date.now()

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-all hover:border-zinc-700">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-md bg-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-400 uppercase">
          {event.sport_title}
        </span>
        {isLive && (
          <span className="flex items-center gap-1 text-[10px] font-medium text-red-500">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
            EN VIVO
          </span>
        )}
        {!isLive && (
          <span className="flex items-center gap-1 text-[10px] text-zinc-600">
            <Calendar className="h-3 w-3" />
            {time.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-zinc-100">{event.home_team}</p>
          <p className="text-sm font-semibold text-zinc-100">{event.away_team}</p>
        </div>

        {best && (
          <div className="flex gap-1.5">
            <div className="w-16 rounded-lg bg-zinc-800 px-2 py-1.5 text-center">
              <div className="text-xs font-bold text-zinc-100">{best.home.price.toFixed(2)}</div>
              <div className="text-[9px] text-zinc-600">1</div>
            </div>
            <div className="w-16 rounded-lg bg-zinc-800 px-2 py-1.5 text-center">
              <div className="text-xs font-bold text-zinc-100">{best.draw.price.toFixed(2)}</div>
              <div className="text-[9px] text-zinc-600">X</div>
            </div>
            <div className="w-16 rounded-lg bg-zinc-800 px-2 py-1.5 text-center">
              <div className="text-xs font-bold text-zinc-100">{best.away.price.toFixed(2)}</div>
              <div className="text-[9px] text-zinc-600">2</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
