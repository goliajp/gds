import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Editable } from '../editable'

describe('Editable', () => {
  it('renders value text', () => {
    render(<Editable value="Hello" onChange={() => {}} />)
    expect(screen.getByText('Hello')).toBeDefined()
  })

  it('enters edit mode on click', async () => {
    const user = userEvent.setup()
    render(<Editable value="Hello" onChange={() => {}} />)
    await user.click(screen.getByText('Hello'))
    const input = screen.getByDisplayValue('Hello')
    expect(input.tagName).toBe('INPUT')
  })

  it('saves on Enter', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Editable value="Hello" onChange={onChange} />)
    await user.click(screen.getByText('Hello'))
    const input = screen.getByDisplayValue('Hello')
    await user.clear(input)
    await user.type(input, 'World{Enter}')
    expect(onChange).toHaveBeenCalledWith('World')
  })

  it('cancels on Escape', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Editable value="Hello" onChange={onChange} />)
    await user.click(screen.getByText('Hello'))
    const input = screen.getByDisplayValue('Hello')
    await user.clear(input)
    await user.type(input, 'World{Escape}')
    // should revert to display mode with original value
    expect(screen.getByText('Hello')).toBeDefined()
    expect(onChange).not.toHaveBeenCalled()
  })

  it('shows placeholder when value is empty', () => {
    render(
      <Editable value="" onChange={() => {}} placeholder="Click to edit" />
    )
    expect(screen.getByText('Click to edit')).toBeDefined()
  })

  it('does not enter edit mode when disabled', async () => {
    const user = userEvent.setup()
    render(<Editable value="Hello" onChange={() => {}} disabled />)
    await user.click(screen.getByText('Hello'))
    // should still be in display mode
    expect(screen.getByText('Hello').tagName).not.toBe('INPUT')
  })

  it('enters edit mode on Enter key in display mode', async () => {
    const user = userEvent.setup()
    render(<Editable value="Hello" onChange={() => {}} />)
    const display = screen.getByText('Hello')
    display.focus()
    await user.keyboard('{Enter}')
    const input = screen.getByDisplayValue('Hello')
    expect(input.tagName).toBe('INPUT')
  })

  it('enters edit mode on Space key in display mode', async () => {
    const user = userEvent.setup()
    render(<Editable value="Hello" onChange={() => {}} />)
    const display = screen.getByText('Hello')
    display.focus()
    await user.keyboard(' ')
    const input = screen.getByDisplayValue('Hello')
    expect(input.tagName).toBe('INPUT')
  })

  it('saves on blur', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Editable value="Hello" onChange={onChange} />)
    await user.click(screen.getByText('Hello'))
    const input = screen.getByDisplayValue('Hello')
    await user.clear(input)
    await user.type(input, 'Bye')
    await user.tab()
    expect(onChange).toHaveBeenCalledWith('Bye')
  })

  it('has tabIndex -1 when disabled', () => {
    const { container } = render(
      <Editable value="Hi" onChange={() => {}} disabled />
    )
    const el = container.querySelector('[data-component="editable"]')
    expect(el?.getAttribute('tabindex')).toBe('-1')
  })

  it('has data-state="display" in display mode', () => {
    const { container } = render(<Editable value="Hi" onChange={() => {}} />)
    const el = container.querySelector('[data-component="editable"]')
    expect(el?.getAttribute('data-state')).toBe('display')
  })
})
