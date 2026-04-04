import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { TextareaCounter } from '../textarea-counter'

describe('TextareaCounter', () => {
  it('renders textarea with character count', () => {
    render(<TextareaCounter value="hello" onChange={vi.fn()} />)
    expect(screen.getByRole('textbox')).toBeDefined()
    expect(screen.getByText('5')).toBeDefined()
  })

  it('shows count / maxLength when maxLength provided', () => {
    render(<TextareaCounter value="hi" onChange={vi.fn()} maxLength={100} />)
    expect(screen.getByText('2 / 100')).toBeDefined()
  })

  it('calls onChange when typing', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<TextareaCounter value="" onChange={onChange} />)
    await user.type(screen.getByRole('textbox'), 'a')
    expect(onChange).toHaveBeenCalledWith('a')
  })

  it('has data-component attribute', () => {
    const { container } = render(
      <TextareaCounter value="" onChange={vi.fn()} />
    )
    expect(
      container.querySelector('[data-component="textarea-counter"]')
    ).not.toBeNull()
  })

  it('shows danger style when near limit (90%+)', () => {
    const { container } = render(
      <TextareaCounter
        value={'a'.repeat(95)}
        onChange={vi.fn()}
        maxLength={100}
      />
    )
    const counter = container.querySelector(
      '[data-component="textarea-counter"] > div:last-child'
    )
    expect(counter?.className).toContain('text-danger')
  })

  it('shows muted style when not near limit', () => {
    const { container } = render(
      <TextareaCounter value="hello" onChange={vi.fn()} maxLength={100} />
    )
    const counter = container.querySelector(
      '[data-component="textarea-counter"] > div:last-child'
    )
    expect(counter?.className).toContain('text-fg-muted')
  })
})
