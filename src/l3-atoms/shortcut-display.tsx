// shortcut-display — keyboard shortcut with optional description
import { forwardRef } from 'react'

import { Kbd } from '../l2-primitives/kbd'
import { cx } from '../utils/cx'

type ShortcutDisplayProps = React.HTMLAttributes<HTMLSpanElement> & {
  description?: string
  keys: string[]
}

export const ShortcutDisplay = forwardRef<HTMLSpanElement, ShortcutDisplayProps>(
  function ShortcutDisplay({ className, description, keys, ...props }, ref) {
    return (
      <span
        className={cx('inline-flex items-center gap-2', className)}
        data-component="shortcut-display"
        ref={ref}
        {...props}
      >
        <span className="inline-flex items-center gap-0.5">
          {keys.map((key, i) => (
            <Kbd key={i}>{key}</Kbd>
          ))}
        </span>
        {description !== undefined && (
          <span className="text-xs text-fg-muted">{description}</span>
        )}
      </span>
    )
  },
)

export type { ShortcutDisplayProps }
