import type { DashboardPreset } from "@/types/ai-dashboard";

export const carbonDashboardPreset: DashboardPreset = {
  prompt:
    "生成一个企业碳排放驾驶舱，包含排放总量、排放源排名、全国地图、产品碳足迹、指标情况、排放趋势、组织排放量排名和减排项目表格。",
  schema: {
    id: "carbon-dashboard-demo",
    title: "碳足迹数字化管理平台",
    template: "three-column-map-dashboard",
    theme: {
      mode: "dark",
      skin: "blue-tech",
    },
    filters: [
      { key: "year", label: "年份", type: "select", value: "2023" },
      { key: "month", label: "月份", type: "select", value: "全年" },
      { key: "orgId", label: "单位名称", type: "select", value: "总部" },
    ],
    slots: {
      leftTop: { type: "metricCard", title: "排放数据", dataKey: "emissionSummary" },
      leftMiddle: { type: "barChart", title: "排放源排名", dataKey: "sourceRank" },
      centerMain: { type: "chinaMap", title: "全国排放分布", dataKey: "mapData" },
      rightTop: { type: "summaryPanel", title: "产品碳足迹", dataKey: "productFootprint" },
      rightMiddle: { type: "gaugePanel", title: "指标情况", dataKey: "indicatorStatus" },
      bottomLeft: { type: "lineChart", title: "排放趋势", dataKey: "emissionTrend" },
      bottomCenter: { type: "stackBarChart", title: "组织排放量排名", dataKey: "orgRank" },
      bottomRight: { type: "table", title: "减排项目情况", dataKey: "reductionProjects" },
    },
  },
  data: {
    emissionSummary: {
      icon: "CO₂",
      value: "7,364,088",
      unit: "tCO₂e",
      deltaLabel: "同比",
      deltaValue: "+68%",
    },
    sourceRank: [
      { label: "测试", value: 2600000 },
      { label: "办公用品", value: 2550000 },
      { label: "飞机", value: 2140000 },
      { label: "柴汽油", value: 1320000 },
      { label: "电力", value: 820000 },
    ],
    mapData: [
      { name: "北京", x: 68, y: 35, value: 78 },
      { name: "湖北", x: 58, y: 53, value: 52 },
      { name: "广东", x: 72, y: 73, value: 66 },
      { name: "四川", x: 44, y: 58, value: 49 },
      { name: "上海", x: 79, y: 60, value: 57 },
    ],
    productFootprint: {
      headline: "1000 十六号产品名称一",
      subline: "单位产品排放量 372.2 kgCO₂e",
      metrics: [
        { label: "碳排放总量", value: "37,220" },
        { label: "核算数量", value: "100" },
      ],
      rank: [
        { label: "分销与储运", value: 14200 },
        { label: "生产制造", value: 2100 },
        { label: "原材料获取", value: 24500 },
      ],
    },
    indicatorStatus: {
      value: 42,
      totalLabel: "总体指标 12 项",
      detail: "武汉长盛港通供应链 · 已使用指标比 42%",
    },
    emissionTrend: [
      { label: "1月", value: 120000, compare: 110000 },
      { label: "3月", value: 135000, compare: 130000 },
      { label: "5月", value: 7100000, compare: 90000 },
      { label: "7月", value: 180000, compare: 170000 },
      { label: "9月", value: 220000, compare: 210000 },
      { label: "11月", value: 320000, compare: 260000 },
    ],
    orgRank: [
      {
        label: "整车事业部",
        values: [
          { label: "范围一", value: 2600000, color: "#5b8ff9" },
          { label: "范围二", value: 2400000, color: "#5ad8a6" },
          { label: "范围三", value: 2200000, color: "#f6bd16" },
        ],
      },
      {
        label: "公司领导",
        values: [
          { label: "范围一", value: 130000, color: "#5b8ff9" },
          { label: "范围二", value: 90000, color: "#5ad8a6" },
          { label: "范围三", value: 50000, color: "#f6bd16" },
        ],
      },
      {
        label: "福永科技公司",
        values: [
          { label: "范围一", value: 920000, color: "#5b8ff9" },
          { label: "范围二", value: 710000, color: "#5ad8a6" },
          { label: "范围三", value: 510000, color: "#f6bd16" },
        ],
      },
    ],
    reductionProjects: {
      columns: ["项目名称", "年度减排值", "减排比"],
      rows: [
        ["11", "-132199.467kgCO₂e/单位", "-35518%"],
        ["111", "6.346kgCO₂e", "97%"],
        ["1", "57369291kgCO₂e", "100%"],
        ["22号测试", "-87553272kgCO₂e/单位", "-9457%"],
      ],
    },
  },
};

