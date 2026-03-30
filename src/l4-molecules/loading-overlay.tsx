// loading-overlay — covers parent container with spinner + optional message
import { forwardRef } from 'react'

import { Spinner } from '../l2-primitives/spinner'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type LoadingOverlayProps = {
  visible: boolean
  message?: string
  glass?: boolean
  className?: string
}

const LoadingOverlay = forwardRef<HTMLDivElement, LoadingOverlayProps>(
  function LoadingOverlay({ visible, message, glass = true, className }, ref) {
    if (!visible) return null

    return (
      <div
        ref={ref}
        className={cx(
          'absolute inset-0 z-10 flex flex-col items-center justify-center',
          glass === true ? glassClass(true) : 'bg-bg/80',
          className
        )}
        data-component="loading-overlay"
      >
        <Spinner />
        {message !== undefined && (
          <span className="text-fg-muted mt-2 text-xs">{message}</span>
        )}
      </div>
    )
  }
)

export { LoadingOverlay }
export type { LoadingOverlayProps }
