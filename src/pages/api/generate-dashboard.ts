import type { NextApiRequest, NextApiResponse } from "next";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are a dashboard schema generator for enterprise data cockpits. Generate a complete, realistic dashboard configuration in JSON based on the user's business requirement.

## Output format

You MUST output valid JSON with exactly this structure:

{
  "schema": {
    "id": "string (kebab-case unique id)",
    "title": "string (Chinese dashboard title)",
    "template": "three-column-map-dashboard" | "two-column-dashboard" | "metrics-grid-dashboard",
    "theme": { "mode": "dark", "skin": "blue-tech" | "emerald-grid" },
    "filters": [{ "key": "string", "label": "string", "type": "select", "value": "string" }],
    "slots": {
      "leftTop": { "type": "metricCard", "title": "string", "dataKey": "string" },
      "leftMiddle": { "type": "barChart", "title": "string", "dataKey": "string" },
      "centerMain": { "type": "chinaMap", "title": "string", "dataKey": "string" },
      "rightTop": { "type": "summaryPanel", "title": "string", "dataKey": "string" },
      "rightMiddle": { "type": "gaugePanel", "title": "string", "dataKey": "string" },
      "bottomLeft": { "type": "lineChart", "title": "string", "dataKey": "string" },
      "bottomCenter": { "type": "stackBarChart", "title": "string", "dataKey": "string" },
      "bottomRight": { "type": "table", "title": "string", "dataKey": "string" }
    }
  },
  "data": {
    "<dataKey>": <matching data shape, see below>
  },
  "promptSummary": "string (one-sentence summary of the generated dashboard)"
}

## Slot filling rules
- You MUST fill ALL 8 slots. Every slot is required.
- Choose widget types appropriate to the slot position and business domain.
- Each dataKey MUST match a key in the "data" object.

## Widget data shapes (the data value for each dataKey MUST match the widget type)

metricCard → { "icon": "string (1-4 chars emoji or short text)", "value": "string (formatted number)", "unit": "string", "deltaLabel": "string (同比/环比)", "deltaValue": "string (+X% or -X%)" }

barChart → [{ "label": "string", "value": number }] (5-6 items, descending order)

lineChart → [{ "label": "string (like 1月,3月...)", "value": number, "compare": number }] (6 items, bimonthly labels)

stackBarChart → [{ "label": "string (org/department name)", "values": [{ "label": "string", "value": number, "color": "string (hex)" }] }] (3-5 items, 2-4 segments each, use distinct colors like #5b8ff9, #5ad8a6, #f6bd16, #ff9845)

chinaMap → [{ "name": "string (city/province name)", "x": number (0-100, rough longitude %), "y": number (0-100, rough latitude %), "value": number (magnitude) }] (5-7 points, realistic geographic positions)

summaryPanel → { "headline": "string", "subline": "string", "metrics": [{ "label": "string", "value": "string" }] (exactly 2), "rank": [{ "label": "string", "value": number }] (3 items, descending) }

gaugePanel → { "value": number (0-100), "totalLabel": "string", "detail": "string" }

table → { "columns": ["string", "string", "string"], "rows": [["string", "string", "string"]] } (4-6 rows)

## Generation guidelines
- Generate content in Chinese that is RELEVANT to the user's business prompt
- Use realistic, domain-appropriate numbers (not all zeros or random)
- Dashboard title should reflect the specific business domain
- Filters should match common dimensions for the domain (e.g., year, month, org unit)
- Map points should have geographically realistic x/y positions
- Theme: use "blue-tech" for general/carbon/ESG, "emerald-grid" for energy/sustainability

## Template selection
- Choose "three-column-map-dashboard" for: carbon/ESG/environmental dashboards, general enterprise cockpits with map + metrics + rankings
- Choose "two-column-dashboard" for: logistics/supply chain, operational dashboards with fewer metric cards and a prominent map
- Choose "metrics-grid-dashboard" for: sales/performance management, dashboards emphasizing KPI cards across the top with a full-width map`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body as { prompt?: string };

  if (!prompt?.trim()) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error:
        "ANTHROPIC_API_KEY not configured. Create a .env.local file with ANTHROPIC_API_KEY=your-key to enable AI generation.",
    });
  }

  try {
    const anthropic = new Anthropic({ apiKey });

    const model =
      process.env.AI_DASHBOARD_MODEL || "claude-haiku-4-5-20251001";

    const message = await anthropic.messages.create({
      model,
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Generate a complete enterprise dashboard configuration for this business requirement:\n\n${prompt}\n\nOutput ONLY valid JSON, no markdown fences, no commentary.`,
        },
      ],
    });

    const text =
      message.content.find((block) => block.type === "text")?.text || "";

    // Strip markdown fences if model wraps the JSON
    const json = text.replace(/^```json?\s*/i, "").replace(/\s*```$/i, "").trim();

    let result: unknown;
    try {
      result = JSON.parse(json);
    } catch {
      return res.status(500).json({
        error: "AI response was not valid JSON",
        raw: text.slice(0, 500),
      });
    }

    const parsed = result as Record<string, unknown>;

    if (!parsed.schema || !parsed.data) {
      return res.status(500).json({
        error:
          'AI response missing required "schema" or "data" fields',
        raw: text.slice(0, 500),
      });
    }

    return res.status(200).json(parsed);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    console.error("AI generation error:", message);
    return res.status(500).json({
      error: `AI generation failed: ${message}`,
    });
  }
}
