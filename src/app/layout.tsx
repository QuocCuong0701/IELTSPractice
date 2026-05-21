import type { Metadata } from 'next'
import './globals.css'
import { LevelProvider } from '@/context/LevelContext'
import NavBar from '@/components/shared/NavBar'
import BottomNav from '@/components/shared/BottomNav'

export const metadata: Metadata = {
  title: 'Kawaii English - Học IELTS',
  description: 'App học IELTS từ A1 đến C2 với phong cách Kawaii',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen pb-20 lg:pb-0 lg:pl-64">
        <LevelProvider>
          <NavBar />
          <main className="kawaii-container py-6 lg:py-10">
            {children}
          </main>
          <BottomNav />
        </LevelProvider>
      </body>
    </html>
  )
}
