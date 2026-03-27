import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { IconButton } from '../icon-button'

describe('IconButton', () => {
  const icon = <span data-testid="ico">X</span>

  it('renders without crash', () => {
    render(<IconButton icon={icon} />)
    expect(screen.getByTestId('ico')).toBeTruthy()
  })

  it('forwards ref to button element', () => {
    let el: HTMLButtonElement | null = null
    render(<IconButton icon={icon} ref={(node) => { el = node }} />)
    expect(el).toBeInstanceOf(HTMLButtonElement)
  })

  it('has data-component="icon-button"', () => {
    render(<IconButton icon={icon} />)
    expect(screen.getByRole('button').getAttribute('data-component')).toBe('icon-button')
  })

  it('has data-variant defaulting to "default"', () => {
    render(<IconButton icon={icon} />)
    expect(screen.getByRole('button').getAttribute('data-variant')).toBe('default')
  })

  it('sets data-variant to specified variant', () => {
    render(<IconButton icon={icon} variant="danger" />)
    expect(screen.getByRole('button').getAttribute('data-variant')).toBe('danger')
  })

  it('merges className', () => {
    render(<IconButton icon={icon} className="custom-cls" />)
    expect(screen.getByRole('button').className).toContain('custom-cls')
  })

  it('defaults to type="button"', () => {
    render(<IconButton icon={icon} />)
    expect(screen.getByRole('button').getAttribute('type')).toBe('button')
  })

  it('sets aria-label from tooltip', () => {
    render(<IconButton icon={icon} tooltip="Close" />)
    expect(screen.getByRole('button').getAttribute('aria-label')).toBe('Close')
  })

  it('sets title from tooltip', () => {
    render(<IconButton icon={icon} tooltip="Close" />)
    expect(screen.getByRole('button').getAttribute('title')).toBe('Close')
  })

  it('applies size sm', () => {
    render(<IconButton icon={icon} size="sm" />)
    expect(screen.getByRole('button').className).toContain('gds-sq-sm')
  })

  it('applies size lg', () => {
    render(<IconButton icon={icon} size="lg" />)
    expect(screen.getByRole('button').className).toContain('gds-sq-lg')
  })

  it('applies ghost variant', () => {
    render(<IconButton icon={icon} variant="ghost" />)
    const cls = screen.getByRole('button').className
    expect(cls).toContain('text-fg-muted')
  })

  it('applies glass styles', () => {
    render(<IconButton icon={icon} glass />)
    expect(screen.getByRole('button').className).toContain('gds-glass')
  })

  it('is disabled when disabled prop set', () => {
    render(<IconButton icon={icon} disabled />)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
