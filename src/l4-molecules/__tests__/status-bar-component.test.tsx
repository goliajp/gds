import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { StatusBarComponent } from '../status-bar-component'

describe('StatusBarComponent', () => {
  it('renders items', () => {
    render(<StatusBarComponent items={['v1.0', 'production', 'user@test']} />)
    expect(screen.getByText('v1.0')).toBeDefined()
    expect(screen.getByText('production')).toBeDefined()
    expect(screen.getByText('user@test')).toBeDefined()
  })

  it('renders data-component attribute', () => {
    const { container } = render(<StatusBarComponent items={['test']} />)
    expect(container.querySelector('[data-component="status-bar"]')).not.toBeNull()
  })

  it('renders dividers between items', () => {
    const { container } = render(<StatusBarComponent items={['a', 'b', 'c']} />)
    const dividers = container.querySelectorAll('.bg-border')
    expect(dividers.length).toBe(2)
  })
})
