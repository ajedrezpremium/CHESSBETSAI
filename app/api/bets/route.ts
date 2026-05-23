import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const SPORTS = ['Soccer', 'Basketball', 'Tennis', 'Baseball', 'Football', 'Hockey', 'MMA', 'Boxing', 'Cricket', 'Rugby', 'eSports', 'Other']
const MARKETS = ['1X2', 'Handicap', 'Over/Under', 'Both Score', 'Double Chance', 'Correct Score', 'Moneyline', 'Spread', 'Total', 'Parlay', 'Futures', 'Other']

export async function GET(req: Request) {
  const supabase = await createClient()
  if (!supabase?.auth) return Response.json({ error: 'No auth' }, { status: 401 })
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const url = new URL(req.url)
  const type = url.searchParams.get('type') || undefined
  const limit = parseInt(url.searchParams.get('limit') || '50')
  const offset = parseInt(url.searchParams.get('offset') || '0')

  let query = supabase.from('betting_history').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).range(offset, offset + limit - 1)
  if (type === 'real' || type === 'demo') query = query.eq('type', type)

  const { data, count } = await query
  return Response.json({ data: data || [], count })
}

export async function POST(req: Request) {
  const supabase = await createClient()
  if (!supabase?.auth) return Response.json({ error: 'No auth' }, { status: 401 })
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  if (!body.event_name || !body.selection || !body.odds || !body.stake) {
    return Response.json({ error: 'Missing required fields (event_name, selection, odds, stake)' }, { status: 400 })
  }

  const odds = parseFloat(body.odds)
  const stake = parseFloat(body.stake)
  if (isNaN(odds) || isNaN(stake) || odds <= 0 || stake <= 0) {
    return Response.json({ error: 'Invalid odds or stake' }, { status: 400 })
  }

  const profit = body.result === 'win' ? stake * (odds - 1) :
                 body.result === 'loss' ? -stake : 0

  const { data, error } = await supabase.from('betting_history').insert({
    user_id: user.id,
    event_name: body.event_name,
    market: body.market || '1X2',
    selection: body.selection,
    odds,
    stake,
    result: body.result || 'pending',
    profit,
    sport: body.sport || null,
    notes: body.notes || null,
    type: body.type || 'real',
  }).select().single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

export async function PATCH(req: Request) {
  const supabase = await createClient()
  if (!supabase?.auth) return Response.json({ error: 'No auth' }, { status: 401 })
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  if (!body.id) return Response.json({ error: 'Missing bet id' }, { status: 400 })

  const updates: any = {}
  if (body.event_name) updates.event_name = body.event_name
  if (body.market) updates.market = body.market
  if (body.selection) updates.selection = body.selection
  if (body.odds !== undefined) {
    updates.odds = parseFloat(body.odds)
    if (isNaN(updates.odds)) return Response.json({ error: 'Invalid odds' }, { status: 400 })
  }
  if (body.stake !== undefined) {
    updates.stake = parseFloat(body.stake)
    if (isNaN(updates.stake)) return Response.json({ error: 'Invalid stake' }, { status: 400 })
  }
  if (body.result) updates.result = body.result
  if (body.sport) updates.sport = body.sport
  if (body.notes !== undefined) updates.notes = body.notes
  if (body.type) updates.type = body.type

  // Recalculate profit if result or stake/odds changed
  if (body.result || body.odds !== undefined || body.stake !== undefined) {
    const { data: existing } = await supabase.from('betting_history').select('odds, stake').eq('id', body.id).eq('user_id', user.id).single()
    if (existing) {
      const finalOdds = updates.odds || existing.odds
      const finalStake = updates.stake || existing.stake
      const result = updates.result || existing.result
      updates.profit = result === 'win' ? finalStake * (finalOdds - 1) : result === 'loss' ? -finalStake : 0
    }
  }

  const { data, error } = await supabase.from('betting_history').update(updates).eq('id', body.id).eq('user_id', user.id).select().single()
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

export async function DELETE(req: Request) {
  const supabase = await createClient()
  if (!supabase?.auth) return Response.json({ error: 'No auth' }, { status: 401 })
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const url = new URL(req.url)
  const id = url.searchParams.get('id')
  if (!id) return Response.json({ error: 'Missing bet id' }, { status: 400 })

  const { error } = await supabase.from('betting_history').delete().eq('id', id).eq('user_id', user.id)
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ ok: true })
}
