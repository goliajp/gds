import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { StickyHeader } from '../sticky-header'

describe('StickyHeader', () => {
  it('renders children', () => {
    render(<StickyHeader><span>header content</span></StickyHeader>)
    expect(screen.getByText('header content')).toBeDefined()
  })

  it('has sticky class', () => {
    const { container } = render(<StickyHeader><span>test</span></StickyHeader>)
    const el = container.querySelector('[data-component="sticky-header"]')
    expect(el?.className).toContain('sticky')
  })

  it('has data-component="sticky-header"', () => {
    const { container } = render(<StickyHeader><span>test</span></StickyHeader>)
    expect(container.querySelector('[data-component="sticky-header"]')).not.toBeNull()
  })

  it('accepts threshold prop without error', () => {
    const { container } = render(<StickyHeader threshold={100}><span>test</span></StickyHeader>)
    const el = container.querySelector('[data-component="sticky-header"]')
    expect(el).not.toBeNull()
  })
})
