'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Mic, Square, Play, RefreshCw, Clock, CheckCircle, List, Sparkles, Volume2 } from 'lucide-react'
import KawaiiCard from '@/components/ui/KawaiiCard'
import KawaiiButton from '@/components/ui/KawaiiButton'
import Badge from '@/components/ui/Badge'
import ProgressRing from '@/components/ui/ProgressRing'
import { useLevel } from '@/context/LevelContext'
import { speakingData, type SpeakingTopic } from '@/data/speaking'
import { updateDailyLog } from '@/lib/db'
import type { SpeakingResult } from '@/lib/db'

const PART_LABELS: Record<number, string> = {
  1: 'Part 1 — Q&A',
  2: 'Part 2 — Cue Card',
  3: 'Part 3 — Discussion',
}

const PART_ICONS: Record<number, string> = { 1: '💬', 2: '🎤', 3: '🗣️' }

const PART_DESCRIPTIONS: Record<number, string> = {
  1: 'Trả lời các câu hỏi về bản thân và cuộc sống hàng ngày.',
  2: 'Nói về một chủ đề trong 1-2 phút dựa trên cue card.',
  3: 'Thảo luận các câu hỏi trừu tượng liên quan đến chủ đề Part 2.',
}

const evalRubric = [
  { key: 'fluency', label: 'Fluency & Coherence', desc: 'Nói trôi chảy, không ngập ngừng quá nhiều, ý tưởng mạch lạc.' },
  { key: 'vocabulary', label: 'Lexical Resource', desc: 'Sử dụng từ vựng phong phú, đúng chủ đề.' },
  { key: 'grammar', label: 'Grammatical Range', desc: 'Sử dụng đa dạng cấu trúc ngữ pháp đúng.' },
  { key: 'pronunciation', label: 'Pronunciation', desc: 'Phát âm rõ ràng, ngữ điệu tự nhiên.' },
  { key: 'task', label: 'Task Achievement', desc: 'Trả lời đúng trọng tâm câu hỏi, đủ ý.' },
]

