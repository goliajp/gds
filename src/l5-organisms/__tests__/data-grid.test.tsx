import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { DataGridColumn } from '../data-grid'
import { DataGrid } from '../data-grid'

const columns: DataGridColumn[] = [
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age', align: 'right' },
  { key: 'role', label: 'Role', align: 'center', width: '200px' },
]

const rows = [
  { name: 'Alice', age: 30, role: 'Engineer' },
  { name: 'Bob', age: 25, role: 'Designer' },
  { name: 'Charlie', age: 35, role: 'Manager' },
]

describe('DataGrid', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<DataGrid columns={columns} rows={rows} />)
    expect(container.querySelector('[data-component="data-grid"]')).not.toBeNull()
  })

  it('renders column headers', () => {
    render(<DataGrid columns={columns} rows={rows} />)
    expect(screen.getByText('Name')).toBeDefined()
    expect(screen.getByText('Age')).toBeDefined()
    expect(screen.getByText('Role')).toBeDefined()
  })

  it('renders row data', () => {
    render(<DataGrid columns={columns} rows={rows} />)
    expect(screen.getByText('Alice')).toBeDefined()
    expect(screen.getByText('Bob')).toBeDefined()
  })

  it('shows empty state when rows is empty', () => {
    render(<DataGrid columns={columns} rows={[]} />)
    expect(screen.getByText('No data')).toBeDefined()
  })

  it('applies compact padding', () => {
    const { container } = render(<DataGrid columns={columns} compact rows={rows} />)
    const th = container.querySelector('th')
    expect(th?.className).toContain('py-1')
  })

  it('applies default (non-compact) padding', () => {
    const { container } = render(<DataGrid columns={columns} rows={rows} />)
    const th = container.querySelector('th')
    expect(th?.className).toContain('py-2')
  })

  it('applies striped class on odd rows', () => {
    const { container } = render(<DataGrid columns={columns} rows={rows} striped />)
    const trs = container.querySelectorAll('tbody tr')
    // second row (index 1) should have striped background
    expect(trs[1]?.className).toContain('bg-bg-secondary/30')
    // first row (index 0) should not
    expect(trs[0]?.className).not.toContain('bg-bg-secondary/30')
  })

  it('does not apply striped class when striped is false', () => {
    const { container } = render(<DataGrid columns={columns} rows={rows} />)
    const trs = container.querySelectorAll('tbody tr')
    expect(trs[1]?.className).not.toContain('bg-bg-secondary/30')
  })

  it('applies align classes to headers and cells', () => {
    const { container } = render(<DataGrid columns={columns} rows={rows} />)
    const ths = container.querySelectorAll('th')
    // name column defaults to left
    expect(ths[0]?.className).toContain('text-left')
    // age column is right-aligned
    expect(ths[1]?.className).toContain('text-right')
    // role column is center-aligned
    expect(ths[2]?.className).toContain('text-center')
  })

  it('applies width style when column has width', () => {
    const { container } = render(<DataGrid columns={columns} rows={rows} />)
    const ths = container.querySelectorAll('th')
    // role column has width 200px
    expect(ths[2]?.style.width).toBe('200px')
    // name column has no width
    expect(ths[0]?.style.width).toBe('')
  })

  it('applies glass class when glass is true', () => {
    const { container } = render(<DataGrid columns={columns} glass rows={rows} />)
    const wrapper = container.querySelector('[data-component="data-grid"]')
    expect(wrapper?.className).toContain('gds-glass')
  })

  it('does not apply glass class when glass is false', () => {
    const { container } = render(<DataGrid columns={columns} rows={rows} />)
    const wrapper = container.querySelector('[data-component="data-grid"]')
    expect(wrapper?.className).not.toContain('gds-glass')
  })

  it('applies custom className', () => {
    const { container } = render(<DataGrid className="custom-class" columns={columns} rows={rows} />)
    const wrapper = container.querySelector('[data-component="data-grid"]')
    expect(wrapper?.className).toContain('custom-class')
  })

  it('forwards ref to the table element', () => {
    let tableRef: HTMLTableElement | null = null
    render(
      <DataGrid
        columns={columns}
        ref={(el) => { tableRef = el }}
        rows={rows}
      />,
    )
    expect(tableRef).not.toBeNull()
    expect((tableRef as unknown as HTMLElement)?.tagName).toBe('TABLE')
  })
})
