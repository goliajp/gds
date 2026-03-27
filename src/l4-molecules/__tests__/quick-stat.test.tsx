import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { QuickStat } from '../quick-stat'

describe('QuickStat', () => {
  it('renders value and label', () => {
    render(<QuickStat value={42} label="Users" />)
    expect(screen.getByText('42')).toBeDefined()
    expect(screen.getByText('Users')).toBeDefined()
  })

  it('shows positive trend with + prefix', () => {
    render(<QuickStat value="1.2k" label="Revenue" trend={12} />)
    expect(screen.getByText('+12%')).toBeDefined()
  })

  it('shows negative trend without + prefix', () => {
    render(<QuickStat value="800" label="Orders" trend={-5} />)
    expect(screen.getByText('-5%')).toBeDefined()
  })
})
