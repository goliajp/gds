import { forwardRef } from 'react'
import { createPortal } from 'react-dom'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type ScreenOverlayProps = {
  visible: boolean
  glass?: boolean
  onClick?: () => void
  className?: string
}

const ScreenOverlayInner = forwardRef<HTMLDivElement, ScreenOverlayProps>(
  function ScreenOverlayInner({ visible, glass, onClick, className }, ref) {
    if (!visible) return null

    return (
      <div
        className={cx(
          'fixed inset-0 z-40',
          glass === true ? glassClass(true) : 'bg-black/50',
          className,
        )}
        data-component="screen-overlay"
        onClick={onClick}
        ref={ref}
      />
    )
  },
)

export const ScreenOverlay = forwardRef<HTMLDivElement, ScreenOverlayProps>(
  function ScreenOverlay(props, ref) {
    if (typeof document === 'undefined') return null
    return createPortal(<ScreenOverlayInner ref={ref} {...props} />, document.body)
  },
)

export type { ScreenOverlayProps }
