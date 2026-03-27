// testimonial — customer review/endorsement quote card
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

export type TestimonialProps = {
  quote: string
  author: string
  role?: string
  avatar?: string
  rating?: number
  glass?: boolean
  className?: string
}

export const Testimonial = forwardRef<HTMLDivElement, TestimonialProps>(
  function Testimonial({ quote, author, role, avatar, rating, glass, className }, ref) {
    return (
      <div
        ref={ref}
        className={cx(
          'gds-ctx gds-radius-card border gds-pad-x-lg gds-pad-y-lg',
          glass === true ? cx(glassClass(glass), 'border-white/10 bg-bg/60') : 'border-border bg-surface',
          className,
        )}
        data-component="testimonial"
      >
        <svg className="mb-3 h-6 w-6 text-fg-muted opacity-30" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378C7.06 7.752 6.14 9.87 5.94 11.501c.26-.058.527-.088.8-.088 1.656 0 2.96 1.283 2.96 2.87 0 1.586-1.304 2.87-2.96 2.87-.83 0-1.572-.358-2.157-.832zM14.583 17.321C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-2.863 1.551-3.783 3.669-3.983 5.3.26-.058.527-.088.8-.088 1.656 0 2.96 1.283 2.96 2.87 0 1.586-1.304 2.87-2.96 2.87-.83 0-1.572-.358-2.157-.832z" />
        </svg>
        <p className="gds-text-body italic text-fg">{quote}</p>
        {rating !== undefined && (
          <div className="mt-3 flex gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <svg key={i} className={cx('h-4 w-4', i < rating ? 'text-warning' : 'text-fg-muted/30')} viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        )}
        <div className="mt-4 flex items-center gap-3">
          {avatar !== undefined && (
            <img src={avatar} alt={author} className="h-10 w-10 rounded-full object-cover" />
          )}
          <div>
            <p className="text-sm font-medium text-fg">{author}</p>
            {role !== undefined && <p className="text-xs text-fg-muted">{role}</p>}
          </div>
        </div>
      </div>
    )
  },
)
