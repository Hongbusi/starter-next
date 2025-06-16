import type { Metadata } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { Analytics } from '@/components/analytics'
import { SiteHeader } from '@/components/site-header'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ThemeProvider } from '@/components/theme-provider'
import { routing } from '@/i18n/routing'
import { fontSans } from '@/lib/fonts'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Starter Next',
  description: 'Starter Next',
}

export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode, params: Promise<{ locale: string }> }>) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body className={`${fontSans.variable} antialiased`}>
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex-1">{children}</div>
            </div>
            <Analytics />
          </ThemeProvider>
          <TailwindIndicator />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
