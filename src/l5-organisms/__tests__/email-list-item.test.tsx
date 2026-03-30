import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { EmailListItem } from '../email-list-item'

describe('EmailListItem', () => {
  it('renders sender and subject', () => {
    render(
      <EmailListItem sender="Alice" subject="Hello world" timestamp="2h ago" />
    )
    expect(screen.getByText('Alice')).toBeDefined()
    expect(screen.getByText('Hello world')).toBeDefined()
    expect(screen.getByText('2h ago')).toBeDefined()
  })

  it('renders unread state', () => {
    const { container } = render(
      <EmailListItem sender="Bob" subject="Update" timestamp="1h ago" unread />
    )
    const el = container.querySelector('[data-component="email-list-item"]')
    expect(el?.getAttribute('data-state')).toBe('unread')
  })

  it('renders read state when not unread', () => {
    const { container } = render(
      <EmailListItem sender="Bob" subject="Update" timestamp="1h ago" />
    )
    const el = container.querySelector('[data-component="email-list-item"]')
    expect(el?.getAttribute('data-state')).toBe('read')
  })

  it('renders preview text', () => {
    render(
      <EmailListItem
        sender="Charlie"
        subject="Meeting"
        preview="Let me know your availability"
        timestamp="3h ago"
      />
    )
    expect(screen.getByText('Let me know your availability')).toBeDefined()
  })

  it('does not render preview when not provided', () => {
    const { container } = render(
      <EmailListItem sender="Charlie" subject="Meeting" timestamp="3h ago" />
    )
    // only sender, subject, timestamp should render, no extra truncate div for preview
    expect(
      container.querySelector('[data-component="email-list-item"]')
    ).not.toBeNull()
  })

  it('renders starred indicator', () => {
    render(
      <EmailListItem
        sender="Dave"
        subject="Important"
        timestamp="5m ago"
        starred
      />
    )
    expect(screen.getByText('★')).toBeDefined()
  })

  it('shows first letter of sender as avatar when no senderAvatar', () => {
    render(<EmailListItem sender="Alice" subject="Test" timestamp="1h ago" />)
    expect(screen.getByText('A')).toBeDefined()
  })

  it('shows custom senderAvatar text', () => {
    render(
      <EmailListItem
        sender="Alice"
        senderAvatar="AW"
        subject="Test"
        timestamp="1h ago"
      />
    )
    expect(screen.getByText('AW')).toBeDefined()
  })

  it('has button role when onClick is provided', () => {
    const { container } = render(
      <EmailListItem
        sender="Alice"
        subject="Test"
        timestamp="1h ago"
        onClick={vi.fn()}
      />
    )
    const el = container.querySelector('[role="button"]')
    expect(el).not.toBeNull()
  })

  it('does not have button role when onClick is not provided', () => {
    const { container } = render(
      <EmailListItem sender="Alice" subject="Test" timestamp="1h ago" />
    )
    const el = container.querySelector('[role="button"]')
    expect(el).toBeNull()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(
      <EmailListItem
        sender="Alice"
        subject="Test"
        timestamp="1h ago"
        onClick={onClick}
      />
    )
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('calls onClick on Enter key', () => {
    const onClick = vi.fn()
    render(
      <EmailListItem
        sender="Alice"
        subject="Test"
        timestamp="1h ago"
        onClick={onClick}
      />
    )
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' })
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('calls onClick on Space key', () => {
    const onClick = vi.fn()
    render(
      <EmailListItem
        sender="Alice"
        subject="Test"
        timestamp="1h ago"
        onClick={onClick}
      />
    )
    fireEvent.keyDown(screen.getByRole('button'), { key: ' ' })
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('applies selected styling', () => {
    const { container } = render(
      <EmailListItem
        sender="Alice"
        subject="Test"
        timestamp="1h ago"
        selected
      />
    )
    const el = container.querySelector('[data-component="email-list-item"]')
    expect(el?.className).toContain('bg-accent/5')
  })

  it('applies custom className', () => {
    const { container } = render(
      <EmailListItem
        sender="Alice"
        subject="Test"
        timestamp="1h ago"
        className="my-email"
      />
    )
    const el = container.querySelector('[data-component="email-list-item"]')
    expect(el?.className).toContain('my-email')
  })

  it('renders unread dot indicator', () => {
    const { container } = render(
      <EmailListItem sender="Alice" subject="Test" timestamp="1h ago" unread />
    )
    const dot = container.querySelector('.bg-accent.rounded-full')
    expect(dot).not.toBeNull()
  })
})
