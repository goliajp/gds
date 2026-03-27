import { useCallback, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router'

import { useThemeEffect } from '@gds/l1-systems/use-theme'

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
        className="rounded-lg border border-white/[0.08] bg-[#1a1a1a] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 text-sm font-semibold text-fg">
          Keyboard Shortcuts
        </div>
        <div className="space-y-2">
          {shortcutEntries.map(([key, desc]) => (
            <div className="flex items-center gap-4" key={key}>
              <kbd className="w-16 rounded bg-white/[0.06] px-2 py-0.5 text-center font-mono text-xs text-fg">
                {key}
              </kbd>
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

function Shell() {
  const { layerId, itemId } = useParams<{ layerId: string; itemId: string }>()
  const navigate = useNavigate()
  const layerItems = allItems.filter(i => i.layer === layerId)
  const activeItem = allItems.find(item => item.id === itemId && item.layer === layerId)

  useThemeEffect()

  const { favorites, isFavorite, toggleFavorite } = useFavorites()
  const { recent, addRecent } = useRecent()

  const [showShortcuts, setShowShortcuts] = useState(false)

  // variant + config state lifted from ItemPanel so keyboard shortcuts can access them
  const [variant, setVariant] = useState(activeItem?.variants?.[0] ?? '')
  const [config, setConfigRaw] = useState<ItemConfig>(activeItem?.defaultConfig ?? {})

  const setConfig = useCallback((key: string, val: unknown) => {
    setConfigRaw(prev => ({ ...prev, [key]: val }))
  }, [])

  const resetConfig = useCallback(() => {
    setConfigRaw(activeItem?.defaultConfig ?? {})
    setVariant(activeItem?.variants?.[0] ?? '')
  }, [activeItem])

  // reset variant + config when active item changes
  useEffect(() => {
    if (activeItem !== undefined) {
      setVariant(activeItem.variants?.[0] ?? '')
      setConfigRaw(activeItem.defaultConfig ?? {})
    }
  }, [activeItem?.id]) // eslint-disable-line react-hooks/exhaustive-deps

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

      // `/` focuses search input
      if (e.key === '/' && !isInput) {
        e.preventDefault()
        const searchInput = document.querySelector<HTMLInputElement>('.dc-search-input')
        if (searchInput !== null) searchInput.focus()
        return
      }

      // `?` toggles shortcuts modal
      if (e.key === '?' && !isInput) {
        e.preventDefault()
        setShowShortcuts(v => !v)
        return
      }

      // `f` toggles favorite for current item
      if (e.key === 'f' && !isInput) {
        e.preventDefault()
        if (itemId !== undefined) toggleFavorite(itemId)
        return
      }

      // `d` toggles dark/light mode
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

      // `[` / `]` navigate between layers
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

      // remaining shortcuts require non-input context
      if (isInput) return

      const variants = activeItem?.variants

      // `ArrowLeft` / `ArrowRight` cycle variants
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

      // `Escape` resets variant to first + closes shortcuts modal
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
  }, [activeItem, itemId, layerId, variant, showShortcuts, navigate, toggleFavorite])

  const validLayer = layers.some(l => l.id === layerId)

  if (layerId !== undefined && !validLayer) {
    return <Navigate to={`/${layers[0]?.id ?? 'l-dep'}`} replace />
  }

  if (layerId !== undefined && itemId === undefined && layerItems.length > 0) {
    return <Navigate to={`/${layerId}/${layerItems[0].id}`} replace />
  }

  const stageProps = { config, setConfig, variant }
  const controlsProps = { config, setConfig, variant, setVariant, resetConfig }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-bg">
      {/* theme toolbar */}
      <ThemeToolbar />

      <div className="flex flex-1 overflow-hidden">
        <Nav
          items={allItems}
          favorites={favorites}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          recent={recent}
        />
        {activeItem !== undefined
          ? <ItemPanel
              key={activeItem.id}
              item={activeItem}
              stageProps={stageProps}
              controlsProps={controlsProps}
            />
          : <main className="flex flex-1 items-center justify-center text-fg/40">
              <div className="text-center">
                <p className="text-2xl font-semibold">404</p>
                <p className="mt-2 text-sm">component not found</p>
              </div>
            </main>
        }
      </div>
      <StatusBar
        item={activeItem}
        totalCount={allItems.length}
        layerCount={layerItems.length}
        variant={variant}
        variants={activeItem?.variants}
        onVariantChange={setVariant}
      />

      {showShortcuts && (
        <ShortcutsModal onClose={() => setShowShortcuts(false)} />
      )}
    </div>
  )
}

type ItemPanelProps = {
  item: (typeof allItems)[number]
  stageProps: {
    config: ItemConfig
    setConfig: (key: string, val: unknown) => void
    variant: string
  }
  controlsProps: {
    config: ItemConfig
    setConfig: (key: string, val: unknown) => void
    variant: string
    setVariant: (v: string) => void
    resetConfig: () => void
  }
}

function ItemPanel({ item, stageProps, controlsProps }: ItemPanelProps) {
  return (
    <>
      <main className="flex-1 overflow-hidden">
        <Stage item={item} stageProps={stageProps} />
      </main>
      <aside className="w-[560px] shrink-0 overflow-hidden border-l border-border bg-bg-secondary">
        <Inspector item={item} stageProps={stageProps} controlsProps={controlsProps} />
      </aside>
    </>
  )
}

export function App() {
  return (
    <Routes>
      <Route path="/:layerId/:itemId" element={<Shell />} />
      <Route path="/:layerId" element={<Shell />} />
      <Route path="*" element={<Navigate to={`/${layers[0]?.id ?? 'l-dep'}`} replace />} />
    </Routes>
  )
}
