'use client'

import { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { useLevel, levels, levelColors, type Level } from '@/context/LevelContext'

export default function LevelSelector() {
  const { level, setLevel } = useLevel()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label={`Chọn trình độ. Hiện tại: ${level}`}
        aria-expanded={open}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-kawaii-full text-xs font-bold border-2 transition-all
          ${levelColors[level]} hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kawaii-lavender`}
      >
        {level}
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-50 w-36 bg-white dark:bg-kawaii-card-bg-dark rounded-kawaii shadow-kawaii-lg dark:shadow-kawaii-card-dark border border-kawaii-lavender/10 py-1 overflow-hidden">
            {levels.map((l) => (
              <button
                key={l}
                onClick={() => { setLevel(l); setOpen(false) }}
                className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm font-bold transition-colors
                  ${l === level ? 'bg-kawaii-lavender/10 text-kawaii-text' : 'text-kawaii-text-light hover:bg-kawaii-lavender/5'}`}
              >
                <span className={`w-2 h-2 rounded-full ${levelColors[l].split(' ')[0]}`} />
                {l}
                {l === level && <Check size={14} className="ml-auto text-kawaii-pink-dark" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
