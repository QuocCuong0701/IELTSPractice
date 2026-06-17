import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import { LevelProvider } from '@/context/LevelContext'
import { ThemeProvider } from '@/context/ThemeContext'
import NavBar from '@/components/shared/NavBar'
import BottomNav from '@/components/shared/BottomNav'

const siteUrl = 'https://kawaii-ielts.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Kawaii English - Học IELTS miễn phí từ A1 đến C2',
    template: '%s | Kawaii English',
  },
  description:
    'Nền tảng học IELTS miễn phí với flashcard từ vựng, ngữ pháp, đọc hiểu, nghe, viết, nói. Phù hợp mọi trình độ A1-C2. Luyện thi IELTS hiệu quả với AI.',
  keywords: [
    'IELTS',
    'học IELTS',
    'luyện thi IELTS',
    'tiếng Anh',
    'English',
    'từ vựng IELTS',
    'ngữ pháp IELTS',
    'đọc hiểu IELTS',
    'nghe IELTS',
    'viết IELTS',
    'nói IELTS',
    'IELTS writing',
    'IELTS speaking',
    'IELTS reading',
    'IELTS listening',
    'học tiếng Anh miễn phí',
    'IELTS free',
    'IELTS practice',
    'mock test IELTS',
    'thi thử IELTS',
  ],
  authors: [{ name: 'Kawaii English' }],
  creator: 'Kawaii English',
  publisher: 'Kawaii English',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: siteUrl,
    siteName: 'Kawaii English',
    title: 'Kawaii English - Học IELTS miễn phí từ A1 đến C2',
    description:
      'Nền tảng học IELTS miễn phí với flashcard từ vựng, ngữ pháp, đọc hiểu, nghe, viết, nói. Phù hợp mọi trình độ A1-C2.',
    images: [
      {
        url: `${siteUrl}/icons/mascot.png`,
        width: 512,
        height: 512,
        alt: 'Kawaii English',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kawaii English - Học IELTS miễn phí',
    description:
      'Nền tảng học IELTS miễn phí với flashcard, bài tập và AI. Phù hợp mọi trình độ A1-C2.',
    images: [`${siteUrl}/icons/mascot.png`],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'Kawaii Eng',
    statusBarStyle: 'default',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
}

export const viewport: Viewport = {
  themeColor: '#FFB5C2',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Kawaii English',
  url: siteUrl,
  description:
    'Nền tảng học IELTS miễn phí với flashcard từ vựng, ngữ pháp, đọc hiểu, nghe, viết, nói.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'VND',
  },
  inLanguage: ['vi', 'en'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/icons/mascot.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
