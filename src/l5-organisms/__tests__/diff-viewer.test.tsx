import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DiffViewer } from '../diff-viewer'

describe('DiffViewer', () => {
  it('renders unchanged text without diff markers', () => {
    const text = 'line one\nline two\nline three'
    const { container } = render(<DiffViewer oldText={text} newText={text} />)
    const cells = container.querySelectorAll('td')
    // all prefix cells should be space (unchanged)
    const prefixCells = Array.from(cells).filter((td) => td.textContent?.trim() === '')
    expect(prefixCells.length).toBeGreaterThan(0)
    // no bg-success or bg-danger classes
    const rows = container.querySelectorAll('tr')
    rows.forEach((row) => {
      expect(row.className).not.toContain('bg-success')
      expect(row.className).not.toContain('bg-danger')
    })
  })

  it('shows added lines with + prefix', () => {
    const { container } = render(<DiffViewer oldText="hello" newText="hello\nworld" />)
    const cells = Array.from(container.querySelectorAll('td'))
    const plusCell = cells.find((td) => td.textContent === '+')
    expect(plusCell).toBeDefined()
  })

  it('shows removed lines with - prefix', () => {
    const { container } = render(<DiffViewer oldText="hello\nworld" newText="hello" />)
    const cells = Array.from(container.querySelectorAll('td'))
    const minusCell = cells.find((td) => td.textContent === '-')
    expect(minusCell).toBeDefined()
  })

  it('renders split mode with two columns', () => {
    const { container } = render(
      <DiffViewer oldText="old" newText="new" mode="split" oldTitle="Before" newTitle="After" />,
    )
    expect(container.querySelector('[data-variant="split"]')).not.toBeNull()
    // should show titles
    expect(container.textContent).toContain('Before')
    expect(container.textContent).toContain('After')
  })

  it('has data-component attribute', () => {
    const { container } = render(<DiffViewer oldText="" newText="" />)
    expect(container.querySelector('[data-component="diff-viewer"]')).not.toBeNull()
  })
})
