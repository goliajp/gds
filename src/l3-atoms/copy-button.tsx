// copy-button — button that copies text to clipboard with feedback
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'

import { Button } from '../l2-primitives/button'
import { cx } from '../utils/cx'

export type CopyButtonProps = {
  text: string
  label?: string
  copiedLabel?: string
  variant?: 'default' | 'ghost'
  size?: 'default' | 'sm'
  className?: string
}

export const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
  function CopyButton(
    {
      text,
      label = 'Copy',
      copiedLabel = 'Copied!',
      variant = 'default',
      size = 'default',
      className,
    },
    ref
  ) {
    const [copied, setCopied] = useState(false)
    const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

    useEffect(() => {
      return () => {
        if (timerRef.current !== null) clearTimeout(timerRef.current)
      }
    }, [])

    const handleCopy = useCallback(() => {
      navigator.clipboard.writeText(text).catch(() => {})
      setCopied(true)
      if (timerRef.current !== null) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setCopied(false), 1500)
    }, [text])

    const buttonVariant = variant === 'ghost' ? 'ghost' : 'secondary'

    return (
      <Button
        ref={ref}
        variant={buttonVariant}
        size={size}
        className={cx(className)}
        onClick={handleCopy}
        data-component="copy-button"
        icon={
          copied ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M2 7l3 3 7-7" />
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="4" y="4" width="8" height="8" rx="1.5" />
              <path d="M10 4V2.5A1.5 1.5 0 008.5 1h-6A1.5 1.5 0 001 2.5v6A1.5 1.5 0 002.5 10H4" />
            </svg>
          )
        }
      >
        {copied ? copiedLabel : label}
      </Button>
    )
  }
)
