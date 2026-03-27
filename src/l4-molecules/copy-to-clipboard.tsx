// copy-to-clipboard — inline wrapper that copies a value on click with feedback tooltip
import type { ReactNode } from 'react'
import { forwardRef, useCallback, useRef, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

export type CopyToClipboardProps = {
  children: ReactNode
  value: string
  feedback?: string
  className?: string
}

export const CopyToClipboard = forwardRef<HTMLSpanElement, CopyToClipboardProps>(
  function CopyToClipboard({ children, value, feedback = 'Copied!', className }, ref) {
    const [showFeedback, setShowFeedback] = useState(false)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const handleClick = useCallback(() => {
      navigator.clipboard.writeText(value).then(() => {
        setShowFeedback(true)
        if (timerRef.current !== null) {
          clearTimeout(timerRef.current)
        }
        timerRef.current = setTimeout(() => {
          setShowFeedback(false)
          timerRef.current = null
        }, 2000)
      }).catch(() => {
        // clipboard api not available
      })
    }, [value])

    return (
      <span
        ref={ref}
        className={cx('relative inline-flex cursor-pointer select-none', focusCls, className)}
        data-component="copy-to-clipboard"
        onClick={handleClick}
        role="button"
        tabIndex={0}
      >
        {children}
        {showFeedback && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-fg px-2 py-0.5 text-[11px] whitespace-nowrap text-bg shadow-md">
            {feedback}
          </span>
        )}
      </span>
    )
  },
)
