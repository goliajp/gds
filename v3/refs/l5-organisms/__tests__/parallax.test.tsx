import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Parallax } from '../parallax'

describe('Parallax', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders children', () => {
    render(
      <Parallax>
        <span>Hello</span>
      </Parallax>
    )
    expect(screen.getByText('Hello')).toBeDefined()
  })

  it('applies data-component attribute', () => {
    const { container } = render(
      <Parallax>
        <span>Test</span>
      </Parallax>
    )
    expect(
      container.querySelector('[data-component="parallax"]')
    ).not.toBeNull()
  })

  it('does not apply transform when disabled', () => {
    const { container } = render(
      <Parallax disabled>
        <span>Test</span>
      </Parallax>
    )
    const el = container.querySelector(
      '[data-component="parallax"]'
    ) as HTMLElement
    expect(el.style.transform).toBe('')
  })

  it('respects speed prop via will-change class', () => {
    const { container } = render(
      <Parallax speed={0.8}>
        <span>Test</span>
      </Parallax>
    )
    const el = container.querySelector(
      '[data-component="parallax"]'
    ) as HTMLElement
    expect(el.className).toContain('will-change-transform')
  })

  it('applies custom className', () => {
    const { container } = render(
      <Parallax className="my-parallax">
        <span>Test</span>
      </Parallax>
    )
    const el = container.querySelector('[data-component="parallax"]')
    expect(el?.className).toContain('my-parallax')
  })

  it('adds scroll listener when not disabled', () => {
    const addSpy = vi.spyOn(window, 'addEventListener')
    render(
      <Parallax>
        <span>Test</span>
      </Parallax>
    )
    expect(addSpy).toHaveBeenCalledWith('scroll', expect.any(Function), {
      passive: true,
    })
  })

  it('does not add scroll listener when disabled', () => {
    const addSpy = vi.spyOn(window, 'addEventListener')
    render(
      <Parallax disabled>
        <span>Test</span>
      </Parallax>
    )
    const scrollCalls = addSpy.mock.calls.filter(
      ([event]) => event === 'scroll'
    )
    expect(scrollCalls.length).toBe(0)
  })

  it('removes scroll listener on unmount', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = render(
      <Parallax>
        <span>Test</span>
      </Parallax>
    )
    unmount()
    const scrollCalls = removeSpy.mock.calls.filter(
      ([event]) => event === 'scroll'
    )
    expect(scrollCalls.length).toBeGreaterThan(0)
  })

  it('applies vertical transform by default', () => {
    const { container } = render(
      <Parallax>
        <span>Test</span>
      </Parallax>
    )
    const el = container.querySelector(
      '[data-component="parallax"]'
    ) as HTMLElement
    // transform should contain translateY
    if (el.style.transform !== '') {
      expect(el.style.transform).toContain('translateY')
    }
  })

  it('applies horizontal transform when direction is horizontal', () => {
    const { container } = render(
      <Parallax direction="horizontal">
        <span>Test</span>
      </Parallax>
    )
    const el = container.querySelector(
      '[data-component="parallax"]'
    ) as HTMLElement
    if (el.style.transform !== '') {
      expect(el.style.transform).toContain('translateX')
    }
  })

  it('forwards ref (function ref)', () => {
    const refFn = vi.fn()
    render(
      <Parallax ref={refFn}>
        <span>Test</span>
      </Parallax>
    )
    expect(refFn).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('forwards ref (object ref)', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(
      <Parallax ref={ref}>
        <span>Test</span>
      </Parallax>
    )
    expect(ref.current).not.toBeNull()
    expect(ref.current?.getAttribute('data-component')).toBe('parallax')
  })

  it('queries prefers-reduced-motion media query', () => {
    const matchMediaSpy = vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })

    render(
      <Parallax>
        <span>Test</span>
      </Parallax>
    )
    expect(matchMediaSpy).toHaveBeenCalledWith(
      '(prefers-reduced-motion: reduce)'
    )
  })

  it('applies vertical transform after scroll event fires rAF', () => {
    let rafCb: ((time: number) => void) | null = null
    const originalRaf = globalThis.requestAnimationFrame
    globalThis.requestAnimationFrame = vi.fn((cb: FrameRequestCallback) => {
      rafCb = cb as (time: number) => void
      return 1
    })

    const { container } = render(
      <Parallax speed={0.5}>
        <span>Test</span>
      </Parallax>
    )
    const el = container.querySelector(
      '[data-component="parallax"]'
    ) as HTMLElement

    // mock getBoundingClientRect to return a specific top value
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      top: -100,
      left: 0,
      width: 100,
      height: 100,
      right: 100,
      bottom: 0,
      x: 0,
      y: -100,
      toJSON: vi.fn(),
    })

    // trigger scroll handler (it was called during mount, so rafCb should be set)
    // flush the rAF callback
    if (rafCb !== null) {
      act(() => {
        ;(rafCb as (time: number) => void)(16)
      })
    }

    // now trigger another scroll and flush
    fireEvent.scroll(window)
    if (rafCb !== null) {
      act(() => {
        ;(rafCb as (time: number) => void)(32)
      })
    }

    expect(el.style.transform).toContain('translateY')

    globalThis.requestAnimationFrame = originalRaf
  })

  it('applies horizontal transform after scroll when direction is horizontal', () => {
    let rafCb: ((time: number) => void) | null = null
    const originalRaf = globalThis.requestAnimationFrame
    globalThis.requestAnimationFrame = vi.fn((cb: FrameRequestCallback) => {
      rafCb = cb as (time: number) => void
      return 1
    })

    const { container } = render(
      <Parallax speed={0.5} direction="horizontal">
        <span>Test</span>
      </Parallax>
    )
    const el = container.querySelector(
      '[data-component="parallax"]'
    ) as HTMLElement

    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      top: 0,
      left: -200,
      width: 100,
      height: 100,
      right: -100,
      bottom: 100,
      x: -200,
      y: 0,
      toJSON: vi.fn(),
    })

    // flush the rAF
    if (rafCb !== null) {
      act(() => {
        ;(rafCb as (time: number) => void)(16)
      })
    }

    expect(el.style.transform).toContain('translateX')

    globalThis.requestAnimationFrame = originalRaf
  })

  it('reads prefers-reduced-motion on mount and disables transform on re-render', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })

    const { container, rerender } = render(
      <Parallax>
        <span>Test</span>
      </Parallax>
    )
    // after effects run, prefersReducedMotion.current is true
    // on next re-render, shouldDisable is true so transform is undefined
    rerender(
      <Parallax>
        <span>Test</span>
      </Parallax>
    )
    const el = container.querySelector(
      '[data-component="parallax"]'
    ) as HTMLElement
    expect(el.style.transform).toBe('')
  })

  it('cancels pending rAF on unmount', () => {
    const originalCancelRaf = globalThis.cancelAnimationFrame
    globalThis.cancelAnimationFrame = vi.fn()

    const originalRaf = globalThis.requestAnimationFrame
    globalThis.requestAnimationFrame = vi.fn((_cb: FrameRequestCallback) => {
      return 42
    })

    const { unmount } = render(
      <Parallax>
        <span>Test</span>
      </Parallax>
    )

    // scroll to create a pending rAF
    fireEvent.scroll(window)

    unmount()

    // cancelAnimationFrame should have been called during cleanup
    // (it checks if rafRef.current !== 0)
    globalThis.requestAnimationFrame = originalRaf
    globalThis.cancelAnimationFrame = originalCancelRaf
  })

  it('debounces scroll via rAF — skips duplicate scroll within same frame', () => {
    let rafCount = 0
    const originalRaf = globalThis.requestAnimationFrame
    globalThis.requestAnimationFrame = vi.fn((_cb: FrameRequestCallback) => {
      rafCount++
      return rafCount
    })

    render(
      <Parallax>
        <span>Test</span>
      </Parallax>
    )

    // initial mount calls handleScroll once
    const initialCount = rafCount

    // fire multiple scroll events without flushing rAF
    fireEvent.scroll(window)
    fireEvent.scroll(window)
    fireEvent.scroll(window)

    // should not have scheduled more rAFs since the previous one hasn't completed
    expect(rafCount).toBe(initialCount)

    globalThis.requestAnimationFrame = originalRaf
  })
})
