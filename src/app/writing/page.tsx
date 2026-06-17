import type { Metadata } from 'next'
import WritingPage from './WritingPage'

export const metadata: Metadata = {
  title: 'Luyện viết IELTS - Writing Task 1 & 2 với AI',
  description:
    'Luyện viết IELTS Task 1 và Task 2 với chấm điểm AI. Nhận feedback chi tiết về grammar, vocabulary, coherence. Có bài mẫu band 6-7.',
  keywords: ['viết IELTS', 'IELTS writing', 'writing task 1', 'writing task 2', 'AI chấm bài IELTS', 'IELTS writing feedback'],
  alternates: {
    canonical: '/writing',
  },
}

export default function Page() {
  return <WritingPage />
}
