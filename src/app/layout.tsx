import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import { LevelProvider } from '@/context/LevelContext'
import { ThemeProvider } from '@/context/ThemeContext'
import NavBar from '@/components/shared/NavBar'
import BottomNav from '@/components/shared/BottomNav'

export const metadata: Metadata = {
  title: 'Kawaii English - Học IELTS',
  description: 'App học IELTS từ A1 đến C2 với phong cách Kawaii',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'Kawaii Eng',
    statusBarStyle: 'default',
  },
}

export const viewport: Viewport = {
  themeColor: '#FFB5C2',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="min-h-screen pb-20 lg:pb-0 lg:pl-64">
        <Script id="sw-register" strategy="afterInteractive">
          {`if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/sw.js') }`}
        </Script>
        <LevelProvider>
          <ThemeProvider>
            <NavBar />
            <main className="kawaii-container py-6 lg:py-10">
              {children}
            </main>
            <BottomNav />
          </ThemeProvider>
        </LevelProvider>
      </body>
    </html>
  )
}
