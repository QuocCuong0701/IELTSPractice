'use client'

interface ProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
  color?: string
  bgColor?: string
  label?: string
}

export default function ProgressRing({
  progress,
  size = 80,
  strokeWidth = 8,
  color = '#FFB5C2',
  bgColor = '#F3E8FF',
  label,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (Math.min(progress, 100) / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-kawaii-text font-bold text-sm"
          transform={`rotate(90, ${size / 2}, ${size / 2})`}
        >
          {Math.round(progress)}%
        </text>
      </svg>
      {label && <span className="text-xs text-kawaii-text-light font-semibold">{label}</span>}
    </div>
  )
}
