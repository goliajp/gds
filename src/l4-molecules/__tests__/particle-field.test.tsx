import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ParticleField } from '../particle-field'

describe('ParticleField', () => {
  it('renders without crash', () => {
    const { container } = render(<ParticleField />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<ParticleField />)
    expect(
      container.querySelector('[data-component="particle-field"]')
    ).not.toBeNull()
  })

  it('renders a canvas element', () => {
    const { container } = render(<ParticleField />)
    expect(container.querySelector('canvas')).not.toBeNull()
  })

  it('applies custom className', () => {
    const { container } = render(<ParticleField className="custom" />)
    expect(
      container.querySelector('[data-component="particle-field"]')?.className
    ).toContain('custom')
  })
})
