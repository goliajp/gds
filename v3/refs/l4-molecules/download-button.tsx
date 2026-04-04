// download-button — button with progress and completion state for downloads
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

export type DownloadButtonProps = {
  label: string
  progress?: number
  complete?: boolean
  onClick: () => void
  disabled?: boolean
  className?: string
}

export const DownloadButton = forwardRef<
  HTMLButtonElement,
  DownloadButtonProps
>(function DownloadButton(
  { label, progress, complete = false, onClick, disabled = false, className },
  ref
) {
  const isDownloading = progress !== undefined && !complete
  const isDisabled = disabled || isDownloading

  return (
    <button
      ref={ref}
      type="button"
      className={cx(
        'gds-radius-button border-border bg-bg text-fg inline-flex items-center gap-2 border px-4 py-2 text-sm font-medium transition-colors select-none',
        'hover:bg-bg-secondary',
        isDisabled && 'cursor-not-allowed opacity-50',
        complete && 'border-success/30 text-success',
        focusCls,
        className
      )}
      data-component="download-button"
      disabled={isDisabled}
      onClick={onClick}
    >
      {complete && (
        <>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 8.5l4 4 6-7" />
          </svg>
          <span>Downloaded</span>
        </>
      )}
      {!complete && isDownloading && (
        <>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="animate-spin"
          >
            <path d="M8 2a6 6 0 1 0 6 6" />
          </svg>
          <span className="tabular-nums">{progress}%</span>
        </>
      )}
      {!complete && !isDownloading && (
        <>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 2v8M4.5 7.5L8 11l3.5-3.5" />
            <path d="M3 13h10" />
          </svg>
          <span>{label}</span>
        </>
      )}
    </button>
  )
})
