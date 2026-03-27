import { useCallback, useState } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router'

import { useThemeEffect } from '@gds/l1-systems/use-theme'

import { Inspector } from './components/inspector'
import { Nav, layers } from './components/nav'
import { Stage } from './components/stage'
import { StatusBar } from './components/status-bar'
import { ThemeToolbar } from './components/theme-toolbar'
import { allItems } from './registry'

import type { ItemConfig } from './types'

function Shell() {
  const { layerId, itemId } = useParams<{ layerId: string; itemId: string }>()
  const layerItems = allItems.filter(i => i.layer === layerId)
  const activeItem = allItems.find(item => item.id === itemId && item.layer === layerId)

  useThemeEffect()

  const validLayer = layers.some(l => l.id === layerId)

  if (layerId !== undefined && !validLayer) {
    return <Navigate to={`/${layers[0]?.id ?? 'l-dep'}`} replace />
  }

  if (layerId !== undefined && itemId === undefined && layerItems.length > 0) {
    return <Navigate to={`/${layerId}/${layerItems[0].id}`} replace />
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-bg">
      {/* theme toolbar */}
      <ThemeToolbar />

      <div className="flex flex-1 overflow-hidden">
        <Nav items={allItems} />
        {activeItem !== undefined
          ? <ItemPanel key={activeItem.id} item={activeItem} />
          : <main className="flex flex-1 items-center justify-center text-fg/40">
              <div className="text-center">
                <p className="text-2xl font-semibold">404</p>
                <p className="mt-2 text-sm">component not found</p>
              </div>
            </main>
        }
      </div>
      <StatusBar item={activeItem} totalCount={allItems.length} layerCount={layerItems.length} />
    </div>
  )
}

function ItemPanel({ item }: { item: (typeof allItems)[number] }) {
  const [config, setConfigRaw] = useState<ItemConfig>(item.defaultConfig ?? {})
  const [variant, setVariant] = useState(item.variants?.[0] ?? '')
  const setConfig = useCallback((key: string, val: any) => {
    setConfigRaw(prev => ({ ...prev, [key]: val }))
  }, [])
  const stageProps = { config, setConfig, variant }
  const controlsProps = { config, setConfig, variant, setVariant }

  return (
    <>
      <main className="flex-1 overflow-hidden">
        <Stage item={item} stageProps={stageProps} />
      </main>
      <aside className="w-[480px] shrink-0 overflow-hidden border-l border-white/[0.06] bg-white/[0.03]">
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
