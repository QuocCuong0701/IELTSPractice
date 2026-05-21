'use client'

import { useState, useCallback, use, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check, X, Headphones, BookOpen, PenTool, Mic, AlertTriangle } from 'lucide-react'
import KawaiiCard from '@/components/ui/KawaiiCard'
import KawaiiButton from '@/components/ui/KawaiiButton'
import Badge from '@/components/ui/Badge'
import Confetti from '@/components/ui/Confetti'
import MockTestTimer from '@/components/mock-test/MockTestTimer'
import { mockTestList, estimateBand, calculateOverallBand, type MockTestSection, type MockTestResult, type SectionResult } from '@/types/mock-test'
import { useLevel } from '@/context/LevelContext'
import { useRouter } from 'next/navigation'
import { saveMockTestResult } from '@/lib/db'

const sectionIcons: Record<string, typeof Headphones> = {
  listening: Headphones,
  reading: BookOpen,
  writing: PenTool,
  speaking: Mic,
}

const sectionColors: Record<string, 'pink' | 'lavender' | 'mint' | 'peach' | 'yellow'> = {
  listening: 'lavender',
  reading: 'peach',
  writing: 'mint',
  speaking: 'yellow',
}

export default function MockTestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { level } = useLevel()

  const test = mockTestList.find((t) => t.id === id)
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0)
  const [currentQIdx, setCurrentQIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [sectionScores, setSectionScores] = useState<SectionResult[]>([])
  const [started, setStarted] = useState(false)
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false)

  if (!test) {
    return (
      <div className="text-center py-20">
        <p className="text-lg font-bold text-kawaii-text dark:text-kawaii-text-dark">Test not found</p>
        <a href="/mock-test" className="text-kawaii-lavender-dark text-sm mt-2 inline-block">← Back to tests</a>
      </div>
    )
  }

  const section = test.sections[currentSectionIdx]
  const question = section?.questions[currentQIdx]
  const totalQuestions = section?.questions.length ?? 0
  const isWriting = section?.type === 'writing'
  const isSpeaking = section?.type === 'speaking'

  const handleAnswer = useCallback((answer: string) => {
    setAnswers((prev) => ({ ...prev, [question?.id ?? '']: answer }))
  }, [question?.id])

  const handleNext = useCallback(() => {
    if (currentQIdx < totalQuestions - 1) {
      setCurrentQIdx((i) => i + 1)
    }
  }, [currentQIdx, totalQuestions])

  const handlePrev = useCallback(() => {
    if (currentQIdx > 0) {
      setCurrentQIdx((i) => i - 1)
    }
  }, [currentQIdx])

  const scoreSection = useCallback((sec: MockTestSection, ans: Record<string, string>): SectionResult => {
    let score = 0
    const total = sec.questions.filter((q) => q.type !== 'writing' && q.type !== 'speaking').length
    const sectionAnswers: Record<string, string> = {}

    for (const q of sec.questions) {
      const userAns = ans[q.id]
      sectionAnswers[q.id] = userAns ?? ''
      if (q.type === 'writing' || q.type === 'speaking') continue
      if (userAns === q.correctAnswer) score++
    }

    const pct = total > 0 ? (score / total) * 100 : 0
    return {
      sectionId: sec.id,
      type: sec.type,
      title: sec.title,
      score,
      total,
      percentage: pct,
      bandEstimate: estimateBand(pct),
      answers: sectionAnswers,
    }
  }, [])

  const handleSubmitSection = useCallback(() => {
    const result = scoreSection(section, answers)
    setSectionScores((prev) => [...prev, result])

    if (currentSectionIdx < test.sections.length - 1) {
      setCurrentSectionIdx((i) => i + 1)
      setCurrentQIdx(0)
    } else {
      setSubmitted(true)
    }
  }, [section, answers, scoreSection, currentSectionIdx, test.sections.length])

  const handleTimeUp = useCallback(() => {
    handleSubmitSection()
  }, [handleSubmitSection])

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <KawaiiCard color="lavender">
            <div className="text-center py-6">
              <p className="text-5xl mb-4">📝</p>
              <h1 className="text-2xl font-extrabold text-kawaii-text dark:text-kawaii-text-dark mb-2">{test.title}</h1>
              <Badge variant="pink">Target Band {test.bandTarget}</Badge>
              <p className="text-sm text-kawaii-text-light dark:text-kawaii-text-light-dark mt-4 mb-6">{test.description}</p>

              <div className="grid gap-3 mb-6 text-left">
                {test.sections.map((s, i) => {
                  const Icon = sectionIcons[s.type]
                  return (
                    <div key={s.id} className="flex items-center gap-3 p-3 rounded-kawaii bg-kawaii-lavender/5 dark:bg-kawaii-lavender/10">
                      <div className="w-8 h-8 rounded-full bg-kawaii-lavender/20 flex items-center justify-center">
                        <Icon size={16} className="text-kawaii-lavender-dark" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-kawaii-text dark:text-kawaii-text-dark">
                          Section {i + 1}: {s.title}
                        </p>
                        <p className="text-xs text-kawaii-text-light dark:text-kawaii-text-light-dark">
                          {s.questions.length} questions · {s.timeLimit} minutes
                        </p>
                      </div>
                      <Badge variant="pink">{s.type}</Badge>
                    </div>
                  )
                })}
              </div>

              <KawaiiButton variant="pink" onClick={() => setStarted(true)}>
                Begin Test
              </KawaiiButton>
            </div>
          </KawaiiCard>
        </motion.div>
      </div>
    )
  }

  useEffect(() => {
    if (submitted && sectionScores.length > 0) {
      const overallBand = calculateOverallBand(sectionScores.map((r) => r.bandEstimate))
      const resultData: MockTestResult = {
        testId: test.id,
        date: Date.now(),
        sectionResults: sectionScores,
        overallBand,
      }
      sessionStorage.setItem('mockTestResult', JSON.stringify(resultData))
      saveMockTestResult(resultData)
    }
  }, [submitted, sectionScores, test.id])

  if (submitted) {
    const allResults = sectionScores
    const overallBand = calculateOverallBand(allResults.map((r) => r.bandEstimate))
    const totalScore = allResults.reduce((a, r) => a + r.score, 0)
    const totalQ = allResults.reduce((a, r) => a + r.total, 0)

    return (
      <div className="max-w-2xl mx-auto">
        {overallBand >= 6.5 && <Confetti />}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <KawaiiCard color="yellow">
            <div className="text-center py-6">
              <p className="text-5xl mb-3">{overallBand >= 6.5 ? '🎉' : '📊'}</p>
              <h1 className="text-2xl font-extrabold text-kawaii-text dark:text-kawaii-text-dark mb-1">Test Complete!</h1>
              <p className="text-4xl font-extrabold text-kawaii-lavender-dark my-3">Band {overallBand}</p>
              <p className="text-sm text-kawaii-text-light dark:text-kawaii-text-light-dark mb-6">
                {totalScore}/{totalQ} correct across all sections
              </p>

              <div className="grid gap-3 mb-6 text-left">
                {allResults.map((r, i) => {
                  const Icon = sectionIcons[r.type]
                  return (
                    <div key={r.sectionId} className="flex items-center gap-3 p-3 rounded-kawaii bg-kawaii-lavender/5 dark:bg-kawaii-lavender/10">
                      <div className="w-8 h-8 rounded-full bg-kawaii-lavender/20 flex items-center justify-center">
                        <Icon size={16} className="text-kawaii-lavender-dark" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-kawaii-text dark:text-kawaii-text-dark">Section {i + 1}: {r.title}</p>
                        <p className="text-xs text-kawaii-text-light dark:text-kawaii-text-light-dark">
                          {r.score}/{r.total} correct · Band {r.bandEstimate}
                        </p>
                      </div>
                      <Badge variant={r.percentage >= 70 ? 'mint' : 'peach'}>
                        {Math.round(r.percentage)}%
                      </Badge>
                    </div>
                  )
                })}
              </div>

              <div className="flex gap-3 justify-center">
                <KawaiiButton variant="lavender" onClick={() => router.push('/mock-test')}>
                  Back to Tests
                </KawaiiButton>
                <KawaiiButton variant="pink" onClick={() => router.push('/progress')}>
                  View Progress
                </KawaiiButton>
              </div>
            </div>
          </KawaiiCard>
        </motion.div>
      </div>
    )
  }

  const sectionAnswered = section.questions.filter((q) => answers[q.id]).length

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {test.sections.map((s, i) => {
            const Icon = sectionIcons[s.type]
            return (
              <button
                key={s.id}
                onClick={() => {
                  if (i < currentSectionIdx) {
                    setCurrentSectionIdx(i)
                    setCurrentQIdx(0)
                  }
                }}
                disabled={i > currentSectionIdx}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-kawaii-full text-xs font-bold transition-colors
                  ${i === currentSectionIdx
                    ? 'bg-kawaii-lavender/20 text-kawaii-lavender-dark'
                    : i < currentSectionIdx
                    ? 'bg-kawaii-mint/20 text-kawaii-mint-dark'
                    : 'bg-kawaii-lavender/5 text-kawaii-text-light/50'
                  }`}
                aria-label={`Section ${i + 1}: ${s.title}`}
              >
                <Icon size={12} />
                <span className="hidden sm:inline">{s.title}</span>
              </button>
            )
          })}
        </div>

        <MockTestTimer
          timeLimit={section.timeLimit}
          onTimeUp={handleTimeUp}
        />
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant={sectionColors[section.type]}>{section.title}</Badge>
          <span className="text-xs text-kawaii-text-light dark:text-kawaii-text-light-dark">
            Question {currentQIdx + 1} of {totalQuestions}
            {sectionAnswered < totalQuestions && (
              <span className="ml-1">({sectionAnswered} answered)</span>
            )}
          </span>
        </div>

        <div className="flex gap-1">
          {section.questions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => setCurrentQIdx(i)}
              className={`w-5 h-5 rounded-full text-[10px] font-bold transition-colors
                ${i === currentQIdx ? 'bg-kawaii-lavender text-white' :
                  answers[q.id] ? 'bg-kawaii-mint/50 text-white' :
                  'bg-kawaii-lavender/10 text-kawaii-text-light'}`}
              aria-label={`Go to question ${i + 1}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question?.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <KawaiiCard color={sectionColors[section.type]}>
            {section.type === 'writing' ? (
              <div>
                <p className="text-sm font-semibold text-kawaii-text-light dark:text-kawaii-text-light-dark mb-1">
                  {question?.id === 'w1' ? 'Task 1' : 'Task 2'}
                </p>
                <h3 className="text-base font-extrabold text-kawaii-text dark:text-kawaii-text-dark mb-3 whitespace-pre-line">
                  {question?.questionText}
                </h3>
                <textarea
                  value={answers[question?.id ?? ''] ?? ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  placeholder="Write your answer here..."
                  rows={12}
                  className="w-full p-4 rounded-kawaii border-2 border-kawaii-lavender/20 bg-white dark:bg-kawaii-card-bg-dark text-sm text-kawaii-text dark:text-kawaii-text-dark placeholder:text-kawaii-text-light/50 focus:outline-none focus:ring-2 focus:ring-kawaii-lavender resize-none"
                />
              </div>
            ) : isSpeaking ? (
              <div>
                <h3 className="text-base font-extrabold text-kawaii-text dark:text-kawaii-text-dark mb-3 whitespace-pre-line">
                  {question?.questionText}
                </h3>
                {question?.explanation && (
                  <p className="text-xs text-kawaii-text-light dark:text-kawaii-text-light-dark italic mb-3">
                    💡 {question.explanation}
                  </p>
                )}
                <textarea
                  value={answers[question?.id ?? ''] ?? ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  placeholder="Write your notes or transcript here..."
                  rows={6}
                  className="w-full p-4 rounded-kawaii border-2 border-kawaii-lavender/20 bg-white dark:bg-kawaii-card-bg-dark text-sm text-kawaii-text dark:text-kawaii-text-dark placeholder:text-kawaii-text-light/50 focus:outline-none focus:ring-2 focus:ring-kawaii-lavender resize-none"
                />
              </div>
            ) : (
              <div>
                {question?.passage && (
                  <div className="mb-4 p-4 rounded-kawaii bg-white/60 dark:bg-kawaii-card-bg-dark/60 text-sm text-kawaii-text dark:text-kawaii-text-dark leading-relaxed max-h-60 overflow-y-auto whitespace-pre-line">
                    {question.passage}
                  </div>
                )}

                {question?.audioScript && (
                  <div className="mb-4 p-3 rounded-kawaii bg-kawaii-lavender/10 text-xs text-kawaii-text-light dark:text-kawaii-text-light-dark whitespace-pre-line">
                    <span className="font-bold">🎧 Audio Script:</span>
                    <p className="mt-1">{question.audioScript}</p>
                  </div>
                )}

                <h3 className="text-base font-extrabold text-kawaii-text dark:text-kawaii-text-dark mb-4 whitespace-pre-line">
                  {question?.questionText}
                </h3>

                <div className="grid gap-2">
                  {question?.options?.map((opt) => {
                    const selected = answers[question.id] === opt.label
                    return (
                      <button
                        key={opt.label}
                        onClick={() => handleAnswer(opt.label)}
                        className={`flex items-center gap-3 p-3 rounded-kawaii border-2 text-left text-sm font-medium transition-all
                          ${selected
                            ? 'border-kawaii-lavender bg-kawaii-lavender/10 text-kawaii-text dark:text-kawaii-text-dark'
                            : 'border-kawaii-lavender/10 bg-white dark:bg-kawaii-card-bg-dark text-kawaii-text-light dark:text-kawaii-text-light-dark hover:border-kawaii-lavender/30'
                          }`}
                      >
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                          ${selected ? 'bg-kawaii-lavender text-white' : 'bg-kawaii-lavender/10 text-kawaii-text-light'}`}
                        >
                          {opt.label}
                        </span>
                        <span>{opt.text}</span>
                        {selected && <Check size={16} className="ml-auto text-kawaii-lavender-dark" />}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </KawaiiCard>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between mt-4">
        <KawaiiButton
          variant="ghost"
          size="sm"
          onClick={handlePrev}
          disabled={currentQIdx === 0}
        >
          <ChevronLeft size={16} /> Previous
        </KawaiiButton>

        {currentQIdx < totalQuestions - 1 ? (
          <KawaiiButton
            variant="pink"
            size="sm"
            onClick={handleNext}
          >
            Next <ChevronRight size={16} />
          </KawaiiButton>
        ) : (
          <KawaiiButton
            variant="peach"
            size="sm"
            onClick={() => setShowConfirmSubmit(true)}
          >
            {currentSectionIdx < test.sections.length - 1 ? 'Next Section' : 'Submit Test'}
          </KawaiiButton>
        )}
      </div>

      {showConfirmSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <KawaiiCard color="yellow">
              <div className="text-center py-4">
                <AlertTriangle size={32} className="mx-auto mb-3 text-yellow-500" />
                <p className="text-lg font-extrabold text-kawaii-text dark:text-kawaii-text-dark mb-2">
                  {currentSectionIdx < test.sections.length - 1
                    ? 'Move to next section?'
                    : 'Submit your test?'}
                </p>
                <p className="text-sm text-kawaii-text-light dark:text-kawaii-text-light-dark mb-4">
                  {sectionAnswered}/{totalQuestions} questions answered
                  {sectionAnswered < totalQuestions && '. Unanswered questions will be marked wrong.'}
                </p>
                <div className="flex gap-3 justify-center">
                  <KawaiiButton variant="ghost" onClick={() => setShowConfirmSubmit(false)}>
                    Review
                  </KawaiiButton>
                  <KawaiiButton variant="pink" onClick={() => { setShowConfirmSubmit(false); handleSubmitSection() }}>
                    Confirm
                  </KawaiiButton>
                </div>
              </div>
            </KawaiiCard>
          </motion.div>
        </div>
      )}
    </div>
  )
}
