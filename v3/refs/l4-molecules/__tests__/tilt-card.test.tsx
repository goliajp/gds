import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TiltCard } from '../tilt-card'

describe('TiltCard', () => {
  it('renders without crash', () => {
    const { container } = render(
      <TiltCard>
        <span>Content</span>
      </TiltCard>
    )
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(
      <TiltCard>
        <span>Content</span>
      </TiltCard>
    )
    expect(
      container.querySelector('[data-component="tilt-card"]')
    ).not.toBeNull()
  })

  it('renders children', () => {
    render(
      <TiltCard>
        <span>Hello Tilt</span>
      </TiltCard>
    )
    expect(screen.getByText('Hello Tilt')).toBeDefined()
  })

  it('applies custom className', () => {
    const { container } = render(
      <TiltCard className="custom">
        <span>X</span>
      </TiltCard>
    )
    expect(
      container.querySelector('[data-component="tilt-card"]')?.className
    ).toContain('custom')
  })
})
