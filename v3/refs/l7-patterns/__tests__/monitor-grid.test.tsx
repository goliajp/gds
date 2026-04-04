import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MonitorGrid } from '../monitor-grid'

describe('MonitorGrid', () => {
  it('renders data-component attribute', () => {
    const { container } = render(
      <MonitorGrid>
        <div>child</div>
      </MonitorGrid>
    )
    expect(
      container.querySelector('[data-component="monitor-grid"]')
    ).not.toBeNull()
  })

  it('renders children', () => {
    render(
      <MonitorGrid>
        <div>Server A</div>
        <div>Server B</div>
      </MonitorGrid>
    )
    expect(screen.getByText('Server A')).toBeDefined()
    expect(screen.getByText('Server B')).toBeDefined()
  })

  it('applies custom className', () => {
    const { container } = render(
      <MonitorGrid className="my-grid">
        <div>x</div>
      </MonitorGrid>
    )
    const el = container.querySelector('[data-component="monitor-grid"]')
    expect(el?.className).toContain('my-grid')
  })

  it('applies custom columns when specified', () => {
    const { container } = render(
      <MonitorGrid columns={3}>
        <div>x</div>
      </MonitorGrid>
    )
    const el = container.querySelector('[data-component="monitor-grid"]')
    expect(el?.className).toContain('grid-cols-3')
  })

  it('uses responsive columns by default', () => {
    const { container } = render(
      <MonitorGrid>
        <div>x</div>
      </MonitorGrid>
    )
    const el = container.querySelector('[data-component="monitor-grid"]')
    expect(el?.className).toContain('sm:grid-cols-2')
    expect(el?.className).toContain('lg:grid-cols-3')
  })
})
