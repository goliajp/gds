// spotlight — dims everything except a target element for onboarding/tutorials
import type { ReactNode } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { cx } from '../utils/cx'
import { renderPortal } from '../utils/portal'

type Rect = { top: number; left: number; width: number; height: number }

export type SpotlightProps = {
  active: boolean
  targetRef: React.RefObject<HTMLElement | null>
  title?: string
  description?: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
  onClose?: () => void
  className?: string
}

function useTargetRect(
  targetRef: React.RefObject<HTMLElement | null>,
  active: boolean,
): Rect | null {
  const [rect, setRect] = useState<Rect | null>(null)

  useEffect(() => {
    if (!active) {
      setRect(null)
      return
    }
    const el = targetRef.current
    if (el === null) return

    const measure = () => {
      const r = el.getBoundingClientRect()
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height })
    }
    measure()

    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, true)
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure, true)
    }
  }, [active, targetRef])

  return rect
}

function computeCardStyle(
  rect: Rect,
  placement: 'top' | 'bottom' | 'left' | 'right',
): React.CSSProperties {
  const gap = 12
  const base: React.CSSProperties = { position: 'fixed' }

  if (placement === 'bottom') {
    return { ...base, top: rect.top + rect.height + gap, left: rect.left }
  }
  if (placement === 'top') {
    return { ...base, bottom: window.innerHeight - rect.top + gap, left: rect.left }
  }
  if (placement === 'left') {
    return { ...base, top: rect.top, right: window.innerWidth - rect.left + gap }
  }
  // right
  return { ...base, top: rect.top, left: rect.left + rect.width + gap }
}

export function Spotlight({
  active,
  targetRef,
  title,
  description,
  placement = 'bottom',
  onClose,
  className,
}: SpotlightProps): ReactNode {
  const rect = useTargetRect(targetRef, active)

  // escape key
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && onCloseRef.current !== undefined) {
      onCloseRef.current()
    }
  }, [])

  useEffect(() => {
    if (!active) return
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [active, handleEscape])

  if (!active || rect === null) return null

  const pad = 6
  const overlay = (
    <div
      className={cx('fixed inset-0 z-[9998]', className)}
      data-component="spotlight"
      onClick={onClose}
    >
      {/* highlight hole via box-shadow */}
      <div
        className="absolute rounded-md"
        style={{
          top: rect.top - pad,
          left: rect.left - pad,
          width: rect.width + pad * 2,
          height: rect.height + pad * 2,
          boxShadow: '0 0 0 9999px rgba(0,0,0,0.6)',
          pointerEvents: 'none',
        }}
      />

      {/* tooltip card */}
      <div
        className="z-[9999] max-w-xs rounded-lg border border-white/10 bg-bg-secondary p-4 shadow-lg"
        style={computeCardStyle(rect, placement)}
        onClick={(e) => e.stopPropagation()}
      >
        {title !== undefined && (
          <p className="text-sm font-semibold text-fg">{title}</p>
        )}
        {description !== undefined && (
          <p className="mt-1 text-xs text-fg-muted">{description}</p>
        )}
        {onClose !== undefined && (
          <button
            className="mt-3 text-xs font-medium text-accent hover:text-accent/80"
            onClick={onClose}
          >
            Got it
          </button>
        )}
      </div>
    </div>
  )

  return renderPortal(overlay)
}
