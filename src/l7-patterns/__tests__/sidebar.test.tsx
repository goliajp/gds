import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Sidebar } from '../sidebar'

describe('Sidebar', () => {
  it('renders children', () => {
    render(<Sidebar><span>Nav Item</span></Sidebar>)
    expect(screen.getByText('Nav Item')).toBeDefined()
  })

  it('uses collapsed width when collapsed', () => {
    const { container } = render(<Sidebar collapsed collapsedWidth={48}><span>x</span></Sidebar>)
    const el = container.querySelector('[data-component="sidebar"]') as HTMLElement
    expect(el.style.width).toBe('48px')
  })

  it('uses expanded width when not collapsed', () => {
    const { container } = render(<Sidebar width={280}><span>x</span></Sidebar>)
    const el = container.querySelector('[data-component="sidebar"]') as HTMLElement
    expect(el.style.width).toBe('280px')
  })

  it('has data-component attribute', () => {
    const { container } = render(<Sidebar><span>x</span></Sidebar>)
    expect(container.querySelector('[data-component="sidebar"]')).not.toBeNull()
  })

  it('renders collapse button when onCollapse is provided', () => {
    const { container } = render(<Sidebar onCollapse={() => {}}><span>x</span></Sidebar>)
    expect(container.querySelector('button')).not.toBeNull()
  })

  it('does not render collapse button without onCollapse', () => {
    const { container } = render(<Sidebar><span>x</span></Sidebar>)
    expect(container.querySelector('button')).toBeNull()
  })

  it('calls onCollapse with toggled value on click', async () => {
    const { default: userEvent } = await import('@testing-library/user-event')
    const user = userEvent.setup()
    const onCollapse = vi.fn()
    const { container } = render(<Sidebar collapsed={false} onCollapse={onCollapse}><span>x</span></Sidebar>)
    await user.click(container.querySelector('button')!)
    expect(onCollapse).toHaveBeenCalledWith(true)
  })

  it('applies right position border', () => {
    const { container } = render(<Sidebar position="right"><span>x</span></Sidebar>)
    const el = container.querySelector('[data-component="sidebar"]')
    expect(el?.className).toContain('border-l')
  })

  it('applies left position border by default', () => {
    const { container } = render(<Sidebar><span>x</span></Sidebar>)
    const el = container.querySelector('[data-component="sidebar"]')
    expect(el?.className).toContain('border-r')
  })

  it('applies glass classes when glass is true', () => {
    const { container } = render(<Sidebar glass><span>x</span></Sidebar>)
    const el = container.querySelector('[data-component="sidebar"]')
    expect(el?.className).toContain('gds-glass')
  })

  it('applies surface background when glass is false', () => {
    const { container } = render(<Sidebar><span>x</span></Sidebar>)
    const el = container.querySelector('[data-component="sidebar"]')
    expect(el?.className).toContain('bg-surface')
  })

  it('sets data-collapsed attribute', () => {
    const { container } = render(<Sidebar collapsed><span>x</span></Sidebar>)
    const el = container.querySelector('[data-component="sidebar"]')
    expect(el?.getAttribute('data-collapsed')).toBe('true')
  })

  it('rotates chevron for right position', () => {
    const { container } = render(<Sidebar position="right" onCollapse={() => {}}><span>x</span></Sidebar>)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('class')).toContain('rotate-180')
  })

  it('rotates chevron when collapsed', () => {
    const { container } = render(<Sidebar collapsed onCollapse={() => {}}><span>x</span></Sidebar>)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('class')).toContain('rotate-180')
  })

  it('resets rotation for collapsed + right position', () => {
    const { container } = render(<Sidebar collapsed position="right" onCollapse={() => {}}><span>x</span></Sidebar>)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('class')).toContain('rotate-0')
  })
})
