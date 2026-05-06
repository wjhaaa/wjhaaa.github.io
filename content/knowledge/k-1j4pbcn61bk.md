---
title: "vite使用问题"
slug: "k-1j4pbcn61bk"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

### 解决vite打包后资源404问题 
- 需要在```vite.config.ts```中增加```base:'./'```配置
- base 类型： string ， 默认： /，开发或生产环境服务的公共基础路径。合法的值包括以下几种：
- 绝对 URL 路径名，例如 /foo/
- 完整的 URL，例如 https://foo.com/
- 空字符串或 ./（用于嵌入形式的开发）
- [https://cn.vitejs.dev/config/shared-options.html#root](文档)
