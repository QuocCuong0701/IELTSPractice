'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Shuffle, RotateCcw, Volume2, Check, X } from 'lucide-react'
import KawaiiCard from '@/components/ui/KawaiiCard'
import KawaiiButton from '@/components/ui/KawaiiButton'
import Badge from '@/components/ui/Badge'
import ProgressRing from '@/components/ui/ProgressRing'
import { useLevel } from '@/context/LevelContext'
import { vocabularyData, type VocabWord } from '@/data/vocabulary'
import { getVocabProgress, updateVocabProgress, getDueVocabIds, updateDailyLog } from '@/lib/db'

export default function VocabularyPage() {
  const { level } = useLevel()
  const [mode, setMode] = useState<'list' | 'study'>('list')
  const [selectedTopic, setSelectedTopic] = useState('All')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [dueIds, setDueIds] = useState<number[]>([])
  const [progress, setProgress] = useState<Record<number, { correct: number; wrong: number; learned: boolean }>>({})
  const [showAnswer, setShowAnswer] = useState(false)
  const [studyQueue, setStudyQueue] = useState<VocabWord[]>([])

  const words = vocabularyData[level] || []
  const topics = [...new Set(words.map((w: VocabWord) => w.topic))]

  const filtered = selectedTopic === 'All'
    ? words
    : words.filter((w: VocabWord) => w.topic === selectedTopic)

  const learnedCount = Object.values(progress).filter((p) => p.learned).length
  const totalCount = words.length

  useEffect(() => {
    (async () => {
      const ids = await getDueVocabIds(level)
      setDueIds(ids)
      const p: Record<number, { correct: number; wrong: number; learned: boolean }> = {}
      for (const w of words) {
        const vp = await getVocabProgress(w.id, level)
        if (vp) p[w.id] = { correct: vp.correctCount, wrong: vp.wrongCount, learned: vp.learned }
      }
      setProgress(p)
    })()
  }, [level])

  const startStudy = useCallback(() => {
    let queue: VocabWord[]
    const dueSet = new Set(dueIds)
    const notLearned = words.filter((w: VocabWord) => !progress[w.id]?.learned && !dueSet.has(w.id))
    const due = words.filter((w: VocabWord) => dueSet.has(w.id))

    if (due.length > 0) {
      queue = [...due, ...notLearned].slice(0, 10)
    } else {
      queue = [...words].sort(() => Math.random() - 0.5).slice(0, 10)
    }
    setStudyQueue(queue)
    setCurrentIndex(0)
    setFlipped(false)
    setShowAnswer(false)
    setMode('study')
  }, [level, dueIds, progress, words])

  const handleResult = async (correct: boolean) => {
    const word = studyQueue[currentIndex]
    if (!word) return
    await updateVocabProgress(word.id, correct, level)
    const vp = await getVocabProgress(word.id, level)
    setProgress((prev) => ({
      ...prev,
      [word.id]: { correct: vp!.correctCount, wrong: vp!.wrongCount, learned: vp!.learned },
    }))
    await updateDailyLog('wordsReviewed', level)
    setShowAnswer(false)
    setFlipped(false)
    if (currentIndex < studyQueue.length - 1) {
      setCurrentIndex((i) => i + 1)
    } else {
      setMode('list')
    }
  }

  const speak = (text: string) => {
    if (typeof window !== 'undefined') {
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'en-US'
      u.rate = 0.9
      speechSynthesis.cancel()
      speechSynthesis.speak(u)
    }
  }

  if (mode === 'study' && studyQueue.length > 0) {
    const word = studyQueue[currentIndex]
    return (
      <div className="max-w-lg mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <KawaiiButton variant="ghost" size="sm" onClick={() => setMode('list')}>
            <ChevronLeft size={18} /> Quay lại
          </KawaiiButton>
          <Badge variant="pink">{currentIndex + 1}/{studyQueue.length}</Badge>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="perspective-1000"
          >
            <div
              className={`relative rounded-kawaii bg-white shadow-kawaii-lg p-8 sm:p-10 min-h-[280px] flex flex-col items-center justify-center cursor-pointer transition-transform duration-500 ${flipped ? 'rotate-y-180' : ''}`}
              onClick={() => { setFlipped(true); setShowAnswer(true) }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {!flipped ? (
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-extrabold text-kawaii-text mb-3">
                    {word.word}
                  </p>
                  <Badge variant="lavender">{word.partOfSpeech}</Badge>
                  <button
                    onClick={(e) => { e.stopPropagation(); speak(word.word) }}
                    className="ml-2 inline-flex items-center gap-1 text-sm text-kawaii-lavender-dark hover:text-kawaii-lavender-dark/80"
                  >
                    <Volume2 size={16} /> {word.pronunciation}
                  </button>
                  <p className="mt-4 text-sm text-kawaii-text-light/60 font-semibold">Chạm để xem đáp án</p>
                </div>
              ) : (
                <div className="text-center" style={{ transform: 'rotateY(180deg)' }}>
                  <p className="text-2xl font-extrabold text-kawaii-pink-dark mb-2">{word.meaning}</p>
                  <p className="text-sm text-kawaii-text italic mb-1">{word.example}</p>
                  <Badge variant="mint">{word.topic}</Badge>
                  <button
                    onClick={(e) => { e.stopPropagation(); speak(word.example) }}
                    className="mt-2 inline-flex items-center gap-1 text-xs text-kawaii-lavender-dark"
                  >
                    <Volume2 size={14} /> Nghe ví dụ
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {showAnswer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 justify-center"
          >
            <KawaiiButton variant="peach" size="lg" onClick={() => handleResult(false)}>
              <X size={20} /> Chưa nhớ
            </KawaiiButton>
            <KawaiiButton variant="mint" size="lg" onClick={() => handleResult(true)}>
              <Check size={20} /> Đã nhớ
            </KawaiiButton>
          </motion.div>
        )}

        <style jsx>{`
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
          .perspective-1000 {
            perspective: 1000px;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-kawaii-text">Từ vựng</h1>
          <p className="text-kawaii-text-light font-semibold mt-1">200+ từ IELTS B1 theo chủ đề</p>
        </div>
        <div className="flex items-center gap-3">
          <ProgressRing progress={totalCount > 0 ? (learnedCount / totalCount) * 100 : 0} size={56} strokeWidth={5} />
          <KawaiiButton variant="pink" onClick={startStudy}>
            <Shuffle size={18} /> Học ngay
          </KawaiiButton>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => setSelectedTopic('All')}
          className={`shrink-0 kawaii-tag cursor-pointer transition-all ${selectedTopic === 'All' ? 'bg-kawaii-pink text-white shadow-kawaii-sm' : 'bg-white text-kawaii-text-light border border-kawaii-lavender/20 hover:border-kawaii-lavender/40'}`}
        >
          Tất cả
        </button>
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTopic(t)}
            className={`shrink-0 kawaii-tag cursor-pointer transition-all ${selectedTopic === t ? 'bg-kawaii-lavender text-white shadow-kawaii-sm' : 'bg-white text-kawaii-text-light border border-kawaii-lavender/20 hover:border-kawaii-lavender/40'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((word, i) => {
          const p = progress[word.id]
          return (
            <motion.div
              key={word.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
            >
              <KawaiiCard color={p?.learned ? 'mint' : 'white'} hoverable>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-extrabold text-kawaii-text text-lg">{word.word}</p>
                    <p className="text-kawaii-text font-semibold">{word.meaning}</p>
                    <p className="text-sm text-kawaii-text-light italic mt-1 line-clamp-1">{word.example}</p>
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      <Badge variant="lavender">{word.partOfSpeech}</Badge>
                      <Badge variant="pink">{word.topic}</Badge>
                    </div>
                  </div>
                  <button onClick={() => speak(word.word)} className="shrink-0 p-2 rounded-full hover:bg-kawaii-lavender/10 transition-colors">
                    <Volume2 size={18} className="text-kawaii-lavender-dark" />
                  </button>
                </div>
                {p && (
                  <div className="mt-3 flex items-center gap-3 text-xs text-kawaii-text-light">
                    <span className="flex items-center gap-1"><Check size={12} className="text-green-500" /> {p.correct}</span>
                    <span className="flex items-center gap-1"><X size={12} className="text-red-400" /> {p.wrong}</span>
                    {p.learned && <Badge variant="mint">Đã học</Badge>}
                  </div>
                )}
              </KawaiiCard>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
