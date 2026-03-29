import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MediaContainer } from '../media-container'

describe('MediaContainer', () => {
  it('renders without crash', () => {
    const { container } = render(<MediaContainer type="image" src="/test.jpg" />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<MediaContainer type="image" src="/test.jpg" />)
    expect(container.querySelector('[data-component="media-container"]')).not.toBeNull()
  })

  it('renders an img for image type', () => {
    const { container } = render(<MediaContainer type="image" src="/test.jpg" alt="Test" />)
    expect(container.querySelector('img')).not.toBeNull()
  })

  it('renders a video for video type', () => {
    const { container } = render(<MediaContainer type="video" src="/test.mp4" />)
    expect(container.querySelector('video')).not.toBeNull()
  })
})
