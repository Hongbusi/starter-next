export const analyticsConfig = {
  google: {
    enabled: process.env.NODE_ENV === 'production',
    gaId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
    gtmId: process.env.NEXT_PUBLIC_GTM_ID,
  },
  baidu: {
    enabled: process.env.NODE_ENV === 'production',
    siteId: process.env.NEXT_PUBLIC_BAIDU_TONGJI_ID || '',
  },
}

export type AnalyticsConfig = typeof analyticsConfig
