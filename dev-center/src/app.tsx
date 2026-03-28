import { useCallback, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router'

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

import type { DevCenterItem, ItemConfig } from './types'

// shortcuts
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
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="rounded-lg border border-border bg-surface/80 backdrop-blur-2xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 text-sm font-semibold text-fg">Keyboard Shortcuts</div>
        <div className="space-y-2">
          {shortcutEntries.map(([key, desc]) => (
            <div className="flex items-center gap-4" key={key}>
              <Kbd className="w-16 text-center">{key}</Kbd>
              <span className="text-xs text-fg-muted/60">{desc}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button className="text-xs text-fg-muted/30 hover:text-fg-muted/60 transition-colors" onClick={onClose}>
            Press ? or Escape to close
          </button>
        </div>
      </div>
    </div>
  )
}

// each item is a full page — route change = remount = clean state
function ItemPage({ item }: { item: DevCenterItem }) {
  const navigate = useNavigate()
  const layerItems = allItems.filter(i => i.layer === item.layer)

  useThemeEffect()

  const { favorites, isFavorite, toggleFavorite } = useFavorites()
  const { recent, addRecent } = useRecent()
  const [showShortcuts, setShowShortcuts] = useState(false)

  const [variant, setVariant] = useState(item.variants?.[0] ?? '')
  const [config, setConfigRaw] = useState<ItemConfig>(item.defaultConfig ?? {})

  const setConfig = useCallback((key: string, val: unknown) => {
    setConfigRaw(prev => ({ ...prev, [key]: val }))
  }, [])

  const resetConfig = useCallback(() => {
    setConfigRaw(item.defaultConfig ?? {})
    setVariant(item.variants?.[0] ?? '')
  }, [item])

  useEffect(() => { addRecent(item.id) }, [item.id, addRecent])

  // keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      const isInput = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT'

      if (e.key === '/' && !isInput) { e.preventDefault(); document.querySelector<HTMLInputElement>('.dc-search-input')?.focus(); return }
      if (e.key === '?' && !isInput) { e.preventDefault(); setShowShortcuts(v => !v); return }
      if (e.key === 'f' && !isInput) { e.preventDefault(); toggleFavorite(item.id); return }
      if (e.key === 'd' && !isInput) {
        e.preventDefault()
        const el = document.documentElement
        el.setAttribute('data-theme', el.getAttribute('data-theme') === 'light' ? 'dark' : 'light')
        return
      }

      if ((e.key === '[' || e.key === ']') && !isInput) {
        e.preventDefault()
        const idx = layers.findIndex(l => l.id === item.layer)
        if (idx < 0) return
        const next = e.key === '[' ? Math.max(0, idx - 1) : Math.min(layers.length - 1, idx + 1)
        if (next !== idx) {
          const layer = layers[next]
          const first = allItems.find(i => i.layer === layer.id)
          navigate(first !== undefined ? `/${layer.id}/${first.id}` : `/${layer.id}`)
        }
        return
      }

      if (isInput) return
      const variants = item.variants

      if (e.key === 'ArrowLeft' && variants !== undefined && variants.length > 1) {
        e.preventDefault()
        const vi = variants.indexOf(variant)
        setVariant(variants[vi > 0 ? vi - 1 : variants.length - 1])
      }
      if (e.key === 'ArrowRight' && variants !== undefined && variants.length > 1) {
        e.preventDefault()
        const vi = variants.indexOf(variant)
        setVariant(variants[vi < variants.length - 1 ? vi + 1 : 0])
      }
      if (e.key === 'Escape') {
        if (showShortcuts) { setShowShortcuts(false); return }
        if (variants !== undefined && variants.length > 0) setVariant(variants[0])
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [item, variant, showShortcuts, navigate, toggleFavorite])

  const stageProps = { config, setConfig, variant }
  const controlsProps = { config, setConfig, variant, setVariant, resetConfig }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-bg">
      <ThemeToolbar />
      <div className="flex flex-1 overflow-hidden">
        <Nav items={allItems} favorites={favorites} isFavorite={isFavorite} toggleFavorite={toggleFavorite} recent={recent} />
        <main className="flex-1 overflow-hidden">
          <Stage item={item} stageProps={stageProps} />
        </main>
        <aside className="w-[560px] shrink-0 overflow-hidden border-l border-border bg-bg-secondary/60 backdrop-blur-xl">
          <Inspector item={item} stageProps={stageProps} controlsProps={controlsProps} />
        </aside>
      </div>
      <StatusBar
        item={item}
        totalCount={allItems.length}
        layerCount={layerItems.length}
        variant={variant}
        variants={item.variants}
        onVariantChange={setVariant}
      />
      {showShortcuts && <ShortcutsModal onClose={() => setShowShortcuts(false)} />}
    </div>
  )
}

// every item registered as an explicit route — no wildcards, no dynamic params
export function App() {
  const firstItem = allItems[0]

  return (
    <Routes>
      {allItems.map(item => (
        <Route
          key={`${item.layer}/${item.id}`}
          path={`/${item.layer}/${item.id}`}
          element={<ItemPage item={item} />}
        />
      ))}

      {layers.map(layer => {
        const first = allItems.find(i => i.layer === layer.id)
        return (
          <Route
            key={layer.id}
            path={`/${layer.id}`}
            element={first !== undefined ? <Navigate to={`/${layer.id}/${first.id}`} replace /> : <Navigate to="/" replace />}
          />
        )
      })}

      <Route path="/" element={<Navigate to={firstItem !== undefined ? `/${firstItem.layer}/${firstItem.id}` : '/l-docs'} replace />} />
    </Routes>
  )
}
