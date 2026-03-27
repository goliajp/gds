import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { StatusDot } from '../status-dot'

describe('StatusDot', () => {
  it('renders with data-component and data-state', () => {
    const { container } = render(<StatusDot status="connected" />)
    const el = container.querySelector('[data-component="status-dot"]')
    expect(el).not.toBeNull()
    expect(el?.getAttribute('data-state')).toBe('connected')
  })

  it('renders label when provided', () => {
    render(<StatusDot status="disconnected" label="Server" />)
    expect(screen.getByText('Server')).toBeDefined()
  })

  it('applies animate-pulse for connecting status', () => {
    const { container } = render(<StatusDot status="connecting" />)
    expect(container.querySelector('.animate-pulse')).not.toBeNull()
  })
})
