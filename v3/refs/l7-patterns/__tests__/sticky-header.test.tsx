import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { StickyHeader } from '../sticky-header'

describe('StickyHeader', () => {
  it('renders children', () => {
    render(
      <StickyHeader>
        <span>header content</span>
      </StickyHeader>
    )
    expect(screen.getByText('header content')).toBeDefined()
  })

  it('has sticky class', () => {
    const { container } = render(
      <StickyHeader>
        <span>test</span>
      </StickyHeader>
    )
    const el = container.querySelector('[data-component="sticky-header"]')
    expect(el?.className).toContain('sticky')
  })

  it('has data-component="sticky-header"', () => {
    const { container } = render(
      <StickyHeader>
        <span>test</span>
      </StickyHeader>
    )
    expect(
      container.querySelector('[data-component="sticky-header"]')
    ).not.toBeNull()
  })

  it('accepts threshold prop without error', () => {
    const { container } = render(
      <StickyHeader threshold={100}>
        <span>test</span>
      </StickyHeader>
    )
    const el = container.querySelector('[data-component="sticky-header"]')
    expect(el).not.toBeNull()
  })

  it('applies glass class when glass is true and sticky', async () => {
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true })
    const { container } = render(
      <StickyHeader glass threshold={0}>
        <span>test</span>
      </StickyHeader>
    )
    const { fireEvent } = await import('@testing-library/react')
    fireEvent.scroll(window)
    const el = container.querySelector('[data-component="sticky-header"]')
    expect(el?.className).toContain('shadow-md')
  })

  it('disables glass when glass is false', () => {
    const { container } = render(
      <StickyHeader glass={false}>
        <span>test</span>
      </StickyHeader>
    )
    const el = container.querySelector('[data-component="sticky-header"]')
    expect(el?.className).not.toContain('gds-glass')
  })

  it('applies custom className', () => {
    const { container } = render(
      <StickyHeader className="my-header">
        <span>test</span>
      </StickyHeader>
    )
    const el = container.querySelector('[data-component="sticky-header"]')
    expect(el?.className).toContain('my-header')
  })

  it('sets data-sticky attribute', () => {
    const { container } = render(
      <StickyHeader>
        <span>test</span>
      </StickyHeader>
    )
    const el = container.querySelector('[data-component="sticky-header"]')
    expect(el?.getAttribute('data-sticky')).toBe('false')
  })
})
