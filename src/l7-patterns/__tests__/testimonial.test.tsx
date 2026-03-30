import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Testimonial } from '../testimonial'

describe('Testimonial', () => {
  it('renders quote text', () => {
    render(<Testimonial quote="Great product!" author="Jane" />)
    expect(screen.getByText('Great product!')).toBeDefined()
  })

  it('renders author and role', () => {
    render(<Testimonial quote="Amazing" author="John Doe" role="CEO at Acme" />)
    expect(screen.getByText('John Doe')).toBeDefined()
    expect(screen.getByText('CEO at Acme')).toBeDefined()
  })

  it('renders star rating', () => {
    const { container } = render(
      <Testimonial quote="Good" author="Alice" rating={4} />
    )
    const stars = container.querySelectorAll('svg.h-4')
    expect(stars.length).toBe(5)
    const filled = container.querySelectorAll('svg.h-4.text-warning')
    expect(filled.length).toBe(4)
  })

  it('has data-component attribute', () => {
    const { container } = render(<Testimonial quote="Nice" author="Bob" />)
    const el = container.querySelector('[data-component="testimonial"]')
    expect(el).toBeDefined()
    expect(el).not.toBeNull()
  })
})
