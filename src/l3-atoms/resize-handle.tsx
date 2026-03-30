import { forwardRef, useCallback, useRef } from 'react'

import { cx } from '../utils/cx'

type ResizeHandleProps = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: 'horizontal' | 'vertical'
  onResize: (delta: number) => void
  onResizeEnd?: () => void
  disabled?: boolean
}

export const ResizeHandle = forwardRef<HTMLDivElement, ResizeHandleProps>(
  function ResizeHandle(
    {
      className,
      disabled,
      onResize,
      onResizeEnd,
      orientation = 'vertical',
      ...props
    },
    ref
  ) {
    const startPos = useRef(0)

    const handleMouseDown = useCallback(
      (e: React.MouseEvent) => {
        if (disabled) return
        e.preventDefault()

        const isVertical = orientation === 'vertical'
        startPos.current = isVertical ? e.clientX : e.clientY

        const handleMouseMove = (moveEvent: MouseEvent) => {
          const current = isVertical ? moveEvent.clientX : moveEvent.clientY
          const delta = current - startPos.current
          startPos.current = current
          onResize(delta)
        }

        const handleMouseUp = () => {
          document.removeEventListener('mousemove', handleMouseMove)
          document.removeEventListener('mouseup', handleMouseUp)
          onResizeEnd?.()
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
      },
      [disabled, onResize, onResizeEnd, orientation]
    )

    return (
      <div
        className={cx(
          'group relative flex items-center justify-center select-none',
          orientation === 'vertical'
            ? 'w-2 cursor-col-resize flex-col self-stretch'
            : 'h-2 cursor-row-resize self-stretch',
          disabled && 'pointer-events-none opacity-40',
          className
        )}
        data-component="resize-handle"
        data-orientation={orientation}
        onMouseDown={handleMouseDown}
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        {...props}
      >
        <div
          className={cx(
            'transition-colors',
            orientation === 'vertical'
              ? 'bg-border group-hover:bg-accent/50 group-active:bg-accent h-full w-0.5'
              : 'bg-border group-hover:bg-accent/50 group-active:bg-accent h-0.5 w-full'
          )}
        />
      </div>
    )
  }
)

export type { ResizeHandleProps }
