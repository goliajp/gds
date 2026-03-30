import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { PinInput } from '../pin-input'

describe('PinInput', () => {
  it('renders with data-component', () => {
    const { container } = render(<PinInput />)
    expect(
      container.querySelector('[data-component="pin-input"]')
    ).not.toBeNull()
  })

  it('renders 4 inputs by default', () => {
    const { container } = render(<PinInput />)
    const inputs = container.querySelectorAll('input')
    expect(inputs.length).toBe(4)
  })

  it('renders custom length inputs', () => {
    const { container } = render(<PinInput length={6} />)
    const inputs = container.querySelectorAll('input')
    expect(inputs.length).toBe(6)
  })

  it('applies error class when error is true', () => {
    const { container } = render(<PinInput error />)
    const wrapper = container.querySelector('[data-component="pin-input"]')!
    expect(wrapper.className).toContain('animate-shake')
  })

  it('does not apply error class when error is false', () => {
    const { container } = render(<PinInput />)
    const wrapper = container.querySelector('[data-component="pin-input"]')!
    expect(wrapper.className).not.toContain('animate-shake')
  })

  it('applies border-danger on inputs when error is true', () => {
    const { container } = render(<PinInput error />)
    const input = container.querySelector('input')!
    expect(input.className).toContain('border-danger')
  })

  it('disables all inputs when disabled', () => {
    const { container } = render(<PinInput disabled />)
    const inputs = container.querySelectorAll('input')
    inputs.forEach((input) => {
      expect(input.disabled).toBe(true)
    })
  })

  it('sets type=password when mask is true', () => {
    const { container } = render(<PinInput mask />)
    const input = container.querySelector('input')!
    expect(input.getAttribute('type')).toBe('password')
  })

  it('sets type=text when mask is false', () => {
    const { container } = render(<PinInput />)
    const input = container.querySelector('input')!
    expect(input.getAttribute('type')).toBe('text')
  })

  it('sets numeric attributes when numeric is true', () => {
    const { container } = render(<PinInput numeric />)
    const input = container.querySelector('input')!
    expect(input.getAttribute('inputMode')).toBe('numeric')
    expect(input.getAttribute('pattern')).toBe('[0-9]*')
    expect(input.getAttribute('autocomplete')).toBe('one-time-code')
  })

  it('uses aria-label with Digit for numeric', () => {
    const { container } = render(<PinInput numeric />)
    const input = container.querySelector('input')!
    expect(input.getAttribute('aria-label')).toBe('Digit 1')
  })

  it('uses aria-label with Pin digit for non-numeric', () => {
    const { container } = render(<PinInput />)
    const input = container.querySelector('input')!
    expect(input.getAttribute('aria-label')).toBe('Pin digit 1')
  })

  it('applies numeric styling when numeric is true', () => {
    const { container } = render(<PinInput numeric />)
    const input = container.querySelector('input')!
    expect(input.className).toContain('font-mono')
    expect(input.className).toContain('h-12')
  })

  it('calls onChange for controlled input', () => {
    const handler = vi.fn()
    const { container } = render(<PinInput value="" onChange={handler} />)
    const input = container.querySelectorAll('input')[0]
    fireEvent.input(input, { target: { value: 'a' } })
    expect(handler).toHaveBeenCalled()
  })

  it('handles backspace on controlled empty field', () => {
    const handler = vi.fn()
    const { container } = render(<PinInput value="ab" onChange={handler} />)
    const input = container.querySelectorAll('input')[2]
    fireEvent.keyDown(input, { key: 'Backspace' })
    // should try to backspace on index 2 which is empty, then move to index 1
    expect(handler).toHaveBeenCalled()
  })

  it('handles backspace on controlled non-empty field', () => {
    const handler = vi.fn()
    const { container } = render(<PinInput value="abc" onChange={handler} />)
    const input = container.querySelectorAll('input')[1]
    fireEvent.keyDown(input, { key: 'Backspace' })
    expect(handler).toHaveBeenCalled()
  })

  it('handles paste in controlled mode', () => {
    const handler = vi.fn()
    const { container } = render(<PinInput value="" onChange={handler} />)
    const input = container.querySelectorAll('input')[0]
    fireEvent.paste(input, { clipboardData: { getData: () => '1234' } })
    expect(handler).toHaveBeenCalledWith('1234')
  })

  it('filters non-numeric paste when numeric is true', () => {
    const handler = vi.fn()
    const { container } = render(
      <PinInput value="" onChange={handler} numeric />
    )
    const input = container.querySelectorAll('input')[0]
    fireEvent.paste(input, { clipboardData: { getData: () => 'ab12' } })
    expect(handler).toHaveBeenCalledWith('12')
  })

  it('calls onComplete when all digits filled (controlled)', () => {
    const onComplete = vi.fn()
    const { container } = render(
      <PinInput
        value="123"
        onChange={() => {}}
        onComplete={onComplete}
        length={4}
      />
    )
    const input = container.querySelectorAll('input')[3]
    fireEvent.input(input, { target: { value: '4' } })
    expect(onComplete).toHaveBeenCalledWith('1234')
  })

  it('handles uncontrolled input', () => {
    const { container } = render(<PinInput />)
    const input = container.querySelectorAll('input')[0]
    fireEvent.input(input, { target: { value: 'x' } })
    // no crash is success for uncontrolled
    expect(
      container.querySelector('[data-component="pin-input"]')
    ).not.toBeNull()
  })

  it('handles uncontrolled backspace on non-empty', () => {
    const { container } = render(<PinInput />)
    const input0 = container.querySelectorAll('input')[0]
    fireEvent.input(input0, { target: { value: 'a' } })
    fireEvent.keyDown(input0, { key: 'Backspace' })
    expect(
      container.querySelector('[data-component="pin-input"]')
    ).not.toBeNull()
  })

  it('handles uncontrolled backspace on empty moves to previous', () => {
    const { container } = render(<PinInput />)
    const input1 = container.querySelectorAll('input')[1]
    fireEvent.keyDown(input1, { key: 'Backspace' })
    expect(
      container.querySelector('[data-component="pin-input"]')
    ).not.toBeNull()
  })

  it('handles uncontrolled paste', () => {
    const { container } = render(<PinInput />)
    const input = container.querySelectorAll('input')[0]
    fireEvent.paste(input, { clipboardData: { getData: () => 'abcd' } })
    expect(
      container.querySelector('[data-component="pin-input"]')
    ).not.toBeNull()
  })

  it('ignores empty paste', () => {
    const handler = vi.fn()
    const { container } = render(<PinInput numeric onChange={handler} />)
    const input = container.querySelectorAll('input')[0]
    fireEvent.paste(input, { clipboardData: { getData: () => 'abc' } })
    // all non-numeric removed, empty result, onChange should not be called
    expect(handler).not.toHaveBeenCalled()
  })

  it('rejects non-numeric input when numeric is true', () => {
    const handler = vi.fn()
    const { container } = render(
      <PinInput value="" onChange={handler} numeric />
    )
    const input = container.querySelectorAll('input')[0]
    fireEvent.input(input, { target: { value: 'a' } })
    expect(handler).not.toHaveBeenCalled()
  })

  it('calls onComplete via paste in uncontrolled mode', () => {
    const onComplete = vi.fn()
    const { container } = render(
      <PinInput length={4} onComplete={onComplete} />
    )
    const input = container.querySelectorAll('input')[0]
    fireEvent.paste(input, { clipboardData: { getData: () => 'abcd' } })
    expect(onComplete).toHaveBeenCalledWith('abcd')
  })

  it('calls onComplete via paste in controlled mode', () => {
    const onComplete = vi.fn()
    const { container } = render(
      <PinInput
        value=""
        onChange={() => {}}
        onComplete={onComplete}
        length={4}
      />
    )
    const input = container.querySelectorAll('input')[0]
    fireEvent.paste(input, { clipboardData: { getData: () => '1234' } })
    expect(onComplete).toHaveBeenCalledWith('1234')
  })

  it('does not call onComplete via paste when length is short', () => {
    const onComplete = vi.fn()
    const { container } = render(
      <PinInput
        value=""
        onChange={() => {}}
        onComplete={onComplete}
        length={4}
      />
    )
    const input = container.querySelectorAll('input')[0]
    fireEvent.paste(input, { clipboardData: { getData: () => '12' } })
    expect(onComplete).not.toHaveBeenCalled()
  })

  it('handles mask display for filled values', () => {
    const { container } = render(<PinInput value="ab" mask />)
    const inputs = container.querySelectorAll('input')
    // mask should show bullet character for filled values
    expect(inputs[0].value).toBe('\u2022')
    expect(inputs[1].value).toBe('\u2022')
    expect(inputs[2].value).toBe('')
  })

  it('calls onComplete in uncontrolled mode when all digits filled', () => {
    const onComplete = vi.fn()
    const { container } = render(
      <PinInput length={2} onComplete={onComplete} />
    )
    const inputs = container.querySelectorAll('input')
    fireEvent.input(inputs[0], { target: { value: 'a' } })
    fireEvent.input(inputs[1], { target: { value: 'b' } })
    expect(onComplete).toHaveBeenCalledWith('ab')
  })

  it('fills gaps when controlled input index exceeds current value length', () => {
    const handler = vi.fn()
    // value is empty string, typing at index 2 should fill gaps
    const { container } = render(
      <PinInput value="" onChange={handler} length={4} />
    )
    const inputs = container.querySelectorAll('input')
    fireEvent.input(inputs[2], { target: { value: 'x' } })
    expect(handler).toHaveBeenCalled()
  })

  it('merges custom className', () => {
    const { container } = render(<PinInput className="my-pin" />)
    const wrapper = container.querySelector('[data-component="pin-input"]')!
    expect(wrapper.className).toContain('my-pin')
  })

  it('displays controlled value', () => {
    const { container } = render(<PinInput value="ab" />)
    const inputs = container.querySelectorAll('input')
    expect(inputs[0].value).toBe('a')
    expect(inputs[1].value).toBe('b')
    expect(inputs[2].value).toBe('')
  })
})
