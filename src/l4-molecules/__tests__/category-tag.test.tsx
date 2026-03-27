import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

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
})
