// command-palette-list — grouped results list (internal)
import type { CommandItem } from './command-palette'

import { cx } from '../utils/cx'

type CommandPaletteListProps = {
  groups: Map<string, CommandItem[]>
  activeIndex: number
  filteredCount: number
  onSelect: (id: string) => void
}

function CommandPaletteList({
  groups,
  activeIndex,
  filteredCount,
  onSelect,
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
                <span className="flex-1 truncate">{item.label}</span>
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
