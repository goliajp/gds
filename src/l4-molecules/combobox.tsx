// combobox — searchable select dropdown
import { forwardRef, useCallback, useMemo, useRef, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import { useClickOutside, useEscapeKey } from '../utils/hooks'

import type { ComboboxOption } from './combobox-list'
import { ComboboxList } from './combobox-list'

type ComboboxProps = {
  className?: string
  disabled?: boolean
  error?: boolean
  glass?: boolean
  onChange: (value: string | null) => void
  options: ComboboxOption[]
  placeholder?: string
  searchPlaceholder?: string
  value: string | null
}

// chevron icon
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={cx('h-3 w-3 text-fg-muted transition-transform', open && 'rotate-180')}
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

export const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  function Combobox(
    {
      className,
      disabled = false,
      error = false,
      glass,
      onChange,
      options,
      placeholder = 'Select...',
      searchPlaceholder = 'Search...',
      value,
    },
    ref,
  ) {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [highlightedIndex, setHighlightedIndex] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const searchRef = useRef<HTMLInputElement>(null)

    // merge forwarded ref with internal ref
    const mergedRef = (ref ?? containerRef) as React.RefObject<HTMLDivElement>

    const filtered = useMemo(() => {
      if (query === '') return options
      const lower = query.toLowerCase()
      return options.filter((opt) => opt.label.toLowerCase().includes(lower))
    }, [options, query])

    const selectedOption = useMemo(
      () => options.find((opt) => opt.value === value),
      [options, value],
    )

    const handleOpen = useCallback(() => {
      if (disabled) return
      setOpen(true)
      setQuery('')
      setHighlightedIndex(0)
      // auto-focus search input after render
      requestAnimationFrame(() => {
        searchRef.current?.focus()
      })
    }, [disabled])

    const handleClose = useCallback(() => {
      setOpen(false)
      setQuery('')
    }, [])

    const handleSelect = useCallback(
      (optionValue: string) => {
        onChange(optionValue)
        handleClose()
      },
      [onChange, handleClose],
    )

    const handleSearchChange = useCallback((val: string) => {
      setQuery(val)
      setHighlightedIndex(0)
    }, [])

    useClickOutside(mergedRef, open, handleClose)
    useEscapeKey(open, handleClose)

    return (
      <div
        ref={mergedRef}
        className={cx('relative', className)}
        data-component="combobox"
        data-state={open ? 'open' : 'closed'}
      >
        <button
          className={cx(
            'flex w-full items-center justify-between gds-h gds-radius-popover gds-pad-x border bg-transparent text-left text-sm text-fg transition-colors',
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
          <span className={cx(selectedOption !== undefined ? 'text-fg' : 'text-fg-muted')}>
            {selectedOption !== undefined ? selectedOption.label : placeholder}
          </span>
          <ChevronIcon open={open} />
        </button>

        {open && (
          <ComboboxList
            filtered={filtered}
            glass={glass}
            highlightedIndex={highlightedIndex}
            onSearchChange={handleSearchChange}
            onSelect={handleSelect}
            query={query}
            searchPlaceholder={searchPlaceholder}
            searchRef={searchRef}
            setHighlightedIndex={setHighlightedIndex}
            value={value}
          />
        )}
      </div>
    )
  },
)

export type { ComboboxOption, ComboboxProps }
