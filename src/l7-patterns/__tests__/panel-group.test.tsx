import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('../../utils/hooks', async () => {
  const actual = await vi.importActual('../../utils/hooks')
  return { ...actual, useIsMobile: vi.fn(() => false) }
})

import { Pane, PaneGroup } from '../panel-group'

describe('PaneGroup', () => {
  it('renders with data-component="panel-group"', () => {
    const { container } = render(<PaneGroup><div /></PaneGroup>)
    expect(container.querySelector('[data-component="panel-group"]')).not.toBeNull()
  })

  it('renders children', () => {
    render(<PaneGroup><span>Child</span></PaneGroup>)
    expect(screen.getByText('Child')).toBeDefined()
  })

  it('uses flex-row for horizontal (default)', () => {
    const { container } = render(<PaneGroup><div /></PaneGroup>)
    const el = container.querySelector('[data-component="panel-group"]')
    expect(el?.className).toContain('flex-row')
    expect(el?.className).not.toContain('flex-col')
  })

  it('uses flex-col for vertical', () => {
    const { container } = render(<PaneGroup direction="vertical"><div /></PaneGroup>)
    const el = container.querySelector('[data-component="panel-group"]')
    expect(el?.className).toContain('flex-col')
    expect(el?.className).not.toContain('flex-row')
  })
})

describe('Pane', () => {
  it('renders with data-component="panel"', () => {
    const { container } = render(<Pane><div /></Pane>)
    expect(container.querySelector('[data-component="panel"]')).not.toBeNull()
  })

  it('applies fixed width via style', () => {
    const { container } = render(<Pane width={300}><div /></Pane>)
    const el = container.querySelector('[data-component="panel"]') as HTMLElement
    expect(el.style.width).toBe('300px')
  })

  it('uses flex-1 when no width', () => {
    const { container } = render(<Pane><div /></Pane>)
    const el = container.querySelector('[data-component="panel"]')
    expect(el?.className).toContain('flex-1')
  })

  it('applies scrollable overflow classes', () => {
    const { container } = render(<Pane scrollable><div /></Pane>)
    const el = container.querySelector('[data-component="panel"]')
    expect(el?.className).toContain('overflow-y-auto')
  })
})
