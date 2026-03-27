import { describe, expect, it } from 'vitest'

import { focusCls, srOnly } from '../a11y'

describe('focusCls', () => {
  it('contains focus-visible ring classes', () => {
    expect(focusCls).toContain('focus-visible:ring-2')
    expect(focusCls).toContain('focus-visible:ring-accent')
  })
})

describe('srOnly', () => {
  it('contains visually-hidden styles', () => {
    expect(srOnly).toContain('absolute')
    expect(srOnly).toContain('overflow-hidden')
  })
})
