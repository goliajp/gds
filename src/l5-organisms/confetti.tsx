// confetti — canvas-based celebration particle animation
import { useEffect, useRef } from 'react'

import { cx } from '../utils/cx'
import { renderPortal } from '../utils/portal'
import type { Particle } from './confetti-physics'
import {
  createParticle,
  drawParticle,
  updateParticle,
} from './confetti-physics'

type ConfettiProps = {
  active: boolean
  className?: string
  colors?: string[]
  duration?: number
  particleCount?: number
}

const DEFAULT_COLORS = [
  '#6366f1',
  '#ec4899',
  '#14b8a6',
  '#f59e0b',
  '#8b5cf6',
  '#ef4444',
  '#22c55e',
  '#3b82f6',
]

export function Confetti({
  active,
  className,
  colors = DEFAULT_COLORS,
  duration = 3000,
  particleCount = 100,
}: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    if (!active) {
      particlesRef.current = []
      return
    }

    const canvas = canvasRef.current
    if (canvas === null) return

    const ctx = canvas.getContext('2d')
    if (ctx === null) return

    // size canvas to viewport
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    particlesRef.current = []
    startTimeRef.current = performance.now()
    let spawnedCount = 0

    function animate(now: number) {
      if (canvas === null || ctx === null) return

      const elapsed = now - startTimeRef.current
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // spawn particles over time
      if (elapsed < duration) {
        const targetSpawned = Math.min(
          particleCount,
          Math.floor((elapsed / duration) * particleCount)
        )
        while (spawnedCount < targetSpawned) {
          particlesRef.current = [
            ...particlesRef.current,
            createParticle(canvas.width, colors),
          ]
          spawnedCount += 1
        }
      }

      // update and draw
      particlesRef.current = particlesRef.current
        .map(updateParticle)
        .filter((p) => p.y < canvas.height + 20)

      for (const p of particlesRef.current) {
        drawParticle(ctx, p)
      }

      // keep animating if there are still particles
      if (particlesRef.current.length > 0 || elapsed < duration) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
    }
  }, [active, colors, duration, particleCount])

  if (!active) return null

  return renderPortal(
    <canvas
      ref={canvasRef}
      className={cx('pointer-events-none fixed inset-0 z-[9999]', className)}
      data-component="confetti"
    />
  )
}

export type { ConfettiProps }
