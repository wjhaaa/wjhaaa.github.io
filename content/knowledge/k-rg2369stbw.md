---
title: "千分位逗号分割"
slug: "k-rg2369stbw"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

# 千分位逗号分割

 

### 
```javascript
/**
 * 千分位逗号分隔
 * @param num  传递过来的数字
 */
export const numFormat = (num: number | string) => {
  if (!num) return 0;
  const c =
    num.toString().indexOf('.') !== -1
      ? changeXS(num.toString())
      : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  return c;
};
```
 

