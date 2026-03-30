import { describe, expect, it } from 'vitest'

import {
  GDS_DEPS,
  GDS_INFRA,
  GDS_INTERNAL_UTILS,
  LAYER_DEP_CONSTRAINTS,
} from '../deps'

describe('GDS_DEPS', () => {
  it('every dep has complete fields', () => {
    for (const dep of GDS_DEPS) {
      expect(dep.name).toBeTruthy()
      expect(dep.version).toBeTruthy()
      expect(dep.role).toBeTruthy()
      expect(dep.layer).toBe('L-dep')
      expect(['peer', 'runtime', 'dev']).toContain(dep.type)
      expect(dep.usedBy.length).toBeGreaterThan(0)
    }
  })
})

describe('GDS_INTERNAL_UTILS', () => {
  it('every util has name, module, role', () => {
    for (const util of GDS_INTERNAL_UTILS) {
      expect(util.name).toBeTruthy()
      expect(util.module).toBeTruthy()
      expect(util.role).toBeTruthy()
    }
  })
})

describe('LAYER_DEP_CONSTRAINTS', () => {
  it('covers all layers L0 through L7', () => {
    const layers = Object.keys(LAYER_DEP_CONSTRAINTS)
    expect(layers).toContain('L0-tokens')
    expect(layers).toContain('L1-systems')
    expect(layers).toContain('L2-primitives')
    expect(layers).toContain('L6-charts')
    expect(layers).toContain('L7-patterns')
  })

  it('L0 cannot use react', () => {
    expect(LAYER_DEP_CONSTRAINTS['L0-tokens']).not.toContain('react')
  })

  it('L6 can use recharts', () => {
    expect(LAYER_DEP_CONSTRAINTS['L6-charts']).toContain('recharts')
  })
})

describe('GDS_INFRA', () => {
  it('has all 4 infrastructure tools', () => {
    expect(GDS_INFRA.typecheck).toBeDefined()
    expect(GDS_INFRA.lint).toBeDefined()
    expect(GDS_INFRA.test).toBeDefined()
    expect(GDS_INFRA.format).toBeDefined()
  })
})
