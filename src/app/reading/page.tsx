'use client'

import { useState, useEffect, useCallback, useRef, Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check, X, Clock, AlertTriangle } from 'lucide-react'
import Confetti from '@/components/ui/Confetti'
import KawaiiCard from '@/components/ui/KawaiiCard'
import KawaiiButton from '@/components/ui/KawaiiButton'
import Badge from '@/components/ui/Badge'
import ProgressRing from '@/components/ui/ProgressRing'
import { useLevel } from '@/context/LevelContext'
import { readingData, type ReadingQuestion, type ReadingQuestionType, type MCQReadingQuestion, type SummaryCompletionQuestion, type MatchingInfoQuestion } from '@/data/reading'
import { updateDailyLog } from '@/lib/db'

const TIMER_MINUTES = 20

function useTimer(enabled: boolean, onExpire: () => void) {
  const [remaining, setRemaining] = useState(TIMER_MINUTES * 60)
  const onExpireRef = useRef(onExpire)
  onExpireRef.current = onExpire

  useEffect(() => {
    if (!enabled) return
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) { onExpireRef.current(); return 0 }
        return r - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [enabled])

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return { remaining, formatTimer: formatTime(remaining), isLow: remaining < 120 }
}

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
  const [timerExpired, setTimerExpired] = useState(false)
  const [summaryFilled, setSummaryFilled] = useState<Record<number, number>>({})
  const [matchingFilled, setMatchingFilled] = useState<Record<number, number>>({})

  const passages = readingData[level] || []

  useEffect(() => {
    const saved = localStorage.getItem(`reading_scores_${level}`)
    if (saved) setPassageScores(JSON.parse(saved))
  }, [level])

  const passage = selectedPassage !== null ? passages.find((p) => p.id === selectedPassage) : null

  const finishPassage = () => {
    if (!passage) return
    const pct = Math.round((score / passage.questions.length) * 100)
    const newScores = { ...passageScores, [passage.id]: pct }
    setPassageScores(newScores)
    localStorage.setItem(`reading_scores_${level}`, JSON.stringify(newScores))
    setElapsed(Math.round((Date.now() - startTime) / 1000))
    setCompleted(true)
    updateDailyLog('exercisesDone', level)
  }

  const finishPassageRef = useRef(finishPassage)
  finishPassageRef.current = finishPassage
  const handleTimerExpire = useCallback(() => {
    setTimerExpired(true)
    finishPassageRef.current()
  }, [])

  const { remaining, formatTimer, isLow } = useTimer(!!passage && !completed, handleTimerExpire)

  const handleStart = (id: number) => {
    setSelectedPassage(id)
    setCurrentQ(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setCompleted(false)
    setStartTime(Date.now())
    setElapsed(0)
    setTimerExpired(false)
    setSummaryFilled({})
    setMatchingFilled({})
  }

  const handleSelect = (index: number) => {
    if (showResult || !passage) return
    setSelectedAnswer(index)
    setShowResult(true)
    const q = passage.questions[currentQ]
    if ('correctIndex' in q && index === q.correctIndex) {
      setScore((s) => s + 1)
    }
  }

  const handleSummaryFill = (blankIndex: number, optionIndex: number) => {
    if (showResult || !passage) return
    setSummaryFilled((prev) => ({ ...prev, [blankIndex]: optionIndex }))
  }

  const handleMatchingFill = (itemIndex: number, categoryIndex: number) => {
    if (showResult || !passage) return
    setMatchingFilled((prev) => ({ ...prev, [itemIndex]: categoryIndex }))
  }

  const checkSummaryAnswer = useCallback(() => {
    if (!passage) return
    const q = passage.questions[currentQ]
    if (q.type !== 'summary-completion') return
    const total = q.answers.length
    const correct = Array.from({ length: total }, (_, i) => summaryFilled[i] === q.options.indexOf(q.answers[i]!)).filter(Boolean).length
    if (correct === total) setScore((s) => s + 1)
    setShowResult(true)
  }, [passage, currentQ, summaryFilled])

  const checkMatchingAnswer = useCallback(() => {
    if (!passage) return
    const q = passage.questions[currentQ]
    if (q.type !== 'matching-info') return
    const correct = q.correctMatches.filter((_, i) => matchingFilled[i] === q.correctMatches[i]).length
    if (correct === q.correctMatches.length) setScore((s) => s + 1)
    setShowResult(true)
  }, [passage, currentQ, matchingFilled])

  const handleNext = () => {
    if (!passage) return
    if (currentQ < passage.questions.length - 1) {
      setCurrentQ((i) => i + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      finishPassage()
    }
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const qTypeLabel = (type?: ReadingQuestionType): string => {
    switch (type) {
      case 'tfng': return 'True / False / Not Given'
      case 'headings': return 'Matching Headings'
      case 'summary-completion': return 'Summary Completion'
      case 'matching-info': return 'Matching Information'
      default: return 'Multiple Choice'
    }
  }

  if (passage && !completed) {
    const q = passage.questions[currentQ]
    const qType: ReadingQuestionType = q.type || 'mcq'

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <KawaiiButton variant="ghost" size="sm" onClick={() => setSelectedPassage(null)}>
            <ChevronLeft size={18} /> Quay lại
          </KawaiiButton>
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-1 text-sm font-bold ${isLow ? 'text-red-500' : 'text-kawaii-text-light'}`}>
              <Clock size={16} />
              <span>{formatTimer}</span>
            </div>
            <Badge variant="pink">{currentQ + 1}/{passage.questions.length}</Badge>
          </div>
        </div>

        {timerExpired && (
          <KawaiiCard color="peach">
            <div className="flex items-center gap-2">
              <AlertTriangle size={18} className="text-kawaii-text" />
              <p className="text-sm font-bold text-kawaii-text">Hết giờ! Hoàn thành bài với kết quả hiện tại.</p>
            </div>
          </KawaiiCard>
        )}

        <KawaiiCard color="white">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="mint">{passage.level}</Badge>
            <Badge variant="lavender">{qTypeLabel(qType)}</Badge>
            <Badge variant="peach">{passage.questions.length} câu</Badge>
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
            {qType === 'mcq' && 'question' in q && (
              <MCQRenderer question={q as MCQReadingQuestion} selectedAnswer={selectedAnswer} showResult={showResult} onSelect={handleSelect} />
            )}
            {qType === 'tfng' && 'question' in q && (
              <TFNGRenderer question={q as MCQReadingQuestion} selectedAnswer={selectedAnswer} showResult={showResult} onSelect={handleSelect} />
            )}
            {qType === 'summary-completion' && (
              <SummaryCompletionRenderer
                question={q as SummaryCompletionQuestion}
                filled={summaryFilled}
                showResult={showResult}
                onFill={handleSummaryFill}
              />
            )}
            {qType === 'matching-info' && (
              <MatchingInfoRenderer
                question={q as MatchingInfoQuestion}
                filled={matchingFilled}
                showResult={showResult}
                onMatch={handleMatchingFill}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {!showResult && (qType === 'summary-completion' || qType === 'matching-info') && !timerExpired && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <KawaiiButton variant="pink" className="w-full" onClick={qType === 'summary-completion' ? checkSummaryAnswer : checkMatchingAnswer}>
              Kiểm tra đáp án
            </KawaiiButton>
          </motion.div>
        )}
        {showResult && !timerExpired && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <KawaiiButton variant="pink" className="w-full" onClick={() => { setShowResult(false); setSummaryFilled({}); setMatchingFilled({}); handleNext() }}>
              {currentQ < passage.questions.length - 1 ? <>Tiếp theo <ChevronRight size={18} /></> : 'Xem kết quả'}
            </KawaiiButton>
          </motion.div>
        )}
        {timerExpired && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <KawaiiButton variant="pink" className="w-full" onClick={finishPassage}>
              Xem kết quả
            </KawaiiButton>
          </motion.div>
        )}
      </div>
    )
  }

  if (completed && passage) {
    const pct = Math.round((score / passage.questions.length) * 100)
    return (
      <div className="max-w-md mx-auto text-center space-y-6">
        {pct >= 80 && <Confetti />}
        <KawaiiCard color="yellow">
          <div className="py-6">
            <p className="text-5xl mb-3">📖</p>
            <p className="text-xl font-extrabold text-kawaii-text">Hoàn thành bài đọc!</p>
            <p className="text-3xl font-extrabold text-kawaii-pink-dark my-2">{score}/{passage.questions.length}</p>
            <Badge variant={pct >= 80 ? 'mint' : pct >= 50 ? 'yellow' : 'pink'}>
              {pct >= 80 ? 'Xuất sắc ✦' : pct >= 50 ? 'Khá tốt' : 'Cố gắng thêm'}
            </Badge>
            <div className="flex items-center justify-center gap-1 mt-3 text-sm text-kawaii-text-light">
              <Clock size={14} /> {timerExpired ? `Hết giờ (${formatTime(elapsed)})` : formatTime(elapsed)}
            </div>
          </div>
        </KawaiiCard>
        <KawaiiButton variant="pink" onClick={() => { setSelectedPassage(null); setTimerExpired(false) }}>
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
          <p className="text-kawaii-text-light font-semibold mt-1">Luyện đọc với các dạng câu hỏi IELTS thật</p>
        </div>
        <ProgressRing progress={totalPassages > 0 ? (completedPassages / totalPassages) * 100 : 0} size={56} strokeWidth={5} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {passages.map((p, i) => {
          const pct = passageScores[p.id]
          const hasTFNG = p.questions.some((q) => q.type === 'tfng')
          const hasHeadings = p.questions.some((q) => q.type === 'headings')
          const hasSummary = p.questions.some((q) => q.type === 'summary-completion')
          const hasMatching = p.questions.some((q) => q.type === 'matching-info')
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
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      <Badge variant="mint">{p.level}</Badge>
                      <Badge variant="peach">{p.questions.length} câu</Badge>
                      {hasTFNG && <Badge variant="lavender">TFNG</Badge>}
                      {hasHeadings && <Badge variant="lavender">Headings</Badge>}
                      {hasSummary && <Badge variant="lavender">Summary</Badge>}
                      {hasMatching && <Badge variant="lavender">Matching</Badge>}
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

function MCQRenderer({
  question,
  selectedAnswer,
  showResult,
  onSelect,
}: {
  question: MCQReadingQuestion
  selectedAnswer: number | null
  showResult: boolean
  onSelect: (i: number) => void
}) {
  return (
    <KawaiiCard color="lavender">
      <p className="font-bold text-kawaii-text mb-4">
        <span className="text-kawaii-pink-dark">Câu hỏi:</span> {question.question}
      </p>
      <div className="space-y-2">
        {question.options.map((opt, i) => {
          let variant: 'white' | 'mint' | 'peach' = 'white'
          if (showResult) {
            if (i === question.correctIndex) variant = 'mint'
            else if (i === selectedAnswer) variant = 'peach'
          }
          return (
            <KawaiiCard
              key={i}
              color={variant}
              hoverable
              onClick={() => onSelect(i)}
              className={`cursor-pointer transition-all ${selectedAnswer !== null ? 'pointer-events-none' : ''}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-kawaii-lavender/20 flex items-center justify-center text-sm font-bold text-kawaii-text shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm font-semibold text-kawaii-text">{opt}</span>
                {showResult && i === question.correctIndex && <Check size={18} className="text-green-500 ml-auto shrink-0" />}
                {showResult && i === selectedAnswer && i !== question.correctIndex && <X size={18} className="text-red-400 ml-auto shrink-0" />}
              </div>
            </KawaiiCard>
          )
        })}
      </div>
    </KawaiiCard>
  )
}

