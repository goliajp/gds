import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ToolbarGeneric, ToolbarSeparator } from '../toolbar-generic'

describe('ToolbarGeneric', () => {
  it('renders with data-component', () => {
    const { container } = render(<ToolbarGeneric>Items</ToolbarGeneric>)
    expect(container.querySelector('[data-component="toolbar-generic"]')).not.toBeNull()
  })

  it('renders children', () => {
    const { getByText } = render(<ToolbarGeneric>Toolbar Content</ToolbarGeneric>)
    expect(getByText('Toolbar Content')).toBeDefined()
  })

  it('has role="toolbar"', () => {
    const { container } = render(<ToolbarGeneric>Items</ToolbarGeneric>)
    const el = container.querySelector('[role="toolbar"]')
    expect(el).not.toBeNull()
  })

  it('applies default variant', () => {
    const { container } = render(<ToolbarGeneric>Items</ToolbarGeneric>)
    const el = container.querySelector('[data-component="toolbar-generic"]')!
    expect(el.getAttribute('data-variant')).toBe('default')
    expect(el.className).toContain('border-b')
    expect(el.className).toContain('bg-bg')
  })

  it('applies floating variant', () => {
    const { container } = render(<ToolbarGeneric variant="floating">Items</ToolbarGeneric>)
    const el = container.querySelector('[data-component="toolbar-generic"]')!
    expect(el.getAttribute('data-variant')).toBe('floating')
    expect(el.className).toContain('shadow-md')
    expect(el.className).toContain('bg-surface')
  })

  it('applies glass class when glass is true', () => {
    const { container } = render(<ToolbarGeneric glass>Items</ToolbarGeneric>)
    const el = container.querySelector('[data-component="toolbar-generic"]')!
    expect(el.className).toContain('gds-glass')
  })

  it('does not apply glass class when glass is false', () => {
    const { container } = render(<ToolbarGeneric glass={false}>Items</ToolbarGeneric>)
    const el = container.querySelector('[data-component="toolbar-generic"]')!
    expect(el.className).not.toContain('gds-glass')
  })

  it('merges custom className', () => {
    const { container } = render(<ToolbarGeneric className="custom">Items</ToolbarGeneric>)
    const el = container.querySelector('[data-component="toolbar-generic"]')!
    expect(el.className).toContain('custom')
  })
})

describe('ToolbarSeparator', () => {
  it('renders with data-component', () => {
    const { container } = render(<ToolbarSeparator />)
    expect(container.querySelector('[data-component="toolbar-separator"]')).not.toBeNull()
  })

  it('has separator styling', () => {
    const { container } = render(<ToolbarSeparator />)
    const el = container.querySelector('[data-component="toolbar-separator"]')!
    expect(el.className).toContain('h-4')
    expect(el.className).toContain('w-px')
  })
})
