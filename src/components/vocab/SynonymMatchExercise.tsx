'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Check, X, ArrowRight, Shuffle } from 'lucide-react'
import KawaiiCard from '@/components/ui/KawaiiCard'
import KawaiiButton from '@/components/ui/KawaiiButton'
import Badge from '@/components/ui/Badge'
import Confetti from '@/components/ui/Confetti'
import type { SynonymMatchExercise as SynonymMatchType } from '@/data/vocabulary-exercises'

interface Props {
  exercises: SynonymMatchType[]
  onComplete: (score: number, total: number) => void
  onBack: () => void
}

export default function SynonymMatchExercise({ exercises, onComplete, onBack }: Props) {
  const [current, setCurrent] = useState(0)
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [matches, setMatches] = useState<Record<string, string>>({})
  const [checked, setChecked] = useState(false)
  const [finished, setFinished] = useState(false)

  const ex = exercises[current]
  if (!ex) return null

  const shuffledSynonyms = useMemo(() => {
    return [...ex.pairs].sort(() => Math.random() - 0.5).map((p) => p.synonym)
  }, [current])

  const wordItems = ex.pairs.map((p) => p.word)
  const synonymItems = shuffledSynonyms

  const handleWordClick = (word: string) => {
    if (checked) return
    setSelectedWord(word)
  }

  const handleSynonymClick = (synonym: string) => {
    if (checked || !selectedWord) return
    if (Object.values(matches).includes(synonym)) return
    setMatches((prev) => ({ ...prev, [selectedWord]: synonym }))
    setSelectedWord(null)
  }

  const removeMatch = (word: string) => {
    if (checked) return
    setMatches((prev) => {
      const next = { ...prev }
      delete next[word]
      return next
    })
  }

  const handleCheck = () => {
    setChecked(true)
  }

  const handleNext = () => {
    if (current < exercises.length - 1) {
      setCurrent((i) => i + 1)
      setMatches({})
      setSelectedWord(null)
      setChecked(false)
    } else {
      setFinished(true)
    }
  }

  const correctCount = checked
    ? ex.pairs.filter((p) => matches[p.word] === p.synonym).length
    : 0

  if (finished) {
    return (
      <KawaiiCard color="yellow">
        <div className="text-center py-6">
          <p className="text-5xl mb-3">🎉</p>
          <p className="text-xl font-extrabold text-kawaii-text mb-2">Hoàn thành!</p>
          <KawaiiButton variant="pink" onClick={onBack}>Quay lại</KawaiiButton>
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
        <p className="font-extrabold text-kawaii-text mb-4 text-center">
          Nối từ với từ đồng nghĩa
        </p>

        {!checked && (
          <p className="text-center text-sm text-kawaii-text-light mb-4">
            {selectedWord
              ? `Đã chọn "${selectedWord}" — hãy chọn từ đồng nghĩa ở cột bên phải`
              : 'Chọn một từ bên trái, sau đó chọn từ đồng nghĩa ở bên phải'}
          </p>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            {wordItems.map((word) => {
              const matched = matches[word]
              const isSelected = word === selectedWord
              return (
                <motion.button
                  key={word}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => matched ? removeMatch(word) : handleWordClick(word)}
                  className={`w-full rounded-kawaii p-3 text-sm font-bold text-left transition-all ${
                    matched
                      ? checked
                        ? word === ex.pairs.find((p) => p.synonym === matched)?.word && ex.pairs.find((p) => p.word === word)?.synonym === matched
                          ? 'bg-green-100 border-2 border-green-400 text-green-700'
                          : 'bg-red-100 border-2 border-red-400 text-red-700'
                        : 'bg-kawaii-mint/20 border-2 border-kawaii-mint text-kawaii-text'
                      : isSelected
                        ? 'bg-kawaii-pink/10 border-2 border-kawaii-pink text-kawaii-text'
                        : 'bg-kawaii-lavender/10 border-2 border-transparent text-kawaii-text hover:bg-kawaii-lavender/20'
                  }`}
                >
                  {word}
                  {matched && !checked && <span className="ml-2 text-xs text-kawaii-text-light">(chạm để bỏ)</span>}
                </motion.button>
              )
            })}
          </div>

          <div className="space-y-2">
            {synonymItems.map((synonym) => {
              const pairedWord = Object.entries(matches).find(([, v]) => v === synonym)?.[0]
              const isMatched = !!pairedWord
              const isCorrect = pairedWord && ex.pairs.find((p) => p.word === pairedWord)?.synonym === synonym
              return (
                <motion.button
                  key={synonym}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSynonymClick(synonym)}
                  disabled={isMatched || checked}
                  className={`w-full rounded-kawaii p-3 text-sm font-bold transition-all ${
                    isMatched && checked
                      ? isCorrect
                        ? 'bg-green-100 border-2 border-green-400 text-green-700'
                        : 'bg-red-100 border-2 border-red-400 text-red-700'
                      : isMatched && !checked
                        ? 'bg-kawaii-mint/20 border-2 border-kawaii-mint text-kawaii-text'
                        : 'bg-kawaii-peach/10 border-2 border-transparent text-kawaii-text hover:bg-kawaii-peach/20'
                  }`}
                >
                  {synonym}
                </motion.button>
              )
            })}
          </div>
        </div>

        {checked && (
          <div className="mt-4 text-center">
            <p className="font-extrabold text-kawaii-text">
              {correctCount}/{ex.pairs.length} đúng
            </p>
          </div>
        )}
      </KawaiiCard>

      <div className="flex justify-center">
        {!checked ? (
          <KawaiiButton
            variant="pink"
            disabled={Object.keys(matches).length < ex.pairs.length}
            onClick={handleCheck}
          >
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
