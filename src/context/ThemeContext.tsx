'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface ThemeContextType {
  dark: boolean
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  dark: false,
  toggle: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('dark_mode')
    if (saved !== null) {
      setDark(saved === 'true')
      document.documentElement.classList.toggle('dark', saved === 'true')
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggle = () => {
    setDark((prev) => {
      const next = !prev
      localStorage.setItem('dark_mode', String(next))
      document.documentElement.classList.toggle('dark', next)
      return next
    })
  }

  if (!mounted) return <>{children}</>

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
