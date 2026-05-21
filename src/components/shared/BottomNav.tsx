'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, ClipboardList, BarChart3, BookText, Mic } from 'lucide-react'

const links = [
  { href: '/', label: 'Trang chủ', icon: Home },
  { href: '/vocabulary', label: 'Từ vựng', icon: BookOpen },
  { href: '/grammar', label: 'Ngữ pháp', icon: BookText },
  { href: '/speaking', label: 'Nói', icon: Mic },
  { href: '/quiz', label: 'Quiz', icon: ClipboardList },
  { href: '/progress', label: 'Tiến độ', icon: BarChart3 },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Điều hướng dưới">
      {links.map((link) => {
        const Icon = link.icon
        const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-label={link.label}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-kawaii transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kawaii-lavender
              ${isActive ? 'text-kawaii-pink-dark dark:text-kawaii-pink' : 'text-kawaii-text-light/60 dark:text-kawaii-text-light-dark/60'}`}
          >
            <Icon size={22} aria-hidden="true" />
            <span className="text-[10px] font-bold">{link.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
