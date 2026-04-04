// carousel — horizontal slide carousel with prev/next navigation
import type { ReactNode } from 'react'
import {
  Children,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

export type CarouselProps = {
  children: ReactNode
  autoPlay?: boolean
  interval?: number
  showDots?: boolean
  showArrows?: boolean
  glass?: boolean
  className?: string
}

const ArrowLeft = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 3L5 8l5 5" />
  </svg>
)

const ArrowRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 3l5 5-5 5" />
  </svg>
)

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  function Carousel(
    {
      children,
      autoPlay = false,
      interval = 5000,
      showDots = true,
      showArrows = true,
      glass = false,
      className,
    },
    ref
  ) {
    const slides = Children.toArray(children)
    const count = slides.length
    const [activeIndex, setActiveIndex] = useState(0)
    const hoverRef = useRef(false)
    const touchStartRef = useRef<number | null>(null)

    const goTo = useCallback(
      (index: number) => {
        const next = ((index % count) + count) % count
        setActiveIndex(next)
      },
      [count]
    )

    const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])
    const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])

    // auto-play
    useEffect(() => {
      if (!autoPlay || count <= 1) return
      const id = setInterval(() => {
        if (!hoverRef.current) {
          setActiveIndex((prev) => (prev + 1) % count)
        }
      }, interval)
      return () => clearInterval(id)
    }, [autoPlay, interval, count])

    // touch handling
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
      touchStartRef.current = e.touches[0].clientX
    }, [])

    const handleTouchEnd = useCallback(
      (e: React.TouchEvent) => {
        if (touchStartRef.current === null) return
        const diff = e.changedTouches[0].clientX - touchStartRef.current
        if (Math.abs(diff) > 50) {
          if (diff < 0) goNext()
          else goPrev()
        }
        touchStartRef.current = null
      },
      [goNext, goPrev]
    )

    return (
      <div
        ref={ref}
        className={cx(
          'gds-radius relative overflow-hidden',
          glass && glassClass(glass),
          className
        )}
        data-component="carousel"
        onMouseEnter={() => {
          hoverRef.current = true
        }}
        onMouseLeave={() => {
          hoverRef.current = false
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* slides track */}
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="w-full shrink-0" data-slide={i}>
              {slide}
            </div>
          ))}
        </div>

        {/* arrows */}
        {showArrows && count > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className={cx(
                'border-border bg-bg/80 text-fg hover:bg-bg absolute top-1/2 left-2 -translate-y-1/2 rounded-full border p-1.5 transition-colors',
                focusCls
              )}
              aria-label="Previous slide"
            >
              <ArrowLeft />
            </button>
            <button
              type="button"
              onClick={goNext}
              className={cx(
                'border-border bg-bg/80 text-fg hover:bg-bg absolute top-1/2 right-2 -translate-y-1/2 rounded-full border p-1.5 transition-colors',
                focusCls
              )}
              aria-label="Next slide"
            >
              <ArrowRight />
            </button>
          </>
        )}

        {/* dots */}
        {showDots && count > 1 && (
          <div
            className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5"
            role="tablist"
          >
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Slide ${i + 1}`}
                className={cx(
                  'h-2 w-2 rounded-full transition-all',
                  i === activeIndex
                    ? 'bg-accent scale-125'
                    : 'bg-fg-muted/30 hover:bg-fg-muted/50',
                  focusCls
                )}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
)
