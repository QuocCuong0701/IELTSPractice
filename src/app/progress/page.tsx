'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Flame, Star, BookOpen, BookText, Sparkles, Headphones, PenTool, ClipboardList, Award, Mic } from 'lucide-react'
import KawaiiCard from '@/components/ui/KawaiiCard'
import Badge from '@/components/ui/Badge'
import ProgressRing from '@/components/ui/ProgressRing'
import { useLevel } from '@/context/LevelContext'
import { getAllDailyLogs, getStreak, getAllQuizResults, getAchievements, getMockTestResults, getSpeakingResults } from '@/lib/db'
import { vocabularyData } from '@/data/vocabulary'
import { grammarData } from '@/data/grammar'
import { readingData } from '@/data/reading'
import { listeningData } from '@/data/listening'
import { writingData } from '@/data/writing'
import type { MockTestResult } from '@/types/mock-test'
import type { SpeakingResult } from '@/lib/db'

interface DailyLog { date: string; wordsReviewed: number; exercisesDone: number; quizTaken: number; streak: number }
interface QuizResult { date: number; skill: string; score: number; total: number }
interface Achievement { type: string; unlockedAt: number }

const achievementLabels: Record<string, { label: string; icon: string }> = {
  streak_3: { label: '3 ngày liên tiếp', icon: '🔥' },
  streak_7: { label: '7 ngày liên tiếp', icon: '🔥' },
  streak_30: { label: '30 ngày liên tiếp', icon: '🔥' },
}

