'use client'

import Script from 'next/script'
import { analyticsConfig } from '@/config'

export function BaiduAnalytics() {
  const { enabled, baiduAnalyticsId } = analyticsConfig

  if (!enabled || !baiduAnalyticsId)
    return null

  return (
    <Script
      id="baidu-analytics"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?${baiduAnalyticsId}";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
          })();
        `,
      }}
    />
  )
}
