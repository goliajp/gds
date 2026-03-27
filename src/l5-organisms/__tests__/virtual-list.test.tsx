import { render } from '@testing-library/react'
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
      />,
    )
    expect(container.querySelector('[data-component="virtual-list"]')).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(
      <VirtualList
        items={items}
        itemHeight={40}
        renderItem={(item) => <div>{item}</div>}
        height={200}
      />,
    )
    expect(container.querySelector('[data-component="virtual-list"]')).not.toBeNull()
  })

  it('renders only a subset of items (windowing)', () => {
    const { container } = render(
      <VirtualList
        items={items}
        itemHeight={40}
        renderItem={(item) => <div>{item}</div>}
        height={200}
      />,
    )
    // height=200, itemHeight=40 → ~5 visible + 3 overscan each side = ~11 max rendered
    const rendered = container.querySelectorAll('[data-component="virtual-list"] > div > div')
    expect(rendered.length).toBeLessThan(items.length)
  })

  it('sets total height on inner container', () => {
    const { container } = render(
      <VirtualList
        items={items}
        itemHeight={40}
        renderItem={(item) => <div>{item}</div>}
        height={200}
      />,
    )
    const inner = container.querySelector('[data-component="virtual-list"] > div')
    expect(inner?.getAttribute('style')).toContain(`height: ${100 * 40}px`)
  })
})
