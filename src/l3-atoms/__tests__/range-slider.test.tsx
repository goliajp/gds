import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { RangeSlider } from '../range-slider'

describe('RangeSlider', () => {
  it('renders an input[type=range]', () => {
    render(<RangeSlider value={50} onChange={() => {}} />)
    expect(screen.getByRole('slider')).toBeDefined()
  })

  it('has data-component="range-slider"', () => {
    const { container } = render(<RangeSlider value={50} onChange={() => {}} />)
    expect(container.querySelector('[data-component="range-slider"]')).not.toBeNull()
  })

  it('sets min, max, step, value on the input', () => {
    render(<RangeSlider value={30} min={10} max={200} step={5} onChange={() => {}} />)
    const slider = screen.getByRole('slider')
    expect(slider.getAttribute('min')).toBe('10')
    expect(slider.getAttribute('max')).toBe('200')
    expect(slider.getAttribute('step')).toBe('5')
    expect(slider.getAttribute('value')).toBe('30')
  })

  it('calls onChange with numeric value on input', async () => {
    const onChange = vi.fn()
    render(<RangeSlider value={50} onChange={onChange} />)
    const slider = screen.getByRole('slider')
    await userEvent.click(slider)
    // fireEvent.change is more reliable for range inputs
    const { fireEvent } = await import('@testing-library/react')
    fireEvent.change(slider, { target: { value: '75' } })
    expect(onChange).toHaveBeenCalledWith(75)
  })

  it('shows value label when showValue is true', () => {
    const { container } = render(<RangeSlider value={42} onChange={() => {}} showValue />)
    expect(container.textContent).toContain('42')
  })

  it('does not show value label by default', () => {
    const { container } = render(<RangeSlider value={42} onChange={() => {}} />)
    expect(container.textContent).not.toContain('42')
  })

  it('applies disabled styling', () => {
    const { container } = render(<RangeSlider value={50} onChange={() => {}} disabled />)
    expect(container.querySelector('[data-state="disabled"]')).not.toBeNull()
    expect(screen.getByRole('slider').hasAttribute('disabled')).toBe(true)
  })
})
