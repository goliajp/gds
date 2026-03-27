import { layers } from './nav'

import type { DevCenterItem } from '../types'

type StatusBarProps = {
  item: DevCenterItem | undefined
  totalCount: number
  layerCount: number
}

export function StatusBar({ item, totalCount, layerCount }: StatusBarProps) {
  const meta = item !== undefined ? layers.find(l => l.id === item.layer) : undefined

  return (
    <footer className="dc-status-bar flex h-6 shrink-0 items-center justify-between px-3 text-xs text-fg-muted/35">
      {/* left — breadcrumb */}
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
          </>
        ) : (
          <span>GDS Dev Center</span>
        )}
      </div>

      {/* right — meta */}
      <div className="flex items-center gap-3">
        {item !== undefined && (
          <span className={item.type === 'interactive' ? 'text-accent/50' : ''}>
            {item.type}
          </span>
        )}
        {meta !== undefined && (
          <span>{layerCount} in layer</span>
        )}
        <span>{totalCount} total</span>
      </div>
    </footer>
  )
}
