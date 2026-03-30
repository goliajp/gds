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
    render(
      <PricingCard
        name="Pro"
        price="$29"
        features={['Unlimited storage', 'Priority support']}
      />
    )
    expect(screen.getByText('Unlimited storage')).toBeDefined()
    expect(screen.getByText('Priority support')).toBeDefined()
  })

  it('applies highlighted state', () => {
    const { container } = render(
      <PricingCard name="Pro" price="$29" features={[]} highlighted />
    )
    const el = container.querySelector('[data-component="pricing-card"]')
    expect(el?.getAttribute('data-highlighted')).toBe('true')
    expect(el?.className).toContain('border-accent')
  })

  it('applies glass class when not highlighted and glass is true', () => {
    const { container } = render(
      <PricingCard name="Pro" price="$29" features={[]} glass />
    )
    const el = container.querySelector('[data-component="pricing-card"]')
    expect(el?.className).toContain('gds-glass')
  })

  it('applies surface background when not highlighted and not glass', () => {
    const { container } = render(
      <PricingCard name="Pro" price="$29" features={[]} />
    )
    const el = container.querySelector('[data-component="pricing-card"]')
    expect(el?.className).toContain('bg-surface')
  })

  it('renders action slot', () => {
    render(
      <PricingCard
        name="Pro"
        price="$29"
        features={[]}
        action={<button>Buy Now</button>}
      />
    )
    expect(screen.getByText('Buy Now')).toBeDefined()
  })

  it('does not render action when undefined', () => {
    const { container } = render(
      <PricingCard name="Pro" price="$29" features={[]} />
    )
    expect(container.textContent).not.toContain('Buy Now')
  })

  it('renders custom period', () => {
    render(<PricingCard name="Pro" price="$29" period="/year" features={[]} />)
    expect(screen.getByText('/year')).toBeDefined()
  })

  it('applies glass on highlighted card', () => {
    const { container } = render(
      <PricingCard name="Pro" price="$29" features={[]} highlighted glass />
    )
    const el = container.querySelector('[data-component="pricing-card"]')
    expect(el?.className).toContain('gds-glass')
    expect(el?.className).toContain('border-accent')
  })
})
