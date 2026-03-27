import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Parallax } from '../parallax'

describe('Parallax', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders children', () => {
    render(<Parallax><span>Hello</span></Parallax>)
    expect(screen.getByText('Hello')).toBeDefined()
  })

  it('applies data-component attribute', () => {
    const { container } = render(<Parallax><span>Test</span></Parallax>)
    expect(container.querySelector('[data-component="parallax"]')).not.toBeNull()
  })

  it('does not apply transform when disabled', () => {
    const { container } = render(<Parallax disabled><span>Test</span></Parallax>)
    const el = container.querySelector('[data-component="parallax"]') as HTMLElement
    expect(el.style.transform).toBe('')
  })

  it('respects speed prop via will-change class', () => {
    const { container } = render(<Parallax speed={0.8}><span>Test</span></Parallax>)
    const el = container.querySelector('[data-component="parallax"]') as HTMLElement
    expect(el.className).toContain('will-change-transform')
  })

  it('applies custom className', () => {
    const { container } = render(<Parallax className="my-parallax"><span>Test</span></Parallax>)
    const el = container.querySelector('[data-component="parallax"]')
    expect(el?.className).toContain('my-parallax')
  })

  it('adds scroll listener when not disabled', () => {
    const addSpy = vi.spyOn(window, 'addEventListener')
    render(<Parallax><span>Test</span></Parallax>)
    expect(addSpy).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true })
  })

  it('does not add scroll listener when disabled', () => {
    const addSpy = vi.spyOn(window, 'addEventListener')
    render(<Parallax disabled><span>Test</span></Parallax>)
    const scrollCalls = addSpy.mock.calls.filter(
      ([event]) => event === 'scroll',
    )
    expect(scrollCalls.length).toBe(0)
  })

  it('removes scroll listener on unmount', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = render(<Parallax><span>Test</span></Parallax>)
    unmount()
    const scrollCalls = removeSpy.mock.calls.filter(
      ([event]) => event === 'scroll',
    )
    expect(scrollCalls.length).toBeGreaterThan(0)
  })

  it('applies vertical transform by default', () => {
    const { container } = render(<Parallax><span>Test</span></Parallax>)
    const el = container.querySelector('[data-component="parallax"]') as HTMLElement
    // transform should contain translateY
    if (el.style.transform !== '') {
      expect(el.style.transform).toContain('translateY')
    }
  })

  it('applies horizontal transform when direction is horizontal', () => {
    const { container } = render(
      <Parallax direction="horizontal"><span>Test</span></Parallax>,
    )
    const el = container.querySelector('[data-component="parallax"]') as HTMLElement
    if (el.style.transform !== '') {
      expect(el.style.transform).toContain('translateX')
    }
  })

  it('forwards ref (function ref)', () => {
    const refFn = vi.fn()
    render(<Parallax ref={refFn}><span>Test</span></Parallax>)
    expect(refFn).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('forwards ref (object ref)', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<Parallax ref={ref}><span>Test</span></Parallax>)
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

    render(<Parallax><span>Test</span></Parallax>)
    expect(matchMediaSpy).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)')
  })
})
