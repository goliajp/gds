// scroll-progress — page scroll progress bar
import { forwardRef, useCallback, useEffect, useState } from 'react'

import { cx } from '../utils/cx'

type ScrollProgressProps = React.HTMLAttributes<HTMLDivElement> & {
  color?: string
  height?: number
}

export const ScrollProgress = forwardRef<HTMLDivElement, ScrollProgressProps>(
  function ScrollProgress({ className, color, height = 3, ...props }, ref) {
    const [progress, setProgress] = useState(0)

    const handleScroll = useCallback(() => {
      const scrollTop = document.documentElement.scrollTop
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      if (scrollHeight > 0) {
        setProgress((scrollTop / scrollHeight) * 100)
      }
    }, [])

    useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    return (
      <div
        className={cx('fixed top-0 right-0 left-0 z-50', className)}
        data-component="scroll-progress"
        ref={ref}
        style={{ height: `${height}px` }}
        {...props}
      >
        <div
          className="h-full bg-accent transition-[width] duration-100 ease-out"
          style={{
            width: `${progress}%`,
            ...(color !== undefined ? { backgroundColor: color } : {}),
          }}
        />
      </div>
    )
  },
)

export type { ScrollProgressProps }
