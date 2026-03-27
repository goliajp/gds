import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SplashScreen } from '../splash-screen'

describe('SplashScreen', () => {
  it('renders when visible', () => {
    const { container } = render(<SplashScreen visible={true} />)
    const el = container.querySelector('[data-component="splash-screen"]')
    expect(el?.className).toContain('opacity-100')
  })

  it('is hidden when not visible', () => {
    const { container } = render(<SplashScreen visible={false} />)
    const el = container.querySelector('[data-component="splash-screen"]')
    expect(el?.className).toContain('opacity-0')
    expect(el?.className).toContain('pointer-events-none')
  })

  it('shows logo', () => {
    render(<SplashScreen visible={true} logo={<span>LOGO</span>} />)
    expect(screen.getByText('LOGO')).toBeDefined()
  })

  it('shows title', () => {
    render(<SplashScreen visible={true} title="Loading App" />)
    expect(screen.getByText('Loading App')).toBeDefined()
  })
})
