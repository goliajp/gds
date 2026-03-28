import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Slider } from '../slider'

describe('Slider', () => {
  it('renders without crash', () => {
    const { container } = render(<Slider />)
    expect(container.querySelector('[data-component="slider"]')).toBeTruthy()
  })

  it('has data-component attribute', () => {
    const { container } = render(<Slider />)
    const el = container.querySelector('[data-component="slider"]')
    expect(el!.getAttribute('data-component')).toBe('slider')
  })

  it('renders a range input', () => {
    const { container } = render(<Slider />)
    const input = container.querySelector('input[type="range"]')
    expect(input).toBeTruthy()
  })

  it('applies default min/max/step/value', () => {
    const { container } = render(<Slider />)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.min).toBe('0')
    expect(input.max).toBe('100')
    expect(input.step).toBe('1')
    expect(input.value).toBe('0')
  })

  it('applies custom min/max/step/value', () => {
    const { container } = render(<Slider min={10} max={50} step={5} value={25} />)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.min).toBe('10')
    expect(input.max).toBe('50')
    expect(input.step).toBe('5')
    expect(input.value).toBe('25')
  })

  it('displays value as text', () => {
    const { container } = render(<Slider value={42} />)
    const span = container.querySelector('span')
    expect(span!.textContent).toBe('42')
  })

  it('calls onChange with numeric value', () => {
    const values: number[] = []
    const { container } = render(<Slider value={0} onChange={(v) => values.push(v)} />)
    const input = container.querySelector('input') as HTMLInputElement
    fireEvent.change(input, { target: { value: '75' } })
    expect(values).toEqual([75])
  })

  it('handles missing onChange gracefully', () => {
    const { container } = render(<Slider value={50} />)
    const input = container.querySelector('input') as HTMLInputElement
    // should not throw
    fireEvent.change(input, { target: { value: '60' } })
  })

  it('applies disabled state', () => {
    const { container } = render(<Slider disabled />)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.disabled).toBe(true)
    expect(input.getAttribute('class')).toContain('cursor-not-allowed')
    expect(input.getAttribute('class')).toContain('opacity-50')
  })

  it('is not disabled by default', () => {
    const { container } = render(<Slider />)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.disabled).toBe(false)
    expect(input.getAttribute('class')).not.toContain('cursor-not-allowed')
  })

  it('merges className on wrapper', () => {
    const { container } = render(<Slider className="my-slider" />)
    const el = container.querySelector('[data-component="slider"]')
    expect(el!.getAttribute('class')).toContain('my-slider')
  })

  it('forwards ref to input element', () => {
    let el: HTMLInputElement | null = null
    render(<Slider ref={(node) => { el = node }} />)
    expect(el).toBeTruthy()
    expect(el!.tagName.toLowerCase()).toBe('input')
  })

  it('spreads additional HTML attributes on wrapper', () => {
    const { container } = render(<Slider data-testid="slider-wrap" />)
    const el = container.querySelector('[data-component="slider"]')
    expect(el!.getAttribute('data-testid')).toBe('slider-wrap')
  })
})