export default function SpeakingPage() {
  const { level } = useLevel()
  const [selectedTopic, setSelectedTopic] = useState<SpeakingTopic | null>(null)
  const [selectedPart, setSelectedPart] = useState<number | null>(null)
  const [recording, setRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [prepTime, setPrepTime] = useState(0)
  const [prepping, setPrepping] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [evalItems, setEvalItems] = useState<Record<string, boolean>>({})
  const [showEval, setShowEval] = useState(false)

  const [transcript, setTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [aiResult, setAiResult] = useState<SpeakingResult['scores'] & { estimatedBand?: number; strengths?: string[]; improvements?: string[]; overallFeedback?: string } | null>(null)
  const [loadingAI, setLoadingAI] = useState(false)
  const [showAIPanel, setShowAIPanel] = useState(false)

  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const chunks = useRef<Blob[]>([])
  const prepTimer = useRef<NodeJS.Timeout | null>(null)
  const recognition = useRef<any>(null)
  const [micDevices, setMicDevices] = useState<MediaDeviceInfo[]>([])
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('')
  const [micError, setMicError] = useState<string | null>(null)
  const [micStatus, setMicStatus] = useState<'checking' | 'ready' | 'error' | 'no-device'>('checking')

  useEffect(() => {
    return () => {
      if (prepTimer.current) clearInterval(prepTimer.current)
      if (audioUrl) URL.revokeObjectURL(audioUrl)
      if (recognition.current) {
        recognition.current.abort()
      }
    }
  }, [audioUrl])

  const checkMicAvailability = useCallback(async () => {
    setMicStatus('checking')
    setMicError(null)
    try {
      // Check permission state (gracefully fall back if permissions.query not supported)
      try {
        const permResult = await navigator.permissions.query({ name: 'microphone' as PermissionName })
        if (permResult.state === 'denied') {
          setMicStatus('error')
          setMicError('Microphone đã bị chặn trong trình duyệt. Hãy mở cài đặt trang web và cho phép truy cập microphone.')
          return
        }
      } catch {
        // permissions.query not supported; continue with getUserMedia
      }

      // Enumerate audio input devices
      const devices = await navigator.mediaDevices.enumerateDevices()
      const audioInputs = devices.filter(d => d.kind === 'audioinput')
      setMicDevices(audioInputs)

      if (audioInputs.length === 0) {
        setMicStatus('no-device')
        setMicError('Không tìm thấy thiết bị thu âm nào trên máy tính của bạn. Hãy kết nối microphone và thử lại.')
        return
      }

      // Auto-select default if none selected
      if (!selectedDeviceId && audioInputs.length > 0) {
        setSelectedDeviceId(audioInputs[0].deviceId)
      }

      // Try accessing mic to confirm it really works
      const constraints = selectedDeviceId
        ? { audio: { deviceId: { exact: selectedDeviceId } } }
        : { audio: true }
      const testStream = await navigator.mediaDevices.getUserMedia(constraints)
      testStream.getTracks().forEach(t => t.stop())
      setMicStatus('ready')
      setMicError(null)
    } catch (err: any) {
      console.error('[Mic Check]', err.name || err, err.message)
      setMicStatus('error')
      if (err.name === 'NotFoundError') {
        setMicError('Không tìm thấy microphone. Hãy kiểm tra thiết bị thu âm đã được kết nối và bật.')
      } else if (err.name === 'NotAllowedError') {
        setMicError('Không thể truy cập microphone. Vui lòng cho phép quyền truy cập microphone trong trình duyệt.')
      } else if (err.name === 'NotReadableError') {
        setMicError('Microphone đang được sử dụng bởi ứng dụng khác. Vui lòng đóng các ứng dụng khác và thử lại.')
      } else {
        setMicError('Lỗi khi truy cập microphone: ' + (err.message || 'Không xác định') + '. Vui lòng thử lại.')
      }
    }
  }, [selectedDeviceId])

  // Check mic on mount and re-check when devices change
  useEffect(() => {
    checkMicAvailability()
    if (navigator.mediaDevices) {
      navigator.mediaDevices.addEventListener('devicechange', checkMicAvailability)
      return () => navigator.mediaDevices.removeEventListener('devicechange', checkMicAvailability)
    }
  }, [checkMicAvailability])

  const visibleTopics = speakingData.filter(
    (t) => (selectedPart ? t.part === selectedPart : true) && t.level.includes(level)
  )

  const startPrep = () => {
    setPrepping(true)
    setPrepTime(60)
    prepTimer.current = setInterval(() => {
      setPrepTime((p) => {
        if (p <= 1) {
          clearInterval(prepTimer.current!)
          setPrepping(false)
          return 0
        }
        return p - 1
      })
    }, 1000)
  }

  const startSTT = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SR) {
      console.warn('SpeechRecognition not supported')
      return
    }
    const r: any = new SR()
    r.lang = 'en-US'
    r.continuous = true
    r.interimResults = true
    r.onresult = (event: any) => {
      let final = ''
      let interim = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript + ' '
        } else {
          interim += event.results[i][0].transcript
        }
      }
      if (final) setTranscript((prev) => prev + final)
      setInterimTranscript(interim)
    }
    r.onerror = () => { /* silent */ }
    r.start()
    recognition.current = r
  }

  const stopSTT = () => {
    if (recognition.current) {
      recognition.current.stop()
      recognition.current = null
    }
    setInterimTranscript('')
  }

  const startRecording = useCallback(async () => {
    setMicError(null)
    try {
      const constraints = selectedDeviceId
        ? { audio: { deviceId: { exact: selectedDeviceId } } }
        : { audio: true }
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      const mr = new MediaRecorder(stream)
      mediaRecorder.current = mr
      chunks.current = []

      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.current.push(e.data)
      }

      mr.onstop = () => {
        const blob = new Blob(chunks.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(blob)
        setAudioUrl(url)
        stream.getTracks().forEach((t) => t.stop())
      }

      mr.start()
      setRecording(true)
      setAudioUrl(null)
      setTranscript('')
      setInterimTranscript('')
      startSTT()
    } catch (err: any) {
      console.error('[Mic Error]', err.name || err, err.message)
      setMicStatus('error')
      if (err.name === 'NotFoundError') {
        setMicError('Không tìm thấy microphone. Hãy kiểm tra thiết bị thu âm đã được kết nối và bật.')
      } else if (err.name === 'NotAllowedError') {
        setMicError('Không thể truy cập microphone. Vui lòng cho phép quyền truy cập microphone trong trình duyệt.')
      } else if (err.name === 'NotReadableError') {
        setMicError('Microphone đang được sử dụng bởi ứng dụng khác. Vui lòng đóng các ứng dụng khác và thử lại.')
      } else {
        setMicError('Lỗi khi truy cập microphone: ' + (err.message || 'Không xác định') + '. Vui lòng thử lại.')
      }
    }
  }, [selectedDeviceId])

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop()
      setRecording(false)
    }
    stopSTT()
  }

  const getPromptText = (t: SpeakingTopic) => {
    if (t.part === 2 && t.cueCard) {
      return t.cueCard.instruction + '\n' + t.cueCard.points.map((p) => `• ${p}`).join('\n')
    }
    return t.question || ''
  }

  const requestAIFeedback = async () => {
    if (!selectedTopic || !transcript.trim()) return
    setLoadingAI(true)
    try {
      const res = await fetch('/api/speaking-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: transcript.trim(),
          prompt: getPromptText(selectedTopic),
          part: selectedTopic.part,
          topic: selectedTopic.topic,
        }),
      })
      const data = await res.json()
      if (data.result) {
        setAiResult(data.result)
      } else if (data.feedback) {
        setAiResult({ estimatedBand: 0, fluency: 0, vocabulary: 0, grammar: 0, pronunciation: 0, taskAchievement: 0, strengths: [], improvements: [], overallFeedback: data.feedback })
      }
    } catch {
      setAiResult({ estimatedBand: 0, fluency: 0, vocabulary: 0, grammar: 0, pronunciation: 0, taskAchievement: 0, strengths: [], improvements: [], overallFeedback: 'Không thể kết nối AI. Vui lòng thử lại.' })
    }
    setLoadingAI(false)
    setShowAIPanel(true)
  }

  const saveResult = async () => {
    if (!selectedTopic) return
    const result: SpeakingResult = {
      level,
      date: Date.now(),
      topic: selectedTopic.topic,
      part: selectedTopic.part,
      transcript: transcript.trim(),
      estimatedBand: aiResult?.estimatedBand,
      scores: aiResult ? {
        fluency: aiResult.fluency ?? 0,
        vocabulary: aiResult.vocabulary ?? 0,
        grammar: aiResult.grammar ?? 0,
        pronunciation: aiResult.pronunciation ?? 0,
        taskAchievement: aiResult.taskAchievement ?? 0,
      } : undefined,
      selfEval: evalItems,
    }
    const { saveSpeakingResult } = await import('@/lib/db')
    await saveSpeakingResult(result)
  }

  const handleComplete = () => {
    setShowEval(true)
    setCompleted(true)
    updateDailyLog('exercisesDone', level)
    saveResult()
  }

  const selectTopic = (topic: SpeakingTopic) => {
    setSelectedTopic(topic)
    setCompleted(false)
    setAudioUrl(null)
    setPrepping(false)
    setPrepTime(0)
    setShowEval(false)
    setEvalItems({})
    setTranscript('')
    setInterimTranscript('')
    setAiResult(null)
    setShowAIPanel(false)
  }

  if (selectedTopic) {
    const t = selectedTopic

    if (completed && showEval) {
      return (
        <div className="max-w-xl mx-auto space-y-6">
          <KawaiiCard color="yellow">
            <div className="py-6 text-center">
              <p className="text-5xl mb-3">🎙️</p>
              <p className="text-xl font-extrabold text-kawaii-text dark:text-kawaii-text-dark">Hoàn thành!</p>
              <p className="text-sm text-kawaii-text-light dark:text-kawaii-text-light-dark mt-2">Tự đánh giá & AI Feedback</p>
            </div>
          </KawaiiCard>

          {transcript && (
            <KawaiiCard color="white">
              <p className="font-extrabold text-kawaii-text dark:text-kawaii-text-dark mb-2 flex items-center gap-2">
                <Volume2 size={16} /> Transcript
              </p>
              <p className="text-sm text-kawaii-text dark:text-kawaii-text-dark whitespace-pre-line leading-relaxed">
                {transcript}
              </p>
            </KawaiiCard>
          )}

          <div className="flex gap-3">
            <KawaiiButton
              variant="lavender"
              className="flex-1"
              onClick={requestAIFeedback}
              loading={loadingAI}
              disabled={!transcript.trim()}
            >
              <Sparkles size={16} /> {loadingAI ? 'Đang phân tích...' : 'AI Feedback'}
            </KawaiiButton>
          </div>

          {showAIPanel && aiResult && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <KawaiiCard color="lavender">
                <p className="font-extrabold text-kawaii-text dark:text-kawaii-text-dark mb-4 flex items-center gap-2">
                  <Sparkles size={18} className="text-kawaii-lavender-dark" /> AI Feedback
                </p>

                {aiResult.estimatedBand !== undefined && aiResult.estimatedBand > 0 && (
                  <div className="text-center mb-4">
                    <p className="text-3xl font-extrabold text-kawaii-lavender-dark">
                      Band {aiResult.estimatedBand}
                    </p>
                    <p className="text-xs text-kawaii-text-light dark:text-kawaii-text-light-dark">
                      Estimated overall
                    </p>
                  </div>
                )}

                {aiResult.fluency !== undefined && aiResult.fluency > 0 && (
                  <div className="grid grid-cols-5 gap-2 mb-4">
                    {[
                      { label: 'Fluency', value: aiResult.fluency },
                      { label: 'Vocabulary', value: aiResult.vocabulary },
                      { label: 'Grammar', value: aiResult.grammar },
                      { label: 'Pronunc.', value: aiResult.pronunciation },
                      { label: 'Task', value: aiResult.taskAchievement },
                    ].map((item) => (
                      <div key={item.label} className="text-center">
                        <ProgressRing progress={(item.value / 9) * 100} size={48} strokeWidth={4} label={`${item.value}`} />
                        <p className="text-[10px] text-kawaii-text-light dark:text-kawaii-text-light-dark mt-1">{item.label}</p>
                      </div>
                    ))}
                  </div>
                )}

                {aiResult.strengths && aiResult.strengths.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-bold text-green-600 mb-1">✅ Strengths</p>
                    <ul className="space-y-1">
                      {aiResult.strengths.map((s, i) => (
                        <li key={i} className="text-xs text-kawaii-text dark:text-kawaii-text-dark flex items-start gap-1">
                          <span className="text-green-500">•</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {aiResult.improvements && aiResult.improvements.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-bold text-orange-600 mb-1">🔧 Areas to Improve</p>
                    <ul className="space-y-1">
                      {aiResult.improvements.map((s, i) => (
                        <li key={i} className="text-xs text-kawaii-text dark:text-kawaii-text-dark flex items-start gap-1">
                          <span className="text-orange-500">•</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {aiResult.overallFeedback && (
                  <div className="bg-white/60 dark:bg-kawaii-card-bg-dark/60 rounded-kawaii p-3 mt-2">
                    <p className="text-xs text-kawaii-text dark:text-kawaii-text-dark leading-relaxed">
                      {aiResult.overallFeedback}
                    </p>
                  </div>
                )}
              </KawaiiCard>
            </motion.div>
          )}

          <KawaiiCard color="white">
            <p className="font-extrabold text-kawaii-text dark:text-kawaii-text-dark mb-3">Tự đánh giá (Self-Evaluation)</p>
            <div className="space-y-3">
              {evalRubric.map((item) => (
                <label key={item.key} className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={evalItems[item.key] || false}
                    onChange={(e) => setEvalItems((prev) => ({ ...prev, [item.key]: e.target.checked }))}
                    className="mt-1 accent-kawaii-pink"
                  />
                  <div>
                    <p className="text-sm font-bold text-kawaii-text dark:text-kawaii-text-dark">{item.label}</p>
                    <p className="text-xs text-kawaii-text-light dark:text-kawaii-text-light-dark">{item.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </KawaiiCard>

          <KawaiiButton variant="pink" className="w-full" onClick={() => setSelectedTopic(null)}>
            Quay lại danh sách
          </KawaiiButton>
        </div>
      )
    }

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <KawaiiButton variant="ghost" size="sm" onClick={() => { setSelectedTopic(null); setShowEval(false); setCompleted(false) }}>
            <ChevronLeft size={18} /> Quay lại
          </KawaiiButton>
          <Badge variant="lavender">Part {t.part}</Badge>
        </div>

        <KawaiiCard color="white">
          <h2 className="font-extrabold text-kawaii-text dark:text-kawaii-text-dark text-lg mb-2">{t.topic}</h2>

          {(t.part === 1 || t.part === 3) && t.question && (
            <div className="bg-kawaii-lavender/10 rounded-kawaii p-4 mb-3">
              <p className="text-sm font-semibold text-kawaii-text dark:text-kawaii-text-dark">{t.question}</p>
            </div>
          )}

          {t.part === 2 && t.cueCard && (
            <div className="bg-kawaii-peach/20 rounded-kawaii p-4 mb-3 border-2 border-dashed border-kawaii-peach/40">
              <p className="text-sm font-bold text-kawaii-text dark:text-kawaii-text-dark mb-2">📋 Cue Card</p>
              <p className="text-sm text-kawaii-text dark:text-kawaii-text-dark mb-2">{t.cueCard.instruction}</p>
              <ul className="text-sm text-kawaii-text dark:text-kawaii-text-dark space-y-1">
                {t.cueCard.points.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-kawaii-pink-dark font-bold">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {t.tips && (
            <div className="bg-kawaii-mint/10 rounded-kawaii p-3">
              <p className="text-xs font-bold text-kawaii-text-light dark:text-kawaii-text-light-dark mb-1">💡 Tips</p>
              {t.tips.map((tip, i) => (
                <p key={i} className="text-xs text-kawaii-text-light dark:text-kawaii-text-light-dark">• {tip}</p>
              ))}
            </div>
          )}

          {t.keywords && (
            <div className="flex flex-wrap gap-1 mt-3">
              {t.keywords.map((kw) => (
                <Badge key={kw} variant="peach">{kw}</Badge>
              ))}
            </div>
          )}
        </KawaiiCard>

        {t.part === 2 && !prepping && prepTime === 0 && !recording && !audioUrl && (
          <KawaiiButton variant="lavender" className="w-full" onClick={startPrep}>
            <Clock size={18} /> Bắt đầu chuẩn bị (1 phút)
          </KawaiiButton>
        )}

        {prepping && (
          <KawaiiCard color="yellow">
            <div className="text-center">
              <p className="text-sm font-bold text-kawaii-text dark:text-kawaii-text-dark mb-1">⏳ Chuẩn bị...</p>
              <p className="text-3xl font-extrabold text-kawaii-pink-dark">{prepTime}s</p>
            </div>
          </KawaiiCard>
        )}

        <KawaiiCard color="white">
          <div className="text-center space-y-3">
            <p className="text-sm font-bold text-kawaii-text dark:text-kawaii-text-dark">
              {t.part === 2 ? 'Ghi âm câu trả lời (1-2 phút)' : recording ? 'Đang ghi âm...' : 'Nhấn ghi âm để bắt đầu'}
            </p>

            {/* Mic status, device selector & retry */}
            {!recording && !audioUrl && (
              <div className="space-y-2">
                {micStatus === 'checking' && (
                  <p className="text-xs text-kawaii-text-light">🔍 Đang kiểm tra microphone...</p>
                )}
                {micStatus === 'error' && micError && (
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-kawaii p-3">
                    <p className="text-xs text-red-600 dark:text-red-400 text-left">{micError}</p>
                    <button
                      onClick={checkMicAvailability}
                      className="mt-2 text-xs font-bold text-kawaii-pink-dark hover:text-kawaii-pink flex items-center gap-1 mx-auto"
                    >
                      <RefreshCw size={12} /> Thử lại
                    </button>
                  </div>
                )}
                {micStatus === 'no-device' && micError && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-kawaii p-3">
                    <p className="text-xs text-yellow-700 dark:text-yellow-400 text-left">{micError}</p>
                    <button
                      onClick={checkMicAvailability}
                      className="mt-2 text-xs font-bold text-kawaii-pink-dark hover:text-kawaii-pink flex items-center gap-1 mx-auto"
                    >
                      <RefreshCw size={12} /> Kiểm tra lại
                    </button>
                  </div>
                )}
                {micDevices.length > 1 && (
                  <div className="flex items-center gap-2 justify-center">
                    <label className="text-xs text-kawaii-text-light shrink-0">Microphone:</label>
                    <select
                      value={selectedDeviceId}
                      onChange={(e) => setSelectedDeviceId(e.target.value)}
                      className="text-xs rounded-lg border border-kawaii-lavender/20 bg-white dark:bg-kawaii-card-bg-dark px-2 py-1 text-kawaii-text dark:text-kawaii-text-dark max-w-[200px]"
                    >
                      {micDevices.map((d) => (
                        <option key={d.deviceId} value={d.deviceId}>
                          {d.label || 'Microphone ' + d.deviceId.slice(0, 8) + '...'}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {micStatus === 'ready' && (
                  <p className="text-xs text-green-600 dark:text-green-400">✅ Microphone sẵn sàng</p>
                )}
              </div>
            )}

            <div className="flex items-center justify-center gap-4">
              {!recording && !audioUrl && (
                <motion.button
                  onClick={startRecording}
                  whileHover={micStatus === 'ready' ? { scale: 1.05 } : {}}
                  whileTap={micStatus === 'ready' ? { scale: 0.95 } : {}}
                  className={'w-16 h-16 rounded-full flex items-center justify-center shadow-kawaii-sm ' + (micStatus === 'ready'
                    ? 'bg-kawaii-pink cursor-pointer'
                    : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                  )}
                  disabled={micStatus !== 'ready' || (t.part === 2 && !prepping && prepTime !== 0)}
                >
                  <Mic size={28} className="text-white" />
                </motion.button>
              )}

              {recording && (
                <motion.button
                  onClick={stopRecording}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center animate-pulse shadow-kawaii-sm"
                >
                  <Square size={20} className="text-white" />
                </motion.button>
              )}

              {audioUrl && (
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={() => { const a = new Audio(audioUrl); a.play() }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full bg-kawaii-mint flex items-center justify-center shadow-kawaii-sm"
                  >
                    <Play size={20} className="text-white ml-0.5" />
                  </motion.button>
                  <motion.button
                    onClick={() => { setAudioUrl(null); startRecording() }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full bg-kawaii-lavender flex items-center justify-center shadow-kawaii-sm"
                  >
                    <RefreshCw size={18} className="text-white" />
                  </motion.button>
                </div>
              )}
            </div>

            {audioUrl && (
              <div className="flex items-center justify-center gap-1 text-sm text-green-600 font-bold">
                <CheckCircle size={14} /> Đã ghi âm xong
                {transcript && <span className="text-kawaii-text-light font-normal ml-2">({transcript.split(' ').length} words)</span>}
              </div>
            )}
          </div>
        </KawaiiCard>

        {/* Real-time transcript */}
        {recording && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <KawaiiCard color="mint">
              <p className="font-extrabold text-kawaii-text dark:text-kawaii-text-dark mb-2 flex items-center gap-2">
                <Volume2 size={16} /> Real-time Transcript
              </p>
              <div className="bg-white/60 dark:bg-kawaii-card-bg-dark/60 rounded-kawaii p-3 min-h-[60px]">
                <p className="text-sm text-kawaii-text dark:text-kawaii-text-dark">
                  {transcript || '🎤 Speak now...'}
                  {interimTranscript && (
                    <span className="text-kawaii-text-light/50">{interimTranscript}</span>
                  )}
                </p>
              </div>
            </KawaiiCard>
          </motion.div>
        )}

        {transcript && !recording && !completed && (
          <KawaiiCard color="white">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-bold text-kawaii-text dark:text-kawaii-text-dark text-sm flex items-center gap-2">
                  <Volume2 size={14} /> Transcript
                </p>
                <p className="text-sm text-kawaii-text dark:text-kawaii-text-dark mt-1 whitespace-pre-line">{transcript}</p>
              </div>
            </div>
          </KawaiiCard>
        )}

        {(t.part === 3 || (t.part === 1 && t.followUpQuestions)) && t.followUpQuestions && (
          <KawaiiCard color="lavender">
            <p className="font-extrabold text-kawaii-text dark:text-kawaii-text-dark mb-2">Câu hỏi thảo luận thêm:</p>
            <ul className="space-y-2">
              {t.followUpQuestions.map((q, i) => (
                <li key={i} className="text-sm text-kawaii-text dark:text-kawaii-text-dark flex items-start gap-2">
                  <span className="text-kawaii-pink-dark font-bold shrink-0">{i + 1}.</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </KawaiiCard>
        )}

        {audioUrl && !completed && (
          <KawaiiButton variant="pink" className="w-full" onClick={handleComplete}>
            <CheckCircle size={18} /> Hoàn thành & tự đánh giá
          </KawaiiButton>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-kawaii-text dark:text-kawaii-text-dark">Luyện nói</h1>
        <p className="text-kawaii-text-light dark:text-kawaii-text-light-dark font-semibold mt-1">Thực hành Speaking với các chủ đề IELTS thật</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {[1, 2, 3].map((part) => (
          <KawaiiButton
            key={part}
            variant={selectedPart === part ? 'pink' : 'ghost'}
            size="sm"
            onClick={() => setSelectedPart(selectedPart === part ? null : part)}
          >
            {PART_ICONS[part]} Part {part}
          </KawaiiButton>
        ))}
        {selectedPart && (
          <KawaiiButton variant="ghost" size="sm" onClick={() => setSelectedPart(null)}>
            <RefreshCw size={14} /> Tất cả
          </KawaiiButton>
        )}
      </div>

      {selectedPart && (
        <KawaiiCard color="lavender">
          <p className="text-sm text-kawaii-text dark:text-kawaii-text-dark">
            <span className="font-bold">{PART_LABELS[selectedPart]}:</span>{' '}
            {PART_DESCRIPTIONS[selectedPart]}
          </p>
        </KawaiiCard>
      )}

      {[1, 2, 3].map((part) => {
        const partTopics = visibleTopics.filter((t) => t.part === part)
        if (partTopics.length === 0) return null
        return (
          <div key={part}>
            <h2 className="font-extrabold text-kawaii-text dark:text-kawaii-text-dark mb-2 flex items-center gap-2">
              {PART_ICONS[part]} Part {part}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {partTopics.map((topic, i) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <KawaiiCard color="white" hoverable onClick={() => selectTopic(topic)}>
                    <p className="font-extrabold text-kawaii-text dark:text-kawaii-text-dark">{topic.topic}</p>
                    <p className="text-xs text-kawaii-text-light dark:text-kawaii-text-light-dark mt-1">
                      {topic.part === 2 ? '🎤 Cue Card' : topic.question?.slice(0, 60)}
                    </p>
                  </KawaiiCard>
                </motion.div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
