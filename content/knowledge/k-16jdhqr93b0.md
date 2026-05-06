---
title: "echarts"
slug: "k-16jdhqr93b0"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

# echarts
 
- 地图充满容器属性：layoutCenter: ['50%', '50%'], layoutSize: '100%',
 
#### 使用yAxisIndex解决双轴数据差异过大问题
```javascript
    series: [
      {
        name: '供电排放强度',
        type: 'line',
        data: props?.powerHotData?.[0],
      },
      {
        name: '供热排放强度',
        type: 'line',
        data: props?.powerHotData?.[1],
      },
      {
        name: '排放量',
        type: 'bar',
        data: props?.powerHotData?.[2],
        barWidth: 20,
        yAxisIndex: 1,
      },
    ],
```
### 使用showSymbol去掉折线上的节点展示
```javascript
{
        name: '供热排放强度',
        type: 'line',
        showSymbol: false,
        data: props?.powerHotData?.[1],
      },
```


