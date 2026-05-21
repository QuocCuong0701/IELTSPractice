'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen,
  Sparkles,
  BookText,
  Headphones,
  PenTool,
  ClipboardList,
  BarChart3,
  Home,
} from 'lucide-react'
import LevelSelector from '@/components/ui/LevelSelector'
import { useLevel } from '@/context/LevelContext'

const links = [
  { href: '/', label: 'Trang chủ', icon: Home },
  { href: '/vocabulary', label: 'Từ vựng', icon: BookOpen },
  { href: '/grammar', label: 'Ngữ pháp', icon: BookText },
  { href: '/reading', label: 'Đọc hiểu', icon: Sparkles },
  { href: '/listening', label: 'Nghe', icon: Headphones },
  { href: '/writing', label: 'Viết', icon: PenTool },
  { href: '/quiz', label: 'Quiz', icon: ClipboardList },
  { href: '/progress', label: 'Tiến độ', icon: BarChart3 },
]

export default function NavBar() {
  const pathname = usePathname()
  const { level } = useLevel()

  return (
    <aside className="sidebar-nav">
      <Link href="/" className="flex items-center gap-3 px-4 mb-6">
        <div className="w-10 h-10 rounded-kawaii bg-gradient-to-br from-kawaii-pink to-kawaii-lavender flex items-center justify-center shadow-kawaii-sm">
          <span className="text-white text-lg font-extrabold">E</span>
        </div>
        <div>
          <h1 className="font-extrabold text-lg text-kawaii-text">Kawaii Eng</h1>
          <p className="text-xs text-kawaii-text-light -mt-1">Trình độ {level}</p>
        </div>
      </Link>

      <div className="px-4 mb-6">
        <LevelSelector />
      </div>

      <nav className="flex flex-col gap-1 px-2">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-kawaii text-sm font-bold transition-all duration-200
                ${isActive
                  ? 'bg-kawaii-pink/15 text-kawaii-pink-dark shadow-kawaii-sm'
                  : 'text-kawaii-text-light hover:bg-kawaii-lavender/10 hover:text-kawaii-text'
                }`}
            >
              <Icon size={20} />
              <span>{link.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto px-4 pt-6">
        <div className="rounded-kawaii bg-gradient-to-br from-kawaii-pink/10 to-kawaii-lavender/10 p-4 text-center border border-kawaii-lavender/10">
          <p className="text-xs font-bold text-kawaii-text-light">
            ✦ Học mỗi ngày ✦
          </p>
          <p className="text-[10px] text-kawaii-text-light/60 mt-1">
            IELTS {level} trong tầm tay
          </p>
        </div>
      </div>
    </aside>
  )
}
