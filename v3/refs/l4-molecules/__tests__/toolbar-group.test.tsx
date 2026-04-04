import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ToolbarGroup } from '../toolbar-group'

describe('ToolbarGroup', () => {
  it('has data-component="toolbar-group"', () => {
    const { container } = render(
      <ToolbarGroup>
        <button>A</button>
      </ToolbarGroup>
    )
    expect(
      container.querySelector('[data-component="toolbar-group"]')
    ).not.toBeNull()
  })

  it('has role="toolbar"', () => {
    const { container } = render(
      <ToolbarGroup>
        <button>A</button>
      </ToolbarGroup>
    )
    expect(container.querySelector('[role="toolbar"]')).not.toBeNull()
  })

  it('renders all children', () => {
    const { container } = render(
      <ToolbarGroup>
        <button>A</button>
        <button>B</button>
        <button>C</button>
      </ToolbarGroup>
    )
    const buttons = container.querySelectorAll('button')
    expect(buttons.length).toBe(3)
  })
})
