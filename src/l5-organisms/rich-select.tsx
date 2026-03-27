// rich-select — dropdown with icons, descriptions, and badges per option
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { mergeRefs } from '../utils/dom'
import { glassClass } from '../utils/glass'
import { RichSelectList } from './rich-select-list'

export type RichSelectOption = {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
  badge?: string
}

export type RichSelectProps = {
  options: RichSelectOption[]
  value: string | null
  onChange: (value: string | null) => void
  placeholder?: string
  disabled?: boolean
  error?: boolean
  glass?: boolean
  className?: string
}

export const RichSelect = forwardRef<HTMLDivElement, RichSelectProps>(
  function RichSelect({ options, value, onChange, placeholder, disabled, error, glass, className }, ref) {
    const [open, setOpen] = useState(false)
    const [focusedIndex, setFocusedIndex] = useState(-1)
    const containerRef = useRef<HTMLDivElement>(null)

    const selected = options.find((o) => o.value === value)

    // close on outside click
    useEffect(() => {
      if (!open) return
      function handleClick(e: MouseEvent) {
        if (containerRef.current !== null && !containerRef.current.contains(e.target as Node)) {
          setOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClick)
      return () => document.removeEventListener('mousedown', handleClick)
    }, [open])

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return

        if (e.key === 'Escape') {
          setOpen(false)
          return
        }

        if (!open) {
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
            e.preventDefault()
            setOpen(true)
            setFocusedIndex(0)
          }
          return
        }

        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0))
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1))
        } else if (e.key === 'Enter') {
          e.preventDefault()
          if (focusedIndex >= 0 && focusedIndex < options.length) {
            onChange(options[focusedIndex].value)
            setOpen(false)
          }
        }
      },
      [disabled, open, options, focusedIndex, onChange],
    )

    const handleSelect = useCallback((val: string) => {
      onChange(val)
      setOpen(false)
    }, [onChange])

    return (
      <div
        ref={mergeRefs(ref, containerRef)}
        data-component="rich-select"
        data-state={open ? 'open' : 'closed'}
        className={cx('relative', className)}
        onKeyDown={handleKeyDown}
      >
        <button
          type="button"
          disabled={disabled}
          className={cx(
            'flex w-full items-center gap-2 gds-radius-input border gds-pad-x gds-h-lg text-sm text-left transition-colors',
            error ? 'border-danger' : 'border-border hover:border-fg-muted',
            disabled && 'opacity-50 cursor-not-allowed',
            glassClass(glass),
            focusCls,
          )}
          onClick={() => setOpen((p) => !p)}
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          {selected !== undefined ? (
            <>
              {selected.icon !== undefined && <span className="shrink-0">{selected.icon}</span>}
              <span className="flex-1 truncate text-fg">{selected.label}</span>
            </>
          ) : (
            <span className="flex-1 truncate text-fg-muted">{placeholder ?? 'Select...'}</span>
          )}
          <svg className="ml-auto h-3 w-3 shrink-0 text-fg-muted" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 4.5l3 3 3-3" />
          </svg>
        </button>

        {open && (
          <RichSelectList
            options={options}
            value={value}
            focusedIndex={focusedIndex}
            glass={glass}
            onSelect={handleSelect}
            onFocus={setFocusedIndex}
          />
        )}
      </div>
    )
  },
)
