import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ResponsiveTable } from '../responsive-table'

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
]

const data = [
  { name: 'Alice', role: 'Engineer' },
  { name: 'Bob', role: 'Designer' },
]

describe('ResponsiveTable', () => {
  it('renders table with data-component', () => {
    const { container } = render(
      <ResponsiveTable columns={columns} data={data} />,
    )
    expect(container.querySelector('[data-component="responsive-table"]')).not.toBeNull()
  })

  it('renders data rows in table mode', () => {
    const { getByText } = render(
      <ResponsiveTable columns={columns} data={data} />,
    )
    expect(getByText('Alice')).toBeDefined()
    expect(getByText('Bob')).toBeDefined()
    expect(getByText('Name')).toBeDefined()
  })

  it('sets data-component attribute', () => {
    const { container } = render(
      <ResponsiveTable columns={columns} data={data} />,
    )
    const el = container.querySelector('[data-component="responsive-table"]')
    expect(el).not.toBeNull()
    expect(el?.getAttribute('data-mode')).toBe('table')
  })

  it('supports glass prop', () => {
    const { container } = render(
      <ResponsiveTable columns={columns} data={data} glass />,
    )
    expect(container.querySelector('[data-component="responsive-table"]')).not.toBeNull()
  })

  it('applies custom className', () => {
    const { container } = render(
      <ResponsiveTable columns={columns} data={data} className="my-table" />,
    )
    expect(container.querySelector('[data-component="responsive-table"]')).not.toBeNull()
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<ResponsiveTable columns={columns} data={data} ref={ref} />)
    expect(ref.current).not.toBeNull()
  })

  it('renders column headers in table mode', () => {
    const { getByText } = render(
      <ResponsiveTable columns={columns} data={data} />,
    )
    expect(getByText('Name')).toBeDefined()
    expect(getByText('Role')).toBeDefined()
  })

  it('renders all data cell values', () => {
    const { getByText } = render(
      <ResponsiveTable columns={columns} data={data} />,
    )
    expect(getByText('Engineer')).toBeDefined()
    expect(getByText('Designer')).toBeDefined()
  })
})
