'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, ClipboardList, BarChart3, BookText } from 'lucide-react'

const links = [
  { href: '/', label: 'Trang chủ', icon: Home },
  { href: '/vocabulary', label: 'Từ vựng', icon: BookOpen },
  { href: '/quiz', label: 'Quiz', icon: ClipboardList },
  { href: '/progress', label: 'Tiến độ', icon: BarChart3 },
  { href: '/grammar', label: 'Ngữ pháp', icon: BookText },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="bottom-nav">
      {links.map((link) => {
        const Icon = link.icon
        const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-kawaii transition-all duration-200
              ${isActive ? 'text-kawaii-pink-dark' : 'text-kawaii-text-light/60'}`}
          >
            <Icon size={22} />
            <span className="text-[10px] font-bold">{link.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
