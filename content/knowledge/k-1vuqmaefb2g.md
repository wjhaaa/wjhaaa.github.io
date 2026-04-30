---
title: "vue遇到问题总结"
slug: "k-1vuqmaefb2g"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

# vue遇到问题总结

### 1、安装vue cli
- 为单页面应用 (SPA) 快速搭建繁杂的脚手架。它为现代前端工作流提供了功能齐备的构建设置。只需要几分钟的时间就可以运行起来并带有热重载、保存时 lint 校验，以及生产环境可用的构建版本。
- pnpm install @vue/cli -g
### 2、vue ui 命令
- 项目可视化仪表盘、在仪表盘中进行安装依赖，会报错shamefully-hoist这个错误。是因为
### 3、Auto Rename Tag 
- 修改 html 标签。自动帮你完成头部和尾部闭合标签的同步修改  
### 4、Code Spell Checker （不好用）
- 代码拼写检查器
- 一个与camelCase代码配合良好的基本拼写检查程序。
- 此拼写检查程序的目标是帮助捕获常见的拼写错误，同时保持误报数量较低。
### 5、Project Manager 
- 多个项目之间快速切换，安装这个插件之后会在你的左栏中新建一个图标。
### 6、Manta's Stylus Supremacy
- vscode插件、格式化Stylus。
### 7、安装移动端测试
- sudo npm i spy-debugger -g
- spy-debugger   
- set http_proxy=http://127.0.0.1:4780 https_proxy=http://127.0.0.1:4780
- curl -L google.com 
### 8、vite 安装require语法
- pnpm add vite-plugin-require-transform -D
- vite.config配置    
```json
import requireTransform from 'vite-plugin-require-transform';
{
 plugins: [
     
      requireTransform({
        fileRegex: /.js$|.ts$|.vue$/,
      }),
    ],
}
```
### 9、使用css实现节流
```css
@keyframes throttle {
  from {
    pointer-events: none;
  }
  to {
    pointer-events: all;
  }
}

.animation-throttle {
  animation: throttle 2s step-end forwards;
}
```
### 10、信息报错
- `npm WARN read-shrinkwrap This version of npm is compatible with lockfileVersion@1, but package-lock.`报错
- 因为npm版本不一致，npm6 是lockfileVersion@1、之后版本都是lockfileVersion@2。
- 降级命令`npm i npm@6.14.17 -g`后重新安装依赖

### 11、京东方项目根据环境打包命令修改模版下载路径
```javascript
  data() {
    return {
      loading: false,
      columns: productionImportColumns,
      data: [],
      fileList: [], // 上传文件列表
      pagination: {
        page: 1,
        size: 10,
      },
      fileMaxSize: 50, // 50Mb
      downloadUrl:process.env.VUE_APP_DOWNLOAD_URL||'http://dev.boeplat.com.cn:9090/test/1680836519108-BOMFL027ZBQ-N52-AQP2.xls?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20230407%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230407T030159Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=abbd15e13813b4f4140bf0e17ea34313df63813897eea54aff42279dc83162de',
    }
  },
.env.test
VUE_APP_DOWNLOAD_URL='http://dev.boeplat.com.cn:9090/test/1681351828324-BOMFL027ZBQ-N52-AQP2.xls?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20230413%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230413T021028Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=22de11f692645b3e965f59e93e5684b269136445d5fe9b6418b3a715ec2a556e'
.env.production
VUE_APP_DOWNLOAD_URL='http://dev.boeplat.com.cn:9090/test/1680836519108-BOMFL027ZBQ-N52-AQP2.xls?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20230407%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230407T030159Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=abbd15e13813b4f4140bf0e17ea34313df63813897eea54aff42279dc83162de'
```
- 这里有一个需要注意的点，如果直接写DOWNLOAD_URL变量名是在业务逻辑中获取不到的。
