import type { Metadata } from 'next'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ThirdParties } from '@/components/third-parties'
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
        <ThirdParties />
        <TailwindIndicator />
      </body>
    </html>
  )
}
