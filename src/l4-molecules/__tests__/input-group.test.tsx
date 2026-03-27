import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { InputGroup } from '../input-group'

describe('InputGroup', () => {
  it('renders with prefix', () => {
    const { container } = render(
      <InputGroup prefix="$">
        <input type="text" />
      </InputGroup>,
    )
    const wrapper = container.querySelector('[data-component="input-group"]')
    expect(wrapper).not.toBeNull()
    const spans = wrapper?.querySelectorAll('span')
    expect(spans?.[0]?.textContent).toBe('$')
  })

  it('renders with suffix', () => {
    const { container } = render(
      <InputGroup suffix=".com">
        <input type="text" />
      </InputGroup>,
    )
    const wrapper = container.querySelector('[data-component="input-group"]')
    const spans = wrapper?.querySelectorAll('span')
    expect(spans?.[0]?.textContent).toBe('.com')
  })

  it('renders with both prefix and suffix', () => {
    const { container } = render(
      <InputGroup prefix="https://" suffix=".com">
        <input type="text" />
      </InputGroup>,
    )
    const wrapper = container.querySelector('[data-component="input-group"]')
    const spans = wrapper?.querySelectorAll('span')
    expect(spans?.length).toBe(2)
    expect(spans?.[0]?.textContent).toBe('https://')
    expect(spans?.[1]?.textContent).toBe('.com')
  })

  it('applies error border class', () => {
    const { container } = render(
      <InputGroup error>
        <input type="text" />
      </InputGroup>,
    )
    const wrapper = container.querySelector('[data-component="input-group"]')
    expect(wrapper?.className).toContain('border-danger')
  })

  it('has data-component attribute', () => {
    const { container } = render(
      <InputGroup>
        <input type="text" />
      </InputGroup>,
    )
    expect(container.querySelector('[data-component="input-group"]')).not.toBeNull()
  })
})
