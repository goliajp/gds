import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SplitView } from '../split-view'

describe('SplitView', () => {
  it('renders left and right panes', () => {
    render(<SplitView left={<div>Left</div>} right={<div>Right</div>} />)
    expect(screen.getByText('Left')).toBeDefined()
    expect(screen.getByText('Right')).toBeDefined()
  })

  it('has data-component attribute', () => {
    const { container } = render(<SplitView left={<div>L</div>} right={<div>R</div>} />)
    expect(container.querySelector('[data-component="split-view"]')).not.toBeNull()
  })

  it('contains a resize handle', () => {
    const { container } = render(<SplitView left={<div>L</div>} right={<div>R</div>} />)
    expect(container.querySelector('[data-component="resize-handle"]')).not.toBeNull()
  })
})
