import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TransactionList } from '../transaction-list'

const sampleTx = [
  { id: '1', date: '2026-03-01', description: 'Salary', amount: 500000 },
  { id: '2', date: '2026-03-02', description: 'Rent', amount: -120000 },
  { id: '3', date: '2026-03-03', description: 'Bonus', amount: 50000, currency: '$' },
]

describe('TransactionList', () => {
  it('has data-component="transaction-list"', () => {
    const { container } = render(<TransactionList transactions={sampleTx} />)
    expect(container.querySelector('[data-component="transaction-list"]')).not.toBeNull()
  })

  it('renders all transactions', () => {
    render(<TransactionList transactions={sampleTx} />)
    expect(screen.getByText('Salary')).toBeDefined()
    expect(screen.getByText('Rent')).toBeDefined()
    expect(screen.getByText('Bonus')).toBeDefined()
  })

  it('shows positive amounts in success color', () => {
    const { container } = render(
      <TransactionList transactions={[{ id: '1', date: '2026-01-01', description: 'Income', amount: 100 }]} />,
    )
    const amountEl = container.querySelector('.text-success')
    expect(amountEl).not.toBeNull()
    expect(amountEl?.textContent).toContain('+')
  })

  it('shows negative amounts in danger color', () => {
    const { container } = render(
      <TransactionList transactions={[{ id: '1', date: '2026-01-01', description: 'Expense', amount: -200 }]} />,
    )
    const amountEl = container.querySelector('.text-danger')
    expect(amountEl).not.toBeNull()
  })
})
