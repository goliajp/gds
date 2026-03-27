import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DiffIndicator } from '../diff-indicator'

describe('DiffIndicator', () => {
  it('shows positive value with up arrow and success color', () => {
    const { container } = render(<DiffIndicator value={5} />)
    const el = container.querySelector('[data-component="diff-indicator"]')
    expect(el?.textContent).toContain('+5')
    expect(el?.getAttribute('data-direction')).toBe('up')
    expect(el?.className).toContain('text-success')
  })

  it('shows negative value with down arrow and danger color', () => {
    const { container } = render(<DiffIndicator value={-3} />)
    const el = container.querySelector('[data-component="diff-indicator"]')
    expect(el?.textContent).toContain('-3')
    expect(el?.getAttribute('data-direction')).toBe('down')
    expect(el?.className).toContain('text-danger')
  })

  it('inverts color meaning when inverted is true', () => {
    const { container } = render(<DiffIndicator inverted value={5} />)
    const el = container.querySelector('[data-component="diff-indicator"]')
    // positive + inverted = bad = danger
    expect(el?.className).toContain('text-danger')
  })
})
