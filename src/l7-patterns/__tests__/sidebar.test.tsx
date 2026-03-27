import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

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
})
