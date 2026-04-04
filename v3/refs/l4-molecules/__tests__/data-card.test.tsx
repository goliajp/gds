import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DataCard } from '../data-card'

describe('DataCard', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<DataCard title="Revenue" value="$1,000" />)
    expect(
      container.querySelector('[data-component="data-card"]')
    ).not.toBeNull()
  })

  it('renders title and value', () => {
    render(<DataCard title="Users" value={42} />)
    expect(screen.getByText('Users')).toBeDefined()
    expect(screen.getByText('42')).toBeDefined()
  })

  it('renders string value', () => {
    render(<DataCard title="Revenue" value="$1,000" />)
    expect(screen.getByText('$1,000')).toBeDefined()
  })

  it('does not render change section when change is undefined', () => {
    const { container } = render(<DataCard title="T" value="V" />)
    // no change text rendered
    expect(container.querySelector('.text-danger')).toBeNull()
    expect(container.querySelector('.text-success')).toBeNull()
  })

  it('renders change text with neutral type by default', () => {
    render(<DataCard title="T" value="V" change="+5%" />)
    expect(screen.getByText('+5%')).toBeDefined()
    const changeEl = screen.getByText('+5%').parentElement
    expect(changeEl?.className).toContain('text-fg-muted')
  })

  it('renders up change with success color and arrow icon', () => {
    render(<DataCard title="T" value="V" change="+10%" changeType="up" />)
    expect(screen.getByText('+10%')).toBeDefined()
    const changeEl = screen.getByText('+10%').parentElement
    expect(changeEl?.className).toContain('text-success')
    // up icon svg should be present
    expect(changeEl?.querySelector('svg')).not.toBeNull()
  })

  it('renders down change with danger color and arrow icon', () => {
    render(<DataCard title="T" value="V" change="-3%" changeType="down" />)
    expect(screen.getByText('-3%')).toBeDefined()
    const changeEl = screen.getByText('-3%').parentElement
    expect(changeEl?.className).toContain('text-danger')
    expect(changeEl?.querySelector('svg')).not.toBeNull()
  })

  it('does not render icon when icon is undefined', () => {
    const { container } = render(<DataCard title="T" value="V" />)
    const header = container.querySelector(
      '[data-component="data-card"] > div:first-child'
    )
    // only title span, no icon span
    expect(header?.children.length).toBe(1)
  })

  it('renders icon when provided', () => {
    render(
      <DataCard title="T" value="V" icon={<span data-testid="icon">I</span>} />
    )
    expect(screen.getByTestId('icon')).toBeDefined()
  })

  it('does not render footer when footer is undefined', () => {
    const { container } = render(<DataCard title="T" value="V" />)
    expect(container.querySelector('.border-t')).toBeNull()
  })

  it('renders footer when provided', () => {
    render(<DataCard title="T" value="V" footer={<span>Last updated</span>} />)
    expect(screen.getByText('Last updated')).toBeDefined()
  })

  it('applies glass class when glass is true', () => {
    const { container } = render(<DataCard title="T" value="V" glass />)
    const el = container.querySelector('[data-component="data-card"]')
    expect(el?.className).toContain('gds-glass')
  })

  it('applies custom className', () => {
    const { container } = render(
      <DataCard title="T" value="V" className="my-cls" />
    )
    const el = container.querySelector('[data-component="data-card"]')
    expect(el?.className).toContain('my-cls')
  })
})
