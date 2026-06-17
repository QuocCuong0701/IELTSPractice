import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import BlogList from './BlogList'

export const metadata: Metadata = {
  title: 'Blog IELTS - Mẹo & hướng dẫn luyện thi IELTS',
  description:
    'Bài viết hướng dẫn học IELTS: mẹo từ vựng, ngữ pháp, writing, speaking, reading, listening. Lộ trình IELTS 6.5+ cho người Việt.',
  keywords: ['blog IELTS', 'mẹo IELTS', 'hướng dẫn IELTS', 'luyện thi IELTS', 'IELTS tips'],
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-kawaii-text dark:text-kawaii-text-dark">
          Blog IELTS
        </h1>
        <p className="text-kawaii-text-light dark:text-kawaii-text-light-dark font-semibold mt-1">
          Mẹo, hướng dẫn và lộ trình luyện thi IELTS hiệu quả
        </p>
      </div>

      <BlogList posts={posts} />
    </div>
  )
}
