// ribbon-banner — corner ribbon overlay for containers
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type RibbonBannerProps = React.HTMLAttributes<HTMLDivElement> & {
  color?: string
  position?: 'top-left' | 'top-right'
  text: string
}

export const RibbonBanner = forwardRef<HTMLDivElement, RibbonBannerProps>(
  function RibbonBanner({ className, color, position = 'top-right', text, ...props }, ref) {
    const isRight = position === 'top-right'

    return (
      <div
        className={cx(
          'absolute top-0 z-10 overflow-hidden',
          isRight ? 'right-0' : 'left-0',
          className,
        )}
        data-component="ribbon-banner"
        ref={ref}
        style={{ height: 80, width: 80 }}
        {...props}
      >
        <div
          className="flex items-center justify-center text-xs font-bold text-accent-fg select-none"
          style={{
            backgroundColor: color ?? 'var(--color-accent)',
            left: isRight ? undefined : -20,
            position: 'absolute',
            right: isRight ? -20 : undefined,
            top: 16,
            transform: isRight ? 'rotate(45deg)' : 'rotate(-45deg)',
            width: 120,
          }}
        >
          {text}
        </div>
      </div>
    )
  },
)

export type { RibbonBannerProps }
