import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Dot } from '../dot'

describe('Dot', () => {
  it('renders without crash', () => {
    render(<Dot data-testid="dot" />)
    expect(screen.getByTestId('dot')).toBeTruthy()
  })

  it('forwards ref', () => {
    let el: HTMLSpanElement | null = null
    render(<Dot ref={(node) => { el = node }} />)
    expect(el).toBeTruthy()
    expect(el!.tagName).toBe('SPAN')
  })

  it('has data-component attribute', () => {
    render(<Dot data-testid="dot" />)
    expect(screen.getByTestId('dot').getAttribute('data-component')).toBe('dot')
  })

  it('merges className', () => {
    render(<Dot className="custom-class" data-testid="dot" />)
    expect(screen.getByTestId('dot').className).toContain('custom-class')
  })

  it('renders label text', () => {
    render(<Dot label="Online" />)
    expect(screen.getByText('Online')).toBeTruthy()
  })

  it('adds gap class when label is provided', () => {
    render(<Dot data-testid="dot" label="Status" />)
    expect(screen.getByTestId('dot').className).toContain('gds-gap-sm')
  })

  it('renders pulse element when pulse is true', () => {
    render(<Dot data-testid="dot" pulse />)
    const el = screen.getByTestId('dot')
    const pingEl = el.querySelector('.animate-ping')
    expect(pingEl).toBeTruthy()
  })

  it('does not render pulse element by default', () => {
    render(<Dot data-testid="dot" />)
    const el = screen.getByTestId('dot')
    const pingEl = el.querySelector('.animate-ping')
    expect(pingEl).toBeNull()
  })

  it('applies danger color variant', () => {
    render(<Dot color="danger" data-testid="dot" />)
    const inner = screen.getByTestId('dot').querySelector('span')
    expect(inner!.className).toContain('bg-danger')
  })

  it('applies success color variant', () => {
    render(<Dot color="success" data-testid="dot" />)
    const inner = screen.getByTestId('dot').querySelector('span')
    expect(inner!.className).toContain('bg-success')
  })
})
