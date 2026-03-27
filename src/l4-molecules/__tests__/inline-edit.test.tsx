import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { InlineEdit } from '../inline-edit'

describe('InlineEdit', () => {
  it('renders value in display mode', () => {
    render(<InlineEdit value="Hello" onSave={() => {}} />)
    expect(screen.getByText('Hello')).toBeDefined()
  })

  it('enters edit mode on click', async () => {
    const user = userEvent.setup()
    const { container } = render(<InlineEdit value="Hello" onSave={() => {}} />)
    const display = container.querySelector('[data-state="display"]')
    expect(display).not.toBeNull()
    await user.click(display!)
    const editing = container.querySelector('[data-state="editing"]')
    expect(editing).not.toBeNull()
  })

  it('saves on Enter', async () => {
    const user = userEvent.setup()
    const onSave = vi.fn()
    const { container } = render(<InlineEdit value="Hello" onSave={onSave} />)
    await user.click(container.querySelector('[data-state="display"]')!)
    const input = container.querySelector('input')!
    await user.clear(input)
    await user.type(input, 'World{Enter}')
    expect(onSave).toHaveBeenCalledWith('World')
  })

  it('cancels on Escape', async () => {
    const user = userEvent.setup()
    const onSave = vi.fn()
    const onCancel = vi.fn()
    const { container } = render(<InlineEdit value="Hello" onSave={onSave} onCancel={onCancel} />)
    await user.click(container.querySelector('[data-state="display"]')!)
    const input = container.querySelector('input')!
    await user.type(input, 'Changed{Escape}')
    expect(onSave).not.toHaveBeenCalled()
    expect(onCancel).toHaveBeenCalledOnce()
  })

  it('shows validation error', async () => {
    const user = userEvent.setup()
    const validate = (v: string) => (v === '' ? 'Required' : null)
    const { container } = render(<InlineEdit value="Hello" onSave={() => {}} validate={validate} />)
    await user.click(container.querySelector('[data-state="display"]')!)
    const input = container.querySelector('input')!
    await user.clear(input)
    await user.click(screen.getByLabelText('Save'))
    expect(screen.getByText('Required')).toBeDefined()
  })
})
