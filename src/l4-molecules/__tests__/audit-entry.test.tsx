import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AuditEntry } from '../audit-entry'

describe('AuditEntry', () => {
  it('renders with data-component', () => {
    const { container } = render(
      <AuditEntry timestamp="2026-03-01 09:00" user="Alice" action="created" />,
    )
    expect(container.querySelector('[data-component="audit-entry"]')).not.toBeNull()
  })

  it('renders timestamp, user, and action', () => {
    render(<AuditEntry timestamp="2026-03-01 09:00" user="Alice" action="approved" />)
    expect(screen.getByText('2026-03-01 09:00')).toBeDefined()
    expect(screen.getByText('Alice')).toBeDefined()
    expect(screen.getByText('approved')).toBeDefined()
  })

  it('renders target when provided', () => {
    render(<AuditEntry timestamp="10:00" user="Bob" action="deleted" target="Invoice #42" />)
    expect(screen.getByText('Invoice #42')).toBeDefined()
  })
})
