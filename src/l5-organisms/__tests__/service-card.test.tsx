import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ServiceCard } from '../service-card'

describe('ServiceCard', () => {
  it('renders name and status', () => {
    render(<ServiceCard name="api-server" status="healthy" />)
    expect(screen.getByText('api-server')).toBeDefined()
    expect(screen.getByText('Healthy')).toBeDefined()
  })

  it('sets data-state to status', () => {
    const { container } = render(<ServiceCard name="db" status="error" />)
    const el = container.querySelector('[data-component="service-card"]')
    expect(el?.getAttribute('data-state')).toBe('error')
  })

  it('renders metrics when provided', () => {
    render(
      <ServiceCard
        name="web"
        status="healthy"
        metrics={[{ label: 'CPU', value: '5%' }, { label: 'MEM', value: '128MB' }]}
      />,
    )
    expect(screen.getByText('CPU')).toBeDefined()
    expect(screen.getByText('5%')).toBeDefined()
  })

  it('renders tags and url', () => {
    render(
      <ServiceCard
        name="cdn"
        status="warning"
        tags={['edge', 'global']}
        url="https://cdn.example.com"
      />,
    )
    expect(screen.getByText('edge')).toBeDefined()
    expect(screen.getByText('global')).toBeDefined()
    expect(screen.getByText('https://cdn.example.com')).toBeDefined()
  })
})
