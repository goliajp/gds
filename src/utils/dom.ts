// dom utilities — keyboard, event, and element helpers

// check if keyboard event should trigger click (Enter or Space)
export function isActivationKey(e: React.KeyboardEvent): boolean {
  return e.key === 'Enter' || e.key === ' '
}

// merge multiple refs into one callback ref
export function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (value) => {
    for (const ref of refs) {
      if (ref === undefined || ref === null) continue
      if (typeof ref === 'function') {
        ref(value)
      } else {
        ;(ref as React.MutableRefObject<T | null>).current = value
      }
    }
  }
}

// clamp a number between min and max (immutable)
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

// generate a unique id with optional prefix
let counter = 0
export function uid(prefix = 'gds'): string {
  counter += 1
  return `${prefix}-${counter}`
}
