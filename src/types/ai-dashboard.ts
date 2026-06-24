export type DashboardTemplate =
  | "three-column-map-dashboard"
  | "two-column-dashboard"
  | "metrics-grid-dashboard";

export type DashboardTheme = {
  mode: "dark";
  skin: "blue-tech" | "emerald-grid";
};

export type DashboardFilter = {
  key: string;
  label: string;
  type: "select";
  value: string;
};

export type SlotId =
  | "leftTop"
  | "leftMiddle"
  | "centerMain"
  | "rightTop"
  | "rightMiddle"
  | "bottomLeft"
  | "bottomCenter"
  | "bottomRight";

export type MetricCardWidget = {
  type: "metricCard";
  title: string;
  dataKey: string;
};

export type BarChartWidget = {
  type: "barChart";
  title: string;
  dataKey: string;
};

export type LineChartWidget = {
  type: "lineChart";
  title: string;
  dataKey: string;
};

export type StackBarChartWidget = {
  type: "stackBarChart";
  title: string;
  dataKey: string;
};

export type ChinaMapWidget = {
  type: "chinaMap";
  title: string;
  dataKey: string;
};

export type SummaryPanelWidget = {
  type: "summaryPanel";
  title: string;
  dataKey: string;
};

export type GaugePanelWidget = {
  type: "gaugePanel";
  title: string;
  dataKey: string;
};

export type TableWidget = {
  type: "table";
  title: string;
  dataKey: string;
};

export type DashboardWidget =
  | MetricCardWidget
  | BarChartWidget
  | LineChartWidget
  | StackBarChartWidget
  | ChinaMapWidget
  | SummaryPanelWidget
  | GaugePanelWidget
  | TableWidget;

export type DataSourceConfig =
  | { type: "mock" }
  | { type: "url"; url: string; refreshIntervalMs?: number };

export type DashboardSchema = {
  id: string;
  title: string;
  template: DashboardTemplate;
  theme: DashboardTheme;
  filters: DashboardFilter[];
  slots: Partial<Record<SlotId, DashboardWidget>>;
  dataSource?: DataSourceConfig;
};

export type RankItem = {
  label: string;
  value: number;
};

export type TrendPoint = {
  label: string;
  value: number;
  compare?: number;
};

export type StackRankItem = {
  label: string;
  values: { label: string; value: number; color: string }[];
};

export type MapPoint = {
  name: string;
  x: number;
  y: number;
  value: number;
};

export type MetricCardData = {
  icon: string;
  value: string;
  unit: string;
  deltaLabel: string;
  deltaValue: string;
};

export type SummaryPanelData = {
  headline: string;
  subline: string;
  metrics: { label: string; value: string }[];
  rank: RankItem[];
};

export type GaugePanelData = {
  value: number;
  totalLabel: string;
  detail: string;
};

export type TableData = {
  columns: string[];
  rows: string[][];
};

export type DashboardDataSource = Record<string, unknown>;

export type DashboardPreset = {
  prompt: string;
  schema: DashboardSchema;
  data: DashboardDataSource;
};
