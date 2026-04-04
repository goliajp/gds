import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CompositionPattern } from '../composition-pattern'

describe('CompositionPattern', () => {
  it('renders content', () => {
    const { container } = render(
      <CompositionPattern content={<p>Main content</p>} />
    )
    expect(container.textContent).toContain('Main content')
  })

  it('renders sidebar', () => {
    const { container } = render(
      <CompositionPattern sidebar={<nav>Nav</nav>} content={<p>Body</p>} />
    )
    expect(container.textContent).toContain('Nav')
  })

  it('places sidebar on right when position is right', () => {
    const { container } = render(
      <CompositionPattern
        sidebar={<nav>Side</nav>}
        content={<p>Body</p>}
        sidebarPosition="right"
      />
    )
    const el = container.querySelector('[data-component="composition-pattern"]')
    // sidebar has border-l when right
    const sidebarDiv = el?.querySelector('.border-l')
    expect(sidebarDiv).not.toBeNull()
  })

  it('sets data-component attribute', () => {
    const { container } = render(<CompositionPattern content={<p>Test</p>} />)
    const el = container.querySelector('[data-component="composition-pattern"]')
    expect(el).not.toBeNull()
  })
})
