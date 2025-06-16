import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('IndexPage')

  return (
    <div className="container">
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  )
}
