// link-preview — rich preview card for an external link with image, title, description
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

export type LinkPreviewProps = {
  title: string
  url: string
  description?: string
  domain?: string
  image?: string
  glass?: boolean
  className?: string
}

export const LinkPreview = forwardRef<HTMLAnchorElement, LinkPreviewProps>(
  function LinkPreview({ title, url, description, domain, image, glass, className }, ref) {
    return (
      <a
        ref={ref}
        className={cx(
          'flex gds-gap gds-radius border-l-4 border-accent bg-bg-secondary gds-pad transition-colors select-none hover:bg-bg-tertiary',
          glass === true && glassClass(glass),
          className,
        )}
        data-component="link-preview"
        href={url}
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="truncate text-sm font-medium text-accent">{title}</span>
          {description !== undefined && (
            <span className="line-clamp-2 gds-text-body text-fg-muted">
              {description}
            </span>
          )}
          {domain !== undefined && (
            <span className="text-[10px] text-fg-muted/60">{domain}</span>
          )}
        </div>
        {image !== undefined && (
          <img
            alt={title}
            className="h-16 w-16 shrink-0 gds-radius object-cover"
            src={image}
          />
        )}
      </a>
    )
  },
)