function TFNGRenderer({
  question,
  selectedAnswer,
  showResult,
  onSelect,
}: {
  question: MCQReadingQuestion
  selectedAnswer: number | null
  showResult: boolean
  onSelect: (i: number) => void
}) {
  return (
    <KawaiiCard color="lavender">
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="lavender">True / False / Not Given</Badge>
      </div>
      <p className="font-bold text-kawaii-text mb-4">
        <span className="text-kawaii-pink-dark">Câu hỏi:</span> {question.question}
      </p>
      <div className="space-y-2">
        {question.options.map((opt, i) => {
          const isSelected = i === selectedAnswer
          const isCorrect = i === question.correctIndex
          let bgClass = 'bg-white'
          if (showResult && isCorrect) bgClass = 'bg-green-50 border-green-400'
          else if (showResult && isSelected && !isCorrect) bgClass = 'bg-red-50 border-red-400'
          else if (isSelected) bgClass = 'bg-kawaii-pink/10'

          const indicatorBg = showResult ? (isCorrect ? 'bg-green-500' : (isSelected ? 'bg-red-400' : 'bg-gray-200')) : (isSelected ? 'bg-kawaii-pink' : 'bg-gray-200')

          return (
            <KawaiiCard
              key={i}
              color="white"
              hoverable
              onClick={() => onSelect(i)}
              className={`cursor-pointer transition-all border-2 ${bgClass} ${selectedAnswer !== null ? 'pointer-events-none' : 'hover:border-kawaii-pink/40'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 ${indicatorBg}`}>
                  {String.fromCharCode(65 + i)}
                </div>
                <span className="text-sm font-semibold text-kawaii-text">{opt}</span>
                {showResult && i === question.correctIndex && <Check size={18} className="text-green-500 ml-auto shrink-0" />}
                {showResult && i === selectedAnswer && i !== question.correctIndex && <X size={18} className="text-red-400 ml-auto shrink-0" />}
              </div>
            </KawaiiCard>
          )
        })}
      </div>
    </KawaiiCard>
  )
}

