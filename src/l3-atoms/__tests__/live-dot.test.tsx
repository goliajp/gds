import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { LiveDot } from '../live-dot'

describe('LiveDot', () => {
  it('renders with data-component', () => {
    const { container } = render(<LiveDot />)
    expect(container.querySelector('[data-component="live-dot"]')).not.toBeNull()
  })

  it('shows default label "LIVE"', () => {
    render(<LiveDot />)
    expect(screen.getByText('LIVE')).toBeDefined()
  })

  it('shows custom label', () => {
    render(<LiveDot label="REC" />)
    expect(screen.getByText('REC')).toBeDefined()
  })
})
