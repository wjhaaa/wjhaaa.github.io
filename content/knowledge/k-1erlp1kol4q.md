---
title: "vite配置zip打包，通过命令生成zip包"
slug: "k-1erlp1kol4q"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

### 安装 vite-plugin-zip-pack
### vite.config.ts注入zip配置
```javascript
import react from '@vitejs/plugin-react-swc';
import dayjs from 'dayjs';
import { compact } from 'lodash';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import zipPack from 'vite-plugin-zip-pack';
import tsConfigPaths from 'vite-tsconfig-paths';
import tsAlias from './tsconfig.path.json';

const path = require('path');
const fs = require('fs');
const packageJson = fs.readFileSync('package.json');
const packageJsonObj = JSON.parse(packageJson);
const packageName = packageJsonObj?.name;

const isProduction = process.env.NODE_ENV === 'production' ? true : false;

const outDir = path.resolve(__dirname, './build');

const isPre = process.argv.some(
  (arg, i) => arg === '--mode' && process.argv[i + 1] === 'pre',
);

export default defineConfig(env => {
  const mode = env.mode || 'dev';
  return {
    mode,
    build: {
      manifest: true,
      outDir,
      target: ['es2019'],
      sourcemap: isProduction ? false : true,
      minify: !(isProduction || isPre) ? false : 'esbuild',
      reportCompressedSize: true,
      emptyOutDir: true,
    },
    assetsInclude: [path.resolve(__dirname, './public')],
    server: {
      /** https://cn.vitejs.dev/config/server-options.html#server-https */
      host: '0.0.0.0',
      port: 3005,
      watch: true,
      hrm: true,
      open: true,
    },
...
    plugins: compact([
      zipPack({
        inDir: 'build',
        outDir: `${packageName}_zip`,
        outFileName: `${packageName}_${mode}_fe_${dayjs().format(
          'YYYYMMDD_HHmm',
        )}.zip`,
      }),
...
    ]),
  };
});

```
