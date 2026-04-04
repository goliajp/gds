import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { NumTable } from '../num-table'

const columns = [
  { key: 'amount', label: 'Amount' },
  { key: 'count', label: 'Count' },
]
const rows = [
  { name: 'Row A', amount: 100, count: 5 },
  { name: 'Row B', amount: 200, count: 10 },
]

describe('NumTable', () => {
  it('renders without crash', () => {
    const { container } = render(
      <NumTable
        columns={columns}
        rows={rows}
        labelKey="name"
        labelHeader="Name"
      />
    )
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(
      <NumTable
        columns={columns}
        rows={rows}
        labelKey="name"
        labelHeader="Name"
      />
    )
    expect(
      container.querySelector('[data-component="num-table"]')
    ).not.toBeNull()
  })

  it('renders column headers', () => {
    render(
      <NumTable
        columns={columns}
        rows={rows}
        labelKey="name"
        labelHeader="Name"
      />
    )
    expect(screen.getByText('Amount')).toBeDefined()
    expect(screen.getByText('Count')).toBeDefined()
  })

  it('renders row labels', () => {
    render(
      <NumTable
        columns={columns}
        rows={rows}
        labelKey="name"
        labelHeader="Name"
      />
    )
    expect(screen.getByText('Row A')).toBeDefined()
    expect(screen.getByText('Row B')).toBeDefined()
  })
})
