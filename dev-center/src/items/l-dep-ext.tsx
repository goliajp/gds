// l-dep-ext — hooks reference + keyboard shortcuts
// accessibility and philosophy moved to l-docs

import { DocTable, DocSection } from '../components/demo'

import type { DevCenterItem } from '../types'

export const depItemsExt: DevCenterItem[] = [
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
