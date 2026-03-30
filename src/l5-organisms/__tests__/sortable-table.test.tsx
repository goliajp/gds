import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { SortableTable } from '../sortable-table'

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'age', header: 'Age' },
  { key: 'role', header: 'Role', sortable: false },
]

const data = [
  { name: 'Alice', age: 30, role: 'Dev' },
  { name: 'Charlie', age: 25, role: 'PM' },
  { name: 'Bob', age: 35, role: 'Design' },
]

describe('SortableTable', () => {
  it('has data-component="sortable-table"', () => {
    const { container } = render(
      <SortableTable columns={columns} data={data} />
    )
    expect(
      container.querySelector('[data-component="sortable-table"]')
    ).not.toBeNull()
  })

  it('renders column headers', () => {
    render(<SortableTable columns={columns} data={data} />)
    expect(screen.getByText('Name')).toBeDefined()
    expect(screen.getByText('Age')).toBeDefined()
    expect(screen.getByText('Role')).toBeDefined()
  })

  it('renders all data rows', () => {
    render(<SortableTable columns={columns} data={data} />)
    expect(screen.getByText('Alice')).toBeDefined()
    expect(screen.getByText('Bob')).toBeDefined()
    expect(screen.getByText('Charlie')).toBeDefined()
  })

  it('sorts data when clicking a sortable header', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <SortableTable columns={columns} data={data} />
    )
    await user.click(screen.getByText('Name'))
    const cells = container.querySelectorAll('tbody td:first-child')
    expect(cells[0]?.textContent).toBe('Alice')
    expect(cells[1]?.textContent).toBe('Bob')
    expect(cells[2]?.textContent).toBe('Charlie')
  })

  it('shows sort indicator after clicking header', async () => {
    const user = userEvent.setup()
    render(<SortableTable columns={columns} data={data} />)
    await user.click(screen.getByText('Name'))
    expect(screen.getByText('▲')).toBeDefined()
  })

  it('toggles to descending on second click', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <SortableTable columns={columns} data={data} />
    )
    await user.click(screen.getByText('Name'))
    expect(screen.getByText('▲')).toBeDefined()
    await user.click(screen.getByText('Name'))
    expect(screen.getByText('▼')).toBeDefined()
    // descending order
    const cells = container.querySelectorAll('tbody td:first-child')
    expect(cells[0]?.textContent).toBe('Charlie')
    expect(cells[2]?.textContent).toBe('Alice')
  })

  it('switches sort column when clicking different header', async () => {
    const user = userEvent.setup()
    render(<SortableTable columns={columns} data={data} />)
    await user.click(screen.getByText('Name'))
    await user.click(screen.getByText('Age'))
    // should sort by age ascending now
    expect(screen.getByText('▲')).toBeDefined()
  })

  it('does not sort when clicking non-sortable column', async () => {
    const user = userEvent.setup()
    render(<SortableTable columns={columns} data={data} />)
    await user.click(screen.getByText('Role'))
    // no sort indicator should appear
    expect(screen.queryByText('▲')).toBeNull()
    expect(screen.queryByText('▼')).toBeNull()
  })

  it('accepts defaultSort prop', () => {
    const { container } = render(
      <SortableTable
        columns={columns}
        data={data}
        defaultSort={{ key: 'name', dir: 'asc' }}
      />
    )
    expect(screen.getByText('▲')).toBeDefined()
    const cells = container.querySelectorAll('tbody td:first-child')
    expect(cells[0]?.textContent).toBe('Alice')
  })

  it('accepts defaultSort with desc direction', () => {
    const { container } = render(
      <SortableTable
        columns={columns}
        data={data}
        defaultSort={{ key: 'name', dir: 'desc' }}
      />
    )
    expect(screen.getByText('▼')).toBeDefined()
    const cells = container.querySelectorAll('tbody td:first-child')
    expect(cells[0]?.textContent).toBe('Charlie')
  })

  it('sorts numerically with numeric option', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <SortableTable columns={columns} data={data} />
    )
    await user.click(screen.getByText('Age'))
    const cells = container.querySelectorAll('tbody td:nth-child(2)')
    expect(cells[0]?.textContent).toBe('25')
    expect(cells[1]?.textContent).toBe('30')
    expect(cells[2]?.textContent).toBe('35')
  })

  it('applies custom className', () => {
    const { container } = render(
      <SortableTable columns={columns} data={data} className="my-table" />
    )
    const root = container.querySelector('[data-component="sortable-table"]')
    expect(root?.className).toContain('my-table')
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<SortableTable columns={columns} data={data} ref={ref} />)
    expect(ref.current).not.toBeNull()
  })

  it('handles null values in data gracefully', () => {
    const dataWithNull = [
      { name: null, age: null, role: 'Dev' },
      { name: 'Bob', age: 35, role: 'Design' },
    ]
    render(
      <SortableTable
        columns={columns}
        data={dataWithNull as unknown as Record<string, unknown>[]}
      />
    )
    // should not crash
    expect(screen.getByText('Bob')).toBeDefined()
  })
})
