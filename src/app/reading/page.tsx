'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check, X, Clock } from 'lucide-react'
import KawaiiCard from '@/components/ui/KawaiiCard'
import KawaiiButton from '@/components/ui/KawaiiButton'
import Badge from '@/components/ui/Badge'
import ProgressRing from '@/components/ui/ProgressRing'
import { useLevel } from '@/context/LevelContext'
import { readingData } from '@/data/reading'
import { updateDailyLog } from '@/lib/db'

export default function ReadingPage() {
  const { level } = useLevel()
  const [selectedPassage, setSelectedPassage] = useState<number | null>(null)
  const [currentQ, setCurrentQ] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [passageScores, setPassageScores] = useState<Record<number, number>>({})
  const [startTime, setStartTime] = useState(0)
  const [elapsed, setElapsed] = useState(0)

  const passages = readingData[level] || []

  useEffect(() => {
    const saved = localStorage.getItem(`reading_scores_${level}`)
    if (saved) setPassageScores(JSON.parse(saved))
  }, [level])

  const passage = selectedPassage !== null ? passages.find((p) => p.id === selectedPassage) : null

  const handleStart = (id: number) => {
    setSelectedPassage(id)
    setCurrentQ(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setCompleted(false)
    setStartTime(Date.now())
    setElapsed(0)
  }

  const handleSelect = (index: number) => {
    if (showResult) return
    setSelectedAnswer(index)
    setShowResult(true)
    if (index === passage!.questions[currentQ].correctIndex) {
      setScore((s) => s + 1)
    }
  }

  const handleNext = () => {
    if (currentQ < (passage?.questions.length || 1) - 1) {
      setCurrentQ((i) => i + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      const pct = Math.round((score / (passage?.questions.length || 1)) * 100)
      const newScores = { ...passageScores, [passage!.id]: pct }
      setPassageScores(newScores)
      localStorage.setItem(`reading_scores_${level}`, JSON.stringify(newScores))
      setElapsed(Math.round((Date.now() - startTime) / 1000))
      setCompleted(true)
      updateDailyLog('exercisesDone', level)
    }
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  if (passage && !completed) {
    const q = passage.questions[currentQ]
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <KawaiiButton variant="ghost" size="sm" onClick={() => setSelectedPassage(null)}>
            <ChevronLeft size={18} /> Quay lại
          </KawaiiButton>
          <Badge variant="pink">{currentQ + 1}/{passage.questions.length}</Badge>
        </div>

        <KawaiiCard color="white">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="mint">{passage.level}</Badge>
            <Badge variant="lavender">{passage.questions.length} câu hỏi</Badge>
          </div>
          <h2 className="text-xl font-extrabold text-kawaii-text mb-3">{passage.title}</h2>
          <div className="prose prose-sm max-w-none text-kawaii-text leading-relaxed whitespace-pre-line">
            {passage.text}
          </div>
        </KawaiiCard>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <KawaiiCard color="lavender">
              <p className="font-bold text-kawaii-text mb-4">
                <span className="text-kawaii-pink-dark">Câu {currentQ + 1}:</span> {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, i) => {
                  let variant: 'white' | 'mint' | 'peach' = 'white'
                  if (showResult) {
                    if (i === q.correctIndex) variant = 'mint'
                    else if (i === selectedAnswer) variant = 'peach'
                  }
                  return (
                    <KawaiiCard
                      key={i}
                      color={variant}
                      hoverable
                      onClick={() => handleSelect(i)}
                      className={`cursor-pointer transition-all ${selectedAnswer !== null ? 'pointer-events-none' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-kawaii-lavender/20 flex items-center justify-center text-sm font-bold text-kawaii-text shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="text-sm font-semibold text-kawaii-text">{opt}</span>
                        {showResult && i === q.correctIndex && <Check size={18} className="text-green-500 ml-auto shrink-0" />}
                        {showResult && i === selectedAnswer && i !== q.correctIndex && <X size={18} className="text-red-400 ml-auto shrink-0" />}
                      </div>
                    </KawaiiCard>
                  )
                })}
              </div>
            </KawaiiCard>
          </motion.div>
        </AnimatePresence>

        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <KawaiiButton variant="pink" className="w-full" onClick={handleNext}>
              {currentQ < passage.questions.length - 1 ? <>Tiếp theo <ChevronRight size={18} /></> : 'Xem kết quả'}
            </KawaiiButton>
          </motion.div>
        )}
      </div>
    )
  }

  if (completed) {
    const pct = Math.round((score / (passage?.questions.length || 1)) * 100)
    return (
      <div className="max-w-md mx-auto text-center space-y-6">
        <KawaiiCard color="yellow">
          <div className="py-6">
            <p className="text-5xl mb-3">📖</p>
            <p className="text-xl font-extrabold text-kawaii-text">Hoàn thành bài đọc!</p>
            <p className="text-3xl font-extrabold text-kawaii-pink-dark my-2">{score}/{passage?.questions.length}</p>
            <Badge variant={pct >= 80 ? 'mint' : pct >= 50 ? 'yellow' : 'pink'}>
              {pct >= 80 ? 'Xuất sắc ✦' : pct >= 50 ? 'Khá tốt' : 'Cố gắng thêm'}
            </Badge>
            <div className="flex items-center justify-center gap-1 mt-3 text-sm text-kawaii-text-light">
              <Clock size={14} /> {formatTime(elapsed)}
            </div>
          </div>
        </KawaiiCard>
        <KawaiiButton variant="pink" onClick={() => setSelectedPassage(null)}>
          Quay lại danh sách
        </KawaiiButton>
      </div>
    )
  }

  const totalPassages = passages.length
  const completedPassages = Object.keys(passageScores).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-kawaii-text">Đọc hiểu</h1>
          <p className="text-kawaii-text-light font-semibold mt-1">Luyện đọc IELTS B1</p>
        </div>
        <ProgressRing progress={totalPassages > 0 ? (completedPassages / totalPassages) * 100 : 0} size={56} strokeWidth={5} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {passages.map((p, i) => {
          const pct = passageScores[p.id]
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <KawaiiCard color={pct !== undefined ? (pct >= 80 ? 'mint' : 'yellow') : 'white'} hoverable onClick={() => handleStart(p.id)}>
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-extrabold text-kawaii-text">{p.title}</p>
                    <div className="flex gap-1.5 mt-2">
                      <Badge variant="mint">{p.level}</Badge>
                      <Badge variant="peach">{p.questions.length} câu</Badge>
                    </div>
                  </div>
                  {pct !== undefined && <ProgressRing progress={pct} size={44} strokeWidth={4} />}
                </div>
              </KawaiiCard>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
