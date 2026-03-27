// media-object — classic media + content side-by-side layout
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type MediaObjectProps = {
  align?: 'center' | 'top'
  children: ReactNode
  className?: string
  media: ReactNode
  reverse?: boolean
}

export const MediaObject = forwardRef<HTMLDivElement, MediaObjectProps>(
  function MediaObject({ align = 'top', children, className, media, reverse = false }, ref) {
    return (
      <div
        ref={ref}
        className={cx(
          'flex gds-gap',
          align === 'center' && 'items-center',
          align === 'top' && 'items-start',
          reverse === true && 'flex-row-reverse',
          className,
        )}
        data-component="media-object"
      >
        <div className="shrink-0">{media}</div>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    )
  },
)

export type { MediaObjectProps }
