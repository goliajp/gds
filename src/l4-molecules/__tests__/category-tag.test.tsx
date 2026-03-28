import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { CategoryTag } from '../category-tag'

describe('CategoryTag', () => {
  it('renders with data-component', () => {
    const { container } = render(<CategoryTag label="Spam" color="#ef4444" />)
    expect(container.querySelector('[data-component="category-tag"]')).not.toBeNull()
  })

  it('renders label and count', () => {
    render(<CategoryTag label="Newsletter" color="#3b82f6" count={42} />)
    expect(screen.getByText('Newsletter')).toBeDefined()
    expect(screen.getByText('42')).toBeDefined()
  })

  it('applies color to bar element via inline style', () => {
    const { container } = render(<CategoryTag label="Promo" color="#10b981" />)
    const bar = container.querySelector('[data-component="category-tag"] span')
    expect((bar as HTMLElement).style.backgroundColor).toBe('#10b981')
  })

  it('does not render count when not provided', () => {
    render(<CategoryTag label="Solo" color="#000" />)
    const { container } = render(<CategoryTag label="Solo" color="#000" />)
    const spans = container.querySelectorAll('[data-component="category-tag"] span')
    // 2 spans: color bar + label, no count
    expect(spans.length).toBe(2)
  })

  it('has role="button" when onClick is provided', () => {
    const fn = vi.fn()
    const { container } = render(<CategoryTag label="Click" color="#000" onClick={fn} />)
    const el = container.querySelector('[data-component="category-tag"]')
    expect(el?.getAttribute('role')).toBe('button')
  })

  it('does not have role="button" without onClick', () => {
    const { container } = render(<CategoryTag label="Static" color="#000" />)
    const el = container.querySelector('[data-component="category-tag"]')
    expect(el?.getAttribute('role')).toBeNull()
  })

  it('calls onClick when clicked', () => {
    const fn = vi.fn()
    const { container } = render(<CategoryTag label="Click" color="#000" onClick={fn} />)
    const el = container.querySelector('[data-component="category-tag"]')!
    fireEvent.click(el)
    expect(fn).toHaveBeenCalledOnce()
  })
})
