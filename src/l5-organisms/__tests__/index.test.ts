import { describe, expect, it } from 'vitest'

import {
  Calendar,
  CommandPalette,
  DataTable,
  DatePicker,
  FileBrowser,
  FormBuilder,
  Kanban,
  Timeline,
  Tree,
  VirtualList,
} from '../index'

describe('l5-organisms barrel exports', () => {
  it('exports Calendar', () => {
    expect(Calendar).toBeDefined()
  })

  it('exports CommandPalette', () => {
    expect(CommandPalette).toBeDefined()
  })

  it('exports DataTable', () => {
    expect(DataTable).toBeDefined()
  })

  it('exports DatePicker', () => {
    expect(DatePicker).toBeDefined()
  })

  it('exports FileBrowser', () => {
    expect(FileBrowser).toBeDefined()
  })

  it('exports FormBuilder', () => {
    expect(FormBuilder).toBeDefined()
  })

  it('exports Kanban', () => {
    expect(Kanban).toBeDefined()
  })

  it('exports Timeline', () => {
    expect(Timeline).toBeDefined()
  })

  it('exports Tree', () => {
    expect(Tree).toBeDefined()
  })

  it('exports VirtualList', () => {
    expect(VirtualList).toBeDefined()
  })
})
