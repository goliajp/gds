import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { srOnly } from '../utils/a11y'
import { cx } from '../utils/cx'

type VisuallyHiddenProps = {
  as?: 'div' | 'span'
  children: ReactNode
  className?: string
}

const VisuallyHidden = forwardRef<HTMLElement, VisuallyHiddenProps>(
  function VisuallyHidden({ as: Tag = 'span', children, className }, ref) {
    return (
      <Tag
        ref={ref as never}
        className={cx(srOnly, className)}
        data-component="visually-hidden"
      >
        {children}
      </Tag>
    )
  }
)

export { VisuallyHidden }
export type { VisuallyHiddenProps }
