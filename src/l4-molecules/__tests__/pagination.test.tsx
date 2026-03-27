import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Pagination } from '../pagination'

describe('Pagination', () => {
  it('renders without crash', () => {
    const { container } = render(
      <Pagination page={1} totalPages={5} onPageChange={vi.fn()} />,
    )
    expect(container.querySelector('[data-component="pagination"]')).not.toBeNull()
  })

  it('has aria-label="Pagination"', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={vi.fn()} />)
    expect(screen.getByLabelText('Pagination')).toBeDefined()
  })

  it('renders page buttons for small page count', () => {
    render(<Pagination page={1} totalPages={3} onPageChange={vi.fn()} />)
    expect(screen.getByText('1')).toBeDefined()
    expect(screen.getByText('2')).toBeDefined()
    expect(screen.getByText('3')).toBeDefined()
  })

  it('disables previous button on first page', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={vi.fn()} />)
    const prevBtn = screen.getByLabelText('Previous page')
    expect(prevBtn.hasAttribute('disabled')).toBe(true)
  })

  it('disables next button on last page', () => {
    render(<Pagination page={5} totalPages={5} onPageChange={vi.fn()} />)
    const nextBtn = screen.getByLabelText('Next page')
    expect(nextBtn.hasAttribute('disabled')).toBe(true)
  })

  it('calls onPageChange when a page button is clicked', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination page={1} totalPages={5} onPageChange={onPageChange} />)
    await user.click(screen.getByText('3'))
    expect(onPageChange).toHaveBeenCalledWith(3)
  })
})
