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

  it('calls onSubmit when Enter is pressed in input', () => {
    const onSubmit = vi.fn()
    const { container } = render(
      <InputWithButton buttonLabel="Go" onChange={() => {}} onSubmit={onSubmit} value="test" />,
    )
    const input = container.querySelector('input')
    fireEvent.keyDown(input!, { key: 'Enter' })
    expect(onSubmit).toHaveBeenCalledOnce()
  })

  it('does not call onSubmit for non-Enter key', () => {
    const onSubmit = vi.fn()
    const { container } = render(
      <InputWithButton buttonLabel="Go" onChange={() => {}} onSubmit={onSubmit} value="test" />,
    )
    const input = container.querySelector('input')
    fireEvent.keyDown(input!, { key: 'a' })
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('disables input and button when disabled is true', () => {
    const { container } = render(
      <InputWithButton buttonLabel="Go" onChange={() => {}} onSubmit={() => {}} value="" disabled />,
    )
    const input = container.querySelector('input')
    const button = container.querySelector('button')
    expect(input?.disabled).toBe(true)
    expect(button?.disabled).toBe(true)
  })

  it('renders placeholder text', () => {
    const { container } = render(
      <InputWithButton buttonLabel="Go" onChange={() => {}} onSubmit={() => {}} value="" placeholder="Enter value" />,
    )
    const input = container.querySelector('input')
    expect(input?.getAttribute('placeholder')).toBe('Enter value')
  })

  it('applies custom className', () => {
    const { container } = render(
      <InputWithButton buttonLabel="Go" onChange={() => {}} onSubmit={() => {}} value="" className="my-class" />,
    )
    const el = container.querySelector('[data-component="input-with-button"]')
    expect(el?.className).toContain('my-class')
  })

  it('forwards ref', () => {
    let refNode: HTMLDivElement | null = null
    render(
      <InputWithButton
        buttonLabel="Go"
        onChange={() => {}}
        onSubmit={() => {}}
        value=""
        ref={(node) => { refNode = node }}
      />,
    )
    expect(refNode).not.toBeNull()
  })
})
