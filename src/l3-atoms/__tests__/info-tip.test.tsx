import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { InfoTip } from '../info-tip'

describe('InfoTip', () => {
  it('renders info icon', () => {
    const { container } = render(<InfoTip content="Help text" />)
    expect(container.querySelector('svg')).not.toBeNull()
  })

  it('wraps in tooltip with data-component', () => {
    const { container } = render(<InfoTip content="Help text" />)
    expect(container.querySelector('[data-component="tooltip"]')).not.toBeNull()
  })

  it('applies sm size class', () => {
    const { container } = render(<InfoTip content="Help text" size="sm" />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('class')).toContain('h-3.5')
  })
})
