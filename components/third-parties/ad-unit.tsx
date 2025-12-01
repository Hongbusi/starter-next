'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window { adsbygoogle: unknown[] }
}

interface AdUnitProps {
  slot: string
  format?: 'auto' | 'fluid' | 'rectangle'
  layoutKey?: string
  responsive?: boolean
  className?: string
  style?: React.CSSProperties
  /** 单个组件强制开启测试模式 */
  test?: boolean
}

export function AdUnit({
  slot,
  format = 'auto',
  layoutKey,
  responsive = true,
  className = '',
  style,
  test = false,
}: AdUnitProps) {
  const initialized = useRef(false)
  const googleAdsenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID
  const isDev = process.env.NODE_ENV !== 'production'

  // 读取全局测试开关 (环境变量)
  const isGlobalTest = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_TEST_MODE === 'true'

  // 1. 判断是否需要渲染真实(或测试)广告
  // 生产环境：总是渲染
  // 开发环境：只有当“全局开启”或“单个组件开启”时才渲染
  const shouldRenderAd = !isDev || isGlobalTest || test

  useEffect(() => {
    // 如果不该渲染、没有ID、或者已经初始化过，就跳过
    if (!shouldRenderAd || !googleAdsenseId || initialized.current)
      return

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
      initialized.current = true
    }
    catch (e) {
      console.error('AdSense error:', e)
    }
  }, [shouldRenderAd, googleAdsenseId, slot])

  // A. 开发环境占位符 (未开启测试模式时显示)
  if (!shouldRenderAd) {
    return (
      <div
        className={`bg-gray-100 border border-dashed border-gray-300 text-gray-400 flex items-center justify-center text-xs font-mono p-4 rounded ${className}`}
        style={{ minHeight: '100px', ...style }}
      >
        AD_SLOT:
        {' '}
        {slot}
      </div>
    )
  }

  // B. 缺少 ID 处理
  if (!googleAdsenseId)
    return null

  // C. 渲染广告
  return (
    <div className={`ad-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={googleAdsenseId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
        data-ad-layout-key={layoutKey}
        // 关键逻辑：
        // 1. 如果是开发环境 (isDev)，强制设置 "on" 以保护账号
        // 2. 如果是生产环境，设置为 null (React 会从 DOM 中彻底移除该属性)
        data-adtest={isDev ? 'on' : null}
      />
    </div>
  )
}
