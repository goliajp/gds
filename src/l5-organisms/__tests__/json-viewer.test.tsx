import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { JsonViewer } from '../json-viewer'

describe('JsonViewer', () => {
  it('renders primitive values', () => {
    const { container, rerender } = render(<JsonViewer data="hello" />)
    expect(container.textContent).toContain('"hello"')

    rerender(<JsonViewer data={42} />)
    expect(container.textContent).toContain('42')

    rerender(<JsonViewer data={true} />)
    expect(container.textContent).toContain('true')

    rerender(<JsonViewer data={null} />)
    expect(container.textContent).toContain('null')
  })

  it('renders object with keys', () => {
    const { container } = render(<JsonViewer data={{ name: 'test', count: 5 }} defaultExpanded />)
    expect(container.textContent).toContain('name')
    expect(container.textContent).toContain('"test"')
    expect(container.textContent).toContain('count')
    expect(container.textContent).toContain('5')
  })

  it('renders array with items', () => {
    const { container } = render(<JsonViewer data={[1, 2, 3]} defaultExpanded />)
    expect(container.textContent).toContain('1')
    expect(container.textContent).toContain('2')
    expect(container.textContent).toContain('3')
  })

  it('collapses on click', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <JsonViewer data={{ a: 1, b: 2 }} defaultExpanded />,
    )
    // initially expanded — keys visible
    expect(container.textContent).toContain('a')
    expect(container.textContent).toContain('b')

    // click toggle to collapse
    const toggle = screen.getAllByTestId('toggle')[0]
    await user.click(toggle)

    // collapsed — shows summary
    expect(container.textContent).toContain('2 keys')
  })

  it('respects nested depth default', () => {
    const data = { outer: { inner: { deep: 'value' } } }
    // defaultExpanded=1 — only first level expanded
    const { container } = render(<JsonViewer data={data} defaultExpanded={1} />)
    // outer should be expanded but inner should be collapsed
    expect(container.textContent).toContain('outer')
    expect(container.textContent).toContain('1 keys')
    expect(container.textContent).not.toContain('"value"')
  })
})
