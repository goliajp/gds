// toggle-group — group of toggle buttons, one or more can be active
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

type ToggleGroupItem = {
  value: string
  label: ReactNode
}

type ToggleGroupSize = 'default' | 'lg' | 'sm'

type ToggleGroupProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  items: ToggleGroupItem[]
  value: string[]
  onChange: (value: string[]) => void
  exclusive?: boolean
  size?: ToggleGroupSize
  disabled?: boolean
}

const toggleGroupVariants = {
  size: {
    sm: 'px-2 py-1 text-[11px]',
    default: 'px-3 py-1.5 text-xs',
    lg: 'px-4 py-2 text-sm',
  },
} as const

const toggleItemVariants = toggleGroupVariants

const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  function ToggleGroup(
    { items, value, onChange, exclusive, size = 'default', disabled, className, ...props },
    ref,
  ) {
    function handleClick(itemValue: string) {
      if (exclusive === true) {
        // exclusive: always select the clicked one (no deselect)
        if (!value.includes(itemValue)) {
          onChange([itemValue])
        }
        return
      }
      // multi: toggle
      if (value.includes(itemValue)) {
        onChange(value.filter((v) => v !== itemValue))
      } else {
        onChange([...value, itemValue])
      }
    }

    return (
      <div
        ref={ref}
        className={cx(
          'inline-flex select-none overflow-hidden gds-radius-button border border-border bg-bg',
          disabled === true && 'pointer-events-none opacity-50',
          className,
        )}
        data-component="toggle-group"
        data-state={disabled === true ? 'disabled' : 'enabled'}
        role="group"
        {...props}
      >
        {items.map((item, index) => {
          const isActive = value.includes(item.value)
          const isLast = index === items.length - 1
          return (
            <button
              key={item.value}
              aria-pressed={isActive}
              className={cx(
                'transition-colors',
                toggleGroupVariants.size[size ?? 'default'],
                !isLast && 'border-r border-border',
                focusCls,
                isActive ? 'bg-accent/10 text-accent' : 'text-fg-muted hover:bg-bg-tertiary',
              )}
              disabled={disabled}
              onClick={() => handleClick(item.value)}
              type="button"
            >
              {item.label}
            </button>
          )
        })}
      </div>
    )
  },
)

export { ToggleGroup, toggleGroupVariants, toggleItemVariants }
export type { ToggleGroupItem, ToggleGroupProps, ToggleGroupSize }
