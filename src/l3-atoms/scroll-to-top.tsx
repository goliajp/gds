// scroll-to-top — floating button that appears when scrolled down
import { forwardRef, useEffect, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

export type ScrollToTopProps = {
  threshold?: number
  smooth?: boolean
  className?: string
}

export const ScrollToTop = forwardRef<HTMLButtonElement, ScrollToTopProps>(
  function ScrollToTop({ threshold = 300, smooth = true, className }, ref) {
    const [visible, setVisible] = useState(() => {
      if (typeof window === 'undefined') return false
      return window.scrollY >= threshold
    })

    useEffect(() => {
      const handler = () => setVisible(window.scrollY >= threshold)
      window.addEventListener('scroll', handler, { passive: true })
      return () => window.removeEventListener('scroll', handler)
    }, [threshold])

    if (!visible) return null

    return (
      <button
        ref={ref}
        type="button"
        aria-label="Scroll to top"
        onClick={() =>
          window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' })
        }
        className={cx(
          'bg-accent text-accent-fg hover:bg-accent/90 fixed right-6 bottom-6 z-40 flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-opacity',
          focusCls,
          className
        )}
        data-component="scroll-to-top"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 12V4M4 7l4-3 4 3" />
        </svg>
      </button>
    )
  }
)
