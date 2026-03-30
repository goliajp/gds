// splash-screen — full-screen loading splash during app initialization
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type SplashScreenProps = React.HTMLAttributes<HTMLDivElement> & {
  logo?: ReactNode
  message?: string
  title?: string
  visible: boolean
}

// inline spinner to avoid circular dependency with L2
function SplashSpinner() {
  return (
    <svg
      className="text-accent h-5 w-5 animate-spin"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        fill="currentColor"
      />
    </svg>
  )
}

export const SplashScreen = forwardRef<HTMLDivElement, SplashScreenProps>(
  function SplashScreen(
    { className, logo, message, title, visible, ...props },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cx(
          'bg-bg fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-300',
          visible === true ? 'opacity-100' : 'pointer-events-none opacity-0',
          className
        )}
        data-component="splash-screen"
        data-visible={visible}
        {...props}
      >
        {logo !== undefined && <div className="mb-6">{logo}</div>}
        {title !== undefined && (
          <h1 className="text-fg mb-2 text-lg font-semibold">{title}</h1>
        )}
        {message !== undefined && (
          <p className="text-fg-muted mb-8 text-sm">{message}</p>
        )}
        <SplashSpinner />
      </div>
    )
  }
)
