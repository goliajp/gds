import { describe, expect, it } from 'vitest'

import {
  CompositionPattern,
  CTABanner,
  EmptyState,
  FAQ,
  Footer,
  FormLayout,
  FormPattern,
  GlassPanel,
  Hero,
  LoadingStates,
  MetricCard,
  MiniDashboard,
  NavBar,
  StatGrid,
  Testimonial,
} from '../index'

describe('l7-patterns barrel exports', () => {
  it('exports MetricCard', () => {
    expect(MetricCard).toBeDefined()
  })

  it('exports StatGrid', () => {
    expect(StatGrid).toBeDefined()
  })

  it('exports MiniDashboard', () => {
    expect(MiniDashboard).toBeDefined()
  })

  it('exports GlassPanel', () => {
    expect(GlassPanel).toBeDefined()
  })

  it('exports FormLayout', () => {
    expect(FormLayout).toBeDefined()
  })

  it('exports EmptyState', () => {
    expect(EmptyState).toBeDefined()
  })

  it('exports LoadingStates', () => {
    expect(LoadingStates).toBeDefined()
  })

  it('exports CompositionPattern', () => {
    expect(CompositionPattern).toBeDefined()
  })

  it('exports FormPattern', () => {
    expect(FormPattern).toBeDefined()
  })

  it('exports Hero', () => {
    expect(Hero).toBeDefined()
  })

  it('exports Footer', () => {
    expect(Footer).toBeDefined()
  })

  it('exports NavBar', () => {
    expect(NavBar).toBeDefined()
  })

  it('exports Testimonial', () => {
    expect(Testimonial).toBeDefined()
  })

  it('exports FAQ', () => {
    expect(FAQ).toBeDefined()
  })

  it('exports CTABanner', () => {
    expect(CTABanner).toBeDefined()
  })
})
