import { layers } from './nav'

import type { DevCenterItem, StageProps } from '../types'

type StageComponentProps = {
  item: DevCenterItem | undefined
  stageProps: StageProps
}

export function Stage({ item, stageProps }: StageComponentProps) {
  if (item === undefined) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="text-sm text-fg-muted/30">Select an item from the sidebar</div>
          <div className="mt-1 text-xs text-fg-muted/15">↑↓ to navigate</div>
        </div>
      </div>
    )
  }

  const meta = layers.find(l => l.id === item.layer)

  // call stage — supports both simple and rich signatures
  const stageContent = item.stage.length > 0
    ? (item.stage as (props: StageProps) => React.ReactNode)(stageProps)
    : (item.stage as () => React.ReactNode)()

  return (
    <div className="dc-stage flex h-full flex-col overflow-hidden">
      {/* header */}
      <div
        className="shrink-0 flex items-center border-b border-white/[0.06]"
        style={{ padding: 'var(--gds-pad-y, 6px) var(--gds-pad-x-lg, 16px)', gap: 'var(--gds-gap, 8px)' }}
      >
        <h1 className="text-sm font-semibold text-fg">{item.label}</h1>
        {meta !== undefined && (
          <span
            className="inline-flex rounded px-1.5 py-0.5 text-xs font-bold tracking-wider"
            style={{
              color: meta.color,
              background: `color-mix(in srgb, ${meta.color} 12%, transparent)`,
            }}
          >
            {meta.shortLabel}
          </span>
        )}
        {item.tags !== undefined && item.tags.length > 0 && (
          <div className="flex items-center gap-1 ml-auto">
            {item.tags.map(tag => (
              <span key={tag} className="rounded px-1.5 py-0.5 text-xs text-fg-muted/30 bg-fg-muted/5">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* content */}
      <div className="flex-1 overflow-y-auto" style={{ padding: 'var(--gds-pad-x-lg, 16px)' }}>
        {stageContent}
      </div>
    </div>
  )
}
