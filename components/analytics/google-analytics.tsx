'use client'

import Script from 'next/script'
import { analyticsConfig } from '@/config'

export function GoogleAnalytics() {
  const { enabled, googleAnalyticsId } = analyticsConfig

  if (!enabled || !googleAnalyticsId)
    return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}');
          `,
        }}
      />
    </>
  )
}
