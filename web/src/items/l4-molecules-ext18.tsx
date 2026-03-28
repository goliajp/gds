import { useState } from 'react'

import { Button } from '@gds/l2-primitives'
import { BulkActionBar, ConfirmDialog } from '@gds/l4-molecules'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const moleculeItemsS: DevCenterItem[] = []

const confirmDialogItem: DevCenterItem = {
  id: 'confirm-dialog',
  label: 'ConfirmDialog',
  layer: 'l4',
  type: 'interactive',
  tags: ['dialog', 'confirm', 'modal', 'danger', 'molecule'],
  defaultConfig: { variant: 'default' },

  stage: ({ config }) => {
    const [open, setOpen] = useState(false)

    return (
      <div>
        <ImportLine text="import { ConfirmDialog } from '@goliapkg/gds'" />
        <LivePreview>
          <Button onClick={() => setOpen(true)} variant="secondary" size="sm">Open dialog</Button>
          <ConfirmDialog
            message="Are you sure you want to proceed?"
            onClose={() => setOpen(false)}
            onConfirm={() => setOpen(false)}
            open={open}
            title="Confirm action"
            variant={config.variant as 'default' | 'danger'}
          />
        </LivePreview>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <Ctrl type="pills" label="variant" value={config.variant} options={['default', 'danger']} onChange={(v) => setConfig('variant', v)} />
  ),

  code: ({ config }) =>
    `import { ConfirmDialog } from '@goliapkg/gds'\n\n<ConfirmDialog\n  open={open}\n  onClose={() => setOpen(false)}\n  onConfirm={handleConfirm}\n  title="Confirm action"\n  message="Are you sure?"\n  variant="${config.variant}"\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['open', 'Whether dialog is visible', 'boolean', 'false'],
        ['onClose', 'Called when dialog should close', '() => void', '—'],
        ['onConfirm', 'Called when confirm clicked', '() => void', '—'],
        ['title', 'Dialog title', 'string', '"Confirm"'],
        ['message', 'Dialog message text', 'string', '—'],
        ['variant', 'Visual variant', '"default" | "danger"', '"default"'],
        ['confirmLabel', 'Confirm button text', 'string', '"Confirm"'],
        ['cancelLabel', 'Cancel button text', 'string', '"Cancel"'],
        ['loading', 'Show loading state', 'boolean', 'false'],
      ]} />
    </div>
  ),
}
moleculeItemsS.push(confirmDialogItem)

const bulkActionBarItem: DevCenterItem = {
  id: 'bulk-action-bar',
  label: 'BulkActionBar',
  layer: 'l4',
  type: 'interactive',
  tags: ['bulk', 'action', 'bar', 'selection', 'molecule'],
  defaultConfig: { count: '3' },

  stage: ({ config }) => {
    const [count, setCount] = useState(Number(config.count ?? 0))

    return (
      <div>
        <ImportLine text="import { BulkActionBar } from '@goliapkg/gds'" />
        <LivePreview>
          <div className="flex items-center gds-gap-sm">
            <Button onClick={() => setCount(count + 1)} variant="secondary" size="sm">+1</Button>
            <span className="gds-text-body text-fg-muted">{count} items selected</span>
          </div>
          <BulkActionBar
            actions={<><Button size="sm" variant="secondary">Export</Button><Button size="sm" variant="danger">Delete</Button></>}
            count={count}
            onClear={() => setCount(0)}
          />
        </LivePreview>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <Ctrl type="pills" label="count" value={config.count} options={['0', '1', '3', '10']} onChange={(v) => setConfig('count', v)} />
  ),

  code: () =>
    `import { BulkActionBar } from '@goliapkg/gds'\n\n<BulkActionBar\n  count={selectedCount}\n  actions={<><Button>Export</Button><Button variant="danger">Delete</Button></>}\n  onClear={() => clearSelection()}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['count', 'Number of selected items', 'number', '—'],
        ['actions', 'Action buttons to display', 'ReactNode', '—'],
        ['onClear', 'Called when clear button clicked', '() => void', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsS.push(bulkActionBarItem)

export { moleculeItemsS }
