import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Hotkey } from '../hotkey'

describe('Hotkey', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<Hotkey keys={['⌘', 'K']} />)
    const el = container.querySelector('[data-component="hotkey"]')
    expect(el).not.toBeNull()
  })

  it('renders all keys', () => {
    render(<Hotkey keys={['⌘', 'Shift', 'P']} />)
    expect(screen.getByText('⌘')).toBeDefined()
    expect(screen.getByText('Shift')).toBeDefined()
    expect(screen.getByText('P')).toBeDefined()
  })

  it('renders plus separators between keys', () => {
    render(<Hotkey keys={['Ctrl', 'C']} />)
    const plusSigns = screen.getAllByText('+')
    expect(plusSigns.length).toBe(1)
  })

  it('does not render separator before the first key', () => {
    render(<Hotkey keys={['A']} />)
    expect(screen.queryByText('+')).toBeNull()
  })

  it('renders multiple separators for multiple keys', () => {
    render(<Hotkey keys={['⌘', 'Shift', 'P']} />)
    const plusSigns = screen.getAllByText('+')
    expect(plusSigns.length).toBe(2)
  })

  it('renders empty when keys array is empty', () => {
    const { container } = render(<Hotkey keys={[]} />)
    const el = container.querySelector('[data-component="hotkey"]')
    expect(el).not.toBeNull()
    expect(el?.children.length).toBe(0)
  })

  it('applies custom className', () => {
    const { container } = render(<Hotkey className="extra" keys={['A']} />)
    const el = container.querySelector('[data-component="hotkey"]')
    expect(el?.classList.contains('extra')).toBe(true)
  })

  it('passes extra props', () => {
    const { container } = render(<Hotkey data-testid="hk" keys={['A']} />)
    expect(container.querySelector('[data-testid="hk"]')).not.toBeNull()
  })
})
