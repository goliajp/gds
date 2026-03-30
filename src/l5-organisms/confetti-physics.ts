// confetti-physics — particle creation, update, and rendering

export type Particle = {
  color: string
  drag: number
  gravity: number
  rotation: number
  rotationSpeed: number
  size: number
  vx: number
  vy: number
  x: number
  y: number
}

export function createParticle(
  canvasWidth: number,
  colors: string[]
): Particle {
  return {
    x: Math.random() * canvasWidth,
    y: -10,
    vx: (Math.random() - 0.5) * 8,
    vy: Math.random() * -6 - 4,
    size: Math.random() * 6 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 10,
    gravity: 0.15,
    drag: 0.98,
  }
}

export function updateParticle(p: Particle): Particle {
  return {
    ...p,
    x: p.x + p.vx,
    y: p.y + p.vy,
    vx: p.vx * p.drag,
    vy: (p.vy + p.gravity) * p.drag,
    rotation: p.rotation + p.rotationSpeed,
  }
}

export function drawParticle(ctx: CanvasRenderingContext2D, p: Particle): void {
  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.rotate((p.rotation * Math.PI) / 180)
  ctx.fillStyle = p.color
  ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
  ctx.restore()
}
