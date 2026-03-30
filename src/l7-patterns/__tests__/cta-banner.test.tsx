import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CTABanner } from '../cta-banner'

describe('CTABanner', () => {
  it('renders title', () => {
    render(<CTABanner title="Get Started" actions={<button>Sign Up</button>} />)
    expect(screen.getByText('Get Started')).toBeDefined()
  })

  it('renders description', () => {
    render(
      <CTABanner
        title="Go"
        description="Join today"
        actions={<button>OK</button>}
      />
    )
    expect(screen.getByText('Join today')).toBeDefined()
  })

  it('renders actions', () => {
    render(<CTABanner title="Go" actions={<button>Click Me</button>} />)
    expect(screen.getByText('Click Me')).toBeDefined()
  })

  it('applies variant classes', () => {
    const { container } = render(
      <CTABanner title="Go" variant="accent" actions={<button>OK</button>} />
    )
    const el = container.querySelector('[data-component="cta-banner"]')
    expect(el?.getAttribute('data-variant')).toBe('accent')
    expect(el?.className).toContain('bg-accent')
  })

  it('applies gradient variant', () => {
    const { container } = render(
      <CTABanner title="Go" variant="gradient" actions={<button>OK</button>} />
    )
    const el = container.querySelector('[data-component="cta-banner"]')
    expect(el?.className).toContain('bg-gradient-to-r')
  })

  it('applies glass class for default variant with glass', () => {
    const { container } = render(
      <CTABanner title="Go" glass actions={<button>OK</button>} />
    )
    const el = container.querySelector('[data-component="cta-banner"]')
    expect(el?.className).toContain('gds-glass')
  })

  it('applies surface background for default variant without glass', () => {
    const { container } = render(
      <CTABanner title="Go" actions={<button>OK</button>} />
    )
    const el = container.querySelector('[data-component="cta-banner"]')
    expect(el?.className).toContain('bg-surface')
  })

  it('applies fg text color for default variant title', () => {
    const { container } = render(
      <CTABanner title="Go" actions={<button>OK</button>} />
    )
    const h2 = container.querySelector('h2')
    expect(h2?.className).toContain('text-fg')
  })

  it('applies opacity for non-default description', () => {
    const { container } = render(
      <CTABanner
        title="Go"
        description="Desc"
        variant="accent"
        actions={<button>OK</button>}
      />
    )
    const p = container.querySelector('p')
    expect(p?.className).toContain('opacity-80')
  })
})
