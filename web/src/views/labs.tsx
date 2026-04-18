import type { Entry } from './_master-detail'
import { MasterDetailView } from './_master-detail'

const LABS: Entry[] = []

export function LabsView() {
  return (
    <MasterDetailView
      emptyHint="Labs 是 drafts 工作区 —— 未成熟的尝试先在这里跑，好的再提升到别处。等用户定义第一个。"
      entries={LABS}
      listLabel="Labs"
      topicPrefix="Topic"
    />
  )
}
