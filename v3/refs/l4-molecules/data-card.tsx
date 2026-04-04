// data-card — metric card with title, value, optional change indicator and footer
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type DataCardChangeType = 'down' | 'neutral' | 'up'

const changeColors: Record<DataCardChangeType, string> = {
  down: 'text-danger',
  neutral: 'text-fg-muted',
  up: 'text-success',
}

export type DataCardProps = {
  title: string
  value: number | string
  change?: string
  changeType?: DataCardChangeType
  icon?: ReactNode
  footer?: ReactNode
  glass?: boolean
  className?: string
}

export const DataCard = forwardRef<HTMLDivElement, DataCardProps>(
  function DataCard(
    {
      title,
      value,
      change,
      changeType = 'neutral',
      icon,
      footer,
      glass,
      className,
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cx(
          'gds-ctx gds-radius border-border/40 bg-surface gds-pad border select-none',
          glass === true && glassClass(glass),
          className
        )}
        data-component="data-card"
      >
        <div className="flex items-start justify-between">
          <span className="gds-text-body text-fg-muted">{title}</span>
          {icon !== undefined && (
            <span className="text-fg-muted/30">{icon}</span>
          )}
        </div>

        <div className="text-fg mt-2 text-xl font-bold">{value}</div>

        {change !== undefined && (
          <div
            className={cx(
              'mt-1 flex items-center gap-1 text-[11px]',
              changeColors[changeType]
            )}
          >
            {changeType === 'up' && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 12l5-5 3 3 5-6" />
                <path d="M11 4h4v4" />
              </svg>
            )}
            {changeType === 'down' && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 4l5 5 3-3 5 6" />
                <path d="M11 12h4V8" />
              </svg>
            )}
            <span>{change}</span>
          </div>
        )}

        {footer !== undefined && (
          <div className="border-border/20 text-fg-muted/50 mt-3 border-t pt-2 text-[10px]">
            {footer}
          </div>
        )}
      </div>
    )
  }
)

export type { DataCardChangeType }
