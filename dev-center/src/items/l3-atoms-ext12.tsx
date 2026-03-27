import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import { KeyboardShortcut } from '@gds/l3-atoms'

import type { DevCenterItem } from '../types'

const atomItemsM: DevCenterItem[] = []

const keyboardShortcutItem: DevCenterItem = {
  id: 'keyboard-shortcut',
  label: 'KeyboardShortcut',
  layer: 'l3',
  type: 'interactive',
  tags: ['a11y', 'accessibility', 'keyboard', 'shortcut', 'hotkey', 'atom'],
  defaultConfig: {
    keys: 'ctrl+k',
    showBadge: true,
    disabled: false,
  },

  stage: ({ config }) => {
    const [count, setCount] = useState(0)

    return (
      <div>
        <ImportLine text="import { KeyboardShortcut } from '@golia/gds'" />
        <LivePreview>
          <div className="flex flex-col items-center gap-4 p-8">
            <div className="flex items-center gap-2 text-sm text-fg">
              <span>Press</span>
              <KeyboardShortcut
                disabled={config.disabled}
                keys={config.keys}
                onTrigger={() => setCount((c) => c + 1)}
                showBadge={config.showBadge}
              />
              <span>to trigger</span>
            </div>
            <p className="text-fg-muted gds-text-body">
              Triggered {count} time{count !== 1 ? 's' : ''}
            </p>
          </div>
        </LivePreview>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl
        type="text"
        label="keys"
        value={config.keys}
        onChange={(v) => setConfig('keys', v)}
      />
      <Ctrl
        type="switch"
        label="showBadge"
        value={config.showBadge}
        onChange={(v) => setConfig('showBadge', v)}
      />
      <Ctrl
        type="switch"
        label="disabled"
        value={config.disabled}
        onChange={(v) => setConfig('disabled', v)}
      />
    </>
  ),

  code: ({ config }) =>
    `import { KeyboardShortcut } from '@golia/gds'\n\n<KeyboardShortcut\n  keys="${config.keys}"\n  onTrigger={() => console.log('triggered')}\n  showBadge={${config.showBadge}}\n  disabled={${config.disabled}}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['keys', 'Key combo string (e.g. "ctrl+k", "meta+shift+p")', 'string', '—'],
        ['onTrigger', 'Callback when shortcut is activated', '() => void', '—'],
        ['showBadge', 'Show key combo as Kbd badge elements', 'boolean', 'false'],
        ['disabled', 'Disable shortcut listener', 'boolean', 'false'],
        ['className', 'Additional CSS classes for badge', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsM.push(keyboardShortcutItem)

export { atomItemsM }
