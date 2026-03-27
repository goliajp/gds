type Layer = 'L-dep' | 'L0' | 'L1'

const layerClasses: Record<Layer, string> = {
  'L-dep': 'bg-fg-muted/10 text-fg-muted',
  'L0': 'bg-accent/10 text-accent',
  'L1': 'bg-success/10 text-success',
}

export function LayerBadge({ layer }: { layer: Layer }) {
  return (
    <span className={[
      'inline-flex rounded-md px-2 py-0.5 text-xs font-semibold tracking-wider',
      layerClasses[layer],
    ].join(' ')}>
      {layer}
    </span>
  )
}
