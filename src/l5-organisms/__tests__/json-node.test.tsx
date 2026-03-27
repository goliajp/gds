import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { JsonNode } from '../json-node'

describe('JsonNode', () => {
  it('renders string value with quotes', () => {
    const { container } = render(<JsonNode value="hello" depth={0} defaultExpanded={false} />)
    expect(container.textContent).toContain('"hello"')
  })

  it('renders number value', () => {
    const { container } = render(<JsonNode value={42} depth={0} defaultExpanded={false} />)
    expect(container.textContent).toContain('42')
  })

  it('renders boolean value', () => {
    const { container } = render(<JsonNode value={true} depth={0} defaultExpanded={false} />)
    expect(container.textContent).toContain('true')
  })

  it('renders null value', () => {
    const { container } = render(<JsonNode value={null} depth={0} defaultExpanded={false} />)
    expect(container.textContent).toContain('null')
  })

  it('renders undefined as null', () => {
    const { container } = render(<JsonNode value={undefined} depth={0} defaultExpanded={false} />)
    expect(container.textContent).toContain('null')
  })

  it('renders key prefix when keyName is provided', () => {
    const { container } = render(
      <JsonNode value="world" keyName="greeting" depth={0} defaultExpanded={false} />,
    )
    expect(container.textContent).toContain('greeting')
    expect(container.textContent).toContain('"world"')
  })

  it('renders empty array as []', () => {
    const { container } = render(<JsonNode value={[]} depth={0} defaultExpanded={false} />)
    expect(container.textContent).toContain('[]')
  })

  it('renders empty object as {}', () => {
    const { container } = render(<JsonNode value={{}} depth={0} defaultExpanded={false} />)
    expect(container.textContent).toContain('{}')
  })

  it('renders collapsed array with item count', () => {
    const { container } = render(
      <JsonNode value={[1, 2, 3]} depth={0} defaultExpanded={false} />,
    )
    expect(container.textContent).toContain('3 items')
  })

  it('renders collapsed object with key count', () => {
    const { container } = render(
      <JsonNode value={{ a: 1, b: 2 }} depth={0} defaultExpanded={false} />,
    )
    expect(container.textContent).toContain('2 keys')
  })

  it('renders expanded object with keys and values', () => {
    const { container } = render(
      <JsonNode value={{ name: 'test', count: 5 }} depth={0} defaultExpanded={true} />,
    )
    expect(container.textContent).toContain('name')
    expect(container.textContent).toContain('"test"')
    expect(container.textContent).toContain('count')
    expect(container.textContent).toContain('5')
  })

  it('renders expanded array with items', () => {
    const { container } = render(
      <JsonNode value={[10, 20]} depth={0} defaultExpanded={true} />,
    )
    expect(container.textContent).toContain('10')
    expect(container.textContent).toContain('20')
  })

  it('toggles object from expanded to collapsed on click', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <JsonNode value={{ a: 1 }} depth={0} defaultExpanded={true} />,
    )
    expect(container.textContent).toContain('a')

    const toggle = screen.getAllByTestId('toggle')[0]
    await user.click(toggle)

    expect(container.textContent).toContain('1 keys')
  })

  it('toggles array from collapsed to expanded on click', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <JsonNode value={['x', 'y']} depth={0} defaultExpanded={false} />,
    )
    expect(container.textContent).toContain('2 items')

    const toggle = screen.getByTestId('toggle')
    await user.click(toggle)

    expect(container.textContent).toContain('"x"')
    expect(container.textContent).toContain('"y"')
  })

  it('expands based on numeric defaultExpanded depth', () => {
    const { container } = render(
      <JsonNode
        value={{ outer: { inner: 'deep' } }}
        depth={0}
        defaultExpanded={1}
      />,
    )
    // depth 0 < 1, so outer is expanded
    expect(container.textContent).toContain('outer')
    // depth 1 is not < 1, so inner is collapsed
    expect(container.textContent).toContain('1 keys')
    expect(container.textContent).not.toContain('"deep"')
  })

  it('applies indentation based on depth', () => {
    const { container } = render(
      <JsonNode value="test" depth={3} defaultExpanded={false} />,
    )
    const div = container.firstElementChild as HTMLElement
    expect(div.style.paddingLeft).toBe('48px')
  })
})
