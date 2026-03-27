import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { StatusPage } from '../status-page'

describe('StatusPage', () => {
  it('renders code when provided', () => {
    render(<StatusPage code={404} title="Not Found" />)
    expect(screen.getByText('404')).toBeDefined()
  })

  it('renders title', () => {
    render(<StatusPage title="Page Not Found" />)
    expect(screen.getByText('Page Not Found')).toBeDefined()
  })

  it('renders description when provided', () => {
    render(<StatusPage title="Error" description="Something went wrong" />)
    expect(screen.getByText('Something went wrong')).toBeDefined()
  })

  it('renders action buttons', () => {
    render(
      <StatusPage
        title="Not Found"
        action={<button>Go Home</button>}
        secondaryAction={<button>Go Back</button>}
      />,
    )
    expect(screen.getByText('Go Home')).toBeDefined()
    expect(screen.getByText('Go Back')).toBeDefined()
  })
})
