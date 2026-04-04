import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

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

  it('renders copyable button for copyable items', () => {
    const copyItems = [{ key: 'Token', value: 'abc123', copyable: true }]
    render(<KvTable items={copyItems} />)
    expect(screen.getByLabelText('Copy Token')).toBeDefined()
  })

  it('does not render copy button for non-copyable items', () => {
    render(<KvTable items={items} />)
    expect(screen.queryByLabelText('Copy Name')).toBeNull()
  })

  it('copies value on copy button click', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      writable: true,
      configurable: true,
    })

    const copyItems = [{ key: 'Token', value: 'abc123', copyable: true }]
    render(<KvTable items={copyItems} />)
    await userEvent.click(screen.getByLabelText('Copy Token'))
    expect(writeText).toHaveBeenCalledWith('abc123')
  })

  it('copies non-string value as string', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      writable: true,
      configurable: true,
    })

    const copyItems = [
      { key: 'Count', value: 42 as unknown as string, copyable: true },
    ]
    render(<KvTable items={copyItems} />)
    await userEvent.click(screen.getByLabelText('Copy Count'))
    expect(writeText).toHaveBeenCalledWith('42')
  })

  it('applies custom className', () => {
    const { container } = render(<KvTable items={items} className="my-cls" />)
    const el = container.querySelector('[data-component="kv-table"]')
    expect(el?.className).toContain('my-cls')
  })
})
