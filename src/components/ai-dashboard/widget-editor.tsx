import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { DashboardSchema, DashboardWidget, SlotId } from "@/types/ai-dashboard";

const WIDGET_TYPES: { value: DashboardWidget["type"]; label: string; defaultDataKey: string }[] = [
  { value: "metricCard", label: "指标卡片", defaultDataKey: "metricCardData" },
  { value: "barChart", label: "柱状图", defaultDataKey: "rankData" },
  { value: "lineChart", label: "折线图", defaultDataKey: "trendData" },
  { value: "stackBarChart", label: "堆叠柱状图", defaultDataKey: "stackRankData" },
  { value: "chinaMap", label: "地图", defaultDataKey: "mapData" },
  { value: "summaryPanel", label: "概览面板", defaultDataKey: "summaryPanelData" },
  { value: "gaugePanel", label: "仪表盘", defaultDataKey: "gaugePanelData" },
  { value: "table", label: "表格", defaultDataKey: "tableData" },
];

const ALL_SLOTS: SlotId[] = [
  "leftTop",
  "leftMiddle",
  "centerMain",
  "rightTop",
  "rightMiddle",
  "bottomLeft",
  "bottomCenter",
  "bottomRight",
];

type Props = {
  schema: DashboardSchema;
  selectedSlotId: string | null;
  onUpdateWidget: (slotId: string, widget: DashboardWidget) => void;
  onMoveWidget: (fromSlot: string, toSlot: string) => void;
  onDeleteWidget: (slotId: string) => void;
  onDeselect: () => void;
};

export function WidgetEditor({
  schema,
  selectedSlotId,
  onUpdateWidget,
  onMoveWidget,
  onDeleteWidget,
  onDeselect,
}: Props) {
  if (!selectedSlotId) {
    return (
      <Card>
        <CardHeader className="space-y-2">
          <p className="text-xs uppercase tracking-[0.26em] text-[hsl(var(--muted-foreground))]">
            Widget 编辑器
          </p>
          <h2 className="text-lg font-semibold">部件配置</h2>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6 text-[hsl(var(--muted-foreground))]">
            点击预览中的任意图表或卡片，即可在此编辑其类型、标题和数据绑定。
          </p>
        </CardContent>
      </Card>
    );
  }

  const widget = schema.slots[selectedSlotId as SlotId];

  if (!widget) {
    return (
      <Card>
        <CardHeader className="space-y-2">
          <p className="text-xs uppercase tracking-[0.26em] text-[hsl(var(--muted-foreground))]">
            Widget 编辑器
          </p>
          <h2 className="text-lg font-semibold">空槽位：{selectedSlotId}</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            该位置尚未配置 widget。选择一个类型来添加。
          </p>
          <div className="space-y-2">
            {WIDGET_TYPES.map((wt) => (
              <Button
                key={wt.value}
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() =>
                  onUpdateWidget(selectedSlotId, {
                    type: wt.value,
                    title: wt.label,
                    dataKey: wt.defaultDataKey,
                  } as DashboardWidget)
                }
              >
                + 添加 {wt.label}
              </Button>
            ))}
          </div>
          <Button variant="ghost" size="sm" onClick={onDeselect}>
            取消
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.26em] text-[hsl(var(--muted-foreground))]">
            Widget 编辑器
          </p>
          <Button variant="ghost" size="sm" onClick={onDeselect}>
            取消选择
          </Button>
        </div>
        <h2 className="text-lg font-semibold">
          编辑 · {selectedSlotId}
        </h2>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Type selector */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]">
            图表类型
          </label>
          <select
            value={widget.type}
            onChange={(e) => {
              const newType = e.target.value as DashboardWidget["type"];
              const newDataKey =
                WIDGET_TYPES.find((wt) => wt.value === newType)?.defaultDataKey ??
                widget.dataKey;
              onUpdateWidget(selectedSlotId, {
                ...widget,
                type: newType,
                dataKey: newDataKey,
              });
            }}
            className="w-full rounded-xl border border-[hsl(var(--border))] bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
          >
            {WIDGET_TYPES.map((wt) => (
              <option key={wt.value} value={wt.value}>
                {wt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]">
            标题
          </label>
          <input
            type="text"
            value={widget.title}
            onChange={(e) =>
              onUpdateWidget(selectedSlotId, {
                ...widget,
                title: e.target.value,
              })
            }
            className="w-full rounded-xl border border-[hsl(var(--border))] bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
          />
        </div>

        {/* Data Key */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]">
            数据绑定 (dataKey)
          </label>
          <input
            type="text"
            value={widget.dataKey}
            onChange={(e) =>
              onUpdateWidget(selectedSlotId, {
                ...widget,
                dataKey: e.target.value,
              })
            }
            className="w-full rounded-xl border border-[hsl(var(--border))] bg-transparent px-3 py-2 text-sm font-mono outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
          />
        </div>

        {/* Move to another slot */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]">
            移动到其他槽位
          </label>
          <div className="flex flex-wrap gap-2">
            {ALL_SLOTS.filter((s) => s !== selectedSlotId).map((slot) => (
              <Button
                key={slot}
                variant="outline"
                size="sm"
                onClick={() => onMoveWidget(selectedSlotId, slot)}
              >
                → {slot}
              </Button>
            ))}
          </div>
        </div>

        {/* Delete */}
        <Button
          variant="outline"
          size="sm"
          className="w-full border-red-400/20 text-red-400 hover:bg-red-950/20"
          onClick={() => onDeleteWidget(selectedSlotId)}
        >
          移除此 widget
        </Button>
      </CardContent>
    </Card>
  );
}
