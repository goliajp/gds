// image-preview — lightbox image viewer with fullscreen overlay
import { forwardRef, useCallback, useEffect, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { renderPortal } from '../utils/portal'

export type ImagePreviewProps = {
  src: string
  alt?: string
  thumbnailClassName?: string
  className?: string
}

export const ImagePreview = forwardRef<HTMLDivElement, ImagePreviewProps>(
  function ImagePreview({ src, alt = '', thumbnailClassName, className }, ref) {
    const [open, setOpen] = useState(false)

    const handleOpen = useCallback(() => setOpen(true), [])
    const handleClose = useCallback(() => setOpen(false), [])

    // escape key to close
    useEffect(() => {
      if (!open) return
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') handleClose()
      }
      window.addEventListener('keydown', handler)
      return () => window.removeEventListener('keydown', handler)
    }, [open, handleClose])

    // scroll lock when open
    useEffect(() => {
      if (!open) return
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }, [open])

    return (
      <div
        ref={ref}
        className={cx('inline-block', className)}
        data-component="image-preview"
      >
        {/* thumbnail */}
        <button
          type="button"
          onClick={handleOpen}
          className={cx('cursor-pointer border-0 bg-transparent p-0', focusCls)}
          aria-label={`Preview ${alt}`}
        >
          <img
            src={src}
            alt={alt}
            className={cx('gds-radius object-cover', thumbnailClassName)}
            data-testid="thumbnail"
          />
        </button>

        {/* lightbox overlay */}
        {open &&
          renderPortal(
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
              onClick={(e) => {
                if (e.target === e.currentTarget) handleClose()
              }}
              data-testid="lightbox"
            >
              {/* close button */}
              <button
                type="button"
                onClick={handleClose}
                className={cx(
                  'absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20',
                  focusCls
                )}
                aria-label="Close preview"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M3 3l10 10M13 3L3 13" />
                </svg>
              </button>

              {/* full image */}
              <img
                src={src}
                alt={alt}
                className="max-h-[90vh] max-w-[90vw] object-contain"
              />
            </div>
          )}
      </div>
    )
  }
)
