// loading-states — pre-composed loading state patterns for common UI contexts
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { Button } from '../l2-primitives/button'
import { Spinner } from '../l2-primitives/spinner'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type LoadingStatesVariant = 'button' | 'inline' | 'overlay' | 'page'

export type LoadingStatesProps = {
  variant: LoadingStatesVariant
  message?: string
  glass?: boolean
  className?: string
}

function PageLoading({
  message,
  glass,
  className,
}: Omit<LoadingStatesProps, 'variant'>) {
  return (
    <div
      className={cx(
        'flex min-h-[200px] flex-col items-center justify-center gap-3',
        glassClass(glass),
        className
      )}
    >
      <Spinner size="lg" />
      {message !== undefined && (
        <p className="gds-text-body text-fg-muted">{message}</p>
      )}
    </div>
  )
}

function InlineLoading({
  message,
  className,
}: Omit<LoadingStatesProps, 'variant'>) {
  return (
    <div className={cx('inline-flex items-center gap-2', className)}>
      <Spinner size="sm" />
      {message !== undefined && (
        <span className="gds-text-body text-fg-muted">{message}</span>
      )}
    </div>
  )
}

function ButtonLoading({
  message,
  className,
}: Omit<LoadingStatesProps, 'variant'>) {
  return (
    <div className={className}>
      <Button loading disabled>
        {message ?? 'Loading...'}
      </Button>
    </div>
  )
}

function OverlayLoading({
  message,
  glass,
  className,
}: Omit<LoadingStatesProps, 'variant'>) {
  return (
    <div
      className={cx(
        'absolute inset-0 flex flex-col items-center justify-center gap-3',
        glass === true ? glassClass(glass) : 'bg-bg/80',
        className
      )}
    >
      <Spinner size="lg" />
      {message !== undefined && (
        <p className="gds-text-body text-fg-muted">{message}</p>
      )}
    </div>
  )
}

const variantMap: Record<
  LoadingStatesVariant,
  (props: Omit<LoadingStatesProps, 'variant'>) => ReactNode
> = {
  page: PageLoading,
  inline: InlineLoading,
  button: ButtonLoading,
  overlay: OverlayLoading,
}

export const LoadingStates = forwardRef<HTMLDivElement, LoadingStatesProps>(
  function LoadingStates({ variant, message, glass, className }, ref) {
    return (
      <div ref={ref} data-component="loading-states" data-variant={variant}>
        {variantMap[variant]({ message, glass, className })}
      </div>
    )
  }
)

export type { LoadingStatesVariant }
