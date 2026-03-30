// card — composition-based content container
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type CardPadding = 'default' | 'lg' | 'none' | 'sm'

const paddingMap: Record<CardPadding, string> = {
  none: '',
  sm: 'gds-pad-x gds-pad-y',
  default: 'gds-pad-x-lg gds-pad-y-lg',
  lg: 'gds-pad-x-lg gds-pad-y-lg',
}

export type CardProps = {
  children: ReactNode
  className?: string
  /** Enable frosted glass translucency effect */
  glass?: boolean
  /** Show pulse skeleton placeholder */
  loading?: boolean
  /** Click handler — adds cursor-pointer and hover effect */
  onClick?: () => void
  /** Inner padding preset */
  padding?: CardPadding
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { children, className, glass, loading, onClick, padding = 'default' },
  ref
) {
  if (loading === true) {
    return (
      <div
        ref={ref}
        className={cx(
          'gds-ctx gds-gap gds-radius-card border-border bg-bg-tertiary flex animate-pulse flex-col border',
          paddingMap[padding],
          className
        )}
        data-component="card"
        data-state="loading"
      >
        <div className="h-20" />
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={cx(
        'gds-ctx gds-gap gds-radius-card flex flex-col border transition-colors',
        glass
          ? cx(glassClass(glass), 'bg-bg/60 border-white/10')
          : 'border-border bg-surface',
        onClick !== undefined &&
          'hover:border-fg-muted/40 hover:bg-surface/80 cursor-pointer',
        paddingMap[padding],
        className
      )}
      data-component="card"
      onClick={onClick}
    >
      {children}
    </div>
  )
})

export type CardHeaderProps = {
  action?: ReactNode
  children?: ReactNode
  className?: string
  description?: string
  title?: string
}

export function CardHeader({
  action,
  children,
  className,
  description,
  title,
}: CardHeaderProps) {
  if (children !== undefined) {
    return (
      <div
        className={cx('gds-gap flex items-start justify-between', className)}
      >
        {children}
      </div>
    )
  }
  return (
    <div className={cx('gds-gap flex items-start justify-between', className)}>
      <div className="min-w-0">
        {title !== undefined && (
          <h3 className="text-fg text-sm font-semibold">{title}</h3>
        )}
        {description !== undefined && (
          <p className="gds-text-body text-fg-muted mt-0.5">{description}</p>
        )}
      </div>
      {action !== undefined && <div className="shrink-0">{action}</div>}
    </div>
  )
}

export type CardContentProps = {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={className}>{children}</div>
}

export type CardFooterProps = {
  children: ReactNode
  className?: string
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div
      className={cx(
        'gds-gap-sm border-border flex items-center border-t pt-3',
        className
      )}
    >
      {children}
    </div>
  )
}
