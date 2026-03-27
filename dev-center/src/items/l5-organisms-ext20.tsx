import { CommentThread } from '@gds/l5-organisms'

import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const organismItemsExt20: DevCenterItem[] = []

const commentThreadItem: DevCenterItem = {
  id: 'comment-thread',
  label: 'CommentThread',
  layer: 'l5',
  type: 'interactive',
  tags: ['comment', 'thread', 'nested', 'replies', 'organism'],
  defaultConfig: {},

  stage: () => (
    <div>
      <ImportLine text="import { CommentThread } from '@golia/gds'" />
      <LivePreview>
        <div className="w-full max-w-lg">
          <CommentThread
            comments={[
              { id: '1', author: 'Alice', content: 'This looks great! Ready for review.', timestamp: '2h ago' },
              {
                id: '2', author: 'Bob', content: 'Nice work. One minor suggestion.', timestamp: '1h ago',
                replies: [
                  { id: '3', author: 'Alice', content: 'Good point, fixed!', timestamp: '30m ago' },
                ],
              },
            ]}
          />
        </div>
      </LivePreview>
    </div>
  ),

  code: () =>
    `import { CommentThread } from '@golia/gds'\n\n<CommentThread\n  comments={[\n    { id: '1', author: 'Alice', content: 'Looks great!', timestamp: '2h ago' },\n    { id: '2', author: 'Bob', content: 'One suggestion.', timestamp: '1h ago',\n      replies: [{ id: '3', author: 'Alice', content: 'Fixed!', timestamp: '30m ago' }] },\n  ]}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['comments', 'Array of comment objects', 'CommentData[]', '—'],
        ['comments[].id', 'Unique comment id', 'string', '—'],
        ['comments[].author', 'Author name', 'string', '—'],
        ['comments[].avatar', 'Avatar text (defaults to first letter)', 'string', '—'],
        ['comments[].content', 'Comment body text', 'string', '—'],
        ['comments[].timestamp', 'Timestamp label', 'string', '—'],
        ['comments[].replies', 'Nested replies (recursive)', 'CommentData[]', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
organismItemsExt20.push(commentThreadItem)

export { organismItemsExt20 }
