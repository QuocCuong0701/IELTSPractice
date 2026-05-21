'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, Check, PenTool, ListChecks } from 'lucide-react'
import KawaiiCard from '@/components/ui/KawaiiCard'
import KawaiiButton from '@/components/ui/KawaiiButton'
import Badge from '@/components/ui/Badge'
import { useLevel } from '@/context/LevelContext'
import { writingData } from '@/data/writing'
import { updateDailyLog } from '@/lib/db'

export default function WritingPage() {
  const { level } = useLevel()
  const [selectedPrompt, setSelectedPrompt] = useState<number | null>(null)
  const [content, setContent] = useState('')
  const [showChecklist, setShowChecklist] = useState(false)
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({})
  const [submitted, setSubmitted] = useState(false)

  const prompts = writingData[level] || []
  const prompt = selectedPrompt !== null ? prompts.find((p) => p.id === selectedPrompt) : null

  const toggleChecklist = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  const handleSubmit = () => {
    setShowChecklist(true)
  }

  const handleDone = () => {
    setSubmitted(true)
    updateDailyLog('exercisesDone', level)
  }

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0

  if (submitted) {
    return (
      <div className="max-w-md mx-auto text-center space-y-6">
        <KawaiiCard color="yellow">
          <div className="py-6">
            <p className="text-5xl mb-3">✍️</p>
            <p className="text-xl font-extrabold text-kawaii-text">Bài viết đã hoàn thành!</p>
            <p className="text-sm text-kawaii-text-light mt-2">Hãy tiếp tục luyện tập mỗi ngày nhé ✦</p>
          </div>
        </KawaiiCard>
        <KawaiiButton variant="pink" onClick={() => { setSelectedPrompt(null); setContent(''); setShowChecklist(false); setCheckedItems({}); setSubmitted(false) }}>
          Quay lại danh sách
        </KawaiiButton>
      </div>
    )
  }

  if (prompt) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <KawaiiButton variant="ghost" size="sm" onClick={() => { setSelectedPrompt(null); setContent(''); setShowChecklist(false); setCheckedItems({}) }}>
            <ChevronLeft size={18} /> Quay lại
          </KawaiiButton>
          <div className="flex items-center gap-2">
            <Badge variant="lavender">{wordCount}/{prompt.wordLimit} từ</Badge>
          </div>
        </div>

        <KawaiiCard color="lavender">
          <div className="flex items-start gap-2 mb-2">
            <PenTool size={18} className="text-kawaii-lavender-dark shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-extrabold text-kawaii-text">{prompt.title}</h2>
              <p className="text-sm text-kawaii-text whitespace-pre-line mt-2">{prompt.instruction}</p>
            </div>
          </div>
        </KawaiiCard>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={16} className="text-yellow-600" />
            <span className="font-bold text-sm text-kawaii-text">Mẹo làm bài:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {prompt.tips.map((tip, i) => (
              <Badge key={i} variant="yellow">✦ {tip}</Badge>
            ))}
          </div>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Viết bài của bạn ở đây..."
          className="kawaii-input min-h-[250px] resize-y text-sm leading-relaxed"
        />

        {!showChecklist ? (
          <KawaiiButton
            variant="pink"
            className="w-full"
            onClick={handleSubmit}
            disabled={wordCount < 10}
          >
            <ListChecks size={18} /> Kiểm tra bài viết
          </KawaiiButton>
        ) : (
          <div className="space-y-4">
            <KawaiiCard color="yellow">
              <h3 className="font-extrabold text-kawaii-text mb-3 flex items-center gap-2">
                <ListChecks size={18} /> Checklist tự chấm
              </h3>
              <div className="space-y-2">
                {prompt.checklist.map((item, i) => (
                  <label
                    key={i}
                    className={`flex items-center gap-3 p-2 rounded-kawaii cursor-pointer transition-all ${checkedItems[i] ? 'bg-kawaii-mint/20' : 'hover:bg-kawaii-lavender/5'}`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${checkedItems[i] ? 'bg-kawaii-mint border-kawaii-mint-dark text-white' : 'border-kawaii-lavender/30'}`}
                      onClick={() => toggleChecklist(i)}
                    >
                      {checkedItems[i] && <Check size={14} />}
                    </div>
                    <span className="text-sm text-kawaii-text font-semibold">{item}</span>
                  </label>
                ))}
              </div>
            </KawaiiCard>
            <KawaiiButton
              variant="mint"
              className="w-full"
              onClick={handleDone}
              disabled={Object.keys(checkedItems).length < prompt.checklist.length}
            >
              Hoàn thành
            </KawaiiButton>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-kawaii-text">Luyện viết</h1>
        <p className="text-kawaii-text-light font-semibold mt-1">Thực hành viết IELTS B1</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {prompts.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <KawaiiCard color="yellow" hoverable onClick={() => setSelectedPrompt(p.id)}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-kawaii bg-kawaii-yellow/30 flex items-center justify-center shrink-0">
                  <PenTool size={20} className="text-kawaii-text" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold text-kawaii-text">{p.title}</p>
                  <p className="text-xs text-kawaii-text-light line-clamp-1 mt-1">{p.instruction.slice(0, 60)}...</p>
                  <Badge variant="yellow" className="mt-2">{p.wordLimit} từ</Badge>
                </div>
              </div>
            </KawaiiCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function Lightbulb({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5C7.7 12.8 8 13.5 8 14" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  )
}
