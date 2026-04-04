import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Stat } from '../stat'

describe('Stat', () => {
  it('renders without crash', () => {
    const { container } = render(<Stat label="Revenue" value="$1,234" />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<Stat label="Revenue" value="$1,234" />)
    expect(container.querySelector('[data-component="stat"]')).not.toBeNull()
  })

  it('displays label and value', () => {
    render(<Stat label="Users" value={1500} />)
    expect(screen.getByText('Users')).toBeDefined()
    expect(screen.getByText('1500')).toBeDefined()
  })

  it('renders change text when provided', () => {
    render(<Stat label="Sales" value="$500" change="+12%" changeType="up" />)
    expect(screen.getByText('+12%')).toBeDefined()
  })
})
