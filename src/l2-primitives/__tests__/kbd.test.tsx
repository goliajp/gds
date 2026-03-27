import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Kbd } from '../kbd'

describe('Kbd', () => {
  it('renders without crash', () => {
    render(<Kbd>Ctrl</Kbd>)
    expect(screen.getByText('Ctrl')).toBeTruthy()
  })

  it('forwards ref', () => {
    let el: HTMLElement | null = null
    render(<Kbd ref={(node) => { el = node }}>K</Kbd>)
    expect(el).toBeTruthy()
    expect(el!.tagName).toBe('KBD')
  })

  it('has data-component attribute', () => {
    render(<Kbd>K</Kbd>)
    expect(screen.getByText('K').getAttribute('data-component')).toBe('kbd')
  })

  it('renders a kbd element', () => {
    render(<Kbd>Shift</Kbd>)
    expect(screen.getByText('Shift').tagName).toBe('KBD')
  })

  it('merges className', () => {
    render(<Kbd className="custom-class">K</Kbd>)
    expect(screen.getByText('K').className).toContain('custom-class')
  })

  it('applies glass classes when glass is true', () => {
    render(<Kbd glass>K</Kbd>)
    const el = screen.getByText('K')
    expect(el.className).toContain('gds-glass')
  })

  it('does not apply glass classes when glass is false', () => {
    render(<Kbd>K</Kbd>)
    const el = screen.getByText('K')
    expect(el.className).not.toContain('gds-glass')
  })
})
