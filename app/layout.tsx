import type { Metadata } from 'next'
import { GoogleAdsense } from '@/components/ads'
import { BaiduAnalytics, GoogleAnalytics } from '@/components/analytics'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { siteConfig } from '@/config'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
        <BaiduAnalytics />
        <GoogleAnalytics />
        <GoogleAdsense />
        <TailwindIndicator />
      </body>
    </html>
  )
}
