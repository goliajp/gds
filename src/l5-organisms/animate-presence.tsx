// animate-presence — animates children on mount/unmount
import type { ReactNode } from 'react'
import { forwardRef, useEffect, useRef, useState } from 'react'

import { cx } from '../utils/cx'

type AnimatePresenceAnimation = 'fade' | 'scale' | 'slide-up' | 'slide-down'

export type AnimatePresenceProps = {
  children: ReactNode
  animation?: AnimatePresenceAnimation
  duration?: number
  className?: string
}

const enterClassMap: Record<AnimatePresenceAnimation, string> = {
  fade: 'animate-fade-in',
  scale: 'animate-scale-in',
  'slide-up': 'animate-slide-up',
  'slide-down': 'animate-slide-down',
}

const exitClassMap: Record<AnimatePresenceAnimation, string> = {
  fade: 'animate-fade-out',
  scale: 'animate-scale-out',
  'slide-up': 'animate-slide-down',
  'slide-down': 'animate-slide-up',
}

export const AnimatePresence = forwardRef<HTMLDivElement, AnimatePresenceProps>(
  function AnimatePresence(
    { children, animation = 'fade', duration = 200, className },
    ref,
  ) {
    const [rendered, setRendered] = useState(children !== null && children !== undefined && children !== false)
    const [exiting, setExiting] = useState(false)
    const prevChildrenRef = useRef<ReactNode>(children)
    const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

    const hasChildren = children !== null && children !== undefined && children !== false

    useEffect(() => {
      if (hasChildren) {
        // entering
        if (timerRef.current !== null) {
          clearTimeout(timerRef.current)
          timerRef.current = null
        }
        setExiting(false)
        setRendered(true)
        prevChildrenRef.current = children
      } else if (rendered && !exiting) {
        // exiting
        setExiting(true)
        timerRef.current = setTimeout(() => {
          setRendered(false)
          setExiting(false)
          timerRef.current = null
        }, duration)
      }
    }, [hasChildren, children, duration, rendered, exiting])

    // cleanup timer on unmount
    useEffect(() => {
      return () => {
        if (timerRef.current !== null) clearTimeout(timerRef.current)
      }
    }, [])

    if (!rendered) return null

    const animClass = exiting ? exitClassMap[animation] : enterClassMap[animation]
    const displayChildren = exiting ? prevChildrenRef.current : children

    return (
      <div
        ref={ref}
        className={cx(animClass, className)}
        style={{ animationDuration: `${duration}ms` }}
        data-component="animate-presence"
        data-state={exiting ? 'exiting' : 'entering'}
      >
        {displayChildren}
      </div>
    )
  },
)
