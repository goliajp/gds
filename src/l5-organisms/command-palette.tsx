// command-palette — searchable command launcher overlay
import type { ReactNode } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { cx } from '../utils/cx'
import { useEscapeKey, useScrollLock } from '../utils/hooks'
import { CommandPaletteList } from './command-palette-list'

export type CommandItem = {
  id: string
  label: string
  icon?: ReactNode
  shortcut?: string
  group?: string
}

export type CommandPaletteProps = {
  open: boolean
  onClose: () => void
  items: CommandItem[]
  onSelect: (id: string) => void
  placeholder?: string
  className?: string
}

export function CommandPalette({
  open,
  onClose,
  items,
  onSelect,
  placeholder = 'Search components, patterns, tokens...',
  className,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useScrollLock(open)
  useEscapeKey(open, onClose)

  // reset + focus on open
  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  const filtered = useMemo(() => {
    if (query === '') return items
    const lower = query.toLowerCase()
    return items.filter((item) => item.label.toLowerCase().includes(lower))
  }, [items, query])

  // group items
  const groups = useMemo(() => {
    const map = new Map<string, CommandItem[]>()
    for (const item of filtered) {
      const group = item.group ?? ''
      const list = map.get(group)
      if (list !== undefined) {
        list.push(item)
      } else {
        map.set(group, [item])
      }
    }
    return map
  }, [filtered])

  // scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector('[data-active="true"]')
    if (el !== null && el !== undefined) {
      el.scrollIntoView({ block: 'nearest' })
    }
  }, [activeIndex])

  const handleSelect = useCallback((id: string) => {
    onSelect(id)
    onClose()
  }, [onSelect, onClose])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((prev) => (prev + 1) % Math.max(filtered.length, 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) => (prev - 1 + filtered.length) % Math.max(filtered.length, 1))
    } else if (e.key === 'Enter' && filtered[activeIndex] !== undefined) {
      e.preventDefault()
      handleSelect(filtered[activeIndex].id)
    }
  }, [filtered, activeIndex, handleSelect])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-[15vh]"
      data-component="command-palette"
      data-state="open"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      onKeyDown={handleKeyDown}
    >
      <div
        className={cx(
          'w-full max-w-xl animate-scale-in rounded-xl border border-white/[0.06] bg-bg-secondary shadow-2xl',
          className,
        )}
      >
        {/* search bar */}
        <div className="flex items-center gap-3 border-b border-white/[0.06] px-4">
          <svg className="h-4 w-4 shrink-0 text-fg-muted/40" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIndex(0) }}
            placeholder={placeholder}
            className="flex-1 bg-transparent py-3.5 text-sm text-fg placeholder:text-fg-muted/30 outline-none"
          />
          <kbd className="shrink-0 rounded border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-medium text-fg-muted/40">
            ESC
          </kbd>
        </div>

        {/* results */}
        <div ref={listRef} className="max-h-80 overflow-y-auto p-1.5">
          <CommandPaletteList
            groups={groups}
            activeIndex={activeIndex}
            filteredCount={filtered.length}
            onSelect={handleSelect}
          />
        </div>

        {/* footer hints */}
        <div className="flex items-center justify-between border-t border-white/[0.06] px-4 py-2 text-[10px] text-fg-muted/25">
          <div className="flex items-center gap-3">
            <span>↑↓ navigate</span>
            <span>↵ select</span>
            <span>esc close</span>
          </div>
          <span>{items.length} commands</span>
        </div>
      </div>
    </div>,
    document.body,
  )
}
