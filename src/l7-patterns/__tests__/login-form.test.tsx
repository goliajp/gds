import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { LoginForm } from '../login-form'

describe('LoginForm', () => {
  it('has data-component="login-form"', () => {
    const { container } = render(<LoginForm onSubmit={vi.fn()} />)
    expect(
      container.querySelector('[data-component="login-form"]')
    ).not.toBeNull()
  })

  it('renders title', () => {
    render(<LoginForm onSubmit={vi.fn()} title="Welcome" />)
    expect(screen.getByText('Welcome')).toBeDefined()
  })

  it('renders error message when provided', () => {
    render(<LoginForm onSubmit={vi.fn()} error="Invalid credentials" />)
    expect(screen.getByText('Invalid credentials')).toBeDefined()
  })

  it('calls onSubmit with form data', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<LoginForm onSubmit={onSubmit} />)
    const inputs = screen.getAllByRole('textbox')
    await user.type(inputs[0], 'test@example.com')
    // password input
    const passwordInput = document.querySelector(
      'input[type="password"]'
    ) as HTMLInputElement
    await user.type(passwordInput, 'secret')
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'secret',
      remember: false,
    })
  })
})
