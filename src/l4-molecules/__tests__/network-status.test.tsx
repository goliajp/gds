import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { NetworkStatus } from '../network-status'

describe('NetworkStatus', () => {
  it('renders without crash', () => {
    const { container } = render(<NetworkStatus status="online" />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<NetworkStatus status="online" />)
    expect(container.querySelector('[data-component="network-status"]')).not.toBeNull()
  })

  it('displays online status', () => {
    const { container } = render(<NetworkStatus status="online" />)
    expect(screen.getByText('Online')).toBeDefined()
    expect(container.querySelector('[data-state="online"]')).not.toBeNull()
  })

  it('displays offline status', () => {
    render(<NetworkStatus status="offline" />)
    expect(screen.getByText('Offline')).toBeDefined()
  })
})
