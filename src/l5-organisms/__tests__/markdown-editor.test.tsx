import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { MarkdownEditor } from '../markdown-editor'

describe('MarkdownEditor', () => {
  it('has data-component="markdown-editor"', () => {
    const { container } = render(
      <MarkdownEditor value="" onChange={() => {}} />
    )
    expect(
      container.querySelector('[data-component="markdown-editor"]')
    ).not.toBeNull()
  })

  it('renders textarea with value', () => {
    render(<MarkdownEditor value="# Hello" onChange={() => {}} />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeDefined()
    expect((textarea as HTMLTextAreaElement).value).toBe('# Hello')
  })

  it('calls onChange when typing', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<MarkdownEditor value="" onChange={onChange} />)
    await user.type(screen.getByRole('textbox'), 'a')
    expect(onChange).toHaveBeenCalledWith('a')
  })
})
