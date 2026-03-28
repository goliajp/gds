import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import { renderPortal } from '../utils/portal'

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
    return renderPortal(<ScreenOverlayInner ref={ref} {...props} />)
  },
)

export type { ScreenOverlayProps }
