import type { ReactNode } from 'react'

type LayerId = 'l-dep' | 'l-docs' | 'l0' | 'l1' | 'l2' | 'l3' | 'l4' | 'l5' | 'l6' | 'l7'

type ItemConfig = Record<string, any>

type StageProps = {
  config: ItemConfig
  setConfig: (key: string, val: any) => void
  variant: string
}

type ControlsProps = {
  config: ItemConfig
  setConfig: (key: string, val: any) => void
  variant: string
  setVariant: (v: string) => void
}

type DevCenterItem = {
  id: string
  label: string
  layer: LayerId
  type: 'interactive' | 'reference'
  tags?: string[]
  variants?: string[]
  defaultConfig?: ItemConfig

  // simple stage (no config) or rich stage (with config)
  stage: ((props: StageProps) => ReactNode) | (() => ReactNode)

  controls?: (props: ControlsProps) => ReactNode
  code?: ((props: StageProps) => string) | (() => string)
  docs?: () => ReactNode
}

type LayerMeta = {
  id: LayerId
  label: string
  shortLabel: string
  description: string
  color: string
}

export type { ControlsProps, DevCenterItem, ItemConfig, LayerId, LayerMeta, StageProps }
