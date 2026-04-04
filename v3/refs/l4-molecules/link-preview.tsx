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
  function LinkPreview(
    { title, url, description, domain, image, glass, className },
    ref
  ) {
    return (
      <a
        ref={ref}
        className={cx(
          'gds-gap gds-radius border-accent bg-bg-secondary gds-pad hover:bg-bg-tertiary flex border-l-4 transition-colors select-none',
          glass === true && glassClass(glass),
          className
        )}
        data-component="link-preview"
        href={url}
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="text-accent truncate text-sm font-medium">
            {title}
          </span>
          {description !== undefined && (
            <span className="gds-text-body text-fg-muted line-clamp-2">
              {description}
            </span>
          )}
          {domain !== undefined && (
            <span className="text-fg-muted/60 text-[10px]">{domain}</span>
          )}
        </div>
        {image !== undefined && (
          <img
            alt={title}
            className="gds-radius h-16 w-16 shrink-0 object-cover"
            src={image}
          />
        )}
      </a>
    )
  }
)
