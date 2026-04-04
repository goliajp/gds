import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SplitView } from '../split-view'

describe('SplitView', () => {
  it('renders left and right panes', () => {
    render(<SplitView left={<div>Left</div>} right={<div>Right</div>} />)
    expect(screen.getByText('Left')).toBeDefined()
    expect(screen.getByText('Right')).toBeDefined()
  })

  it('has data-component attribute', () => {
    const { container } = render(
      <SplitView left={<div>L</div>} right={<div>R</div>} />
    )
    expect(
      container.querySelector('[data-component="split-view"]')
    ).not.toBeNull()
  })

  it('contains a resize handle', () => {
    const { container } = render(
      <SplitView left={<div>L</div>} right={<div>R</div>} />
    )
    expect(
      container.querySelector('[data-component="resize-handle"]')
    ).not.toBeNull()
  })

  it('applies custom className', () => {
    const { container } = render(
      <SplitView
        left={<div>L</div>}
        right={<div>R</div>}
        className="my-split"
      />
    )
    const el = container.querySelector('[data-component="split-view"]')
    expect(el?.className).toContain('my-split')
  })

  it('uses defaultSplit for initial pane widths', () => {
    const { container } = render(
      <SplitView left={<div>L</div>} right={<div>R</div>} defaultSplit={30} />
    )
    const panes = container.querySelector(
      '[data-component="split-view"]'
    )?.children
    expect((panes?.[0] as HTMLElement).style.width).toBe('30%')
    expect((panes?.[2] as HTMLElement).style.width).toBe('70%')
  })

  it('supports callback ref', () => {
    let refVal: HTMLDivElement | null = null
    render(
      <SplitView
        left={<div>L</div>}
        right={<div>R</div>}
        ref={(el) => {
          refVal = el
        }}
      />
    )
    expect(refVal).not.toBeNull()
  })

  it('supports object ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<SplitView left={<div>L</div>} right={<div>R</div>} ref={ref} />)
    expect(ref.current).not.toBeNull()
  })

  it('handles resize via drag on the resize handle', () => {
    const { container } = render(
      <SplitView left={<div>L</div>} right={<div>R</div>} defaultSplit={50} />
    )
    const root = container.querySelector(
      '[data-component="split-view"]'
    ) as HTMLDivElement
    // mock offsetWidth
    Object.defineProperty(root, 'offsetWidth', {
      value: 1000,
      configurable: true,
    })

    const handle = container.querySelector(
      '[data-component="resize-handle"]'
    ) as HTMLElement
    // simulate drag: mousedown, mousemove, mouseup
    fireEvent.mouseDown(handle, { clientX: 500 })
    fireEvent(document, new MouseEvent('mousemove', { clientX: 550 }))
    fireEvent(document, new MouseEvent('mouseup'))

    const leftPane = root.children[0] as HTMLElement
    // the split should have moved right (increased left pane %)
    const widthPct = parseFloat(leftPane.style.width)
    expect(widthPct).toBeGreaterThan(50)
  })

  it('clamps split to minLeft', () => {
    const { container } = render(
      <SplitView
        left={<div>L</div>}
        right={<div>R</div>}
        defaultSplit={25}
        minLeft={20}
      />
    )
    const root = container.querySelector(
      '[data-component="split-view"]'
    ) as HTMLDivElement
    Object.defineProperty(root, 'offsetWidth', {
      value: 1000,
      configurable: true,
    })

    const handle = container.querySelector(
      '[data-component="resize-handle"]'
    ) as HTMLElement
    fireEvent.mouseDown(handle, { clientX: 250 })
    // drag far left to go below minLeft
    fireEvent(document, new MouseEvent('mousemove', { clientX: 0 }))
    fireEvent(document, new MouseEvent('mouseup'))

    const leftPane = root.children[0] as HTMLElement
    const widthPct = parseFloat(leftPane.style.width)
    expect(widthPct).toBe(20)
  })

  it('clamps split to maxRight (100 - minRight)', () => {
    const { container } = render(
      <SplitView
        left={<div>L</div>}
        right={<div>R</div>}
        defaultSplit={75}
        minRight={20}
      />
    )
    const root = container.querySelector(
      '[data-component="split-view"]'
    ) as HTMLDivElement
    Object.defineProperty(root, 'offsetWidth', {
      value: 1000,
      configurable: true,
    })

    const handle = container.querySelector(
      '[data-component="resize-handle"]'
    ) as HTMLElement
    fireEvent.mouseDown(handle, { clientX: 750 })
    // drag far right to exceed 100 - minRight
    fireEvent(document, new MouseEvent('mousemove', { clientX: 1000 }))
    fireEvent(document, new MouseEvent('mouseup'))

    const leftPane = root.children[0] as HTMLElement
    const widthPct = parseFloat(leftPane.style.width)
    expect(widthPct).toBe(80)
  })

  it('handles zero-width container gracefully', () => {
    const { container } = render(
      <SplitView left={<div>L</div>} right={<div>R</div>} defaultSplit={50} />
    )
    const root = container.querySelector(
      '[data-component="split-view"]'
    ) as HTMLDivElement
    Object.defineProperty(root, 'offsetWidth', { value: 0, configurable: true })

    const handle = container.querySelector(
      '[data-component="resize-handle"]'
    ) as HTMLElement
    fireEvent.mouseDown(handle, { clientX: 0 })
    fireEvent(document, new MouseEvent('mousemove', { clientX: 100 }))
    fireEvent(document, new MouseEvent('mouseup'))

    const leftPane = root.children[0] as HTMLElement
    // should remain at default since container width is 0
    expect(leftPane.style.width).toBe('50%')
  })
})
