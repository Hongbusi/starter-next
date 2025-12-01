'use client'

import Script from 'next/script'

export function GoogleAdsense() {
  const isProd = process.env.NODE_ENV === 'production'
  const isTestMode = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_TEST_MODE === 'true'
  const googleAdsenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID

  // 生产环境或开启测试模式时才加载广告脚本
  if (!googleAdsenseId || (!isProd && !isTestMode))
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
