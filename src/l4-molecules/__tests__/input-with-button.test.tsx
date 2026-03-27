import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { InputWithButton } from '../input-with-button'

describe('InputWithButton', () => {
  it('has data-component="input-with-button"', () => {
    const { container } = render(
      <InputWithButton buttonLabel="Go" onChange={() => {}} onSubmit={() => {}} value="" />,
    )
    expect(container.querySelector('[data-component="input-with-button"]')).not.toBeNull()
  })

  it('calls onSubmit when button clicked', () => {
    const onSubmit = vi.fn()
    const { container } = render(
      <InputWithButton buttonLabel="Go" onChange={() => {}} onSubmit={onSubmit} value="test" />,
    )
    const button = container.querySelector('button')
    fireEvent.click(button!)
    expect(onSubmit).toHaveBeenCalledOnce()
  })

  it('calls onChange when input value changes', () => {
    const onChange = vi.fn()
    const { container } = render(
      <InputWithButton buttonLabel="Go" onChange={onChange} onSubmit={() => {}} value="" />,
    )
    const input = container.querySelector('input')
    fireEvent.change(input!, { target: { value: 'hello' } })
    expect(onChange).toHaveBeenCalledWith('hello')
  })
})
