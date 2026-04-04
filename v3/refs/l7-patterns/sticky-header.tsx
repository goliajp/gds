import { forwardRef, useEffect, useState } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type StickyHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  glass?: boolean
  threshold?: number
}

export const StickyHeader = forwardRef<HTMLDivElement, StickyHeaderProps>(
  function StickyHeader(
    { children, className, glass = true, threshold = 0, ...props },
    ref
  ) {
    const [isSticky, setIsSticky] = useState(false)

    useEffect(() => {
      function handleScroll() {
        setIsSticky(window.scrollY > threshold)
      }
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }, [threshold])

    return (
      <div
        className={cx(
          'sticky top-0 z-40 transition-[background-color,box-shadow] duration-200',
          isSticky && 'bg-bg/80 shadow-md',
          isSticky && glass && glassClass(true),
          className
        )}
        data-component="sticky-header"
        data-sticky={isSticky}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)

export type { StickyHeaderProps }
