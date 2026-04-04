// command-menu — inline command menu with search and keyboard navigation
import type { ReactNode } from 'react'
import { useCallback, useMemo, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { isActivationKey } from '../utils/dom'
import { glassClass } from '../utils/glass'

export type CommandMenuItem = {
  id: string
  label: string
  icon?: ReactNode
  shortcut?: string
  group?: string
  danger?: boolean
}

export type CommandMenuProps = {
  items: CommandMenuItem[]
  onSelect: (id: string) => void
  searchable?: boolean
  placeholder?: string
  glass?: boolean
  className?: string
}

export function CommandMenu({
  items,
  onSelect,
  searchable = true,
  placeholder = 'Type a command...',
  glass,
  className,
}: CommandMenuProps) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const filtered = useMemo(() => {
    if (query === '') return items
    const q = query.toLowerCase()
    return items.filter((it) => it.label.toLowerCase().includes(q))
  }, [items, query])

  const groups = useMemo(() => {
    const map = new Map<string, CommandMenuItem[]>()
    for (const it of filtered) {
      const g = it.group ?? ''
      const arr = map.get(g)
      if (arr !== undefined) {
        arr.push(it)
      } else {
        map.set(g, [it])
      }
    }
    return map
  }, [filtered])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((p) => (p + 1) % filtered.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((p) => (p - 1 + filtered.length) % filtered.length)
      } else if (isActivationKey(e)) {
        e.preventDefault()
        const it = filtered[activeIndex]
        if (it !== undefined) {
          onSelect(it.id)
        }
      }
    },
    [filtered, activeIndex, onSelect]
  )

  let flatIdx = -1
  const glassCx =
    glass !== undefined && glass !== false
      ? cx('border-white/10 bg-bg/60', glassClass(glass))
      : ''

  return (
    <div
      className={cx(
        'gds-radius-card border-border overflow-hidden border',
        glassCx,
        className
      )}
      data-component="command-menu"
      onKeyDown={handleKeyDown}
    >
      {searchable && (
        <div className="border-border border-b">
          <input
            type="text"
            data-testid="command-menu-search"
            placeholder={placeholder}
            className={cx(
              'gds-pad-x gds-pad-y text-fg placeholder:text-fg-muted/40 w-full bg-transparent text-sm outline-none',
              focusCls
            )}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActiveIndex(0)
            }}
          />
        </div>
      )}
      <div className="gds-pad-y-sm max-h-64 overflow-y-auto">
        {filtered.length === 0 && (
          <div className="text-fg-muted/40 py-6 text-center text-sm">
            No results
          </div>
        )}
        {Array.from(groups.entries()).map(([group, gItems]) => (
          <div key={group}>
            {group !== '' && (
              <div className="text-fg-muted/30 px-3 pt-3 pb-1 text-[10px] font-semibold tracking-[0.1em] uppercase">
                {group}
              </div>
            )}
            {gItems.map((it) => {
              flatIdx++
              const active = flatIdx === activeIndex
              return (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => onSelect(it.id)}
                  data-active={active}
                  data-testid={`command-menu-item-${it.id}`}
                  className={cx(
                    'gds-text-body flex w-full items-center gap-3 px-3 py-2 text-left transition-colors select-none',
                    active ? 'bg-accent/10 text-accent' : '',
                    it.danger === true
                      ? 'text-danger'
                      : active
                        ? ''
                        : 'text-fg hover:bg-white/[0.04]'
                  )}
                >
                  {it.icon !== undefined && (
                    <span className="text-fg-muted/50 flex h-5 w-5 shrink-0 items-center justify-center">
                      {it.icon}
                    </span>
                  )}
                  <span className="flex-1 truncate">{it.label}</span>
                  {it.shortcut !== undefined && (
                    <kbd className="text-fg-muted/30 shrink-0 rounded border border-white/[0.06] bg-white/[0.03] px-1.5 py-px text-[10px]">
                      {it.shortcut}
                    </kbd>
                  )}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
