import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { VisualCounter } from '../visual-counter'

describe('VisualCounter', () => {
  it('has data-component="visual-counter"', () => {
    const { container } = render(<VisualCounter value={3} onChange={vi.fn()} />)
    expect(
      container.querySelector('[data-component="visual-counter"]')
    ).not.toBeNull()
  })

  it('displays the current value', () => {
    render(<VisualCounter value={7} onChange={vi.fn()} />)
    expect(screen.getByText('7')).toBeDefined()
  })

  it('calls onChange with incremented value on plus click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<VisualCounter value={5} onChange={onChange} />)
    const buttons = screen.getAllByRole('button')
    await user.click(buttons[1]) // plus button
    expect(onChange).toHaveBeenCalledWith(6)
  })

  it('disables minus button at min', () => {
    render(<VisualCounter value={0} min={0} onChange={vi.fn()} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons[0]).toBeDisabled()
  })

  it('disables plus button at max', () => {
    render(<VisualCounter value={10} max={10} onChange={vi.fn()} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons[1]).toBeDisabled()
  })

  it('calls onChange with decremented value on minus click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<VisualCounter value={5} onChange={onChange} />)
    const buttons = screen.getAllByRole('button')
    await user.click(buttons[0]) // minus button
    expect(onChange).toHaveBeenCalledWith(4)
  })

  it('disables both buttons when disabled is true', () => {
    render(<VisualCounter value={5} onChange={vi.fn()} disabled />)
    const buttons = screen.getAllByRole('button')
    expect(buttons[0]).toBeDisabled()
    expect(buttons[1]).toBeDisabled()
  })

  it('respects custom step', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<VisualCounter value={10} step={5} onChange={onChange} />)
    const buttons = screen.getAllByRole('button')
    await user.click(buttons[1]) // plus
    expect(onChange).toHaveBeenCalledWith(15)
  })

  it('clamps decrement to min', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<VisualCounter value={2} min={0} step={5} onChange={onChange} />)
    const buttons = screen.getAllByRole('button')
    await user.click(buttons[0]) // minus
    expect(onChange).toHaveBeenCalledWith(0)
  })

  it('clamps increment to max', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<VisualCounter value={8} max={10} step={5} onChange={onChange} />)
    const buttons = screen.getAllByRole('button')
    await user.click(buttons[1]) // plus
    expect(onChange).toHaveBeenCalledWith(10)
  })
})
