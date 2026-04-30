export type KnowledgeMenuNode = {
  name: string;
  slug?: string;
  children?: KnowledgeMenuNode[];
};

// Source-of-truth menu tree for the Knowledge page.
// Leaf nodes can optionally bind to a real post via `slug` (content/knowledge/<slug>.md).
// If `slug` is omitted, the node `name` is used as slug (content/knowledge/<name>.md).
export const knowledgeMenu: KnowledgeMenuNode[] = [
  { name: "A sentry监控接入要做的准备工作" },
  { name: "A-storebook安装" },
  { name: "Ayyds的pnpm安装失败时的保命用法" },
  { name: "A开发秘籍" },
  {
    name: "A开发过的项目总结和积累",
    children: [
      {
        name: "React-5G联通项目",
        children: [
          { name: "formily的Tree组件" },
          { name: "formily的一些方法" },
          { name: "formily的更新dataSource的方法" },
          { name: "select下拉框数据增加分页请求" },
          { name: "tableRender中遇到的问题" },
          { name: "vite配置zip打包，通过命令生成zip包" },
          { name: "vscode批量替换withTable" },
          { name: "增加接口以window.location.origirn的形式访问" },
          { name: "执行创建数据接口的脚本" },
          { name: "按1920*1080的尺寸进行等比缩放并垂直水平居中" },
          { name: "解决菜单切换，页面会跳来跳去bug" },
        ],
      },
      {
        name: "React-gver项目",
        children: [{ name: "下载文件流遇到的问题" }],
      },
      { name: "React中外运碳管理项目总结" },
      {
        name: "React中海油碳管理项目总结",
        children: [{ name: "企业碳核算单位" }],
      },
      {
        name: "React中煤碳管理项目总结",
        children: [{ name: "千分位逗号分割" }, { name: "年份数据option相关处理" }],
      },
      {
        name: "React微众银行项目总结",
        children: [
          { name: "AES数据加密" },
          { name: "vite在react项目进行zipPack打包" },
          { name: "堆叠图给数据增加标签线的显示" },
          { name: "处理pdf和image文件流的预览功能" },
          { name: "环图计算百分比的实际位置" },
        ],
      },
      { name: "React联通研究院5g设备项目总结" },
      {
        name: "Taro北京银行项目总结",
        children: [
          { name: "webview组件跳转参数为url时，字段丢失问题" },
          { name: "处理时间相关的方法" },
          { name: "按钮节流组件" },
          { name: "暂无数据组件" },
          { name: "转化图片的方法" },
        ],
      },
    ],
  },
  { name: "echarts" },
  { name: "generate" },
  { name: "git的相关用法" },
  { name: "loadsh一些用法" },
  { name: "mock数据" },
  { name: "no-cache 和 no-store 的区别" },
  { name: "npm发包的过程" },
  { name: "Protable使用过程中的问题" },
  {
    name: "React相关问题",
    children: [
      { name: "antd DatePicker设置时间范围" },
      { name: "React-Query" },
      { name: "react 复制文本功能方法" },
    ],
  },
  {
    name: "shell相关",
    children: [{ name: "sh: vue-cli-service: command not found" }, { name: "shell命令、nginx" }],
  },
  { name: "TS总结" },
  { name: "umi-openapi用法" },
  { name: "vite使用问题" },
  { name: "vue遇到问题总结" },
  { name: "前端压测脚本" },
  { name: "单位记录" },
  { name: "如何通过一个命令将项目打包成多份环境的包" },
  { name: "安装eslint", children: [{ name: "安装prettier 代码格式化工具" }] },
  { name: "对接钉钉需要安装的前期工作" },
  {
    name: "小程序相关",
    children: [
      { name: "云闪付小程序开发注意点" },
      { name: "小程序使用wxml-to-canvas生成分享海报" },
      { name: "小程序开发注意点" },
    ],
  },
  { name: "提高开发效率" },
  {
    name: "样式相关",
    children: [
      { name: "CSS var() 函数" },
      { name: "CSS层叠上下文、层叠等级、层叠顺序和z-index" },
      { name: "sass、less" },
      { name: "安装postcss-px-to-viewport" },
    ],
  },
  { name: "移动端调试方法" },
];

