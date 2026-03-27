import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Progress } from '../progress'

describe('Progress', () => {
  it('renders without crash', () => {
    render(<Progress />)
    expect(screen.getByRole('progressbar')).toBeTruthy()
  })

  it('forwards ref to outer div', () => {
    let el: HTMLDivElement | null = null
    render(<Progress ref={(node) => { el = node }} />)
    expect(el).not.toBeNull()
    expect(el!.getAttribute('data-component')).toBe('progress')
  })

  it('has data-component="progress"', () => {
    render(<Progress data-testid="prog" />)
    expect(screen.getByTestId('prog').getAttribute('data-component')).toBe('progress')
  })

  it('merges className on outer div', () => {
    render(<Progress className="custom-cls" data-testid="prog" />)
    expect(screen.getByTestId('prog').className).toContain('custom-cls')
  })

  it('has role="progressbar" with aria attributes', () => {
    render(<Progress value={42} />)
    const bar = screen.getByRole('progressbar')
    expect(bar.getAttribute('aria-valuemin')).toBe('0')
    expect(bar.getAttribute('aria-valuemax')).toBe('100')
    expect(bar.getAttribute('aria-valuenow')).toBe('42')
  })

  it('clamps value to 0 when negative', () => {
    render(<Progress value={-10} />)
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('0')
  })

  it('clamps value to 100 when exceeding', () => {
    render(<Progress value={200} />)
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('100')
  })

  it('defaults value to 0', () => {
    render(<Progress />)
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('0')
  })

  it('shows label when showLabel is true', () => {
    render(<Progress value={75} showLabel />)
    expect(screen.getByText('75%')).toBeTruthy()
  })

  it('does not show label by default', () => {
    render(<Progress value={75} />)
    expect(screen.queryByText('75%')).toBeNull()
  })

  it('applies sm size', () => {
    render(<Progress size="sm" />)
    expect(screen.getByRole('progressbar').className).toContain('h-1')
  })

  it('applies lg size', () => {
    render(<Progress size="lg" />)
    expect(screen.getByRole('progressbar').className).toContain('h-3')
  })

  it('applies default size', () => {
    render(<Progress />)
    expect(screen.getByRole('progressbar').className).toContain('h-2')
  })

  it('sets bar width style based on value', () => {
    render(<Progress value={60} />)
    const bar = screen.getByRole('progressbar').firstElementChild as HTMLElement
    expect(bar.style.width).toBe('60%')
  })

  it('applies success variant color', () => {
    render(<Progress variant="success" value={50} />)
    const bar = screen.getByRole('progressbar').firstElementChild as HTMLElement
    expect(bar.className).toContain('bg-success')
  })

  it('applies danger variant color', () => {
    render(<Progress variant="danger" value={50} />)
    const bar = screen.getByRole('progressbar').firstElementChild as HTMLElement
    expect(bar.className).toContain('bg-danger')
  })

  it('applies warning variant color', () => {
    render(<Progress variant="warning" value={50} />)
    const bar = screen.getByRole('progressbar').firstElementChild as HTMLElement
    expect(bar.className).toContain('bg-warning')
  })

  it('applies default variant color (accent)', () => {
    render(<Progress value={50} />)
    const bar = screen.getByRole('progressbar').firstElementChild as HTMLElement
    expect(bar.className).toContain('bg-accent')
  })
})
