import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Anchor } from '../anchor'

describe('Anchor', () => {
  it('renders without crash', () => {
    render(<Anchor href="#">link</Anchor>)
    expect(screen.getByText('link')).toBeTruthy()
  })

  it('forwards ref to anchor element', () => {
    let el: HTMLAnchorElement | null = null
    render(<Anchor href="#" ref={(node) => { el = node }}>link</Anchor>)
    expect(el).toBeInstanceOf(HTMLAnchorElement)
  })

  it('has data-component="anchor"', () => {
    render(<Anchor href="#">link</Anchor>)
    expect(screen.getByText('link').getAttribute('data-component')).toBe('anchor')
  })

  it('merges className', () => {
    render(<Anchor href="#" className="custom-cls">link</Anchor>)
    expect(screen.getByText('link').className).toContain('custom-cls')
  })

  it('applies default variant', () => {
    render(<Anchor href="#">link</Anchor>)
    expect(screen.getByText('link').className).toContain('text-accent')
  })

  it('applies muted variant', () => {
    render(<Anchor href="#" variant="muted">link</Anchor>)
    expect(screen.getByText('link').className).toContain('text-fg-muted')
  })

  it('does not add rel/target when not external', () => {
    render(<Anchor href="#">link</Anchor>)
    const el = screen.getByText('link')
    expect(el.getAttribute('target')).toBeNull()
    expect(el.getAttribute('rel')).toBeNull()
  })

  it('adds rel and target when external', () => {
    render(<Anchor href="https://example.com" external>link</Anchor>)
    const el = screen.getByText('link').closest('a')!
    expect(el.getAttribute('target')).toBe('_blank')
    expect(el.getAttribute('rel')).toBe('noopener noreferrer')
  })

  it('shows externalIcon when external', () => {
    render(
      <Anchor href="#" external externalIcon={<span data-testid="ext-ico">E</span>}>
        link
      </Anchor>,
    )
    expect(screen.getByTestId('ext-ico')).toBeTruthy()
  })

  it('does not show externalIcon when not external', () => {
    render(
      <Anchor href="#" externalIcon={<span data-testid="ext-ico">E</span>}>
        link
      </Anchor>,
    )
    expect(screen.queryByTestId('ext-ico')).toBeNull()
  })

  it('passes through native anchor props', () => {
    render(<Anchor href="https://example.com" id="my-link">link</Anchor>)
    expect(screen.getByText('link').getAttribute('id')).toBe('my-link')
  })
})