export const energyDashboardPreset: DashboardPreset = {
  ...carbonDashboardPreset,
  prompt:
    "生成一个企业能源管理驾驶舱，包含能耗总览、设备排名、区域地图、重点产品能耗、达标情况、月度趋势、部门能耗对比和治理项目表格。",
  schema: {
    ...carbonDashboardPreset.schema,
    id: "energy-dashboard-demo",
    title: "能源管理数字化驾驶舱",
    theme: { mode: "dark", skin: "emerald-grid" },
  },
  data: {
    ...carbonDashboardPreset.data,
    emissionSummary: {
      icon: "kWh",
      value: "2,918,440",
      unit: "MWh",
      deltaLabel: "环比",
      deltaValue: "-12%",
    },
  },
};

const baseSlots = {
  leftTop: { type: "metricCard" as const, title: "核心指标", dataKey: "coreMetric" },
  leftMiddle: { type: "barChart" as const, title: "品类排名", dataKey: "categoryRank" },
  centerMain: { type: "chinaMap" as const, title: "全国分布", dataKey: "mapData" },
  rightTop: { type: "summaryPanel" as const, title: "重点品类概览", dataKey: "categoryOverview" },
  rightMiddle: { type: "gaugePanel" as const, title: "目标完成率", dataKey: "targetProgress" },
  bottomLeft: { type: "lineChart" as const, title: "销售趋势", dataKey: "salesTrend" },
  bottomCenter: { type: "stackBarChart" as const, title: "区域对比", dataKey: "regionCompare" },
  bottomRight: { type: "table" as const, title: "Top 项目", dataKey: "topProjects" },
};

export const logisticsDashboardPreset: DashboardPreset = {
  prompt: "生成一个智慧物流管理驾驶舱，包含运力总览、线路排名、全国分布、重点线路指标、及时率仪表、月度趋势、区域运力对比和项目表格。",
  schema: {
    id: "logistics-dashboard-demo",
    title: "智慧物流管理驾驶舱",
    template: "two-column-dashboard",
    theme: { mode: "dark", skin: "blue-tech" },
    filters: [
      { key: "year", label: "年份", type: "select", value: "2023" },
      { key: "month", label: "月份", type: "select", value: "全年" },
      { key: "region", label: "大区", type: "select", value: "全国" },
    ],
    slots: {
      leftTop: { type: "metricCard", title: "运力总览", dataKey: "coreMetric" },
      leftMiddle: { type: "barChart", title: "线路运力排名", dataKey: "categoryRank" },
      centerMain: { type: "chinaMap", title: "全国运力分布", dataKey: "mapData" },
      rightTop: { type: "summaryPanel", title: "重点线路指标", dataKey: "categoryOverview" },
      rightMiddle: { type: "gaugePanel", title: "及时率", dataKey: "targetProgress" },
      bottomLeft: { type: "lineChart", title: "月度运力趋势", dataKey: "salesTrend" },
      bottomCenter: { type: "stackBarChart", title: "区域运力对比", dataKey: "regionCompare" },
      bottomRight: { type: "table", title: "运输项目情况", dataKey: "topProjects" },
    },
  },
  data: {
    ...carbonDashboardPreset.data,
    coreMetric: {
      icon: "🚛",
      value: "18,642",
      unit: "车次/月",
      deltaLabel: "环比",
      deltaValue: "+12%",
    },
    categoryOverview: {
      headline: "京沪干线",
      subline: "满载率 87.3% · 准点率 94.2%",
      metrics: [
        { label: "月运力", value: "2,840 车次" },
        { label: "平均时效", value: "28.5h" },
      ],
      rank: [
        { label: "干线运输", value: 2840 },
        { label: "城配运输", value: 1820 },
        { label: "最后一公里", value: 960 },
      ],
    },
    targetProgress: {
      value: 87,
      totalLabel: "关键指标 8 项",
      detail: "全国网络 · 及时率 87% · 目标 90%",
    },
    topProjects: {
      columns: ["项目名称", "月运力", "完成率"],
      rows: [
        ["华东干线优化", "5,200 车次", "98%"],
        ["华南城配网络", "4,100 车次", "92%"],
        ["西南冷链专线", "2,800 车次", "87%"],
        ["西北支线覆盖", "1,900 车次", "76%"],
      ],
    },
  },
};

