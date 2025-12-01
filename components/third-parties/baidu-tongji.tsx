'use client'

import Script from 'next/script'

export function BaiduTongji() {
  const isProd = process.env.NODE_ENV === 'production'
  const baiduTongjiId = process.env.NEXT_PUBLIC_BAIDU_TONGJI_ID

  if (!isProd || !baiduTongjiId)
    return null

  return (
    <Script
      id="baidu-tongji"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?${baiduTongjiId}";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
          })();
        `,
      }}
    />
  )
}
