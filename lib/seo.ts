import type { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://chess-bets-academy.vercel.app'

export function buildMeta(overrides: {
  title: string
  description: string
  path?: string
  image?: string
}): Metadata {
  const title = `${overrides.title} | Chess Bets Academy`
  return {
    title,
    description: overrides.description,
    openGraph: {
      title,
      description: overrides.description,
      url: overrides.path ? `${BASE_URL}${overrides.path}` : BASE_URL,
      siteName: 'Chess Bets Academy',
      images: overrides.image ? [{ url: overrides.image }] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: overrides.description,
    },
  }
}
