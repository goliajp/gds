// json-viewer — interactive collapsible JSON tree viewer
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { JsonNode } from './json-node'

export type JsonViewerProps = {
  data: unknown
  defaultExpanded?: boolean | number
  glass?: boolean
  className?: string
}

export const JsonViewer = forwardRef<HTMLDivElement, JsonViewerProps>(
  function JsonViewer({ data, defaultExpanded = 2, glass, className }, ref) {
    return (
      <div
        ref={ref}
        className={cx(
          'overflow-auto gds-radius-popover border border-border gds-pad-x gds-pad-y font-mono text-xs leading-5',
          glass === true && 'bg-white/5 backdrop-blur-md',
          glass !== true && 'bg-bg-secondary',
          className,
        )}
        data-component="json-viewer"
      >
        <JsonNode value={data} depth={0} defaultExpanded={defaultExpanded} />
      </div>
    )
  },
)
