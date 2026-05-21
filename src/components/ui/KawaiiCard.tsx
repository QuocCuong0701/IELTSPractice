'use client'

import { motion } from 'framer-motion'

interface KawaiiCardProps {
  children: React.ReactNode
  className?: string
  hoverable?: boolean
  onClick?: () => void
  color?: 'pink' | 'lavender' | 'mint' | 'peach' | 'yellow' | 'white' | 'blue'
}

const colorMap = {
  pink: 'border-kawaii-pink/20 bg-kawaii-pink/5 dark:border-kawaii-pink/30 dark:bg-kawaii-pink/10',
  lavender: 'border-kawaii-lavender/20 bg-kawaii-lavender/5 dark:border-kawaii-lavender/30 dark:bg-kawaii-lavender/10',
  mint: 'border-kawaii-mint/20 bg-kawaii-mint/5 dark:border-kawaii-mint/30 dark:bg-kawaii-mint/10',
  peach: 'border-kawaii-peach/20 bg-kawaii-peach/5 dark:border-kawaii-peach/30 dark:bg-kawaii-peach/10',
  yellow: 'border-kawaii-yellow/20 bg-kawaii-yellow/5 dark:border-kawaii-yellow/30 dark:bg-kawaii-yellow/10',
  white: 'border-kawaii-lavender/10 bg-white dark:border-kawaii-lavender/20 dark:bg-kawaii-card-bg-dark',
  blue: 'border-blue-200 bg-blue-50 dark:border-blue-400/30 dark:bg-blue-900/20',
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
