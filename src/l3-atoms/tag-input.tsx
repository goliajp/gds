import { forwardRef, useCallback, useRef, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type TagInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  disabled?: boolean
  error?: boolean
  glass?: boolean
  maxTags?: number
  onChange: (tags: string[]) => void
  value: string[]
}

// inline X icon for tag remove button
function RemoveIcon() {
  return (
    <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  function TagInput(
    { className, disabled = false, error = false, glass, maxTags, onChange, placeholder, value, ...props },
    ref,
  ) {
    const [inputValue, setInputValue] = useState('')
    const [focused, setFocused] = useState(false)
    const innerRef = useRef<HTMLInputElement>(null)
    const inputRef = (ref ?? innerRef) as React.RefObject<HTMLInputElement>

    const atLimit = maxTags !== undefined && value.length >= maxTags

    const addTag = useCallback(
      (tag: string) => {
        const trimmed = tag.trim()
        if (trimmed === '') return
        if (value.includes(trimmed)) return
        if (atLimit) return
        onChange([...value, trimmed])
        setInputValue('')
      },
      [atLimit, onChange, value],
    )

    const removeTag = useCallback(
      (index: number) => {
        onChange(value.filter((_, i) => i !== index))
      },
      [onChange, value],
    )

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          addTag(inputValue)
        }
        if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
          removeTag(value.length - 1)
        }
      },
      [addTag, inputValue, removeTag, value.length],
    )

    const handleContainerClick = useCallback(() => {
      if (!disabled) {
        inputRef.current?.focus()
      }
    }, [disabled, inputRef])

    return (
      <div
        className={cx(
          'flex min-h-[var(--gds-h)] flex-wrap items-center gds-gap-xs gds-pad-x gds-pad-y-sm gds-radius-input border bg-bg transition-colors',
          !error && !focused && 'border-border hover:border-border-strong',
          !error && focused && 'border-accent ring-2 ring-accent ring-offset-1 ring-offset-bg',
          error && 'border-danger',
          error && focused && 'ring-2 ring-danger ring-offset-1 ring-offset-bg',
          disabled && 'cursor-not-allowed opacity-50',
          glassClass(glass),
          glass === true && 'border-white/10 bg-bg/60',
          className,
        )}
        data-component="tag-input"
        data-state={focused ? 'focused' : 'idle'}
        onClick={handleContainerClick}
      >
        {value.map((tag, index) => (
          <span
            className="inline-flex select-none items-center gds-gap-xs gds-radius-badge gds-pad-x-sm gds-pad-y-sm gds-text-label font-medium bg-fg-muted/10 text-fg-muted"
            key={tag}
          >
            {tag}
            {!disabled && (
              <button
                className={cx(
                  'ml-0.5 gds-radius-badge p-0.5 transition-colors hover:bg-current/10',
                  focusCls,
                )}
                onClick={(e) => {
                  e.stopPropagation()
                  removeTag(index)
                }}
                tabIndex={-1}
                type="button"
              >
                <RemoveIcon />
              </button>
            )}
          </span>
        ))}
        {!atLimit && (
          <input
            className="min-w-[60px] flex-1 border-none bg-transparent text-fg outline-none gds-text-body placeholder:text-fg-muted/50 disabled:cursor-not-allowed"
            disabled={disabled}
            onBlur={() => setFocused(false)}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onKeyDown={handleKeyDown}
            placeholder={value.length === 0 ? placeholder : undefined}
            ref={inputRef}
            type="text"
            value={inputValue}
            {...props}
          />
        )}
      </div>
    )
  },
)

export type { TagInputProps }
