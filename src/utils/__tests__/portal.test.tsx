import { describe, expect, it } from 'vitest'

import { renderPortal } from '../portal'

describe('renderPortal', () => {
  it('renders children into document.body by default', () => {
    const result = renderPortal(<div>hello</div>)
    expect(result).not.toBeNull()
  })

  it('renders children into a custom container', () => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const result = renderPortal(<span>test</span>, container)
    expect(result).not.toBeNull()

    document.body.removeChild(container)
  })

  it('renders into body when container is null', () => {
    const result = renderPortal(<div>fallback</div>, null)
    expect(result).not.toBeNull()
  })

  it('renders into body when container is undefined', () => {
    const result = renderPortal(<div>fallback</div>, undefined)
    expect(result).not.toBeNull()
  })
})
