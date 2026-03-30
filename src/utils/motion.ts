// L-dep — motion helper
// converts a motion prop value to a CSS class name
// this is the bridge between component props and the CSS animation system
// zero friction: <Card motion="scaleIn"> → className="animate-scale-in"

const PRESET_TO_CLASS: Record<string, string> = {
  fadeIn: 'animate-fade-in',
  fadeOut: 'animate-fade-out',
  scaleIn: 'animate-scale-in',
  scaleOut: 'animate-scale-out',
  slideUp: 'animate-slide-up',
  slideDown: 'animate-slide-down',
  slideLeft: 'animate-slide-left',
  slideRight: 'animate-slide-right',
}

// convert motion prop to className — returns empty string if no motion
export function motionClass(motion?: string): string {
  if (motion === undefined) return ''
  return PRESET_TO_CLASS[motion] ?? ''
}

// convert motion prop with speed variant
export function motionClassWithSpeed(
  motion?: string,
  speed?: 'fast' | 'slow'
): string {
  const base = motionClass(motion)
  if (base === '') return ''
  if (speed === 'fast') return `${base} animate-fast`
  if (speed === 'slow') return `${base} animate-slow`
  return base
}
