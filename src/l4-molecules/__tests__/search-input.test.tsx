import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { SearchInput } from '../search-input'

describe('SearchInput', () => {
  it('renders with search icon', () => {
    const { container } = render(
      <SearchInput value="" onChange={() => {}} />,
    )
    const svg = container.querySelector('svg')
    expect(svg).not.toBeNull()
  })

  it('clears value on X click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<SearchInput value="hello" onChange={onChange} />)

    const clearBtn = screen.getByLabelText('Clear search')
    await user.click(clearBtn)

    expect(onChange).toHaveBeenCalledWith('')
  })

  it('fires onSearch on Enter', async () => {
    const user = userEvent.setup()
    const onSearch = vi.fn()
    render(<SearchInput value="test" onChange={() => {}} onSearch={onSearch} />)

    const input = screen.getByDisplayValue('test')
    await user.click(input)
    await user.keyboard('{Enter}')

    expect(onSearch).toHaveBeenCalledWith('test')
  })

  it('shows loading spinner instead of search icon', () => {
    render(<SearchInput value="" onChange={() => {}} loading />)
    expect(screen.getByRole('status')).toBeDefined()
  })

  it('respects disabled state', () => {
    const { container } = render(
      <SearchInput value="" onChange={() => {}} disabled />,
    )
    const input = container.querySelector('input')
    expect(input).toHaveAttribute('disabled')
  })
})
