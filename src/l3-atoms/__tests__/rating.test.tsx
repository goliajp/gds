import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Rating } from '../rating'

describe('Rating', () => {
  it('has data-component="rating"', () => {
    const { container } = render(<Rating value={3} />)
    expect(container.querySelector('[data-component="rating"]')).not.toBeNull()
  })

  it('renders 5 stars by default', () => {
    const { container } = render(<Rating readonly value={3} />)
    const root = container.querySelector('[data-component="rating"]')
    const stars = root?.querySelectorAll(':scope > span')
    expect(stars?.length).toBe(5)
  })

  it('renders custom max stars', () => {
    const { container } = render(<Rating max={10} readonly value={3} />)
    const root = container.querySelector('[data-component="rating"]')
    const stars = root?.querySelectorAll(':scope > span')
    expect(stars?.length).toBe(10)
  })

  it('renders spans (not buttons) in readonly mode', () => {
    render(<Rating readonly value={3} />)
    expect(screen.queryAllByRole('button')).toHaveLength(0)
  })

  it('renders buttons in interactive mode', () => {
    render(<Rating value={3} />)
    expect(screen.getAllByRole('button')).toHaveLength(5)
  })

  it('calls onChange with star index on click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Rating onChange={onChange} value={2} />)
    const buttons = screen.getAllByRole('button')
    await user.click(buttons[3]) // 4th star
    expect(onChange).toHaveBeenCalledWith(4)
  })
})
