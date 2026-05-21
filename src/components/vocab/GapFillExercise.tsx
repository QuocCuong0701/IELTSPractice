'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, ArrowRight } from 'lucide-react'
import KawaiiCard from '@/components/ui/KawaiiCard'
import KawaiiButton from '@/components/ui/KawaiiButton'
import Badge from '@/components/ui/Badge'
import Confetti from '@/components/ui/Confetti'
import type { GapFillExercise as GapFillExerciseType } from '@/data/vocabulary-exercises'

interface Props {
  exercises: GapFillExerciseType[]
  onComplete: (score: number, total: number) => void
  onBack: () => void
}

export default function GapFillExercise({ exercises, onComplete, onBack }: Props) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [results, setResults] = useState<{ correct: boolean }[]>([])

  const ex = exercises[current]
  if (!ex) return null

  const handleSelect = (idx: number) => {
    if (answered) return
    setSelected(idx)
  }

  const handleCheck = () => {
    if (selected === null) return
    const correct = selected === ex.correctIndex
    setAnswered(true)
    if (correct) setScore((s) => s + 1)
    setResults((prev) => [...prev, { correct }])
  }

  const handleNext = () => {
    if (current < exercises.length - 1) {
      setCurrent((i) => i + 1)
      setSelected(null)
      setAnswered(false)
    } else {
      setFinished(true)
      onComplete(score + (selected === ex.correctIndex ? 1 : 0), exercises.length)
    }
  }

  if (finished) {
    const finalScore = results.filter((r) => r.correct).length
    return (
      <div>
        {finalScore === exercises.length && <Confetti />}
        <KawaiiCard color="yellow">
          <div className="text-center py-6">
            <p className="text-5xl mb-3">{finalScore === exercises.length ? '🎉' : '📊'}</p>
            <p className="text-xl font-extrabold text-kawaii-text mb-2">Hoàn thành!</p>
            <p className="text-kawaii-text-light mb-1">{finalScore}/{exercises.length} câu đúng</p>
            <div className="flex justify-center gap-2 my-3">
              {results.map((r, i) => (
                <span key={i} className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${r.correct ? 'bg-green-400' : 'bg-red-400'}`}>
                  {r.correct ? '✓' : '✗'}
                </span>
              ))}
            </div>
            <KawaiiButton variant="pink" onClick={onBack}>Quay lại</KawaiiButton>
          </div>
        </KawaiiCard>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <KawaiiButton variant="ghost" size="sm" onClick={onBack}>← Quay lại</KawaiiButton>
        <Badge variant="pink">{current + 1}/{exercises.length}</Badge>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
        >
          <KawaiiCard color="white">
            <Badge variant="lavender" className="mb-3">{ex.topic}</Badge>
            <p className="text-kawaii-text font-semibold mb-4 leading-relaxed">
              {ex.sentence.replace(ex.blank, '________')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ex.options.map((opt, idx) => {
                const isSelected = selected === idx
                const isCorrect = answered && idx === ex.correctIndex
                const isWrong = answered && isSelected && !isCorrect
                return (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSelect(idx)}
                    className={`rounded-kawaii p-3 text-sm font-bold text-left transition-all ${
                      isCorrect ? 'bg-green-100 border-2 border-green-400 text-green-700' :
                      isWrong ? 'bg-red-100 border-2 border-red-400 text-red-700' :
                      isSelected ? 'bg-kawaii-lavender/20 border-2 border-kawaii-lavender text-kawaii-text' :
                      'bg-kawaii-lavender/10 border-2 border-transparent text-kawaii-text hover:bg-kawaii-lavender/20'
                    }`}
                    disabled={answered}
                  >
                    <span className="flex items-center gap-2">
                      {isCorrect && <Check size={16} />}
                      {isWrong && <X size={16} />}
                      {opt}
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </KawaiiCard>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center">
        {!answered ? (
          <KawaiiButton variant="pink" disabled={selected === null} onClick={handleCheck}>
            <Check size={18} /> Kiểm tra
          </KawaiiButton>
        ) : (
          <KawaiiButton variant="lavender" onClick={handleNext}>
            {current < exercises.length - 1 ? <>Tiếp theo <ArrowRight size={18} /></> : 'Xem kết quả'}
          </KawaiiButton>
        )}
      </div>
    </div>
  )
}
