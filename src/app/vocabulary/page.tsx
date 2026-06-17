import type { Metadata } from 'next'
import VocabularyPage from './VocabularyPage'

export const metadata: Metadata = {
  title: 'Học từ vựng IELTS - Flashcard & Spaced Repetition',
  description:
    'Học từ vựng IELTS theo chủ đề với flashcard thông minh, bài tập gap-fill và synonym match. Hơn 500+ từ vựng IELTS từ A1 đến C2.',
  keywords: ['từ vựng IELTS', 'IELTS vocabulary', 'flashcard IELTS', 'học từ vựng tiếng Anh', 'spaced repetition'],
  alternates: {
    canonical: '/vocabulary',
  },
}

export default function Page() {
  return <VocabularyPage />
}
