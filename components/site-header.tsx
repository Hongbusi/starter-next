import { MainNav } from '@/components/main-nav'
import { ModeToggle } from '@/components/mode-toggle'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-background border-b">
      <div className="container flex items-center h-14 space-x-4">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
