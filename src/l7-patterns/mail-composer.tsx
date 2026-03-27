// mail-composer — email compose form with to, subject, body, and send
import { forwardRef, useCallback, useRef } from 'react'

import { cx } from '../utils/cx'

export type MailComposerData = {
  to: string
  subject: string
  body: string
}

export type MailComposerProps = {
  onSend: (data: MailComposerData) => void
  defaultTo?: string
  className?: string
}

export const MailComposer = forwardRef<HTMLFormElement, MailComposerProps>(
  function MailComposer({ onSend, defaultTo, className }, ref) {
    const toRef = useRef<HTMLInputElement>(null)
    const subjectRef = useRef<HTMLInputElement>(null)
    const bodyRef = useRef<HTMLTextAreaElement>(null)

    const handleSubmit = useCallback((e: React.FormEvent) => {
      e.preventDefault()
      onSend({
        to: toRef.current?.value ?? '',
        subject: subjectRef.current?.value ?? '',
        body: bodyRef.current?.value ?? '',
      })
    }, [onSend])

    const inputCls = 'w-full rounded-md border border-border bg-transparent px-3 py-2 gds-text-body text-fg placeholder:text-fg-muted/40 focus:border-accent focus:outline-none'

    return (
      <form
        ref={ref}
        className={cx('flex flex-col gap-3', className)}
        data-component="mail-composer"
        onSubmit={handleSubmit}
      >
        <input ref={toRef} type="email" placeholder="To" defaultValue={defaultTo ?? ''} className={inputCls} />
        <input ref={subjectRef} type="text" placeholder="Subject" className={inputCls} />
        <textarea ref={bodyRef} placeholder="Body" rows={6} className={cx(inputCls, 'resize-none')} />
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-accent px-4 py-2 gds-text-body font-medium text-accent-fg hover:bg-accent/90 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    )
  },
)
