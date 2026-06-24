# AI 驾驶舱生成平台 — 开发复盘

日期：2026-05-11

## 一、项目背景

在个人作品集站点（Next.js 16 + Pages Router）上，构建一个 **AI 数据驾驶舱生成平台**。核心思路：输入自然语言业务需求 → AI 输出结构化 `DashboardSchema` + `DashboardDataSource` → 模板引擎实时渲染企业大屏驾驶舱。

## 二、今日完成工作总览

### 新增文件（10 个）

| 文件 | 职责 |
|---|---|
| `src/types/ai-dashboard.ts` | 全部类型定义：Schema、Widget、DataSource、模板枚举 |
| `src/services/ai-dashboard.ts` | AI 生成服务：优先调 API Route，回退关键词匹配 Mock |
| `src/services/data-source.ts` | 数据源工厂：手动刷新 / 轮询，AbortController 生命周期管理 |
| `src/pages/api/generate-dashboard.ts` | Anthropic API 代理（仅 `next dev`），系统提示词定义全部类型与生成约束 |
| `src/components/ai-dashboard/widgets.tsx` | 8 个 Widget 组件：5 个 ECharts + 3 个纯 HTML，统一暗色科技蓝主题 |
| `src/components/ai-dashboard/templates.tsx` | 3 套布局模板（三栏地图 / 双栏 / 指标矩阵），模板注册表模式 |
| `src/components/ai-dashboard/render-widget.tsx` | 通用渲染器：slotId 上下文 + 选中高亮 |
| `src/components/ai-dashboard/dashboard-preview.tsx` | 预览入口：查模板注册表，注入 slots/data 渲染 |
| `src/components/ai-dashboard/widget-editor.tsx` | 可视化编辑器：改类型/标题/dataKey、移动槽位、删除 |
| `src/components/ai-dashboard/data-source-panel.tsx` | 数据源面板：Mock/URL 切换、手动刷新、轮询控制 |
| `src/mock/ai-dashboard.ts` | 4 套预设（碳阻迹/能源/物流/销售），schema + data 成对 |

### 修改文件（2 个）

| 文件 | 变更 |
|---|---|
| `src/pages/ai-dashboard.tsx` | 主页面：需求输入 → WidgetEditor → DataSource → Schema JSON → 实时预览 |
| `src/pages/index.tsx` | 首页入口链接 |

### 安装依赖

- `@anthropic-ai/sdk` — Anthropic API 调用
- `echarts-for-react` — ECharts React 封装

## 三、四个阶段实现细节

### Phase 1：真实 AI 集成

- **API Route** (`/api/generate-dashboard`)：长达 ~80 行的系统提示词，详细定义了 8 种 Widget 类型、对应数据形状、3 种模板选型规则。默认使用 `claude-haiku-4-5-20251001`，通过 `AI_DASHBOARD_MODEL` 环境变量可切换。
- **Service 层**：`generateDashboardByPrompt()` 优先 POST 到 API Route，网络不通时自动降级为关键词匹配 Mock（700ms 模拟延迟）。
- **约束**：生产环境 `output: "export"` 静态导出，API Route 不可用，自动 fallback。

### Phase 2：多模板布局系统

- 定义 `TemplateDefinition` 类型（id / label / description / slots / render）。
- `templateRegistry` 注册 3 套布局，每套布局将 8 个 slotId 映射到不同的 grid 位置：
  - `three-column-map-dashboard`：`xl:grid-cols-[320px_1fr_320px]` 三栏 + 底行三格
  - `two-column-dashboard`：`xl:grid-cols-[1fr_420px]` 双栏 + 底行三格
  - `metrics-grid-dashboard`：顶部 4 指标卡横排 + 中部全宽地图 + 底行三格
- `renderWidget` 共享组件：用 `<button>` 包裹每个 widget，选中态 ring-2 + 缩放 + 光晕。

### Phase 3：可视化 Schema 编辑器

- 三种状态：未选中（引导文案）→ 空槽位（添加按钮）→ 已填充（完整编辑器）。
- 可编辑：图表类型（select）、标题（text）、dataKey（monospace text）。
- 移动：展示其余 7 个槽位的按钮，点击交换 slot 中的 widget。
- 删除：红色按钮，移除 widget。

### Phase 4：真实数据源对接

- `createDataSourceFetcher()` 工厂函数，管理 `AbortController` + `setInterval` 生命周期。
- 手动刷新一次 / 开始轮询 / 停止轮询。
- DataSourcePanel：Mock/URL 两档切换，URL 输入框，刷新间隔配置（最低 5s）。
- 轮询间隔可通过 UI 配置，`stop()` 在组件卸载或切换回 Mock 时自动清理。

## 四、今日修复的 Bug

### 切换图表类型页面崩溃

**原因**：WidgetEditor 切换图表类型时，`dataKey` 保持不变，但新旧 Widget 期望的数据形状不同。例如 `barChart`（数据是 `RankItem[]`）切换为 `table`（数据应是 `TableData`），`TableWidget` 对 `undefined` 调用 `.map()` 直接抛出 TypeError。

**修复**：

1. **widgets.tsx** — 全部 8 个 Widget 组件添加数据形状守卫：
   - 数组型（BarChart / LineChart / StackBarChart / ChinaMap）：`!Array.isArray(data) || data.length === 0`
   - 对象型（SummaryPanel / Table）：检查 `data.rank`、`data.columns` 等必需字段
   - 值型（GaugePanel / MetricCard）：检查 `data.value` 类型
   - 不匹配时显示「数据格式不匹配，需要 XXX」提示，不再崩溃

2. **widget-editor.tsx** — `WIDGET_TYPES` 新增 `defaultDataKey` 字段，切换类型时自动更新 dataKey 为对应类型的默认值，从源头减少不匹配概率。

## 五、项目当前状态

- 所有代码未提交，处于暂存区。
- `pnpm build` 通过，所有页面正确生成。
- API Route 仅在 `next dev` 可用，生产构建自动回退 Mock。

## 六、架构图示

```
用户输入 Prompt
       │
       ▼
┌─────────────────────┐
│  ai-dashboard.ts    │  AI 生成服务
│  (API Route / Mock) │
└────────┬────────────┘
         │ DashboardSchema + DashboardDataSource
         ▼
┌─────────────────────┐
│  ai-dashboard.tsx   │  主页面状态管理
└──┬──────┬──────┬────┘
   │      │      │
   ▼      ▼      ▼
┌──────┐┌──────┐┌──────────────┐
│Widget││Data  ││Dashboard     │
│Editor││Source││Preview       │
│      ││Panel ││(template     │
│      ││      ││ registry)    │
└──────┘└──────┘└──┬──────┬────┘
                    │      │
                    ▼      ▼
              ┌─────────┐┌──────────┐
              │ 3 套    ││ 8 个     │
              │ 布局模板││ Widget   │
              │         ││ 组件     │
              └─────────┘└──────────┘
```
