import { LocaleSelector } from '@/components/locale-selector'
import { ModeToggle } from '@/components/mode-toggle'
import { Link } from '@/i18n/navigation'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-background border-b">
      <div className="container flex items-center h-14 space-x-4">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">Starter Next</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <LocaleSelector />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
