'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check, X, RefreshCw, Clock } from 'lucide-react'
import KawaiiCard from '@/components/ui/KawaiiCard'
import KawaiiButton from '@/components/ui/KawaiiButton'
import Badge from '@/components/ui/Badge'
import ProgressRing from '@/components/ui/ProgressRing'
import { useLevel, type Level } from '@/context/LevelContext'
import { vocabularyData } from '@/data/vocabulary'
import { grammarData } from '@/data/grammar'
import { readingData } from '@/data/reading'
import { listeningData } from '@/data/listening'
import { saveQuizResult, updateDailyLog } from '@/lib/db'

interface QuizQuestion {
  type: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

function generateQuestions(level: Level): QuizQuestion[] {
  const questions: QuizQuestion[] = []

  const vocabList = vocabularyData[level] || []
  const grammarList = grammarData[level] || []
  const readingList = readingData[level] || []
  const listeningList = listeningData[level] || []

  const vocab = vocabList.sort(() => Math.random() - 0.5).slice(0, 4)
  for (const v of vocab) {
    const wrong = vocabList.filter((w: any) => w.id !== v.id).sort(() => Math.random() - 0.5).slice(0, 3)
    const options = [v.meaning, ...wrong.map((w: any) => w.meaning)].sort(() => Math.random() - 0.5)
    questions.push({
      type: 'Từ vựng',
      question: `"${v.word}" có nghĩa là gì?`,
      options,
      correctIndex: options.indexOf(v.meaning),
      explanation: `${v.word} (${v.partOfSpeech}): ${v.meaning}`,
    })
  }

  const grammars = grammarList.sort(() => Math.random() - 0.5).slice(0, 3)
  for (const g of grammars) {
    const ex = g.exercises[Math.floor(Math.random() * g.exercises.length)]
    questions.push({
      type: 'Ngữ pháp',
      question: ex.sentence,
      options: ex.options,
      correctIndex: ex.correctIndex,
      explanation: ex.explanation,
    })
  }

  const readings = readingList.sort(() => Math.random() - 0.5).slice(0, 3)
  for (const r of readings) {
    const q = r.questions[Math.floor(Math.random() * r.questions.length)]
    questions.push({
      type: 'Đọc hiểu',
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: `Trích từ bài đọc: "${r.title}"`,
    })
  }

  const listenings = listeningList.sort(() => Math.random() - 0.5).slice(0, 2)
  for (const l of listenings) {
    const s = l.sentences[Math.floor(Math.random() * l.sentences.length)]
    questions.push({
      type: 'Nghe',
      question: s.question,
      options: s.options,
      correctIndex: s.correctIndex,
      explanation: `Chủ đề: "${l.title}"`,
    })
  }

  return questions.sort(() => Math.random() - 0.5)
}

export default function QuizPage() {
  const { level } = useLevel()
  const [started, setStarted] = useState(false)
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQ, setCurrentQ] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const [elapsed, setElapsed] = useState(0)

  const handleStart = useCallback(() => {
    const qs = generateQuestions(level)
    setQuestions(qs)
    setCurrentQ(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setCompleted(false)
    setStartTime(Date.now())
    setStarted(true)
  }, [level])

  const handleSelect = (index: number) => {
    if (showResult) return
    setSelectedAnswer(index)
    setShowResult(true)
    if (index === questions[currentQ].correctIndex) {
      setScore((s) => s + 1)
    }
  }

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((i) => i + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      const secs = Math.round((Date.now() - startTime) / 1000)
      setElapsed(secs)
      setCompleted(true)
      saveQuizResult(level, 'all', score, questions.length)
      updateDailyLog('quizTaken', level)
    }
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  if (!started) {
    return (
      <div className="max-w-lg mx-auto text-center space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <KawaiiCard color="white">
            <p className="text-5xl mb-4">🧠</p>
            <h1 className="text-2xl font-extrabold text-kawaii-text mb-2">Mini Test</h1>
            <p className="text-kawaii-text-light font-semibold mb-4">
              Kiểm tra tổng hợp 4 kỹ năng: Từ vựng, Ngữ pháp, Đọc hiểu, Nghe
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <Badge variant="pink">12 câu hỏi</Badge>
              <Badge variant="lavender">Đa dạng kỹ năng</Badge>
              <Badge variant="mint">Tính điểm ngay</Badge>
            </div>
            <KawaiiButton variant="pink" size="lg" onClick={handleStart}>
              Bắt đầu Quiz
            </KawaiiButton>
          </KawaiiCard>
        </motion.div>
      </div>
    )
  }

  if (completed) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <div className="max-w-md mx-auto text-center space-y-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <KawaiiCard color="yellow">
            <div className="py-6">
              <p className="text-6xl mb-3">
                {pct >= 80 ? '🌟' : pct >= 50 ? '💪' : '📚'}
              </p>
              <p className="text-xl font-extrabold text-kawaii-text">Kết quả</p>
              <p className="text-4xl font-extrabold text-kawaii-pink-dark my-2">
                {score}/{questions.length}
              </p>
              <ProgressRing progress={pct} size={80} strokeWidth={6} />
              <div className="mt-3">
                <Badge variant={pct >= 80 ? 'mint' : pct >= 50 ? 'yellow' : 'pink'}>
                  {pct >= 80 ? 'Xuất sắc ✦' : pct >= 50 ? 'Khá tốt' : 'Cố gắng thêm'}
                </Badge>
              </div>
              <div className="flex items-center justify-center gap-1 mt-3 text-sm text-kawaii-text-light">
                <Clock size={14} /> {formatTime(elapsed)}
              </div>
            </div>
          </KawaiiCard>
        </motion.div>
        <div className="flex gap-3 justify-center">
          <KawaiiButton variant="pink" onClick={handleStart}>
            <RefreshCw size={18} /> Làm lại
          </KawaiiButton>
        </div>
      </div>
    )
  }

  const q = questions[currentQ]
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Badge variant="pink">{q.type}</Badge>
        <Badge variant="lavender">{currentQ + 1}/{questions.length}</Badge>
      </div>

      <div className="w-full bg-kawaii-lavender/10 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-kawaii-pink to-kawaii-lavender rounded-full transition-all duration-300"
          style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <KawaiiCard color="white">
            <p className="font-bold text-kawaii-text text-lg mb-4">{q.question}</p>
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
          className="space-y-3"
        >
          <KawaiiCard color="yellow">
            <div className="flex items-start gap-2">
              <Lightbulb size={18} className="text-yellow-600 shrink-0 mt-0.5" />
              <p className="text-sm text-kawaii-text">{q.explanation}</p>
            </div>
          </KawaiiCard>
          <KawaiiButton variant="pink" className="w-full" onClick={handleNext}>
            {currentQ < questions.length - 1 ? <>Tiếp theo <ChevronRight size={18} /></> : 'Xem kết quả'}
          </KawaiiButton>
        </motion.div>
      )}
    </div>
  )
}

function Lightbulb({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5C7.7 12.8 8 13.5 8 14" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  )
}
