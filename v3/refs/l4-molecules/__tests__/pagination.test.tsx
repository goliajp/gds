import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Pagination } from '../pagination'

describe('Pagination', () => {
  it('renders without crash', () => {
    const { container } = render(
      <Pagination page={1} totalPages={5} onPageChange={vi.fn()} />
    )
    expect(
      container.querySelector('[data-component="pagination"]')
    ).not.toBeNull()
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

  it('navigates to previous page', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination page={3} totalPages={5} onPageChange={onPageChange} />)
    await user.click(screen.getByLabelText('Previous page'))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('navigates to next page', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination page={3} totalPages={5} onPageChange={onPageChange} />)
    await user.click(screen.getByLabelText('Next page'))
    expect(onPageChange).toHaveBeenCalledWith(4)
  })

  it('marks current page with aria-current', () => {
    render(<Pagination page={2} totalPages={5} onPageChange={vi.fn()} />)
    const buttons = screen.getAllByRole('button')
    const current = buttons.find(
      (b) => b.getAttribute('aria-current') === 'page'
    )
    expect(current?.textContent).toBe('2')
  })

  it('renders ellipsis for large page counts', () => {
    const { container } = render(
      <Pagination page={5} totalPages={20} onPageChange={vi.fn()} />
    )
    const ellipsis = container.querySelectorAll('span')
    // should have at least one ellipsis
    const hasEllipsis = Array.from(ellipsis).some((s) => s.textContent === '…')
    expect(hasEllipsis).toBe(true)
  })

  it('shows left dots when page is far from start', () => {
    const { container } = render(
      <Pagination page={10} totalPages={20} onPageChange={vi.fn()} />
    )
    const spans = container.querySelectorAll('span')
    const dots = Array.from(spans).filter((s) => s.textContent === '…')
    expect(dots.length).toBe(2) // both left and right dots
  })

  it('shows only right dots when near start', () => {
    const { container } = render(
      <Pagination page={2} totalPages={20} onPageChange={vi.fn()} />
    )
    const spans = container.querySelectorAll('span')
    const dots = Array.from(spans).filter((s) => s.textContent === '…')
    expect(dots.length).toBe(1) // only right dots
  })
})
