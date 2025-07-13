'use client'

import { Navigation } from './navigation'
import { usePathname } from 'next/navigation'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideNavigation = pathname === '/'

  return (
    <div className="min-h-screen">
      {!hideNavigation && <Navigation />}
      <main className={hideNavigation ? '' : 'md:ml-64 pb-16 md:pb-0'}>
        {children}
      </main>
    </div>
  )
}