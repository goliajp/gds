import { layers } from './nav'

import type { DevCenterItem } from '../types'

type StatusBarProps = {
  item: DevCenterItem | undefined
  totalCount: number
  layerCount: number
  variant?: string
  variants?: string[]
  onVariantChange?: (v: string) => void
  favorites?: string[]
  isFavorite?: (id: string) => boolean
  recent?: string[]
}

export function StatusBar({
  item,
  totalCount,
  layerCount,
  variant,
  variants,
  onVariantChange,
  favorites: _favorites,
  isFavorite: _isFavorite,
  recent: _recent,
}: StatusBarProps) {
  const meta = item !== undefined ? layers.find(l => l.id === item.layer) : undefined

  return (
    <footer className="dc-status-bar flex h-6 shrink-0 items-center justify-between px-3 text-xs text-fg-muted/35">
      {/* left — breadcrumb + variant pills */}
      <div className="flex items-center gap-1.5">
        {item !== undefined ? (
          <>
            {meta !== undefined && (
              <span style={{ color: meta.color }} className="font-medium">
                {meta.shortLabel}
              </span>
            )}
            <span className="text-fg-muted/20">/</span>
            <span className="text-fg-muted/50">{item.label}</span>

            {/* variant pills */}
            {variants !== undefined && variants.length > 0 && (
              <>
                <span className="text-fg-muted/20 ml-1">|</span>
                <div className="flex items-center gap-1 ml-0.5">
                  {variants.map(v => {
                    const isActive = v === (variant ?? variants[0])
                    return (
                      <button
                        key={v}
                        type="button"
                        onClick={() => onVariantChange?.(v)}
                        className={
                          isActive
                            ? 'rounded px-1.5 py-0.5 text-xs font-medium text-accent bg-accent/15'
                            : 'rounded px-1.5 py-0.5 text-xs text-fg-muted/40 hover:text-fg-muted/60 hover:bg-fg-muted/5'
                        }
                      >
                        {v}
                      </button>
                    )
                  })}
                </div>
              </>
            )}
          </>
        ) : (
          <span>GDS Dev Center</span>
        )}
      </div>

      {/* right — type badge + meta + keyboard hints */}
      <div className="flex items-center gap-3">
        {item !== undefined && (
          <span
            className={
              item.type === 'interactive'
                ? 'rounded px-1.5 py-0.5 text-xs font-medium text-success bg-success/10'
                : 'rounded px-1.5 py-0.5 text-xs font-medium text-accent bg-accent/10'
            }
          >
            {item.type}
          </span>
        )}
        {meta !== undefined && (
          <span>{layerCount} in layer</span>
        )}
        <span>{totalCount} total</span>

        {/* keyboard hints */}
        <div className="flex items-center gap-1.5 text-fg-muted/20">
          <span>↑↓ navigate</span>
          {variants !== undefined && variants.length > 1 && (
            <span>←→ variants</span>
          )}
        </div>
      </div>
    </footer>
  )
}
