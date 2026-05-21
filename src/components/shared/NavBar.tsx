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
  Mic,
  Moon,
  Sun,
  FileCheck,
} from 'lucide-react'
import LevelSelector from '@/components/ui/LevelSelector'
import { useLevel } from '@/context/LevelContext'
import { useTheme } from '@/context/ThemeContext'

const links = [
  { href: '/', label: 'Trang chủ', icon: Home },
  { href: '/vocabulary', label: 'Từ vựng', icon: BookOpen },
  { href: '/grammar', label: 'Ngữ pháp', icon: BookText },
  { href: '/reading', label: 'Đọc hiểu', icon: Sparkles },
  { href: '/speaking', label: 'Nói', icon: Mic },
  { href: '/listening', label: 'Nghe', icon: Headphones },
  { href: '/writing', label: 'Viết', icon: PenTool },
  { href: '/quiz', label: 'Quiz', icon: ClipboardList },
  { href: '/mock-test', label: 'Mock Test', icon: FileCheck },
  { href: '/progress', label: 'Tiến độ', icon: BarChart3 },
]

export default function NavBar() {
  const pathname = usePathname()
  const { level } = useLevel()
  const { dark, toggle } = useTheme()

  return (
    <aside className="sidebar-nav" role="complementary" aria-label="Menu chính">
      <Link href="/" className="flex items-center gap-3 px-4 mb-6" aria-label="Về trang chủ">
        <div className="w-10 h-10 rounded-kawaii bg-gradient-to-br from-kawaii-pink to-kawaii-lavender flex items-center justify-center shadow-kawaii-sm">
          <span className="text-white text-lg font-extrabold">E</span>
        </div>
        <div>
          <h1 className="font-extrabold text-lg text-kawaii-text dark:text-kawaii-text-dark">Kawaii Eng</h1>
          <p className="text-xs text-kawaii-text-light dark:text-kawaii-text-light-dark -mt-1">Trình độ {level}</p>
        </div>
      </Link>

      <div className="px-4 mb-6">
        <LevelSelector />
      </div>

      <nav className="flex flex-col gap-1 px-2" role="navigation" aria-label="Điều hướng chính">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-label={link.label}
              className={`flex items-center gap-3 px-4 py-3 rounded-kawaii text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kawaii-lavender
                ${isActive
                  ? 'bg-kawaii-pink/15 text-kawaii-pink-dark dark:bg-kawaii-pink/20 dark:text-kawaii-pink shadow-kawaii-sm'
                  : 'text-kawaii-text-light dark:text-kawaii-text-light-dark hover:bg-kawaii-lavender/10 dark:hover:bg-kawaii-lavender/10 hover:text-kawaii-text dark:hover:text-kawaii-text-dark'
                }`}
            >
              <Icon size={20} aria-hidden="true" />
              <span>{link.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto px-4 pt-6 space-y-2">
        <button
          onClick={toggle}
          aria-label={dark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-kawaii text-sm font-bold transition-all duration-200
            text-kawaii-text-light dark:text-kawaii-text-light-dark
            hover:bg-kawaii-lavender/10 dark:hover:bg-kawaii-lavender/10
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kawaii-lavender"
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
          <span>{dark ? 'Chế độ sáng' : 'Chế độ tối'}</span>
        </button>

        <div className="rounded-kawaii bg-gradient-to-br from-kawaii-pink/10 to-kawaii-lavender/10 dark:from-kawaii-pink/5 dark:to-kawaii-lavender/5 p-4 text-center border border-kawaii-lavender/10 dark:border-kawaii-lavender/10">
          <p className="text-xs font-bold text-kawaii-text-light dark:text-kawaii-text-light-dark">
            ✦ Học mỗi ngày ✦
          </p>
          <p className="text-[10px] text-kawaii-text-light/60 dark:text-kawaii-text-light-dark/60 mt-1">
            IELTS {level} trong tầm tay
          </p>
        </div>
      </div>
    </aside>
  )
}
