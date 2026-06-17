import type { Metadata } from 'next'
import GrammarPage from './GrammarPage'

export const metadata: Metadata = {
  title: 'Ngữ pháp IELTS - Bài học & bài tập',
  description:
    'Ôn luyện ngữ pháp IELTS với bài học chi tiết, bài tập trắc nghiệm, transformation và error correction. Phù hợp trình độ B1-C2.',
  keywords: ['ngữ pháp IELTS', 'IELTS grammar', 'học ngữ pháp tiếng Anh', 'bài tập ngữ pháp'],
  alternates: {
    canonical: '/grammar',
  },
}

export default function Page() {
  return <GrammarPage />
}
