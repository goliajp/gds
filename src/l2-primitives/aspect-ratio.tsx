import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type AspectRatioProps = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  ratio?: number
}

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  function AspectRatio({ children, className, ratio = 16 / 9, style, ...props }, ref) {
    return (
      <div
        className={cx('relative w-full overflow-hidden', className)}
        data-component="aspect-ratio"
        ref={ref}
        style={{ ...style, aspectRatio: ratio }}
        {...props}
      >
        {children}
      </div>
    )
  },
)

export type { AspectRatioProps }
