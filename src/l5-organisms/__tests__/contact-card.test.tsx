import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ContactCard } from '../contact-card'

describe('ContactCard', () => {
  it('renders with data-component', () => {
    const { container } = render(<ContactCard name="Alice" />)
    expect(container.querySelector('[data-component="contact-card"]')).not.toBeNull()
  })

  it('renders name and role', () => {
    render(<ContactCard name="Alice Smith" role="Engineer" />)
    expect(screen.getByText('Alice Smith')).toBeDefined()
    expect(screen.getByText('Engineer')).toBeDefined()
  })

  it('renders initials when no avatar', () => {
    render(<ContactCard name="Alice Smith" />)
    expect(screen.getByText('AS')).toBeDefined()
  })

  it('renders contact info', () => {
    render(<ContactCard name="Bob" email="bob@example.com" phone="+1-555-0100" />)
    expect(screen.getByText('bob@example.com')).toBeDefined()
    expect(screen.getByText('+1-555-0100')).toBeDefined()
  })
})
