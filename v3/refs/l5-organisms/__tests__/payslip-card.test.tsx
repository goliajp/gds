import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PayslipCard } from '../payslip-card'

describe('PayslipCard', () => {
  const deductions = [
    { label: 'Income Tax', amount: 30000 },
    { label: 'Insurance', amount: 15000 },
  ]

  it('renders with data-component', () => {
    const { container } = render(
      <PayslipCard
        period="2026-03"
        gross={500000}
        deductions={deductions}
        net={455000}
      />
    )
    expect(
      container.querySelector('[data-component="payslip-card"]')
    ).not.toBeNull()
  })

  it('renders period header', () => {
    render(
      <PayslipCard
        period="2026-03"
        gross={500000}
        deductions={deductions}
        net={455000}
      />
    )
    expect(screen.getByText('2026-03')).toBeDefined()
  })

  it('renders gross and net amounts', () => {
    render(
      <PayslipCard
        period="2026-03"
        gross={500000}
        deductions={[]}
        net={450000}
      />
    )
    expect(screen.getByText('Gross')).toBeDefined()
    expect(screen.getByText('\u00a5500,000')).toBeDefined()
    expect(screen.getByText('Net Pay')).toBeDefined()
    expect(screen.getByText('\u00a5450,000')).toBeDefined()
  })

  it('renders deduction line items', () => {
    render(
      <PayslipCard
        period="2026-03"
        gross={500000}
        deductions={deductions}
        net={455000}
      />
    )
    expect(screen.getByText('Income Tax')).toBeDefined()
    expect(screen.getByText('Insurance')).toBeDefined()
  })
})
