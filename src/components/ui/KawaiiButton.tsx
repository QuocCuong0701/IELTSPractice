'use client'

import { motion } from 'framer-motion'
import { forwardRef } from 'react'

interface KawaiiButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'pink' | 'lavender' | 'mint' | 'peach' | 'yellow' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const variants = {
  pink: 'bg-kawaii-pink text-white hover:bg-kawaii-pink-dark shadow-kawaii-sm',
  lavender: 'bg-kawaii-lavender text-white hover:bg-kawaii-lavender-dark shadow-kawaii-sm',
  mint: 'bg-kawaii-mint text-kawaii-text hover:bg-kawaii-mint-dark shadow-kawaii-sm dark:text-kawaii-text-dark',
  peach: 'bg-kawaii-peach text-kawaii-text hover:bg-kawaii-peach-dark shadow-kawaii-sm dark:text-kawaii-text-dark',
  yellow: 'bg-kawaii-yellow text-kawaii-text hover:bg-kawaii-yellow-dark shadow-kawaii-sm dark:text-kawaii-text-dark',
  ghost: 'bg-transparent text-kawaii-lavender-dark hover:bg-kawaii-lavender/10 dark:text-kawaii-lavender',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const KawaiiButton = forwardRef<HTMLButtonElement, KawaiiButtonProps>(
  ({ variant = 'pink', size = 'md', loading, children, className = '', disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled ? 1 : 1.03 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        className={`kawaii-button font-bold ${variants[variant]} ${sizes[size]} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kawaii-lavender ${className}`}
        disabled={disabled || loading}
        {...(props as any)}
      >
        {loading ? (
          <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          children
        )}
      </motion.button>
    )
  }
)

KawaiiButton.displayName = 'KawaiiButton'
export default KawaiiButton
