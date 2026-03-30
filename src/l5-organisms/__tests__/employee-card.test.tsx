import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { EmployeeCard } from '../employee-card'

describe('EmployeeCard', () => {
  it('renders with data-component', () => {
    const { container } = render(<EmployeeCard name="Alice Smith" />)
    expect(
      container.querySelector('[data-component="employee-card"]')
    ).not.toBeNull()
  })

  it('renders name and role', () => {
    render(
      <EmployeeCard
        name="Alice Smith"
        role="Engineer"
        department="Engineering"
      />
    )
    expect(screen.getByText('Alice Smith')).toBeDefined()
    expect(screen.getByText('Engineer')).toBeDefined()
    expect(screen.getByText('Engineering')).toBeDefined()
  })

  it('renders initials when no avatar', () => {
    render(<EmployeeCard name="Alice Smith" />)
    expect(screen.getByText('AS')).toBeDefined()
  })

  it('renders status badge and contact info', () => {
    render(
      <EmployeeCard
        name="Bob"
        status="active"
        email="bob@golia.jp"
        phone="+81-90-1234"
      />
    )
    expect(screen.getByText('active')).toBeDefined()
    expect(screen.getByText('bob@golia.jp')).toBeDefined()
    expect(screen.getByText('+81-90-1234')).toBeDefined()
  })
})
