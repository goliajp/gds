// cookie-banner — GDPR-style consent banner with accept/reject
import { forwardRef } from 'react'

import { Button } from '../l2-primitives/button'
import { cx } from '../utils/cx'
import { renderPortal } from '../utils/portal'

type CookieBannerProps = {
  onAccept: () => void
  onReject?: () => void
  message?: string
  className?: string
}

const defaultMessage =
  'We use cookies to improve your experience. By continuing to use this site, you agree to our use of cookies.'

const CookieBannerInner = forwardRef<HTMLDivElement, CookieBannerProps>(
  function CookieBannerInner({ onAccept, onReject, message, className }, ref) {
    return (
      <div
        ref={ref}
        className={cx(
          'border-border bg-surface/80 fixed inset-x-0 bottom-0 z-50 flex items-center justify-between gap-4 border-t px-6 py-4 backdrop-blur-lg',
          className
        )}
        data-component="cookie-banner"
        role="banner"
      >
        <p className="text-fg-muted flex-1 text-sm">
          {message ?? defaultMessage}
        </p>
        <div className="flex shrink-0 gap-2">
          {onReject !== undefined && (
            <Button variant="ghost" size="sm" onClick={onReject}>
              Reject
            </Button>
          )}
          <Button variant="primary" size="sm" onClick={onAccept}>
            Accept
          </Button>
        </div>
      </div>
    )
  }
)

const CookieBanner = forwardRef<HTMLDivElement, CookieBannerProps>(
  function CookieBanner(props, ref) {
    return renderPortal(<CookieBannerInner {...props} ref={ref} />)
  }
)

export { CookieBanner }
export type { CookieBannerProps }
