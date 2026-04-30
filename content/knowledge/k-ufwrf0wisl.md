---
title: "环图计算百分比的实际位置"
slug: "k-ufwrf0wisl"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

# 环图计算百分比的实际位置

### 计算实际的百分比渲染逻辑
```javascript
// 处理碳目标数据占比
export const getRatioValue = (ratio: string) => {
  if (ratio === '-') {
    return 0;
    return [0, 100];
  }

  if (Number(ratio) >= 100) {
    return 300;
    return [75, 25];
  }
  return ratio;
  /**
   * 360度的75%为涂色区域，25%为未涂色区域
   * colorAngle 为有颜色的角度
   * noColorAngle 为无颜色的角度
   */
  const coloredAngle = (Number(ratio) / 100) * (360 * 0.75);
  const noColoredAngle = 360 - coloredAngle;

  return [coloredAngle, noColoredAngle];
};
```