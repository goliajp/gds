// embed — responsive embed container for iframes (videos, maps, etc)
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type EmbedProps = {
  src: string
  title?: string
  ratio?: number
  allowFullscreen?: boolean
  sandbox?: string
  loading?: 'eager' | 'lazy'
  glass?: boolean
  className?: string
}

export const Embed = forwardRef<HTMLDivElement, EmbedProps>(
  function Embed(
    {
      src,
      title,
      ratio = 16 / 9,
      allowFullscreen = true,
      sandbox,
      loading = 'lazy',
      glass = false,
      className,
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cx(
          'relative w-full overflow-hidden border border-white/[0.06] gds-radius-card',
          glass && 'gds-glass',
          className,
        )}
        data-component="embed"
        style={{ aspectRatio: ratio }}
      >
        <iframe
          src={src}
          title={title}
          className="absolute inset-0 h-full w-full border-none"
          allowFullScreen={allowFullscreen}
          sandbox={sandbox}
          loading={loading}
          data-testid="embed-iframe"
        />
      </div>
    )
  },
)
