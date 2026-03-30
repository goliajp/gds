import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Banner } from '../banner'

describe('Banner', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<Banner message="Hello" />)
    expect(container.querySelector('[data-component="banner"]')).not.toBeNull()
  })

  it('renders message text', () => {
    render(<Banner message="Something happened" />)
    expect(screen.getByText('Something happened')).toBeDefined()
  })

  it('defaults to info variant', () => {
    const { container } = render(<Banner message="Info" />)
    const el = container.querySelector('[data-component="banner"]')
    expect(el?.getAttribute('data-variant')).toBe('info')
  })

  it('applies variant data attribute for each variant', () => {
    const variants = ['info', 'success', 'warning', 'danger'] as const
    for (const variant of variants) {
      const { container } = render(<Banner message="msg" variant={variant} />)
      const el = container.querySelector('[data-component="banner"]')
      expect(el?.getAttribute('data-variant')).toBe(variant)
    }
  })

  it('has role="status"', () => {
    render(<Banner message="Status" />)
    expect(screen.getByRole('status')).toBeDefined()
  })

  it('does not render dismiss button when dismissible is false (default)', () => {
    render(<Banner message="No dismiss" />)
    expect(screen.queryByLabelText('Dismiss')).toBeNull()
  })

  it('does not render dismiss button when dismissible is true but onDismiss is undefined', () => {
    render(<Banner message="No callback" dismissible />)
    expect(screen.queryByLabelText('Dismiss')).toBeNull()
  })

  it('renders dismiss button when dismissible and onDismiss are provided', () => {
    const onDismiss = vi.fn()
    render(<Banner message="Closeable" dismissible onDismiss={onDismiss} />)
    expect(screen.getByLabelText('Dismiss')).toBeDefined()
  })

  it('calls onDismiss when dismiss button clicked', () => {
    const onDismiss = vi.fn()
    render(<Banner message="Closeable" dismissible onDismiss={onDismiss} />)
    fireEvent.click(screen.getByLabelText('Dismiss'))
    expect(onDismiss).toHaveBeenCalledOnce()
  })

  it('applies glass class when glass is true', () => {
    const { container } = render(<Banner message="Glass" glass />)
    const el = container.querySelector('[data-component="banner"]')
    expect(el?.className).toContain('gds-glass')
  })

  it('does not apply glass class when glass is false', () => {
    const { container } = render(<Banner message="No glass" glass={false} />)
    const el = container.querySelector('[data-component="banner"]')
    expect(el?.className).not.toContain('gds-glass')
  })

  it('applies custom className', () => {
    const { container } = render(
      <Banner message="Custom" className="my-custom" />
    )
    const el = container.querySelector('[data-component="banner"]')
    expect(el?.className).toContain('my-custom')
  })
})
