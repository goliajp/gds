import { describe, expect, it } from 'vitest'

import {
  Avatar,
  AvatarGroup,
  Checkbox,
  Chip,
  LoadingDots,
  Meter,
  RadioGroup,
  Rating,
  StatusBadge,
  Switch,
  Tooltip,
} from '../index'

describe('l3-atoms barrel exports', () => {
  it('exports Avatar', () => {
    expect(Avatar).toBeDefined()
  })

  it('exports AvatarGroup', () => {
    expect(AvatarGroup).toBeDefined()
  })

  it('exports Checkbox', () => {
    expect(Checkbox).toBeDefined()
  })

  it('exports Chip', () => {
    expect(Chip).toBeDefined()
  })

  it('exports LoadingDots', () => {
    expect(LoadingDots).toBeDefined()
  })

  it('exports Meter', () => {
    expect(Meter).toBeDefined()
  })

  it('exports RadioGroup', () => {
    expect(RadioGroup).toBeDefined()
  })

  it('exports Rating', () => {
    expect(Rating).toBeDefined()
  })

  it('exports StatusBadge', () => {
    expect(StatusBadge).toBeDefined()
  })

  it('exports Switch', () => {
    expect(Switch).toBeDefined()
  })

  it('exports Tooltip', () => {
    expect(Tooltip).toBeDefined()
  })
})
