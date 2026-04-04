// upload-progress — file upload progress list with status and actions
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

export type UploadFile = {
  error?: string
  name: string
  progress: number
  status: 'done' | 'error' | 'uploading'
}

export type UploadProgressProps = {
  className?: string
  files: UploadFile[]
  onCancel?: (name: string) => void
  onRetry?: (name: string) => void
}

const checkIcon = (
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
    <path d="M3 8l3 3 7-7" />
  </svg>
)

const alertIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <circle cx="8" cy="8" r="6" />
    <path d="M8 5v3M8 10.5v.5" />
  </svg>
)

const closeIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M3 3l8 8M11 3l-8 8" />
  </svg>
)

const retryIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 2v4h4M13 12V8H9" />
    <path d="M3.5 9A5 5 0 0112.5 7M10.5 5A5 5 0 001.5 7" />
  </svg>
)

export const UploadProgress = forwardRef<HTMLDivElement, UploadProgressProps>(
  function UploadProgress({ className, files, onCancel, onRetry }, ref) {
    return (
      <div
        ref={ref}
        className={cx('gds-gap-sm flex flex-col', className)}
        data-component="upload-progress"
      >
        {files.map((file) => (
          <div
            key={file.name}
            className="gds-gap-sm gds-pad-x gds-pad-y border-border bg-surface flex flex-col rounded border"
          >
            <div className="gds-gap-sm flex items-center">
              {file.status === 'done' && (
                <span className="text-success shrink-0">{checkIcon}</span>
              )}
              {file.status === 'error' && (
                <span className="text-danger shrink-0">{alertIcon}</span>
              )}
              {file.status === 'uploading' && (
                <span className="border-accent h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-t-transparent" />
              )}
              <span className="gds-text text-fg min-w-0 flex-1 truncate">
                {file.name}
              </span>
              {file.status === 'uploading' && onCancel !== undefined && (
                <button
                  type="button"
                  aria-label={`Cancel ${file.name}`}
                  className={cx(
                    'text-fg-muted hover:text-fg shrink-0 p-0.5',
                    focusCls
                  )}
                  onClick={() => onCancel(file.name)}
                >
                  {closeIcon}
                </button>
              )}
              {file.status === 'error' && onRetry !== undefined && (
                <button
                  type="button"
                  aria-label={`Retry ${file.name}`}
                  className={cx(
                    'text-fg-muted hover:text-fg shrink-0 p-0.5',
                    focusCls
                  )}
                  onClick={() => onRetry(file.name)}
                >
                  {retryIcon}
                </button>
              )}
            </div>
            {file.status === 'uploading' && (
              <div className="bg-bg-tertiary h-1.5 w-full overflow-hidden rounded-full">
                <div
                  className="bg-accent h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(100, Math.max(0, file.progress))}%`,
                  }}
                />
              </div>
            )}
            {file.status === 'error' && file.error !== undefined && (
              <span className="text-danger text-xs">{file.error}</span>
            )}
          </div>
        ))}
      </div>
    )
  }
)
