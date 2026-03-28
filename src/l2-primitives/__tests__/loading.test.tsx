import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { LoadingBars, LoadingDots, LoadingPulse, LoadingRing, LoadingWave } from '../loading'

describe('LoadingDots', () => {
  it('renders without crash', () => {
    render(<LoadingDots />)
    expect(screen.getByRole('status')).toBeTruthy()
  })

  it('has data-component attribute', () => {
    render(<LoadingDots />)
    expect(screen.getByRole('status').getAttribute('data-component')).toBe('loading-dots')
  })

  it('renders 3 dots', () => {
    render(<LoadingDots />)
    const dots = screen.getByRole('status').querySelectorAll('span')
    expect(dots.length).toBe(3)
  })

  it('merges className', () => {
    render(<LoadingDots className="custom" />)
    expect(screen.getByRole('status').getAttribute('class')).toContain('custom')
  })

  it('applies default size', () => {
    render(<LoadingDots />)
    expect(screen.getByRole('status').getAttribute('class')).toContain('gap-1.5')
  })

  it('applies sm size', () => {
    render(<LoadingDots size="sm" />)
    expect(screen.getByRole('status').getAttribute('class')).toContain('gap-1')
  })

  it('applies lg size', () => {
    render(<LoadingDots size="lg" />)
    expect(screen.getByRole('status').getAttribute('class')).toContain('gap-2')
  })

  it('forwards ref', () => {
    let el: HTMLDivElement | null = null
    render(<LoadingDots ref={(node) => { el = node }} />)
    expect(el).toBeTruthy()
    expect(el!.tagName.toLowerCase()).toBe('div')
  })
})

describe('LoadingBars', () => {
  it('renders without crash', () => {
    render(<LoadingBars />)
    expect(screen.getByRole('status')).toBeTruthy()
  })

  it('has data-component attribute', () => {
    render(<LoadingBars />)
    expect(screen.getByRole('status').getAttribute('data-component')).toBe('loading-bars')
  })

  it('renders 5 bars', () => {
    render(<LoadingBars />)
    const bars = screen.getByRole('status').querySelectorAll('span')
    expect(bars.length).toBe(5)
  })

  it('merges className', () => {
    render(<LoadingBars className="extra" />)
    expect(screen.getByRole('status').getAttribute('class')).toContain('extra')
  })

  it('applies default size', () => {
    render(<LoadingBars />)
    const cls = screen.getByRole('status').getAttribute('class')
    expect(cls).toContain('h-4')
  })

  it('applies sm size', () => {
    render(<LoadingBars size="sm" />)
    const cls = screen.getByRole('status').getAttribute('class')
    expect(cls).toContain('h-3')
  })

  it('applies lg size', () => {
    render(<LoadingBars size="lg" />)
    const cls = screen.getByRole('status').getAttribute('class')
    expect(cls).toContain('h-6')
  })

  it('forwards ref', () => {
    let el: HTMLDivElement | null = null
    render(<LoadingBars ref={(node) => { el = node }} />)
    expect(el).toBeTruthy()
  })
})

describe('LoadingPulse', () => {
  it('renders without crash', () => {
    render(<LoadingPulse />)
    expect(screen.getByRole('status')).toBeTruthy()
  })

  it('has data-component attribute', () => {
    render(<LoadingPulse />)
    expect(screen.getByRole('status').getAttribute('data-component')).toBe('loading-pulse')
  })

  it('merges className', () => {
    render(<LoadingPulse className="pulse-extra" />)
    expect(screen.getByRole('status').getAttribute('class')).toContain('pulse-extra')
  })

  it('applies default size to inner span', () => {
    render(<LoadingPulse />)
    const span = screen.getByRole('status').querySelector('span')
    expect(span!.getAttribute('class')).toContain('h-4')
    expect(span!.getAttribute('class')).toContain('w-4')
  })

  it('applies sm size', () => {
    render(<LoadingPulse size="sm" />)
    const span = screen.getByRole('status').querySelector('span')
    expect(span!.getAttribute('class')).toContain('h-3')
    expect(span!.getAttribute('class')).toContain('w-3')
  })

  it('applies lg size', () => {
    render(<LoadingPulse size="lg" />)
    const span = screen.getByRole('status').querySelector('span')
    expect(span!.getAttribute('class')).toContain('h-6')
    expect(span!.getAttribute('class')).toContain('w-6')
  })

  it('forwards ref', () => {
    let el: HTMLDivElement | null = null
    render(<LoadingPulse ref={(node) => { el = node }} />)
    expect(el).toBeTruthy()
  })
})

describe('LoadingRing', () => {
  it('renders without crash', () => {
    render(<LoadingRing />)
    expect(screen.getByRole('status')).toBeTruthy()
  })

  it('has data-component attribute', () => {
    render(<LoadingRing />)
    expect(screen.getByRole('status').getAttribute('data-component')).toBe('loading-ring')
  })

  it('merges className', () => {
    render(<LoadingRing className="ring-extra" />)
    expect(screen.getByRole('status').getAttribute('class')).toContain('ring-extra')
  })

  it('applies default size with border-2', () => {
    render(<LoadingRing />)
    const span = screen.getByRole('status').querySelector('span')
    expect(span!.getAttribute('class')).toContain('h-4')
    expect(span!.getAttribute('class')).toContain('border-2')
  })

  it('applies sm size', () => {
    render(<LoadingRing size="sm" />)
    const span = screen.getByRole('status').querySelector('span')
    expect(span!.getAttribute('class')).toContain('h-3')
  })

  it('applies lg size', () => {
    render(<LoadingRing size="lg" />)
    const span = screen.getByRole('status').querySelector('span')
    expect(span!.getAttribute('class')).toContain('h-6')
  })

  it('has animate-spin class', () => {
    render(<LoadingRing />)
    const span = screen.getByRole('status').querySelector('span')
    expect(span!.getAttribute('class')).toContain('animate-spin')
  })

  it('forwards ref', () => {
    let el: HTMLDivElement | null = null
    render(<LoadingRing ref={(node) => { el = node }} />)
    expect(el).toBeTruthy()
  })
})

describe('LoadingWave', () => {
  it('renders without crash', () => {
    render(<LoadingWave />)
    expect(screen.getByRole('status')).toBeTruthy()
  })

  it('has data-component attribute', () => {
    render(<LoadingWave />)
    expect(screen.getByRole('status').getAttribute('data-component')).toBe('loading-wave')
  })

  it('renders 5 dots', () => {
    render(<LoadingWave />)
    const dots = screen.getByRole('status').querySelectorAll('span')
    expect(dots.length).toBe(5)
  })

  it('merges className', () => {
    render(<LoadingWave className="wave-extra" />)
    expect(screen.getByRole('status').getAttribute('class')).toContain('wave-extra')
  })

  it('applies default size', () => {
    render(<LoadingWave />)
    expect(screen.getByRole('status').getAttribute('class')).toContain('gap-1.5')
  })

  it('applies sm size', () => {
    render(<LoadingWave size="sm" />)
    expect(screen.getByRole('status').getAttribute('class')).toContain('gap-1')
  })

  it('applies lg size', () => {
    render(<LoadingWave size="lg" />)
    expect(screen.getByRole('status').getAttribute('class')).toContain('gap-2')
  })

  it('uses items-end alignment', () => {
    render(<LoadingWave />)
    expect(screen.getByRole('status').getAttribute('class')).toContain('items-end')
  })

  it('forwards ref', () => {
    let el: HTMLDivElement | null = null
    render(<LoadingWave ref={(node) => { el = node }} />)
    expect(el).toBeTruthy()
  })
})
