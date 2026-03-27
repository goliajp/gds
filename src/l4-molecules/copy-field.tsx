// copy-field — read-only text field with copy button
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'

import { cx } from '../utils/cx'

type CopyFieldProps = {
  value: string
  label?: string
  masked?: boolean
  className?: string
}

const CopyField = forwardRef<HTMLDivElement, CopyFieldProps>(
  function CopyField({ value, label, masked = false, className }, ref) {
    const [copied, setCopied] = useState(false)
    const [revealed, setRevealed] = useState(false)
    const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

    useEffect(() => {
      return () => { if (timerRef.current !== null) clearTimeout(timerRef.current) }
    }, [])

    const handleCopy = useCallback(() => {
      navigator.clipboard.writeText(value).catch(() => {})
      setCopied(true)
      if (timerRef.current !== null) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setCopied(false), 1500)
    }, [value])

    const display = masked && !revealed ? '\u2022'.repeat(Math.min(value.length, 20)) : value

    return (
      <div ref={ref} className={cx('flex flex-col gap-1', className)} data-component="copy-field">
        {label !== undefined && <label className="text-xs text-fg-muted select-none">{label}</label>}
        <div className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5">
          <span
            className="flex-1 truncate font-mono text-sm text-fg select-all"
            onMouseEnter={masked ? () => setRevealed(true) : undefined}
            onMouseLeave={masked ? () => setRevealed(false) : undefined}
          >
            {display}
          </span>
          <button type="button" onClick={handleCopy} className="shrink-0 text-fg-muted hover:text-fg transition-colors" aria-label="Copy">
            {copied ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 7l3 3 7-7" /></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="4" y="4" width="8" height="8" rx="1.5" /><path d="M10 4V2.5A1.5 1.5 0 008.5 1h-6A1.5 1.5 0 001 2.5v6A1.5 1.5 0 002.5 10H4" />
              </svg>
            )}
          </button>
        </div>
      </div>
    )
  },
)

export { CopyField }
export type { CopyFieldProps }
