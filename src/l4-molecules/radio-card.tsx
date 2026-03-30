// radio-card — card-style radio group where each option is a selectable card
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type RadioCardOption = {
  value: string
  label: string
  description?: string
  icon?: ReactNode
}

export type RadioCardProps = {
  options: RadioCardOption[]
  value: string | null
  onChange: (value: string) => void
  columns?: 1 | 2 | 3
  disabled?: boolean
  glass?: boolean
  className?: string
}

const columnMap: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
}

export const RadioCard = forwardRef<HTMLDivElement, RadioCardProps>(
  function RadioCard(
    { options, value, onChange, columns = 1, disabled, glass, className },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cx('gds-gap grid', columnMap[columns], className)}
        data-component="radio-card"
        role="radiogroup"
      >
        {options.map((option) => {
          const selected = value === option.value

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={disabled}
              onClick={() => {
                if (disabled !== true) {
                  onChange(option.value)
                }
              }}
              className={cx(
                'gds-gap gds-radius-card gds-pad-x gds-pad-y flex items-center text-left transition-colors',
                'cursor-pointer select-none',
                glass === true
                  ? cx(glassClass(glass), 'border border-white/10')
                  : selected
                    ? 'border-accent bg-accent/5 ring-accent border ring-1'
                    : 'border-border hover:border-border-strong border',
                disabled === true && 'pointer-events-none opacity-50'
              )}
              data-state={selected ? 'selected' : 'idle'}
            >
              {/* radio dot */}
              <span
                className={cx(
                  'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                  selected ? 'border-accent bg-accent' : 'border-border-strong'
                )}
              >
                {selected && (
                  <span className="bg-fg h-1.5 w-1.5 rounded-full" />
                )}
              </span>

              {/* icon */}
              {option.icon !== undefined && (
                <span className="text-fg-muted shrink-0">{option.icon}</span>
              )}

              {/* label + description */}
              <div className="min-w-0 flex-1">
                <div className="text-fg text-sm font-medium">
                  {option.label}
                </div>
                {option.description !== undefined && (
                  <div className="text-fg-muted mt-0.5 text-xs">
                    {option.description}
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>
    )
  }
)
