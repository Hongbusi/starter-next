'use client'

import { useEffect, useRef } from 'react'
import { adsConfig } from '@/config'
import { cn } from '@/lib/utils'
import { useAdEligibility, useAdStatus } from './hooks'

declare global {
  interface Window { adsbygoogle: unknown[] }
}

interface AdUnitProps {
  slotId: string
  className?: string
}

export function AdUnit({ slotId, className }: AdUnitProps) {
  // 1. 获取配置
  const slot = adsConfig.slots.find(s => s.id === slotId)
  const isValidConfig = slot && adsConfig.enabled && adsConfig.googleAdsenseId

  // 2. Ref 初始化
  // 使用 HTMLModElement 类型，对应 <ins> 标签
  const insRef = useRef<HTMLModElement>(null)
  const isPushedRef = useRef(false)

  // 3. 资格检测
  // isEligible 默认为 false，useEffect 后变为 true，这天然解决了 Hydration 问题
  const isEligible = useAdEligibility()

  // 4. 状态监听
  // 只有当具备资格(即渲染了ins)时才开始监听
  const status = useAdStatus(insRef, isEligible)

  // 5. 执行 AdSense Push
  useEffect(() => {
    // 只有具备资格，且未推送过，且配置有效时执行
    if (!isEligible || !isValidConfig || isPushedRef.current)
      return

    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
        isPushedRef.current = true
      }
    }
    catch (e) {
      console.error('[AdSense] Push error:', e)
    }
  }, [isEligible, isValidConfig])

  // --- 渲染逻辑 ---

  // 配置无效或环境不合格，直接不渲染
  if (!isValidConfig || !isEligible)
    return null

  // 广告加载失败（无填充），隐藏容器
  if (status === 'unfilled')
    return null

  return (
    <div
      className={cn(
        // 基础样式
        'relative w-full overflow-hidden text-center',
        // 依然建议保留 min-height 防止布局剧烈抖动，但广告加载后会自然撑开
        slot.className,
        className,
      )}
    >
      {/*
        直接渲染 <ins>。
        AdSense 脚本会自动寻找 class="adsbygoogle" 且没填内容的标签进行填充。
      */}
      <ins
        ref={insRef}
        className="adsbygoogle block"
        data-ad-client={adsConfig.googleAdsenseId}
        data-ad-slot={slot.slot}
        data-ad-format={slot.format ?? 'auto'}
        data-full-width-responsive="true"
        data-adtest={adsConfig.testMode ? 'on' : 'off'}
      />
    </div>
  )
}
