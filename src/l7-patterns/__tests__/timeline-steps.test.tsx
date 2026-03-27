import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TimelineSteps } from '../timeline-steps'

const steps = [
  { label: 'Order placed', status: 'completed' as const },
  { label: 'Processing', status: 'current' as const },
  { label: 'Shipped', description: 'Estimated 3 days', status: 'upcoming' as const },
]

describe('TimelineSteps', () => {
  it('renders all step labels', () => {
    render(<TimelineSteps steps={steps} />)
    expect(screen.getByText('Order placed')).toBeDefined()
    expect(screen.getByText('Processing')).toBeDefined()
    expect(screen.getByText('Shipped')).toBeDefined()
  })

  it('renders check icon for completed steps', () => {
    const { container } = render(<TimelineSteps steps={steps} />)
    const completed = container.querySelector('[data-status="completed"]')
    expect(completed).not.toBeNull()
    expect(completed?.querySelector('svg')).not.toBeNull()
  })

  it('applies pulse animation to current step', () => {
    const { container } = render(<TimelineSteps steps={steps} />)
    const current = container.querySelector('[data-status="current"]')
    expect(current).not.toBeNull()
    expect(current?.className).toContain('animate-pulse')
  })

  it('has data-component attribute', () => {
    const { container } = render(<TimelineSteps steps={steps} />)
    expect(container.querySelector('[data-component="timeline-steps"]')).not.toBeNull()
  })
})
