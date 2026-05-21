'use client'

import { motion } from 'framer-motion'

interface KawaiiCardProps {
  children: React.ReactNode
  className?: string
  hoverable?: boolean
  onClick?: () => void
  color?: 'pink' | 'lavender' | 'mint' | 'peach' | 'yellow' | 'white'
}

const colorMap = {
  pink: 'border-kawaii-pink/20 bg-kawaii-pink/5',
  lavender: 'border-kawaii-lavender/20 bg-kawaii-lavender/5',
  mint: 'border-kawaii-mint/20 bg-kawaii-mint/5',
  peach: 'border-kawaii-peach/20 bg-kawaii-peach/5',
  yellow: 'border-kawaii-yellow/20 bg-kawaii-yellow/5',
  white: 'border-kawaii-lavender/10 bg-white',
}

export default function KawaiiCard({ children, className = '', hoverable, onClick, color = 'white' }: KawaiiCardProps) {
  const Component = hoverable ? motion.div : 'div'
  const motionProps = hoverable
    ? {
        whileHover: { y: -4, boxShadow: '0 8px 32px rgba(195, 174, 214, 0.2)' },
        whileTap: { scale: 0.98 },
      }
    : {}

  return (
    <Component
      className={`rounded-kawaii border-2 p-6 shadow-kawaii-sm transition-all duration-200 ${colorMap[color]} ${hoverable ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </Component>
  )
}
