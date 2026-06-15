'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Volume2, Check, X, FileText, Settings2 } from 'lucide-react'
import Confetti from '@/components/ui/Confetti'
import KawaiiCard from '@/components/ui/KawaiiCard'
import KawaiiButton from '@/components/ui/KawaiiButton'
import Badge from '@/components/ui/Badge'
import { useLevel } from '@/context/LevelContext'
import { listeningData, type MCQQuestion, type NoteCompletionQuestion, type MapLabellingQuestion, type MatchingQuestion } from '@/data/listening'
import { updateDailyLog, saveListeningProgress } from '@/lib/db'

const accents = ['en-GB', 'en-US', 'en-AU', 'en-IN'] as const
const accentLabels: Record<string, string> = {
  'en-GB': 'British 🇬🇧',
  'en-US': 'American 🇺🇸',
  'en-AU': 'Australian 🇦🇺',
  'en-IN': 'Indian 🇮🇳',
}
const speedOptions = [0.5, 0.75, 1, 1.25, 1.5]

const sectionLabels: Record<number, string> = {
  1: 'Social Conversation',
  2: 'Social Monologue',
  3: 'Academic Conversation',
  4: 'Academic Lecture',
}

export default function ListeningPage() {
  const { level } = useLevel()
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null)
  const [currentQ, setCurrentQ] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [showTranscript, setShowTranscript] = useState(false)
  const [noteInput, setNoteInput] = useState('')
  const [accent, setAccent] = useState<string>('en-GB')
  const [speed, setSpeed] = useState(0.8)
  const [showSettings, setShowSettings] = useState(false)
  const [mapSelections, setMapSelections] = useState<Record<number, number>>({})
  const [matchingSelections, setMatchingSelections] = useState<Record<number, number>>({})

  const exercises = listeningData[level] || []
  const exercise = selectedExercise !== null ? exercises.find((e) => e.id === selectedExercise) : null

  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined') return
    const u = new SpeechSynthesisUtterance(text)
    const voices = speechSynthesis.getVoices()
    const matched = voices.find((v) => v.lang.startsWith(accent))
    if (matched) u.voice = matched
    u.lang = matched ? accent : 'en-US'
    u.rate = speed
    speechSynthesis.cancel()
    setPlaying(true)
    u.onend = () => setPlaying(false)
    speechSynthesis.speak(u)
  }, [accent, speed])

  const currentQuestion = exercise?.questions[currentQ]

  const handleSelect = (index: number) => {
    if (showResult || !currentQuestion || currentQuestion.type !== 'mcq') return
    setSelectedAnswer(index)
    setShowResult(true)
    if (index === currentQuestion.correctIndex) {
      setScore((s) => s + 1)
    }
  }

  const handleNoteSubmit = () => {
    if (showResult || !currentQuestion || currentQuestion.type !== 'note-completion') return
    setSelectedAnswer(noteInput.trim().toLowerCase())
    setShowResult(true)
    const ans = currentQuestion.acceptableAnswers || [currentQuestion.answer]
    if (ans.some((a) => a.toLowerCase() === noteInput.trim().toLowerCase())) {
      setScore((s) => s + 1)
    }
  }

  const handleMapSelect = (locationIndex: number, labelIndex: number) => {
    if (showResult || !currentQuestion || currentQuestion.type !== 'map-labelling') return
    setMapSelections((prev) => ({ ...prev, [locationIndex]: labelIndex }))
  }

  const handleMatchingSelect = (itemIndex: number, optionIndex: number) => {
    if (showResult || !currentQuestion || currentQuestion.type !== 'matching') return
    setMatchingSelections((prev) => ({ ...prev, [itemIndex]: optionIndex }))
  }

  const checkMapAnswer = () => {
    if (!currentQuestion || currentQuestion.type !== 'map-labelling') return
    setShowResult(true)
    const correct = currentQuestion.correctAnswers.filter((_, i) => mapSelections[i] === currentQuestion.correctAnswers[i]).length
    if (correct === currentQuestion.correctAnswers.length) setScore((s) => s + 1)
  }

  const checkMatchingAnswer = () => {
    if (!currentQuestion || currentQuestion.type !== 'matching') return
    setShowResult(true)
    const correct = currentQuestion.correctMatches.filter((_, i) => matchingSelections[i] === currentQuestion.correctMatches[i]).length
    if (correct === currentQuestion.correctMatches.length) setScore((s) => s + 1)
  }

  const startTimeRef = useRef(Date.now())

  // Reset timer when a new exercise is selected
  const startExercise = (id: number) => {
    setSelectedExercise(id)
    setCurrentQ(0)
    setScore(0)
    setCompleted(false)
    setShowTranscript(false)
    setNoteInput('')
    startTimeRef.current = Date.now()
  }

  const handleNext = () => {
    if (!exercise) return
    if (currentQ < exercise.questions.length - 1) {
      setCurrentQ((i) => i + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setNoteInput('')
      setMapSelections({})
      setMatchingSelections({})
    } else {
      setCompleted(true)
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000)
      saveListeningProgress(level, exercise.id, score, exercise.questions.length, timeSpent)
      updateDailyLog('exercisesDone', level)
    }
  }

  if (exercise && !completed) {
    const q = currentQuestion
    if (!q) return null

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <KawaiiButton variant="ghost" size="sm" onClick={() => { setSelectedExercise(null); setSelectedAnswer(null); setShowResult(false); setScore(0); setCompleted(false); setShowTranscript(false); setNoteInput(''); setMapSelections({}); setMatchingSelections({}) }}>
            <ChevronLeft size={18} /> Quay lại
          </KawaiiButton>
          <div className="flex items-center gap-2">
            <Badge variant="lavender">{sectionLabels[exercise.section]}</Badge>
            <Badge variant="pink">{currentQ + 1}/{exercise.questions.length}</Badge>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <KawaiiCard color="peach" className="text-center">
              <p className="text-sm text-kawaii-text-light font-semibold mb-2">Nhấn nút để nghe</p>
              <div className="flex items-center justify-center gap-3">
                <motion.button
                  onClick={() => speak(exercise.transcript)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${playing ? 'bg-kawaii-peach-dark' : 'bg-kawaii-peach'} shadow-kawaii-sm`}
                  disabled={playing}
                >
                  <Volume2 size={32} className={playing ? 'text-white animate-pulse' : 'text-kawaii-text'} />
                </motion.button>
                <div className="flex flex-col gap-2">
                  <KawaiiButton variant="ghost" size="sm" onClick={() => setShowTranscript(!showTranscript)}>
                    <FileText size={16} /> Transcript
                  </KawaiiButton>
                  <KawaiiButton variant="ghost" size="sm" onClick={() => setShowSettings(!showSettings)}>
                    <Settings2 size={16} /> {accentLabels[accent]?.split(' ')[0] ?? accent} {speed}x
                  </KawaiiButton>
                </div>
              </div>
            </KawaiiCard>
          </motion.div>

          {showSettings && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <KawaiiCard color="white">
                <p className="text-sm font-bold text-kawaii-text dark:text-kawaii-text-dark mb-3">Audio Settings</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-kawaii-text-light dark:text-kawaii-text-light-dark mb-2">Accent</p>
                    <div className="flex flex-wrap gap-2">
                      {accents.map((a) => (
                        <button
                          key={a}
                          onClick={() => setAccent(a)}
                          className={`px-3 py-1.5 rounded-kawaii-full text-xs font-bold transition-all
                            ${accent === a
                              ? 'bg-kawaii-peach text-white shadow-kawaii-sm'
                              : 'bg-kawaii-lavender/10 text-kawaii-text-light dark:text-kawaii-text-light-dark hover:bg-kawaii-lavender/20'
                            }`}
                        >
                          {accentLabels[a]}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-kawaii-text-light dark:text-kawaii-text-light-dark mb-2">
                      Speed: <span className="text-kawaii-peach-dark">{speed}x</span>
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-kawaii-text-light">0.5x</span>
                      <input
                        type="range"
                        min={0.5}
                        max={1.5}
                        step={0.05}
                        value={speed}
                        onChange={(e) => setSpeed(parseFloat(e.target.value))}
                        className="flex-1 accent-kawaii-peach"
                        aria-label="Playback speed"
                      />
                      <span className="text-[10px] text-kawaii-text-light">1.5x</span>
                    </div>
                    <div className="flex gap-1 mt-1">
                      {speedOptions.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSpeed(s)}
                          className={`px-2 py-0.5 rounded-kawaii-full text-[10px] font-bold transition-all
                            ${Math.abs(speed - s) < 0.01
                              ? 'bg-kawaii-peach text-white'
                              : 'bg-kawaii-lavender/10 text-kawaii-text-light hover:bg-kawaii-lavender/20'
                            }`}
                        >
                          {s}x
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </KawaiiCard>
            </motion.div>
          )}
        </AnimatePresence>

        {showTranscript && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            <KawaiiCard color="white">
              <p className="text-sm text-kawaii-text leading-relaxed whitespace-pre-line">{exercise.transcript}</p>
            </KawaiiCard>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {q.type === 'mcq' && (
              <MCQQuestionRenderer
                question={q}
                selectedAnswer={selectedAnswer as number | null}
                showResult={showResult}
                onSelect={handleSelect}
              />
            )}
            {q.type === 'note-completion' && (
              <NoteCompletionRenderer
                question={q}
                input={noteInput}
                onInputChange={setNoteInput}
                showResult={showResult}
                selectedAnswer={selectedAnswer as string | null}
                onSubmit={handleNoteSubmit}
              />
            )}
            {q.type === 'map-labelling' && (
              <MapLabellingRenderer
                question={q}
                selections={mapSelections}
                showResult={showResult}
                onSelect={handleMapSelect}
              />
            )}
            {q.type === 'matching' && (
              <MatchingRenderer
                question={q}
                selections={matchingSelections}
                showResult={showResult}
                onSelect={handleMatchingSelect}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {!showResult && (q.type === 'map-labelling' || q.type === 'matching') && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <KawaiiButton variant="pink" className="w-full" onClick={q.type === 'map-labelling' ? checkMapAnswer : checkMatchingAnswer}>
              Kiểm tra đáp án
            </KawaiiButton>
          </motion.div>
        )}
        {showResult && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <KawaiiButton variant="pink" className="w-full" onClick={handleNext}>
              {currentQ < exercise.questions.length - 1 ? <>Tiếp theo <ChevronRight size={18} /></> : 'Xem kết quả'}
            </KawaiiButton>
          </motion.div>
        )}
      </div>
    )
  }

  if (completed && exercise) {
    const pct = Math.round((score / exercise.questions.length) * 100)
    return (
      <div className="max-w-md mx-auto text-center space-y-6">
        {pct >= 80 && <Confetti />}
        <KawaiiCard color="yellow">
          <div className="py-6">
            <p className="text-5xl mb-3">🎧</p>
            <p className="text-xl font-extrabold text-kawaii-text">Hoàn thành bài nghe!</p>
            <p className="text-3xl font-extrabold text-kawaii-pink-dark my-2">{score}/{exercise.questions.length}</p>
            <Badge variant={pct >= 80 ? 'mint' : pct >= 50 ? 'yellow' : 'pink'}>
              {pct >= 80 ? 'Xuất sắc ✦' : pct >= 50 ? 'Khá tốt' : 'Cố gắng thêm'}
            </Badge>
          </div>
        </KawaiiCard>
        <KawaiiButton variant="pink" onClick={() => { setSelectedExercise(null); setSelectedAnswer(null); setShowResult(false); setScore(0); setCompleted(false); setShowTranscript(false); setNoteInput(''); setMapSelections({}); setMatchingSelections({}) }}>
          Quay lại danh sách
        </KawaiiButton>
      </div>
    )
  }

  const sectionIcons: Record<number, string> = { 1: '💬', 2: '🎤', 3: '👥', 4: '📚' }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-kawaii-text">Luyện nghe</h1>
        <p className="text-kawaii-text-light font-semibold mt-1">Nghe và trả lời câu hỏi theo format IELTS</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {exercises.map((ex, i) => (
          <motion.div
            key={ex.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <KawaiiCard color="peach" hoverable onClick={() => startExercise(ex.id)}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-kawaii bg-kawaii-peach/30 flex items-center justify-center shrink-0 text-xl">
                  {sectionIcons[ex.section]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold text-kawaii-text">{ex.title}</p>
                  <div className="flex gap-1 mt-1">
                    <Badge variant="lavender">Section {ex.section}</Badge>
                    <Badge variant="peach">{ex.questions.length} câu</Badge>
                  </div>
                </div>
              </div>
            </KawaiiCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function MCQQuestionRenderer({
  question,
  selectedAnswer,
  showResult,
  onSelect,
}: {
  question: MCQQuestion
  selectedAnswer: number | null
  showResult: boolean
  onSelect: (i: number) => void
}) {
  return (
    <KawaiiCard color="white">
      <p className="font-bold text-kawaii-text mb-4">{question.question}</p>
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

function NoteCompletionRenderer({
  question,
  input,
  onInputChange,
  showResult,
  selectedAnswer,
  onSubmit,
}: {
  question: NoteCompletionQuestion
  input: string
  onInputChange: (v: string) => void
  showResult: boolean
  selectedAnswer: string | null
  onSubmit: () => void
}) {
  const parts = question.context.split('______')
  return (
    <KawaiiCard color="white">
      <p className="font-bold text-kawaii-text mb-4">Điền từ vào chỗ trống:</p>
      <div className="bg-kawaii-lavender/10 rounded-kawaii p-4 mb-4">
        <p className="text-sm text-kawaii-text leading-relaxed">
          {parts[0]}
          {showResult ? (
            <span className={`inline-block font-extrabold px-1 ${selectedAnswer !== null && question.acceptableAnswers?.some((a) => a.toLowerCase() === selectedAnswer) ? 'text-green-600' : 'text-red-500'}`}>
              {selectedAnswer || '___'}
            </span>
          ) : (
            <input
              type="text"
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="..."
              className="inline-block w-24 mx-1 px-2 py-0.5 border-b-2 border-kawaii-pink/40 bg-transparent text-sm font-bold text-kawaii-text outline-none focus:border-kawaii-pink transition-colors"
              disabled={showResult}
              onKeyDown={(e) => { if (e.key === 'Enter') onSubmit() }}
            />
          )}
          {parts[1]}
        </p>
      </div>
      {showResult && (
        <div className={`text-sm font-bold ${selectedAnswer !== null && question.acceptableAnswers?.some((a) => a.toLowerCase() === selectedAnswer) ? 'text-green-600' : 'text-red-500'}`}>
          {selectedAnswer !== null && question.acceptableAnswers?.some((a) => a.toLowerCase() === selectedAnswer)
            ? '✓ Đúng!'
            : `✗ Đáp án: ${question.answer}`}
        </div>
      )}
      {!showResult && (
        <KawaiiButton variant="pink" size="sm" onClick={onSubmit} disabled={!input.trim()}>
          Kiểm tra
        </KawaiiButton>
      )}
    </KawaiiCard>
  )
}

function MapLabellingRenderer({
  question,
  selections,
  showResult,
  onSelect,
}: {
  question: MapLabellingQuestion
  selections: Record<number, number>
  showResult: boolean
  onSelect: (locationIndex: number, labelIndex: number) => void
}) {
  return (
    <KawaiiCard color="white">
      <p className="font-bold text-kawaii-text mb-2">
        <span className="text-kawaii-pink-dark">Hướng dẫn:</span> {question.instruction}
      </p>
      <p className="text-sm text-kawaii-text-light mb-4 italic">{question.description}</p>
      <div className="space-y-3">
        {question.locations.map((loc, i) => {
          const selected = selections[i]
          const isCorrect = showResult && selected === question.correctAnswers[i]
          const isWrong = showResult && selected !== undefined && selected !== question.correctAnswers[i]
          return (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 bg-kawaii-lavender/5 rounded-xl p-3">
              <span className="font-bold text-kawaii-text text-sm min-w-[140px] shrink-0">{i + 1}. {loc}</span>
              <select
                value={selected ?? ''}
                onChange={(e) => onSelect(i, parseInt(e.target.value))}
                disabled={showResult}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold border-2 outline-none cursor-pointer
                  ${showResult ? (isCorrect ? 'bg-green-50 border-green-400 text-green-700' : isWrong ? 'bg-red-50 border-red-400 text-red-700' : 'bg-gray-50 border-gray-300') : 'bg-white border-kawaii-lavender/30 text-kawaii-text'}`}
              >
                <option value="" disabled>-- Chọn --</option>
                {question.labels.map((label, j) => (
                  <option key={j} value={j}>{String.fromCharCode(65 + j)}. {label}</option>
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
          {question.correctAnswers.map((ans, i) => (
            <span key={i} className="mr-3">{i + 1}→{String.fromCharCode(65 + ans)}</span>
          ))}
        </div>
      )}
    </KawaiiCard>
  )
}

