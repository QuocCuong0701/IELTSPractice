'use client'

import { useState } from 'react'
import { Check, X, Lightbulb, ArrowRight } from 'lucide-react'
import KawaiiCard from '@/components/ui/KawaiiCard'
import KawaiiButton from '@/components/ui/KawaiiButton'
import Badge from '@/components/ui/Badge'
import type { GrammarExerciseTransformation } from '@/data/grammar'

interface Props {
  exercises: GrammarExerciseTransformation[]
  onComplete: (score: number, total: number) => void
  onBack: () => void
}

export default function TransformationExercise({ exercises, onComplete, onBack }: Props) {
  const [current, setCurrent] = useState(0)
  const [input, setInput] = useState('')
  const [checked, setChecked] = useState(false)
  const [score, setScore] = useState(0)
  const [results, setResults] = useState<{ correct: boolean }[]>([])
  const [finished, setFinished] = useState(false)

  const ex = exercises[current]
  if (!ex) return null

  const normalize = (s: string) => s.toLowerCase().replace(/[.,!?;:'"]/g, '').replace(/\s+/g, ' ').trim()

  const handleCheck = () => {
    const correct = normalize(input) === normalize(ex.answer)
    if (correct) setScore((s) => s + 1)
    setResults((prev) => [...prev, { correct }])
    setChecked(true)
  }

  const handleNext = () => {
    if (current < exercises.length - 1) {
      setCurrent((i) => i + 1)
      setInput('')
      setChecked(false)
    } else {
      setFinished(true)
      onComplete(score + (checked && normalize(input) === normalize(ex.answer) ? 1 : 0), exercises.length)
    }
  }

  if (finished) {
    const finalScore = results.filter((r) => r.correct).length
    return (
      <KawaiiCard color="yellow">
        <div className="text-center py-6">
          <p className="text-5xl mb-3">{finalScore === exercises.length ? '🎉' : '📊'}</p>
          <p className="text-xl font-extrabold text-kawaii-text mb-2">Hoàn thành!</p>
          <p className="text-kawaii-text-light">{finalScore}/{exercises.length} câu đúng</p>
          <KawaiiButton variant="pink" className="mt-4" onClick={onBack}>Quay lại</KawaiiButton>
        </div>
      </KawaiiCard>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <KawaiiButton variant="ghost" size="sm" onClick={onBack}>← Quay lại</KawaiiButton>
        <Badge variant="pink">{current + 1}/{exercises.length}</Badge>
      </div>

      <KawaiiCard color="white">
        <Badge variant="lavender" className="mb-2">Transformation</Badge>
        <p className="text-sm font-semibold text-kawaii-text-light mb-2">{ex.instruction}</p>
        <div className="bg-kawaii-lavender/10 rounded-kawaii p-4 mb-4">
          <p className="text-lg font-extrabold text-kawaii-text">{ex.prompt}</p>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={checked}
          placeholder="Viết câu trả lời của bạn..."
          className="w-full rounded-kawaii border-2 border-kawaii-lavender/20 p-3 text-sm text-kawaii-text resize-none focus:outline-none focus:border-kawaii-pink transition-colors"
          rows={3}
        />

        {checked && (
          <div className="mt-4 space-y-2">
            <div className={`rounded-kawaii p-3 ${normalize(input) === normalize(ex.answer) ? 'bg-green-100' : 'bg-red-100'}`}>
              <p className="text-sm font-bold flex items-center gap-2">
                {normalize(input) === normalize(ex.answer) ? (
                  <><Check size={16} className="text-green-600" /> Đúng!</>
                ) : (
                  <><X size={16} className="text-red-500" /> Chưa đúng</>
                )}
              </p>
              {normalize(input) !== normalize(ex.answer) && (
                <p className="text-sm text-kawaii-text mt-1">
                  Đáp án: <span className="font-bold text-green-700">{ex.answer}</span>
                </p>
              )}
            </div>
            {ex.hint && (
              <div className="flex items-start gap-2 text-sm text-kawaii-text-light">
                <Lightbulb size={14} className="shrink-0 mt-0.5 text-yellow-500" />
                <span>{ex.hint}</span>
              </div>
            )}
          </div>
        )}
      </KawaiiCard>

      <div className="flex justify-center">
        {!checked ? (
          <KawaiiButton variant="pink" disabled={!input.trim()} onClick={handleCheck}>
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
