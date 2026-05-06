---
title: "增加接口以window.location.origirn的形式访问"
slug: "k-1t3f843fiik"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

# 增加接口以window.location.origirn的形式访问

### request.ts
```typescript
export const baseUrl = (() => {
  const env = import.meta.env.MODE;
  // 检查是否有环境变量是否productionOrigin
  if (env === 'productionOrigin') {
    // 动态产生基于当前 location 的 API URL
    return `${window.location.origin}/api`;
  }
  // 否则使用环境变量中定义的静态 URL
  return import.meta.env.REACT_APP_API_URL || '/';
})();

```
### 配置命令package.json
-
```json {
"scripts":{
  "v:origin": "NODE_ENV=productionOrigin NODE_OPTIONS=--max-old-space-size=8192 node --max-old-space-size=8192  ./node_modules/vite/bin/vite.js build --mode productionOrigin ",
"build:origin": "npm run v:origin",
}
}
```
### 增加环境变量.env.productionOrigin
- 
```javascript
REACT_APP_API_FILE_UPLOAD_URL=/system/upload_file/

# 随机文件名 - 文件上传的地址
REACT_APP_API_FILE_UPLOAD_RANDOMNAME_URL=/system/upload_file/

```