import type { Metadata } from 'next'
import QuizPage from './QuizPage'

export const metadata: Metadata = {
  title: 'Quiz IELTS - Kiểm tra 4 kỹ năng',
  description:
    'Mini test IELTS kiểm tra nhanh 4 kỹ năng: Reading, Listening, Writing, Speaking. Có đáp án chi tiết và tính điểm tự động.',
  keywords: ['quiz IELTS', 'mini test IELTS', 'kiểm tra IELTS', 'IELTS test online', 'luyện thi IELTS'],
  alternates: {
    canonical: '/quiz',
  },
}

export default function Page() {
  return <QuizPage />
}
