export interface UserProfile {
  id: string
  email: string
  name?: string
  avatar_url?: string
  role: 'student' | 'admin'
  elo: number
  xp: number
  streak: number
  created_at: string
}

export interface Grado {
  id: number
  nombre: string
  descripcion: string
  icono: string
  color: string
  lecciones: number
  completado: boolean
  progreso: number
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
}

export interface ValueBet {
  id: string
  deporte: string
  partido: string
  cuota: number
  probabilidad_real: number
  probabilidad_implicita: number
  valor: number
  stake: number
  riesgo: 'bajo' | 'medio' | 'alto'
  timing: string
}

export interface LiveEvent {
  id: string
  deporte: string
  partido: string
  marcador: string
  minuto: number
  cuotas: Record<string, number>
  momentum: 'local' | 'visitante' | 'equilibrado'
}
