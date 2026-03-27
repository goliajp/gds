import type { RefObject } from 'react'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'

import type { DevCenterItem, LayerMeta } from '../types'

export const layers: LayerMeta[] = [
  { id: 'l-docs', label: 'Guides', shortLabel: 'DOC', description: 'Architecture & best practices', color: 'var(--gds-accent)' },
  { id: 'l-lab', label: 'Lab', shortLabel: 'LAB', description: 'Glass & motion experiments', color: 'var(--gds-warning)' },
  { id: 'l-dep', label: 'Dependencies', shortLabel: 'DEP', description: 'External deps & utilities', color: 'var(--gds-fg-muted)' },
  { id: 'l0', label: 'Tokens', shortLabel: 'L0', description: 'CSS variables, scales', color: 'var(--gds-accent)' },
  { id: 'l1', label: 'Systems', shortLabel: 'L1', description: 'Theme engine, state', color: 'var(--gds-success)' },
  { id: 'l2', label: 'Primitives', shortLabel: 'L2', description: 'Stateless blocks', color: 'var(--gds-warning)' },
  { id: 'l3', label: 'Atoms', shortLabel: 'L3', description: 'Simple elements', color: 'var(--gds-palette-0)' },
  { id: 'l4', label: 'Molecules', shortLabel: 'L4', description: 'Multi-part, stateful', color: 'var(--gds-palette-1)' },
  { id: 'l5', label: 'Organisms', shortLabel: 'L5', description: 'Complex features', color: 'var(--gds-palette-2)' },
  { id: 'l6', label: 'Charts', shortLabel: 'L6', description: 'Data visualization', color: 'var(--gds-palette-3)' },
  { id: 'l7', label: 'Patterns', shortLabel: 'L7', description: 'Page layouts', color: 'var(--gds-palette-4)' },
]

// weighted search scoring
function scoreItem(item: DevCenterItem, q: string): number {
  const label = item.label.toLowerCase()
  if (label === q) return 100
  if (label.startsWith(q)) return 80
  if (label.includes(q)) return 60
  if (item.id.includes(q)) return 50
  if (item.tags?.some(t => t.toLowerCase().includes(q))) return 40
  const layerMeta = layers.find(l => l.id === item.layer)
  if (layerMeta !== undefined && layerMeta.label.toLowerCase().includes(q)) return 20
  return 0
}

type NavProps = {
  items: DevCenterItem[]
  searchRef?: RefObject<HTMLInputElement | null>
  favorites?: string[]
  isFavorite?: (id: string) => boolean
  toggleFavorite?: (id: string) => void
  onToggleFavorite?: (id: string) => void
  recent?: string[]
}

