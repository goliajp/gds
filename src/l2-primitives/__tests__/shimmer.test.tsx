import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Shimmer } from '../shimmer'

describe('Shimmer', () => {
  it('renders without crash', () => {
    const { container } = render(<Shimmer />)
    expect(container.querySelector('[data-component="shimmer"]')).toBeTruthy()
  })

  it('has data-component attribute', () => {
    const { container } = render(<Shimmer />)
    const el = container.querySelector('[data-component="shimmer"]')
    expect(el!.getAttribute('data-component')).toBe('shimmer')
  })

  it('applies default width and height via style', () => {
    const { container } = render(<Shimmer />)
    const el = container.querySelector(
      '[data-component="shimmer"]'
    ) as HTMLElement
    expect(el.style.width).toBe('100%')
    expect(el.style.height).toBe('20px')
  })

  it('applies custom width and height', () => {
    const { container } = render(<Shimmer width="200px" height="40px" />)
    const el = container.querySelector(
      '[data-component="shimmer"]'
    ) as HTMLElement
    expect(el.style.width).toBe('200px')
    expect(el.style.height).toBe('40px')
  })

  it('applies rounded-md when rounded is false (default)', () => {
    const { container } = render(<Shimmer />)
    const el = container.querySelector('[data-component="shimmer"]')
    expect(el!.getAttribute('class')).toContain('rounded-md')
    expect(el!.getAttribute('class')).not.toContain('rounded-full')
  })

  it('applies rounded-full when rounded is true', () => {
    const { container } = render(<Shimmer rounded />)
    const el = container.querySelector('[data-component="shimmer"]')
    expect(el!.getAttribute('class')).toContain('rounded-full')
  })

  it('merges className', () => {
    const { container } = render(<Shimmer className="extra-class" />)
    const el = container.querySelector('[data-component="shimmer"]')
    expect(el!.getAttribute('class')).toContain('extra-class')
  })

  it('renders inner shimmer animation div', () => {
    const { container } = render(<Shimmer />)
    const el = container.querySelector('[data-component="shimmer"]')
    const inner = el!.querySelector('div')
    expect(inner).toBeTruthy()
    expect(inner!.getAttribute('class')).toContain('absolute')
  })

  it('forwards ref', () => {
    let el: HTMLDivElement | null = null
    render(
      <Shimmer
        ref={(node) => {
          el = node
        }}
      />
    )
    expect(el).toBeTruthy()
    expect(el!.tagName.toLowerCase()).toBe('div')
  })

  it('spreads additional HTML attributes', () => {
    const { container } = render(
      <Shimmer data-testid="my-shimmer" aria-label="loading" />
    )
    const el = container.querySelector('[data-component="shimmer"]')
    expect(el!.getAttribute('data-testid')).toBe('my-shimmer')
    expect(el!.getAttribute('aria-label')).toBe('loading')
  })
})
