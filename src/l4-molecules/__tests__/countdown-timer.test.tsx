import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CountdownTimer } from '../countdown-timer'

describe('CountdownTimer', () => {
  it('renders without crash', () => {
    const future = new Date(Date.now() + 100000)
    const { container } = render(<CountdownTimer target={future} />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const future = new Date(Date.now() + 100000)
    const { container } = render(<CountdownTimer target={future} />)
    expect(container.querySelector('[data-component="countdown-timer"]')).not.toBeNull()
  })

  it('renders label when provided', () => {
    const future = new Date(Date.now() + 100000)
    render(<CountdownTimer target={future} label="Expires in" />)
    expect(screen.getByText('Expires in')).toBeDefined()
  })

  it('applies custom className', () => {
    const future = new Date(Date.now() + 100000)
    const { container } = render(<CountdownTimer className="custom" target={future} />)
    expect(container.querySelector('[data-component="countdown-timer"]')?.className).toContain('custom')
  })
})
