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

  it('sends empty values when no input provided', () => {
    const onSend = vi.fn()
    render(<MailComposer onSend={onSend} />)
    fireEvent.click(screen.getByText('Send'))
    expect(onSend).toHaveBeenCalledWith({
      to: '',
      subject: '',
      body: '',
    })
  })

  it('applies custom className', () => {
    const { container } = render(<MailComposer onSend={() => {}} className="my-form" />)
    const el = container.querySelector('[data-component="mail-composer"]')
    expect(el?.className).toContain('my-form')
  })

  it('sets default empty value for to field when no defaultTo', () => {
    render(<MailComposer onSend={() => {}} />)
    const toInput = screen.getByPlaceholderText('To') as HTMLInputElement
    expect(toInput.defaultValue).toBe('')
  })
})
