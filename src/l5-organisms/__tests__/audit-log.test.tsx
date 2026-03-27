import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AuditLog } from '../audit-log'

const entries = [
  { id: '1', timestamp: '09:00', user: 'Alice', action: 'created', target: 'Invoice #1' },
  { id: '2', timestamp: '10:00', user: 'Bob', action: 'approved' },
  { id: '3', timestamp: '11:00', user: 'Carol', action: 'deleted', variant: 'danger' as const },
]

describe('AuditLog', () => {
  it('renders with data-component', () => {
    const { container } = render(<AuditLog entries={entries} />)
    expect(container.querySelector('[data-component="audit-log"]')).not.toBeNull()
  })

  it('renders all entries', () => {
    render(<AuditLog entries={entries} />)
    expect(screen.getByText('Alice')).toBeDefined()
    expect(screen.getByText('Bob')).toBeDefined()
    expect(screen.getByText('Carol')).toBeDefined()
  })

  it('renders empty log', () => {
    const { container } = render(<AuditLog entries={[]} />)
    expect(container.querySelector('[data-component="audit-log"]')).not.toBeNull()
  })
})
