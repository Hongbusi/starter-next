import Link from 'next/link'
import * as React from 'react'

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <span className="inline-block font-bold">Starter Next</span>
      </Link>
    </div>
  )
}
