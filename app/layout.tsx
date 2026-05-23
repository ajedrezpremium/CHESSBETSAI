import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ChatBot } from '@/components/ai-agent/ChatBot'
import { ThemeProvider } from '@/components/ThemeProvider'
import OnboardingModal from '@/components/onboarding/OnboardingModal'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Chess Bets Academy — Live Sports Betting Academy',
  description:
    'La mejor academia de apuestas deportivas EN VIVO. Aprende trading deportivo, value betting y análisis cuantitativo con IA.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-black text-zinc-100 antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
          <ChatBot />
          <OnboardingModal />
        </ThemeProvider>
      </body>
    </html>
  )
}
