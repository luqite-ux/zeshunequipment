import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { FloatingRFQButton } from '@/components/floating-rfq-button'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://zeshunequipment.com'),
  title: {
    default: 'Zeshun Equipment - Industrial Mixing & Stainless Steel Equipment Manufacturer',
    template: '%s | Zeshun Equipment',
  },
  description: 'JIANGYIN ZESHUN MACHINERY CO., LTD. - Professional manufacturer of stainless steel mixing equipment, emulsifiers, high-shear dispersers, and automated powder dosing systems for chemical, lithium battery, pharmaceutical, and food industries.',
  keywords: 'mixing equipment, emulsifier, high shear disperser, stainless steel tank, powder dosing system, chemical machinery, pharmaceutical equipment, lithium battery equipment, food processing machinery, industrial mixer',
  authors: [{ name: 'Zeshun Equipment' }],
  creator: 'Zeshun Equipment',
  publisher: 'Zeshun Equipment',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/images/favicon.png',
    apple: '/images/favicon.png',
  },
  openGraph: {
    title: 'Zeshun Equipment - Industrial Mixing & Stainless Steel Equipment',
    description: 'Professional manufacturer of stainless steel mixing equipment for chemical, pharmaceutical, lithium battery and food industries.',
    url: 'https://zeshunequipment.com',
    siteName: 'Zeshun Equipment',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zeshun Equipment - Industrial Equipment',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zeshun Equipment - Industrial Mixing Equipment',
    description: 'Professional stainless steel equipment manufacturer',
    images: ['/images/og-image.jpg'],
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
  alternates: {
    canonical: 'https://zeshunequipment.com',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <FloatingRFQButton />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_TENANT_ID && (
        <script
          async
          src={`https://admin.globle-trade.com/api/public/analytics.js?tenantId=${encodeURIComponent(process.env.NEXT_PUBLIC_TENANT_ID)}`}
        />
      )}
      </body>
    </html>
  )
}
