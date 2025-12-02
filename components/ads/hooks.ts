'use client'

import type { RefObject } from 'react'
import { useEffect, useState } from 'react'

/**
 * 广告展示资格检测
 * 作用：判断当前环境是否有资格展示广告。
 * 逻辑：排除爬虫、自动化工具、极小窗口等无效流量。
 */
export function useAdEligibility() {
  const [isEligible, setIsEligible] = useState(false)

  useEffect(() => {
    // SSR 环境不执行
    if (typeof window === 'undefined')
      return

    // 1. WebDriver 检测 (Selenium/Puppeteer 等自动化工具)
    if (navigator.webdriver)
      return

    // 2. UserAgent 检测 (常见爬虫)
    const ua = navigator.userAgent.toLowerCase()
    const isBot = /bot|crawler|spider|crawling|headless|selenium|puppet|python|curl|wget/i.test(ua)
    if (isBot)
      return

    // 3. 窗口尺寸检测 (排除 0x0 或 1x1 的隐形刷量窗口)
    if (window.innerWidth < 100 || window.innerHeight < 100)
      return

    // 通过所有检查，具备展示资格
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks-extra/no-direct-set-state-in-use-effect
    setIsEligible(true)
  }, [])

  return isEligible
}

/**
 * 广告状态监听
 * 作用：监听 AdSense 返回的 data-ad-status 属性。
 * 返回：'loading' | 'filled' | 'unfilled'
 */
export type AdStatus = 'loading' | 'filled' | 'unfilled'

export function useAdStatus<T extends HTMLElement>(ref: RefObject<T | null>, shouldObserve: boolean): AdStatus {
  const [status, setStatus] = useState<AdStatus>('loading')

  useEffect(() => {
    if (!shouldObserve || !ref.current)
      return

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-ad-status') {
          const s = ref.current?.getAttribute('data-ad-status')
          if (s === 'unfilled') {
            setStatus('unfilled')
          }
          else if (s === 'filled') {
            setStatus('filled')
          }
        }
      })
    })

    observer.observe(ref.current, { attributes: true })

    // 超时兜底：如果 8 秒后状态依然是 loading，
    // 可能是被 AdBlock 拦截脚本，或者是网络问题，强制设为 unfilled 以便让组件隐藏
    const timer = setTimeout(() => {
      setStatus(prev => prev === 'loading' ? 'unfilled' : prev)
    }, 8000)

    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [shouldObserve, ref])

  return status
}
