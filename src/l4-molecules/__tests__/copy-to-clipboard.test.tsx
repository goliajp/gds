import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CopyToClipboard } from '../copy-to-clipboard'

describe('CopyToClipboard', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<CopyToClipboard value="test">Copy me</CopyToClipboard>)
    expect(container.querySelector('[data-component="copy-to-clipboard"]')).not.toBeNull()
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
      <CopyToClipboard value="val" feedback="Done!">Copy</CopyToClipboard>,
    )
    expect(container.querySelector('[data-component="copy-to-clipboard"]')).not.toBeNull()
  })

  it('applies custom className', () => {
    const { container } = render(
      <CopyToClipboard value="val" className="my-cls">Copy</CopyToClipboard>,
    )
    const el = container.querySelector('[data-component="copy-to-clipboard"]')
    expect(el?.className).toContain('my-cls')
  })
})
