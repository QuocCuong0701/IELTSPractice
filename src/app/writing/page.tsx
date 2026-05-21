'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Check, PenTool, ListChecks, BarChart3, FileText, Eye, AlertTriangle, Loader2, Sparkles } from 'lucide-react'
import KawaiiCard from '@/components/ui/KawaiiCard'
import KawaiiButton from '@/components/ui/KawaiiButton'
import Badge from '@/components/ui/Badge'
import { useLevel } from '@/context/LevelContext'
import { writingData, type TaskType } from '@/data/writing'
import { updateDailyLog } from '@/lib/db'

export default function WritingPage() {
  const { level } = useLevel()
  const [selectedPrompt, setSelectedPrompt] = useState<number | null>(null)
  const [content, setContent] = useState('')
  const [showChecklist, setShowChecklist] = useState(false)
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({})
  const [submitted, setSubmitted] = useState(false)
  const [taskFilter, setTaskFilter] = useState<TaskType | 'all'>('all')
  const [showSample, setShowSample] = useState(false)
  const [aiFeedback, setAiFeedback] = useState<string | null>(null)
  const [aiLoading, setAiLoading] = useState(false)

  const prompts = writingData[level] || []
  const filtered = taskFilter === 'all' ? prompts : prompts.filter((p) => p.taskType === taskFilter)
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

  const handleAiFeedback = async () => {
    if (!prompt || content.trim().length < 10) return
    setAiLoading(true)
    setAiFeedback(null)
    try {
      const res = await fetch('/api/writing-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.instruction,
          taskType: prompt.taskType,
          targetBand: prompt.bandLevel,
          content,
        }),
      })
      const data = await res.json()
      setAiFeedback(data.feedback || 'Không thể nhận phản hồi. Vui lòng thử lại.')
    } catch {
      setAiFeedback('Lỗi kết nối. Vui lòng thử lại sau.')
    } finally {
      setAiLoading(false)
    }
  }

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0

  if (submitted) {
    return (
      <div className="max-w-md mx-auto text-center space-y-6">
        <KawaiiCard color="yellow">
          <div className="py-6">
            <p className="text-5xl mb-3">&#x270D;&#xFE0F;</p>
            <p className="text-xl font-extrabold text-kawaii-text">Bài viết đã hoàn thành!</p>
            <p className="text-sm text-kawaii-text-light mt-2">Hãy tiếp tục luyện tập mỗi ngày nhé &#x2726;</p>
          </div>
        </KawaiiCard>
        <KawaiiButton variant="pink" onClick={() => { setSelectedPrompt(null); setContent(''); setShowChecklist(false); setCheckedItems({}); setSubmitted(false); setShowSample(false); setAiFeedback(null) }}>
          Quay lại danh sách
        </KawaiiButton>
      </div>
    )
  }

  if (prompt) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <KawaiiButton variant="ghost" size="sm" onClick={() => { setSelectedPrompt(null); setContent(''); setShowChecklist(false); setCheckedItems({}); setShowSample(false); setAiFeedback(null) }}>
            <ChevronLeft size={18} /> Quay lại
          </KawaiiButton>
          <div className="flex items-center gap-2">
            <Badge variant={prompt.taskType === 'task1' ? 'blue' : 'pink'}>
              {prompt.taskType === 'task1' ? 'Task 1' : 'Task 2'}
            </Badge>
            <Badge variant="lavender">{wordCount}/{prompt.wordLimit} từ</Badge>
          </div>
        </div>

        <KawaiiCard color="lavender">
          <div className="flex items-start gap-2 mb-2">
            {prompt.taskType === 'task1' ? <BarChart3 size={18} className="text-kawaii-lavender-dark shrink-0 mt-1" /> : <FileText size={18} className="text-kawaii-lavender-dark shrink-0 mt-1" />}
            <div>
              <h2 className="text-xl font-extrabold text-kawaii-text">{prompt.title}</h2>
              <p className="text-sm text-kawaii-text whitespace-pre-line mt-2">{prompt.instruction}</p>
              {prompt.visual && (
                <p className="text-xs text-kawaii-text-light mt-2 italic">Dữ liệu: {prompt.visual}</p>
              )}
            </div>
          </div>
        </KawaiiCard>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2">
            <Lightbulb size={16} className="text-yellow-600" />
            <span className="font-bold text-sm text-kawaii-text">Mẹo làm bài:</span>
          </div>
          {prompt.tips.map((tip, i) => (
            <Badge key={i} variant="yellow">&#x2726; {tip}</Badge>
          ))}
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Viết bài của bạn ở đây..."
          className="kawaii-input min-h-[250px] resize-y text-sm leading-relaxed"
        />

        <div className="flex flex-wrap gap-3">
          <KawaiiButton
            variant="ghost"
            size="sm"
            onClick={() => setShowSample(!showSample)}
          >
            <Eye size={16} /> {showSample ? 'Ẩn' : 'Xem'} bài mẫu
          </KawaiiButton>
          <KawaiiButton
            variant="ghost"
            size="sm"
            onClick={handleAiFeedback}
            disabled={aiLoading || content.trim().length < 10}
          >
            {aiLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            AI chấm bài
          </KawaiiButton>
        </div>

        <AnimatePresence>
          {showSample && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <KawaiiCard color="mint">
                <div className="flex items-start gap-3">
                  <PenTool size={18} className="text-green-600 shrink-0 mt-1" />
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-extrabold text-kawaii-text">Bài mẫu</h3>
                      <Badge variant="mint">Band {prompt.bandLevel}</Badge>
                    </div>
                    <p className="text-sm text-kawaii-text whitespace-pre-line leading-relaxed">{prompt.sampleAnswer}</p>
                  </div>
                </div>
              </KawaiiCard>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {aiFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <KawaiiCard color="yellow">
                <div className="flex items-start gap-3">
                  <Sparkles size={18} className="text-yellow-600 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-extrabold text-kawaii-text mb-2">AI Feedback</h3>
                    <p className="text-sm text-kawaii-text whitespace-pre-line leading-relaxed">{aiFeedback}</p>
                  </div>
                </div>
              </KawaiiCard>
            </motion.div>
          )}
        </AnimatePresence>

        {prompt.commonMistakes.length > 0 && (
          <KawaiiCard color="peach">
            <div className="flex items-start gap-2">
              <AlertTriangle size={16} className="text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-extrabold text-sm text-kawaii-text mb-1">Lỗi thường gặp:</p>
                <ul className="space-y-1">
                  {prompt.commonMistakes.map((m, i) => (
                    <li key={i} className="text-xs text-kawaii-text-light flex items-start gap-1">
                      <span className="text-red-300">&#x2022;</span> {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </KawaiiCard>
        )}

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
        <p className="text-kawaii-text-light font-semibold mt-1">Thực hành viết IELTS Task 1 &amp; Task 2</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setTaskFilter('all')}
          className={`kawaii-tag cursor-pointer ${taskFilter === 'all' ? 'bg-kawaii-pink text-white' : 'bg-white text-kawaii-text-light border border-kawaii-lavender/20'}`}
        >
          Tất cả ({prompts.length})
        </button>
        <button
          onClick={() => setTaskFilter('task1')}
          className={`kawaii-tag cursor-pointer ${taskFilter === 'task1' ? 'bg-kawaii-pink text-white' : 'bg-white text-kawaii-text-light border border-kawaii-lavender/20'}`}
        >
          <BarChart3 size={14} className="inline" /> Task 1 ({prompts.filter(p => p.taskType === 'task1').length})
        </button>
        <button
          onClick={() => setTaskFilter('task2')}
          className={`kawaii-tag cursor-pointer ${taskFilter === 'task2' ? 'bg-kawaii-pink text-white' : 'bg-white text-kawaii-text-light border border-kawaii-lavender/20'}`}
        >
          <FileText size={14} className="inline" /> Task 2 ({prompts.filter(p => p.taskType === 'task2').length})
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <KawaiiCard color={p.taskType === 'task1' ? 'blue' : 'yellow'} hoverable onClick={() => setSelectedPrompt(p.id)}>
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-kawaii flex items-center justify-center shrink-0 ${p.taskType === 'task1' ? 'bg-blue-100' : 'bg-kawaii-yellow/30'}`}>
                  {p.taskType === 'task1' ? <BarChart3 size={20} className="text-blue-600" /> : <PenTool size={20} className="text-kawaii-text" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-extrabold text-kawaii-text truncate">{p.title}</p>
                    <Badge variant={p.taskType === 'task1' ? 'blue' : 'pink'}>{p.taskType === 'task1' ? 'T1' : 'T2'}</Badge>
                  </div>
                  <p className="text-xs text-kawaii-text-light line-clamp-1">{p.instruction.slice(0, 60)}...</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={p.taskType === 'task1' ? 'blue' : 'yellow'}>{p.wordLimit} từ</Badge>
                    <Badge variant="mint">Band {p.bandLevel}</Badge>
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

function Lightbulb({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5C7.7 12.8 8 13.5 8 14" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  )
}
