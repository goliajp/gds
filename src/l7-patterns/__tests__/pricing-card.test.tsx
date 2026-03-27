import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PricingCard } from '../pricing-card'

describe('PricingCard', () => {
  it('renders name and price', () => {
    render(<PricingCard name="Pro" price="$29" features={[]} />)
    expect(screen.getByText('Pro')).toBeDefined()
    expect(screen.getByText('$29')).toBeDefined()
  })

  it('renders default period', () => {
    render(<PricingCard name="Pro" price="$29" features={[]} />)
    expect(screen.getByText('/month')).toBeDefined()
  })

  it('renders features list', () => {
    render(<PricingCard name="Pro" price="$29" features={['Unlimited storage', 'Priority support']} />)
    expect(screen.getByText('Unlimited storage')).toBeDefined()
    expect(screen.getByText('Priority support')).toBeDefined()
  })

  it('applies highlighted state', () => {
    const { container } = render(<PricingCard name="Pro" price="$29" features={[]} highlighted />)
    const el = container.querySelector('[data-component="pricing-card"]')
    expect(el?.getAttribute('data-highlighted')).toBe('true')
    expect(el?.className).toContain('border-accent')
  })
})
