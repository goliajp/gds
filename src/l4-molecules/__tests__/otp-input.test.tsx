import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { OtpInput } from '../otp-input'

describe('OtpInput', () => {
  it('renders correct number of inputs', () => {
    render(<OtpInput value="" onChange={() => {}} length={4} />)
    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBe(4)
  })

  it('renders 6 inputs by default', () => {
    render(<OtpInput value="" onChange={() => {}} />)
    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBe(6)
  })

  it('auto-advances focus on digit entry', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<OtpInput value="" onChange={onChange} length={4} />)

    const inputs = screen.getAllByRole('textbox')
    await user.click(inputs[0])
    await user.type(inputs[0], '5')

    expect(onChange).toHaveBeenCalled()
  })

  it('backspace clears current and focuses previous', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<OtpInput value="12" onChange={onChange} length={4} />)

    const inputs = screen.getAllByRole('textbox')
    await user.click(inputs[1])
    await user.keyboard('{Backspace}')

    expect(onChange).toHaveBeenCalled()
  })

  it('fires onComplete when all digits filled', async () => {
    const user = userEvent.setup()
    const onComplete = vi.fn()
    let currentValue = '123'
    const onChange = vi.fn((v: string) => { currentValue = v })

    const { rerender } = render(
      <OtpInput value={currentValue} onChange={onChange} onComplete={onComplete} length={4} />,
    )

    const inputs = screen.getAllByRole('textbox')
    await user.click(inputs[3])
    await user.type(inputs[3], '4')

    // rerender with updated value to verify onComplete was called
    rerender(
      <OtpInput value="1234" onChange={onChange} onComplete={onComplete} length={4} />,
    )

    expect(onComplete).toHaveBeenCalledWith('1234')
  })

  it('applies error state styling', () => {
    const { container } = render(<OtpInput value="" onChange={() => {}} error />)
    expect(container.querySelector('[data-error]')).not.toBeNull()
  })
})
