import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { UserCard } from '../user-card'

describe('UserCard', () => {
  it('renders with data-component', () => {
    const { container } = render(<UserCard name="Alice" />)
    expect(container.querySelector('[data-component="user-card"]')).not.toBeNull()
  })

  it('renders name', () => {
    const { getByText } = render(<UserCard name="Alice Smith" />)
    expect(getByText('Alice Smith')).toBeDefined()
  })

  it('shows initials when no avatar', () => {
    const { getByText } = render(<UserCard name="Alice Smith" />)
    expect(getByText('AS')).toBeDefined()
  })

  it('shows avatar image when provided', () => {
    const { container } = render(<UserCard name="Alice" avatar="https://img.com/a.jpg" />)
    const img = container.querySelector('img')!
    expect(img).not.toBeNull()
    expect(img.getAttribute('src')).toBe('https://img.com/a.jpg')
    expect(img.getAttribute('alt')).toBe('Alice')
  })

  it('does not render img when avatar is undefined', () => {
    const { container } = render(<UserCard name="Alice" />)
    expect(container.querySelector('img')).toBeNull()
  })

  it('renders role when provided', () => {
    const { getByText } = render(<UserCard name="Alice" role="Engineer" />)
    expect(getByText('Engineer')).toBeDefined()
  })

  it('renders department when provided', () => {
    const { getByText } = render(<UserCard name="Alice" department="R&D" />)
    expect(getByText('R&D')).toBeDefined()
  })

  it('renders separator between role and department', () => {
    const { getByText } = render(<UserCard name="Alice" role="Engineer" department="R&D" />)
    expect(getByText('/')).toBeDefined()
  })

  it('does not render separator with only role', () => {
    const { queryByText } = render(<UserCard name="Alice" role="Engineer" />)
    expect(queryByText('/')).toBeNull()
  })

  it('does not render role/department line when neither provided', () => {
    const { container } = render(<UserCard name="Alice" />)
    // info div should only have the name span
    const infoDiv = container.querySelector('.flex.min-w-0.flex-col')!
    expect(infoDiv.children.length).toBe(1)
  })

  it('renders email when provided', () => {
    const { getByText } = render(<UserCard name="Alice" email="alice@example.com" />)
    expect(getByText('alice@example.com')).toBeDefined()
  })

  it('does not render email section when not provided', () => {
    const { container } = render(<UserCard name="Alice" />)
    const emailSvgs = container.querySelectorAll('rect')
    expect(emailSvgs.length).toBe(0)
  })

  it('renders status dot when status provided', () => {
    const { container } = render(<UserCard name="Alice" status="online" />)
    const dot = container.querySelector('.bg-success')
    expect(dot).not.toBeNull()
  })

  it('renders away status', () => {
    const { container } = render(<UserCard name="Alice" status="away" />)
    const dot = container.querySelector('.bg-warning')
    expect(dot).not.toBeNull()
  })

  it('renders busy status', () => {
    const { container } = render(<UserCard name="Alice" status="busy" />)
    const dot = container.querySelector('.bg-danger')
    expect(dot).not.toBeNull()
  })

  it('renders offline status', () => {
    const { container } = render(<UserCard name="Alice" status="offline" />)
    const dot = container.querySelector('.bg-fg-muted\\/40')
    expect(dot).not.toBeNull()
  })

  it('does not render status dot when status is undefined', () => {
    const { container } = render(<UserCard name="Alice" />)
    const dots = container.querySelectorAll('.rounded-full.border-2')
    expect(dots.length).toBe(0)
  })

  it('applies glass class when glass is true', () => {
    const { container } = render(<UserCard name="Alice" glass />)
    const el = container.querySelector('[data-component="user-card"]')!
    expect(el.className).toContain('gds-glass')
  })

  it('does not apply glass when glass is false', () => {
    const { container } = render(<UserCard name="Alice" glass={false} />)
    const el = container.querySelector('[data-component="user-card"]')!
    expect(el.className).not.toContain('gds-glass')
  })

  it('renders children', () => {
    const { getByText } = render(<UserCard name="Alice"><span>Action</span></UserCard>)
    expect(getByText('Action')).toBeDefined()
  })

  it('merges custom className', () => {
    const { container } = render(<UserCard name="Alice" className="extra" />)
    const el = container.querySelector('[data-component="user-card"]')!
    expect(el.className).toContain('extra')
  })
})
