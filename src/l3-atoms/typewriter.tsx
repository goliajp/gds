// typewriter — characters appear one by one
import { forwardRef, useEffect, useState } from 'react'

import { cx } from '../utils/cx'

export type TypewriterProps = {
  text: string
  speed?: number
  delay?: number
  cursor?: boolean
  onComplete?: () => void
  className?: string
}

export const Typewriter = forwardRef<HTMLSpanElement, TypewriterProps>(
  function Typewriter(
    { text, speed = 50, delay = 0, cursor = true, onComplete, className },
    ref,
  ) {
    const [length, setLength] = useState(0)
    const [started, setStarted] = useState(delay <= 0)

    useEffect(() => {
      if (delay <= 0) return
      const timer = setTimeout(() => setStarted(true), delay)
      return () => clearTimeout(timer)
    }, [delay])

    useEffect(() => {
      if (!started) return
      if (length >= text.length) {
        if (onComplete !== undefined) onComplete()
        return
      }
      const timer = setTimeout(() => setLength((prev) => prev + 1), speed)
      return () => clearTimeout(timer)
    }, [length, text.length, speed, started, onComplete])

    // reset when text changes
    useEffect(() => {
      setLength(0)
      if (delay <= 0) setStarted(true)
    }, [text, delay])

    return (
      <span ref={ref} className={cx(className)} data-component="typewriter">
        {text.slice(0, length)}
        {cursor && (
          <span
            className="inline-block animate-pulse"
            data-testid="cursor"
            aria-hidden
          >
            |
          </span>
        )}
      </span>
    )
  },
)
