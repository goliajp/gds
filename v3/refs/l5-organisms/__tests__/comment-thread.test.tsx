import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CommentThread } from '../comment-thread'

const comments = [
  { id: '1', author: 'Alice', content: 'Great work!', timestamp: '2 min ago' },
  {
    id: '2',
    author: 'Bob',
    content: 'Thanks!',
    timestamp: '1 min ago',
    replies: [
      { id: '3', author: 'Carol', content: 'Agreed!', timestamp: 'just now' },
    ],
  },
]

describe('CommentThread', () => {
  it('renders with data-component', () => {
    const { container } = render(<CommentThread comments={comments} />)
    expect(
      container.querySelector('[data-component="comment-thread"]')
    ).not.toBeNull()
  })

  it('has role="list"', () => {
    render(<CommentThread comments={comments} />)
    expect(screen.getByRole('list')).toBeDefined()
  })

  it('renders author names', () => {
    render(<CommentThread comments={comments} />)
    expect(screen.getByText('Alice')).toBeDefined()
    expect(screen.getByText('Bob')).toBeDefined()
  })

  it('renders nested replies', () => {
    render(<CommentThread comments={comments} />)
    expect(screen.getByText('Carol')).toBeDefined()
    expect(screen.getByText('Agreed!')).toBeDefined()
  })
})
