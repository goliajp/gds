import { describe, expect, it } from 'vitest'

import {
  Alert,
  alertVariants,
  ContextMenu,
  Dialog,
  HoverCard,
  Pagination,
  Sheet,
  Stepper,
  Toast,
} from '../index'

describe('l4-molecules barrel exports', () => {
  it('exports Alert', () => {
    expect(Alert).toBeDefined()
  })

  it('exports alertVariants', () => {
    expect(alertVariants).toBeDefined()
  })

  it('exports ContextMenu', () => {
    expect(ContextMenu).toBeDefined()
  })

  it('exports Dialog', () => {
    expect(Dialog).toBeDefined()
  })

  it('exports HoverCard', () => {
    expect(HoverCard).toBeDefined()
  })

  it('exports Pagination', () => {
    expect(Pagination).toBeDefined()
  })

  it('exports Sheet', () => {
    expect(Sheet).toBeDefined()
  })

  it('exports Stepper', () => {
    expect(Stepper).toBeDefined()
  })

  it('exports Toast', () => {
    expect(Toast).toBeDefined()
  })
})