function SummaryCompletionRenderer({
  question,
  filled,
  showResult,
  onFill,
}: {
  question: SummaryCompletionQuestion
  filled: Record<number, number>
  showResult: boolean
  onFill: (blankIndex: number, optionIndex: number) => void
}) {
  const blankCount = question.answers.length
  const blankRegex = /\[(\d+)\]/g

  return (
    <KawaiiCard color="lavender">
      <p className="font-bold text-kawaii-text mb-2">
        <span className="text-kawaii-pink-dark">Hướng dẫn:</span> {question.instruction}
      </p>
      <div className="bg-white rounded-xl p-4 mb-4 text-sm leading-relaxed whitespace-pre-line">
        {question.summary.split(blankRegex).map((part, i) => {
          if (i % 2 === 1) {
            const blankIndex = parseInt(part) - 1
            const selected = filled[blankIndex]
            const isCorrect = showResult && selected === question.options.indexOf(question.answers[blankIndex]!)
            const isWrong = showResult && selected !== undefined && selected !== question.options.indexOf(question.answers[blankIndex]!)
            return (
              <span
                key={i}
                className={`inline-block min-w-[80px] mx-1 px-2 py-0.5 rounded text-center border-b-2 font-bold cursor-pointer transition-all
                  ${showResult ? (isCorrect ? 'bg-green-100 border-green-500 text-green-700' : isWrong ? 'bg-red-100 border-red-500 text-red-700' : 'bg-gray-100 border-gray-400 text-gray-500') : selected !== undefined ? 'bg-kawaii-pink/10 border-kawaii-pink text-kawaii-text' : 'bg-white border-gray-300 text-gray-400'}`}
                onClick={() => {
                  if (showResult) return
                  const current = filled[blankIndex]
                  const next = current !== undefined ? (current + 1) % question.options.length : 0
                  onFill(blankIndex, next)
                }}
              >
                {selected !== undefined ? question.options[selected] : `[${blankIndex + 1}]`}
              </span>
            )
          }
          return <span key={i}>{part}</span>
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {question.options.map((word, i) => {
          const usedIn = Object.entries(filled).find(([, v]) => v === i)?.[0]
          return (
            <button
              key={i}
              onClick={() => {
                if (showResult) return
                const firstEmpty = question.answers.findIndex((_, bi) => filled[bi] === undefined)
                if (firstEmpty !== -1) onFill(firstEmpty, i)
              }}
              className={`px-3 py-1 rounded-full text-sm font-semibold transition-all border-2
                ${usedIn !== undefined ? 'bg-kawaii-pink/10 border-kawaii-pink text-kawaii-pink-dark cursor-default' : 'bg-white border-kawaii-lavender/30 text-kawaii-text hover:border-kawaii-pink/40 cursor-pointer'}`}
            >
              {word}
            </button>
          )
        })}
      </div>
      {showResult && (
        <div className="mt-4 space-y-1">
          {question.answers.map((ans, i) => (
            <p key={i} className="text-xs text-kawaii-text-light">
              [{i + 1}] Đáp án: <span className="font-bold text-green-600">{ans}</span>
              {filled[i] !== undefined && (
                <span className={filled[i] === question.options.indexOf(ans!) ? 'text-green-500' : 'text-red-400'}>
                  {' '}(Bạn chọn: {question.options[filled[i]]})
                </span>
              )}
            </p>
          ))}
        </div>
      )}
    </KawaiiCard>
  )
}

function MatchingInfoRenderer({
  question,
  filled,
  showResult,
  onMatch,
}: {
  question: MatchingInfoQuestion
  filled: Record<number, number>
  showResult: boolean
  onMatch: (itemIndex: number, categoryIndex: number) => void
}) {
  return (
    <KawaiiCard color="lavender">
      <p className="font-bold text-kawaii-text mb-4">
        <span className="text-kawaii-pink-dark">Hướng dẫn:</span> {question.instruction}
      </p>
      <div className="space-y-3">
        {question.items.map((item, i) => {
          const selected = filled[i]
          const isCorrect = showResult && selected === question.correctMatches[i]
          const isWrong = showResult && selected !== undefined && selected !== question.correctMatches[i]
          return (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white rounded-xl p-3">
              <span className="font-bold text-kawaii-text min-w-[140px] text-sm shrink-0">
                {String.fromCharCode(65 + i)}. {item}
              </span>
              <select
                value={selected ?? ''}
                onChange={(e) => onMatch(i, parseInt(e.target.value))}
                disabled={showResult}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold border-2 outline-none cursor-pointer
                  ${showResult ? (isCorrect ? 'bg-green-50 border-green-400 text-green-700' : isWrong ? 'bg-red-50 border-red-400 text-red-700' : 'bg-gray-50 border-gray-300') : 'bg-white border-kawaii-lavender/30 text-kawaii-text'}`}
              >
                <option value="" disabled>-- Chọn --</option>
                {question.categories.map((cat, j) => (
                  <option key={j} value={j}>{j + 1}. {cat}</option>
                ))}
              </select>
              {showResult && (
                <span className="text-xs font-bold shrink-0">
                  {isCorrect ? <Check size={16} className="text-green-500" /> : isWrong ? <X size={16} className="text-red-400" /> : null}
                </span>
              )}
            </div>
          )
        })}
      </div>
      {showResult && (
        <div className="mt-4 text-xs text-kawaii-text-light">
          <p className="font-bold mb-1">Đáp án:</p>
          {question.correctMatches.map((match, i) => (
            <span key={i} className="mr-3">{String.fromCharCode(65 + i)}→{match + 1}</span>
          ))}
        </div>
      )}
    </KawaiiCard>
  )
}
