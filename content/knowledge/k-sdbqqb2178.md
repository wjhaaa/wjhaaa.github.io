---
title: "vite在react项目进行zipPack打包"
slug: "k-sdbqqb2178"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

# vite在react项目进行zipPack打包

 

### 详细代码
- 安装 ```pnpm i vite-plugin-zip-pack -D```
```javascript
import zipPack from 'vite-plugin-zip-pack';
const fs = require('fs');
const packageJson = fs.readFileSync('package.json');
const packageJsonObj = JSON.parse(packageJson);
const packageName = packageJsonObj?.name;
export default defineConfig(env => {
  const mode = env.mode || 'dev';
  return {
    plugins: compact([
      zipPack({
        inDir: 'build',
        outDir: `${packageName}_zip`,
        outFileName: `${packageName}_${mode}_fe_${dayjs().format(
          'YYYYMMDD_HHmm',
        )}.zip`,
      }),
    ]),
  };
});
```
 

