import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ResponsiveContainer } from '../responsive-container'

describe('ResponsiveContainer', () => {
  it('renders all three slots', () => {
    const { container } = render(
      <ResponsiveContainer
        mobile={<span>mobile</span>}
        tablet={<span>tablet</span>}
        desktop={<span>desktop</span>}
      />,
    )
    const el = container.querySelector('[data-component="responsive-container"]')
    expect(el).not.toBeNull()
    // all slots rendered in DOM (visibility controlled by CSS)
    expect(el?.textContent).toContain('mobile')
    expect(el?.textContent).toContain('tablet')
    expect(el?.textContent).toContain('desktop')
  })

  it('uses mobile as tablet fallback when tablet not provided', () => {
    const { container } = render(
      <ResponsiveContainer
        mobile={<span>mobile-content</span>}
        desktop={<span>desktop-content</span>}
      />,
    )
    const el = container.querySelector('[data-component="responsive-container"]')
    // tablet slot should also show mobile content
    const children = el?.children
    expect(children?.length).toBe(3)
    // second child (tablet) should contain mobile content
    expect(children?.[1]?.textContent).toBe('mobile-content')
  })

  it('merges className', () => {
    const { container } = render(
      <ResponsiveContainer
        className="custom-cls"
        mobile={<span>m</span>}
        desktop={<span>d</span>}
      />,
    )
    const el = container.querySelector('[data-component="responsive-container"]')
    expect(el?.className).toContain('custom-cls')
  })
})
