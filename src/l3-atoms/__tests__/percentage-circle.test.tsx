import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PercentageCircle } from '../percentage-circle'

describe('PercentageCircle', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<PercentageCircle value={50} />)
    const el = container.querySelector('[data-component="percentage-circle"]')
    expect(el).not.toBeNull()
  })

  it('displays the percentage text', () => {
    render(<PercentageCircle value={75} />)
    expect(screen.getByText('75%')).toBeDefined()
  })

  it('clamps value to 0 when negative', () => {
    render(<PercentageCircle value={-10} />)
    expect(screen.getByText('0%')).toBeDefined()
  })

  it('clamps value to 100 when exceeding 100', () => {
    render(<PercentageCircle value={150} />)
    expect(screen.getByText('100%')).toBeDefined()
  })

  it('applies danger color for values below 50', () => {
    const { container } = render(<PercentageCircle value={30} />)
    const text = container.querySelector('span.text-danger')
    expect(text).not.toBeNull()
    expect(text?.textContent).toBe('30%')
  })

  it('applies warning color for values between 50 and 79', () => {
    const { container } = render(<PercentageCircle value={65} />)
    const text = container.querySelector('span.text-warning')
    expect(text).not.toBeNull()
  })

  it('applies success color for values 80 and above', () => {
    const { container } = render(<PercentageCircle value={90} />)
    const text = container.querySelector('span.text-success')
    expect(text).not.toBeNull()
  })

  it('applies warning color at exactly 50', () => {
    const { container } = render(<PercentageCircle value={50} />)
    const text = container.querySelector('span.text-warning')
    expect(text).not.toBeNull()
  })

  it('applies success color at exactly 80', () => {
    const { container } = render(<PercentageCircle value={80} />)
    const text = container.querySelector('span.text-success')
    expect(text).not.toBeNull()
  })

  it('applies default size classes', () => {
    const { container } = render(<PercentageCircle value={50} />)
    const el = container.querySelector('[data-component="percentage-circle"]')
    expect(el?.classList.contains('h-16')).toBe(true)
    expect(el?.classList.contains('w-16')).toBe(true)
  })

  it('applies sm size classes', () => {
    const { container } = render(<PercentageCircle size="sm" value={50} />)
    const el = container.querySelector('[data-component="percentage-circle"]')
    expect(el?.classList.contains('h-12')).toBe(true)
    expect(el?.classList.contains('w-12')).toBe(true)
  })

  it('applies lg size classes', () => {
    const { container } = render(<PercentageCircle size="lg" value={50} />)
    const el = container.querySelector('[data-component="percentage-circle"]')
    expect(el?.classList.contains('h-20')).toBe(true)
    expect(el?.classList.contains('w-20')).toBe(true)
  })

  it('renders svg with two circles', () => {
    const { container } = render(<PercentageCircle value={50} />)
    const circles = container.querySelectorAll('circle')
    expect(circles.length).toBe(2)
  })

  it('applies custom className', () => {
    const { container } = render(<PercentageCircle className="extra" value={50} />)
    const el = container.querySelector('[data-component="percentage-circle"]')
    expect(el?.classList.contains('extra')).toBe(true)
  })

  it('passes extra props', () => {
    const { container } = render(<PercentageCircle data-testid="pc" value={50} />)
    expect(container.querySelector('[data-testid="pc"]')).not.toBeNull()
  })

  it('applies danger color at value 0', () => {
    const { container } = render(<PercentageCircle value={0} />)
    const text = container.querySelector('span.text-danger')
    expect(text).not.toBeNull()
    expect(text?.textContent).toBe('0%')
  })
})
