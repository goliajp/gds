import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PulseIndicator } from '../pulse-indicator'

describe('PulseIndicator', () => {
  it('renders with data-component', () => {
    const { container } = render(<PulseIndicator />)
    expect(container.querySelector('[data-component="pulse-indicator"]')).not.toBeNull()
  })

  it('renders ping animation element', () => {
    const { container } = render(<PulseIndicator />)
    expect(container.querySelector('.animate-ping')).not.toBeNull()
  })

  it('renders label when provided', () => {
    render(<PulseIndicator label="Live" />)
    expect(screen.getByText('Live')).toBeTruthy()
  })
})
