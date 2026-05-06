---
title: "堆叠图给数据增加标签线的显示"
slug: "k-1m87op1uh1n"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---


### 增加标签线
- ```labelLine: { show: true, }```,
- 这部分配置是用来控制标签线的显示状态。show: true 表示标签线将会在图表中显示。标签线通常用于连接图表的某个数据点和它的标签，以提高图表的可读性和美观性。
- ```labelLayout(params: { rect: { x: number; y: number } }) { return { x: params.rect.x + 30, moveOverlap: 'shiftY', }; }```
- 这部分配置定义了一个自定义的标签布局函数，该函数用于计算标签的位置。这个函数接收一个参数 params，其中包含了标签所在矩形的坐标信息（通过 params.rect.x 和 params.rect.y 访问）。
- 在 return 语句中，该函数返回一个对象，指定了标签的新位置和重叠处理策略：
- ```x: params.rect.x + 30 ```表示将标签在水平方向上（x轴方向）移动30单位。
- 这样做的目的可能是为了确保标签与图表的某个部分（比如柱状图的柱子或饼图的扇区）有足够的间隙，从而避免文字重叠，提高可读性。
- ```moveOverlap: 'shiftY'``` 指定了当标签之间发生重叠时的处理策略。
- ```shiftY ```表示如果两个标签在垂直方向上重叠，它们将会沿着Y轴（垂直方向）移动以避免重叠。这是一种自动调整标签位置的方式，以确保所有标签都清晰可见，不会互相覆盖。
```javascript
 labelLine: {
          show: true,
        },
 labelLayout(params: { rect: { x: number; y: number } }) {
     return {
            x: params.rect.x + 30,
            moveOverlap: 'shiftY',
          };
    }
```
 