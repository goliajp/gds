// tour — guided product tour with spotlight highlighting and step navigation
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

export type TourStep = {
  title: string
  description: string
  target?: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
  image?: string
}

export type TourProps = {
  steps: TourStep[]
  active: boolean
  onComplete: () => void
  onSkip?: () => void
  className?: string
}

export const Tour = forwardRef<HTMLDivElement, TourProps>(function Tour(
  { steps, active, onComplete, onSkip, className },
  ref
) {
  const [current, setCurrent] = useState(0)
  const [entering, setEntering] = useState(true)
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  // reset to first step when tour activates
  useEffect(() => {
    if (!active) return
    setCurrent(0)
    setEntering(true)
    const timer = setTimeout(() => setEntering(false), 300)
    return () => clearTimeout(timer)
  }, [active])

  // find and highlight target element
  useEffect(() => {
    if (!active) return
    const step = steps[current]
    if (step?.target === undefined) {
      setTargetRect(null)
      return
    }
    try {
      const el = document.querySelector(step.target)
      if (el !== null) {
        const rect = el.getBoundingClientRect()
        setTargetRect(rect)
        el.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      } else {
        setTargetRect(null)
      }
    } catch {
      setTargetRect(null)
    }
  }, [active, current, steps])

  const handleNext = useCallback(() => {
    if (current >= steps.length - 1) {
      onComplete()
      return
    }
    setEntering(true)
    setCurrent((p) => p + 1)
    setTimeout(() => setEntering(false), 200)
  }, [current, steps.length, onComplete])

  const handlePrev = useCallback(() => {
    if (current <= 0) return
    setEntering(true)
    setCurrent((p) => p - 1)
    setTimeout(() => setEntering(false), 200)
  }, [current])

  const handleSkip = useCallback(() => {
    onSkip?.()
  }, [onSkip])

  // keyboard navigation
  useEffect(() => {
    if (!active) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleSkip()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [active, handleNext, handlePrev, handleSkip])

  if (!active) return null

  const step = steps[current]
  if (step === undefined) return null

  const isFirst = current === 0
  const isLast = current === steps.length - 1
  const progress = ((current + 1) / steps.length) * 100

  // calculate card position near target
  const cardStyle = (() => {
    if (targetRect === null) return undefined
    const placement = step.placement ?? 'bottom'
    const padding = 16

    if (placement === 'bottom') {
      return {
        position: 'fixed' as const,
        top: `${targetRect.bottom + padding}px`,
        left: `${Math.max(16, targetRect.left + targetRect.width / 2 - 200)}px`,
      }
    }
    if (placement === 'top') {
      return {
        position: 'fixed' as const,
        bottom: `${window.innerHeight - targetRect.top + padding}px`,
        left: `${Math.max(16, targetRect.left + targetRect.width / 2 - 200)}px`,
      }
    }
    if (placement === 'right') {
      return {
        position: 'fixed' as const,
        top: `${Math.max(16, targetRect.top + targetRect.height / 2 - 80)}px`,
        left: `${targetRect.right + padding}px`,
      }
    }
    // left
    return {
      position: 'fixed' as const,
      top: `${Math.max(16, targetRect.top + targetRect.height / 2 - 80)}px`,
      right: `${window.innerWidth - targetRect.left + padding}px`,
    }
  })()

  return (
    <div
      ref={ref}
      className={cx('fixed inset-0 z-50', className)}
      data-component="tour"
    >
      {/* backdrop with spotlight cutout */}
      <svg
        className="absolute inset-0 h-full w-full"
        style={{ pointerEvents: 'none' }}
      >
        <defs>
          <mask id="tour-mask">
            <rect fill="white" height="100%" width="100%" x="0" y="0" />
            {targetRect !== null && (
              <rect
                fill="black"
                height={targetRect.height + 16}
                rx="8"
                width={targetRect.width + 16}
                x={targetRect.left - 8}
                y={targetRect.top - 8}
              />
            )}
          </mask>
        </defs>
        <rect
          className="fill-fg/40"
          height="100%"
          mask="url(#tour-mask)"
          width="100%"
          x="0"
          y="0"
        />
      </svg>

      {/* target highlight ring */}
      {targetRect !== null && (
        <div
          className="gds-radius ring-accent pointer-events-none fixed ring-2 ring-offset-2 ring-offset-transparent transition-all duration-300"
          style={{
            top: targetRect.top - 4,
            left: targetRect.left - 4,
            width: targetRect.width + 8,
            height: targetRect.height + 8,
          }}
        />
      )}

      {/* tour card */}
      <div
        ref={cardRef}
        className={cx(
          'gds-radius border-border bg-surface w-96 border shadow-2xl transition-all duration-200 select-none',
          entering ? 'scale-95 opacity-0' : 'scale-100 opacity-100',
          targetRect === null &&
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        )}
        role="dialog"
        style={cardStyle}
      >
        {/* progress bar */}
        <div className="bg-bg-tertiary h-1 overflow-hidden rounded-t-xl">
          <div
            className="bg-accent h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-1">
          <span className="text-fg-muted/40 text-[10px] tracking-widest uppercase">
            Step {current + 1} of {steps.length}
          </span>
          {onSkip !== undefined && (
            <button
              type="button"
              className={cx(
                'gds-radius-button text-fg-muted/40 hover:text-fg p-1 transition-colors',
                focusCls
              )}
              onClick={handleSkip}
              aria-label="Close tour"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
          )}
        </div>

        {/* content */}
        <div className="px-5 pb-2">
          <div className="text-fg text-base font-semibold">{step.title}</div>
          <p className="text-fg-muted mt-2 text-sm leading-relaxed">
            {step.description}
          </p>
          {step.image !== undefined && (
            <div className="gds-radius border-border/30 mt-3 overflow-hidden border">
              <img alt={step.title} className="w-full" src={step.image} />
            </div>
          )}
        </div>

        {/* footer */}
        <div className="flex items-center justify-between px-5 pt-2 pb-4">
          {/* dots */}
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <button
                key={i}
                type="button"
                className={cx(
                  'h-2 rounded-full transition-all',
                  i === current
                    ? 'bg-accent w-5'
                    : 'bg-fg-muted/20 hover:bg-fg-muted/40 w-2'
                )}
                onClick={() => {
                  setEntering(true)
                  setCurrent(i)
                  setTimeout(() => setEntering(false), 200)
                }}
              />
            ))}
          </div>

          {/* nav buttons */}
          <div className="flex items-center gap-2">
            {!isFirst && (
              <button
                type="button"
                className={cx(
                  'gds-radius-button text-fg-muted hover:bg-bg-tertiary hover:text-fg flex h-8 items-center gap-1 px-3 text-xs transition-colors',
                  focusCls
                )}
                onClick={handlePrev}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 3L5 8l5 5" />
                </svg>
                Back
              </button>
            )}
            <button
              type="button"
              className={cx(
                'gds-radius-button bg-accent text-accent-fg hover:bg-accent/90 flex h-8 items-center gap-1 px-4 text-xs font-medium transition-colors',
                focusCls
              )}
              onClick={handleNext}
            >
              {isLast ? 'Done' : 'Next'}
              {!isLast && (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 3l5 5-5 5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})
