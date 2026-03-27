import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { EmailListItem } from '../email-list-item'

describe('EmailListItem', () => {
  it('renders sender and subject', () => {
    render(<EmailListItem sender="Alice" subject="Hello world" timestamp="2h ago" />)
    expect(screen.getByText('Alice')).toBeDefined()
    expect(screen.getByText('Hello world')).toBeDefined()
    expect(screen.getByText('2h ago')).toBeDefined()
  })

  it('renders unread state', () => {
    const { container } = render(
      <EmailListItem sender="Bob" subject="Update" timestamp="1h ago" unread />,
    )
    const el = container.querySelector('[data-component="email-list-item"]')
    expect(el?.getAttribute('data-state')).toBe('unread')
  })

  it('renders preview text', () => {
    render(
      <EmailListItem sender="Charlie" subject="Meeting" preview="Let me know your availability" timestamp="3h ago" />,
    )
    expect(screen.getByText('Let me know your availability')).toBeDefined()
  })

  it('renders starred indicator', () => {
    render(
      <EmailListItem sender="Dave" subject="Important" timestamp="5m ago" starred />,
    )
    expect(screen.getByText('★')).toBeDefined()
  })
})
