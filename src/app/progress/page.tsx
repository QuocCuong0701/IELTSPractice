import type { Metadata } from 'next'
import ProgressPage from './ProgressPage'

export const metadata: Metadata = {
  title: 'Tiến độ học tập - Theo dõi kết quả IELTS',
  description:
    'Theo dõi tiến độ học IELTS: streak học tập, điểm số quiz, thành tích, lịch sử mock test và speaking. Thống kê chi tiết từng kỹ năng.',
  keywords: ['tiến độ IELTS', 'theo dõi học tập', 'IELTS progress', 'thành tích học tập'],
  alternates: {
    canonical: '/progress',
  },
}

export default function Page() {
  return <ProgressPage />
}
