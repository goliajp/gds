import { forwardRef } from 'react'

import { Input } from '../l2-primitives/input'
import { Spinner } from '../l2-primitives/spinner'
import { cx } from '../utils/cx'

type SearchInputProps = {
  className?: string
  clearable?: boolean
  disabled?: boolean
  inputSize?: 'default' | 'sm'
  loading?: boolean
  onChange: (value: string) => void
  onSearch?: (value: string) => void
  placeholder?: string
  value: string
}

const searchSvg = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const clearSvg = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    { className, clearable = true, disabled = false, inputSize, loading = false, onChange, onSearch, placeholder = 'Search...', value },
    ref,
  ) {
    const leftIcon = loading ? <Spinner size="sm" /> : searchSvg

    const showClear = clearable && value.length > 0
    const rightIcon = showClear ? (
      <button
        aria-label="Clear search"
        className="cursor-pointer text-fg-muted/50 hover:text-fg-muted"
        onClick={() => onChange('')}
        tabIndex={-1}
        type="button"
      >
        {clearSvg}
      </button>
    ) : undefined

    return (
      <Input
        className={cx(className)}
        data-component="search-input"
        disabled={disabled}
        icon={leftIcon}
        inputSize={inputSize}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onSearch !== undefined) {
            onSearch(value)
          }
        }}
        placeholder={placeholder}
        ref={ref}
        rightIcon={rightIcon}
        type="search"
        value={value}
      />
    )
  },
)

export type { SearchInputProps }
