import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { OtpInput } from '../otp-input'

describe('OtpInput', () => {
  it('renders without crash', () => {
    const { container } = render(<OtpInput onComplete={vi.fn()} />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<OtpInput onComplete={vi.fn()} />)
    expect(
      container.querySelector('[data-component="otp-input"]')
    ).not.toBeNull()
  })

  it('renders 6 input fields by default', () => {
    const { container } = render(<OtpInput onComplete={vi.fn()} />)
    const inputs = container.querySelectorAll('input')
    expect(inputs.length).toBe(6)
  })

  it('renders custom length inputs', () => {
    const { container } = render(<OtpInput length={4} onComplete={vi.fn()} />)
    const inputs = container.querySelectorAll('input')
    expect(inputs.length).toBe(4)
  })
})
