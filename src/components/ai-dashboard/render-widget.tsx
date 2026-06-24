import type { DashboardDataSource, DashboardWidget } from "@/types/ai-dashboard";
import {
  BarChartWidget,
  ChinaMapWidget,
  GaugePanelWidget,
  LineChartWidget,
  MetricCard,
  StackBarChartWidget,
  SummaryPanelWidget,
  TableWidget,
} from "@/components/ai-dashboard/widgets";

export function renderWidget(
  widget: DashboardWidget,
  data: DashboardDataSource,
  slotId: string,
  selectedSlotId: string | null,
  onSelectSlot: (slotId: string) => void,
) {
  const source = data[widget.dataKey];
  const isSelected = slotId === selectedSlotId;

  let content: React.ReactNode;

  switch (widget.type) {
    case "metricCard":
      content = <MetricCard title={widget.title} data={source as never} />;
      break;
    case "barChart":
      content = <BarChartWidget title={widget.title} data={source as never} />;
      break;
    case "lineChart":
      content = <LineChartWidget title={widget.title} data={source as never} />;
      break;
    case "stackBarChart":
      content = <StackBarChartWidget title={widget.title} data={source as never} />;
      break;
    case "chinaMap":
      content = <ChinaMapWidget title={widget.title} data={source as never} />;
      break;
    case "summaryPanel":
      content = <SummaryPanelWidget title={widget.title} data={source as never} />;
      break;
    case "gaugePanel":
      content = <GaugePanelWidget title={widget.title} data={source as never} />;
      break;
    case "table":
      content = <TableWidget title={widget.title} data={source as never} />;
      break;
    default:
      return null;
  }

  return (
    <button
      type="button"
      className={`relative w-full cursor-pointer text-left transition-all ${
        isSelected
          ? "ring-2 ring-cyan-400 rounded-[24px] scale-[1.02] z-10 shadow-[0_0_24px_rgba(34,211,238,0.18)]"
          : "rounded-[22px] hover:ring-1 hover:ring-cyan-400/30"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onSelectSlot(slotId);
      }}
    >
      {isSelected && (
        <div className="absolute -top-2 left-4 z-20 rounded-full bg-cyan-400 px-3 py-0.5 text-[11px] font-medium text-slate-950">
          编辑中
        </div>
      )}
      {content}
    </button>
  );
}
