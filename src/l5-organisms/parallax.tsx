// parallax — container where children move at different speeds on scroll
import type { ReactNode } from 'react'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'

import { cx } from '../utils/cx'

export type ParallaxProps = {
  children: ReactNode
  speed?: number
  direction?: 'horizontal' | 'vertical'
  disabled?: boolean
  className?: string
}

export const Parallax = forwardRef<HTMLDivElement, ParallaxProps>(
  function Parallax({ children, speed = 0.5, direction = 'vertical', disabled = false, className }, ref) {
    const innerRef = useRef<HTMLDivElement | null>(null)
    const [offset, setOffset] = useState(0)
    const rafRef = useRef<number>(0)

    const handleScroll = useCallback(() => {
      if (rafRef.current !== 0) return
      rafRef.current = requestAnimationFrame(() => {
        const el = innerRef.current
        if (el !== null) {
          const rect = el.getBoundingClientRect()
          const scrollOffset = direction === 'vertical'
            ? -rect.top * speed
            : -rect.left * speed
          setOffset(scrollOffset)
        }
        rafRef.current = 0
      })
    }, [speed, direction])

    useEffect(() => {
      if (disabled) return
      window.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll()
      return () => {
        window.removeEventListener('scroll', handleScroll)
        if (rafRef.current !== 0) {
          cancelAnimationFrame(rafRef.current)
        }
      }
    }, [disabled, handleScroll])

    // check prefers-reduced-motion
    const prefersReducedMotion = useRef(false)
    useEffect(() => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      prefersReducedMotion.current = mq.matches
    }, [])

    const shouldDisable = disabled || prefersReducedMotion.current

    const transform = shouldDisable
      ? undefined
      : direction === 'vertical'
        ? `translateY(${offset}px)`
        : `translateX(${offset}px)`

    return (
      <div
        ref={(node) => {
          innerRef.current = node
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref !== null && ref !== undefined) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
          }
        }}
        className={cx('will-change-transform', className)}
        style={transform !== undefined ? { transform } : undefined}
        data-component="parallax"
      >
        {children}
      </div>
    )
  },
)
