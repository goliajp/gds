// media-container — renders image, video, or audio based on type
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type MediaType = 'audio' | 'image' | 'video'

export type MediaContainerProps = {
  alt?: string
  aspectRatio?: number
  className?: string
  rounded?: boolean
  src: string
  type: MediaType
}

export const MediaContainer = forwardRef<HTMLDivElement, MediaContainerProps>(
  function MediaContainer({ alt, aspectRatio, className, rounded, src, type }, ref) {
    const roundedCls = rounded === true ? 'rounded-lg overflow-hidden' : ''

    return (
      <div
        ref={ref}
        className={cx('relative w-full', roundedCls, className)}
        style={aspectRatio !== undefined ? { aspectRatio: String(aspectRatio) } : undefined}
        data-component="media-container"
        data-variant={type}
      >
        {type === 'image' && (
          <img
            src={src}
            alt={alt ?? ''}
            className="h-full w-full object-cover"
          />
        )}
        {type === 'video' && (
          <video
            src={src}
            controls
            className="h-full w-full object-cover"
            aria-label={alt}
          />
        )}
        {type === 'audio' && (
          <audio src={src} controls className="w-full" aria-label={alt} />
        )}
      </div>
    )
  },
)
