import { BaiduTongji } from './baidu-tongji'
import { GoogleAdsense } from './google-adsense'
import { GoogleAnalytics } from './google-analytics'

export function ThirdParties() {
  return (
    <>
      <GoogleAdsense />
      <BaiduTongji />
      <GoogleAnalytics />
    </>
  )
}
