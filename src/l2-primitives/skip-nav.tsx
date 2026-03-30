import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type SkipNavProps = {
  targetId?: string
  label?: string
  className?: string
}

const SkipNav = forwardRef<HTMLAnchorElement, SkipNavProps>(function SkipNav(
  { targetId = 'main-content', label = 'Skip to content', className },
  ref
) {
  return (
    <a
      ref={ref}
      className={cx(
        'bg-accent text-accent-fg absolute top-2 left-2 z-50 -translate-y-full rounded px-3 py-2 text-sm font-medium transition-transform focus:translate-y-0 focus:outline-none',
        className
      )}
      data-component="skip-nav"
      href={`#${targetId}`}
    >
      {label}
    </a>
  )
})

export { SkipNav }
export type { SkipNavProps }
