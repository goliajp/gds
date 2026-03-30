import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MediaObject } from '../media-object'

describe('MediaObject', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(
      <MediaObject media={<span>icon</span>}>content</MediaObject>
    )
    expect(
      container.querySelector('[data-component="media-object"]')
    ).not.toBeNull()
  })

  it('renders media and children', () => {
    render(<MediaObject media={<span>avatar</span>}>body text</MediaObject>)
    expect(screen.getByText('avatar')).toBeDefined()
    expect(screen.getByText('body text')).toBeDefined()
  })

  it('applies flex-row-reverse when reverse is true', () => {
    const { container } = render(
      <MediaObject media={<span>icon</span>} reverse>
        content
      </MediaObject>
    )
    const el = container.querySelector('[data-component="media-object"]')
    expect(el?.className).toContain('flex-row-reverse')
  })
})
