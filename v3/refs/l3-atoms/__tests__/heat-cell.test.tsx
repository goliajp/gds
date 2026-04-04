import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { HeatCell } from '../heat-cell'

describe('HeatCell', () => {
  it('renders with data-component', () => {
    const { container } = render(<HeatCell value={50} />)
    expect(
      container.querySelector('[data-component="heat-cell"]')
    ).not.toBeNull()
  })

  it('shows value text when showValue is true', () => {
    render(<HeatCell showValue value={75} />)
    expect(screen.getByText('75')).toBeDefined()
  })

  it('applies correct size via inline style', () => {
    const { container } = render(<HeatCell size={48} value={10} />)
    const el = container.querySelector(
      '[data-component="heat-cell"]'
    ) as HTMLElement
    expect(el.style.width).toBe('48px')
    expect(el.style.height).toBe('48px')
  })
})
