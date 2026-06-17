import type { Metadata } from 'next'
import SpeakingPage from './SpeakingPage'

export const metadata: Metadata = {
  title: 'Luyện nói IELTS - Speaking Parts 1-3 với AI',
  description:
    'Luyện nói IELTS Parts 1-3 với nhận diện giọng nói và chấm điểm AI. Cải thiện pronunciation, fluency, vocabulary. Có cue card và tips.',
  keywords: ['nói IELTS', 'IELTS speaking', 'speaking part 1', 'speaking part 2', 'speaking part 3', 'cue card IELTS'],
  alternates: {
    canonical: '/speaking',
  },
}

export default function Page() {
  return <SpeakingPage />
}
