import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CTABanner } from '../cta-banner'

describe('CTABanner', () => {
  it('renders title', () => {
    render(<CTABanner title="Get Started" actions={<button>Sign Up</button>} />)
    expect(screen.getByText('Get Started')).toBeDefined()
  })

  it('renders description', () => {
    render(<CTABanner title="Go" description="Join today" actions={<button>OK</button>} />)
    expect(screen.getByText('Join today')).toBeDefined()
  })

  it('renders actions', () => {
    render(<CTABanner title="Go" actions={<button>Click Me</button>} />)
    expect(screen.getByText('Click Me')).toBeDefined()
  })

  it('applies variant classes', () => {
    const { container } = render(
      <CTABanner title="Go" variant="accent" actions={<button>OK</button>} />,
    )
    const el = container.querySelector('[data-component="cta-banner"]')
    expect(el?.getAttribute('data-variant')).toBe('accent')
    expect(el?.className).toContain('bg-accent')
  })
})
