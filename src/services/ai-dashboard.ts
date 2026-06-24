import type { DashboardPreset } from "@/types/ai-dashboard";
import { carbonDashboardPreset, dashboardPresets } from "@/mock/ai-dashboard";

const presetKeywords: Record<string, string[]> = {
  carbon: ["碳", "排放", "esg", "carbon", "环保", "绿色"],
  energy: ["能源", "能耗", "energy", "电力", "节能"],
  logistics: ["物流", "运输", "运力", "供应链", "logistics", "配送", "仓储"],
  sales: ["销售", "业绩", "sales", "营收", "零售", "营销", "渠道"],
};

function pickPreset(prompt: string): DashboardPreset {
  const normalized = prompt.toLowerCase();

  const matched = dashboardPresets.find((preset) => {
    const id = preset.schema.id;
    for (const [idFragment, keywords] of Object.entries(presetKeywords)) {
      if (id.includes(idFragment)) {
        return keywords.some((kw) => normalized.includes(kw));
      }
    }
    return false;
  });

  return matched ?? carbonDashboardPreset;
}

export async function generateDashboardByPrompt(prompt: string) {
  // Try the real AI API route first
  try {
    const response = await fetch("/api/generate-dashboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (response.ok) {
      const result = await response.json();
      if (result.schema && result.data) {
        return {
          schema: result.schema,
          data: result.data,
          promptSummary:
            result.promptSummary ||
            "AI 已根据需求生成驾驶舱配置，可预览和编辑。",
        };
      }
    }
  } catch {
    // API route not available (static export or dev server not running)
  }

  // Fallback to keyword-matching mock
  const preset = pickPreset(prompt);

  await new Promise((resolve) => setTimeout(resolve, 700));

  return {
    schema: preset.schema,
    data: preset.data,
    promptSummary: `已根据需求生成 ${preset.schema.title} 的模板化 schema（离线模式）。配置 ANTHROPIC_API_KEY 可启用真实 AI 生成。`,
  };
}
