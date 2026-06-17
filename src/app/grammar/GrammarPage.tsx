'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check, X, Lightbulb, PenTool, AlertTriangle, Type } from 'lucide-react'
import Confetti from '@/components/ui/Confetti'
import KawaiiCard from '@/components/ui/KawaiiCard'
import KawaiiButton from '@/components/ui/KawaiiButton'
import Badge from '@/components/ui/Badge'
import ProgressRing from '@/components/ui/ProgressRing'
import { useLevel } from '@/context/LevelContext'
import { grammarData, writingFunctionGroups } from '@/data/grammar'
import { updateDailyLog } from '@/lib/db'
import TransformationExercise from '@/components/grammar/TransformationExercise'
import ErrorCorrectionExercise from '@/components/grammar/ErrorCorrectionExercise'

export default function GrammarPage() {
  const { level } = useLevel()
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null)
  const [exerciseMode, setExerciseMode] = useState<'mcq' | 'transformation' | 'error-correction'>('mcq')
  const [currentEx, setCurrentEx] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [lessonScores, setLessonScores] = useState<Record<number, number>>({})

  const lessons = grammarData[level] || []

  useEffect(() => {
    const saved = localStorage.getItem(`grammar_scores_${level}`)
    if (saved) setLessonScores(JSON.parse(saved))
  }, [level])

  const lesson = selectedLesson !== null ? lessons.find((l) => l.id === selectedLesson) : null

  const handleSelect = (index: number) => {
    if (showResult) return
    setSelectedAnswer(index)
    setShowResult(true)
    if (index === lesson!.exercises[currentEx].correctIndex) {
      setScore((s) => s + 1)
    }
  }

  const handleNext = () => {
    if (currentEx < (lesson?.exercises.length || 1) - 1) {
      setCurrentEx((i) => i + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      const pct = Math.round((score / (lesson?.exercises.length || 1)) * 100)
      const newScores = { ...lessonScores, [lesson!.id]: pct }
      setLessonScores(newScores)
      localStorage.setItem(`grammar_scores_${level}`, JSON.stringify(newScores))
      setCompleted(true)
      updateDailyLog('exercisesDone', level)
    }
  }

  const resetLesson = () => {
    setCurrentEx(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setCompleted(false)
  }

  if (lesson && !completed) {
    const mcqExercises = lesson.exercises.filter((e) => !e.type || e.type === 'mcq')
    const transformationExercises = lesson.exercises.filter((e) => e.type === 'transformation') as import('@/data/grammar').GrammarExerciseTransformation[]
    const errorCorrectionExercises = lesson.exercises.filter((e) => e.type === 'error-correction') as import('@/data/grammar').GrammarExerciseErrorCorrection[]
    const ex = lesson.exercises.filter((e) => !e.type || e.type === exerciseMode)[currentEx]

    if (exerciseMode === 'transformation' && transformationExercises.length > 0) {
      return <TransformationExercise exercises={transformationExercises} onComplete={() => { resetLesson(); setSelectedLesson(null) }} onBack={() => setSelectedLesson(null)} />
    }

    if (exerciseMode === 'error-correction' && errorCorrectionExercises.length > 0) {
      return <ErrorCorrectionExercise exercises={errorCorrectionExercises} onComplete={() => { resetLesson(); setSelectedLesson(null) }} onBack={() => setSelectedLesson(null)} />
    }

    const isMcq = !ex.type || ex.type === 'mcq'

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <KawaiiButton variant="ghost" size="sm" onClick={() => { setSelectedLesson(null); resetLesson() }}>
            <ChevronLeft size={18} /> Quay lại
          </KawaiiButton>
          <Badge variant="lavender">{currentEx + 1}/{mcqExercises.length}</Badge>
        </div>

        <KawaiiCard color="lavender">
          <Badge variant="pink">{lesson.title}</Badge>
          <p className="text-sm text-kawaii-text-light mt-2 mb-1">{lesson.description}</p>
          <div className="mt-3 p-4 rounded-kawaii bg-white border border-kawaii-lavender/10">
            <p className="text-sm text-kawaii-text whitespace-pre-line">{lesson.explanation}</p>
          </div>
          {lesson.examples.slice(0, 2).map((ex, i) => (
            <div key={i} className="mt-2 text-sm text-kawaii-text">
              <span className="text-green-600 mr-1">✓</span> {ex.correct}
              {ex.incorrect && <span className="block text-red-400 ml-4"><span className="text-red-500 mr-1">✗</span> {ex.incorrect}</span>}
            </div>
          ))}
        </KawaiiCard>

        {/* Exercise type tabs */}
        <div className="flex gap-2">
          {mcqExercises.length > 0 && (
            <button
              onClick={() => { setExerciseMode('mcq'); resetLesson() }}
              className={`kawaii-tag cursor-pointer ${exerciseMode === 'mcq' ? 'bg-kawaii-pink text-white' : 'bg-white text-kawaii-text-light border border-kawaii-lavender/20'}`}
            >
              <Type size={14} className="inline" /> MCQ
            </button>
          )}
          {transformationExercises.length > 0 && (
            <button
              onClick={() => { setExerciseMode('transformation'); resetLesson() }}
              className={`kawaii-tag cursor-pointer ${exerciseMode === 'transformation' ? 'bg-kawaii-pink text-white' : 'bg-white text-kawaii-text-light border border-kawaii-lavender/20'}`}
            >
              <PenTool size={14} className="inline" /> Transformation
            </button>
          )}
          {errorCorrectionExercises.length > 0 && (
            <button
              onClick={() => { setExerciseMode('error-correction'); resetLesson() }}
              className={`kawaii-tag cursor-pointer ${exerciseMode === 'error-correction' ? 'bg-kawaii-pink text-white' : 'bg-white text-kawaii-text-light border border-kawaii-lavender/20'}`}
            >
              <AlertTriangle size={14} className="inline" /> Error Correction
            </button>
          )}
        </div>

        {isMcq && ex && (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentEx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <KawaiiCard color="white">
                  <p className="font-bold text-kawaii-text mb-4">{ex.sentence}</p>
                  <div className="space-y-2">
                    {ex.options?.map((opt, i) => {
                      let variant: 'white' | 'mint' | 'peach' = 'white'
                      if (showResult) {
                        if (i === ex.correctIndex) variant = 'mint'
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
                            <span className="w-8 h-8 rounded-full bg-kawaii-lavender/10 flex items-center justify-center text-sm font-bold text-kawaii-text shrink-0">
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span className="text-sm font-semibold text-kawaii-text">{opt}</span>
                            {showResult && i === ex.correctIndex && <Check size={18} className="text-green-500 ml-auto shrink-0" />}
                            {showResult && i === selectedAnswer && i !== ex.correctIndex && <X size={18} className="text-red-400 ml-auto shrink-0" />}
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
                    <p className="text-sm text-kawaii-text">{ex.explanation}</p>
                  </div>
                </KawaiiCard>
                <KawaiiButton variant="pink" className="w-full" onClick={handleNext}>
                  {currentEx < mcqExercises.length - 1 ? <>Tiếp theo <ChevronRight size={18} /></> : 'Hoàn thành'}
                </KawaiiButton>
              </motion.div>
            )}
          </>
        )}
      </div>
    )
  }

  if (completed) {
    const pct = Math.round((score / (lesson?.exercises.length || 1)) * 100)
    return (
      <div className="max-w-md mx-auto text-center space-y-6">
        {pct >= 80 && <Confetti />}
        <KawaiiCard color="yellow">
          <div className="py-6">
            <p className="text-5xl mb-3">🎉</p>
            <p className="text-xl font-extrabold text-kawaii-text">Hoàn thành!</p>
            <p className="text-3xl font-extrabold text-kawaii-pink-dark my-2">{score}/{lesson?.exercises.length}</p>
            <Badge variant={pct >= 80 ? 'mint' : pct >= 50 ? 'yellow' : 'pink'}>
              {pct >= 80 ? 'Xuất sắc ✦' : pct >= 50 ? 'Khá tốt' : 'Cố gắng thêm'}
            </Badge>
          </div>
        </KawaiiCard>
        <KawaiiButton variant="pink" onClick={() => { setSelectedLesson(null); resetLesson() }}>
          Quay lại danh sách
        </KawaiiButton>
      </div>
    )
  }

  const totalLessons = lessons.length
  const completedLessons = Object.keys(lessonScores).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-kawaii-text">Ngữ pháp</h1>
          <p className="text-kawaii-text-light font-semibold mt-1">{totalLessons} bài học ngữ pháp B1</p>
        </div>
        <ProgressRing progress={totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0} size={56} strokeWidth={5} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {lessons.map((lesson, i) => {
          const pct = lessonScores[lesson.id]
          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <KawaiiCard color={pct !== undefined ? (pct >= 80 ? 'mint' : 'yellow') : 'white'} hoverable onClick={() => { setSelectedLesson(lesson.id); resetLesson() }}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-extrabold text-kawaii-text">{lesson.title}</p>
                    <p className="text-sm text-kawaii-text-light">{lesson.description}</p>
                  </div>
                  {pct !== undefined && (
                    <ProgressRing progress={pct} size={44} strokeWidth={4} />
                  )}
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-kawaii-text-light">
                  <Badge variant="pink">{lesson.exercises.length} bài tập</Badge>
                </div>
              </KawaiiCard>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
