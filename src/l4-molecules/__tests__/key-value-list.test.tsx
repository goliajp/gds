import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { KeyValueList } from '../key-value-list'

const items = [
  { key: 'Name', value: 'Alice' },
  { key: 'Age', value: '30' },
]

describe('KeyValueList', () => {
  it('renders with data-component', () => {
    const { container } = render(<KeyValueList items={items} />)
    expect(
      container.querySelector('[data-component="key-value-list"]')
    ).not.toBeNull()
  })

  it('renders all items', () => {
    const { getByText } = render(<KeyValueList items={items} />)
    expect(getByText('Name')).toBeDefined()
    expect(getByText('Alice')).toBeDefined()
    expect(getByText('Age')).toBeDefined()
    expect(getByText('30')).toBeDefined()
  })

  it('defaults to 1 column', () => {
    const { container } = render(<KeyValueList items={items} />)
    const el = container.querySelector('[data-component="key-value-list"]')!
    expect(el.className).toContain('grid-cols-1')
  })

  it('applies 2 columns when specified', () => {
    const { container } = render(<KeyValueList items={items} columns={2} />)
    const el = container.querySelector('[data-component="key-value-list"]')!
    expect(el.className).toContain('grid-cols-2')
  })

  it('merges custom className', () => {
    const { container } = render(
      <KeyValueList items={items} className="my-class" />
    )
    const el = container.querySelector('[data-component="key-value-list"]')!
    expect(el.className).toContain('my-class')
  })

  it('renders empty list without error', () => {
    const { container } = render(<KeyValueList items={[]} />)
    expect(
      container.querySelector('[data-component="key-value-list"]')
    ).not.toBeNull()
  })
})
