'use client'

interface StreakCalendarProps {
  streak: number
  logs: { date: string; wordsReviewed: number; exercisesDone: number }[]
}

export default function StreakCalendar({ streak, logs }: StreakCalendarProps) {
  const today = new Date()
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - (6 - i))
    return d
  })

  const logMap = new Map(logs.map((l) => [l.date, l]))
  const dayNames = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']

  return (
    <div className="flex items-center gap-1">
      {days.map((day, i) => {
        const key = day.toISOString().slice(0, 10)
        const log = logMap.get(key)
        const isToday = i === 6
        const isActive = !!log

        return (
          <div key={key} className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-kawaii-text-light font-semibold">{dayNames[i]}</span>
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all
                ${isActive
                  ? 'bg-kawaii-pink text-white shadow-kawaii-sm'
                  : isToday
                    ? 'bg-kawaii-lavender/10 text-kawaii-text-light border-2 border-dashed border-kawaii-lavender/30'
                    : 'bg-kawaii-lavender/5 text-kawaii-text-light/40'
                }
                ${isToday ? 'ring-2 ring-kawaii-pink/30' : ''}
              `}
            >
              {isActive ? '✓' : day.getDate()}
            </div>
          </div>
        )
      })}
      <div className="ml-3 flex flex-col">
        <span className="text-2xl font-extrabold text-kawaii-pink-dark">{streak}</span>
        <span className="text-xs text-kawaii-text-light font-semibold">ngày liên tiếp</span>
      </div>
    </div>
  )
}
