export type PortfolioCategory =
  | "Data Cockpit"
  | "Management System"
  | "Portal Website"
  | "Mini Program Page";

export type PortfolioItem = {
  slug: string;
  title: string;
  category: PortfolioCategory;
  summary: string;
  timeframe?: string;
  role?: string;
  impact?: string;
  tags: string[];
  techStack: string[];
  highlights: string[];
  retrospective: string[];
  details: {
    challenge: string;
    solution: string;
    result: string;
  };
  coverColor: string;
  images?: string[];
};

export const portfolio: PortfolioItem[] = [
  {
    slug: "data-cockpit-portal",
    title: "联通5G设备碳足迹评估体系驾驶舱",
    category: "Data Cockpit",
    summary: "数据驾驶舱监控看板，集成地图下钻、趋势分析、产品对比等多维分析",
    timeframe: "2025",
    role: "前端开发",
    impact:
      "直观展示业务模块统计数量，帮助客户快速了解业务数据，制定有效的决策。",
    tags: ["ECharts", "React", "已交付"],
    techStack: ["React", "TypeScript", "ECharts", "Tailwind CSS", "Vite"],
    highlights: [
      "集成地图下钻、趋势分析、产品对比等",
      "设计响应式数据面板，适应不同屏幕尺寸",
      "可配置化图表系统",
    ],
    retrospective: [
      "留意数据密度与视觉层级，避免信息过载",
      "强化筛选与交互反馈，提升操作效率",
      "后续希望增加更多图表导出与自定义布局功能",
    ],
    details: {
      challenge:
        "该项目需要在一个页面展示业务统计个数，同时确保信息层级清晰，避免用户迷失。",
      solution:
        "通过卡片化布局、渐进式加载和数据摘要视图，将关键指标优先展示，并用颜色/图形强化对比。",
      result:
        "最终产品获得客户认可，用户在关键指标页面的平均停留时间提升了18%。",
    },
    coverColor: "portfolio-data-cockpit",
    images: ["/images/portfolio/5g.jpg", "/images/portfolio/5g01.jpg"],
  },
  {
    slug: "data-cockpit-analytics",
    title: "中煤碳排放管理平台驾驶舱",
    category: "Data Cockpit",
    summary:
      "基于React+TypeScript的集团碳排放数据可视化管理系统，实现电力和化工行业碳排放数据的实时监控、上报跟踪和配额履约管理",
    timeframe: "2024",
    role: "前端开发",
    impact:
      "支持集团碳资产管理部门实时掌握下属企业碳排放状况、数据上报进度和配额履约情况",
    tags: ["ECharts", "React", "已交付"],
    techStack: [
      "React 17.0.2",
      "TypeScript 4.4.4",
      "ECharts 5.2.2",
      "Axios 0.24.0",
      "Moment.js 2.29.1",
    ],
    highlights: [
      "多维度数据可视化",
      "电力行业和化工行业的数据无缝切换",
      "实现多屏幕尺寸的自适应展示",
    ],
    retrospective: [
      "图表组件封装良好（如ElectricityChart、AppearPie），但部分业务逻辑耦合度较高，建议进一步拆分",
      "TypeScript类型定义完善，但部分文件存在注释不一致的问题，建议统一代码风格",
      "缺少单元测试和集成测试，建议补充关键业务逻辑的测试用例",
    ],
    details: {
      challenge: "需要处理海量数据并提供实时分析，同时保证系统响应速度。",
      solution: "采用数据分层缓存、虚拟滚动和按需加载策略，优化前端渲染性能。",
      result: "系统查询响应时间从平均 3s 降低到 0.8s，用户满意度显著提升。",
    },
    coverColor: "portfolio-data-cockpit",
    images: [
      "/images/portfolio/china.jpg",
      "/images/portfolio/china/wechat_2026-05-06_191718_569.png",
    ],
  },
  {
    slug: "data-cockpit-monitoring",
    title: "投资公司碳资产数字化驾驶舱",
    category: "Data Cockpit",
    summary: "根据年度统计不同公司的 ccer、碳减排、绿证等碳资产数据。",
    timeframe: "2025",
    role: "前端开发",
    impact: "故障发现时间缩短 60%，系统稳定性大幅提升。",
    tags: ["ECharts", "React", "AI"],
    techStack: ["React", "TypeScript", "WebSocket", "Ant Design"],
    highlights: [
      "实现实时数据推送和告警机制",
      "构建可自定义的监控面板",
      "支持历史数据回放和趋势分析",
    ],
    retrospective: [
      "实时数据更新需要处理好节流和防抖",
      "告警信息的展示需要避免视觉疲劳",
      "未来可以集成更多自动化运维功能",
    ],
    details: {
      challenge:
        "需要同时监控多个系统，数据量大且更新频繁，要求低延迟和高可靠性。",
      solution: "数据分片渲染",
      result:
        "系统故障平均恢复时间从 45 分钟降低到 15 分钟，运维效率显著提高。",
    },
    coverColor: "portfolio-data-cockpit",
    images: [
      "/images/portfolio/cecc.jpg",
      "/images/portfolio/cecc/wechat_2026-05-06_223435_479.jpg",
    ],
  },
  {
    slug: "data-cockpit-changan",
    title: "CMAL数字化驾驶舱",
    category: "Data Cockpit",
    timeframe: "2025",
    role: "前端开发",
    tags: ["ECharts", "React", "TypeScript"],
    summary: "实时展示企业碳排放、产品碳足迹、指标执行等多维度碳管理数据。",
    impact:
      "支持多维度筛选，帮助决策者快速掌握碳排放趋势、减排项目进展和指标执行情况。",
    techStack: [
      "React 18.2.0",
      "TypeScript 4.9.5",
      "Ant Design 4.24.8",
      "ECharts 5.4.2",
      "Redux Toolkit",
      "React Router DOM 6.8.2",
      "Axios",
      "Less",
      "Vite 4.1.4",
    ],
    highlights: [
      "采用响应式设计，支持全屏展示，使用 scalePage() 函数实现屏幕自适应缩放",
      "集成中国地图可视化组件，通过散点图动态展示各城市碳排放分布，支持省份级数据钻取",
      "模块化组件架构，将排放源排名、产品碳足迹、指标情况等8个核心功能拆分为独立组件，便于维护和扩展",
      "使用 ECharts 实现多种图表类型（柱状图、折线图、散点地图、进度环图），统一深蓝色科技感视觉风格",
      "支持多维度数据筛选（年份、月份、组织），实现数据联动更新，提供实时同比分析和趋势预测",
    ],
    retrospective: [
      "建议引入 React Context 或 Redux 管理全局筛选状态，减少 prop drilling",
      "存在大量硬编码的 rem 单位，建议使用 CSS 变量或主题配置统一管理设计规范",
      "地图数据文件（allChina.json、省份JSON）体积较大，建议按需加载或采用动态导入优化首屏加载性能",
    ],
    details: {
      challenge: "需要同时展示8个不同维度的碳数据图表",
      solution:
        "采用模块化组件架构，主组件 dateView/index.tsx 作为容器，负责数据获取和状态管理，子组件专注于图表渲染",
      result: "模块化组件架构和清晰的代码组织结构，便于后续功能扩展和维护",
    },
    coverColor: "portfolio-data-cockpit",
    images: ["/images/portfolio/changan/wechat_2026-05-08_170703_055.jpg"],
  },
  {
    slug: "data-cockpit-bjbank",
    title: "绿色银行数字化驾驶舱",
    category: "Data Cockpit",
    timeframe: "2025",
    role: "前端开发",
    tags: ["ECharts", "React", "TypeScript"],
    summary:
      "北京银行零碳网点大屏展示系统，集成绿色金融、碳交易、能源市场等多维度数据可视化",
    impact: "为银行网点提供实时环境与绿色金融数据监控，提升银行可持续发展形象",
    techStack: [
      "React 18",
      "TypeScript",
      "Vite",
      "Ant Design",
      "ECharts",
      "Axios",
      "React Router DOM",
      "Sass",
      "vite-plugin-zip-pack",
    ],
    highlights: [
      "多数据源集成（国家统计局、央行官网、碳交易平台等）",
      "丰富的数据可视化（柱状图、线图、饼图、表格）",
      "大屏响应式适配方案",
      "多环境构建配置（开发、测试、生产）",
      "自动打包压缩部署",
    ],
    retrospective: [
      "大屏适配需要考虑多种分辨率和屏幕比例",
      "数据可视化组件需要统一的设计规范",
      "API请求需要完善的错误处理和取消机制",
      "可考虑增加数据缓存和离线支持",
      "图表性能优化对于大屏展示至关重要",
    ],
    details: {
      challenge:
        "需要集成多个第三方数据源，实现大屏响应式适配，处理大量数据可视化渲染，同时保证系统性能和稳定性",
      solution:
        "采用React + ECharts构建可视化系统，使用Vite构建工具提升开发效率，通过ResizeObserver实现响应式适配，配置多环境部署和自动打包压缩",
      result:
        "成功构建完整的零碳网点大屏系统，实现6大模块数据展示，支持多环境部署，提供流畅的数据可视化体验",
    },
    coverColor: "portfolio-data-cockpit",
    images: ["/images/portfolio/bjbank/wechat_2026-05-07_115427_347.jpg"],
  },
  {
    slug: "management-system-suite",
    title: "LVMH Beauty 碳数字化管理平台",
    category: "Management System",
    timeframe: "2024",
    role: "前端开发",
    tags: ["单点登录", "Ant Design", "Workflow"],
    summary:
      "LVMH Beauty企业碳管理平台，通过数据可视化、权限控制和国际化支持，实现企业碳排放数据的全面管理和分析",
    impact:
      "为企业提供完整的碳排放数据管理解决方案，支持多维度数据分析和可视化",
    techStack: [
      "React 18",
      "TypeScript",
      "Vite",
      "Ant Design 5",
      "Redux Toolkit",
      "ECharts",
      "Formily",
      "Less",
      "CSS Modules",
    ],
    highlights: [
      "ECharts数据可视化系统，支持堆叠柱状图、饼图、折线图等多种图表类型，实现碳排放数据的多维度展示",
      "三层权限控制架构（路由级、菜单级、按钮级），基于React Context API实现精细化权限管理",
      "AES-256-CBC + RSA-2048混合加密方案，确保登录数据和业务数据的安全传输",
      "自定义Hooks生态，封装useAsyncEnums、useDownloadHandler、useTableScrollHeight等通用业务逻辑",
      "完整国际化方案，集成Kiwi Intl和Ant Design Locale，支持多语言动态切换",
    ],
    retrospective: [
      "数据可视化组件可以进一步抽象为通用图表库，提高代码复用性",
      "权限系统可以考虑引入更细粒度的数据权限控制，而不仅仅是UI层面的权限",
      "可以增加更多的单元测试和集成测试，提高代码质量和稳定性",
    ],
    details: {
      challenge:
        "需要处理复杂的碳排放数据结构，支持多维度数据分析和可视化，同时确保系统的安全性和国际化支持",
      solution:
        "采用React 18 + TypeScript构建现代化前端架构，使用ECharts实现数据可视化，通过Formily处理复杂表单，实现AES+RSA混合加密保障安全，集成国际化方案支持多语言",
      result:
        "成功构建功能完整的企业碳管理平台，实现数据填报、分析、权限管理、国际化等核心功能，为企业碳排放管理提供可靠的技术支撑",
    },
    coverColor: "portfolio-management-system",
    images: [
      "/images/portfolio/lvmh01.jpg",
      "/images/portfolio/lvmh/wechat_2026-05-06_192435_592.jpg",
      "/images/portfolio/lvmh/wechat_2026-05-06_192608_350.png",
      "/images/portfolio/lvmh/wechat_2026-05-06_192649_782.png",
    ],
  },
  {
    slug: "management-system-mind",
    title: "曼德碳数字化运营平台",
    category: "Management System",
    summary:
      "曼德碳数字化运营平台，企业碳管理综合解决方案，涵盖员工碳账户、产品碳足迹、组织碳核算、供应链碳管理等核心业务模块",
    timeframe: "2024",
    role: "前端开发",
    impact:
      "为企业提供碳排放数据管理和分析平台，助力企业实现碳中和目标和可持续发展战略。",
    tags: ["驻场办公", "钉钉", "Workflow"],
    techStack: [
      "React 17",
      "TypeScript 4.7",
      "Ant Design 4.21",
      "Redux",
      "React Router 5.3",
      "i18next",
      "ECharts 5.2",
      "Axios 0.27",
      "Formik",
      "Day.js",
      "ExcelJS",
      "jsPDF",
      "钉钉SDK集成",
      "Vite构建工具",
    ],
    highlights: [
      "钉钉企业应用深度集成，支持免登认证",
      "完整的中英文国际化支持体系",
      "基于ECharts的丰富数据可视化图表",
      "多环境配置管理（开发/测试/预发布/生产）",
      "模块化碳管理业务架构（员工/产品/组织/供应链）",
    ],
    retrospective: [
      "需要优化首屏加载性能，减少bundle体积",
      "可考虑引入微前端架构提升大型应用可维护性",
      "建议增加单元测试覆盖率，提升代码质量",
      "可优化权限管理机制，提供更细粒度的权限控制",
    ],
    details: {
      challenge:
        "需要构建一个涵盖多个碳管理业务模块的复杂企业级应用，支持钉钉免登、多语言国际化、复杂数据可视化，同时要保证多环境部署和良好的用户体验",
      solution:
        "采用React 17 + TypeScript + Ant Design技术栈，通过Redux进行状态管理，使用i18next实现国际化，集成ECharts进行数据可视化，通过环境变量管理多环境配置，深度集成钉钉SDK实现企业级认证",
      result:
        "成功构建功能完整的碳管理平台，支持员工碳账户、产品碳足迹、组织碳核算、供应链碳管理等核心业务，实现钉钉免登和中英文双语支持，为企业提供专业的碳排放数据管理解决方案",
    },
    coverColor: "portfolio-management-system",
    images: [
      "/images/portfolio/mind.jpg",
      "/images/portfolio/mind/wechat_2026-05-07_120635_906.jpg",
      "/images/portfolio/mind/wechat_2026-05-07_120933_159.jpg",
      "/images/portfolio/mind/wechat_2026-05-07_121042_916.png",
      "/images/portfolio/mind/wechat_2026-05-07_121126_496.jpg",
      "/images/portfolio/mind/wechat_2026-05-07_121218_748.png",
    ],
  },
  {
    slug: "management-system-5g",
    title: "联通5G设备碳足迹评估体系",
    category: "Management System",
    summary:
      "企业级5G设备碳足迹管理平台，提供全生命周期碳足迹评估、数据分析和可视化展示的综合解决方案",
    timeframe: "2024",
    role: "前端负责人",
    impact:
      "帮助企业精准量化和管理5G设备碳排放，支持碳减排决策，提升环保管理效率",
    tags: ["客户交付培训", "Ant Design", "Workflow"],
    techStack: [
      "React",
      "TypeScript",
      "Vite",
      "Ant Design",
      "Redux Toolkit",
      "Formily",
      "ECharts",
      "AntV G6",
    ],
    highlights: [
      "支持JSON配置自定义数据分析视图",
      "数据驾驶舱监控看板，多维分析",
      "AntV G6实现节点拖拽和缩略图导航",
    ],
    retrospective: [
      "图表配置系统需要进一步优化用户体验，降低配置复杂度",
      "数据驾驶舱的响应式布局需要考虑更多设备兼容性",
      "权限控制逻辑需要更细粒度的设计，支持动态权限分配",
      "模拟数据系统可以进一步自动化，减少手动维护成本",
    ],
    details: {
      challenge:
        "需要深度集成多种图表库（ECharts、AntV G6），实现复杂的数据可视化需求，同时保持系统的高性能和良好的用户体验",
      solution:
        "采用React + TypeScript构建前端框架，使用Redux Toolkit进行状态管理，通过Formily实现复杂表单配置，ECharts和AntV G6分别处理图表和流程图，设计可配置化图表系统支持JSON配置",
      result:
        "成功构建完整的5G设备碳足迹管理平台，实现数据采集、分析、可视化的全流程管理，支持灵活的图表配置和权限控制，提升企业碳管理效率",
    },
    coverColor: "portfolio-management-system",
    images: [
      "/images/portfolio/unicom.jpg",
      "/images/portfolio/unicom/wechat_2026-05-06_194024_501.jpg",
      "/images/portfolio/unicom/wechat_2026-05-06_194139_448.png",
      "/images/portfolio/unicom/wechat_2026-05-06_194353_049.png",
    ],
  },
  {
    slug: "management-system-webank",
    title: "微众银行碳数字化管理平台",
    category: "Management System",
    summary:
      "银行企业碳核算管理系统，是一个基于React的碳排放数据管理和分析平台，提供企业碳核算全流程管理、数据可视化看板和系统管理功能。",
    timeframe: "2024",
    role: "前端开发",
    impact: "为企业提供完整的碳排放核算解决方案，支持GHG和ISO双重标准",
    tags: ["单点登录", "Ant Design", "文件预览"],
    techStack: [
      "React 18.2.0",
      "TypeScript 4.9.5",
      "Vite 4.1.4",
      "Ant Design 4.24.8",
      "ECharts 5.4.3",
      "Formily 2.2.20",
      "Axios 1.2.1",
      "Less 4.1.3",
      "ESLint + Prettier",
      "Husky + lint-staged",
    ],
    highlights: [
      "智能数据可视化",
      "通过Formily表单框架和批量导入功能",
      "自动化API生成",
    ],
    retrospective: [
      "Ant Design Pro Components提供了丰富的企业级组件，减少了重复开发",
      "通过路由模块化设计，将企业碳核算、因子管理、运营数据等业务模块清晰分离",
      "项目缺少详细的README和开发文档，新成员上手成本较高，建议补充技术文档和业务流程说明",
    ],
    details: {
      challenge: "排放源清单数据量大，表格和图表渲染性能要求高",
      solution:
        "使用ECharts的按需加载和虚拟滚动技术，表格采用分页加载，图表数据做聚合处理",
      result: "页面加载时间控制在2秒内，用户体验流畅",
    },
    coverColor: "portfolio-management-system",
    images: [
      "/images/portfolio/webank/wechat_2026-05-06_190800_394.jpg",
      "/images/portfolio/webank/wechat_2026-05-06_190915_149.jpg",
      "/images/portfolio/webank/wechat_2026-05-06_191011_676.png",
      "/images/portfolio/webank/wechat_2026-05-06_191212_407.png",
    ],
  },
  {
    slug: "portal-website-carbonstop",
    title: "碳阻迹官网",
    category: "Portal Website",
    summary:
      "基于 Next.js 14 构建的企业级碳中和服务平台官网，涵盖碳计算、碳核算、双碳洞察、ESG服务、碳减排、碳数据库等核心业务模块，支持中英文双语，完美适配移动端和PC端。",
    timeframe: "2024",
    role: "前端负责人",
    impact:
      "通过设备指纹识别实现个性化服务；SEO优化提升搜索引擎可见度，帮助更多企业了解和使用碳管理服务。",
    tags: ["门户网站", "低碳动画", "已上线"],
    techStack: [
      "Next.js 14.2.3",
      "React 18",
      "TypeScript 5",
      "TailwindCSS 3.4.1",
      "Ant Design 5.17.4",
      "next-intl 3.14.1",
      "Axios 1.7.2",
      "ahooks 3.8.0",
      "Swiper 11.1.4",
      "crypto-js",
      "@fingerprintjs/fingerprintjs",
      "@uiw/react-baidu-map",
      "animate.css",
    ],
    highlights: [
      "移动端/PC端组件分离架构，每个页面独立维护 Mobile.tsx 和 PC.tsx",
      "基于 next-intl 的完整国际化方案，支持中英文双语动态切换",
      "智能中间件路由系统，自动识别设备类型并映射菜单ID",
      "SEO优化：动态生成 sitemap.xml，支持多语言路径",
    ],
    retrospective: [
      "中间件统一处理设备识别和路由映射，避免了每个页面重复判断",
      "国际化方案需要提前规划，避免后期重构",
      "CDN图片优化显著提升了页面加载速度，特别是在移动端",
      "动态生成 sitemap 需要考虑API稳定性，做好错误处理",
    ],
    details: {
      challenge:
        "项目需要同时支持中英文双语、移动端和PC端双端适配，包含碳计算、碳核算、双碳洞察等多个复杂业务模块，要求高性能、高可用性，同时需要考虑SEO优化和数据安全。",

      solution:
        "采用 Next.js 14 + TypeScript + TailwindCSS 技术栈，中间件统一处理设备识别和路由映射；配置多个CDN域名优化图片加载；使用 next-sitemap 动态生成站点地图；",

      result:
        "成功构建了功能完善、性能优异的企业级碳中和综合服务平台，支持中英文双语和多设备适配；为企业用户提供了专业、便捷的碳管理服务体验。",
    },
    coverColor: "portfolio-mini-program",
    images: [
      "/images/portfolio/carbonstop/website/wechat_2026-05-08_174503_982.jpg",
      "/images/portfolio/carbonstop/website/wechat_2026-05-08_174630_814.jpg",
      "/images/portfolio/carbonstop/website/wechat_2026-05-08_174703_569.png",
    ],
  },
  {
    slug: "portal-website-gver",
    title: "gver官网",
    category: "Portal Website",
    summary:
      "GVER官网是一个基于React 18和TypeScript的绿色信用项目展示平台，提供项目公开公示、注销查询、审定机构展示等核心功能。",
    timeframe: "2024",
    role: "前端负责人",
    impact: "提升绿色信用透明度",
    tags: ["门户网站"],
    techStack: [
      "React 18",
      "TypeScript",
      "Vite",
      "Ant Design 5",
      "Pro Components",
      "Redux Toolkit",
      "React Router 6",
      "Formily",
      "ECharts",
      "Axios",
    ],
    highlights: [
      "使用Vite构建工具提升开发体验和构建性能",
      "采用Ant Design Pro Components实现企业级表格和表单",
      "TypeScript全栈类型安全保证代码质量",
      "多环境配置管理支持开发、测试、预发布、生产环境",
      "完善的代码规范体系（ESLint + Prettier + Husky）",
      "响应式设计适配多端访问",
    ],
    retrospective: [
      "组件化设计提高代码复用性",
      "API接口自动生成减少手动维护成本",
      "状态管理集中化便于维护",
      "路由权限控制确保系统安全性",
    ],
    details: {
      challenge: "多环境配置管理",
      solution: "Vite环境变量配置",
      result: "构建效率提升50%",
    },
    coverColor: "portfolio-mini-program",
    images: [
      "/images/portfolio/gver/website/wechat_2026-05-08_183105_169.jpg",
      "/images/portfolio/gver/website/wechat_2026-05-08_184052_071.jpg",
      "/images/portfolio/gver/website/wechat_2026-05-08_184123_051.jpg",
    ],
  },
  {
    slug: "mini-program-commerce",
    title: "碳阻迹碳账户",
    category: "Mini Program Page",
    summary:
      "为不同类型企业客户提供定制化的碳账户小程序页面，展示碳排放数据、低碳活动配置。",
    timeframe: "2025",
    role: "前端开发",
    impact: "帮助定制化部门实现快速响应客户对碳账户的交付时间需求。",
    tags: ["WXUI", "微信小程序", "Mobile UX"],
    techStack: ["WeChat API", "WXUI"],
    highlights: [
      "多主题页面设计，适配不同品牌风格",
      "低碳活动配置灵活，并接入第三方飞蚂蚁等接口",
      "实现客户自定义碳账户的交付时间需求",
    ],
    retrospective: [
      "小程序页面需要兼顾流畅与体积控制",
      "注意触摸交互与视觉反馈的一致性",
      "后续可增加更多本地缓存优化和离线提示",
    ],
    details: {
      challenge: "这类页面对首屏速度和交互响应要求极高，页面空间有限。",
      solution: "采用轻量组件、复用 UI 规则，并优化资源请求，保证体验顺畅。",
      result: "页面加载时间控制在 1.2s 内，并获得业务侧好评。",
    },
    coverColor: "portfolio-mini-program",
    images: [
      "/images/portfolio/carbonstop/wechat_2026-05-06_202244_301.png",
      "/images/portfolio/carbonstop/2026-05-06_202318_505.jpg",
      "/images/portfolio/carbonstop/2026-05-06_202328_541.jpg",
    ],
  },
  {
    slug: "mini-program-vip-carbon",
    title: "vip碳账户",
    category: "Mini Program Page",
    summary:
      "员工碳账户是一个基于Taro框架开发的跨平台环保应用，通过游戏化机制激励员工参与碳减排活动，支持H5、微信小程序等多端部署",
    timeframe: "2025",
    role: "前端开发",
    impact:
      "通过减碳任务、PK竞技、积分商城等游戏化设计，建立可持续的企业文化。",
    tags: ["Taro", "企微小程序", "Mobile UX"],
    techStack: [
      "Taro 3.6.6",
      "React 18",
      "TypeScript",
      "taro-ui",
      "echarts",
      "@sentry/react",
    ],
    highlights: [
      "创新引入PK竞技系统、积分商城、等级体系",
      "构建从减碳任务到积分获取、商城兑换的完整闭环",
      "使用ECharts实现碳减排量趋势图表",
    ],
    retrospective: [
      "通过CarbonReduction、PKDialog、Echarts等可复用组件的抽象",
      "全项目TypeScript覆盖，配合完善的类型定义文件，有效减少了运行时错误",
      "通过VConsole调试工具、Sentry错误监控、图片懒加载等技术手段",
    ],
    details: {
      challenge: "统一架构与多端适配方案",
      solution:
        "采用Taro框架实现跨平台统一开发,使用高德地图JS API实现精确定位和轨迹追踪",
      result: "用户参与度和活跃度显著提升，为企业ESG目标提供了有力支撑。",
    },
    coverColor: "portfolio-mini-program",
    images: [
      "/images/portfolio/vip/wechat_2026-05-06_203254_264.png",
      "/images/portfolio/vip/wechat_2026-05-06_203353_938.png",
      "/images/portfolio/vip/wechat_2026-05-06_203434_240.png",
      "/images/portfolio/vip/wechat_2026-05-06_203531_179.png",
    ],
  },
  {
    slug: "mini-program-ysf",
    title: "云闪付碳账户",
    category: "Mini Program Page",
    summary:
      "通过游戏化的方式，让用户在日常生活中参与低碳行动，为环境保护贡献力量",
    timeframe: "2025",
    role: "前端负责人",
    impact:
      "推广低碳环保理念，提升云闪付用户活跃度，收集用户行为数据用于后续优化",
    tags: ["vue-cup-ui", "云闪付小程序", "Mobile UX"],
    techStack: ["Vue 3", "vue-cup-ui", "TypeScript", "Pinia"],
    highlights: ["云闪付 SDK 集成", "第三方登录", "Git Hooks"],
    retrospective: [
      "小程序页面需要兼顾流畅与体积控制",
      "注意触摸交互与视觉反馈的一致性",
      "后续可增加更多本地缓存优化和离线提示",
    ],
    details: {
      challenge: "这类页面对首屏速度和交互响应要求极高，页面空间有限。",
      solution: "采用轻量组件、复用 UI 规则，并优化资源请求，保证体验顺畅。",
      result: "页面加载时间控制在 1.2s 内，并获得业务侧好评。",
    },
    coverColor: "portfolio-mini-program",
    images: ["/images/portfolio/ysf/wechat_2026-05-06_205100_181.jpg"],
  },
  {
    slug: "mini-program-mind-carbon",
    title: "mind碳账户",
    category: "Mini Program Page",
    summary:
      "mind碳账户项目是一个成功的企业级移动端应用案例，主要功能包括员工积分管理、团队排行榜、积分激励机制等。",
    timeframe: "2025",
    role: "前端负责人",
    impact: "通过积分激励机制，促进员工环保行为，团队排行榜增强企业凝聚力。",
    tags: ["Vant", "钉钉应用", "Mobile UX"],
    techStack: ["Vue 3", "Vant", "TypeScript", "dingtalk-jsapi", "html2canvas"],
    highlights: [
      "深度集成钉钉企业应用，实现免登认证",
      "Vant组件库提供优秀的移动端体验",
      "TypeScript强类型支持，提升代码质量",
    ],
    retrospective: [
      "既支持传统Vue CLI，又拥抱现代Vite",
      "混合使用Vue SFC和TSX可能增加维护成本",
      "缺少单元测试配置",
    ],
    details: {
      challenge:
        "需要深度集成钉钉企业应用，实现免登认证和权限管理多环境部署（开发、测试、UAT、生产），配置管理复杂",
      solution:
        "使用dingtalk-jsapi实现免登认证和权限管理，通过.env文件管理多环境配置，支持灵活切换，添加非钉钉环境的兼容处理，确保开发调试便利性",
      result:
        "成功解决了企业级移动应用开发的复杂挑战，在技术实现、业务功能和用户体验方面都取得了显著成果，为企业环保管理提供了数字化解决方案",
    },
    coverColor: "portfolio-mini-program",
    images: [
      "/images/portfolio/mind/mobile/wechat_2026-05-07_124642_270.png",
      "/images/portfolio/mind/mobile/wechat_2026-05-07_124725_221.jpg",
      "/images/portfolio/mind/mobile/wechat_2026-05-07_124751_208.png",
      "/images/portfolio/mind/mobile/wechat_2026-05-07_124850_502.png",
      "/images/portfolio/mind/mobile/wechat_2026-05-07_124920_422.png",
    ],
  },
];
