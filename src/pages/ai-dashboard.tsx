import { useMemo, useState } from "react";
import Link from "next/link";
import { BrainCircuit, Database, LayoutTemplate, Sparkles } from "lucide-react";
import { Seo } from "@/components/seo";
import { DashboardPreview } from "@/components/ai-dashboard/dashboard-preview";
import { WidgetEditor } from "@/components/ai-dashboard/widget-editor";
import { DataSourcePanel } from "@/components/ai-dashboard/data-source-panel";
import { carbonDashboardPreset } from "@/mock/ai-dashboard";
import { generateDashboardByPrompt } from "@/services/ai-dashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type {
  DashboardDataSource,
  DashboardSchema,
  DashboardWidget,
  DataSourceConfig,
} from "@/types/ai-dashboard";

const defaultPrompt = carbonDashboardPreset.prompt;

export default function AiDashboardPage() {
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [schema, setSchema] = useState<DashboardSchema>(
    carbonDashboardPreset.schema,
  );
  const [data, setData] = useState<DashboardDataSource>(
    carbonDashboardPreset.data,
  );
  const [summary, setSummary] = useState(
    "把固定骨架 + 可变模块抽象成 schema，这就是你过去驾驶舱项目最有价值的产品化方向。",
  );
  const [loading, setLoading] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [dataSourceConfig, setDataSourceConfig] = useState<DataSourceConfig>(
    schema.dataSource ?? { type: "mock" },
  );

  const schemaJson = useMemo(() => JSON.stringify(schema, null, 2), [schema]);

  async function handleGenerate() {
    setLoading(true);
    setSelectedSlotId(null);

    try {
      const result = await generateDashboardByPrompt(prompt);
      setSchema(result.schema);
      setData(result.data);
      setSummary(result.promptSummary);
      setDataSourceConfig(result.schema.dataSource ?? { type: "mock" });
    } finally {
      setLoading(false);
    }
  }

  function handleUpdateWidget(slotId: string, widget: DashboardWidget) {
    setSchema((prev) => ({
      ...prev,
      slots: { ...prev.slots, [slotId]: widget },
    }));
  }

  function handleMoveWidget(fromSlot: string, toSlot: string) {
    setSchema((prev) => {
      const slots = { ...prev.slots };
      const moving = slots[fromSlot as keyof typeof slots];
      const target = slots[toSlot as keyof typeof slots];
      slots[toSlot as keyof typeof slots] = moving;
      slots[fromSlot as keyof typeof slots] = target;
      return { ...prev, slots };
    });
    setSelectedSlotId(toSlot);
  }

  function handleDeleteWidget(slotId: string) {
    setSchema((prev) => {
      const slots = { ...prev.slots };
      delete slots[slotId as keyof typeof slots];
      return { ...prev, slots };
    });
    setSelectedSlotId(null);
  }

  function handleDataSourceChange(config: DataSourceConfig) {
    setDataSourceConfig(config);
    setSchema((prev) => ({ ...prev, dataSource: config }));
  }

  function handleDataFetched(fetchedData: DashboardDataSource) {
    setData(fetchedData);
  }

  return (
    <>
      <Seo
        title="AI 驾驶舱生成平台"
        description="把企业驾驶舱里的重复劳动抽象成 schema 驱动的可视化平台。"
      />

      <div className="space-y-8">
        <section className="space-y-4">
          <p className="text-sm uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
            AI + 低代码 + 企业驾驶舱
          </p>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                AI 驾驶舱生成平台
              </h1>
              <p className="max-w-2xl text-pretty text-base leading-7 text-[hsl(var(--muted-foreground))]">
                针对企业项目中大量重复的驾驶舱开发工作，把复制旧项目再改图表、改接口、改布局的流程沉淀成
                <span className="font-medium text-[hsl(var(--foreground))]">
                  {" "}
                  模板化 schema + 动态渲染引擎 + AI 配置生成
                </span>
                。
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/">返回首页</Link>
            </Button>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              icon: LayoutTemplate,
              title: "固定骨架",
              text: "先沉淀企业大屏常用模板，而不是每次从零拼页面。",
            },
            {
              icon: BrainCircuit,
              title: "AI 生成配置",
              text: "让模型输出 schema，而不是不稳定的 React 页面代码。",
            },
            {
              icon: Database,
              title: "Mock 数据联动",
              text: "让 schema 和数据结构同步生成，页面立刻可预览。",
            },
            {
              icon: Sparkles,
              title: "真实业务抽象",
              text: "把你过去反复改图表和布局的工作，升级成系统能力。",
            },
          ].map((item) => (
            <Card key={item.title}>
              <CardHeader className="flex flex-row items-center gap-3 pb-3">
                <item.icon className="h-5 w-5" />
                <div className="text-sm font-medium">{item.title}</div>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                {item.text}
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 ">
          <Card>
            <CardHeader className="space-y-2">
              <p className="text-xs uppercase tracking-[0.26em] text-[hsl(var(--muted-foreground))]">
                Step 1
              </p>
              <h2 className="text-lg font-semibold">需求输入</h2>
              <p className="text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                输入一句真实业务需求，生成适合企业大屏的 dashboard schema。
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                className="min-h-56 w-full rounded-xl border border-[hsl(var(--border))] bg-transparent px-4 py-3 text-sm outline-none ring-offset-[hsl(var(--background))] placeholder:text-[hsl(var(--muted-foreground))] focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
              />
              <div className="rounded-xl bg-[hsl(var(--muted))] p-4 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                {summary}
              </div>
              <Button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full"
              >
                {loading ? "生成中..." : "生成驾驶舱 schema"}
              </Button>
            </CardContent>
          </Card>

          <WidgetEditor
            schema={schema}
            selectedSlotId={selectedSlotId}
            onUpdateWidget={handleUpdateWidget}
            onMoveWidget={handleMoveWidget}
            onDeleteWidget={handleDeleteWidget}
            onDeselect={() => setSelectedSlotId(null)}
          />

          <DataSourcePanel
            dataSource={dataSourceConfig}
            onDataSourceChange={handleDataSourceChange}
            onDataFetched={handleDataFetched}
          />

          <Card>
            <CardHeader className="space-y-2">
              <p className="text-xs uppercase tracking-[0.26em] text-[hsl(var(--muted-foreground))]">
                Step 2
              </p>
              <h2 className="text-lg font-semibold">Schema 结果</h2>
              <p className="text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                点击预览中的任意图表可编辑配置，编辑后的 schema 实时反映在此处。
              </p>
            </CardHeader>
            <CardContent>
              <pre className="max-h-[600px] overflow-auto rounded-xl bg-slate-950 p-4 text-xs leading-6 text-slate-200">
                {schemaJson}
              </pre>
            </CardContent>
          </Card>

          <div className="">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-[hsl(var(--muted-foreground))]">
                  Step 3
                </p>
                <h2 className="text-lg font-semibold">实时预览</h2>
              </div>
              <div className="text-sm text-[hsl(var(--muted-foreground))]">
                模板：{schema.template}
              </div>
            </div>
            <DashboardPreview
              schema={schema}
              data={data}
              selectedSlotId={selectedSlotId}
              onSelectSlot={(slotId) =>
                setSelectedSlotId(slotId === selectedSlotId ? null : slotId)
              }
            />
          </div>
        </section>
      </div>
    </>
  );
}
