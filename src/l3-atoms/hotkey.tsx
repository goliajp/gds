// hotkey — keyboard shortcut key combination display
import { forwardRef } from 'react'

import { Kbd } from '../l2-primitives/kbd'
import { cx } from '../utils/cx'

type HotkeyProps = React.HTMLAttributes<HTMLSpanElement> & {
  keys: string[]
}

export const Hotkey = forwardRef<HTMLSpanElement, HotkeyProps>(
  function Hotkey({ className, keys, ...props }, ref) {
    return (
      <span
        className={cx('inline-flex items-center gap-1', className)}
        data-component="hotkey"
        ref={ref}
        {...props}
      >
        {keys.map((key, i) => (
          <span className="contents" key={i}>
            {i > 0 && <span className="text-[10px] text-fg-muted">+</span>}
            <Kbd>{key}</Kbd>
          </span>
        ))}
      </span>
    )
  },
)

export type { HotkeyProps }
