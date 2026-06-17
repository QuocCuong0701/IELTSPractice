import type { Metadata } from 'next'
import ListeningPage from './ListeningPage'

export const metadata: Metadata = {
  title: 'Luyện nghe IELTS - Listening Practice',
  description:
    'Luyện nghe IELTS với bài tập MCQ, note completion, map labelling. Hỗ trợ nhiều accent: British, American, Australian. Có transcript chi tiết.',
  keywords: ['nghe IELTS', 'IELTS listening', 'luyện nghe tiếng Anh', 'listening practice', 'note completion'],
  alternates: {
    canonical: '/listening',
  },
}

export default function Page() {
  return <ListeningPage />
}
