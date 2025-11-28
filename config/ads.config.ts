export interface AdSlot {
  id: string // 广告位 ID
  description?: string // 广告位说明
  slotId?: string // Adsense slot ID
  sizes?: [number, number][] // 可选尺寸
}

export const adsConfig = {
  /** 是否开启广告（全局开关） */
  enabled: true,

  /** Google Adsense 全局配置 */
  adsense: {
    client: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || '',
    testMode: process.env.NODE_ENV !== 'production', // 自动测试模式
  },

  /** 自定义广告位（手动 adsbygoogle） */
  slots: <AdSlot[]>[
    {
      id: 'home_top_banner',
      description: '首页顶部横幅',
      slotId: '1234567890',
      sizes: [[728, 90], [320, 100]],
    },
    {
      id: 'blog_sidebar',
      description: '博客侧栏广告',
      slotId: '0987654321',
      sizes: [[300, 250], [336, 280]],
    },
    {
      id: 'article_bottom',
      description: '文章底部广告',
      slotId: '4561237890',
    },
  ],
}

export type AdsConfig = typeof adsConfig
