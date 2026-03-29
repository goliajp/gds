// matrix-rain — canvas-based falling characters effect
import { forwardRef, useEffect, useRef } from 'react'

import { cx } from '../utils/cx'

export type MatrixRainProps = {
  active?: boolean
  className?: string
  color?: string
  density?: number
  speed?: number
}

export const MatrixRain = forwardRef<HTMLCanvasElement, MatrixRainProps>(
  function MatrixRain({ active = true, className, color = '#00ff41', density = 20, speed = 50 }, ref) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const animRef = useRef<number>(0)

    useEffect(() => {
      const canvas = canvasRef.current
      if (canvas === null || !active) return

      const ctx = canvas.getContext('2d')
      if (ctx === null) return

      const resize = () => {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
      }
      resize()
      window.addEventListener('resize', resize)

      const fontSize = 14
      const columns = Math.floor(canvas.width / density)
      const drops = new Array(columns).fill(1) as number[]
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*'

      let last = 0
      const draw = (time: number) => {
        if (time - last < speed) {
          animRef.current = requestAnimationFrame(draw)
          return
        }
        last = time

        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = color
        ctx.font = `${fontSize}px monospace`

        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)]
          ctx.fillText(text, i * density, drops[i] * fontSize)
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0
          }
          drops[i]++
        }

        animRef.current = requestAnimationFrame(draw)
      }

      animRef.current = requestAnimationFrame(draw)

      return () => {
        cancelAnimationFrame(animRef.current)
        window.removeEventListener('resize', resize)
      }
    }, [active, color, density, speed])

    return (
      <canvas
        ref={(node) => {
          canvasRef.current = node
          if (typeof ref === 'function') ref(node)
          else if (ref !== null && ref !== undefined) {
            (ref as React.MutableRefObject<HTMLCanvasElement | null>).current = node
          }
        }}
        className={cx('block h-full w-full bg-black', className)}
        data-component="matrix-rain"
      />
    )
  },
)
