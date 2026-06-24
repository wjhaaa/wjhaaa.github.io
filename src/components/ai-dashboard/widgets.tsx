import type { ReactNode } from "react";
import ReactECharts from "echarts-for-react";
import type {
  GaugePanelData,
  MapPoint,
  MetricCardData,
  RankItem,
  StackRankItem,
  SummaryPanelData,
  TableData,
  TrendPoint,
} from "@/types/ai-dashboard";

// ====== Shared dark-theme chart tokens ======
const CHART_TEXT_MUTED = "#94a3b8";
const CHART_TEXT_PRIMARY = "#cbd5e1";
const CHART_GRID_LINE = "rgba(148,163,184,0.1)";
const CHART_AXIS_LINE = "rgba(148,163,184,0.2)";
const TOOLTIP_BG = "rgba(15,23,42,0.95)";
const TOOLTIP_BORDER = "rgba(34,211,238,0.2)";

const tooltip = {
  backgroundColor: TOOLTIP_BG,
  borderColor: TOOLTIP_BORDER,
  textStyle: { color: "#e2e8f0", fontSize: 12 },
};

// ====== PanelShell ======
function PanelShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`group relative overflow-hidden rounded-[22px] border border-cyan-500/20 bg-[linear-gradient(180deg,rgba(7,18,42,0.96),rgba(3,8,23,0.92))] shadow-[inset_0_1px_0_rgba(125,211,252,0.08),0_0_0_1px_rgba(34,211,238,0.03),0_18px_48px_rgba(2,6,23,0.55)] ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.08),_transparent_34%),linear-gradient(180deg,transparent,rgba(15,23,42,0.36))]" />
      <div className="absolute left-0 top-0 h-16 w-16 border-l border-t border-cyan-400/40 opacity-80" />
      <div className="absolute right-0 top-0 h-16 w-16 border-r border-t border-cyan-400/40 opacity-80" />
      <div className="absolute bottom-0 left-0 h-16 w-16 border-b border-l border-cyan-400/20" />
      <div className="absolute bottom-0 right-0 h-16 w-16 border-b border-r border-cyan-400/20" />
      <div className="relative p-5">{children}</div>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-[radial-gradient(circle_at_right,_rgba(56,189,248,0.08),_transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </section>
  );
}

// ====== SectionTitle ======
function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="h-8 w-1 rounded-full bg-gradient-to-b from-cyan-300 to-blue-500" />
      <h3 className="text-sm font-semibold tracking-[0.18em] text-cyan-100">
        {title}
      </h3>
      <div className="h-[2px] flex-1 bg-gradient-to-r from-cyan-400/50 via-cyan-400/15 to-transparent" />
      <div className="h-2 w-12 rounded-full bg-[linear-gradient(90deg,rgba(34,211,238,0.7),rgba(59,130,246,0))]" />
    </div>
  );
}

// ====== MetricCard (HTML, unchanged) ======
export function MetricCard({
  title,
  data,
}: {
  title: string;
  data: MetricCardData;
}) {
  if (!data || typeof data.value !== "string") {
    return (
      <PanelShell>
        <SectionTitle title={title} />
        <p className="text-xs text-slate-500">数据格式不匹配，需要 MetricCardData</p>
      </PanelShell>
    );
  }
  return (
    <PanelShell>
      <SectionTitle title={title} />
      <div className="flex items-center gap-5">
        <div className="relative flex h-22 w-22 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-cyan-300/30 bg-cyan-400/10 blur-sm" />
          <div className="absolute inset-2 rounded-full border border-cyan-200/40" />
          <div className="relative flex h-18 w-18 items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.55),_rgba(8,47,73,0.2)_55%,_rgba(6,24,42,0.95)_70%)] text-lg font-semibold text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.25)]">
            {data.icon}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            {data.unit}
          </p>
          <p className="text-4xl font-semibold tracking-tight text-white">
            {data.value}
          </p>
          <p className="text-sm text-amber-300">
            {data.deltaLabel} {data.deltaValue}
          </p>
        </div>
      </div>
    </PanelShell>
  );
}

// ====== BarChartWidget → ECharts horizontal bar ======
export function BarChartWidget({
  title,
  data,
}: {
  title: string;
  data: RankItem[];
}) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <PanelShell>
        <SectionTitle title={title} />
        <p className="text-xs text-slate-500">数据格式不匹配，需要 RankItem[]</p>
      </PanelShell>
    );
  }
  const labels = [...data].reverse().map((d) => d.label);
  const values = [...data].reverse().map((d) => d.value);

  const option = {
    tooltip: {
      ...tooltip,
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    grid: { left: 85, right: 30, top: 5, bottom: 5 },
    xAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: CHART_GRID_LINE } },
      axisLabel: { color: CHART_TEXT_MUTED, fontSize: 10 },
    },
    yAxis: {
      type: "category",
      data: labels,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: CHART_TEXT_PRIMARY, fontSize: 11 },
    },
    series: [
      {
        type: "bar",
        data: values,
        barWidth: 14,
        itemStyle: {
          borderRadius: [0, 4, 4, 0],
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: "#1d4ed8" },
              { offset: 0.35, color: "#2563eb" },
              { offset: 1, color: "#22d3ee" },
            ],
          },
        },
      },
    ],
  };

  return (
    <PanelShell>
      <SectionTitle title={title} />
      <ReactECharts option={option} style={{ height: 200 }} />
    </PanelShell>
  );
}

// ====== LineChartWidget → ECharts line with area ======
export function LineChartWidget({
  title,
  data,
}: {
  title: string;
  data: TrendPoint[];
}) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <PanelShell>
        <SectionTitle title={title} />
        <p className="text-xs text-slate-500">数据格式不匹配，需要 TrendPoint[]</p>
      </PanelShell>
    );
  }
  const labels = data.map((d) => d.label);
  const values = data.map((d) => d.value);
  const hasCompare = data.some((d) => d.compare != null);

  const option = {
    tooltip: {
      ...tooltip,
      trigger: "axis",
    },
    legend: hasCompare
      ? {
          data: ["当前", "对比"],
          bottom: 0,
          textStyle: { color: CHART_TEXT_MUTED, fontSize: 10 },
          itemWidth: 16,
          itemHeight: 2,
        }
      : undefined,
    grid: {
      left: 55,
      right: 20,
      top: 15,
      bottom: hasCompare ? 28 : 20,
    },
    xAxis: {
      type: "category",
      data: labels,
      boundaryGap: false,
      axisLine: { lineStyle: { color: CHART_AXIS_LINE } },
      axisTick: { show: false },
      axisLabel: { color: CHART_TEXT_MUTED, fontSize: 10 },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: CHART_GRID_LINE } },
      axisLabel: { color: CHART_TEXT_MUTED, fontSize: 10 },
    },
    series: [
      {
        name: "当前",
        type: "line",
        data: values,
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: { color: "#60a5fa", width: 2 },
        itemStyle: { color: "#60a5fa" },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(96,165,250,0.25)" },
              { offset: 1, color: "rgba(96,165,250,0.02)" },
            ],
          },
        },
      },
      ...(hasCompare
        ? [
            {
              name: "对比",
              type: "line",
              data: data.map((d) => d.compare ?? null),
              smooth: true,
              symbol: "diamond",
              symbolSize: 6,
              lineStyle: { color: "#fbbf24", width: 2, type: "dashed" },
              itemStyle: { color: "#fbbf24" },
            },
          ]
        : []),
    ],
  };

  return (
    <PanelShell>
      <SectionTitle title={title} />
      <ReactECharts option={option} style={{ height: 220 }} />
    </PanelShell>
  );
}

// ====== StackBarChartWidget → ECharts stacked horizontal bar ======
export function StackBarChartWidget({
  title,
  data,
}: {
  title: string;
  data: StackRankItem[];
}) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <PanelShell>
        <SectionTitle title={title} />
        <p className="text-xs text-slate-500">数据格式不匹配，需要 StackRankItem[]</p>
      </PanelShell>
    );
  }
  const labels = data.map((d) => d.label);

  // Collect all unique segment labels across all items, preserving first-seen color
  const segmentMeta = new Map<string, string>();
  for (const item of data) {
    for (const seg of item.values) {
      if (!segmentMeta.has(seg.label)) {
        segmentMeta.set(seg.label, seg.color);
      }
    }
  }
  const segmentLabels = [...segmentMeta.keys()];

  const series = segmentLabels.map((label, i) => ({
    name: label,
    type: "bar",
    stack: "total",
    barWidth: 16,
    data: data.map((item) => {
      const seg = item.values.find((v) => v.label === label);
      return seg ? seg.value : 0;
    }),
    itemStyle: {
      color: segmentMeta.get(label),
      borderRadius:
        i === segmentLabels.length - 1 ? [0, 4, 4, 0] : 0,
    },
  }));

  const option = {
    tooltip: {
      ...tooltip,
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    legend: {
      data: segmentLabels,
      bottom: 0,
      textStyle: { color: CHART_TEXT_MUTED, fontSize: 10 },
      itemWidth: 10,
      itemHeight: 10,
    },
    grid: { left: 95, right: 30, top: 10, bottom: 35 },
    xAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: CHART_GRID_LINE } },
      axisLabel: { color: CHART_TEXT_MUTED, fontSize: 10 },
    },
    yAxis: {
      type: "category",
      data: labels,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: CHART_TEXT_PRIMARY, fontSize: 11 },
    },
    series,
  };

  return (
    <PanelShell>
      <SectionTitle title={title} />
      <ReactECharts option={option} style={{ height: 180 }} />
    </PanelShell>
  );
}

// ====== GaugePanelWidget → ECharts gauge ======
export function GaugePanelWidget({
  title,
  data,
}: {
  title: string;
  data: GaugePanelData;
}) {
  if (!data || typeof data.value !== "number") {
    return (
      <PanelShell>
        <SectionTitle title={title} />
        <p className="text-xs text-slate-500">数据格式不匹配，需要 GaugePanelData</p>
      </PanelShell>
    );
  }
  const option = {
    series: [
      {
        type: "gauge",
        startAngle: 210,
        endAngle: -30,
        center: ["50%", "55%"],
        radius: "85%",
        min: 0,
        max: 100,
        splitNumber: 10,
        axisLine: {
          show: true,
          lineStyle: {
            width: 20,
            color: [
              [0.3, "#ef4444"],
              [0.6, "#fbbf24"],
              [1, "#22d3ee"],
            ],
          },
        },
        pointer: {
          length: "70%",
          width: 6,
          itemStyle: { color: "auto" },
        },
        axisTick: {
          distance: -20,
          length: 6,
          lineStyle: { color: "#fff", width: 1 },
        },
        splitLine: {
          distance: -22,
          length: 16,
          lineStyle: { color: "#fff", width: 2 },
        },
        axisLabel: {
          color: CHART_TEXT_MUTED,
          distance: 30,
          fontSize: 10,
        },
        anchor: {
          show: true,
          size: 14,
          itemStyle: { color: "#22d3ee" },
        },
        title: { show: false },
        detail: {
          valueAnimation: true,
          formatter: "{value}%",
          color: "#fff",
          fontSize: 24,
          offsetCenter: [0, "60%"],
        },
        data: [{ value: data.value }],
      },
    ],
  };

  return (
    <PanelShell>
      <SectionTitle title={title} />
      <ReactECharts option={option} style={{ height: 200 }} />
      <div className="-mt-2 text-center text-sm text-slate-300">
        {data.totalLabel}
      </div>
      <div className="text-center text-xs text-slate-400">{data.detail}</div>
    </PanelShell>
  );
}

// ====== ChinaMapWidget → ECharts scatter on geo-like background ======
export function ChinaMapWidget({
  title,
  data,
}: {
  title: string;
  data: MapPoint[];
}) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <PanelShell className="bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.3),_rgba(2,6,23,0.96))]">
        <SectionTitle title={title} />
        <p className="text-xs text-slate-500">数据格式不匹配，需要 MapPoint[]</p>
      </PanelShell>
    );
  }
  const option = {
    tooltip: {
      ...tooltip,
      trigger: "item",
      formatter: (params: { data: [number, number, number, string] }) =>
        `${params.data[3]}<br/>排放量: ${params.data[2]}`,
    },
    grid: { left: 0, right: 0, top: 0, bottom: 0 },
    xAxis: {
      type: "value",
      min: 0,
      max: 100,
      show: false,
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 100,
      inverse: true,
      show: false,
    },
    series: [
      {
        type: "scatter",
        data: data.map((d) => [d.x, d.y, d.value, d.name]),
        symbolSize: (val: number[]) => Math.max(14, Math.sqrt(val[2]) * 3.5),
        itemStyle: {
          color: "#fbbf24",
          shadowBlur: 20,
          shadowColor: "rgba(250,204,21,0.9)",
        },
        label: {
          show: true,
          formatter: (params: { data: [number, number, number, string] }) =>
            params.data[3],
          position: "bottom",
          color: "#67e8f9",
          fontSize: 10,
          distance: 8,
        },
        emphasis: {
          scale: 1.5,
          itemStyle: { color: "#fcd34d" },
        },
      },
    ],
  };

  return (
    <PanelShell className="bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.3),_rgba(2,6,23,0.96))]">
      <SectionTitle title={title} />
      <div className="relative overflow-hidden rounded-2xl border border-cyan-400/10 bg-[linear-gradient(180deg,rgba(2,6,23,0.3),rgba(15,23,42,0.92))]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.18),_transparent_50%)]" />
        <div className="absolute inset-x-8 inset-y-10 rounded-[45%] border border-cyan-400/15 bg-cyan-400/5 blur-[2px]" />
        <div className="absolute inset-x-0 bottom-8 h-52 bg-[radial-gradient(ellipse_at_center,_rgba(14,165,233,0.22),_transparent_60%)]" />
        <div className="absolute bottom-0 left-1/2 h-44 w-[120%] -translate-x-1/2 rounded-full border-t border-cyan-500/10 bg-[radial-gradient(ellipse_at_center,_rgba(14,165,233,0.15),_transparent_60%)]" />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(56,189,248,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.15)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(to_top,transparent,black_24%,black_70%,transparent)]" />
        <div className="absolute left-[12%] top-[16%] h-[58%] w-[72%] rounded-[42%] border border-cyan-300/20 bg-[radial-gradient(circle_at_50%_35%,rgba(37,99,235,0.38),rgba(13,39,74,0.3)_55%,transparent_80%)] shadow-[0_0_60px_rgba(34,211,238,0.08)]" />
        <ReactECharts
          option={option}
          style={{ height: 420 }}
          className="relative z-10"
        />
      </div>
    </PanelShell>
  );
}

// ====== SummaryPanelWidget (HTML, unchanged) ======
export function SummaryPanelWidget({
  title,
  data,
}: {
  title: string;
  data: SummaryPanelData;
}) {
  if (
    !data ||
    !Array.isArray(data.rank) ||
    !Array.isArray(data.metrics)
  ) {
    return (
      <PanelShell>
        <SectionTitle title={title} />
        <p className="text-xs text-slate-500">数据格式不匹配，需要 SummaryPanelData</p>
      </PanelShell>
    );
  }
  const max = Math.max(...data.rank.map((item) => item.value), 1);
  return (
    <PanelShell>
      <SectionTitle title={title} />
      <div className="space-y-4">
        <div>
          <p className="text-base font-medium text-white">{data.headline}</p>
          <p className="text-sm text-slate-400">{data.subline}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {data.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl border border-cyan-400/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.86),rgba(10,18,34,0.92))] p-4 shadow-[inset_0_1px_0_rgba(125,211,252,0.06)]"
            >
              <p className="text-xs text-slate-400">{metric.label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {metric.value}
              </p>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {data.rank.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="flex justify-between text-xs text-slate-300">
                <span>{item.label}</span>
                <span>{item.value.toLocaleString()}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-900">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                  style={{ width: `${(item.value / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PanelShell>
  );
}

// ====== TableWidget (HTML, unchanged) ======
export function TableWidget({
  title,
  data,
}: {
  title: string;
  data: TableData;
}) {
  if (!data || !Array.isArray(data.columns) || !Array.isArray(data.rows)) {
    return (
      <PanelShell>
        <SectionTitle title={title} />
        <p className="text-xs text-slate-500">数据格式不匹配，需要 TableData</p>
      </PanelShell>
    );
  }
  return (
    <PanelShell>
      <SectionTitle title={title} />
      <div className="overflow-hidden rounded-xl border border-cyan-400/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-cyan-500/10 text-cyan-100">
            <tr>
              {data.columns.map((column) => (
                <th key={column} className="px-4 py-3 font-medium">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-cyan-500/10 text-slate-300">
            {data.rows.map((row, rowIndex) => (
              <tr
                key={`${row[0]}-${rowIndex}`}
                className="bg-slate-950/40"
              >
                {row.map((cell, cellIndex) => (
                  <td key={`${cell}-${cellIndex}`} className="px-4 py-3">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PanelShell>
  );
}
