import type { ReactNode } from "react";
import type {
  DashboardDataSource,
  DashboardTemplate,
  DashboardWidget,
  SlotId,
} from "@/types/ai-dashboard";
import { renderWidget } from "./render-widget";

export type RenderContext = {
  slots: Partial<Record<SlotId, DashboardWidget>>;
  data: DashboardDataSource;
  selectedSlotId: string | null;
  onSelectSlot: (slotId: string) => void;
};

export type TemplateDefinition = {
  id: DashboardTemplate;
  label: string;
  description: string;
  slots: SlotId[];
  render: (ctx: RenderContext) => ReactNode;
};

function r(
  widget: DashboardWidget | undefined,
  data: DashboardDataSource,
  slotId: string,
  selectedSlotId: string | null,
  onSelectSlot: (slotId: string) => void,
) {
  if (!widget) return null;
  return renderWidget(widget, data, slotId, selectedSlotId, onSelectSlot);
}

// ====== three-column-map-dashboard ======
function ThreeColumnLayout(ctx: RenderContext) {
  const { slots, data, selectedSlotId, onSelectSlot } = ctx;
  return (
    <>
      <div className="relative grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)_320px]">
        <div className="pointer-events-none absolute inset-y-0 left-[320px] hidden w-px bg-gradient-to-b from-transparent via-cyan-400/12 to-transparent xl:block" />
        <div className="pointer-events-none absolute inset-y-0 right-[320px] hidden w-px bg-gradient-to-b from-transparent via-cyan-400/12 to-transparent xl:block" />
        <div className="space-y-5">
          {r(slots.leftTop, data, "leftTop", selectedSlotId, onSelectSlot)}
          {r(slots.leftMiddle, data, "leftMiddle", selectedSlotId, onSelectSlot)}
        </div>
        <div className="space-y-5">
          {r(slots.centerMain, data, "centerMain", selectedSlotId, onSelectSlot)}
        </div>
        <div className="space-y-5">
          {r(slots.rightTop, data, "rightTop", selectedSlotId, onSelectSlot)}
          {r(slots.rightMiddle, data, "rightMiddle", selectedSlotId, onSelectSlot)}
        </div>
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        {r(slots.bottomLeft, data, "bottomLeft", selectedSlotId, onSelectSlot)}
        {r(slots.bottomCenter, data, "bottomCenter", selectedSlotId, onSelectSlot)}
        {r(slots.bottomRight, data, "bottomRight", selectedSlotId, onSelectSlot)}
      </div>
    </>
  );
}

// ====== two-column-dashboard ======
function TwoColumnLayout(ctx: RenderContext) {
  const { slots, data, selectedSlotId, onSelectSlot } = ctx;
  return (
    <>
      <div className="relative grid gap-5 xl:grid-cols-[1fr_420px]">
        <div className="pointer-events-none absolute inset-y-0 right-[420px] hidden w-px bg-gradient-to-b from-transparent via-cyan-400/12 to-transparent xl:block" />
        <div className="space-y-5">
          <div className="grid gap-5 xl:grid-cols-2">
            {r(slots.leftTop, data, "leftTop", selectedSlotId, onSelectSlot)}
            {r(slots.leftMiddle, data, "leftMiddle", selectedSlotId, onSelectSlot)}
          </div>
          {r(slots.centerMain, data, "centerMain", selectedSlotId, onSelectSlot)}
        </div>
        <div className="space-y-5">
          {r(slots.rightTop, data, "rightTop", selectedSlotId, onSelectSlot)}
          {r(slots.rightMiddle, data, "rightMiddle", selectedSlotId, onSelectSlot)}
        </div>
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        {r(slots.bottomLeft, data, "bottomLeft", selectedSlotId, onSelectSlot)}
        {r(slots.bottomCenter, data, "bottomCenter", selectedSlotId, onSelectSlot)}
        {r(slots.bottomRight, data, "bottomRight", selectedSlotId, onSelectSlot)}
      </div>
    </>
  );
}

// ====== metrics-grid-dashboard ======
function MetricsGridLayout(ctx: RenderContext) {
  const { slots, data, selectedSlotId, onSelectSlot } = ctx;
  return (
    <>
      <div className="grid gap-5 xl:grid-cols-4">
        {r(slots.leftTop, data, "leftTop", selectedSlotId, onSelectSlot)}
        {r(slots.leftMiddle, data, "leftMiddle", selectedSlotId, onSelectSlot)}
        {r(slots.rightTop, data, "rightTop", selectedSlotId, onSelectSlot)}
        {r(slots.rightMiddle, data, "rightMiddle", selectedSlotId, onSelectSlot)}
      </div>
      <div className="mt-5">
        {r(slots.centerMain, data, "centerMain", selectedSlotId, onSelectSlot)}
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        {r(slots.bottomLeft, data, "bottomLeft", selectedSlotId, onSelectSlot)}
        {r(slots.bottomCenter, data, "bottomCenter", selectedSlotId, onSelectSlot)}
        {r(slots.bottomRight, data, "bottomRight", selectedSlotId, onSelectSlot)}
      </div>
    </>
  );
}

// ====== Template Registry ======
export const templateRegistry: Record<DashboardTemplate, TemplateDefinition> = {
  "three-column-map-dashboard": {
    id: "three-column-map-dashboard",
    label: "三栏地图布局",
    description: "左指标+排名，中地图，右概览+仪表，底图表格",
    slots: [
      "leftTop",
      "leftMiddle",
      "centerMain",
      "rightTop",
      "rightMiddle",
      "bottomLeft",
      "bottomCenter",
      "bottomRight",
    ],
    render: ThreeColumnLayout,
  },
  "two-column-dashboard": {
    id: "two-column-dashboard",
    label: "双栏布局",
    description: "左区图表上下排布，右区地图+指标面板",
    slots: [
      "leftTop",
      "leftMiddle",
      "centerMain",
      "rightTop",
      "rightMiddle",
      "bottomLeft",
      "bottomCenter",
      "bottomRight",
    ],
    render: TwoColumnLayout,
  },
  "metrics-grid-dashboard": {
    id: "metrics-grid-dashboard",
    label: "指标矩阵布局",
    description: "顶部四指标卡横排，中部地图全宽，底图三图表",
    slots: [
      "leftTop",
      "leftMiddle",
      "rightTop",
      "rightMiddle",
      "centerMain",
      "bottomLeft",
      "bottomCenter",
      "bottomRight",
    ],
    render: MetricsGridLayout,
  },
};
