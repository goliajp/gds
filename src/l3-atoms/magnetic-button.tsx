// magnetic-button — element that subtly moves toward the cursor when hovering
import { forwardRef, useCallback, useRef, useState } from 'react'

import { cx } from '../utils/cx'
import { mergeRefs } from '../utils/dom'

export type MagneticButtonProps = {
  children: React.ReactNode
  strength?: number
  radius?: number
  className?: string
}

export const MagneticButton = forwardRef<HTMLDivElement, MagneticButtonProps>(
  function MagneticButton({ children, strength = 0.3, radius = 100, className }, ref) {
    const innerRef = useRef<HTMLDivElement>(null)
    const [transform, setTransform] = useState({ x: 0, y: 0 })

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        const el = innerRef.current
        if (el === null) return
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > radius) {
          setTransform({ x: 0, y: 0 })
          return
        }
        setTransform({ x: dx * strength, y: dy * strength })
      },
      [strength, radius],
    )

    const handleMouseLeave = useCallback(() => {
      setTransform({ x: 0, y: 0 })
    }, [])

    return (
      <div
        ref={mergeRefs(innerRef, ref)}
        data-component="magnetic-button"
        className={cx('inline-block', className)}
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px)`,
          transition: 'transform 200ms ease-out',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    )
  },
)
