export type PlanTier = 'free' | 'pro' | 'elite'

export interface PlanConfig {
  tier: PlanTier
  name: string
  price: string
  icon: string
  color: string
  features: string[]
  maxGrado: number
  aiLevel: 'basic' | 'advanced' | 'full'
  apiAccess: boolean
  prioritySupport: boolean
  webinars: boolean
  badge: string
}

export const PLANS: Record<PlanTier, PlanConfig> = {
  free: {
    tier: 'free',
    name: 'Free',
    price: '0€',
    icon: '🎓',
    color: 'text-zinc-400',
    features: [
      'Grados 1 a 5',
      'IA básica (5 consultas/día)',
      'Estadísticas básicas',
      'Acceso a Live Trading',
      'Perfil con histórico',
    ],
    maxGrado: 5,
    aiLevel: 'basic',
    apiAccess: false,
    prioritySupport: false,
    webinars: false,
    badge: 'GRATIS',
  },
  pro: {
    tier: 'pro',
    name: 'Pro',
    price: '29€/mes',
    icon: '⭐',
    color: 'text-amber-500',
    features: [
      'Todos los grados (1-10)',
      'IA avanzada ilimitada',
      'Alertas de value bets',
      'Análisis con contexto completo',
      'Estadísticas avanzadas + gráficos',
      'Soporte prioritario',
    ],
    maxGrado: 10,
    aiLevel: 'advanced',
    apiAccess: false,
    prioritySupport: true,
    webinars: false,
    badge: 'RECOMENDADO',
  },
  elite: {
    tier: 'elite',
    name: 'Elite',
    price: '99€/mes',
    icon: '👑',
    color: 'text-purple-400',
    features: [
      'Todo lo de Pro',
      'IA full con análisis en tiempo real',
      'Acceso a API pública',
      'Webinars semanales en vivo',
      'Sindicato exclusivo Telegram',
      'Soporte 24/7 prioritario',
      'Consultoría personalizada mensual',
    ],
    maxGrado: 10,
    aiLevel: 'full',
    apiAccess: true,
    prioritySupport: true,
    webinars: true,
    badge: 'ÉLITE',
  },
}

export function getPlan(tier: PlanTier): PlanConfig {
  return PLANS[tier] || PLANS.free
}

export function determineTier(xp: number): PlanTier {
  if (xp >= 5000) return 'elite'
  if (xp >= 1000) return 'pro'
  return 'free'
}
