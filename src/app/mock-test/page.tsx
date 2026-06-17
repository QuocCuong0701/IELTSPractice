import type { Metadata } from 'next'
import MockTestPage from './MockTestPage'

export const metadata: Metadata = {
  title: 'Mock Test IELTS - Thi thử IELTS full 4 kỹ năng',
  description:
    'Thi thử IELTS full 4 kỹ năng: Reading, Listening, Writing, Speaking. Giống đề thi thật với timer và chấm điểm band.',
  keywords: ['mock test IELTS', 'thi thử IELTS', 'IELTS practice test', 'đề thi IELTS', 'IELTS full test'],
  alternates: {
    canonical: '/mock-test',
  },
}

export default function Page() {
  return <MockTestPage />
}
