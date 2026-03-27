// multi-select — dropdown with checkboxes for multiple selection
import { forwardRef, useCallback, useMemo, useRef, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import { useClickOutside, useEscapeKey } from '../utils/hooks'

import { MultiSelectList } from './multi-select-list'

type MultiSelectOption = {
  label: string
  value: string
}

type MultiSelectProps = {
  className?: string
  disabled?: boolean
  error?: boolean
  glass?: boolean
  maxDisplay?: number
  onChange: (value: string[]) => void
  options: MultiSelectOption[]
  placeholder?: string
  value: string[]
}

// chevron icon
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={cx('h-3 w-3 shrink-0 text-fg-muted transition-transform', open && 'rotate-180')}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 12 12"
    >
      <path d="M3 4.5l3 3 3-3" />
    </svg>
  )
}

export const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
  function MultiSelect(
    {
      className,
      disabled = false,
      error = false,
      glass,
      maxDisplay = 3,
      onChange,
      options,
      placeholder = 'Select...',
      value,
    },
    ref,
  ) {
    const [open, setOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const containerRef = useRef<HTMLDivElement>(null)
    const searchRef = useRef<HTMLInputElement>(null)

    const mergedRef = (ref ?? containerRef) as React.RefObject<HTMLDivElement>

    const filtered = useMemo(() => {
      if (searchQuery === '') return options
      const lower = searchQuery.toLowerCase()
      return options.filter((opt) => opt.label.toLowerCase().includes(lower))
    }, [options, searchQuery])

    const selectedLabels = useMemo(
      () => options.filter((opt) => value.includes(opt.value)),
      [options, value],
    )

    const handleOpen = useCallback(() => {
      if (disabled) return
      setOpen(true)
      setSearchQuery('')
      requestAnimationFrame(() => {
        searchRef.current?.focus()
      })
    }, [disabled])

    const handleClose = useCallback(() => {
      setOpen(false)
      setSearchQuery('')
    }, [])

    const handleToggle = useCallback(
      (optionValue: string) => {
        if (value.includes(optionValue)) {
          onChange(value.filter((v) => v !== optionValue))
        } else {
          onChange([...value, optionValue])
        }
      },
      [onChange, value],
    )

    useClickOutside(mergedRef, open, handleClose)
    useEscapeKey(open, handleClose)

    const visibleChips = selectedLabels.slice(0, maxDisplay)
    const overflow = selectedLabels.length - maxDisplay

    return (
      <div
        ref={mergedRef}
        className={cx('relative', className)}
        data-component="multi-select"
        data-state={open ? 'open' : 'closed'}
      >
        <button
          className={cx(
            'flex w-full items-center justify-between gap-1 gds-h gds-radius-popover gds-pad-x border bg-transparent text-left text-sm text-fg transition-colors',
            focusCls,
            !error && 'border-border hover:border-fg-muted',
            error && 'border-danger',
            error && 'focus-visible:ring-danger',
            disabled && 'cursor-not-allowed opacity-50',
            glassClass(glass),
            glass === true && 'border-white/10 bg-bg/60',
          )}
          disabled={disabled}
          onClick={handleOpen}
          type="button"
        >
          <span className="flex min-w-0 flex-1 flex-wrap items-center gap-1">
            {selectedLabels.length === 0 && (
              <span className="text-fg-muted">{placeholder}</span>
            )}
            {visibleChips.map((opt) => (
              <span
                key={opt.value}
                className="inline-flex max-w-[120px] items-center truncate rounded bg-accent/10 px-1.5 py-0.5 text-xs text-accent"
              >
                {opt.label}
              </span>
            ))}
            {overflow > 0 && (
              <span className="text-xs text-fg-muted">+{overflow} more</span>
            )}
          </span>
          <ChevronIcon open={open} />
        </button>

        {open && (
          <MultiSelectList
            filtered={filtered}
            glass={glass}
            onSearchChange={setSearchQuery}
            onToggle={handleToggle}
            searchQuery={searchQuery}
            searchRef={searchRef}
            value={value}
          />
        )}
      </div>
    )
  },
)

export type { MultiSelectOption, MultiSelectProps }
