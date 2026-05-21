'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Level = 'A1-A2' | 'B1' | 'B2' | 'C1' | 'C2'

export const levels: Level[] = ['A1-A2', 'B1', 'B2', 'C1', 'C2']

export const levelColors: Record<Level, string> = {
  'A1-A2': 'bg-green-100 text-green-700 border-green-200',
  'B1': 'bg-blue-100 text-blue-700 border-blue-200',
  'B2': 'bg-purple-100 text-purple-700 border-purple-200',
  'C1': 'bg-orange-100 text-orange-700 border-orange-200',
  'C2': 'bg-red-100 text-red-700 border-red-200',
}

export const levelBadgeColors: Record<Level, 'mint' | 'lavender' | 'pink' | 'peach' | 'yellow'> = {
  'A1-A2': 'mint',
  'B1': 'lavender',
  'B2': 'pink',
  'C1': 'peach',
  'C2': 'yellow',
}

interface LevelContextType {
  level: Level
  setLevel: (l: Level) => void
}

const LevelContext = createContext<LevelContextType>({
  level: 'B1',
  setLevel: () => {},
})

export function LevelProvider({ children }: { children: ReactNode }) {
  const [level, setLevel] = useState<Level>('B1')

  useEffect(() => {
    const saved = localStorage.getItem('selected_level') as Level | null
    if (saved && levels.includes(saved)) setLevel(saved)
  }, [])

  const handleSetLevel = (l: Level) => {
    setLevel(l)
    localStorage.setItem('selected_level', l)
  }

  return (
    <LevelContext.Provider value={{ level, setLevel: handleSetLevel }}>
      {children}
    </LevelContext.Provider>
  )
}

export function useLevel() {
  return useContext(LevelContext)
}
