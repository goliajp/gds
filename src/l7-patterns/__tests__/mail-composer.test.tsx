import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { MailComposer } from '../mail-composer'

describe('MailComposer', () => {
  it('renders data-component attribute', () => {
    const { container } = render(<MailComposer onSend={() => {}} />)
    expect(container.querySelector('[data-component="mail-composer"]')).not.toBeNull()
  })

  it('renders input fields and send button', () => {
    render(<MailComposer onSend={() => {}} />)
    expect(screen.getByPlaceholderText('To')).toBeDefined()
    expect(screen.getByPlaceholderText('Subject')).toBeDefined()
    expect(screen.getByPlaceholderText('Body')).toBeDefined()
    expect(screen.getByText('Send')).toBeDefined()
  })

  it('calls onSend with form data on submit', () => {
    const onSend = vi.fn()
    render(<MailComposer onSend={onSend} defaultTo="test@golia.jp" />)
    fireEvent.change(screen.getByPlaceholderText('Subject'), { target: { value: 'Hello' } })
    fireEvent.change(screen.getByPlaceholderText('Body'), { target: { value: 'World' } })
    fireEvent.click(screen.getByText('Send'))
    expect(onSend).toHaveBeenCalledWith({
      to: 'test@golia.jp',
      subject: 'Hello',
      body: 'World',
    })
  })
})
