import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { NumberInput } from '../number-input'

describe('NumberInput', () => {
  it('renders with placeholder', () => {
    render(<NumberInput onChange={vi.fn()} placeholder="enter" value={null} />)
    expect(screen.getByPlaceholderText('enter')).toBeTruthy()
  })

  it('displays current value', () => {
    render(<NumberInput onChange={vi.fn()} value={42} />)
    expect((screen.getByRole('spinbutton') as HTMLInputElement).value).toBe(
      '42'
    )
  })

  it('calls onChange with incremented value on + click', () => {
    const onChange = vi.fn()
    render(<NumberInput onChange={onChange} step={5} value={10} />)
    fireEvent.click(screen.getByLabelText('increment'))
    expect(onChange).toHaveBeenCalledWith(15)
  })

  it('calls onChange with decremented value on - click', () => {
    const onChange = vi.fn()
    render(<NumberInput onChange={onChange} step={3} value={10} />)
    fireEvent.click(screen.getByLabelText('decrement'))
    expect(onChange).toHaveBeenCalledWith(7)
  })

  it('clamps to min', () => {
    const onChange = vi.fn()
    render(<NumberInput min={0} onChange={onChange} step={1} value={0} />)
    fireEvent.click(screen.getByLabelText('decrement'))
    expect(onChange).toHaveBeenCalledWith(0)
  })

  it('clamps to max', () => {
    const onChange = vi.fn()
    render(<NumberInput max={10} onChange={onChange} step={1} value={10} />)
    fireEvent.click(screen.getByLabelText('increment'))
    expect(onChange).toHaveBeenCalledWith(10)
  })

  it('applies error state', () => {
    render(<NumberInput error onChange={vi.fn()} value={1} />)
    const container = screen
      .getByRole('spinbutton')
      .closest('[data-component="number-input"]')
    expect(container?.className).toContain('border-danger')
  })

  it('applies disabled state', () => {
    render(<NumberInput disabled onChange={vi.fn()} value={1} />)
    expect((screen.getByRole('spinbutton') as HTMLInputElement).disabled).toBe(
      true
    )
    expect(
      (screen.getByLabelText('increment') as HTMLButtonElement).disabled
    ).toBe(true)
    expect(
      (screen.getByLabelText('decrement') as HTMLButtonElement).disabled
    ).toBe(true)
  })

  it('calls onChange with null when input cleared', () => {
    const onChange = vi.fn()
    render(<NumberInput onChange={onChange} value={5} />)
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '' } })
    expect(onChange).toHaveBeenCalledWith(null)
  })

  it('increments via ArrowUp key', () => {
    const onChange = vi.fn()
    render(<NumberInput onChange={onChange} step={1} value={3} />)
    fireEvent.keyDown(screen.getByRole('spinbutton'), { key: 'ArrowUp' })
    expect(onChange).toHaveBeenCalledWith(4)
  })

  it('decrements via ArrowDown key', () => {
    const onChange = vi.fn()
    render(<NumberInput onChange={onChange} step={1} value={3} />)
    fireEvent.keyDown(screen.getByRole('spinbutton'), { key: 'ArrowDown' })
    expect(onChange).toHaveBeenCalledWith(2)
  })

  it('applies glass styles', () => {
    render(<NumberInput glass onChange={vi.fn()} value={1} />)
    const container = screen
      .getByRole('spinbutton')
      .closest('[data-component="number-input"]')
    expect(container?.className).toContain('gds-glass')
  })

  it('applies sm size variant', () => {
    render(<NumberInput inputSize="sm" onChange={vi.fn()} value={1} />)
    const container = screen
      .getByRole('spinbutton')
      .closest('[data-component="number-input"]')
    expect(container?.className).toContain('gds-h-sm')
  })
})
