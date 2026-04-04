import { forwardRef, useCallback, useRef, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type TagInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
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
    <svg
      className="h-3 w-3"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        d="M18 6L6 18M6 6l12 12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  function TagInput(
    {
      className,
      disabled = false,
      error = false,
      glass,
      maxTags,
      onChange,
      placeholder,
      value,
      ...props
    },
    ref
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
      [atLimit, onChange, value]
    )

    const removeTag = useCallback(
      (index: number) => {
        onChange(value.filter((_, i) => i !== index))
      },
      [onChange, value]
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
      [addTag, inputValue, removeTag, value.length]
    )

    const handleContainerClick = useCallback(() => {
      if (!disabled) {
        inputRef.current?.focus()
      }
    }, [disabled, inputRef])

    return (
      <div
        className={cx(
          'gds-gap-xs gds-pad-x gds-pad-y-sm gds-radius-input bg-bg flex min-h-[var(--gds-h)] flex-wrap items-center border transition-colors',
          !error && !focused && 'border-border hover:border-border-strong',
          !error &&
            focused &&
            'border-accent ring-accent ring-offset-bg ring-2 ring-offset-1',
          error && 'border-danger',
          error && focused && 'ring-danger ring-offset-bg ring-2 ring-offset-1',
          disabled && 'cursor-not-allowed opacity-50',
          glassClass(glass),
          glass === true && 'bg-bg/60 border-white/10',
          className
        )}
        data-component="tag-input"
        data-state={focused ? 'focused' : 'idle'}
        onClick={handleContainerClick}
      >
        {value.map((tag, index) => (
          <span
            className="gds-gap-xs gds-radius-badge gds-pad-x-sm gds-pad-y-sm gds-text-label bg-fg-muted/10 text-fg-muted inline-flex items-center font-medium select-none"
            key={tag}
          >
            {tag}
            {!disabled && (
              <button
                className={cx(
                  'gds-radius-badge ml-0.5 p-0.5 transition-colors hover:bg-current/10',
                  focusCls
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
            className="text-fg gds-text-body placeholder:text-fg-muted/50 min-w-[60px] flex-1 border-none bg-transparent outline-none disabled:cursor-not-allowed"
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
  }
)

export type { TagInputProps }
