import type { Entry } from './_master-detail'
import { MasterDetailView } from './_master-detail'

const THINKINGS: Entry[] = []

export function ThinkingsView() {
  return (
    <MasterDetailView
      emptyHint="Thinkings 放已确认的讨论结果。初稿 / 草案先在 Labs 里跑，被提升后搬到这里。"
      entries={THINKINGS}
      listLabel="Thinkings"
      topicPrefix="Topic"
    />
  )
}
