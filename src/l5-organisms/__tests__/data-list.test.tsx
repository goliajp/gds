import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DataList } from '../data-list'

describe('DataList', () => {
  const items = [
    { label: 'Name', value: 'Alice' },
    { label: 'Role', value: 'Engineer' },
    { label: 'Team', value: 'Platform' },
  ]

  it('renders all items', () => {
    render(<DataList items={items} />)
    expect(screen.getByText('Name')).toBeDefined()
    expect(screen.getByText('Alice')).toBeDefined()
    expect(screen.getByText('Role')).toBeDefined()
    expect(screen.getByText('Engineer')).toBeDefined()
  })

  it('renders vertical layout by default', () => {
    const { container } = render(<DataList items={items} />)
    const el = container.querySelector('[data-component="data-list"]')
    expect(el?.getAttribute('data-variant')).toBe('vertical')
  })

  it('renders horizontal layout', () => {
    const { container } = render(<DataList items={items} layout="horizontal" />)
    const el = container.querySelector('[data-component="data-list"]')
    expect(el?.getAttribute('data-variant')).toBe('horizontal')
  })

  it('applies striped styling', () => {
    const { container } = render(<DataList items={items} striped />)
    const rows = container.querySelectorAll('[data-component="data-list"] > div')
    // second row (index 1) should have striped class
    expect(rows[1]?.className).toContain('bg-bg-tertiary/20')
    // first row (index 0) should not
    expect(rows[0]?.className).not.toContain('bg-bg-tertiary/20')
  })
})
