import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Dock } from '../dock'

const items = [
  { id: 'home', icon: <span>H</span>, label: 'Home' },
  { id: 'search', icon: <span>S</span>, label: 'Search' },
  { id: 'settings', icon: <span>G</span>, label: 'Settings' },
]

describe('Dock', () => {
  it('renders all items', () => {
    render(<Dock items={items} onSelect={vi.fn()} />)
    expect(screen.getByTestId('dock-item-home')).toBeDefined()
    expect(screen.getByTestId('dock-item-search')).toBeDefined()
    expect(screen.getByTestId('dock-item-settings')).toBeDefined()
  })

  it('shows tooltip on hover', () => {
    render(<Dock items={items} onSelect={vi.fn()} />)
    const tooltip = screen.getByTestId('dock-tooltip-home')
    expect(tooltip.textContent).toBe('Home')
  })

  it('calls onSelect when item clicked', () => {
    const onSelect = vi.fn()
    render(<Dock items={items} onSelect={onSelect} />)
    fireEvent.click(screen.getByTestId('dock-item-search'))
    expect(onSelect).toHaveBeenCalledWith('search')
  })

  it('applies glass class by default', () => {
    const { container } = render(<Dock items={items} onSelect={vi.fn()} />)
    const el = container.querySelector('[data-component="dock"]')
    expect(el?.className).toContain('gds-glass')
  })

  it('has data-component="dock"', () => {
    const { container } = render(<Dock items={items} onSelect={vi.fn()} />)
    expect(container.querySelector('[data-component="dock"]')).not.toBeNull()
  })

  it('scales hovered item to 1.3', () => {
    render(<Dock items={items} onSelect={vi.fn()} />)
    const searchBtn = screen.getByTestId('dock-item-search')
    const searchContainer = searchBtn.parentElement!

    fireEvent.mouseEnter(searchContainer)
    expect(searchBtn.style.transform).toBe('scale(1.3)')
  })

  it('scales neighbor items to 1.1', () => {
    render(<Dock items={items} onSelect={vi.fn()} />)
    const searchContainer =
      screen.getByTestId('dock-item-search').parentElement!

    fireEvent.mouseEnter(searchContainer)

    // home (index 0) is neighbor of search (index 1)
    const homeBtn = screen.getByTestId('dock-item-home')
    expect(homeBtn.style.transform).toBe('scale(1.1)')

    // settings (index 2) is also neighbor
    const settingsBtn = screen.getByTestId('dock-item-settings')
    expect(settingsBtn.style.transform).toBe('scale(1.1)')
  })

  it('resets scale on mouse leave', () => {
    render(<Dock items={items} onSelect={vi.fn()} />)
    const searchContainer =
      screen.getByTestId('dock-item-search').parentElement!

    fireEvent.mouseEnter(searchContainer)
    expect(screen.getByTestId('dock-item-search').style.transform).toBe(
      'scale(1.3)'
    )

    fireEvent.mouseLeave(searchContainer)
    // all items should be scale(1)
    expect(screen.getByTestId('dock-item-search').style.transform).toBe(
      'scale(1)'
    )
    expect(screen.getByTestId('dock-item-home').style.transform).toBe(
      'scale(1)'
    )
  })

  it('shows tooltip with opacity-100 when hovered', () => {
    render(<Dock items={items} onSelect={vi.fn()} />)
    const searchContainer =
      screen.getByTestId('dock-item-search').parentElement!

    fireEvent.mouseEnter(searchContainer)
    const tooltip = screen.getByTestId('dock-tooltip-search')
    expect(tooltip.className).toContain('opacity-100')
  })

  it('hides tooltip with opacity-0 when not hovered', () => {
    render(<Dock items={items} onSelect={vi.fn()} />)
    const tooltip = screen.getByTestId('dock-tooltip-search')
    expect(tooltip.className).toContain('opacity-0')
  })

  it('does not apply glass when glass is false', () => {
    const { container } = render(
      <Dock items={items} onSelect={vi.fn()} glass={false} />
    )
    const el = container.querySelector('[data-component="dock"]')
    expect(el?.className).not.toContain('gds-glass')
  })

  it('applies custom className', () => {
    const { container } = render(
      <Dock items={items} onSelect={vi.fn()} className="my-dock" />
    )
    const el = container.querySelector('[data-component="dock"]')
    expect(el?.className).toContain('my-dock')
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<Dock items={items} onSelect={vi.fn()} ref={ref} />)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.getAttribute('data-component')).toBe('dock')
  })

  it('non-neighbor items stay at scale 1', () => {
    // add more items so there's a non-neighbor
    const moreItems = [
      ...items,
      { id: 'profile', icon: <span>P</span>, label: 'Profile' },
    ]
    render(<Dock items={moreItems} onSelect={vi.fn()} />)
    const homeContainer = screen.getByTestId('dock-item-home').parentElement!

    fireEvent.mouseEnter(homeContainer)

    // settings (index 2) is not neighbor of home (index 0)
    const settingsBtn = screen.getByTestId('dock-item-settings')
    expect(settingsBtn.style.transform).toBe('scale(1)')
  })

  it('spreads additional props', () => {
    const { container } = render(
      <Dock items={items} onSelect={vi.fn()} data-custom="test" />
    )
    const el = container.querySelector('[data-component="dock"]')
    expect(el?.getAttribute('data-custom')).toBe('test')
  })
})
