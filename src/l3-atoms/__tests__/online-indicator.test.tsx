import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { OnlineIndicator } from '../online-indicator'

describe('OnlineIndicator', () => {
  it('renders with data-component', () => {
    const { container } = render(<OnlineIndicator online />)
    expect(
      container.querySelector('[data-component="online-indicator"]')
    ).not.toBeNull()
  })

  it('shows "Online" when online is true', () => {
    render(<OnlineIndicator online />)
    expect(screen.getByText('Online')).toBeDefined()
  })

  it('shows "Offline" when online is false', () => {
    render(<OnlineIndicator online={false} />)
    expect(screen.getByText('Offline')).toBeDefined()
  })
})
