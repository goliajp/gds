// textarea-counter — textarea with character count display
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

import type { TextareaProps } from '../l2-primitives/textarea'
import { Textarea } from '../l2-primitives/textarea'

type TextareaCounterProps = Omit<TextareaProps, 'onChange'> & {
  maxLength?: number
  onChange: (value: string) => void
  value: string
}

export const TextareaCounter = forwardRef<HTMLTextAreaElement, TextareaCounterProps>(
  function TextareaCounter({ className, error, maxLength, onChange, value, ...props }, ref) {
    const count = value.length
    const nearLimit = maxLength !== undefined && count >= maxLength * 0.9

    return (
      <div className={cx('flex flex-col', className)} data-component="textarea-counter">
        <Textarea
          error={error ?? nearLimit}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          ref={ref}
          value={value}
          {...props}
        />
        <div className={cx(
          'mt-1 text-right text-[11px]',
          nearLimit ? 'text-danger' : 'text-fg-muted',
        )}>
          {maxLength !== undefined ? `${count} / ${maxLength}` : count}
        </div>
      </div>
    )
  },
)

export type { TextareaCounterProps }
