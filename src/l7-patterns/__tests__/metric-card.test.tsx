import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MetricCard } from '../metric-card'

describe('MetricCard', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<MetricCard title="Revenue" value="$1,200" />)
    expect(container.querySelector('[data-component="metric-card"]')).not.toBeNull()
  })

  it('renders title and value', () => {
    render(<MetricCard title="Users" value={42} />)
    expect(screen.getByText('Users')).toBeDefined()
    expect(screen.getByText('42')).toBeDefined()
  })

  it('renders positive change in green', () => {
    const { container } = render(<MetricCard title="Revenue" value="$1k" change={12} />)
    const change = container.querySelector('[data-component="metric-card"] p:last-child')
    expect(change?.textContent).toContain('+12%')
    expect(change?.className).toContain('text-success')
  })

  it('renders negative change in red', () => {
    const { container } = render(<MetricCard title="Revenue" value="$1k" change={-5} changeLabel="vs last month" />)
    const change = container.querySelector('[data-component="metric-card"] p:last-child')
    expect(change?.textContent).toContain('-5%')
    expect(change?.textContent).toContain('vs last month')
    expect(change?.className).toContain('text-danger')
  })
})
