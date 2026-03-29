import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { BottomBar } from '../bottom-bar'

describe('BottomBar', () => {
  it('renders without crash', () => {
    const { container } = render(<BottomBar><button>Home</button></BottomBar>)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<BottomBar><button>Home</button></BottomBar>)
    expect(container.querySelector('[data-component="bottom-bar"]')).not.toBeNull()
  })

  it('renders children', () => {
    render(<BottomBar><button>Home</button><button>Settings</button></BottomBar>)
    expect(screen.getByText('Home')).toBeDefined()
    expect(screen.getByText('Settings')).toBeDefined()
  })

  it('applies custom className', () => {
    const { container } = render(<BottomBar className="custom"><button>X</button></BottomBar>)
    expect(container.querySelector('[data-component="bottom-bar"]')?.className).toContain('custom')
  })
})
