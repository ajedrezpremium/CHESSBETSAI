'use client'

import { useState } from 'react'
import { X, Loader } from 'lucide-react'

const SPORTS = ['Soccer', 'Basketball', 'Tennis', 'Baseball', 'Football', 'Hockey', 'MMA', 'Boxing', 'Cricket', 'Rugby', 'eSports', 'Other']
const MARKETS = ['1X2', 'Handicap', 'Over/Under', 'Both Score', 'Double Chance', 'Correct Score', 'Moneyline', 'Spread', 'Total', 'Parlay', 'Futures', 'Other']

interface BetFormProps {
  onClose: () => void
  onSaved: () => void
  initial?: any
}

export function BetForm({ onClose, onSaved, initial }: BetFormProps) {
  const [eventName, setEventName] = useState(initial?.event_name || '')
  const [market, setMarket] = useState(initial?.market || '1X2')
  const [selection, setSelection] = useState(initial?.selection || '')
  const [odds, setOdds] = useState(initial?.odds?.toString() || '')
  const [stake, setStake] = useState(initial?.stake?.toString() || '')
  const [result, setResult] = useState(initial?.result || 'pending')
  const [sport, setSport] = useState(initial?.sport || '')
  const [type, setType] = useState(initial?.type || 'real')
  const [notes, setNotes] = useState(initial?.notes || '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!eventName.trim() || !selection.trim() || !odds || !stake) {
      setError('Completa todos los campos obligatorios')
      return
    }
    setSaving(true)
    setError('')

    try {
      const method = initial ? 'PATCH' : 'POST'
      const body: any = {
        ...(initial ? { id: initial.id } : {}),
        event_name: eventName.trim(),
        market,
        selection: selection.trim(),
        odds: parseFloat(odds),
        stake: parseFloat(stake),
        result,
        sport: sport || null,
        notes: notes.trim() || null,
        type,
      }

      const res = await fetch('/api/bets', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Error al guardar')
      }

      onSaved()
      onClose()
    } catch (err: any) {
      setError(err.message)
    }
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 p-6" onClick={(e) => e.stopPropagation()}>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-zinc-100">{initial ? 'Editar Apuesta' : 'Nueva Apuesta'}</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-800"><X className="h-5 w-5" /></button>
        </div>

        {error && <div className="mb-4 rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="mb-1 block text-xs text-zinc-500 uppercase tracking-wider">Evento *</label>
              <input value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="Ej: Real Madrid vs Barcelona"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-zinc-100 outline-none focus:border-amber-500/50" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-zinc-500 uppercase tracking-wider">Deporte</label>
              <select value={sport} onChange={(e) => setSport(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-zinc-100 outline-none focus:border-amber-500/50">
                <option value="">Seleccionar</option>
                {SPORTS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-zinc-500 uppercase tracking-wider">Mercado</label>
              <select value={market} onChange={(e) => setMarket(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-zinc-100 outline-none focus:border-amber-500/50">
                {MARKETS.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-zinc-500 uppercase tracking-wider">Selección *</label>
              <input value={selection} onChange={(e) => setSelection(e.target.value)} placeholder="Ej: Local gana"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-zinc-100 outline-none focus:border-amber-500/50" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-zinc-500 uppercase tracking-wider">Cuota *</label>
              <input value={odds} onChange={(e) => setOdds(e.target.value)} placeholder="2.10" type="number" step="0.01" min="1.01"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-zinc-100 outline-none focus:border-amber-500/50" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-zinc-500 uppercase tracking-wider">Stake (€) *</label>
              <input value={stake} onChange={(e) => setStake(e.target.value)} placeholder="50" type="number" step="0.01" min="0.01"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-zinc-100 outline-none focus:border-amber-500/50" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-zinc-500 uppercase tracking-wider">Resultado</label>
              <select value={result} onChange={(e) => setResult(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-zinc-100 outline-none focus:border-amber-500/50">
                <option value="pending">Pendiente</option>
                <option value="win">Win</option>
                <option value="loss">Loss</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-zinc-500 uppercase tracking-wider">Tipo</label>
              <select value={type} onChange={(e) => setType(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-zinc-100 outline-none focus:border-amber-500/50">
                <option value="real">Real</option>
                <option value="demo">Demo / Práctica</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="mb-1 block text-xs text-zinc-500 uppercase tracking-wider">Notas</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="Análisis, reasoning..."
                className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-zinc-100 outline-none focus:border-amber-500/50" />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-zinc-700 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800">
              Cancelar
            </button>
            <button type="submit" disabled={saving} className="flex-1 rounded-xl bg-amber-500 py-2.5 text-sm font-medium text-black hover:bg-amber-400 disabled:opacity-60 flex items-center justify-center gap-2">
              {saving && <Loader className="h-4 w-4 animate-spin" />}
              {saving ? 'Guardando...' : initial ? 'Guardar Cambios' : 'Registrar Apuesta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