export function Nav({ items, searchRef, favorites = [], isFavorite, toggleFavorite, onToggleFavorite, recent = [] }: NavProps) {
  const { layerId, itemId } = useParams<{ layerId: string; itemId: string }>()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const isSearchActive = search.trim() !== ''

  const layerItems = useMemo(() => items.filter(i => i.layer === layerId), [items, layerId])
  const activeMeta = layers.find(l => l.id === layerId)

  // when search is active, score and sort across ALL layers
  const filteredItems = useMemo(() => {
    if (!isSearchActive) return layerItems
    const q = search.toLowerCase().trim()
    return items
      .map(item => ({ item, score: scoreItem(item, q) }))
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(r => r.item)
  }, [items, layerItems, search, isSearchActive])

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites],
  )

  // keyboard arrow-up/down to navigate items
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const tag = (e.target as HTMLElement)?.tagName
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return
    if (filteredItems.length === 0) return
    e.preventDefault()

    const currentIdx = filteredItems.findIndex(i => i.id === itemId)
    let nextIdx: number
    if (e.key === 'ArrowDown') {
      nextIdx = currentIdx < filteredItems.length - 1 ? currentIdx + 1 : 0
    } else {
      nextIdx = currentIdx > 0 ? currentIdx - 1 : filteredItems.length - 1
    }
    const next = filteredItems[nextIdx]
    if (next !== undefined) {
      navigate(`/${next.layer}/${next.id}`)
    }
  }, [filteredItems, itemId, navigate])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // reset search when switching layers
  useEffect(() => { setSearch('') }, [layerId])

  return (
    <div className="flex h-full shrink-0">
      {/* column 1 — layer selector */}
      <div className="dc-layer-col flex w-16 shrink-0 flex-col items-center py-2 gap-0.5">
        {layers.map(layer => {
          const active = layer.id === layerId
          const count = items.filter(i => i.layer === layer.id).length
          const firstItem = items.find(i => i.layer === layer.id)
          const to = firstItem !== undefined ? `/${layer.id}/${firstItem.id}` : `/${layer.id}`
          return (
            <Link
              key={layer.id}
              to={to}
              className="dc-layer-link group relative flex flex-col items-center justify-center w-12 h-10 rounded-lg transition-all"
              data-active={active || undefined}
              title={`${layer.label} (${count})`}
            >
              <span
                className="text-xs font-bold tracking-wider transition-colors"
                style={{ color: active ? layer.color : undefined }}
              >
                {layer.shortLabel}
              </span>
              <span className="text-xs tabular-nums text-fg-muted/20 mt-px">
                {count}
              </span>
            </Link>
          )
        })}
      </div>

      {/* column 2 — item list */}
      <div className="dc-item-col flex w-[180px] shrink-0 flex-col overflow-hidden">
        {/* layer header */}
        {activeMeta !== undefined && !isSearchActive && (
          <div className="dc-item-header shrink-0 px-3 pt-3 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-fg">{activeMeta.label}</span>
              <span className="text-xs text-fg-muted/30 tabular-nums ml-auto">
                {filteredItems.length}
                {search !== '' && `/${layerItems.length}`}
              </span>
            </div>
            <div className="mt-0.5 text-xs text-fg-muted/25 leading-snug">
              {activeMeta.description}
            </div>
          </div>
        )}

        {/* search header when searching across all layers */}
        {isSearchActive && (
          <div className="dc-item-header shrink-0 px-3 pt-3 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-fg">All layers</span>
              <span className="text-xs text-fg-muted/30 tabular-nums ml-auto">
                {filteredItems.length}
              </span>
            </div>
            <div className="mt-0.5 text-xs text-fg-muted/25 leading-snug">
              Sorted by relevance
            </div>
          </div>
        )}

        {/* search */}
        <div className="shrink-0 px-2 pb-1.5">
          <div className="relative">
            <input
              ref={searchRef}
              type="text"
              placeholder="Filter..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="dc-search-input w-full rounded-md px-2.5 py-1.5 pr-10 text-xs outline-none placeholder:text-fg-muted/20"
            />
            <kbd className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded border border-fg-muted/10 bg-fg-muted/5 px-1 py-px text-[9px] text-fg-muted/20 pointer-events-none">
              /
            </kbd>
          </div>
        </div>

        {/* item list */}
        <nav className="flex-1 overflow-y-auto px-1.5 pb-2">
          {filteredItems.map(item => {
            const active = item.id === itemId
            const starred = isFavorite(item.id)
            const itemLayer = isSearchActive ? layers.find(l => l.id === item.layer) : undefined
            return (
              <Link
                key={item.id}
                to={`/${item.layer}/${item.id}`}
                className="dc-item-link group flex w-full items-center gap-1.5 rounded-md px-2.5 py-[5px] text-left transition-colors"
                data-active={active || undefined}
                ref={active ? (el) => { el?.scrollIntoView({ block: 'nearest' }) } : undefined}
              >
                {starred && (
                  <span className="text-[10px] text-warning/60 shrink-0 leading-none">&#11088;</span>
                )}
                <span className={[
                  'text-xs flex-1 truncate transition-colors',
                  active ? 'text-fg font-medium' : 'text-fg-muted/50 group-hover:text-fg-muted/70',
                ].join(' ')}>
                  {item.label}
                </span>
                {isSearchActive && itemLayer !== undefined && (
                  <span
                    className="text-[9px] tabular-nums shrink-0"
                    style={{ color: itemLayer.color, opacity: 0.5 }}
                  >
                    {itemLayer.shortLabel}
                  </span>
                )}
                {onToggleFavorite !== undefined && (
                  <button
                    className={[
                      'shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] leading-none p-0.5',
                      starred ? 'text-warning/60' : 'text-fg-muted/20 hover:text-warning/60',
                    ].join(' ')}
                    onClick={e => {
                      e.preventDefault()
                      e.stopPropagation()
                      onToggleFavorite(item.id)
                    }}
                    title={starred ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    {starred ? '\u2605' : '\u2606'}
                  </button>
                )}
              </Link>
            )
          })}
          {filteredItems.length === 0 && (
            <div className="px-2 py-8 text-xs text-fg-muted/15 text-center">
              {search !== '' ? 'No matches' : 'No items'}
            </div>
          )}
        </nav>
      </div>
    </div>
  )
}
