// combobox — searchable select dropdown
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import { useClickOutside, useEscapeKey } from '../utils/hooks'
import type { ComboboxOption } from './combobox-list'
import { ComboboxList } from './combobox-list'

type ComboboxProps = {
  className?: string
  creatable?: boolean
  debounce?: number
  disabled?: boolean
  error?: boolean
  glass?: boolean
  loading?: boolean
  onChange: (value: string | null) => void
  onCreateOption?: (value: string) => ComboboxOption
  onSearch?: (query: string) => Promise<ComboboxOption[]>
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
      creatable = false,
      debounce: debounceDuration = 300,
      disabled = false,
      error = false,
      glass,
      loading: externalLoading = false,
      onChange,
      onCreateOption,
      onSearch,
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
    const [asyncResults, setAsyncResults] = useState<ComboboxOption[] | null>(null)
    const [asyncLoading, setAsyncLoading] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const searchRef = useRef<HTMLInputElement>(null)

    // merge forwarded ref with internal ref
    const mergedRef = (ref ?? containerRef) as React.RefObject<HTMLDivElement>

    // debounced async search
    useEffect(() => {
      if (onSearch === undefined) return
      if (!open) return

      if (query === '') {
        setAsyncResults(null)
        setAsyncLoading(false)
        return
      }

      setAsyncLoading(true)
      const timer = setTimeout(() => {
        onSearch(query)
          .then((results) => {
            setAsyncResults(results)
            setHighlightedIndex(0)
          })
          .finally(() => {
            setAsyncLoading(false)
          })
      }, debounceDuration)

      return () => {
        clearTimeout(timer)
      }
    }, [query, onSearch, open, debounceDuration])

    const isLoading = externalLoading || asyncLoading

    const filtered = useMemo(() => {
      // when async search is active, use async results
      if (onSearch !== undefined) {
        if (asyncResults !== null) return asyncResults
        return options
      }
      if (query === '') return options
      const lower = query.toLowerCase()
      return options.filter((opt) => opt.label.toLowerCase().includes(lower))
    }, [options, query, onSearch, asyncResults])

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
      setAsyncResults(null)
      setAsyncLoading(false)
    }, [])

    const handleSelect = useCallback(
      (optionValue: string) => {
        onChange(optionValue)
        handleClose()
      },
      [onChange, handleClose],
    )

    const handleCreate = useCallback(
      (inputValue: string) => {
        if (onCreateOption === undefined) return
        const newOption = onCreateOption(inputValue)
        onChange(newOption.value)
        handleClose()
      },
      [onCreateOption, onChange, handleClose],
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
            creatable={creatable}
            filtered={filtered}
            glass={glass}
            highlightedIndex={highlightedIndex}
            loading={isLoading}
            onCreateOption={handleCreate}
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
