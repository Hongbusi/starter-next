export interface AdSlot {
  id: string
  description: string
  slot: string
  format?: 'auto' | 'fluid' | 'rectangle'
  className?: string
}

export const adsConfig = {
  enabled: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ENABLED !== 'false',
  testMode: process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_TEST_MODE === 'true',
  googleAdsenseId: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || '',

  slots: <AdSlot[]>[
    { id: 'home_top_banner', description: '首页顶部横幅', slot: '1234567890' },
    { id: 'blog_sidebar', description: '博客侧栏广告', slot: '0987654321' },
    { id: 'article_bottom', description: '文章底部广告', slot: '4561237890' },
  ],
}

export type AdsConfig = typeof adsConfig
