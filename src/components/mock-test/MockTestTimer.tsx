'use client'

import { useEffect, useState, useRef } from 'react'
import { Clock } from 'lucide-react'

interface MockTestTimerProps {
  timeLimit: number
  onTimeUp: () => void
  paused?: boolean
}

export default function MockTestTimer({ timeLimit, onTimeUp, paused }: MockTestTimerProps) {
  const [remaining, setRemaining] = useState(timeLimit * 60)
  const warned = useRef(false)

  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          onTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [timeLimit, onTimeUp, paused])

  const mins = Math.floor(remaining / 60)
  const secs = remaining % 60
  const display = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  const pct = (remaining / (timeLimit * 60)) * 100
  const isLow = remaining < 300 && !warned.current
  if (isLow) warned.current = true

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-kawaii-full text-xs font-bold transition-colors ${
      pct < 10 ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
      pct < 25 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
      'bg-kawaii-lavender/10 text-kawaii-text dark:text-kawaii-text-dark'
    }`}>
      <Clock size={14} />
      <span>{display}</span>
    </div>
  )
}
