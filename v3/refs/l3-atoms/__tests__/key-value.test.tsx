import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { KeyValue } from '../key-value'

describe('KeyValue', () => {
  it('renders with data-component', () => {
    const { container } = render(<KeyValue label="Name" value="Alice" />)
    expect(
      container.querySelector('[data-component="key-value"]')
    ).not.toBeNull()
  })

  it('displays label and value', () => {
    render(<KeyValue label="Status" value="Active" />)
    expect(screen.getByText('Status')).toBeDefined()
    expect(screen.getByText('Active')).toBeDefined()
  })

  it('applies monospace font when mono is true', () => {
    const { container } = render(<KeyValue label="ID" value="abc-123" mono />)
    const valueEl = container.querySelector('.font-mono')
    expect(valueEl).not.toBeNull()
  })
})
