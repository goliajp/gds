import { render } from '@testing-library/react'
import { act } from 'react'
import { describe, expect, it } from 'vitest'

import { ScrollProgress } from '../scroll-progress'

describe('ScrollProgress', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<ScrollProgress />)
    expect(container.querySelector('[data-component="scroll-progress"]')).not.toBeNull()
  })

  it('uses default height of 3px', () => {
    const { container } = render(<ScrollProgress />)
    const el = container.querySelector('[data-component="scroll-progress"]') as HTMLElement
    expect(el.style.height).toBe('3px')
  })

  it('applies custom height', () => {
    const { container } = render(<ScrollProgress height={6} />)
    const el = container.querySelector('[data-component="scroll-progress"]') as HTMLElement
    expect(el.style.height).toBe('6px')
  })

  it('renders inner progress bar at 0% initially', () => {
    const { container } = render(<ScrollProgress />)
    const inner = container.querySelector('[data-component="scroll-progress"] > div') as HTMLElement
    expect(inner.style.width).toBe('0%')
  })

  it('does not apply custom backgroundColor when color is undefined', () => {
    const { container } = render(<ScrollProgress />)
    const inner = container.querySelector('[data-component="scroll-progress"] > div') as HTMLElement
    expect(inner.style.backgroundColor).toBe('')
  })

  it('applies custom color as backgroundColor', () => {
    const { container } = render(<ScrollProgress color="red" />)
    const inner = container.querySelector('[data-component="scroll-progress"] > div') as HTMLElement
    expect(inner.style.backgroundColor).toBe('red')
  })

  it('applies custom className', () => {
    const { container } = render(<ScrollProgress className="my-progress" />)
    const el = container.querySelector('[data-component="scroll-progress"]')
    expect(el?.className).toContain('my-progress')
  })

  it('forwards additional props', () => {
    const { container } = render(<ScrollProgress data-testid="sp" />)
    expect(container.querySelector('[data-testid="sp"]')).not.toBeNull()
  })

  it('updates progress on scroll event', () => {
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 500, configurable: true })
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 2000, configurable: true })
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 1000, configurable: true })

    const { container } = render(<ScrollProgress />)

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    const inner = container.querySelector('[data-component="scroll-progress"] > div') as HTMLElement
    expect(inner.style.width).toBe('50%')
  })
})
