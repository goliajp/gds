// loading — loading indicator variants (dots, bars, pulse, ring, wave)
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type LoadingSize = 'default' | 'lg' | 'sm'

type LoadingProps = {
  className?: string
  size?: LoadingSize
}

const sizeClasses: Record<LoadingSize, { container: string; dot: string }> = {
  default: { container: 'gap-1.5', dot: 'h-2 w-2' },
  lg: { container: 'gap-2', dot: 'h-3 w-3' },
  sm: { container: 'gap-1', dot: 'h-1.5 w-1.5' },
}

const barSizeClasses: Record<LoadingSize, { bar: string; container: string }> = {
  default: { bar: 'w-1 h-4', container: 'gap-1 h-4' },
  lg: { bar: 'w-1.5 h-6', container: 'gap-1.5 h-6' },
  sm: { bar: 'w-0.5 h-3', container: 'gap-0.5 h-3' },
}

const pulseSizeClasses: Record<LoadingSize, string> = {
  default: 'h-4 w-4',
  lg: 'h-6 w-6',
  sm: 'h-3 w-3',
}

const ringSizeClasses: Record<LoadingSize, string> = {
  default: 'h-4 w-4 border-2',
  lg: 'h-6 w-6 border-[3px]',
  sm: 'h-3 w-3 border-[1.5px]',
}

export const LoadingDots = forwardRef<HTMLDivElement, LoadingProps>(
  function LoadingDots({ className, size = 'default' }, ref) {
    const s = sizeClasses[size]
    return (
      <div
        className={cx('inline-flex items-center', s.container, className)}
        data-component="loading-dots"
        ref={ref}
        role="status"
      >
        {[0, 1, 2].map((i) => (
          <span
            className={cx('rounded-full bg-accent', s.dot)}
            key={i}
            style={{
              animation: 'loading-dots 1.4s infinite ease-in-out both',
              animationDelay: `${i * 0.16}s`,
            }}
          />
        ))}
      </div>
    )
  },
)

export const LoadingBars = forwardRef<HTMLDivElement, LoadingProps>(
  function LoadingBars({ className, size = 'default' }, ref) {
    const s = barSizeClasses[size]
    return (
      <div
        className={cx('inline-flex items-center', s.container, className)}
        data-component="loading-bars"
        ref={ref}
        role="status"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            className={cx('rounded-sm bg-accent', s.bar)}
            key={i}
            style={{
              animation: 'loading-bars 1.2s infinite ease-in-out',
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    )
  },
)

export const LoadingPulse = forwardRef<HTMLDivElement, LoadingProps>(
  function LoadingPulse({ className, size = 'default' }, ref) {
    return (
      <div
        className={cx('inline-flex items-center justify-center', className)}
        data-component="loading-pulse"
        ref={ref}
        role="status"
      >
        <span
          className={cx('rounded-full bg-accent', pulseSizeClasses[size])}
          style={{ animation: 'loading-pulse 2s infinite ease-in-out' }}
        />
      </div>
    )
  },
)

export const LoadingRing = forwardRef<HTMLDivElement, LoadingProps>(
  function LoadingRing({ className, size = 'default' }, ref) {
    return (
      <div
        className={cx('inline-flex items-center justify-center', className)}
        data-component="loading-ring"
        ref={ref}
        role="status"
      >
        <span
          className={cx(
            'animate-spin rounded-full border-accent border-t-transparent',
            ringSizeClasses[size],
          )}
        />
      </div>
    )
  },
)

export const LoadingWave = forwardRef<HTMLDivElement, LoadingProps>(
  function LoadingWave({ className, size = 'default' }, ref) {
    const s = sizeClasses[size]
    return (
      <div
        className={cx('inline-flex items-end', s.container, className)}
        data-component="loading-wave"
        ref={ref}
        role="status"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            className={cx('rounded-full bg-fg-muted', s.dot)}
            key={i}
            style={{
              animation: 'loading-wave 1.2s infinite ease-in-out',
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    )
  },
)

export type { LoadingProps, LoadingSize }
