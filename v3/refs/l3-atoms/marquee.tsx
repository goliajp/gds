// marquee — infinite horizontal scrolling content
import { forwardRef, useEffect, useRef, useState } from 'react'

import { cx } from '../utils/cx'

export type MarqueeProps = {
  children: React.ReactNode
  speed?: number
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
  className?: string
}

export const Marquee = forwardRef<HTMLDivElement, MarqueeProps>(
  function Marquee(
    {
      children,
      speed = 30,
      direction = 'left',
      pauseOnHover = true,
      className,
    },
    ref
  ) {
    const innerRef = useRef<HTMLDivElement>(null)
    const [duration, setDuration] = useState(10)

    useEffect(() => {
      if (innerRef.current === null) return
      const width = innerRef.current.scrollWidth / 2
      if (width > 0) setDuration(width / speed)
    }, [speed, children])

    const translateFrom = direction === 'left' ? '0%' : '-50%'
    const translateTo = direction === 'left' ? '-50%' : '0%'

    return (
      <div
        ref={ref}
        className={cx('overflow-hidden', className)}
        data-component="marquee"
      >
        <div
          ref={innerRef}
          className={cx(
            'inline-flex will-change-transform',
            pauseOnHover && 'hover:[animation-play-state:paused]'
          )}
          style={
            {
              animation: `marquee-scroll ${duration}s linear infinite`,
              '--marquee-from': translateFrom,
              '--marquee-to': translateTo,
            } as React.CSSProperties
          }
        >
          <div className="flex shrink-0">{children}</div>
          <div className="flex shrink-0" aria-hidden>
            {children}
          </div>
        </div>
      </div>
    )
  }
)
