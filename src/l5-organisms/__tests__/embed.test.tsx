import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Embed } from '../embed'

describe('Embed', () => {
  it('renders iframe with src', () => {
    render(<Embed src="https://example.com" />)
    const iframe = screen.getByTestId('embed-iframe')
    expect(iframe).toBeInTheDocument()
    expect(iframe).toHaveAttribute('src', 'https://example.com')
  })

  it('applies aspect ratio via style', () => {
    const { container } = render(
      <Embed src="https://example.com" ratio={4 / 3} />
    )
    const el = container.querySelector(
      '[data-component="embed"]'
    ) as HTMLElement
    expect(el.style.aspectRatio).toContain(String(4 / 3))
  })

  it('sets title attribute on iframe', () => {
    render(<Embed src="https://example.com" title="My embed" />)
    const iframe = screen.getByTestId('embed-iframe')
    expect(iframe).toHaveAttribute('title', 'My embed')
  })

  it('has data-component attribute', () => {
    const { container } = render(<Embed src="https://example.com" />)
    expect(
      container.querySelector('[data-component="embed"]')
    ).toBeInTheDocument()
  })
})
