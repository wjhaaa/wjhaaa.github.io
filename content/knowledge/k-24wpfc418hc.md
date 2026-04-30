---
title: "A sentry监控接入要做的准备工作"
slug: "k-24wpfc418hc"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

# A sentry监控接入要做的准备工作

 

### 项目安装依赖
- `pnpm add @sentry/cli`
- `pnpm add @sentry/tracing`
- `pnpm add @sentry/vue或者@sentry/react`
- `pnpm add -D @sentry/vite-plugin` https://www.npmjs.com/package/@sentry/vite-plugin
### 在入口页面增加init初始化，参考图例1
- 例如：页面路径src/main.js
- dsn为sentry新增项目后得到的地址。根据项目实际dsn值进行修改。
- sentry地址：http://192.168.1.104:9000/ 账号：ops@carbonstop.net 密码：Carbonstop@2023 
- 生成的dsn中的ip值用sentry.carbonstop.net替换，sentry.carbonstop.net为固定值，不要改。
- 参考图例1信息
```javascript
import * as Sentry from '@sentry/vue';
if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'http://d6f1907435d5ffb8d951c1d6ed71aaff@sentry.carbonstop.net/3',
    integrations: [new Sentry.BrowserTracing()],
    release: process.env.RELEASE,
  });
}
```
### 创建```.sentryclirc```文件
- 在根目录创建```.sentryclirc```文件
- url参数为固定值```https://sentry.carbonstop.net/```
- ```org```为图例2中sentry新增项目后给的信息
- ```project```为图例2中sentry新增项目后给的信息
- ```token```可以复制例子中的token值使用
- dsn为新建sentry项目后的dsn值，```@sentry.carbonstop.net```也需要替换。
- ```.sentryclirc```文件内容如下
```javascript
[defaults]
url = https://sentry.carbonstop.net/
org = sentry
project = dct

[auth]
token = 1dd7edbcb288d7e5f715f1f413fb3ea4112ca9c26899cf9cbc2c9ef8736cd515
dsn=http://d6f1907435d5ffb8d951c1d6ed71aaff@sentry.carbonstop.net/3
```
### 在根目录创建.env.sentry-build-plugin文件
- 配置存放```SENTRY_AUTH_TOKEN=[token值]```的变量，为了在vite.config文件中引用
### 如果是vite项目，在vite.config文件中进行配置sentry配置，如果是webpack参考碳云的craco.config.js文件配置http://gitlab-py.tzj.pub/fe/new_carbon_cloud/blob/master/craco.config.js 
- 例子：vite.config.js
```javascript
import { sentryVitePlugin } from "@sentry/vite-plugin"
export default defineConfig({
  base: '/',
  plugins: [
    // sentry线上监控
    (process.env.NODE_ENV === 'prod'||process.env.NODE_ENV === 'production') &&
    sentryVitePlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN, //sentry授权令牌
      configFile: './.sentryclirc', // 配置文件
      include: './build/',
      ignoreFile: '.gitignore',
      ignore: ['node_modules'],
      sourcemaps: {
        // 这里需要根据具体项目进行修改路径  
        filesToDeleteAfterUpload: './build/assets/*.map',
      },
      release: {
        name: process.env.RELEASE,
      },
    }),
  build: {
    sourcemap: true,
  },
})
```
### 测试异常的时候可以把main文件中的环境判断去掉，运行后可以在sentry项目中看到异常问题的展示。
### 接入飞书异常提醒的时候，需要在sentry项目中找到一个配置webhook集成的地方。
- 将项目加入。图例3:http://192.168.1.104:9000/settings/sentry/plugins/webhooks/
- 将飞书创建的机器人的webHook信息粘贴进去。图例3-1
- 找到一个警报菜单，配置警报提醒。图例4 http://192.168.1.104:9000/organizations/sentry/alerts/rules/?project=4&statsPeriod=14d
- 基本就飞书提醒就接入完成了。
图例1:

前端组 > A sentry监控接入要做的准备工作 > image2024-1-16_18-57-12.png

图例2:

前端组 > A sentry监控接入要做的准备工作 > image2024-1-16_19-12-3.png

图例3：

前端组 > A sentry监控接入要做的准备工作 > image2024-1-16_19-42-34.png

图例3-1：
前端组 > A sentry监控接入要做的准备工作 > image2024-1-16_19-44-58.png

图例4:

前端组 > A sentry监控接入要做的准备工作 > image2024-1-16_19-48-21.png



 

