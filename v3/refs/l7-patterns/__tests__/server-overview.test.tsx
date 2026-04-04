import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ServerOverview } from '../server-overview'

const servers = [
  {
    name: 't01',
    location: 'Tokyo',
    status: 'online' as const,
    metrics: { cpu: 45, mem: 60, disk: 30 },
  },
  { name: 't02', location: 'Osaka', status: 'offline' as const },
]

describe('ServerOverview', () => {
  it('renders data-component attribute', () => {
    const { container } = render(<ServerOverview servers={servers} />)
    expect(
      container.querySelector('[data-component="server-overview"]')
    ).not.toBeNull()
  })

  it('renders server names and locations', () => {
    render(<ServerOverview servers={servers} />)
    expect(screen.getByText('t01')).toBeDefined()
    expect(screen.getByText('Tokyo')).toBeDefined()
    expect(screen.getByText('t02')).toBeDefined()
    expect(screen.getByText('Osaka')).toBeDefined()
  })

  it('renders metric bars for servers with metrics', () => {
    const { container } = render(<ServerOverview servers={servers} />)
    const bars = container.querySelectorAll('[role="progressbar"]')
    // t01 has 3 bars (cpu, mem, disk), t02 has none
    expect(bars.length).toBe(3)
  })

  it('shows online status with success color', () => {
    const { container } = render(<ServerOverview servers={servers} />)
    const dots = container.querySelectorAll('.rounded-full')
    const onlineDot = Array.from(dots).find((d) =>
      d.className.includes('bg-success')
    )
    expect(onlineDot).not.toBeUndefined()
  })

  it('shows offline status with danger color', () => {
    const { container } = render(<ServerOverview servers={servers} />)
    const dots = container.querySelectorAll('.rounded-full')
    const offlineDot = Array.from(dots).find((d) =>
      d.className.includes('bg-danger')
    )
    expect(offlineDot).not.toBeUndefined()
  })

  it('renders warning variant for metrics >= 70', () => {
    const highServers = [
      {
        name: 'h01',
        location: 'Tokyo',
        status: 'online' as const,
        metrics: { cpu: 75, mem: 50, disk: 30 },
      },
    ]
    const { container } = render(<ServerOverview servers={highServers} />)
    const bars = container.querySelectorAll('[role="progressbar"]')
    expect(bars.length).toBe(3)
  })

  it('renders danger variant for metrics >= 90', () => {
    const criticalServers = [
      {
        name: 'c01',
        location: 'Tokyo',
        status: 'online' as const,
        metrics: { cpu: 95, mem: 50, disk: 30 },
      },
    ]
    const { container } = render(<ServerOverview servers={criticalServers} />)
    const bars = container.querySelectorAll('[role="progressbar"]')
    expect(bars.length).toBe(3)
  })
})
