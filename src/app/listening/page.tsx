'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Volume2, Check, X } from 'lucide-react'
import KawaiiCard from '@/components/ui/KawaiiCard'
import KawaiiButton from '@/components/ui/KawaiiButton'
import Badge from '@/components/ui/Badge'
import { useLevel } from '@/context/LevelContext'
import { listeningData } from '@/data/listening'
import { updateDailyLog } from '@/lib/db'

export default function ListeningPage() {
  const { level } = useLevel()
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null)
  const [currentS, setCurrentS] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [playing, setPlaying] = useState(false)

  const exercises = listeningData[level] || []
  const exercise = selectedExercise !== null ? exercises.find((e) => e.id === selectedExercise) : null

  const speak = (text: string) => {
    if (typeof window !== 'undefined') {
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'en-US'
      u.rate = 0.8
      speechSynthesis.cancel()
      setPlaying(true)
      u.onend = () => setPlaying(false)
      speechSynthesis.speak(u)
    }
  }

  const handleSelect = (index: number) => {
    if (showResult) return
    setSelectedAnswer(index)
    setShowResult(true)
    if (index === exercise!.sentences[currentS].correctIndex) {
      setScore((s) => s + 1)
    }
  }

  const handleNext = () => {
    if (currentS < (exercise?.sentences.length || 1) - 1) {
      setCurrentS((i) => i + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setCompleted(true)
      updateDailyLog('exercisesDone', level)
    }
  }

  if (exercise && !completed) {
    const s = exercise.sentences[currentS]
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <KawaiiButton variant="ghost" size="sm" onClick={() => { setSelectedExercise(null); setSelectedAnswer(null); setShowResult(false); setScore(0); setCompleted(false) }}>
            <ChevronLeft size={18} /> Quay lại
          </KawaiiButton>
          <Badge variant="pink">{currentS + 1}/{exercise.sentences.length}</Badge>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentS}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <KawaiiCard color="peach" className="text-center">
              <p className="text-sm text-kawaii-text-light font-semibold mb-2">Nhấn nút để nghe</p>
              <motion.button
                onClick={() => speak(s.text)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center transition-all ${playing ? 'bg-kawaii-peach-dark' : 'bg-kawaii-peach'} shadow-kawaii-sm`}
                disabled={playing}
              >
                <Volume2 size={32} className={playing ? 'text-white animate-pulse' : 'text-kawaii-text'} />
              </motion.button>
            </KawaiiCard>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentS}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <KawaiiCard color="white">
              <p className="font-bold text-kawaii-text mb-4">{s.question}</p>
              <div className="space-y-2">
                {s.options.map((opt, i) => {
                  let variant: 'white' | 'mint' | 'peach' = 'white'
                  if (showResult) {
                    if (i === s.correctIndex) variant = 'mint'
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
                        {showResult && i === s.correctIndex && <Check size={18} className="text-green-500 ml-auto shrink-0" />}
                        {showResult && i === selectedAnswer && i !== s.correctIndex && <X size={18} className="text-red-400 ml-auto shrink-0" />}
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
              {currentS < exercise.sentences.length - 1 ? <>Tiếp theo <ChevronRight size={18} /></> : 'Xem kết quả'}
            </KawaiiButton>
          </motion.div>
        )}
      </div>
    )
  }

  if (completed) {
    const pct = Math.round((score / (exercise?.sentences.length || 1)) * 100)
    return (
      <div className="max-w-md mx-auto text-center space-y-6">
        <KawaiiCard color="yellow">
          <div className="py-6">
            <p className="text-5xl mb-3">🎧</p>
            <p className="text-xl font-extrabold text-kawaii-text">Hoàn thành bài nghe!</p>
            <p className="text-3xl font-extrabold text-kawaii-pink-dark my-2">{score}/{exercise?.sentences.length}</p>
            <Badge variant={pct >= 80 ? 'mint' : pct >= 50 ? 'yellow' : 'pink'}>
              {pct >= 80 ? 'Xuất sắc ✦' : pct >= 50 ? 'Khá tốt' : 'Cố gắng thêm'}
            </Badge>
          </div>
        </KawaiiCard>
        <KawaiiButton variant="pink" onClick={() => { setSelectedExercise(null); setSelectedAnswer(null); setShowResult(false); setScore(0); setCompleted(false) }}>
          Quay lại danh sách
        </KawaiiButton>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-kawaii-text">Luyện nghe</h1>
        <p className="text-kawaii-text-light font-semibold mt-1">Nghe và chọn đáp án đúng</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {exercises.map((ex, i) => (
          <motion.div
            key={ex.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <KawaiiCard color="peach" hoverable onClick={() => { setSelectedExercise(ex.id); setCurrentS(0); setScore(0); setCompleted(false) }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-kawaii bg-kawaii-peach/30 flex items-center justify-center shrink-0">
                  <Volume2 size={24} className="text-kawaii-text" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold text-kawaii-text">{ex.title}</p>
                  <p className="text-xs text-kawaii-text-light">{ex.sentences.length} câu</p>
                </div>
              </div>
            </KawaiiCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
