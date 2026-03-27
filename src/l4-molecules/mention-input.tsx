// mention-input — text input with @mention suggestion dropdown
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import type { MentionSuggestion } from './mention-list'
import { MentionList } from './mention-list'

export type MentionInputProps = {
  value: string
  onChange: (value: string) => void
  suggestions: MentionSuggestion[]
  trigger?: string
  placeholder?: string
  disabled?: boolean
  className?: string
}

export const MentionInput = forwardRef<HTMLInputElement, MentionInputProps>(
  function MentionInput({ value, onChange, suggestions, trigger = '@', placeholder, disabled, className }, ref) {
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [query, setQuery] = useState('')
    const [highlightedIndex, setHighlightedIndex] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    const filtered = suggestions.filter((s) =>
      s.label.toLowerCase().includes(query.toLowerCase()),
    )

    // find the trigger position in the current value
    const findTriggerPosition = useCallback((text: string): number => {
      const lastTrigger = text.lastIndexOf(trigger)
      if (lastTrigger < 0) return -1
      if (lastTrigger > 0 && text[lastTrigger - 1] !== ' ') return -1
      const afterTrigger = text.slice(lastTrigger + trigger.length)
      if (afterTrigger.includes(' ')) return -1
      return lastTrigger
    }, [trigger])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      onChange(newValue)

      const triggerPos = findTriggerPosition(newValue)
      if (triggerPos >= 0) {
        const q = newValue.slice(triggerPos + trigger.length)
        setQuery(q)
        setShowSuggestions(true)
        setHighlightedIndex(0)
      } else {
        setShowSuggestions(false)
        setQuery('')
      }
    }, [onChange, findTriggerPosition, trigger])

    const selectSuggestion = useCallback((suggestion: MentionSuggestion) => {
      const triggerPos = findTriggerPosition(value)
      if (triggerPos < 0) return
      const before = value.slice(0, triggerPos)
      const after = `${trigger}${suggestion.label} `
      onChange(before + after)
      setShowSuggestions(false)
      setQuery('')
    }, [value, onChange, findTriggerPosition, trigger])

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (!showSuggestions) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHighlightedIndex((prev) => {
          if (prev >= filtered.length - 1) return 0
          return prev + 1
        })
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHighlightedIndex((prev) => {
          if (prev <= 0) return filtered.length - 1
          return prev - 1
        })
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filtered.length > 0) {
          selectSuggestion(filtered[highlightedIndex])
        }
      } else if (e.key === 'Escape') {
        e.preventDefault()
        setShowSuggestions(false)
      }
    }, [showSuggestions, filtered, highlightedIndex, selectSuggestion])

    // close on click outside
    useEffect(() => {
      if (!showSuggestions) return

      function handleClickOutside(e: MouseEvent) {
        if (containerRef.current !== null && !containerRef.current.contains(e.target as Node)) {
          setShowSuggestions(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [showSuggestions])

    return (
      <div ref={containerRef} className="relative" data-component="mention-input">
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={cx(
            'w-full gds-radius-button border border-border bg-bg-secondary px-3 py-2 text-sm text-fg',
            'placeholder:text-fg-muted/50',
            disabled === true && 'pointer-events-none opacity-50',
            focusCls,
            className,
          )}
        />
        {showSuggestions && filtered.length > 0 && (
          <MentionList
            filtered={filtered}
            highlightedIndex={highlightedIndex}
            onSelect={selectSuggestion}
            trigger={trigger}
          />
        )}
      </div>
    )
  },
)