function MatchingRenderer({
  question,
  selections,
  showResult,
  onSelect,
}: {
  question: MatchingQuestion
  selections: Record<number, number>
  showResult: boolean
  onSelect: (itemIndex: number, optionIndex: number) => void
}) {
  return (
    <KawaiiCard color="white">
      <p className="font-bold text-kawaii-text mb-4">
        <span className="text-kawaii-pink-dark">Hướng dẫn:</span> {question.instruction}
      </p>
      <div className="space-y-3">
        {question.items.map((item, i) => {
          const selected = selections[i]
          const isCorrect = showResult && selected === question.correctMatches[i]
          const isWrong = showResult && selected !== undefined && selected !== question.correctMatches[i]
          return (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 bg-kawaii-lavender/5 rounded-xl p-3">
              <span className="font-bold text-kawaii-text text-sm min-w-[120px] shrink-0">
                {String.fromCharCode(65 + i)}. {item}
              </span>
              <select
                value={selected ?? ''}
                onChange={(e) => onSelect(i, parseInt(e.target.value))}
                disabled={showResult}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold border-2 outline-none cursor-pointer
                  ${showResult ? (isCorrect ? 'bg-green-50 border-green-400 text-green-700' : isWrong ? 'bg-red-50 border-red-400 text-red-700' : 'bg-gray-50 border-gray-300') : 'bg-white border-kawaii-lavender/30 text-kawaii-text'}`}
              >
                <option value="" disabled>-- Chọn --</option>
                {question.options.map((opt, j) => (
                  <option key={j} value={j}>{j + 1}. {opt}</option>
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
