'use client'

import Script from 'next/script'
import { adsConfig } from '@/config'

export function GoogleAdsense() {
  const { enabled, testMode, googleAdsenseId } = adsConfig

  if (!enabled || !googleAdsenseId || !testMode)
    return null

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${googleAdsenseId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  )
}
