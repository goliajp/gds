import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import type { EmailContact } from '../email-composer-field'
import { EmailComposerField } from '../email-composer-field'

const defaultProps = {
  label: 'To',
  value: [] as EmailContact[],
  onChange: vi.fn(),
  onSearch: vi.fn(async () => []),
}

describe('EmailComposerField', () => {
  it('renders with data-component="email-composer-field"', () => {
    const { container } = render(<EmailComposerField {...defaultProps} />)
    expect(
      container.querySelector('[data-component="email-composer-field"]')
    ).not.toBeNull()
  })

  it('renders label', () => {
    render(<EmailComposerField {...defaultProps} label="Cc" />)
    expect(screen.getByText('Cc')).toBeDefined()
  })

  it('renders existing contacts as chips', () => {
    const contacts: EmailContact[] = [
      { email: 'alice@example.com', name: 'Alice' },
      { email: 'bob@example.com', name: 'Bob' },
    ]
    render(<EmailComposerField {...defaultProps} value={contacts} />)
    expect(screen.getByText('Alice')).toBeDefined()
    expect(screen.getByText('Bob')).toBeDefined()
  })

  it('adds contact on Enter with valid email', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<EmailComposerField {...defaultProps} onChange={onChange} />)
    const input = screen.getByRole('combobox')
    await user.type(input, 'test@example.com{Enter}')
    expect(onChange).toHaveBeenCalledWith([{ email: 'test@example.com' }])
  })

  it('does not add contact on Enter with invalid email', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<EmailComposerField {...defaultProps} onChange={onChange} />)
    const input = screen.getByRole('combobox')
    await user.type(input, 'notanemail{Enter}')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('removes contact when chip X is clicked', () => {
    const contacts: EmailContact[] = [
      { email: 'alice@example.com', name: 'Alice' },
    ]
    const onChange = vi.fn()
    render(
      <EmailComposerField
        {...defaultProps}
        value={contacts}
        onChange={onChange}
      />
    )
    const removeBtn = screen.getByLabelText('Remove Alice')
    fireEvent.click(removeBtn)
    expect(onChange).toHaveBeenCalledWith([])
  })

  it('removes last contact on Backspace when input is empty', async () => {
    const user = userEvent.setup()
    const contacts: EmailContact[] = [
      { email: 'alice@example.com', name: 'Alice' },
      { email: 'bob@example.com', name: 'Bob' },
    ]
    const onChange = vi.fn()
    render(
      <EmailComposerField
        {...defaultProps}
        value={contacts}
        onChange={onChange}
      />
    )
    const input = screen.getByRole('combobox')
    await user.click(input)
    await user.keyboard('{Backspace}')
    expect(onChange).toHaveBeenCalledWith([
      { email: 'alice@example.com', name: 'Alice' },
    ])
  })

  it('applies glass classes when glass={true}', () => {
    const { container } = render(<EmailComposerField {...defaultProps} glass />)
    const wrapper = container.querySelector(
      '[data-component="email-composer-field"]'
    )
    // glass class is applied to inner wrapper div
    const inner = wrapper?.querySelector('.border-white\\/10')
    expect(inner).not.toBeNull()
  })

  it('applies custom className', () => {
    const { container } = render(
      <EmailComposerField {...defaultProps} className="my-field" />
    )
    const el = container.querySelector(
      '[data-component="email-composer-field"]'
    )
    expect(el?.className).toContain('my-field')
  })

  it('renders placeholder when no contacts', () => {
    render(
      <EmailComposerField {...defaultProps} placeholder="Add recipients" />
    )
    expect(screen.getByPlaceholderText('Add recipients')).toBeDefined()
  })

  it('shows default placeholder from label when no custom placeholder', () => {
    render(<EmailComposerField {...defaultProps} label="To" />)
    expect(screen.getByPlaceholderText('to@example.com')).toBeDefined()
  })
})
