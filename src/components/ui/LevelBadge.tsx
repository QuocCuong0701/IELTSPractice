import { type Level, levelColors } from '@/context/LevelContext'

interface LevelBadgeProps {
  level: Level
  className?: string
}

export default function LevelBadge({ level, className = '' }: LevelBadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${levelColors[level]} ${className}`}>
      {level}
    </span>
  )
}
