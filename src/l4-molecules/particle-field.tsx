// particle-field — canvas-based particle animation with optional connections
import { forwardRef, useEffect, useRef } from 'react'

import { cx } from '../utils/cx'

export type ParticleFieldProps = {
  className?: string
  color?: string
  connected?: boolean
  count?: number
  speed?: number
}

type Particle = { vx: number; vy: number; x: number; y: number }

export const ParticleField = forwardRef<HTMLCanvasElement, ParticleFieldProps>(
  function ParticleField({ className, color = '#888888', connected, count = 60, speed = 0.5 }, ref) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const animRef = useRef<number>(0)

    useEffect(() => {
      const canvas = canvasRef.current
      if (canvas === null) return

      const ctx = canvas.getContext('2d')
      if (ctx === null) return

      const resize = () => {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
      }
      resize()
      window.addEventListener('resize', resize)

      const particles: Particle[] = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
      }))

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        for (const p of particles) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1

          ctx.beginPath()
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
          ctx.fillStyle = color
          ctx.fill()
        }

        if (connected === true) {
          const maxDist = 120
          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const dx = particles[i].x - particles[j].x
              const dy = particles[i].y - particles[j].y
              const dist = Math.sqrt(dx * dx + dy * dy)
              if (dist < maxDist) {
                ctx.beginPath()
                ctx.moveTo(particles[i].x, particles[i].y)
                ctx.lineTo(particles[j].x, particles[j].y)
                ctx.strokeStyle = color
                ctx.globalAlpha = 1 - dist / maxDist
                ctx.stroke()
                ctx.globalAlpha = 1
              }
            }
          }
        }

        animRef.current = requestAnimationFrame(draw)
      }

      animRef.current = requestAnimationFrame(draw)

      return () => {
        cancelAnimationFrame(animRef.current)
        window.removeEventListener('resize', resize)
      }
    }, [color, connected, count, speed])

    return (
      <canvas
        ref={(node) => {
          canvasRef.current = node
          if (typeof ref === 'function') ref(node)
          else if (ref !== null && ref !== undefined) {
            (ref as React.MutableRefObject<HTMLCanvasElement | null>).current = node
          }
        }}
        className={cx('block h-full w-full', className)}
        data-component="particle-field"
      />
    )
  },
)
