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
    const { container } = render(
      <InlineEdit value="Hello" onSave={onSave} onCancel={onCancel} />
    )
    await user.click(container.querySelector('[data-state="display"]')!)
    const input = container.querySelector('input')!
    await user.type(input, 'Changed{Escape}')
    expect(onSave).not.toHaveBeenCalled()
    expect(onCancel).toHaveBeenCalledOnce()
  })

  it('shows validation error', async () => {
    const user = userEvent.setup()
    const validate = (v: string) => (v === '' ? 'Required' : null)
    const { container } = render(
      <InlineEdit value="Hello" onSave={() => {}} validate={validate} />
    )
    await user.click(container.querySelector('[data-state="display"]')!)
    const input = container.querySelector('input')!
    await user.clear(input)
    await user.click(screen.getByLabelText('Save'))
    expect(screen.getByText('Required')).toBeDefined()
  })

  it('does not enter edit mode when disabled', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <InlineEdit value="Hello" onSave={() => {}} disabled />
    )
    await user.click(container.querySelector('[data-state="display"]')!)
    expect(container.querySelector('[data-state="editing"]')).toBeNull()
  })

  it('shows placeholder when value is empty', () => {
    render(<InlineEdit value="" onSave={() => {}} placeholder="Enter text" />)
    expect(screen.getByText('Enter text')).toBeDefined()
  })

  it('clears error on input change', async () => {
    const user = userEvent.setup()
    const validate = (v: string) => (v === '' ? 'Required' : null)
    const { container } = render(
      <InlineEdit value="Hello" onSave={() => {}} validate={validate} />
    )
    await user.click(container.querySelector('[data-state="display"]')!)
    const input = container.querySelector('input')!
    await user.clear(input)
    await user.click(screen.getByLabelText('Save'))
    expect(screen.getByText('Required')).toBeDefined()
    // type something to clear the error
    await user.type(input, 'X')
    expect(screen.queryByText('Required')).toBeNull()
  })

  it('saves with cancel button', async () => {
    const user = userEvent.setup()
    const onSave = vi.fn()
    const onCancel = vi.fn()
    const { container } = render(
      <InlineEdit value="Hello" onSave={onSave} onCancel={onCancel} />
    )
    await user.click(container.querySelector('[data-state="display"]')!)
    await user.click(screen.getByLabelText('Cancel'))
    expect(onSave).not.toHaveBeenCalled()
    expect(onCancel).toHaveBeenCalledOnce()
  })

  it('has tabIndex=-1 when disabled', () => {
    const { container } = render(
      <InlineEdit value="X" onSave={() => {}} disabled />
    )
    const el = container.querySelector('[data-component="inline-edit"]')
    expect(el?.getAttribute('tabindex')).toBe('-1')
  })

  it('enters edit mode via keyboard Enter on display', async () => {
    const user = userEvent.setup()
    const { container } = render(<InlineEdit value="Hello" onSave={() => {}} />)
    const display = container.querySelector('[data-state="display"]')!
    ;(display as HTMLElement).focus()
    await user.keyboard('{Enter}')
    expect(container.querySelector('[data-state="editing"]')).not.toBeNull()
  })

  it('validates on Enter and does not save if invalid', async () => {
    const user = userEvent.setup()
    const onSave = vi.fn()
    const validate = (v: string) => (v === '' ? 'Required' : null)
    const { container } = render(
      <InlineEdit value="Hello" onSave={onSave} validate={validate} />
    )
    await user.click(container.querySelector('[data-state="display"]')!)
    const input = container.querySelector('input')!
    await user.clear(input)
    await user.keyboard('{Enter}')
    expect(onSave).not.toHaveBeenCalled()
    expect(screen.getByText('Required')).toBeDefined()
  })
})
