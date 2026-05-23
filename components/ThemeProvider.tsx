'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

type Theme = 'dark' | 'light' | 'system'

interface ThemeContextType {
  theme: Theme
  resolved: 'dark' | 'light'
  setTheme: (t: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  resolved: 'dark',
  setTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark')
  const [resolved, setResolved] = useState<'dark' | 'light'>('dark')

  const applyTheme = useCallback((t: Theme) => {
    let r: 'dark' | 'light'
    if (t === 'system') {
      r = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
    } else {
      r = t
    }
    setResolved(r)
    document.documentElement.classList.toggle('light', r === 'light')
    document.documentElement.classList.toggle('dark', r === 'dark')
  }, [])

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t)
    localStorage.setItem('chessbets-theme', t)
    applyTheme(t)
  }, [applyTheme])

  useEffect(() => {
    const saved = localStorage.getItem('chessbets-theme') as Theme | null
    const t = saved || 'dark'
    setThemeState(t)
    applyTheme(t)

    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const handler = () => {
      if (t === 'system') applyTheme('system')
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [applyTheme])

  return (
    <ThemeContext.Provider value={{ theme, resolved, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
