import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Separator } from '../separator'

describe('Separator', () => {
  it('renders without crash', () => {
    render(<Separator />)
    expect(screen.getByRole('separator')).toBeTruthy()
  })

  it('forwards ref', () => {
    let el: HTMLDivElement | null = null
    render(<Separator ref={(node) => { el = node }} />)
    expect(el).toBeTruthy()
    expect(el!.tagName).toBe('DIV')
  })

  it('has data-component attribute', () => {
    render(<Separator />)
    expect(screen.getByRole('separator').getAttribute('data-component')).toBe('separator')
  })

  it('has role="separator"', () => {
    render(<Separator />)
    expect(screen.getByRole('separator')).toBeTruthy()
  })

  it('merges className', () => {
    render(<Separator className="custom-class" />)
    expect(screen.getByRole('separator').className).toContain('custom-class')
  })

  it('renders horizontal by default', () => {
    render(<Separator />)
    const el = screen.getByRole('separator')
    expect(el.getAttribute('aria-orientation')).toBeNull()
  })

  it('renders vertical orientation', () => {
    render(<Separator orientation="vertical" />)
    const el = screen.getByRole('separator')
    expect(el.getAttribute('aria-orientation')).toBe('vertical')
    expect(el.className).toContain('border-l')
  })

  it('applies dashed variant', () => {
    render(<Separator variant="dashed" />)
    expect(screen.getByRole('separator').className).toContain('border-dashed')
  })

  it('applies dotted variant', () => {
    render(<Separator variant="dotted" />)
    expect(screen.getByRole('separator').className).toContain('border-dotted')
  })

  it('renders label when provided', () => {
    render(<Separator label="OR" />)
    expect(screen.getByText('OR')).toBeTruthy()
  })
})
