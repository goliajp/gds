// tilt-card — mouse-tracking 3D tilt effect card
import type { ReactNode } from 'react'
import { forwardRef, useCallback, useRef, useState } from 'react'

import { cx } from '../utils/cx'

export type TiltCardProps = {
  children: ReactNode
  className?: string
  glare?: boolean
  maxTilt?: number
}

export const TiltCard = forwardRef<HTMLDivElement, TiltCardProps>(
  function TiltCard({ children, className, glare, maxTilt = 15 }, ref) {
    const innerRef = useRef<HTMLDivElement | null>(null)
    const [transform, setTransform] = useState(
      'perspective(800px) rotateX(0deg) rotateY(0deg)'
    )
    const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({})

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        const el = innerRef.current
        if (el === null) return

        const rect = el.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height
        const rotateX = (0.5 - y) * maxTilt * 2
        const rotateY = (x - 0.5) * maxTilt * 2

        setTransform(
          `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
        )

        if (glare === true) {
          setGlareStyle({
            background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.15), transparent 60%)`,
          })
        }
      },
      [maxTilt, glare]
    )

    const handleMouseLeave = useCallback(() => {
      setTransform('perspective(800px) rotateX(0deg) rotateY(0deg)')
      setGlareStyle({})
    }, [])

    return (
      <div
        ref={(node) => {
          innerRef.current = node
          if (typeof ref === 'function') ref(node)
          else if (ref !== null && ref !== undefined) {
            ;(ref as React.MutableRefObject<HTMLDivElement | null>).current =
              node
          }
        }}
        className={cx(
          'relative overflow-hidden transition-transform duration-150 ease-out',
          className
        )}
        style={{ transform }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-component="tilt-card"
      >
        {children}
        {glare === true && (
          <div
            className="pointer-events-none absolute inset-0"
            style={glareStyle}
          />
        )}
      </div>
    )
  }
)
