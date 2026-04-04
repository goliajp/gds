import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Meter } from '../meter'

describe('Meter', () => {
  it('has data-component="meter"', () => {
    const { container } = render(<Meter value={50} />)
    expect(container.querySelector('[data-component="meter"]')).not.toBeNull()
  })

  it('has role="meter"', () => {
    render(<Meter value={50} />)
    expect(screen.getByRole('meter')).toBeDefined()
  })

  it('sets aria-valuemin, aria-valuemax, aria-valuenow', () => {
    render(<Meter max={200} min={10} value={75} />)
    const meter = screen.getByRole('meter')
    expect(meter.getAttribute('aria-valuemin')).toBe('10')
    expect(meter.getAttribute('aria-valuemax')).toBe('200')
    expect(meter.getAttribute('aria-valuenow')).toBe('75')
  })

  it('renders label text', () => {
    render(<Meter label="Storage" value={50} />)
    expect(screen.getByText('Storage')).toBeDefined()
  })

  it('shows percentage value when showValue is true', () => {
    render(<Meter showValue value={50} />)
    expect(screen.getByText('50%')).toBeDefined()
  })

  it('hides percentage value when showValue is false', () => {
    render(<Meter showValue={false} value={50} />)
    expect(screen.queryByText('50%')).toBeNull()
  })

  it('uses auto color — success for low values', () => {
    const { container } = render(<Meter showValue={false} value={20} />)
    const bar = container.querySelector('[role="meter"] > div')
    expect(bar?.className).toContain('bg-success')
  })

  it('uses auto color — danger for high values', () => {
    const { container } = render(<Meter showValue={false} value={90} />)
    const bar = container.querySelector('[role="meter"] > div')
    expect(bar?.className).toContain('bg-danger')
  })

  it('clamps value above max to 100%', () => {
    render(<Meter max={100} value={150} />)
    expect(screen.getByText('100%')).toBeDefined()
  })

  it('clamps value below min to 0%', () => {
    render(<Meter min={0} value={-10} />)
    expect(screen.getByText('0%')).toBeDefined()
  })

  it('uses auto color — warning for mid-high values', () => {
    const { container } = render(<Meter showValue={false} value={65} />)
    const bar = container.querySelector('[role="meter"] > div')
    expect(bar?.className).toContain('bg-warning')
  })

  it('uses auto color — accent for mid values', () => {
    const { container } = render(<Meter showValue={false} value={45} />)
    const bar = container.querySelector('[role="meter"] > div')
    expect(bar?.className).toContain('bg-accent')
  })

  it('applies named variant colors', () => {
    const { container: c1 } = render(
      <Meter showValue={false} value={50} variant="danger" />
    )
    expect(c1.querySelector('[role="meter"] > div')?.className).toContain(
      'bg-danger'
    )

    const { container: c2 } = render(
      <Meter showValue={false} value={50} variant="success" />
    )
    expect(c2.querySelector('[role="meter"] > div')?.className).toContain(
      'bg-success'
    )

    const { container: c3 } = render(
      <Meter showValue={false} value={50} variant="warning" />
    )
    expect(c3.querySelector('[role="meter"] > div')?.className).toContain(
      'bg-warning'
    )
  })

  it('handles zero range (max equals min)', () => {
    render(<Meter min={50} max={50} value={50} />)
    expect(screen.getByText('0%')).toBeDefined()
  })

  it('hides label and value when neither is set', () => {
    const { container } = render(<Meter showValue={false} value={50} />)
    // no header row with label/value
    const headerDiv = container.querySelector(
      '[data-component="meter"] > div:first-child'
    )
    // first child should be the meter bar container itself (role="meter")
    expect(headerDiv?.getAttribute('role')).toBe('meter')
  })
})
