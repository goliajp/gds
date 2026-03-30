import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { CopyToClipboard } from '../copy-to-clipboard'

describe('CopyToClipboard', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(
      <CopyToClipboard value="test">Copy me</CopyToClipboard>
    )
    expect(
      container.querySelector('[data-component="copy-to-clipboard"]')
    ).not.toBeNull()
  })

  it('renders children', () => {
    render(<CopyToClipboard value="val">Click here</CopyToClipboard>)
    expect(screen.getByText('Click here')).toBeDefined()
  })

  it('has role="button" and tabIndex=0', () => {
    render(<CopyToClipboard value="val">Copy</CopyToClipboard>)
    const el = screen.getByRole('button')
    expect(el).toBeDefined()
    expect(el.getAttribute('tabindex')).toBe('0')
  })

  it('does not show feedback tooltip initially', () => {
    render(<CopyToClipboard value="val">Copy</CopyToClipboard>)
    expect(screen.queryByText('Copied!')).toBeNull()
  })

  it('uses custom feedback text', () => {
    // just ensure component renders with custom feedback prop without error
    const { container } = render(
      <CopyToClipboard value="val" feedback="Done!">
        Copy
      </CopyToClipboard>
    )
    expect(
      container.querySelector('[data-component="copy-to-clipboard"]')
    ).not.toBeNull()
  })

  it('applies custom className', () => {
    const { container } = render(
      <CopyToClipboard value="val" className="my-cls">
        Copy
      </CopyToClipboard>
    )
    const el = container.querySelector('[data-component="copy-to-clipboard"]')
    expect(el?.className).toContain('my-cls')
  })

  it('shows feedback tooltip after successful copy', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      writable: true,
      configurable: true,
    })

    const { container } = render(
      <CopyToClipboard value="test-value">Copy</CopyToClipboard>
    )
    const el = container.querySelector('[data-component="copy-to-clipboard"]')!
    await userEvent.click(el)
    expect(writeText).toHaveBeenCalledWith('test-value')
    expect(screen.getByText('Copied!')).toBeDefined()
  })

  it('shows custom feedback text after copy', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      writable: true,
      configurable: true,
    })

    const { container } = render(
      <CopyToClipboard value="v" feedback="Done!">
        Copy
      </CopyToClipboard>
    )
    const el = container.querySelector('[data-component="copy-to-clipboard"]')!
    await userEvent.click(el)
    expect(screen.getByText('Done!')).toBeDefined()
  })

  it('handles clipboard error gracefully', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('Not allowed'))
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      writable: true,
      configurable: true,
    })

    const { container } = render(
      <CopyToClipboard value="test">Copy</CopyToClipboard>
    )
    const el = container.querySelector('[data-component="copy-to-clipboard"]')!
    await userEvent.click(el)
    // should not crash and no feedback shown
    expect(screen.queryByText('Copied!')).toBeNull()
  })

  it('clears previous timer on rapid clicks', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      writable: true,
      configurable: true,
    })

    const { container } = render(
      <CopyToClipboard value="v">Copy</CopyToClipboard>
    )
    const el = container.querySelector('[data-component="copy-to-clipboard"]')!
    await userEvent.click(el)
    await userEvent.click(el)
    expect(writeText).toHaveBeenCalledTimes(2)
    expect(screen.getByText('Copied!')).toBeDefined()
  })
})
