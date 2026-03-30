import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { VirtualList } from '../virtual-list'

const items = Array.from({ length: 100 }, (_, i) => `Item ${i}`)

describe('VirtualList', () => {
  it('renders without crash', () => {
    const { container } = render(
      <VirtualList
        items={items}
        itemHeight={40}
        renderItem={(item) => <div>{item}</div>}
        height={200}
      />
    )
    expect(
      container.querySelector('[data-component="virtual-list"]')
    ).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(
      <VirtualList
        items={items}
        itemHeight={40}
        renderItem={(item) => <div>{item}</div>}
        height={200}
      />
    )
    expect(
      container.querySelector('[data-component="virtual-list"]')
    ).not.toBeNull()
  })

  it('renders only a subset of items (windowing)', () => {
    const { container } = render(
      <VirtualList
        items={items}
        itemHeight={40}
        renderItem={(item) => <div>{item}</div>}
        height={200}
      />
    )
    // height=200, itemHeight=40 → ~5 visible + 3 overscan each side = ~11 max rendered
    const rendered = container.querySelectorAll(
      '[data-component="virtual-list"] > div > div'
    )
    expect(rendered.length).toBeLessThan(items.length)
  })

  it('sets total height on inner container', () => {
    const { container } = render(
      <VirtualList
        items={items}
        itemHeight={40}
        renderItem={(item) => <div>{item}</div>}
        height={200}
      />
    )
    const inner = container.querySelector(
      '[data-component="virtual-list"] > div'
    )
    expect(inner?.getAttribute('style')).toContain(`height: ${100 * 40}px`)
  })

  it('updates visible items on scroll', () => {
    const { container } = render(
      <VirtualList
        items={items}
        itemHeight={40}
        renderItem={(item) => <div>{item}</div>}
        height={200}
      />
    )

    const scrollContainer = container.querySelector(
      '[data-component="virtual-list"]'
    )!

    // initially should show items starting from index 0
    expect(container.textContent).toContain('Item 0')

    // simulate scrolling down
    Object.defineProperty(scrollContainer, 'scrollTop', {
      value: 2000,
      writable: true,
    })
    fireEvent.scroll(scrollContainer)

    // after scrolling to 2000px with itemHeight=40, first visible item is index 50
    expect(container.textContent).toContain('Item 50')
  })

  it('applies custom className', () => {
    const { container } = render(
      <VirtualList
        items={items}
        itemHeight={40}
        renderItem={(item) => <div>{item}</div>}
        height={200}
        className="my-list"
      />
    )
    const el = container.querySelector('[data-component="virtual-list"]')
    expect(el?.className).toContain('my-list')
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(
      <VirtualList
        items={items}
        itemHeight={40}
        renderItem={(item) => <div>{item}</div>}
        height={200}
        ref={ref}
      />
    )
    expect(ref.current).not.toBeNull()
    expect(ref.current?.getAttribute('data-component')).toBe('virtual-list')
  })

  it('accepts string height', () => {
    const { container } = render(
      <VirtualList
        items={items}
        itemHeight={40}
        renderItem={(item) => <div>{item}</div>}
        height="50vh"
      />
    )
    const el = container.querySelector(
      '[data-component="virtual-list"]'
    ) as HTMLElement
    expect(el.style.height).toBe('50vh')
  })

  it('uses default height when not specified', () => {
    const { container } = render(
      <VirtualList
        items={items}
        itemHeight={40}
        renderItem={(item) => <div>{item}</div>}
      />
    )
    const el = container.querySelector(
      '[data-component="virtual-list"]'
    ) as HTMLElement
    expect(el.style.height).toBe('400px')
  })

  it('accepts custom overscan', () => {
    const { container } = render(
      <VirtualList
        items={items}
        itemHeight={40}
        renderItem={(item) => <div>{item}</div>}
        height={200}
        overscan={0}
      />
    )
    // with overscan=0, should render fewer items than default overscan=3
    const rendered = container.querySelectorAll(
      '[data-component="virtual-list"] > div > div'
    )
    expect(rendered.length).toBeLessThanOrEqual(5) // 200/40 = 5 visible items
  })

  it('renders empty list without crash', () => {
    const { container } = render(
      <VirtualList
        items={[]}
        itemHeight={40}
        renderItem={(item: string) => <div>{item}</div>}
        height={200}
      />
    )
    const rendered = container.querySelectorAll(
      '[data-component="virtual-list"] > div > div'
    )
    expect(rendered.length).toBe(0)
  })

  it('passes index to renderItem', () => {
    const { container } = render(
      <VirtualList
        items={['a', 'b', 'c']}
        itemHeight={40}
        renderItem={(item, index) => <div data-index={index}>{item}</div>}
        height={200}
      />
    )
    const firstItem = container.querySelector('[data-index="0"]')
    expect(firstItem).not.toBeNull()
    expect(firstItem?.textContent).toBe('a')
  })
})
