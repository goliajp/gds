// l-dep-ext — hooks reference + keyboard shortcuts
// accessibility and philosophy moved to l-docs

import { DocTable, DemoCard, DocSection } from '../components/demo'

import type { DevCenterItem } from '../types'

function Code({ children }: { children: string }) {
  return (
    <code className="rounded bg-bg-tertiary px-1 py-0.5 font-mono text-[10px] text-accent">
      {children}
    </code>
  )
}

export const depItemsExt: DevCenterItem[] = [
  {
    id: 'hooks',
    label: 'Hooks',
    layer: 'l-dep',
    type: 'reference',
    tags: ['hooks', 'react', 'utility', 'gesture'],
    stage: () => (
      <div className="flex flex-col gap-2">
        <DocSection title="DOM & interaction hooks">
          <DocTable rows={[
            ['useScrollLock', 'Locks body scroll while active', '(active: boolean) => void', '—'],
            ['useEscapeKey', 'Calls handler on Escape keydown', '(handler: () => void) => void', '—'],
            ['useClickOutside', 'Calls handler on click outside ref', '(ref: RefObject, handler: () => void) => void', '—'],
            ['useFocusTrap', 'Traps Tab focus within container', '(ref: RefObject, active: boolean) => void', '—'],
          ]} />
          <DemoCard
            title="Usage examples"
            code={`import { useScrollLock, useEscapeKey, useClickOutside, useFocusTrap } from '@gds/utils/hooks'

// lock scroll when dialog is open
useScrollLock(isOpen)

// close on escape
useEscapeKey(() => setOpen(false))

// close on click outside
const ref = useRef<HTMLDivElement>(null)
useClickOutside(ref, () => setOpen(false))

// trap focus in modal
const dialogRef = useRef<HTMLDivElement>(null)
useFocusTrap(dialogRef, isOpen)`}
          >
            <div className="space-y-1 text-[10px] text-fg-muted/50" data-selectable>
              <p>• <Code>useScrollLock</Code> — prevents background scroll in modals/sheets</p>
              <p>• <Code>useEscapeKey</Code> — standard dismiss pattern for overlays</p>
              <p>• <Code>useClickOutside</Code> — dismiss dropdowns, popovers, panels</p>
              <p>• <Code>useFocusTrap</Code> — WCAG-compliant focus containment in dialogs</p>
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Responsive hooks">
          <DocTable rows={[
            ['useMediaQuery', 'Tracks a CSS media query match', '(query: string) => boolean', '—'],
            ['useIsMobile', 'True when viewport < 768px', '() => boolean', '—'],
            ['useIsDesktop', 'True when viewport >= 1024px', '() => boolean', '—'],
          ]} />
          <DemoCard
            title="Usage examples"
            code={`import { useMediaQuery, useIsMobile, useIsDesktop } from '@gds/utils/hooks'

// custom breakpoint
const isWide = useMediaQuery('(min-width: 1440px)')

// built-in breakpoints
const isMobile = useIsMobile()
const isDesktop = useIsDesktop()

// conditional rendering
if (isMobile) return <MobileLayout />
return <DesktopLayout />`}
          >
            <div className="space-y-1 text-[10px] text-fg-muted/50" data-selectable>
              <p>• <Code>useMediaQuery</Code> — generic media query listener with SSR safety</p>
              <p>• <Code>useIsMobile</Code> — shorthand for max-width: 767px</p>
              <p>• <Code>useIsDesktop</Code> — shorthand for min-width: 1024px</p>
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Gesture hooks">
          <DocTable rows={[
            ['useDrag', 'Track pointer drag with delta', '(options: DragOptions) => DragHandlers', '—'],
            ['useSwipe', 'Detect swipe direction', '(options: SwipeOptions) => SwipeHandlers', '—'],
            ['useLongPress', 'Detect press-and-hold', '(handler: () => void, ms?: number) => PressHandlers', '500'],
          ]} />
          <DemoCard
            title="Usage examples"
            code={`import { useDrag, useSwipe, useLongPress } from '@gds/utils/hooks'

// draggable element
const { dragHandlers } = useDrag({
  onDrag: ({ dx, dy }) => setPosition({ x: x + dx, y: y + dy }),
  onDragEnd: () => snap(),
})

// swipe to dismiss
const { swipeHandlers } = useSwipe({
  onSwipeLeft: () => dismiss(),
  threshold: 50,
})

// long press for context menu
const { pressHandlers } = useLongPress(() => showMenu(), 600)`}
          >
            <div className="space-y-1 text-[10px] text-fg-muted/50" data-selectable>
              <p>• <Code>useDrag</Code> — pointer-based drag with delta tracking</p>
              <p>• <Code>useSwipe</Code> — directional swipe detection with threshold</p>
              <p>• <Code>useLongPress</Code> — press-and-hold with configurable delay</p>
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),
    docs: () => (
      <div className="space-y-3" data-selectable>
        <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30 mb-1">Hook guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• All hooks are tree-shakeable — import only what you use</p>
          <p>• Hooks handle cleanup automatically via useEffect return</p>
          <p>• SSR-safe — all hooks check for window/document existence</p>
          <p>• Gesture hooks use pointer events for unified mouse/touch</p>
        </div>
      </div>
    ),
  },

  {
    id: 'keyboard-shortcuts',
    label: 'Keyboard Shortcuts',
    layer: 'l-dep',
    type: 'reference',
    tags: ['keyboard', 'shortcuts', 'a11y', 'interaction'],
    stage: () => (
      <div className="flex flex-col gap-2">
        <DocSection title="Button & link">
          <DocTable headers={['Key', 'Action']} rows={[
            ['Enter', 'Activate button or follow link'],
            ['Space', 'Activate button (does not follow links)'],
          ]} />
        </DocSection>

        <DocSection title="Dialog / Sheet">
          <DocTable headers={['Key', 'Action']} rows={[
            ['Escape', 'Close dialog'],
            ['Tab', 'Move focus to next element (trapped)'],
            ['Shift + Tab', 'Move focus to previous element (trapped)'],
            ['Enter', 'Confirm primary action'],
          ]} />
        </DocSection>

        <DocSection title="Dropdown / Select">
          <DocTable headers={['Key', 'Action']} rows={[
            ['ArrowDown', 'Open dropdown / move to next option'],
            ['ArrowUp', 'Move to previous option'],
            ['Enter', 'Select highlighted option'],
            ['Escape', 'Close dropdown without selecting'],
            ['Home', 'Jump to first option'],
            ['End', 'Jump to last option'],
          ]} />
        </DocSection>

        <DocSection title="Tabs">
          <DocTable headers={['Key', 'Action']} rows={[
            ['ArrowRight', 'Activate next tab'],
            ['ArrowLeft', 'Activate previous tab'],
            ['Home', 'Activate first tab'],
            ['End', 'Activate last tab'],
          ]} />
        </DocSection>

        <DocSection title="Input / Textarea">
          <DocTable headers={['Key', 'Action']} rows={[
            ['Ctrl + A', 'Select all text'],
            ['Ctrl + C', 'Copy selection'],
            ['Ctrl + V', 'Paste from clipboard'],
            ['Ctrl + Z', 'Undo'],
            ['Ctrl + Shift + Z', 'Redo'],
          ]} />
        </DocSection>

        <DocSection title="Checkbox / Switch">
          <DocTable headers={['Key', 'Action']} rows={[
            ['Space', 'Toggle checked state'],
          ]} />
        </DocSection>

        <DocSection title="Accordion">
          <DocTable headers={['Key', 'Action']} rows={[
            ['Enter', 'Toggle expand/collapse'],
            ['Space', 'Toggle expand/collapse'],
            ['ArrowDown', 'Move focus to next header'],
            ['ArrowUp', 'Move focus to previous header'],
            ['Home', 'Move focus to first header'],
            ['End', 'Move focus to last header'],
          ]} />
        </DocSection>
      </div>
    ),
    docs: () => (
      <div className="space-y-3" data-selectable>
        <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30 mb-1">Implementation notes</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• All keyboard patterns follow WAI-ARIA Authoring Practices</p>
          <p>• Ctrl shown above maps to Cmd on macOS</p>
          <p>• Arrow key navigation uses roving tabindex pattern</p>
          <p>• Global shortcuts registered via useHotkey hook</p>
        </div>
      </div>
    ),
  },
]
