import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ShortcutDisplay } from '../shortcut-display'

describe('ShortcutDisplay', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<ShortcutDisplay keys={['⌘', 'K']} />)
    expect(
      container.querySelector('[data-component="shortcut-display"]')
    ).not.toBeNull()
  })

  it('renders kbd elements for each key', () => {
    const { container } = render(<ShortcutDisplay keys={['⌘', 'Shift', 'P']} />)
    const kbds = container.querySelectorAll('kbd')
    expect(kbds.length).toBe(3)
  })

  it('displays key text inside kbd elements', () => {
    render(<ShortcutDisplay keys={['Ctrl', 'C']} />)
    expect(screen.getByText('Ctrl')).toBeDefined()
    expect(screen.getByText('C')).toBeDefined()
  })

  it('renders a single key', () => {
    const { container } = render(<ShortcutDisplay keys={['Esc']} />)
    const kbds = container.querySelectorAll('kbd')
    expect(kbds.length).toBe(1)
    expect(screen.getByText('Esc')).toBeDefined()
  })

  it('shows description when provided', () => {
    render(<ShortcutDisplay keys={['⌘', 'K']} description="Command palette" />)
    expect(screen.getByText('Command palette')).toBeDefined()
  })

  it('does not show description when undefined', () => {
    const { container } = render(<ShortcutDisplay keys={['⌘', 'K']} />)
    const spans = container.querySelectorAll(
      '[data-component="shortcut-display"] > span'
    )
    expect(spans.length).toBe(1)
  })

  it('applies custom className', () => {
    const { container } = render(
      <ShortcutDisplay keys={['A']} className="my-shortcut" />
    )
    const el = container.querySelector('[data-component="shortcut-display"]')
    expect(el?.className).toContain('my-shortcut')
  })

  it('forwards additional props', () => {
    const { container } = render(
      <ShortcutDisplay keys={['A']} data-testid="sc" />
    )
    expect(container.querySelector('[data-testid="sc"]')).not.toBeNull()
  })
})
