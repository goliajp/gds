import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Chip } from '../chip'

describe('Chip', () => {
  it('has data-component="chip"', () => {
    const { container } = render(<Chip label="Tag" />)
    expect(container.querySelector('[data-component="chip"]')).not.toBeNull()
  })

  it('has data-variant matching the variant prop', () => {
    const { container } = render(<Chip label="Tag" variant="success" />)
    expect(container.querySelector('[data-variant="success"]')).not.toBeNull()
  })

  it('defaults data-variant to "default"', () => {
    const { container } = render(<Chip label="Tag" />)
    expect(container.querySelector('[data-variant="default"]')).not.toBeNull()
  })

  it('renders label text', () => {
    render(<Chip label="TypeScript" />)
    expect(screen.getByText('TypeScript')).toBeDefined()
  })

  it('renders icon when provided', () => {
    render(<Chip icon={<span data-testid="icon">*</span>} label="Tag" />)
    expect(screen.getByTestId('icon')).toBeDefined()
  })

  it('renders remove button when onRemove is provided', async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()
    render(<Chip label="Tag" onRemove={onRemove} />)
    const btn = screen.getByRole('button')
    await user.click(btn)
    expect(onRemove).toHaveBeenCalledOnce()
  })

  it('does not render remove button when onRemove is not provided', () => {
    render(<Chip label="Tag" />)
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('applies glass styles when glass is true', () => {
    const { container } = render(<Chip glass label="Tag" />)
    const el = container.querySelector('[data-component="chip"]')
    expect(el?.className).toContain('border')
  })
})
