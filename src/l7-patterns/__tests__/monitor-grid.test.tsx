import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MonitorGrid } from '../monitor-grid'

describe('MonitorGrid', () => {
  it('renders data-component attribute', () => {
    const { container } = render(<MonitorGrid><div>child</div></MonitorGrid>)
    expect(container.querySelector('[data-component="monitor-grid"]')).not.toBeNull()
  })

  it('renders children', () => {
    render(
      <MonitorGrid>
        <div>Server A</div>
        <div>Server B</div>
      </MonitorGrid>,
    )
    expect(screen.getByText('Server A')).toBeDefined()
    expect(screen.getByText('Server B')).toBeDefined()
  })

  it('applies custom className', () => {
    const { container } = render(<MonitorGrid className="my-grid"><div>x</div></MonitorGrid>)
    const el = container.querySelector('[data-component="monitor-grid"]')
    expect(el?.className).toContain('my-grid')
  })
})
