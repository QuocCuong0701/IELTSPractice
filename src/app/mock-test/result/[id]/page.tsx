'use client'

import { use, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Target, Trophy } from 'lucide-react'
import KawaiiCard from '@/components/ui/KawaiiCard'
import KawaiiButton from '@/components/ui/KawaiiButton'
import Badge from '@/components/ui/Badge'
import Confetti from '@/components/ui/Confetti'
import ProgressRing from '@/components/ui/ProgressRing'
import { mockTestList, estimateBand, calculateOverallBand, type MockTestResult as MockTestResultType } from '@/types/mock-test'
import { useRouter } from 'next/navigation'

const sectionColors: Record<string, 'pink' | 'lavender' | 'mint' | 'peach' | 'yellow'> = {
  listening: 'lavender',
  reading: 'peach',
  writing: 'mint',
  speaking: 'yellow',
}

export default function MockTestResultPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolved = use(params)
  const test = mockTestList.find((t) => t.id === resolved.id)

  const [result, setResult] = useState<MockTestResultType | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem('mockTestResult')
    if (stored) {
      try {
        setResult(JSON.parse(stored))
      } catch { /* ignore */ }
    }
  }, [])

  if (!test || !result) {
    return (
      <div className="text-center py-20">
        <p className="text-lg font-bold text-kawaii-text dark:text-kawaii-text-dark">
          {!test ? 'Test not found' : 'No result data'}
        </p>
        <a href="/mock-test" className="text-kawaii-lavender-dark text-sm mt-2 inline-block">← Back to tests</a>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {result.overallBand >= 6.5 && <Confetti />}

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => router.push('/mock-test')}
            className="flex items-center gap-1 text-sm text-kawaii-text-light dark:text-kawaii-text-light-dark hover:text-kawaii-lavender-dark"
            aria-label="Back to tests"
          >
            <ArrowLeft size={16} /> Tests
          </button>
        </div>

        <KawaiiCard color="yellow">
          <div className="text-center py-6">
            <p className="text-5xl mb-3">{result.overallBand >= 6.5 ? '🎉' : '📊'}</p>
            <h1 className="text-xl font-extrabold text-kawaii-text dark:text-kawaii-text-dark mb-1">{test.title} — Kết quả</h1>

            <div className="flex items-center justify-center gap-4 my-4">
              <div>
                <p className="text-5xl font-extrabold text-kawaii-lavender-dark">Band {result.overallBand}</p>
                <p className="text-xs text-kawaii-text-light dark:text-kawaii-text-light-dark mt-1">
                  Overall estimated band
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center mb-6">
              <Badge variant="pink">Target: Band {test.bandTarget}</Badge>
              <Badge variant={result.overallBand >= test.bandTarget ? 'mint' : 'peach'}>
                {result.overallBand >= test.bandTarget ? 'Target achieved!' : 'Keep practicing'}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {result.sectionResults.map((r) => {
                const color = sectionColors[r.type]
                return (
                  <KawaiiCard key={r.sectionId} color={color}>
                    <div className="text-center py-2">
                      <ProgressRing
                        progress={r.percentage}
                        size={64}
                        strokeWidth={6}
                        label={`Band ${r.bandEstimate}`}
                      />
                      <p className="text-xs font-bold text-kawaii-text dark:text-kawaii-text-dark mt-2">{r.title}</p>
                      <p className="text-[10px] text-kawaii-text-light dark:text-kawaii-text-light-dark">
                        {r.score}/{r.total} correct
                      </p>
                    </div>
                  </KawaiiCard>
                )
              })}
            </div>

            <KawaiiButton variant="pink" onClick={() => router.push('/mock-test')}>
              Take another test
            </KawaiiButton>
          </div>
        </KawaiiCard>
      </motion.div>
    </div>
  )
}
