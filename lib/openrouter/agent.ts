import { createClient } from '@/lib/supabase/server'
import { getOdds } from '@/lib/odds/client'

const BASE_SYSTEM_PROMPT = `Actúa como "Live Sports Bets AI", un sistema profesional de análisis y trading de apuestas deportivas especializado en apuestas EN VIVO (live betting) y detección de valor contra las cuotas de las casas de apuestas.

OBJETIVO:
Maximizar el ROI sostenible a largo plazo mediante:
- análisis estadístico avanzado
- lectura contextual del partido
- modelos predictivos
- gestión profesional del bankroll
- detección de value bets
- análisis de momentum

ROL:
Eres trader deportivo profesional, analista cuantitativo, experto en machine learning,
especialista en mercados live, experto en probabilidades implícitas y entrenador educativo.

FUNCIONES:
1. Detectar apuestas de valor
2. Comparar cuotas entre múltiples casas
3. Calcular probabilidades reales vs implícitas
4. Analizar momentum en vivo
5. Recomendar stake usando Kelly Criterion
6. Clasificar riesgos: bajo, medio, alto

IMPORTANTE:
- Nunca prometer ganancias garantizadas
- Priorizar sostenibilidad y gestión de riesgo
- Rechazar apuestas sin valor esperado positivo (EV+)
- Detectar sesgos emocionales
- RESPONDE SIEMPRE EN ESPAÑOL, sin importar el idioma del usuario`

export interface AgentMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface UserContext {
  name?: string
  elo: number
  xp: number
  streak: number
  bankroll: number
  recentBets: { event_name: string; result: string; profit: number }[]
}

export interface OddsContext {
  event: string
  home_team: string
  away_team: string
  outcomes: { name: string; price: number }[]
}[]

export async function chatWithAgent(
  messages: AgentMessage[],
  userContext?: UserContext | null,
  oddsContext?: OddsContext[] | null
) {
  let systemPrompt = BASE_SYSTEM_PROMPT

  if (userContext) {
    systemPrompt += `\n\nCONTEXTO DEL USUARIO:\n- Nombre: ${userContext.name || 'No disponible'}\n- ELO: ${userContext.elo}\n- XP: ${userContext.xp}\n- Racha: ${userContext.streak} días\n- Bankroll: ${userContext.bankroll}€\n- Apuestas recientes: ${userContext.recentBets.length > 0 ? userContext.recentBets.map(b => `${b.event_name}: ${b.result} (${b.profit > 0 ? '+' : ''}${b.profit}€)`).join(', ') : 'Sin apuestas recientes'}`
  }

  if (oddsContext && oddsContext.length > 0) {
    systemPrompt += `\n\nPARTIDOS DISPONIBLES AHORA:\n${oddsContext.map(o => `- ${o.home_team} vs ${o.away_team}: ${o.outcomes.map(out => `${out.name} @${out.price}`).join(', ')}`).join('\n')}\n\nUSA estos datos para responder preguntas sobre partidos específicos. Si el usuario consulta un partido que está en esta lista, proporciona análisis detallado con las cuotas reales.`
  }

  const response = await fetch(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'Chess Bets Academy',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    }
  )

  return response
}

export async function buildUserContext(): Promise<UserContext | null> {
  try {
    const supabase = await createClient()
    if (!supabase?.auth) return null
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, elo, xp, streak, bankroll')
      .eq('id', user.id)
      .single()

    if (!profile) return null

    const { data: bets } = await supabase
      .from('betting_history')
      .select('event_name, result, profit')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5)

    return {
      name: profile.full_name,
      elo: profile.elo || 1000,
      xp: profile.xp || 0,
      streak: profile.streak || 0,
      bankroll: profile.bankroll || 1000,
      recentBets: (bets || []).map((b: any) => ({
        event_name: b.event_name,
        result: b.result,
        profit: Number(b.profit),
      })),
    }
  } catch {
    return null
  }
}

export async function buildOddsContext(): Promise<OddsContext[] | null> {
  try {
    const apiKey = process.env.ODDS_API_KEY
    if (!apiKey) return null
    const events = await getOdds('upcoming', 'uk,us,eu')
    if (!events || events.length === 0) return null

    return events.slice(0, 10).map((e: any) => ({
      event: e.id,
      home_team: e.home_team,
      away_team: e.away_team,
      outcomes: e.bookmakers?.[0]?.markets?.[0]?.outcomes?.map((o: any) => ({
        name: o.name,
        price: o.price,
      })) || [],
    }))
  } catch {
    return null
  }
}
