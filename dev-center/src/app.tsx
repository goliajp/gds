import { useCallback, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router'

import { useThemeEffect } from '@gds/l1-systems/use-theme'
import { Kbd } from '@gds/l2-primitives'

import { Inspector } from './components/inspector'
import { Nav, layers } from './components/nav'
import { Stage } from './components/stage'
import { StatusBar } from './components/status-bar'
import { ThemeToolbar } from './components/theme-toolbar'
import { useFavorites } from './hooks/use-favorites'
import { useRecent } from './hooks/use-recent'
import { allItems } from './registry'

import type { ItemConfig } from './types'

// shortcuts data for the modal
const shortcutEntries: [string, string][] = [
  ['/', 'Focus search'],
  ['?', 'Show shortcuts'],
  ['f', 'Toggle favorite'],
  ['d', 'Toggle dark/light mode'],
  ['\u2190  \u2192', 'Cycle variants'],
  ['\u2191  \u2193', 'Navigate items'],
  ['[  ]', 'Navigate layers'],
  ['Escape', 'Reset variant'],
]

function ShortcutsModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="rounded-lg border border-border bg-surface/80 backdrop-blur-2xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 text-sm font-semibold text-fg">
          Keyboard Shortcuts
        </div>
        <div className="space-y-2">
          {shortcutEntries.map(([key, desc]) => (
            <div className="flex items-center gap-4" key={key}>
              <Kbd className="w-16 text-center">
                {key}
              </Kbd>
              <span className="text-xs text-fg-muted/60">{desc}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button
            className="text-xs text-fg-muted/30 hover:text-fg-muted/60 transition-colors"
            onClick={onClose}
          >
            Press ? or Escape to close
          </button>
        </div>
      </div>
    </div>
  )
}

// layout shell — handles nav, toolbar, shortcuts, favorites
function Shell() {
  const { layerId } = useParams<{ layerId: string; itemId: string }>()
  const navigate = useNavigate()
  const layerItems = allItems.filter(i => i.layer === layerId)

  useThemeEffect()

  const { favorites, isFavorite, toggleFavorite } = useFavorites()
  const { recent, addRecent } = useRecent()
  const [showShortcuts, setShowShortcuts] = useState(false)

  const validLayer = layers.some(l => l.id === layerId)

  if (layerId !== undefined && !validLayer) {
    return <Navigate to={`/${layers[0]?.id ?? 'l-dep'}`} replace />
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-bg">
      <ThemeToolbar />
      <div className="flex flex-1 overflow-hidden">
        <Nav
          items={allItems}
          favorites={favorites}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          recent={recent}
        />
        <Routes>
          <Route
            path=":itemId"
            element={
              <ItemPage
                layerId={layerId ?? ''}
                layerItems={layerItems}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                addRecent={addRecent}
                showShortcuts={showShortcuts}
                setShowShortcuts={setShowShortcuts}
                navigate={navigate}
              />
            }
          />
          <Route
            index
            element={
              layerItems.length > 0
                ? <Navigate to={layerItems[0].id} replace />
                : <main className="flex flex-1 items-center justify-center text-fg/40">
                    <div className="text-center">
                      <p className="text-2xl font-semibold">404</p>
                      <p className="mt-2 text-sm">component not found</p>
                    </div>
                  </main>
            }
          />
        </Routes>
      </div>

      {showShortcuts && (
        <ShortcutsModal onClose={() => setShowShortcuts(false)} />
      )}
    </div>
  )
}

// item page — one per route, state resets naturally on route change
type ItemPageProps = {
  layerId: string
  layerItems: (typeof allItems)
  favorites: string[]
  toggleFavorite: (id: string) => void
  addRecent: (id: string) => void
  showShortcuts: boolean
  setShowShortcuts: (v: boolean | ((prev: boolean) => boolean)) => void
  navigate: ReturnType<typeof useNavigate>
}

function ItemPage({
  layerId,
  layerItems,
  favorites: _favorites,
  toggleFavorite,
  addRecent,
  showShortcuts,
  setShowShortcuts,
  navigate,
}: ItemPageProps) {
  const { itemId } = useParams<{ itemId: string }>()
  const activeItem = allItems.find(item => item.id === itemId && item.layer === layerId)

  // state lives here — route change = component remount = fresh state
  const [variant, setVariant] = useState(activeItem?.variants?.[0] ?? '')
  const [config, setConfigRaw] = useState<ItemConfig>(activeItem?.defaultConfig ?? {})

  const setConfig = useCallback((key: string, val: unknown) => {
    setConfigRaw(prev => ({ ...prev, [key]: val }))
  }, [])

  const resetConfig = useCallback(() => {
    setConfigRaw(activeItem?.defaultConfig ?? {})
    setVariant(activeItem?.variants?.[0] ?? '')
  }, [activeItem])

  // track recent visits
  useEffect(() => {
    if (itemId !== undefined) {
      addRecent(itemId)
    }
  }, [itemId, addRecent])

  // keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      const isInput = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT'

      if (e.key === '/' && !isInput) {
        e.preventDefault()
        const searchInput = document.querySelector<HTMLInputElement>('.dc-search-input')
        if (searchInput !== null) searchInput.focus()
        return
      }

      if (e.key === '?' && !isInput) {
        e.preventDefault()
        setShowShortcuts((v: boolean) => !v)
        return
      }

      if (e.key === 'f' && !isInput) {
        e.preventDefault()
        if (itemId !== undefined) toggleFavorite(itemId)
        return
      }

      if (e.key === 'd' && !isInput) {
        e.preventDefault()
        const el = document.documentElement
        const current = el.getAttribute('data-theme')
        if (current === 'light') {
          el.setAttribute('data-theme', 'dark')
        } else {
          el.setAttribute('data-theme', 'light')
        }
        return
      }

      if ((e.key === '[' || e.key === ']') && !isInput) {
        e.preventDefault()
        const currentLayerIdx = layers.findIndex(l => l.id === layerId)
        if (currentLayerIdx < 0) return

        let nextLayerIdx = currentLayerIdx
        if (e.key === '[' && currentLayerIdx > 0) {
          nextLayerIdx = currentLayerIdx - 1
        }
        if (e.key === ']' && currentLayerIdx < layers.length - 1) {
          nextLayerIdx = currentLayerIdx + 1
        }
        if (nextLayerIdx !== currentLayerIdx) {
          const nextLayer = layers[nextLayerIdx]
          const firstItem = allItems.find(i => i.layer === nextLayer.id)
          if (firstItem !== undefined) {
            navigate(`/${nextLayer.id}/${firstItem.id}`)
          } else {
            navigate(`/${nextLayer.id}`)
          }
        }
        return
      }

      if (isInput) return

      const variants = activeItem?.variants

      if (e.key === 'ArrowLeft' && variants !== undefined && variants.length > 1) {
        e.preventDefault()
        const vi = variants.indexOf(variant)
        if (vi > 0) {
          setVariant(variants[vi - 1])
        } else {
          setVariant(variants[variants.length - 1])
        }
      }

      if (e.key === 'ArrowRight' && variants !== undefined && variants.length > 1) {
        e.preventDefault()
        const vi = variants.indexOf(variant)
        if (vi < variants.length - 1) {
          setVariant(variants[vi + 1])
        } else {
          setVariant(variants[0])
        }
      }

      if (e.key === 'Escape') {
        if (showShortcuts) {
          setShowShortcuts(false)
          return
        }
        if (variants !== undefined && variants.length > 0) {
          setVariant(variants[0])
        }
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [activeItem, itemId, layerId, variant, showShortcuts, navigate, toggleFavorite, setShowShortcuts])

  if (activeItem === undefined) {
    return (
      <>
        <main className="flex flex-1 items-center justify-center text-fg/40">
          <div className="text-center">
            <p className="text-2xl font-semibold">404</p>
            <p className="mt-2 text-sm">component not found</p>
          </div>
        </main>
        <StatusBar item={undefined} totalCount={allItems.length} layerCount={layerItems.length} />
      </>
    )
  }

  const stageProps = { config, setConfig, variant }
  const controlsProps = { config, setConfig, variant, setVariant, resetConfig }

  return (
    <>
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-hidden">
          <Stage item={activeItem} stageProps={stageProps} />
        </main>
        <aside className="w-[560px] shrink-0 overflow-hidden border-l border-border bg-bg-secondary/60 backdrop-blur-xl">
          <Inspector item={activeItem} stageProps={stageProps} controlsProps={controlsProps} />
        </aside>
      </div>
      <StatusBar
        item={activeItem}
        totalCount={allItems.length}
        layerCount={layerItems.length}
        variant={variant}
        variants={activeItem.variants}
        onVariantChange={setVariant}
      />
    </>
  )
}

export function App() {
  return (
    <Routes>
      <Route path="/:layerId/*" element={<Shell />} />
      <Route path="*" element={<Navigate to={`/${layers[0]?.id ?? 'l-docs'}`} replace />} />
    </Routes>
  )
}
