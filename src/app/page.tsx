'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BookOpen,
  BookText,
  Sparkles,
  Headphones,
  PenTool,
  ClipboardList,
  BarChart3,
  ArrowRight,
  Flame,
  Star,
  Trophy,
} from 'lucide-react'
import KawaiiCard from '@/components/ui/KawaiiCard'
import Badge from '@/components/ui/Badge'
import ProgressRing from '@/components/ui/ProgressRing'
import StreakCalendar from '@/components/ui/StreakCalendar'
import { useLevel, type Level } from '@/context/LevelContext'
import { getAllDailyLogs, getStreak, getAllQuizResults, getAchievements } from '@/lib/db'
import { vocabularyData } from '@/data/vocabulary'
import { grammarData } from '@/data/grammar'
import { readingData } from '@/data/reading'
import { listeningData } from '@/data/listening'
import { writingData } from '@/data/writing'

interface DailyLog { date: string; wordsReviewed: number; exercisesDone: number; quizTaken: number; streak: number }
interface QuizResult { skill: string; score: number; total: number }
interface Achievement { type: string; unlockedAt: number }

function moduleDesc(level: Level): Record<string, string> {
  return {
    vocabulary: `Flashcard thông minh`,
    grammar: `${grammarData[level]?.length || 0} bài học`,
    reading: `${readingData[level]?.length || 0} đoạn văn`,
    listening: `${listeningData[level]?.length || 0} bài nghe`,
    writing: `${writingData[level]?.length || 0} đề thi`,
    quiz: 'Kiểm tra 4 kỹ năng',
    progress: 'Thống kê & thành tích',
  }
}

const modules = [
  { href: '/vocabulary', label: 'Từ vựng', key: 'vocabulary', icon: BookOpen, color: 'pink' as const },
  { href: '/grammar', label: 'Ngữ pháp', key: 'grammar', icon: BookText, color: 'lavender' as const },
  { href: '/reading', label: 'Đọc hiểu', key: 'reading', icon: Sparkles, color: 'mint' as const },
  { href: '/listening', label: 'Nghe', key: 'listening', icon: Headphones, color: 'peach' as const },
  { href: '/writing', label: 'Viết', key: 'writing', icon: PenTool, color: 'yellow' as const },
  { href: '/quiz', label: 'Quiz', key: 'quiz', icon: ClipboardList, color: 'pink' as const },
  { href: '/progress', label: 'Tiến độ', key: 'progress', icon: BarChart3, color: 'lavender' as const },
]

export default function Dashboard() {
  const { level } = useLevel()
  const [streak, setStreak] = useState(0)
  const [logs, setLogs] = useState<DailyLog[]>([])
  const [quizResults, setQuizResults] = useState<QuizResult[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const h = new Date().getHours()
    if (h < 12) setGreeting('Chào buổi sáng')
    else if (h < 18) setGreeting('Chào buổi chiều')
    else setGreeting('Chào buổi tối')
  }, [])

  useEffect(() => {
    ;(async () => {
      setStreak(await getStreak(level))
      setLogs(await getAllDailyLogs(level))
      setQuizResults(await getAllQuizResults(level))
      setAchievements(await getAchievements(level))
    })()
  }, [level])

  const avgScore = quizResults.length
    ? Math.round(quizResults.reduce((s, r) => s + (r.score / r.total) * 100, 0) / quizResults.length)
    : 0

  const totalWords = vocabularyData[level]?.length || 0
  const totalQuiz = quizResults.length
  const desc = moduleDesc(level)

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-kawaii-text">
            {greeting} ✦
          </h1>
          <p className="text-kawaii-text-light mt-1 font-semibold">
            Trình độ {level} — Hôm nay bạn học gì nào?
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="pink">
            <Flame size={14} /> Streak {streak}
          </Badge>
          {achievements.length > 0 && (
            <Badge variant="yellow">
              <Trophy size={14} /> {achievements.length}
            </Badge>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <KawaiiCard color="white">
          <StreakCalendar streak={streak} logs={logs} />
        </KawaiiCard>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: 'Từ vựng', value: totalWords, icon: BookOpen, color: 'text-kawaii-pink-dark' },
          { label: 'Quiz đã làm', value: totalQuiz, icon: ClipboardList, color: 'text-kawaii-lavender-dark' },
          { label: 'Điểm TB', value: `${avgScore}%`, icon: Star, color: 'text-kawaii-mint-dark' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.05 }}
          >
            <KawaiiCard color="white" className="text-center">
              <stat.icon size={24} className={`mx-auto mb-2 ${stat.color}`} />
              <p className="text-2xl font-extrabold text-kawaii-text">{stat.value}</p>
              <p className="text-xs text-kawaii-text-light font-semibold">{stat.label}</p>
            </KawaiiCard>
          </motion.div>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-extrabold text-kawaii-text mb-3 flex items-center gap-2">
          <Star size={18} className="text-kawaii-yellow-dark" />
          Các module học
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {modules.map((mod, i) => {
            const Icon = mod.icon
            return (
              <motion.div
                key={mod.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.03 }}
              >
                <Link href={mod.href}>
                  <KawaiiCard color={mod.color} hoverable className="flex items-center gap-4">
                    <div className={`
                      w-12 h-12 rounded-kawaii flex items-center justify-center shrink-0
                      ${mod.color === 'pink' ? 'bg-kawaii-pink/20' : ''}
                      ${mod.color === 'lavender' ? 'bg-kawaii-lavender/20' : ''}
                      ${mod.color === 'mint' ? 'bg-kawaii-mint/30' : ''}
                      ${mod.color === 'peach' ? 'bg-kawaii-peach/30' : ''}
                      ${mod.color === 'yellow' ? 'bg-kawaii-yellow/40' : ''}
                    `}>
                      <Icon size={24} className="text-kawaii-text" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-extrabold text-kawaii-text">{mod.label}</p>
                      <p className="text-xs text-kawaii-text-light">{desc[mod.key]}</p>
                    </div>
                    <ArrowRight size={18} className="text-kawaii-text-light shrink-0" />
                  </KawaiiCard>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