export const salesDashboardPreset: DashboardPreset = {
  prompt: "生成一个销售业绩管理驾驶舱，包含销售额总览、产品线排名、区域地图、重点客户指标、目标达成率、月度趋势、渠道对比和Top客户表格。",
  schema: {
    id: "sales-dashboard-demo",
    title: "销售业绩管理驾驶舱",
    template: "metrics-grid-dashboard",
    theme: { mode: "dark", skin: "emerald-grid" },
    filters: [
      { key: "year", label: "年份", type: "select", value: "2023" },
      { key: "quarter", label: "季度", type: "select", value: "Q4" },
      { key: "channel", label: "渠道", type: "select", value: "全渠道" },
    ],
    slots: {
      leftTop: { type: "metricCard", title: "销售总额", dataKey: "coreMetric" },
      leftMiddle: { type: "metricCard", title: "订单数", dataKey: "orderCount" },
      rightTop: { type: "metricCard", title: "客单价", dataKey: "avgOrderValue" },
      rightMiddle: { type: "metricCard", title: "退货率", dataKey: "returnRate" },
      centerMain: { type: "chinaMap", title: "区域销售分布", dataKey: "mapData" },
      bottomLeft: { type: "lineChart", title: "月度销售趋势", dataKey: "salesTrend" },
      bottomCenter: { type: "stackBarChart", title: "渠道销售对比", dataKey: "regionCompare" },
      bottomRight: { type: "table", title: "Top 客户", dataKey: "topProjects" },
    },
  },
  data: {
    ...carbonDashboardPreset.data,
    coreMetric: {
      icon: "💰",
      value: "8,942",
      unit: "万元",
      deltaLabel: "同比",
      deltaValue: "+24%",
    },
    orderCount: {
      icon: "📋",
      value: "36,280",
      unit: "笔",
      deltaLabel: "同比",
      deltaValue: "+18%",
    },
    avgOrderValue: {
      icon: "🏷️",
      value: "2,465",
      unit: "元",
      deltaLabel: "环比",
      deltaValue: "+5%",
    },
    returnRate: {
      icon: "↩️",
      value: "3.2",
      unit: "%",
      deltaLabel: "环比",
      deltaValue: "-0.8%",
    },
    salesTrend: [
      { label: "1月", value: 6800, compare: 6200 },
      { label: "3月", value: 7200, compare: 6500 },
      { label: "5月", value: 8100, compare: 7200 },
      { label: "7月", value: 7800, compare: 7400 },
      { label: "9月", value: 8500, compare: 7800 },
      { label: "11月", value: 8942, compare: 8000 },
    ],
    mapData: [
      { name: "北京", x: 68, y: 35, value: 85 },
      { name: "上海", x: 79, y: 60, value: 92 },
      { name: "广东", x: 72, y: 73, value: 88 },
      { name: "四川", x: 44, y: 58, value: 65 },
      { name: "湖北", x: 58, y: 53, value: 58 },
      { name: "辽宁", x: 72, y: 28, value: 47 },
    ],
    topProjects: {
      columns: ["客户名称", "销售额", "增长"],
      rows: [
        ["华东科技集团", "1,280 万", "+32%"],
        ["南方制造股份", "1,050 万", "+28%"],
        ["北京创新科技", "920 万", "+15%"],
        ["深圳电子有限", "780 万", "+42%"],
        ["杭州网络科技", "650 万", "+8%"],
      ],
    },
  },
};

export const dashboardPresets = [
  carbonDashboardPreset,
  energyDashboardPreset,
  logisticsDashboardPreset,
  salesDashboardPreset,
];
