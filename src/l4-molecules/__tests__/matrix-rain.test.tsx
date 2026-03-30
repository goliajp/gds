import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MatrixRain } from '../matrix-rain'

describe('MatrixRain', () => {
  it('renders without crash', () => {
    const { container } = render(<MatrixRain />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<MatrixRain />)
    expect(
      container.querySelector('[data-component="matrix-rain"]')
    ).not.toBeNull()
  })

  it('renders a canvas element', () => {
    const { container } = render(<MatrixRain />)
    expect(container.querySelector('canvas')).not.toBeNull()
  })

  it('applies custom className', () => {
    const { container } = render(<MatrixRain className="custom" />)
    expect(
      container.querySelector('[data-component="matrix-rain"]')?.className
    ).toContain('custom')
  })
})
