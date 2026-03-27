import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { KvTable } from '../kv-table'

const items = [
  { key: 'Name', value: 'Alice' },
  { key: 'Role', value: 'Engineer' },
  { key: 'Team', value: 'Platform' },
]

describe('KvTable', () => {
  it('renders keys and values', () => {
    render(<KvTable items={items} />)
    expect(screen.getByText('Name')).toBeDefined()
    expect(screen.getByText('Alice')).toBeDefined()
    expect(screen.getByText('Role')).toBeDefined()
  })

  it('sets 1col variant by default', () => {
    const { container } = render(<KvTable items={items} />)
    const el = container.querySelector('[data-component="kv-table"]')
    expect(el?.getAttribute('data-variant')).toBe('1col')
  })

  it('sets 2col variant', () => {
    const { container } = render(<KvTable items={items} columns={2} />)
    const el = container.querySelector('[data-component="kv-table"]')
    expect(el?.getAttribute('data-variant')).toBe('2col')
    expect(el?.className).toContain('grid-cols-2')
  })

  it('applies striped styling to odd rows', () => {
    const { container } = render(<KvTable items={items} striped />)
    const rows = container.querySelectorAll('[data-component="kv-table"] > div')
    expect(rows[0]?.className).not.toContain('bg-bg-tertiary')
    expect(rows[1]?.className).toContain('bg-bg-tertiary')
  })
})
