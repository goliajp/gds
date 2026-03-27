import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type CommentData = {
  author: string
  avatar?: string
  content: string
  id: string
  replies?: CommentData[]
  timestamp: string
}

type CommentThreadProps = React.HTMLAttributes<HTMLDivElement> & {
  comments: CommentData[]
}

function CommentNode({ comment, depth = 0 }: { comment: CommentData; depth?: number }) {
  return (
    <div className={cx(depth > 0 && 'ml-8 border-l border-border pl-4')}>
      <div className="flex items-start gds-gap">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-medium text-accent">
          {comment.avatar ?? comment.author.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gds-gap-sm">
            <span className="text-sm font-medium text-fg">{comment.author}</span>
            <span className="gds-text-label text-fg-muted">{comment.timestamp}</span>
          </div>
          <p className="mt-1 text-sm text-fg-muted">{comment.content}</p>
        </div>
      </div>
      {comment.replies !== undefined && comment.replies.length > 0 && (
        <div className="mt-3 flex flex-col gds-gap">
          {comment.replies.map((reply) => (
            <CommentNode comment={reply} depth={depth + 1} key={reply.id} />
          ))}
        </div>
      )}
    </div>
  )
}

export const CommentThread = forwardRef<HTMLDivElement, CommentThreadProps>(
  function CommentThread({ className, comments, ...props }, ref) {
    return (
      <div
        className={cx('flex flex-col gds-gap', className)}
        data-component="comment-thread"
        ref={ref}
        role="list"
        {...props}
      >
        {comments.map((comment) => (
          <div key={comment.id} role="listitem">
            <CommentNode comment={comment} />
          </div>
        ))}
      </div>
    )
  },
)

export type { CommentData, CommentThreadProps }
