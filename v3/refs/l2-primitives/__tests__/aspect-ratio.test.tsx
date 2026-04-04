import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AspectRatio } from '../aspect-ratio'

describe('AspectRatio', () => {
  it('renders without crash', () => {
    render(
      <AspectRatio>
        <div>content</div>
      </AspectRatio>
    )
    expect(screen.getByText('content')).toBeTruthy()
  })

  it('forwards ref', () => {
    let el: HTMLDivElement | null = null
    render(
      <AspectRatio
        ref={(node) => {
          el = node
        }}
      >
        <div>content</div>
      </AspectRatio>
    )
    expect(el).toBeTruthy()
    expect(el!.tagName).toBe('DIV')
  })

  it('has data-component attribute', () => {
    render(
      <AspectRatio data-testid="ar">
        <div>content</div>
      </AspectRatio>
    )
    expect(screen.getByTestId('ar').getAttribute('data-component')).toBe(
      'aspect-ratio'
    )
  })

  it('merges className', () => {
    render(
      <AspectRatio className="custom-class" data-testid="ar">
        <div>content</div>
      </AspectRatio>
    )
    expect(screen.getByTestId('ar').className).toContain('custom-class')
  })

  it('applies default 16/9 aspect ratio', () => {
    render(
      <AspectRatio data-testid="ar">
        <div>content</div>
      </AspectRatio>
    )
    const style = screen.getByTestId('ar').style
    expect(style.aspectRatio).toContain(`${16 / 9}`)
  })

  it('applies custom ratio', () => {
    render(
      <AspectRatio data-testid="ar" ratio={4 / 3}>
        <div>content</div>
      </AspectRatio>
    )
    const style = screen.getByTestId('ar').style
    expect(style.aspectRatio).toContain(`${4 / 3}`)
  })

  it('renders children', () => {
    render(
      <AspectRatio>
        <img alt="test" src="test.png" />
      </AspectRatio>
    )
    expect(screen.getByAltText('test')).toBeTruthy()
  })
})
