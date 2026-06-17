'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, Calendar, Tag } from 'lucide-react'
import KawaiiCard from '@/components/ui/KawaiiCard'
import Badge from '@/components/ui/Badge'
import KawaiiButton from '@/components/ui/KawaiiButton'

interface BlogPostData {
  slug: string
  title: string
  description: string
  date: string
  keywords: string[]
  content: string
}

export default function BlogPost({ post }: { post: BlogPostData }) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <KawaiiButton variant="ghost" size="sm">
        <Link href="/blog" className="flex items-center gap-1">
          <ChevronLeft size={18} /> Quay lại Blog
        </Link>
      </KawaiiButton>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <KawaiiCard color="white">
          <header className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-kawaii-text dark:text-kawaii-text-dark mb-3">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-kawaii-text-light">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {new Date(post.date).toLocaleDateString('vi-VN')}
              </span>
              <div className="flex items-center gap-1 flex-wrap">
                <Tag size={14} />
                {post.keywords.slice(0, 4).map((kw) => (
                  <Badge key={kw} variant="lavender">{kw}</Badge>
                ))}
              </div>
            </div>
          </header>

          <div
            className="prose prose-kawaii max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </KawaiiCard>
      </motion.article>

      <KawaiiCard color="lavender">
        <div className="text-center space-y-3">
          <p className="font-extrabold text-kawaii-text dark:text-kawaii-text-dark">
            Muốn luyện tập thêm?
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="/vocabulary">
              <Badge variant="pink" className="cursor-pointer hover:opacity-80">Học từ vựng</Badge>
            </Link>
            <Link href="/grammar">
              <Badge variant="lavender" className="cursor-pointer hover:opacity-80">Ngữ pháp</Badge>
            </Link>
            <Link href="/writing">
              <Badge variant="yellow" className="cursor-pointer hover:opacity-80">Luyện viết</Badge>
            </Link>
            <Link href="/speaking">
              <Badge variant="mint" className="cursor-pointer hover:opacity-80">Luyện nói</Badge>
            </Link>
          </div>
        </div>
      </KawaiiCard>
    </div>
  )
}
