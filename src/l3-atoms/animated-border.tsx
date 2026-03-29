import type { ReactNode } from 'react'

import { cx } from '../utils/cx'

type AnimatedBorderProps = { children: ReactNode; className?: string; variant?: 'dash' | 'gradient' | 'pulse' }

const variantClasses = {
  dash: 'border-2 border-dashed border-accent/40 animate-[dash-march_1s_linear_infinite]',
  gradient: 'border-0 bg-gradient-to-r from-accent via-success to-accent bg-[length:200%_100%] animate-[gradient-shift_3s_ease_infinite] p-[2px]',
  pulse: 'border-2 border-accent animate-[border-pulse_2s_ease-in-out_infinite]',
}

export function AnimatedBorder({ children, className, variant = 'gradient' }: AnimatedBorderProps) {
  if (variant === 'gradient') {
    return (
      <div className={cx('rounded-lg', variantClasses.gradient, className)} data-component="animated-border">
        <div className="rounded-[calc(0.5rem-2px)] bg-bg">{children}</div>
      </div>
    )
  }
  return (
    <div className={cx('rounded-lg', variantClasses[variant], className)} data-component="animated-border">
      {children}
    </div>
  )
}

export type { AnimatedBorderProps }
