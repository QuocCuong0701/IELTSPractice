'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Check, X, ArrowRight } from 'lucide-react'
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

const PAIR_COLORS = [
  { bg: 'bg-kawaii-pink/20', border: 'border-kawaii-pink', text: 'text-kawaii-pink-dark' },
  { bg: 'bg-kawaii-lavender/20', border: 'border-kawaii-lavender', text: 'text-kawaii-lavender-dark' },
  { bg: 'bg-kawaii-mint/20', border: 'border-kawaii-mint', text: 'text-green-700' },
  { bg: 'bg-kawaii-peach/20', border: 'border-kawaii-peach', text: 'text-orange-700' },
  { bg: 'bg-kawaii-yellow/20', border: 'border-kawaii-yellow', text: 'text-yellow-700' },
  { bg: 'bg-kawaii-blue/20', border: 'border-kawaii-blue', text: 'text-blue-700' },
  { bg: 'bg-kawaii-coral/20', border: 'border-kawaii-coral', text: 'text-red-700' },
  { bg: 'bg-kawaii-teal/20', border: 'border-kawaii-teal', text: 'text-teal-700' },
  { bg: 'bg-kawaii-rose/20', border: 'border-kawaii-rose', text: 'text-pink-700' },
  { bg: 'bg-kawaii-amber/20', border: 'border-kawaii-amber', text: 'text-amber-700' },
]

export default function SynonymMatchExercise({ exercises, onComplete, onBack }: Props) {
  const [current, setCurrent] = useState(0)
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [matches, setMatches] = useState<Record<string, string>>({})
  const [checked, setChecked] = useState(false)
  const [finished, setFinished] = useState(false)
  const [results, setResults] = useState<boolean[]>([])
  const [totalScore, setTotalScore] = useState(0)

  const ex = exercises[current]
  if (!ex) return null

  const shuffledSynonyms = useMemo(() => {
    return [...ex.pairs].sort(() => Math.random() - 0.5).map((p) => p.synonym)
  }, [current])

  const wordItems = ex.pairs.map((p) => p.word)
  const synonymItems = shuffledSynonyms

  const getPairIndex = (word: string) => {
    return ex.pairs.findIndex((p) => p.word === word)
  }

  const getColorForWord = (word: string) => {
    const idx = getPairIndex(word)
    return PAIR_COLORS[idx] || PAIR_COLORS[0]
  }

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
    const correctCount = ex.pairs.filter((p) => matches[p.word] === p.synonym).length
    const passed = correctCount >= 7

    onComplete(correctCount, ex.pairs.length)
    setResults((prev) => [...prev, passed])
    setTotalScore((prev) => prev + correctCount)

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
    const totalPairs = exercises.reduce((sum, e) => sum + e.pairs.length, 0)
    const allPerfect = results.every((r) => r)
    return (
      <div>
        {allPerfect && <Confetti />}
        <KawaiiCard color="yellow">
          <div className="text-center py-6">
            <p className="text-5xl mb-3">{allPerfect ? '🎉' : '📊'}</p>
            <p className="text-xl font-extrabold text-kawaii-text mb-2">Hoàn thành!</p>
            <p className="text-kawaii-text-light mb-1">{totalScore}/{totalPairs} cặp đúng</p>
            <div className="flex justify-center gap-2 my-3 flex-wrap">
              {results.map((r, i) => (
                <span
                  key={i}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${r ? 'bg-green-400' : 'bg-red-400'}`}
                >
                  {r ? '✓' : '✗'}
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

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            {wordItems.map((word) => {
              const matched = matches[word]
              const isSelected = word === selectedWord
              const color = getColorForWord(word)
              return (
                <motion.button
                  key={word}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => (matched ? removeMatch(word) : handleWordClick(word))}
                  className={`w-full rounded-kawaii px-3 py-2.5 text-sm font-bold text-left transition-all flex items-center gap-2 ${
                    matched
                      ? checked
                        ? ex.pairs.find((p) => p.word === word)?.synonym === matched
                          ? 'bg-green-100 border-2 border-green-400 text-green-700'
                          : 'bg-red-100 border-2 border-red-400 text-red-700'
                        : `${color.bg} border-2 ${color.border} ${color.text}`
                      : isSelected
                        ? 'bg-kawaii-pink/10 border-2 border-kawaii-pink text-kawaii-text'
                        : 'bg-kawaii-lavender/10 border-2 border-transparent text-kawaii-text hover:bg-kawaii-lavender/20'
                  }`}
                >
                  {matched && !checked && <Check size={14} className="shrink-0" />}
                  <span className="flex-1 truncate">{word}</span>
                  {matched && !checked && (
                    <span className="text-[10px] text-kawaii-text-light shrink-0">(chạm để bỏ)</span>
                  )}
                </motion.button>
              )
            })}
          </div>

          <div className="space-y-2">
            {synonymItems.map((synonym) => {
              const pairedWord = Object.entries(matches).find(([, v]) => v === synonym)?.[0]
              const isMatched = !!pairedWord
              const isCorrect = pairedWord && ex.pairs.find((p) => p.word === pairedWord)?.synonym === synonym
              const color = pairedWord ? getColorForWord(pairedWord) : PAIR_COLORS[0]
              return (
                <motion.button
                  key={synonym}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSynonymClick(synonym)}
                  disabled={isMatched || checked}
                  className={`w-full rounded-kawaii px-3 py-2.5 text-sm font-bold transition-all flex items-center gap-2 ${
                    isMatched && checked
                      ? isCorrect
                        ? 'bg-green-100 border-2 border-green-400 text-green-700'
                        : 'bg-red-100 border-2 border-red-400 text-red-700'
                      : isMatched && !checked
                        ? `${color.bg} border-2 ${color.border} ${color.text}`
                        : 'bg-kawaii-peach/10 border-2 border-transparent text-kawaii-text hover:bg-kawaii-peach/20'
                  }`}
                >
                  {isMatched && !checked && <Check size={14} className="shrink-0" />}
                  <span className="flex-1 truncate">{synonym}</span>
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
            {current < exercises.length - 1 ? (
              <>Tiếp theo <ArrowRight size={18} /></>
            ) : (
              'Xem kết quả'
            )}
          </KawaiiButton>
        )}
      </div>
    </div>
  )
}
