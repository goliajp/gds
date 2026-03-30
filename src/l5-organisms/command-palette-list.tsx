// command-palette-list — grouped results list (internal)
import type { ReactNode } from 'react'

import { cx } from '../utils/cx'
import type { CommandItem } from './command-palette'
import { fuzzyMatchIndices } from './command-palette'

type CommandPaletteListProps = {
  groups: Map<string, CommandItem[]>
  activeIndex: number
  filteredCount: number
  onSelect: (id: string) => void
  query?: string
  fuzzy?: boolean
}

function highlightLabel(label: string, query: string, fuzzy: boolean): ReactNode {
  if (query === '') return label
  if (fuzzy) {
    const indices = new Set(fuzzyMatchIndices(label, query))
    if (indices.size === 0) return label
    return (
      <>
        {label.split('').map((char, i) => {
          if (indices.has(i)) {
            return <span key={i} className="font-semibold text-accent">{char}</span>
          }
          return char
        })}
      </>
    )
  }
  // substring highlight
  const lower = label.toLowerCase()
  const idx = lower.indexOf(query.toLowerCase())
  if (idx < 0) return label
  return (
    <>
      {label.slice(0, idx)}
      <span className="font-semibold text-accent">{label.slice(idx, idx + query.length)}</span>
      {label.slice(idx + query.length)}
    </>
  )
}

function CommandPaletteList({
  groups,
  activeIndex,
  filteredCount,
  onSelect,
  query = '',
  fuzzy = true,
}: CommandPaletteListProps) {
  let flatIndex = -1

  if (filteredCount === 0) {
    return (
      <div className="py-8 text-center text-sm text-fg-muted/40">No results found</div>
    )
  }

  return (
    <>
      {Array.from(groups.entries()).map(([group, groupItems]) => (
        <div key={group}>
          {group !== '' && (
            <div className="px-3 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">
              {group}
            </div>
          )}
          {groupItems.map((item) => {
            flatIndex++
            const isActive = flatIndex === activeIndex
            return (
              <button
                key={item.id}
                className={cx(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[13px] transition-colors select-none',
                  isActive ? 'bg-accent/15 text-accent' : 'text-fg hover:bg-white/[0.04]',
                )}
                onClick={() => onSelect(item.id)}
                data-active={isActive}
              >
                {item.icon !== undefined && (
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center text-fg-muted/50">{item.icon}</span>
                )}
                <span className="flex-1 truncate">{highlightLabel(item.label, query, fuzzy)}</span>
                {item.group !== undefined && (
                  <span className="shrink-0 text-[11px] text-fg-muted/25">{item.group}</span>
                )}
                {item.shortcut !== undefined && (
                  <kbd className="shrink-0 rounded border border-white/[0.06] bg-white/[0.03] px-1.5 py-px text-[10px] text-fg-muted/30">
                    {item.shortcut}
                  </kbd>
                )}
              </button>
            )
          })}
        </div>
      ))}
    </>
  )
}

export { CommandPaletteList }
export type { CommandPaletteListProps }
