import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Button } from '../button'

describe('Button', () => {
  it('renders without crash', () => {
    render(<Button>click</Button>)
    expect(screen.getByText('click')).toBeTruthy()
  })

  it('forwards ref to button element', () => {
    let el: HTMLButtonElement | null = null
    render(
      <Button
        ref={(node) => {
          el = node
        }}
      >
        ok
      </Button>
    )
    expect(el).toBeInstanceOf(HTMLButtonElement)
  })

  it('has data-component="button"', () => {
    render(<Button>ok</Button>)
    expect(
      screen.getByText('ok').closest('button')?.getAttribute('data-component')
    ).toBe('button')
  })

  it('has data-variant defaulting to "primary"', () => {
    render(<Button>ok</Button>)
    expect(screen.getByRole('button').getAttribute('data-variant')).toBe(
      'primary'
    )
  })

  it('sets data-variant to specified variant', () => {
    render(<Button variant="danger">del</Button>)
    expect(screen.getByRole('button').getAttribute('data-variant')).toBe(
      'danger'
    )
  })

  it('merges className', () => {
    render(<Button className="custom-cls">ok</Button>)
    expect(screen.getByRole('button').className).toContain('custom-cls')
  })

  it('applies size sm', () => {
    render(<Button size="sm">ok</Button>)
    expect(screen.getByRole('button').className).toContain('gds-h-sm')
  })

  it('applies size lg', () => {
    render(<Button size="lg">ok</Button>)
    expect(screen.getByRole('button').className).toContain('gds-h-lg')
  })

  it('shows spinner when loading', () => {
    render(<Button loading>ok</Button>)
    const btn = screen.getByRole('button')
    expect(btn.querySelector('svg.animate-spin')).toBeTruthy()
  })

  it('is disabled when loading', () => {
    render(<Button loading>ok</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('is disabled when disabled prop set', () => {
    render(<Button disabled>ok</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('renders icon on the left', () => {
    render(<Button icon={<span data-testid="ico">I</span>}>ok</Button>)
    expect(screen.getByTestId('ico')).toBeTruthy()
  })

  it('renders iconRight on the right', () => {
    render(<Button iconRight={<span data-testid="ico-r">R</span>}>ok</Button>)
    expect(screen.getByTestId('ico-r')).toBeTruthy()
  })

  it('applies fullWidth', () => {
    render(<Button fullWidth>ok</Button>)
    expect(screen.getByRole('button').className).toContain('w-full')
  })

  it('applies glass styles', () => {
    render(<Button glass>ok</Button>)
    expect(screen.getByRole('button').className).toContain('gds-glass')
  })

  it('applies ghost variant classes', () => {
    render(<Button variant="ghost">ok</Button>)
    expect(screen.getByRole('button').className).toContain('bg-transparent')
  })

  it('applies secondary variant classes', () => {
    render(<Button variant="secondary">ok</Button>)
    expect(screen.getByRole('button').className).toContain('border')
  })
})
