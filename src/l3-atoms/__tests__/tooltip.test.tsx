import { act, fireEvent, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { Tooltip } from '../tooltip'

describe('Tooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('has data-component="tooltip"', () => {
    const { container } = render(
      <Tooltip content="Help text"><button>Hover me</button></Tooltip>,
    )
    expect(container.querySelector('[data-component="tooltip"]')).not.toBeNull()
  })

  it('has data-state="closed" by default', () => {
    const { container } = render(
      <Tooltip content="Help text"><button>Hover me</button></Tooltip>,
    )
    expect(container.querySelector('[data-state="closed"]')).not.toBeNull()
  })

  it('shows content on mouseEnter after delay', () => {
    const { container } = render(
      <Tooltip content="Help text" delay={100}><button>Hover me</button></Tooltip>,
    )
    const wrapper = container.querySelector('[data-component="tooltip"]')!

    fireEvent.mouseEnter(wrapper)
    // still closed before delay
    expect(container.querySelector('[data-state="closed"]')).not.toBeNull()

    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(container.querySelector('[data-state="open"]')).not.toBeNull()
  })

  it('hides content on mouseLeave', () => {
    const { container } = render(
      <Tooltip content="Help text" delay={0}><button>Hover me</button></Tooltip>,
    )
    const wrapper = container.querySelector('[data-component="tooltip"]')!

    fireEvent.mouseEnter(wrapper)
    act(() => {
      vi.advanceTimersByTime(0)
    })
    expect(container.querySelector('[data-state="open"]')).not.toBeNull()

    fireEvent.mouseLeave(wrapper)
    expect(container.querySelector('[data-state="closed"]')).not.toBeNull()
  })

  it('uses delayed close when interactive is true', () => {
    const { container } = render(
      <Tooltip content="Interactive tip" delay={0} interactive><button>Hover me</button></Tooltip>,
    )
    const wrapper = container.querySelector('[data-component="tooltip"]')!

    fireEvent.mouseEnter(wrapper)
    act(() => {
      vi.advanceTimersByTime(0)
    })
    expect(container.querySelector('[data-state="open"]')).not.toBeNull()

    // mouse leave starts a 150ms close timer
    fireEvent.mouseLeave(wrapper)
    // still open immediately
    expect(container.querySelector('[data-state="open"]')).not.toBeNull()

    act(() => {
      vi.advanceTimersByTime(150)
    })
    expect(container.querySelector('[data-state="closed"]')).not.toBeNull()
  })

  it('cancels close when re-entering interactive tooltip', () => {
    const { container } = render(
      <Tooltip content="Interactive tip" delay={0} interactive><button>Hover me</button></Tooltip>,
    )
    const wrapper = container.querySelector('[data-component="tooltip"]')!

    // open tooltip
    fireEvent.mouseEnter(wrapper)
    act(() => {
      vi.advanceTimersByTime(0)
    })
    expect(container.querySelector('[data-state="open"]')).not.toBeNull()

    // leave
    fireEvent.mouseLeave(wrapper)
    // re-enter before 150ms close timer fires
    fireEvent.mouseEnter(wrapper)
    act(() => {
      vi.advanceTimersByTime(200)
    })
    // should remain open
    expect(container.querySelector('[data-state="open"]')).not.toBeNull()
  })

  it('applies glass classes when glass is true', () => {
    const { container } = render(
      <Tooltip content="Glass tip" delay={0} glass><button>Hover me</button></Tooltip>,
    )
    const wrapper = container.querySelector('[data-component="tooltip"]')!

    fireEvent.mouseEnter(wrapper)
    act(() => {
      vi.advanceTimersByTime(0)
    })

    // the tooltip popup should have glass-related border class
    const popup = container.querySelector('[data-state="open"] > div')
    expect(popup?.className).toContain('border')
  })

  it('applies maxWidth style when provided', () => {
    const { container } = render(
      <Tooltip content="Long text" delay={0} maxWidth={200}><button>Hover me</button></Tooltip>,
    )
    const wrapper = container.querySelector('[data-component="tooltip"]')!

    fireEvent.mouseEnter(wrapper)
    act(() => {
      vi.advanceTimersByTime(0)
    })

    const popup = wrapper.querySelector('.absolute') as HTMLElement
    expect(popup?.style.maxWidth).toBe('200px')
    expect(popup?.style.whiteSpace).toBe('normal')
  })

  it('renders with different placements', () => {
    for (const placement of ['top', 'bottom', 'left', 'right'] as const) {
      const { container } = render(
        <Tooltip content="Tip" delay={0} placement={placement}><button>H</button></Tooltip>,
      )
      const wrapper = container.querySelector('[data-component="tooltip"]')!
      fireEvent.mouseEnter(wrapper)
      act(() => {
        vi.advanceTimersByTime(0)
      })
      // just verify it opened
      expect(container.querySelector('[data-state="open"]')).not.toBeNull()
    }
  })

  it('cancels enter timer on mouse leave before delay fires', () => {
    const { container } = render(
      <Tooltip content="Tip" delay={500}><button>Hover me</button></Tooltip>,
    )
    const wrapper = container.querySelector('[data-component="tooltip"]')!

    fireEvent.mouseEnter(wrapper)
    // leave before 500ms
    fireEvent.mouseLeave(wrapper)
    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(container.querySelector('[data-state="closed"]')).not.toBeNull()
  })

  it('interactive tooltip popup has pointer-events-auto and mouse handlers', () => {
    const { container } = render(
      <Tooltip content="Interactive" delay={0} interactive><button>Hover</button></Tooltip>,
    )
    const wrapper = container.querySelector('[data-component="tooltip"]')!
    fireEvent.mouseEnter(wrapper)
    act(() => {
      vi.advanceTimersByTime(0)
    })
    const popup = wrapper.querySelector('.absolute')
    expect(popup?.className).toContain('pointer-events-auto')
  })
})