export default function ProgressPage() {
  const { level } = useLevel()
  const [streak, setStreak] = useState(0)
  const [logs, setLogs] = useState<DailyLog[]>([])
  const [quizResults, setQuizResults] = useState<QuizResult[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [mockTests, setMockTests] = useState<MockTestResult[]>([])
  const [speakingResults, setSpeakingResults] = useState<SpeakingResult[]>([])
  const [grammarScores, setGrammarScores] = useState<Record<number, number>>({})
  const [readingScores, setReadingScores] = useState<Record<number, number>>({})

  useEffect(() => {
    ;(async () => {
      setStreak(await getStreak(level))
      setLogs(await getAllDailyLogs(level))
      setQuizResults(await getAllQuizResults(level))
      setAchievements(await getAchievements(level))
      setMockTests(await getMockTestResults())
      setSpeakingResults(await getSpeakingResults())
    })()
    const gs = localStorage.getItem(`grammar_scores_${level}`)
    if (gs) setGrammarScores(JSON.parse(gs))
    const rs = localStorage.getItem(`reading_scores_${level}`)
    if (rs) setReadingScores(JSON.parse(rs))
  }, [level])

  const totalVocab = vocabularyData[level]?.length || 0
  const totalGrammar = grammarData[level]?.length || 0
  const totalReading = readingData[level]?.length || 0
  const totalListening = listeningData[level]?.length || 0
  const totalWriting = writingData[level]?.length || 0

  const completedGrammar = Object.keys(grammarScores).length
  const completedReading = Object.keys(readingScores).length

  const avgGrammar = completedGrammar > 0
    ? Math.round(Object.values(grammarScores).reduce((a, b) => a + b, 0) / completedGrammar)
    : 0
  const avgReading = completedReading > 0
    ? Math.round(Object.values(readingScores).reduce((a, b) => a + b, 0) / completedReading)
    : 0

  const avgQuiz = quizResults.length > 0
    ? Math.round(quizResults.reduce((s, r) => s + (r.score / r.total) * 100, 0) / quizResults.length)
    : 0

  const totalActivities = logs.reduce((s, l) => s + l.wordsReviewed + l.exercisesDone + l.quizTaken, 0)

  const skillStats = [
    { label: 'Từ vựng', icon: BookOpen, value: totalVocab, completed: 0, color: 'bg-kawaii-pink/20 text-kawaii-pink-dark' },
    { label: 'Ngữ pháp', icon: BookText, value: `${avgGrammar}%`, completed: `${completedGrammar}/${totalGrammar}`, color: 'bg-kawaii-lavender/20 text-kawaii-lavender-dark' },
    { label: 'Đọc hiểu', icon: Sparkles, value: `${avgReading}%`, completed: `${completedReading}/${totalReading}`, color: 'bg-kawaii-mint/30 text-green-700' },
    { label: 'Nghe', icon: Headphones, value: `${totalListening} bài`, completed: '', color: 'bg-kawaii-peach/30 text-orange-700' },
    { label: 'Viết', icon: PenTool, value: `${totalWriting} đề`, completed: '', color: 'bg-kawaii-yellow/40 text-yellow-700' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-kawaii-text">Tiến độ học tập</h1>
        <p className="text-kawaii-text-light font-semibold mt-1">Theo dõi hành trình IELTS B1 của bạn</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Streak', value: `${streak} ngày`, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Quiz đã làm', value: quizResults.length, icon: ClipboardList, color: 'text-kawaii-pink-dark', bg: 'bg-kawaii-pink/5' },
          { label: 'Điểm TB Quiz', value: `${avgQuiz}%`, icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50' },
          { label: 'Hoạt động', value: totalActivities, icon: Award, color: 'text-kawaii-lavender-dark', bg: 'bg-kawaii-lavender/5' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <KawaiiCard color="white" className="text-center">
              <div className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center mx-auto mb-2`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <p className="text-xl font-extrabold text-kawaii-text">{stat.value}</p>
              <p className="text-xs text-kawaii-text-light font-semibold">{stat.label}</p>
            </KawaiiCard>
          </motion.div>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-extrabold text-kawaii-text mb-3 flex items-center gap-2">
          <Star size={18} className="text-kawaii-yellow-dark" />
          Chi tiết kỹ năng
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {skillStats.map((skill, i) => {
            const Icon = skill.icon
            const progress = skill.label === 'Từ vựng' ? 0 : skill.label === 'Ngữ pháp' ? avgGrammar : skill.label === 'Đọc hiểu' ? avgReading : 0
            return (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <KawaiiCard color="white">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${skill.color.split(' ')[0]} flex items-center justify-center shrink-0`}>
                      <Icon size={20} className={skill.color.split(' ')[1]} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-extrabold text-kawaii-text">{skill.label}</p>
                      <p className="text-sm text-kawaii-text-light">{skill.value}</p>
                      {skill.completed && <p className="text-xs text-kawaii-text-light/60">Đã làm: {skill.completed}</p>}
                    </div>
                    {skill.label !== 'Từ vựng' && skill.label !== 'Nghe' && skill.label !== 'Viết' && (
                      <ProgressRing progress={progress} size={44} strokeWidth={4} />
                    )}
                  </div>
                </KawaiiCard>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-extrabold text-kawaii-text dark:text-kawaii-text-dark mb-3 flex items-center gap-2">
            <Flame size={18} className="text-orange-500" />
            Lịch sử Quiz
          </h2>
          {quizResults.length === 0 ? (
            <KawaiiCard color="white">
              <p className="text-sm text-kawaii-text-light text-center py-4">
                Chưa có kết quả quiz nào. Hãy làm quiz đầu tiên nhé! ✦
              </p>
            </KawaiiCard>
          ) : (
            <div className="space-y-2">
              {quizResults.slice(-10).reverse().map((r, i) => (
                <KawaiiCard key={i} color={r.score / r.total >= 0.8 ? 'mint' : r.score / r.total >= 0.5 ? 'yellow' : 'white'}>
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge variant="pink">{r.score}/{r.total}</Badge>
                      <span className="text-xs text-kawaii-text-light ml-2">
                        {new Date(r.date).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-kawaii-text">
                      {Math.round((r.score / r.total) * 100)}%
                    </span>
                  </div>
                </KawaiiCard>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-extrabold text-kawaii-text mb-3 flex items-center gap-2">
            <Trophy size={18} className="text-yellow-500" />
            Thành tích
          </h2>
          {achievements.length === 0 ? (
            <KawaiiCard color="white">
              <p className="text-sm text-kawaii-text-light text-center py-4">
                Chưa có thành tích nào. Học đều đặn để mở khóa nhé! ✦
              </p>
            </KawaiiCard>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {achievements.map((a, i) => (
                <motion.div
                  key={a.type}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <KawaiiCard color="yellow">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{achievementLabels[a.type]?.icon || '🏆'}</span>
                      <div>
                        <p className="font-extrabold text-kawaii-text">{achievementLabels[a.type]?.label || a.type}</p>
                        <p className="text-xs text-kawaii-text-light">
                          {new Date(a.unlockedAt).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                    </div>
                  </KawaiiCard>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-extrabold text-kawaii-text dark:text-kawaii-text-dark mb-3 flex items-center gap-2">
          <Mic size={18} className="text-kawaii-pink-dark" />
          Speaking History
        </h2>
        {speakingResults.length === 0 ? (
          <KawaiiCard color="white">
            <p className="text-sm text-kawaii-text-light dark:text-kawaii-text-light-dark text-center py-4">
              Chưa có bài Speaking nào. Luyện nói ngay! ✦
            </p>
          </KawaiiCard>
        ) : (
          <div className="grid gap-3">
            {speakingResults.slice(-5).reverse().map((r, i) => (
              <KawaiiCard key={r.id ?? i} color={r.estimatedBand && r.estimatedBand >= 6 ? 'mint' : 'white'}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="pink">Part {r.part}</Badge>
                      {r.estimatedBand && <Badge variant="mint">Band {r.estimatedBand}</Badge>}
                    </div>
                    <p className="text-xs text-kawaii-text-light dark:text-kawaii-text-light-dark mt-1">{r.topic}</p>
                    <p className="text-[10px] text-kawaii-text-light/60">
                      {new Date(r.date).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {r.scores && (
                      <span className="text-[10px] px-2 py-0.5 rounded-kawaii-full bg-kawaii-lavender/10 text-kawaii-text-light">
                        F: {r.scores.fluency} V: {r.scores.vocabulary} G: {r.scores.grammar}
                      </span>
                    )}
                  </div>
                </div>
              </KawaiiCard>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-lg font-extrabold text-kawaii-text dark:text-kawaii-text-dark mb-3 flex items-center gap-2">
          <ClipboardList size={18} className="text-kawaii-lavender-dark" />
          Lịch sử Mock Test
        </h2>
        {mockTests.length === 0 ? (
          <KawaiiCard color="white">
            <p className="text-sm text-kawaii-text-light dark:text-kawaii-text-light-dark text-center py-4">
              Chưa có kết quả mock test nào. Thi thử ngay! ✦
            </p>
          </KawaiiCard>
        ) : (
          <div className="grid gap-3">
            {mockTests.slice(-5).reverse().map((t, i) => (
              <KawaiiCard key={t.id ?? i} color={t.overallBand >= 6.5 ? 'mint' : t.overallBand >= 5.5 ? 'yellow' : 'white'}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="pink">Band {t.overallBand}</Badge>
                      <span className="text-xs text-kawaii-text-light dark:text-kawaii-text-light-dark">
                        {new Date(t.date).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {t.sectionResults.map((r) => (
                        <span key={r.sectionId} className="text-[10px] px-2 py-0.5 rounded-kawaii-full bg-kawaii-lavender/10 text-kawaii-text-light dark:text-kawaii-text-light-dark">
                          {r.title[0]}: {Math.round(r.percentage)}%
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-kawaii-text-light dark:text-kawaii-text-light-dark">
                    {t.sectionResults.reduce((s, r) => s + r.score, 0)}/{t.sectionResults.reduce((s, r) => s + r.total, 0)}
                  </span>
                </div>
              </KawaiiCard>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
