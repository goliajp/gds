import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Skeleton } from '../skeleton'

describe('Skeleton', () => {
  it('renders text variant by default', () => {
    const { container } = render(<Skeleton />)
    const el = container.querySelector('[data-component="skeleton"]')
    expect(el).not.toBeNull()
    expect(el?.getAttribute('data-variant')).toBe('text')
  })

  it('renders circle variant', () => {
    const { container } = render(<Skeleton variant="circle" />)
    const el = container.querySelector('[data-component="skeleton"]')
    expect(el?.getAttribute('data-variant')).toBe('circle')
    expect(el?.className).toContain('rounded-full')
  })

  it('renders rect variant', () => {
    const { container } = render(<Skeleton variant="rect" />)
    const el = container.querySelector('[data-component="skeleton"]')
    expect(el?.getAttribute('data-variant')).toBe('rect')
    expect(el?.className).toContain('rounded-md')
  })

  it('renders multiple lines for text variant', () => {
    const { container } = render(<Skeleton variant="text" lines={3} />)
    const wrapper = container.querySelector('[data-component="skeleton"]')
    expect(wrapper).not.toBeNull()
    const lines = wrapper?.querySelectorAll('div:not([data-component])')
    expect(lines?.length).toBe(3)
  })

  it('applies custom dimensions via style', () => {
    const { container } = render(<Skeleton width={200} height="3rem" />)
    const el = container.querySelector(
      '[data-component="skeleton"]'
    ) as HTMLElement
    expect(el.style.width).toBe('200px')
    expect(el.style.height).toBe('3rem')
  })
})
