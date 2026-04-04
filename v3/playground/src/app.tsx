import { useFonts } from '@goliapkg/gds'
import { useSetThemeDensity, useSetThemeMotion, useThemeEffect } from '@goliapkg/gds/systems'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'

import { ThemeToggle } from './components/theme-toggle'

export function AppLayout() {
  useThemeEffect()
  useFonts()

  const setDensity = useSetThemeDensity()
  const setMotion = useSetThemeMotion()
  useEffect(() => {
    setDensity('default')
    setMotion('full')
  }, [setDensity, setMotion])

  const location = useLocation()
  const isHome = location.pathname === '/'

  // full-page demos render their own chrome
  if (!isHome) {
    return <Outlet />
  }

  return (
    <div className="flex h-full flex-col">
      <header className="border-border bg-bg/80 flex h-12 shrink-0 items-center justify-between border-b px-6 backdrop-blur-xl">
        <span className="text-fg text-sm font-semibold">GDS v3 Playground</span>
        <ThemeToggle />
      </header>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
