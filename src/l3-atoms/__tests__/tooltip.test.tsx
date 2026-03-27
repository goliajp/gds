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
})
