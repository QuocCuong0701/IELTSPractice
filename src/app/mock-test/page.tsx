'use client'

import { motion } from 'framer-motion'
import { Headphones, BookOpen, PenTool, Mic, Play, Target } from 'lucide-react'
import KawaiiCard from '@/components/ui/KawaiiCard'
import KawaiiButton from '@/components/ui/KawaiiButton'
import Badge from '@/components/ui/Badge'
import { useLevel } from '@/context/LevelContext'
import { mockTestList } from '@/types/mock-test'

const sectionIcons: Record<string, typeof Headphones> = {
  listening: Headphones,
  reading: BookOpen,
  writing: PenTool,
  speaking: Mic,
}

export default function MockTestPage() {
  const { level } = useLevel()

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-kawaii-text dark:text-kawaii-text-dark">
          📝 Mock Test
        </h1>
        <p className="text-sm text-kawaii-text-light dark:text-kawaii-text-light-dark mt-1">
          Thi thử IELTS full 4 kỹ năng với thời gian thật
        </p>
      </div>

      <div className="grid gap-4">
        {mockTestList.map((test) => (
          <motion.div
            key={test.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <KawaiiCard color="pink">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-lg font-extrabold text-kawaii-text dark:text-kawaii-text-dark">
                      {test.title}
                    </h2>
                    <Badge variant="pink">Band {test.bandTarget}</Badge>
                  </div>
                  <p className="text-sm text-kawaii-text-light dark:text-kawaii-text-light-dark mb-3">
                    {test.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {test.sections.map((s) => {
                      const Icon = sectionIcons[s.type]
                      return (
                        <span
                          key={s.id}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-kawaii-full bg-kawaii-lavender/10 text-xs font-semibold text-kawaii-text-light dark:text-kawaii-text-light-dark"
                        >
                          <Icon size={12} />
                          {s.title} ({s.timeLimit}&apos;)
                        </span>
                      )
                    })}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-kawaii-text-light dark:text-kawaii-text-light-dark">
                    <Target size={12} />
                    <span>Trình độ hiện tại: {level}</span>
                  </div>
                </div>
                <a href={`/mock-test/${test.id}`}>
                  <KawaiiButton variant="pink">
                    <Play size={16} />
                    Start
                  </KawaiiButton>
                </a>
              </div>
            </KawaiiCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
