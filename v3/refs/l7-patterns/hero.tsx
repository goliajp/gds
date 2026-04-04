// hero — landing page above-the-fold section
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

export type HeroProps = {
  title: string
  subtitle?: string
  actions?: ReactNode
  media?: ReactNode
  align?: 'left' | 'center'
  glass?: boolean
  className?: string
}

export const Hero = forwardRef<HTMLDivElement, HeroProps>(function Hero(
  { title, subtitle, actions, media, align = 'center', glass, className },
  ref
) {
  const isCenter = align === 'center'

  return (
    <section
      ref={ref}
      className={cx(
        'w-full py-16',
        isCenter ? 'text-center' : 'flex items-center gap-12',
        glass && glassClass(true),
        className
      )}
      data-component="hero"
      data-variant={align}
    >
      <div className={cx(isCenter ? 'mx-auto max-w-2xl' : 'flex-1')}>
        <h1 className="text-fg text-4xl font-bold">{title}</h1>
        {subtitle !== undefined && (
          <p className="text-fg-muted mt-3 text-lg">{subtitle}</p>
        )}
        {actions !== undefined && <div className="mt-6">{actions}</div>}
        {isCenter && media !== undefined && <div className="mt-8">{media}</div>}
      </div>
      {!isCenter && media !== undefined && (
        <div className="flex-1">{media}</div>
      )}
    </section>
  )
})
