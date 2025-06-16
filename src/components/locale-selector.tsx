'use client'

import type { Locale } from 'next-intl'
import { useLocale, useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useTransition } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePathname, useRouter } from '@/i18n/navigation'

import { routing } from '@/i18n/routing'

export function LocaleSelector() {
  const t = useTranslations('LocaleSelector')
  const locale = useLocale()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()

  function onValueChange(nextLocale: Locale) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale as Locale },
      )
    })
  }

  return (
    <Select defaultValue={locale} disabled={isPending} onValueChange={onValueChange}>
      <SelectTrigger className={isPending ? 'opacity-30' : ''} aria-label={t('label')}>
        <SelectValue placeholder={t('label')} />
      </SelectTrigger>
      <SelectContent>
        {routing.locales.map(cur => (
          <SelectItem key={cur} value={cur}>
            {t('locale', { locale: cur })}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
