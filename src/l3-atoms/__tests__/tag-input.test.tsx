import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { TagInput } from '../tag-input'

describe('TagInput', () => {
  it('renders with placeholder', () => {
    render(<TagInput onChange={vi.fn()} placeholder="add a tag" value={[]} />)
    expect(screen.getByPlaceholderText('add a tag')).toBeDefined()
  })

  it('adds tag on Enter', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<TagInput onChange={onChange} value={[]} />)
    const input = screen.getByRole('textbox')
    await user.type(input, 'react{Enter}')
    expect(onChange).toHaveBeenCalledWith(['react'])
  })

  it('removes tag on X click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<TagInput onChange={onChange} value={['react', 'vue']} />)
    const removeButtons = screen.getAllByRole('button')
    await user.click(removeButtons[0])
    expect(onChange).toHaveBeenCalledWith(['vue'])
  })

  it('removes last tag on Backspace when input empty', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<TagInput onChange={onChange} value={['react', 'vue']} />)
    const input = screen.getByRole('textbox')
    await user.click(input)
    await user.keyboard('{Backspace}')
    expect(onChange).toHaveBeenCalledWith(['react'])
  })

  it('rejects duplicate tags', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<TagInput onChange={onChange} value={['react']} />)
    const input = screen.getByRole('textbox')
    await user.type(input, 'react{Enter}')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('respects maxTags', () => {
    render(<TagInput maxTags={2} onChange={vi.fn()} value={['react', 'vue']} />)
    expect(screen.queryByRole('textbox')).toBeNull()
  })

  it('applies error state classes', () => {
    const { container } = render(<TagInput error onChange={vi.fn()} value={[]} />)
    const wrapper = container.querySelector('[data-component="tag-input"]')
    expect(wrapper?.className).toContain('border-danger')
  })

  it('renders existing tags', () => {
    render(<TagInput onChange={vi.fn()} value={['react', 'vue']} />)
    expect(screen.getByText('react')).toBeDefined()
    expect(screen.getByText('vue')).toBeDefined()
  })

  it('has data-component="tag-input"', () => {
    const { container } = render(<TagInput onChange={vi.fn()} value={[]} />)
    expect(container.querySelector('[data-component="tag-input"]')).not.toBeNull()
  })

  it('clears input after adding tag', async () => {
    const user = userEvent.setup()
    render(<TagInput onChange={vi.fn()} value={[]} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    await user.type(input, 'react{Enter}')
    expect(input.value).toBe('')
  })
})
