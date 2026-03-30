// responsive-container — renders different children based on viewport width
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type ResponsiveContainerProps = {
  mobile: ReactNode
  tablet?: ReactNode
  desktop: ReactNode
  className?: string
}

export const ResponsiveContainer = forwardRef<
  HTMLDivElement,
  ResponsiveContainerProps
>(function ResponsiveContainer({ mobile, tablet, desktop, className }, ref) {
  const tabletContent = tablet ?? mobile

  return (
    <div
      ref={ref}
      className={cx(className)}
      data-component="responsive-container"
    >
      <div className="block sm:hidden">{mobile}</div>
      <div className="hidden sm:block lg:hidden">{tabletContent}</div>
      <div className="hidden lg:block">{desktop}</div>
    </div>
  )
})
