'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import KawaiiCard from '@/components/ui/KawaiiCard'
import Badge from '@/components/ui/Badge'

interface BlogPostMeta {
  slug: string
  title: string
  description: string
  date: string
  keywords: string[]
}

export default function BlogList({ posts }: { posts: BlogPostMeta[] }) {
  if (posts.length === 0) {
    return (
      <KawaiiCard color="white">
        <p className="text-center text-kawaii-text-light py-8">
          Chưa có bài viết nào. Quay lại sau nhé! ✦
        </p>
      </KawaiiCard>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {posts.map((post, i) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <Link href={`/blog/${post.slug}`}>
            <KawaiiCard color="white" hoverable className="h-full flex flex-col">
              <div className="flex-1">
                <h2 className="text-lg font-extrabold text-kawaii-text dark:text-kawaii-text-dark mb-2 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-kawaii-text-light dark:text-kawaii-text-light-dark line-clamp-2 mb-3">
                  {post.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.keywords.slice(0, 3).map((kw) => (
                    <Badge key={kw} variant="lavender">{kw}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-kawaii-text-light">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(post.date).toLocaleDateString('vi-VN')}
                </span>
                <span className="flex items-center gap-1 text-kawaii-pink-dark font-bold">
                  Đọc <ArrowRight size={12} />
                </span>
              </div>
            </KawaiiCard>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
