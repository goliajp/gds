import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { DataTable } from '../data-table'

type Row = { name: string; age: number }

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'age', header: 'Age' },
]

const data: Row[] = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
]

describe('DataTable', () => {
  it('renders without crash', () => {
    const { container } = render(<DataTable columns={columns} data={data} />)
    expect(container.querySelector('[data-component="data-table"]')).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<DataTable columns={columns} data={data} />)
    expect(container.querySelector('[data-component="data-table"]')).not.toBeNull()
  })

  it('renders column headers and row data', () => {
    render(<DataTable columns={columns} data={data} />)
    expect(screen.getByText('Name')).toBeDefined()
    expect(screen.getByText('Age')).toBeDefined()
    expect(screen.getByText('Alice')).toBeDefined()
    expect(screen.getByText('Bob')).toBeDefined()
  })

  it('shows empty text when data is empty', () => {
    render(<DataTable columns={columns} data={[]} emptyText="Nothing here" />)
    expect(screen.getByText('Nothing here')).toBeDefined()
  })

  it('shows default empty text when none provided', () => {
    render(<DataTable columns={columns} data={[]} />)
    expect(screen.getByText('No data')).toBeDefined()
  })

  it('shows loading state with skeleton rows', () => {
    const { container } = render(<DataTable columns={columns} data={[]} loading />)
    const el = container.querySelector('[data-component="data-table"]')
    expect(el?.getAttribute('data-state')).toBe('loading')
    // should have skeleton pulse elements
    const pulseEls = container.querySelectorAll('.animate-pulse')
    expect(pulseEls.length).toBeGreaterThan(0)
  })

  it('does not show data rows when loading', () => {
    render(<DataTable columns={columns} data={data} loading />)
    // data rows should not appear when loading
    expect(screen.queryByText('Alice')).toBeNull()
    expect(screen.queryByText('Bob')).toBeNull()
  })

  it('calls onRowClick when row is clicked', async () => {
    const user = userEvent.setup()
    const onRowClick = vi.fn()
    render(<DataTable columns={columns} data={data} onRowClick={onRowClick} />)
    await user.click(screen.getByText('Alice'))
    expect(onRowClick).toHaveBeenCalledWith({ name: 'Alice', age: 30 })
  })

  it('renders rows with cursor-pointer when onRowClick provided', () => {
    const { container } = render(
      <DataTable columns={columns} data={data} onRowClick={vi.fn()} />,
    )
    const rows = container.querySelectorAll('tbody tr')
    expect(rows[0].className).toContain('cursor-pointer')
  })

  it('renders rows without cursor-pointer when no onRowClick', () => {
    const { container } = render(<DataTable columns={columns} data={data} />)
    const rows = container.querySelectorAll('tbody tr')
    expect(rows[0].className).not.toContain('cursor-pointer')
  })

  it('renders sortable column headers with SortChevron', () => {
    const sortableCols = [
      { key: 'name', header: 'Name', sortable: true },
      { key: 'age', header: 'Age' },
    ]
    const { container } = render(<DataTable columns={sortableCols} data={data} />)
    // sortable column should have cursor-pointer
    const headers = container.querySelectorAll('th')
    expect(headers[0].className).toContain('cursor-pointer')
    expect(headers[1].className).not.toContain('cursor-pointer')
  })

  it('calls onSort when sortable header is clicked', async () => {
    const user = userEvent.setup()
    const onSort = vi.fn()
    const sortableCols = [
      { key: 'name', header: 'Name', sortable: true },
    ]
    render(<DataTable columns={sortableCols} data={data} onSort={onSort} />)
    await user.click(screen.getByText('Name'))
    expect(onSort).toHaveBeenCalledWith('name')
  })

  it('does not call onSort for non-sortable column', async () => {
    const user = userEvent.setup()
    const onSort = vi.fn()
    render(<DataTable columns={columns} data={data} onSort={onSort} />)
    await user.click(screen.getByText('Name'))
    expect(onSort).not.toHaveBeenCalled()
  })

  it('does not call onSort when onSort is undefined', async () => {
    const user = userEvent.setup()
    const sortableCols = [
      { key: 'name', header: 'Name', sortable: true },
    ]
    // should not throw when onSort is undefined
    render(<DataTable columns={sortableCols} data={data} />)
    await user.click(screen.getByText('Name'))
  })

  it('shows asc sort indicator for active column', () => {
    const sortableCols = [
      { key: 'name', header: 'Name', sortable: true },
    ]
    const { container } = render(
      <DataTable columns={sortableCols} data={data} sortKey="name" sortDir="asc" />,
    )
    // should have asc chevron
    const svg = container.querySelector('th svg')
    expect(svg).not.toBeNull()
  })

  it('shows desc sort indicator for active column', () => {
    const sortableCols = [
      { key: 'name', header: 'Name', sortable: true },
    ]
    const { container } = render(
      <DataTable columns={sortableCols} data={data} sortKey="name" sortDir="desc" />,
    )
    const svg = container.querySelector('th svg')
    expect(svg).not.toBeNull()
  })

  it('uses custom render function for columns', () => {
    const customCols = [
      { key: 'name', header: 'Name', render: (row: Row) => <b>{row.name.toUpperCase()}</b> },
      { key: 'age', header: 'Age' },
    ]
    render(<DataTable columns={customCols} data={data} />)
    expect(screen.getByText('ALICE')).toBeDefined()
  })

  it('applies column width style', () => {
    const widthCols = [
      { key: 'name', header: 'Name', width: '200px' },
      { key: 'age', header: 'Age' },
    ]
    const { container } = render(<DataTable columns={widthCols} data={data} />)
    const th = container.querySelector('th') as HTMLElement
    expect(th.style.width).toBe('200px')
  })

  it('applies glass styling', () => {
    const { container } = render(<DataTable columns={columns} data={data} glass />)
    const el = container.querySelector('[data-component="data-table"]')
    expect(el?.className).toContain('bg-bg/60')
  })

  it('applies custom className', () => {
    const { container } = render(
      <DataTable columns={columns} data={data} className="my-table" />,
    )
    const el = container.querySelector('[data-component="data-table"]')
    expect(el?.className).toContain('my-table')
  })

  it('applies striped row styling on odd rows', () => {
    const { container } = render(<DataTable columns={columns} data={data} />)
    const rows = container.querySelectorAll('tbody tr')
    // second row (index 1) should have striped class
    expect(rows[1].className).toContain('bg-bg-secondary/30')
    // first row (index 0) should not
    expect(rows[0].className).not.toContain('bg-bg-secondary/30')
  })

  it('renders fallback string for missing render function', () => {
    render(<DataTable columns={columns} data={data} />)
    // age column has no render fn — defaults to String(row[col.key])
    expect(screen.getByText('30')).toBeDefined()
    expect(screen.getByText('25')).toBeDefined()
  })

  it('handles null/undefined values in cells gracefully', () => {
    const dataWithNull: Record<string, unknown>[] = [
      { name: 'Alice', age: null },
    ]
    render(<DataTable columns={columns} data={dataWithNull} />)
    // should render empty string for null value
    expect(screen.getByText('Alice')).toBeDefined()
  })
})
