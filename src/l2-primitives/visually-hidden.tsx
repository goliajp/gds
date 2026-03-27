import type { ReactNode } from 'react'

import { srOnly } from '../utils/a11y'
import { cx } from '../utils/cx'

type VisuallyHiddenProps = {
  as?: 'div' | 'span'
  children: ReactNode
  className?: string
}

export function VisuallyHidden({
  as: Tag = 'span',
  children,
  className,
}: VisuallyHiddenProps) {
  return (
    <Tag className={cx(srOnly, className)} data-component="visually-hidden">
      {children}
    </Tag>
  )
}

export type { VisuallyHiddenProps }
