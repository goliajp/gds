import { describe, expect, it } from 'vitest'

import {
  AreaChart,
  BarChart,
  FunnelChart,
  Gauge,
  HeatmapChart,
  LineChart,
  PieChart,
  RadarChart,
  SankeyChart,
  ScatterChart,
  Sparkline,
  TreemapChart,
} from '../index'

describe('l6-charts barrel export', () => {
  it('exports all 12 chart components', () => {
    expect(AreaChart).toBeDefined()
    expect(BarChart).toBeDefined()
    expect(FunnelChart).toBeDefined()
    expect(Gauge).toBeDefined()
    expect(HeatmapChart).toBeDefined()
    expect(LineChart).toBeDefined()
    expect(PieChart).toBeDefined()
    expect(RadarChart).toBeDefined()
    expect(SankeyChart).toBeDefined()
    expect(ScatterChart).toBeDefined()
    expect(Sparkline).toBeDefined()
    expect(TreemapChart).toBeDefined()
  })
})
