'use client'

import { useState, useCallback } from 'react'
import Confetti from '@/components/ui/Confetti'

export function useConfetti() {
  const [show, setShow] = useState(false)

  const fire = useCallback(() => {
    setShow(true)
    setTimeout(() => setShow(false), 3000)
  }, [])

  return { fire, ConfettiEl: show ? <Confetti /> : null }
}
