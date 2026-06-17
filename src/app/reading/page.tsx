import type { Metadata } from 'next'
import ReadingPage from './ReadingPage'

export const metadata: Metadata = {
  title: 'Luyện đọc hiểu IELTS - Reading Practice',
  description:
    'Luyện đọc hiểu IELTS với các dạng bài: MCQ, True/False/Not Given, headings matching, summary completion. Có timer và chấm điểm tự động.',
  keywords: ['đọc hiểu IELTS', 'IELTS reading', 'luyện đọc IELTS', 'reading practice', 'True False Not Given'],
  alternates: {
    canonical: '/reading',
  },
}

export default function Page() {
  return <ReadingPage />
}
