import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ComparisonTable } from '../comparison-table'

const features = ['Storage', 'Users', 'Support']
const plans = [
  { name: 'Free', values: ['1 GB', true, false] },
  { name: 'Pro', values: ['100 GB', true, true] },
]

describe('ComparisonTable', () => {
  it('renders all feature rows', () => {
    render(<ComparisonTable features={features} plans={plans} />)
    expect(screen.getByText('Storage')).toBeDefined()
    expect(screen.getByText('Users')).toBeDefined()
    expect(screen.getByText('Support')).toBeDefined()
  })

  it('renders plan names in header', () => {
    render(<ComparisonTable features={features} plans={plans} />)
    expect(screen.getByText('Free')).toBeDefined()
    expect(screen.getByText('Pro')).toBeDefined()
  })

  it('renders check and dash icons for boolean values', () => {
    const { container } = render(
      <ComparisonTable features={features} plans={plans} />
    )
    const checks = container.querySelectorAll('[data-icon="check"]')
    const dashes = container.querySelectorAll('[data-icon="dash"]')
    // Free: true + false = 1 check, 1 dash; Pro: true + true = 2 checks
    expect(checks.length).toBe(3)
    expect(dashes.length).toBe(1)
  })

  it('applies highlight to specified column', () => {
    const { container } = render(
      <ComparisonTable features={features} plans={plans} highlightColumn={1} />
    )
    const highlightedCells = container.querySelectorAll('.bg-accent\\/5')
    // header + 3 feature rows = 4 cells highlighted
    expect(highlightedCells.length).toBe(4)
  })
})
