interface BadgeProps {
  children: React.ReactNode
  variant?: 'pink' | 'lavender' | 'mint' | 'peach' | 'yellow' | 'blue'
  className?: string
}

const variants = {
  pink: 'bg-kawaii-pink/20 text-kawaii-pink-dark',
  lavender: 'bg-kawaii-lavender/20 text-kawaii-lavender-dark',
  mint: 'bg-kawaii-mint/30 text-green-700',
  peach: 'bg-kawaii-peach/30 text-orange-700',
  yellow: 'bg-kawaii-yellow/40 text-yellow-700',
  blue: 'bg-blue-100 text-blue-700',
}

export default function Badge({ children, variant = 'lavender', className = '' }: BadgeProps) {
  return (
    <span className={`kawaii-tag ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
