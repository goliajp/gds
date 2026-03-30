// command-palette — searchable command launcher overlay
import type { ReactNode } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { cx } from '../utils/cx'
import { useEscapeKey, useScrollLock } from '../utils/hooks'
import { renderPortal } from '../utils/portal'
import { CommandPaletteList } from './command-palette-list'

export type CommandItem = {
  id: string
  label: string
  icon?: ReactNode
  shortcut?: string
  group?: string
  description?: string
  disabled?: boolean
  action?: () => void
}

export type CommandPaletteProps = {
  open: boolean
  onClose: () => void
  items: CommandItem[]
  onSelect: (id: string) => void
  placeholder?: string
  className?: string
  // v2: fuzzy search
  fuzzy?: boolean
  maxResults?: number
  // v2: recent history
  recentItems?: CommandItem[]
  maxRecent?: number
  onExecute?: (id: string) => void
}

// fuzzy match scoring: consecutive chars score higher than scattered
function fuzzyScore(label: string, query: string): number {
  const lower = label.toLowerCase()
  const q = query.toLowerCase()
  let score = 0
  let queryIdx = 0
  let consecutive = 0
  let firstMatchBonus = 0

  for (let i = 0; i < lower.length && queryIdx < q.length; i++) {
    if (lower[i] === q[queryIdx]) {
      if (queryIdx === 0 && i === 0) firstMatchBonus = 10
      consecutive++
      score += consecutive * 2 // reward consecutive matches
      queryIdx++
    } else {
      consecutive = 0
    }
  }
  if (queryIdx < q.length) return -1 // not all query chars matched
  return score + firstMatchBonus
}

export function fuzzyMatchIndices(label: string, query: string): number[] {
  const lower = label.toLowerCase()
  const q = query.toLowerCase()
  const indices: number[] = []
  let queryIdx = 0
  for (let i = 0; i < lower.length && queryIdx < q.length; i++) {
    if (lower[i] === q[queryIdx]) {
      indices.push(i)
      queryIdx++
    }
  }
  return indices
}

export function CommandPalette({
  open,
  onClose,
  items,
  onSelect,
  placeholder = 'Search components, patterns, tokens...',
  className,
  fuzzy = true,
  maxResults = 50,
  recentItems,
  maxRecent = 5,
  onExecute,
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
    // show recent items when query is empty
    if (query === '') {
      if (recentItems !== undefined && recentItems.length > 0) {
        const recents = recentItems.slice(0, maxRecent).map(r => ({ ...r, group: 'Recent' }))
        return [...recents, ...items]
      }
      return items
    }

    if (fuzzy) {
      // fuzzy scoring — rank by match quality
      const scored = items
        .map(item => ({ item, score: fuzzyScore(item.label, query) }))
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
      return scored.slice(0, maxResults).map(({ item }) => item)
    }

    // fallback: substring match
    const lower = query.toLowerCase()
    return items.filter((item) => item.label.toLowerCase().includes(lower)).slice(0, maxResults)
  }, [items, query, fuzzy, maxResults, recentItems, maxRecent])

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
    // fire action if item has one
    const item = filtered.find(i => i.id === id)
    if (item?.disabled) return
    if (item?.action !== undefined) {
      item.action()
    }
    onSelect(id)
    if (onExecute !== undefined) onExecute(id)
    onClose()
  }, [onSelect, onClose, onExecute, filtered])

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

  return renderPortal(
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
            query={query}
            fuzzy={fuzzy}
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
  )
}
