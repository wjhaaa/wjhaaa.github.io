import type { DashboardDataSource, DashboardSchema } from "@/types/ai-dashboard";
import { templateRegistry } from "@/components/ai-dashboard/templates";

export function DashboardPreview({
  schema,
  data,
  selectedSlotId,
  onSelectSlot,
}: {
  schema: DashboardSchema;
  data: DashboardDataSource;
  selectedSlotId: string | null;
  onSelectSlot: (slotId: string) => void;
}) {
  const template = templateRegistry[schema.template];

  if (!template) {
    return (
      <div className="rounded-2xl border border-red-400/20 bg-red-950/20 p-8 text-center text-sm text-red-300">
        未知模板类型：{schema.template}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[32px] border border-cyan-400/20 bg-[linear-gradient(180deg,#071127,#020617)] p-4 text-white shadow-[0_0_80px_rgba(8,145,178,0.08)]">
      <div className="relative rounded-[28px] border border-cyan-400/15 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.16),_transparent_45%),linear-gradient(180deg,#08152f,#040b18)] p-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(8,145,178,0.12),_transparent_36%)]" />
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />

        {/* Header */}
        <header className="relative mb-5 overflow-hidden rounded-[24px] border border-cyan-400/15 bg-slate-950/40 px-6 py-4">
          <div className="absolute left-6 top-0 h-6 w-28 bg-[linear-gradient(90deg,rgba(56,189,248,0.0),rgba(56,189,248,0.45),rgba(56,189,248,0.0))]" />
          <div className="absolute right-6 top-0 h-6 w-28 bg-[linear-gradient(90deg,rgba(56,189,248,0.0),rgba(56,189,248,0.45),rgba(56,189,248,0.0))]" />
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-cyan-300/80">
                {template.label} · {schema.template}
              </p>
              <h2 className="mt-2 text-center text-2xl font-semibold tracking-[0.16em] text-cyan-50 drop-shadow-[0_0_18px_rgba(34,211,238,0.24)] xl:text-left">
                {schema.title}
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {schema.filters.map((filter) => (
                <div
                  key={filter.key}
                  className="rounded-xl border border-cyan-400/10 bg-cyan-400/5 px-4 py-2"
                >
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                    {filter.label}
                  </p>
                  <p className="mt-1 text-sm text-cyan-50">{filter.value}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Template-driven layout */}
        {template.render({
          slots: schema.slots,
          data,
          selectedSlotId,
          onSelectSlot,
        })}
      </div>
    </div>
  );
}
