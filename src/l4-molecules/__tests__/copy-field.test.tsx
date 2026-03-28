import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { CopyField } from '../copy-field'

describe('CopyField', () => {
  it('has data-component="copy-field"', () => {
    const { container } = render(<CopyField value="test-value" />)
    expect(container.querySelector('[data-component="copy-field"]')).not.toBeNull()
  })

  it('displays value text', () => {
    render(<CopyField value="my-api-key-123" />)
    expect(screen.getByText('my-api-key-123')).toBeDefined()
  })

  it('renders label when provided', () => {
    render(<CopyField value="abc" label="API Key" />)
    expect(screen.getByText('API Key')).toBeDefined()
  })

  it('does not render label when not provided', () => {
    const { container } = render(<CopyField value="abc" />)
    const labels = container.querySelectorAll('label')
    expect(labels.length).toBe(0)
  })

  it('masks value with dots when masked is true', () => {
    const { container } = render(<CopyField value="secret" masked />)
    const span = container.querySelector('.font-mono')
    expect(span?.textContent).not.toBe('secret')
    expect(span?.textContent).toContain('\u2022')
  })

  it('reveals masked value on mouse enter and hides on leave', () => {
    const { container } = render(<CopyField value="secret" masked />)
    const span = container.querySelector('.font-mono')!
    expect(span.textContent).toContain('\u2022')

    fireEvent.mouseEnter(span)
    expect(span.textContent).toBe('secret')

    fireEvent.mouseLeave(span)
    expect(span.textContent).toContain('\u2022')
  })

  it('does not add mouse handlers when not masked', () => {
    const { container } = render(<CopyField value="visible" />)
    const span = container.querySelector('.font-mono')!
    // value is shown directly
    expect(span.textContent).toBe('visible')
  })

  it('copies value on copy button click', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, writable: true, configurable: true })

    render(<CopyField value="copy-me" />)
    const btn = screen.getByLabelText('Copy')
    await userEvent.click(btn)
    expect(writeText).toHaveBeenCalledWith('copy-me')
  })

  it('shows check icon after successful copy', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, writable: true, configurable: true })

    const { container } = render(<CopyField value="v" />)
    const btn = screen.getByLabelText('Copy')
    await userEvent.click(btn)
    // after copy, should show check svg (path d starts with "M2 7")
    const svgs = container.querySelectorAll('svg')
    const checkSvg = Array.from(svgs).find((svg) =>
      svg.querySelector('path[d="M2 7l3 3 7-7"]'),
    )
    expect(checkSvg).not.toBeUndefined()
  })

  it('applies custom className', () => {
    const { container } = render(<CopyField value="v" className="extra" />)
    const el = container.querySelector('[data-component="copy-field"]')
    expect(el?.className).toContain('extra')
  })
})
