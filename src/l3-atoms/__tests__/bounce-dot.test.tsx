import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { BounceDot } from '../bounce-dot'

describe('BounceDot', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<BounceDot />)
    const el = container.querySelector('[data-component="bounce-dot"]')
    expect(el).not.toBeNull()
  })

  it('renders 3 dots by default', () => {
    const { container } = render(<BounceDot />)
    const dots = container.querySelectorAll('[data-component="bounce-dot"] > span')
    expect(dots.length).toBe(3)
  })

  it('renders custom count of dots', () => {
    const { container } = render(<BounceDot count={5} />)
    const dots = container.querySelectorAll('[data-component="bounce-dot"] > span')
    expect(dots.length).toBe(5)
  })

  it('applies default size classes', () => {
    const { container } = render(<BounceDot />)
    const dot = container.querySelector('[data-component="bounce-dot"] > span')
    expect(dot?.classList.contains('h-2')).toBe(true)
    expect(dot?.classList.contains('w-2')).toBe(true)
  })

  it('applies sm size classes', () => {
    const { container } = render(<BounceDot size="sm" />)
    const dot = container.querySelector('[data-component="bounce-dot"] > span')
    expect(dot?.classList.contains('h-1.5')).toBe(true)
    expect(dot?.classList.contains('w-1.5')).toBe(true)
  })

  it('applies lg size classes', () => {
    const { container } = render(<BounceDot size="lg" />)
    const dot = container.querySelector('[data-component="bounce-dot"] > span')
    expect(dot?.classList.contains('h-3')).toBe(true)
    expect(dot?.classList.contains('w-3')).toBe(true)
  })

  it('applies custom color via inline style', () => {
    const { container } = render(<BounceDot color="#ff0000" />)
    const dot = container.querySelector('[data-component="bounce-dot"] > span') as HTMLElement
    expect(dot?.style.backgroundColor).toBe('#ff0000')
  })

  it('does not set backgroundColor when color is not provided', () => {
    const { container } = render(<BounceDot />)
    const dot = container.querySelector('[data-component="bounce-dot"] > span') as HTMLElement
    expect(dot?.style.backgroundColor).toBe('')
  })

  it('has role="status" for accessibility', () => {
    const { container } = render(<BounceDot />)
    const el = container.querySelector('[role="status"]')
    expect(el).not.toBeNull()
  })

  it('applies custom className', () => {
    const { container } = render(<BounceDot className="my-class" />)
    const el = container.querySelector('[data-component="bounce-dot"]')
    expect(el?.classList.contains('my-class')).toBe(true)
  })

  it('sets animation delay per dot', () => {
    const { container } = render(<BounceDot count={3} />)
    const dots = container.querySelectorAll('[data-component="bounce-dot"] > span') as NodeListOf<HTMLElement>
    expect(dots[0]?.style.animationDelay).toBe('0ms')
    expect(dots[1]?.style.animationDelay).toBe('160ms')
    expect(dots[2]?.style.animationDelay).toBe('320ms')
  })
})
