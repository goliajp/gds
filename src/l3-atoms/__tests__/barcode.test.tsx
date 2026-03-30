import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Barcode } from '../barcode'

describe('Barcode', () => {
  it('renders SVG element', () => {
    render(<Barcode value="ABC123" />)
    const svg = screen.getByTestId('barcode-svg')
    expect(svg).toBeInTheDocument()
    expect(svg.tagName).toBe('svg')
  })

  it('shows value text when showValue is true', () => {
    render(<Barcode value="ABC123" showValue />)
    const text = screen.getByTestId('barcode-text')
    expect(text).toHaveTextContent('ABC123')
  })

  it('applies correct dimensions', () => {
    render(<Barcode value="test" width={300} height={80} />)
    const svg = screen.getByTestId('barcode-svg')
    expect(svg).toHaveAttribute('width', '300')
    expect(svg).toHaveAttribute('height', '80')
  })

  it('has data-component attribute', () => {
    const { container } = render(<Barcode value="test" />)
    expect(
      container.querySelector('[data-component="barcode"]')
    ).toBeInTheDocument()
  })
})
