import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Percentage } from '../percentage'

describe('Percentage', () => {
  it('renders with data-component', () => {
    const { container } = render(<Percentage value={5} />)
    expect(container.querySelector('[data-component="percentage"]')).not.toBeNull()
  })

  it('formats positive value with precision', () => {
    render(<Percentage value={12.345} precision={2} />)
    expect(screen.getByText('12.35%')).toBeDefined()
  })

  it('shows sign when showSign is true', () => {
    render(<Percentage value={8} showSign />)
    expect(screen.getByText('+8.0%')).toBeDefined()
  })
})
