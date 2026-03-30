import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

// mock sanitize to avoid dompurify dependency
vi.mock('../../utils/sanitize', () => ({
  sanitizeEmailHtml: (html: string) => html,
}))

import type { EmailMessage } from '../email-thread'
import { EmailThread } from '../email-thread'

function makeMessage(overrides: Partial<EmailMessage> = {}): EmailMessage {
  return {
    id: '1',
    from: 'alice@example.com',
    fromName: 'Alice',
    to: ['bob@example.com'],
    date: '2025-01-15T10:00:00Z',
    subject: 'Hello',
    textBody: 'Hello Bob',
    htmlBody: null,
    isOwn: false,
    ...overrides,
  }
}

describe('EmailThread', () => {
  it('renders with data-component="email-thread"', () => {
    const { container } = render(<EmailThread messages={[makeMessage()]} />)
    expect(container.querySelector('[data-component="email-thread"]')).not.toBeNull()
  })

  it('renders message list with role="list"', () => {
    render(<EmailThread messages={[makeMessage()]} />)
    expect(screen.getByRole('list')).toBeDefined()
  })

  it('renders all messages as listitems', () => {
    const messages = [
      makeMessage({ id: '1', fromName: 'Alice' }),
      makeMessage({ id: '2', fromName: 'Bob' }),
    ]
    render(<EmailThread messages={messages} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  it('renders sender name', () => {
    render(<EmailThread messages={[makeMessage({ fromName: 'Alice' })]} />)
    expect(screen.getByText('Alice')).toBeDefined()
  })

  it('shows own messages with data-own="true"', () => {
    const { container } = render(
      <EmailThread messages={[makeMessage({ isOwn: true })]} />,
    )
    const bubble = container.querySelector('[data-component="email-message-bubble"]')
    expect(bubble?.getAttribute('data-own')).toBe('true')
  })

  it('shows received messages with data-own="false"', () => {
    const { container } = render(
      <EmailThread messages={[makeMessage({ isOwn: false })]} />,
    )
    const bubble = container.querySelector('[data-component="email-message-bubble"]')
    expect(bubble?.getAttribute('data-own')).toBe('false')
  })

  it('expands last message by default', () => {
    const messages = [
      makeMessage({ id: '1' }),
      makeMessage({ id: '2' }),
    ]
    const { container } = render(<EmailThread messages={messages} />)
    const bubbles = container.querySelectorAll('[data-component="email-message-bubble"]')
    expect(bubbles[0]?.getAttribute('data-state')).toBe('collapsed')
    expect(bubbles[1]?.getAttribute('data-state')).toBe('expanded')
  })

  it('toggles expand/collapse on header click', () => {
    const messages = [makeMessage({ id: '1' })]
    const { container } = render(<EmailThread messages={messages} />)
    const bubble = container.querySelector('[data-component="email-message-bubble"]')
    expect(bubble?.getAttribute('data-state')).toBe('expanded')

    // click the toggle button (first button inside the bubble header)
    const toggleBtn = bubble?.querySelector('button')
    if (toggleBtn !== null && toggleBtn !== undefined) {
      fireEvent.click(toggleBtn)
    }
    expect(bubble?.getAttribute('data-state')).toBe('collapsed')
  })

  it('calls onReply callback when reply button clicked', () => {
    const onReply = vi.fn()
    const msg = makeMessage({ id: '1' })
    render(<EmailThread messages={[msg]} onReply={onReply} />)
    // find the Reply tooltip button
    const replyBtn = screen.getByTitle('Reply')
    fireEvent.click(replyBtn)
    expect(onReply).toHaveBeenCalledOnce()
    expect(onReply).toHaveBeenCalledWith(msg)
  })

  it('expands all messages when expandAll is true', () => {
    const messages = [
      makeMessage({ id: '1' }),
      makeMessage({ id: '2' }),
    ]
    const { container } = render(<EmailThread messages={messages} expandAll />)
    const bubbles = container.querySelectorAll('[data-component="email-message-bubble"]')
    expect(bubbles[0]?.getAttribute('data-state')).toBe('expanded')
    expect(bubbles[1]?.getAttribute('data-state')).toBe('expanded')
  })

  it('applies custom className', () => {
    const { container } = render(
      <EmailThread messages={[makeMessage()]} className="my-thread" />,
    )
    const el = container.querySelector('[data-component="email-thread"]')
    expect(el?.className).toContain('my-thread')
  })
})
