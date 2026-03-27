import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { InfoRow } from '../info-row'

describe('InfoRow', () => {
  it('renders label and value', () => {
    render(<InfoRow label="Status" value="Active" />)
    expect(screen.getByText('Status')).toBeDefined()
    expect(screen.getByText('Active')).toBeDefined()
  })

  it('renders data-component attribute', () => {
    const { container } = render(<InfoRow label="CPU" value="12%" />)
    expect(container.querySelector('[data-component="info-row"]')).not.toBeNull()
  })

  it('renders icon when provided', () => {
    render(<InfoRow label="Server" value="Online" icon={<span>ico</span>} />)
    expect(screen.getByText('ico')).toBeDefined()
  })
})
