import { useState } from 'react'

import { MediaObject, ProgressSteps } from '@gds/l4-molecules'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const moleculeItemsR: DevCenterItem[] = []

const mediaObjectItem: DevCenterItem = {
  id: 'media-object',
  label: 'MediaObject',
  layer: 'l4',
  type: 'interactive',
  tags: ['media', 'layout', 'avatar', 'content', 'molecule'],
  defaultConfig: { align: 'top', reverse: 'false' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { MediaObject } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-80">
          <MediaObject
            media={<div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-accent text-sm font-medium">AB</div>}
            align={config.align}
            reverse={config.reverse === 'true'}
          >
            <div className="font-medium text-fg gds-text-body">Alice Baker</div>
            <div className="text-fg-muted gds-text-caption">Software engineer at Acme Corp. Working on design systems.</div>
          </MediaObject>
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="align" value={config.align} options={['top', 'center']} onChange={(v) => setConfig('align', v)} />
      <Ctrl type="pills" label="reverse" value={config.reverse} options={['false', 'true']} onChange={(v) => setConfig('reverse', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { MediaObject } from '@goliapkg/gds'\n\n<MediaObject\n  media={<Avatar name="Alice" />}\n  align="${config.align}"\n  ${config.reverse === 'true' ? 'reverse\n' : ''}>\n  <p>Content here</p>\n</MediaObject>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['media', 'Media element (icon/avatar/image)', 'ReactNode', '—'],
        ['children', 'Content area', 'ReactNode', '—'],
        ['align', 'Vertical alignment', '"top" | "center"', '"top"'],
        ['reverse', 'Flip media to right side', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsR.push(mediaObjectItem)

const progressStepsItem: DevCenterItem = {
  id: 'progress-steps',
  label: 'ProgressSteps',
  layer: 'l4',
  type: 'interactive',
  tags: ['progress', 'steps', 'wizard', 'stepper', 'molecule'],
  defaultConfig: { current: '1' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { ProgressSteps } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-full max-w-md">
          <ProgressSteps steps={['Upload', 'Review', 'Confirm', 'Done']} current={Number(config.current)} />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <Ctrl type="pills" label="current" value={config.current} options={['0', '1', '2', '3']} onChange={(v) => setConfig('current', v)} />
  ),

  code: ({ config }) =>
    `import { ProgressSteps } from '@goliapkg/gds'\n\n<ProgressSteps\n  steps={['Upload', 'Review', 'Confirm', 'Done']}\n  current={${config.current}}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['steps', 'Step labels', 'string[]', '—'],
        ['current', 'Zero-based current step index', 'number', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsR.push(progressStepsItem)

export { moleculeItemsR }
