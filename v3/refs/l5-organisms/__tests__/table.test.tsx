import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Table } from '../table'

describe('Table', () => {
  it('renders table with children', () => {
    const { container } = render(
      <Table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Alice</td>
          </tr>
        </tbody>
      </Table>
    )
    expect(container.querySelector('table')).not.toBeNull()
    expect(container.querySelector('th')?.textContent).toBe('Name')
    expect(container.querySelector('td')?.textContent).toBe('Alice')
  })

  it('applies striped data attribute and class', () => {
    const { container } = render(
      <Table striped>
        <tbody>
          <tr>
            <td>A</td>
          </tr>
          <tr>
            <td>B</td>
          </tr>
        </tbody>
      </Table>
    )
    const wrapper = container.querySelector('[data-component="table"]')
    expect(wrapper?.getAttribute('data-striped')).toBe('true')
    expect(wrapper?.className).toContain('nth-child')
  })

  it('applies compact data attribute and class', () => {
    const { container } = render(
      <Table compact>
        <tbody>
          <tr>
            <td>A</td>
          </tr>
        </tbody>
      </Table>
    )
    const wrapper = container.querySelector('[data-component="table"]')
    expect(wrapper?.getAttribute('data-compact')).toBe('true')
    expect(wrapper?.className).toContain('[&_th]:px-2')
  })

  it('applies hoverable class by default', () => {
    const { container } = render(
      <Table>
        <tbody>
          <tr>
            <td>A</td>
          </tr>
        </tbody>
      </Table>
    )
    const wrapper = container.querySelector('[data-component="table"]')
    expect(wrapper?.className).toContain('hover')
  })

  it('has data-component attribute', () => {
    const { container } = render(
      <Table>
        <tbody>
          <tr>
            <td>A</td>
          </tr>
        </tbody>
      </Table>
    )
    expect(container.querySelector('[data-component="table"]')).not.toBeNull()
  })
})
