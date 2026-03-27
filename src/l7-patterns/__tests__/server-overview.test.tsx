import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ServerOverview } from '../server-overview'

const servers = [
  { name: 't01', location: 'Tokyo', status: 'online' as const, metrics: { cpu: 45, mem: 60, disk: 30 } },
  { name: 't02', location: 'Osaka', status: 'offline' as const },
]

describe('ServerOverview', () => {
  it('renders data-component attribute', () => {
    const { container } = render(<ServerOverview servers={servers} />)
    expect(container.querySelector('[data-component="server-overview"]')).not.toBeNull()
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
})
