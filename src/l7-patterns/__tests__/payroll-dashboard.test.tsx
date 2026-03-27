import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PayrollDashboard } from '../payroll-dashboard'

describe('PayrollDashboard', () => {
  it('renders with data-component', () => {
    const { container } = render(<PayrollDashboard />)
    expect(container.querySelector('[data-component="payroll-dashboard"]')).not.toBeNull()
  })

  it('renders metrics slot', () => {
    render(<PayrollDashboard metrics={<div>Total Payroll: 5M</div>} />)
    expect(screen.getByText('Total Payroll: 5M')).toBeDefined()
  })

  it('renders chart and transactions slots', () => {
    render(
      <PayrollDashboard
        chart={<div>Payroll Chart</div>}
        transactions={<div>Recent Transactions</div>}
      />,
    )
    expect(screen.getByText('Payroll Chart')).toBeDefined()
    expect(screen.getByText('Recent Transactions')).toBeDefined()
  })
})
