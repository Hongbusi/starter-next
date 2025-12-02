export const analyticsConfig = {
  enabled: process.env.NODE_ENV === 'production',
  baiduAnalyticsId: process.env.NEXT_PUBLIC_BAIDU_ANALYTICS_ID || '',
  googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '',
}

export type AnalyticsConfig = typeof analyticsConfig
