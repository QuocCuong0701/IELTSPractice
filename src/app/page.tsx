import type { Metadata } from 'next'
import HomePage from './HomePage'

export const metadata: Metadata = {
  title: 'Kawaii English - Học IELTS miễn phí từ A1 đến C2',
  description:
    'Nền tảng học IELTS miễn phí với flashcard từ vựng, ngữ pháp, đọc hiểu, nghe, viết, nói. Phù hợp mọi trình độ A1-C2. Luyện thi IELTS hiệu quả với AI.',
  alternates: {
    canonical: '/',
  },
}

export default function Page() {
  return <HomePage />
}
