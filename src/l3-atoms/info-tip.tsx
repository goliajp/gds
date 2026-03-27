import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { Tooltip } from './tooltip'

type InfoTipProps = React.HTMLAttributes<HTMLDivElement> & {
  content: ReactNode
  size?: 'default' | 'sm'
}

const sizeClasses = {
  default: 'h-4 w-4',
  sm: 'h-3.5 w-3.5',
} as const

export const InfoTip = forwardRef<HTMLDivElement, InfoTipProps>(
  function InfoTip({ className, content, size = 'default', ...props }, ref) {
    return (
      <Tooltip content={content} ref={ref} {...props}>
        <span className={cx('inline-flex cursor-help items-center text-fg-muted/60 hover:text-fg-muted', className)}>
          <svg className={sizeClasses[size]} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
        </span>
      </Tooltip>
    )
  },
)

export type { InfoTipProps }
