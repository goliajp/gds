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
    render(<Editable value="" onChange={() => {}} placeholder="Click to edit" />)
    expect(screen.getByText('Click to edit')).toBeDefined()
  })
})
