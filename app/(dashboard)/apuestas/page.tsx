'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Plus, Filter, Edit2, Trash2, CheckCircle, XCircle, Clock, TrendingUp, Wallet, Target, AlertTriangle } from 'lucide-react'
import { BetForm } from '@/components/bets/BetForm'

interface Bet {
  id: string
  event_name: string
  market: string
  selection: string
  odds: number
  stake: number
  result: 'win' | 'loss' | 'pending'
  profit: number
  type: 'real' | 'demo'
  sport: string | null
  notes: string | null
  created_at: string
}

export default function ApuestasPage() {
  const router = useRouter()
  const [bets, setBets] = useState<Bet[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editBet, setEditBet] = useState<Bet | null>(null)
  const [tab, setTab] = useState<'all' | 'real' | 'demo'>('all')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const fetchBets = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }

    let query = supabase.from('betting_history').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(200)
    if (tab === 'real') query = query.eq('type', 'real')
    if (tab === 'demo') query = query.eq('type', 'demo')

    const { data } = await query
    setBets(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchBets() }, [tab, router])

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Eliminar esta apuesta?')) return
    await fetch(`/api/bets?id=${id}`, { method: 'DELETE' })
    fetchBets()
  }

  const handleBatchDelete = async () => {
    if (selectedIds.size === 0) return
    if (!window.confirm(`¿Eliminar ${selectedIds.size} apuestas?`)) return
    for (const id of selectedIds) {
      await fetch(`/api/bets?id=${id}`, { method: 'DELETE' })
    }
    setSelectedIds(new Set())
    fetchBets()
  }

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id); else next.add(id)
    setSelectedIds(next)
  }

  const stats = {
    total: bets.length,
    wins: bets.filter(b => b.result === 'win').length,
    losses: bets.filter(b => b.result === 'loss').length,
    pending: bets.filter(b => b.result === 'pending').length,
    totalStaked: bets.reduce((s, b) => s + Number(b.stake), 0),
    totalProfit: bets.reduce((s, b) => s + Number(b.profit), 0),
  }
  const winRate = (stats.wins + stats.losses) > 0 ? Math.round((stats.wins / (stats.wins + stats.losses)) * 100) : 0
  const roi = stats.totalStaked > 0 ? Math.round((stats.totalProfit / stats.totalStaked) * 10000) / 100 : 0

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Mis Apuestas</h1>
          <p className="text-sm text-zinc-500">{bets.length} registros</p>
        </div>
        <button onClick={() => { setEditBet(null); setShowForm(true) }}
          className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-medium text-black hover:bg-amber-400">
          <Plus className="h-4 w-4" /> Nueva Apuesta
        </button>
      </div>

      {/* Stats bar */}
      <div className="mb-6 grid grid-cols-4 gap-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-center">
          <p className="text-xs text-zinc-500">Total</p>
          <p className="text-lg font-bold text-zinc-100">{stats.total}</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-center">
          <p className="text-xs text-zinc-500">Win Rate</p>
          <p className={`text-lg font-bold ${winRate >= 50 ? 'text-emerald-500' : 'text-red-500'}`}>{winRate}%</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-center">
          <p className="text-xs text-zinc-500">ROI</p>
          <p className={`text-lg font-bold ${roi >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>{roi >= 0 ? '+' : ''}{roi}%</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-center">
          <p className="text-xs text-zinc-500">Profit</p>
          <p className={`text-lg font-bold ${stats.totalProfit >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
            {stats.totalProfit >= 0 ? '+' : ''}{stats.totalProfit.toFixed(2)}€
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-1 rounded-xl border border-zinc-800 bg-zinc-900/50 p-1">
          {(['all', 'real', 'demo'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`rounded-lg px-4 py-1.5 text-xs font-medium transition-colors ${
                tab === t ? 'bg-amber-500 text-black' : 'text-zinc-500 hover:text-zinc-300'
              }`}>
              {t === 'all' ? 'Todas' : t === 'real' ? 'Reales' : 'Demo'}
            </button>
          ))}
        </div>
        {selectedIds.size > 0 && (
          <button onClick={handleBatchDelete} className="flex items-center gap-1 rounded-lg border border-red-500/30 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10">
            <Trash2 className="h-3 w-3" /> Eliminar {selectedIds.size}
          </button>
        )}
      </div>

      {/* Bet list */}
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-zinc-900/50" />
          ))}
        </div>
      ) : bets.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-10 text-center">
          <p className="text-sm text-zinc-500 mb-4">No hay apuestas registradas</p>
          <button onClick={() => { setEditBet(null); setShowForm(true) }}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-black hover:bg-amber-400">
            <Plus className="h-4 w-4" /> Registrar primera apuesta
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {bets.map((bet) => (
            <div key={bet.id} className={`flex items-center gap-3 rounded-xl border p-4 transition-colors ${
              bet.result === 'win' ? 'border-emerald-500/20 bg-emerald-500/5' :
              bet.result === 'loss' ? 'border-red-500/20 bg-red-500/5' :
              'border-zinc-800 bg-zinc-900/50'
            }`}>
              <input type="checkbox" checked={selectedIds.has(bet.id)} onChange={() => toggleSelect(bet.id)}
                className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 accent-amber-500" />

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-zinc-200">{bet.event_name}</p>
                  {bet.sport && <span className="shrink-0 rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-500">{bet.sport}</span>}
                  <span className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] ${
                    bet.type === 'demo' ? 'bg-blue-500/10 text-blue-400' : 'bg-amber-500/10 text-amber-500'
                  }`}>{bet.type === 'demo' ? 'Demo' : 'Real'}</span>
                </div>
                <p className="mt-0.5 text-xs text-zinc-500">
                  {bet.selection} @ {Number(bet.odds).toFixed(2)} · {Number(bet.stake).toFixed(2)}€ · {bet.market}
                </p>
                {bet.notes && <p className="mt-1 text-[10px] text-zinc-600 italic">{bet.notes}</p>}
              </div>

              <div className="shrink-0 text-right">
                <div className={`text-sm font-bold ${bet.result === 'win' ? 'text-emerald-500' : bet.result === 'loss' ? 'text-red-500' : 'text-zinc-500'}`}>
                  {bet.result === 'pending' ? '—' : `${bet.profit >= 0 ? '+' : ''}${Number(bet.profit).toFixed(2)}€`}
                </div>
                <div className="text-[10px] text-zinc-600">
                  {bet.result === 'pending' ? <Clock className="inline h-3 w-3" /> :
                   bet.result === 'win' ? <CheckCircle className="inline h-3 w-3 text-emerald-500" /> :
                   <XCircle className="inline h-3 w-3 text-red-500" />}
                  {' '}{new Date(bet.created_at).toLocaleDateString()}
                </div>
              </div>

              <div className="flex shrink-0 gap-1">
                <button onClick={() => { setEditBet(bet); setShowForm(true) }}
                  className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-800"><Edit2 className="h-3.5 w-3.5" /></button>
                <button onClick={() => handleDelete(bet.id)}
                  className="rounded-lg p-1.5 text-zinc-500 hover:bg-red-500/10 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <BetForm
          initial={editBet}
          onClose={() => { setShowForm(false); setEditBet(null) }}
          onSaved={fetchBets}
        />
      )}
    </div>
  )
}
